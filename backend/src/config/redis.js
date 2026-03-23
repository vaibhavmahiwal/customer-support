const { Redis } = require("ioredis");

const redis = new Redis({
  host: "localhost",
  port: 6379,
  maxRetriesPerRequest: null,
});

redis.on("connect", () => console.log("[Redis] Connected"));
redis.on("error", (err) => console.error("[Redis] Error:", err.message));

module.exports = redis;