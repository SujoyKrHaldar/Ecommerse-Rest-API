import mongoose from "mongoose";
import bcrypt from "bcrypt";

const addressSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["home", "office", "other"],
    default: "other",
  },
  street: { type: String },
  city: { type: String },
  state: { type: String },
  postalCode: { type: String },
  country: { type: String },
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["customer", "admin", "manager"],
      required: true,
    },
    addresses: {
      type: [addressSchema],
      required: false,
    },
    phone: {
      type: String,
      required: false,
      trim: true,
      match: [/^\d{10}$/, "Please fill a valid phone number"],
    },
    // wishlist: [],
    // order: [],
    // cart: [],
  },
  { timestamps: true }
);

// * PASSWORD OPERATIONS
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const saltRound = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, saltRound);
  }
  next();
});

userSchema.methods.isPasswordMatch = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
