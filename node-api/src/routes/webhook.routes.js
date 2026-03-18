const router = require("express").Router();
const { normaliseTicket } = require("../controllers/ticket.controller");
const { ticketQueue } = require("../queue/queue");
const { validateZendeskWebhook } = require("../middleware/validateWebhook");
router.post("/zendesk", validateZendeskWebhook, async (req, res) => { const ticket = normaliseTicket(req.body, "zendesk"); await ticketQueue.add("process", ticket); res.status(200).json({ received: true }); });
router.post("/email", async (req, res) => { const ticket = normaliseTicket({ subject: req.body.subject, body: req.body.text || req.body.html, email: req.body.from }, "email"); await ticketQueue.add("process", ticket); res.status(200).json({ received: true }); });
module.exports = router;
