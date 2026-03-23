const env = require("../config/env");
function apiKeyAuth(req, res, next) { const key = req.headers["x-api-key"]; if (!key || key !== env.API_SECRET_KEY) return res.status(401).json({ error: "Unauthorized" }); next(); }
module.exports = { apiKeyAuth };
