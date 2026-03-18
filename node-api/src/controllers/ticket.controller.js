const { z } = require("zod");
const { v4: uuidv4 } = require("uuid");

const ticketSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  body: z.string().min(1, "Body is required"),
  customerEmail: z.string().email("Valid email required"),
});

async function createTicket(req, res, next) {
  try {
    //if data is valid continues..
    const validated = ticketSchema.parse(req.body);
    const ticket = {
      id: uuidv4(),
      ...validated,
      status: "received",
      createdAt: new Date().toISOString(),
    };
    
    console.log("[Ticket] Received:", ticket.id, "-", ticket.subject);
    res.status(202).json({ ticketId: ticket.id, status: "received" });
  } catch (err) {
    next(err);
  }
}

module.exports = { createTicket };