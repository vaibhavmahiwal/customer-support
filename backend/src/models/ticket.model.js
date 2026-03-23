const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  customerEmail: { type: String, required: true },
  source: { type: String, default: "api" },
  category: String,
  urgency: String,
  sentiment: String,
  confidence: Number,
  draftReply: String,
  finalReply: String,
  status: {
    type: String,
    enum: [
      "pending",
      "in_review",
      "auto_resolved",
      "escalated",
      "approved",
      "rejected",
      "closed",
    ],
    default: "pending",
  },
}, { timestamps: true });

module.exports = mongoose.model("Ticket", ticketSchema);