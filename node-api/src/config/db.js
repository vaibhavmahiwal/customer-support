const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/support_automation";

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("[MongoDB] Connected");
  } catch (err) {
    console.error("[MongoDB] Connection failed:", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;