const axios = require("axios");
const env = require("../config/env");
async function processTicket(ticket) {
  const res = await axios.post(`${env.AI_SERVICE_URL}/process-ticket`, ticket, { timeout: 30000 });
  return res.data;
}
module.exports = { processTicket };
