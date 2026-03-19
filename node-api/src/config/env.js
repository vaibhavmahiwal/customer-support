require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3000,
  API_SECRET_KEY: process.env.API_SECRET_KEY || "dev-secret",
  AI_SERVICE_URL: process.env.AI_SERVICE_URL || "http://localhost:8000",
  AI_CONFIDENCE_THRESHOLD: parseFloat(process.env.AI_CONFIDENCE_THRESHOLD || "0.85"),
};  