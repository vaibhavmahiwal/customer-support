const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const errorHandler = require("./src/middleware/errorHandler");
const ticketRoutes = require("./src/routes/ticket.routes");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173",                 // Local Vite Dev
    "https://v-supportai.vercel.app/"   // YOUR ACTUAL VERCEL URL
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "x-api-key", "Authorization"],
  credentials: true, // Recommended if you're using JWT/Cookies
}));

app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/tickets", require("./src/routes/ticket.routes"));
app.use("/api/webhooks", require("./src/routes/webhook.routes"));
app.use("/api/stats", require("./src/routes/stats.routes"));
app.use("/api/agents", require("./src/routes/agent.routes"));
app.use("/api/portal", require("./src/routes/portal.routes"));
app.use("/api/auth", require("./src/routes/auth.routes"));
app.use(errorHandler);

module.exports = app;
