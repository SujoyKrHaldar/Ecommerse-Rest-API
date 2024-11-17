// * Import packages
import express from "express";
import morgan from "morgan";
import cors from "cors";

// Import files
import { globalErrorRespose, enableCors } from "./middlewares/index.js";

// Import routes
import { authRoutes, extraRoutes, userRouter } from "./routes/index.js";

// Server configurations
const app = express();
const morganOptions = ":method - :url - :status - :response-time ms";

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(enableCors));
app.use(morgan(morganOptions));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRouter);
app.use(extraRoutes);

// Global error handle
app.use(globalErrorRespose);

export default app;
