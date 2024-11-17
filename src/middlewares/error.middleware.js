import config from "../config/index.js";

const globalErrorRespose = (err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    success: false,
    status: err.statusCode || 500,
    message: err.message || "Internal Server Error",
    error: config.getKey("NODE_ENV") === "dev" ? err.stack : {},
  });
};

export default globalErrorRespose;
