const zendeskService = require("../services/zendesk.service");
const slackService = require("../services/slack.service");
const env = require("../config/env");
const Ticket = require("../models/ticket.model");

const THRESHOLD = parseFloat(env.AI_CONFIDENCE_THRESHOLD);

async function routeTicket(ticket, aiResult) {
  console.log("[Router] called — ticket:", ticket.id);
  console.log("[Router] aiResult:", JSON.stringify(aiResult));

  const { urgency, confidence, draft_reply, category, sentiment } = aiResult;

  const status = urgency === "critical" ? "escalated"
               : confidence >= THRESHOLD ? "auto_resolved"
               : "in_review";

  console.log("[Router] status will be:", status);

  // Save to MongoDB
  try {
    const saved = await Ticket.findOneAndUpdate(
      { id: ticket.id },
      {
        $set: {
          id: ticket.id,
          subject: ticket.subject,
          body: ticket.body,
          customerEmail: ticket.customerEmail,
          source: ticket.source || "api",
          category,
          urgency,
          sentiment,
          confidence,
          draftReply: draft_reply,
          status,
        }
      },
      { upsert: true, returnDocument: "after" }
    );
    console.log("[Router] Saved to MongoDB:", saved._id, "status:", saved.status);
  } catch (err) {
    console.error("[Router] MongoDB save FAILED:", err.message);
  }

  if (urgency === "critical") {
    await slackService.sendEscalationAlert(ticket, aiResult);
    return { action: "escalated", ticketId: ticket.id };
  }

  if (confidence >= THRESHOLD) {
    await zendeskService.sendReply(ticket.id, draft_reply);
    return { action: "auto_resolved", ticketId: ticket.id };
  }

  console.log(`[Router] Ticket ${ticket.id} → human review`);
  return { action: "human_review", ticketId: ticket.id };
}

module.exports = routeTicket;