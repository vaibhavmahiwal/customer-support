const { z } = require("zod");
const { v4: uuidv4 } = require("uuid");
const { ticketQueue } = require("../queue/queue");

const ticketSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  body: z.string().min(1, "Body is required"),
  customerEmail: z.string().email("Valid email required"),
});

async function createTicket(req, res, next) {
  try {
    const validated = ticketSchema.parse(req.body);
    const ticket = {
      id: uuidv4(),
      ...validated,
      status: "queued",
      createdAt: new Date().toISOString(),
    };

    const job = await ticketQueue.add("process", ticket);
    console.log(`[Ticket] Queued: ${ticket.id} — job ${job.id}`);

    res.status(202).json({ ticketId: ticket.id, jobId: job.id, status: "queued" });
  } catch (err) {
    next(err);
  }
}

module.exports = { createTicket };