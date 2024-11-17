import dotenv from "dotenv";
dotenv.config();

const {
  PORT,
  DB_URL,
  DB_NAME,
  NODE_ENV,
  CLIENT_URL_DEV,
  CLIENT_URL_PROD,
  JWT_EXPIREY,
  JWT_SECRET,
} = process.env;

const _config = {
  PORT,
  DB_URL,
  DB_NAME,
  NODE_ENV,
  CLIENT_URL_DEV,
  CLIENT_URL_PROD,
  JWT_SECRET,
  JWT_EXPIREY,
};

const config = {
  getKey(key) {
    const value = _config[key];

    if (!value) {
      console.error(
        `The ${key} variable is not found. Make sure to pass correct enviornment variable.`
      );
      process.exit();
    }

    return value;
  },
};

export default config;
