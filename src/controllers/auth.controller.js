import config from "../config/index.js";
import { userService, tokenService } from "../services/index.js";
import { createError, ValidationSchema } from "../utils/index.js";

const { validateRegData, validateLoginData } = ValidationSchema;
const { findUserByEmail, createUser } = userService;
const { createToken } = tokenService;

const tokenOptions = {
  httpOnly: true,
  secure: config.getKey("NODE_ENV") === "production",
  maxAge: 24 * 60 * 60 * 1000,
};

const authController = {
  signup: async (req, res, next) => {
    const { error } = validateRegData.validate(req.body);
    if (error) {
      return next(createError(400, error.details[0].message));
    }

    try {
      const { email } = req.body;

      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        return next(createError(400, "User with this email already exist."));
      }

      const savedUser = await createUser(req.body);

      const token = createToken(savedUser);

      const userData = await User.select("-password");

      return res.status(201).cookie("token", token, tokenOptions).json({
        sucess: true,
        message: "User registered successfully",
        data: userData,
      });
    } catch (err) {
      return next(createError(500, "Internal server error."));
    }
  },

  login: async (req, res, next) => {
    const { error } = validateLoginData.validate(req.body);
    if (error) {
      return next(createError(400, error.details[0].message));
    }

    try {
      const { email, password } = req.body;

      const user = await findUserByEmail(email);
      if (!user) {
        return next(createError(404, "User not found"));
      }

      const isPasswordValid = await user.isPasswordMatch(password);
      if (!isPasswordValid) {
        return next(createError(404, "Invalid Email or password"));
      }

      const token = createToken(user);

      const userData = await user.select("-password");

      return res.status(200).cookie("token", token, tokenOptions).json({
        sucess: true,
        message: "Login successfull",
        userData,
      });
    } catch (err) {
      return next(err);
    }
  },

  forgetPassword: (req, res) => res.send("done"),
  resetPassword: (req, res) => res.send("done"),
};

export default authController;
