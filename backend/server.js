require("dotenv").config();
const app = require("./app");
// Remove or comment out 'const env = require("./src/config/env");' if it's causing the ReferenceError
const connectDB = require("./src/config/db");

// Use the environment variable PORT provided by Render, defaulting to 3000 for local dev
const PORT = process.env.PORT || 3000;

// Initialize the worker
require("./src/queue/worker");

async function start() {
  try {
    // 1. Connect to MongoDB
    await connectDB();
    console.log("[MongoDB] Connected successfully");

    // 2. Start the Express server
    // Note: We use '0.0.0.0' so the Docker container is accessible externally
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is live on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

start();