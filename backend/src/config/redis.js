const { Redis } = require("ioredis");

// Use the URL from environment variables, or fallback to localhost for local development
const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";

// Create the Redis instance
const redis = new Redis(redisUrl, {
  maxRetriesPerRequest: null,
  // This 'tls' setting is REQUIRED for Upstash Redis (SSL)
  // If you are using a local non-SSL redis, this will be ignored if the URL doesn't start with rediss://
  tls: redisUrl.startsWith("rediss://") ? {} : undefined,
});

redis.on("connect", () => console.log("[Redis] Connected to Cloud/Local Instance"));
redis.on("error", (err) => {
  console.error("[Redis] Connection Error:", err.message);
});

module.exports = redis;