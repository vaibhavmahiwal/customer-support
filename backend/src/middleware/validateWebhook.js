const crypto = require("crypto");
const env = require("../config/env");
function validateZendeskWebhook(req, res, next) {
  const sig = req.headers["x-zendesk-webhook-signature"];
  if (!env.ZENDESK_WEBHOOK_SECRET || !sig) return next();
  const expected = crypto.createHmac("sha256", env.ZENDESK_WEBHOOK_SECRET).update(JSON.stringify(req.body)).digest("base64");
  if (sig !== expected) return res.status(401).json({ error: "Invalid webhook signature" });
  next();
}
module.exports = { validateZendeskWebhook };
