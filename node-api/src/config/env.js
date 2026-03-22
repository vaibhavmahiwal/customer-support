require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
  API_SECRET_KEY: process.env.API_SECRET_KEY || "dev-secret",

  REDIS_HOST: process.env.REDIS_HOST || "localhost",
  REDIS_PORT: process.env.REDIS_PORT || "6379",
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || undefined,

  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/support_automation",

  AI_SERVICE_URL: process.env.AI_SERVICE_URL || "http://localhost:8000",
  AI_CONFIDENCE_THRESHOLD: parseFloat(process.env.AI_CONFIDENCE_THRESHOLD || "0.85"),

  ZENDESK_SUBDOMAIN: process.env.ZENDESK_SUBDOMAIN || "",
  ZENDESK_EMAIL: process.env.ZENDESK_EMAIL || "",
  ZENDESK_API_TOKEN: process.env.ZENDESK_API_TOKEN || "",
  ZENDESK_WEBHOOK_SECRET: process.env.ZENDESK_WEBHOOK_SECRET || "",

  SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL || "",

  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || "",
};