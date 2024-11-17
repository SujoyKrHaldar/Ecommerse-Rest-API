import Roles from "../constants/index.js";
import { User } from "../models/index.js";

const userService = {
  findUserByEmail: async (email) => {
    return await User.findOne({ email });
  },

  createUser: async (userData) => {
    const { name, email, password, role } = userData;

    const newUser = new User({
      name,
      email,
      password,
      role: Roles.CUSTOMER,
    });

    return await newUser.save();
  },
};

export default userService;
