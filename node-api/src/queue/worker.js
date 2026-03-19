const { Worker } = require("bullmq");
const redis = require("../config/redis");

const worker = new Worker(
  "ticket-processing",
  async (job) => {
    const ticket = job.data;
    console.log(`[Worker] Processing ticket: ${ticket.id} — "${ticket.subject}"`);

    // Simulate processing for now
    await new Promise((res) => setTimeout(res, 1000));

    console.log(`[Worker] Done: ${ticket.id}`);
    return { ticketId: ticket.id, status: "processed" };
  },
  { connection: redis, concurrency: 5 }
);

worker.on("completed", (job) => console.log(`[Worker] Job ${job.id} completed`));
worker.on("failed", (job, err) => console.error(`[Worker] Job ${job?.id} failed:`, err.message));

module.exports = worker;