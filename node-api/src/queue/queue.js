const { Queue } = require("bullmq");
const redis = require("../config/redis");
const ticketQueue = new Queue("ticket-processing", { connection: redis, defaultJobOptions: { attempts: 3, backoff: { type: "exponential", delay: 2000 }, removeOnComplete: 100, removeOnFail: 50 } });
module.exports = { ticketQueue };
