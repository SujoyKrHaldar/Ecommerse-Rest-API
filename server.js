import app from "./src/app.js";
import config from "./src/config/index.js";
import connectDB from "./src/database/index.js";

const port = config.getKey("PORT");
const nodeEnv = config.getKey("NODE_ENV");

const startServer = async () => {
  try {
    await connectDB();
    console.log("Database connected successfully");

    app.listen(port, () =>
      console.log(
        `Server running on ${nodeEnv} env at http://localhost:${port}/api/v1`
      )
    );
  } catch (error) {
    console.log(`Server initialization failed due to ${error}`);
    process.exit(1);
  }
};

startServer();
