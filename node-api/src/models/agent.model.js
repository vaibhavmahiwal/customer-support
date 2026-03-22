const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["agent", "manager", "admin"],
    default: "agent",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  ticketsReviewed: {
    type: Number,
    default: 0,
  },
  ticketsApproved: {
    type: Number,
    default: 0,
  },
  ticketsRejected: {
    type: Number,
    default: 0,
  },
  lastActiveAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model("Agent", agentSchema);