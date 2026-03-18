const { Redis } = require("ioredis");
const env = require("./env");
const redis = new Redis({ host: env.REDIS_HOST, port: parseInt(env.REDIS_PORT), password: env.REDIS_PASSWORD || undefined, maxRetriesPerRequest: null });
redis.on("connect", () => console.log("[Redis] Connected"));
redis.on("error", (err) => console.error("[Redis] Error:", err.message));
module.exports = redis;
