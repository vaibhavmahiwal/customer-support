const axios = require("axios");
const env = require("../config/env");
async function sendEscalationAlert(ticket, aiResult) {
  if (!env.SLACK_WEBHOOK_URL) return console.log("[Slack] Skipped (no webhook URL)");
  await axios.post(env.SLACK_WEBHOOK_URL, { text: `Critical ticket: ${ticket.subject} from ${ticket.customerEmail} (urgency: ${aiResult.urgency})` });
}
module.exports = { sendEscalationAlert };
