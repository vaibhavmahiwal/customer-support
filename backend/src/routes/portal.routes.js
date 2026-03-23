const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { ticketQueue } = require("../queue/queue");
const Ticket = require("../models/ticket.model");
const { z } = require("zod");

const ticketSchema = z.object({
  subject: z.string().min(1),
  body: z.string().min(1),
  customerEmail: z.string().email(),
});

// Public — no API key needed
router.post("/submit", async (req, res, next) => {
  try {
    const validated = ticketSchema.parse(req.body);
    const ticket = {
      id: uuidv4(),
      ...validated,
      source: "portal",
      priority: "medium",
      createdAt: new Date().toISOString(),
    };
    await ticketQueue.add("process", ticket);
    res.status(202).json({ ticketId: ticket.id, status: "queued" });
  } catch (err) {
    next(err);
  }
});

// Public — customer checks their ticket status
router.get("/ticket/:ticketId", async (req, res, next) => {
  try {
    const ticket = await Ticket.findOne({ id: req.params.ticketId });
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    // Only return safe fields to customer — not internal AI data
    res.json({
      ticket: {
        id: ticket.id,
        subject: ticket.subject,
        body: ticket.body,
        status: ticket.status,
        draftReply: ticket.draftReply,
        finalReply: ticket.finalReply,
        createdAt: ticket.createdAt,
      }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;