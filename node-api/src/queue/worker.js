const { Worker } = require("bullmq");
const redis = require("../config/redis");
const aiService = require("../services/aiService");
const routeTicket = require("../router/routeTicket");
const worker = new Worker("ticket-processing", async (job) => {
  const ticket = job.data;
  console.log(`[Worker] Processing ticket ${ticket.id}`);
  const aiResult = await aiService.processTicket(ticket);
  const outcome = await routeTicket(ticket, aiResult);
  console.log(`[Worker] Ticket ${ticket.id} → ${outcome.action}`);
  return outcome;
}, { connection: redis, concurrency: 5 });
worker.on("completed", (job) => console.log(`[Worker] Job ${job.id} done`));
worker.on("failed", (job, err) => console.error(`[Worker] Job ${job?.id} failed:`, err.message));
module.exports = worker;
