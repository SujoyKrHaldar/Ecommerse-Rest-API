import jwt from "jsonwebtoken";
import config from "../config/index.js";

const tokenService = {
  createToken: (user) => {
    const payload = {
      id: user._id,
      name: user.name,
      role: user.role,
    };

    const tokenSecret = config.getKey("JWT_SECRET");
    const expiresIn = config.getKey("JWT_EXPIREY");

    return jwt.sign(payload, tokenSecret, { expiresIn });
  },

  verifyToken: () => {},
};

export default tokenService;
