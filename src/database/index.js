import mongoose from "mongoose";
import config from "../config/index.js";

const dbName = config.getKey("DB_NAME");
const dbUrl = config.getKey("DB_URL");

const connectDB = async () => await mongoose.connect(`${dbUrl}/${dbName}`);

export default connectDB;
