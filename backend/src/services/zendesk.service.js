const axios = require("axios");
const env = require("../config/env");
async function sendReply(ticketId, message) {
  if (!env.ZENDESK_SUBDOMAIN) return console.log("[Zendesk] Skipped (no config)");
  await axios.put(`https://${env.ZENDESK_SUBDOMAIN}.zendesk.com/api/v2/tickets/${ticketId}`, { ticket: { comment: { body: message, public: true } } }, { auth: { username: `${env.ZENDESK_EMAIL}/token`, password: env.ZENDESK_API_TOKEN } });
}
module.exports = { sendReply };
