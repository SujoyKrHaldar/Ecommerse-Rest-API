import cors from "cors";
import config from "../config/index.js";

const allowedOrigins = [
  config.getKey("CLIENT_URL_DEV"),
  config.getKey("CLIENT_URL_PROD"),
];
const enableCors = () => {
  const corsOptions = {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error("Not allowed by CORS")); // Reject the request
      }
    },
    optionsSuccessStatus: 200,
    credentials: true, // Allow credentials (cookies, Authorization headers, etc.)
  };

  return cors(corsOptions);
};

export default enableCors;
