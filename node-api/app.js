const express = require("express");
const errorHandler = require("./src/middleware/errorHandler");
const ticketRoutes = require("./src/routes/ticket.routes");

const app = express();

app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/tickets", require("./src/routes/ticket.routes"));
app.use("/api/webhooks", require("./src/routes/webhook.routes"));
app.use("/api/stats", require("./src/routes/stats.routes"));
app.use("/api/agents", require("./src/routes/agent.routes"));
app.use(errorHandler);

module.exports = app;