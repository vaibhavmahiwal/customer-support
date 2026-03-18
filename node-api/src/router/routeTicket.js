const zendeskService = require("../services/zendesk.service");
const slackService = require("../services/slack.service");
const env = require("../config/env");
const THRESHOLD = parseFloat(env.AI_CONFIDENCE_THRESHOLD);
async function routeTicket(ticket, aiResult) {
  const { urgency, confidence, draft_reply } = aiResult;
  if (urgency === "critical") { await slackService.sendEscalationAlert(ticket, aiResult); return { action: "escalated", ticketId: ticket.id }; }
  if (confidence >= THRESHOLD) { await zendeskService.sendReply(ticket.id, draft_reply); return { action: "auto_resolved", ticketId: ticket.id }; }
  return { action: "human_review", ticketId: ticket.id };
}
module.exports = routeTicket;
