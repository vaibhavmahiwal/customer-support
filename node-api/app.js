const express = require("express");
const errorHandler = require("./src/middleware/errorHandler");
const ticketRoutes = require("./src/routes/ticket.routes");

const app = express();

app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/tickets", ticketRoutes);
app.use(errorHandler);

module.exports = app;