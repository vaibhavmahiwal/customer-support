const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Agent = require("../models/agent.model");

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

async function register(req, res, next) {
  try {
    const { name, email, password, role } = req.body;
    const existing = await Agent.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already registered" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const agent = await Agent.create({ name, email, password: hashedPassword, role: role || "agent" });
    const token = jwt.sign({ id: agent._id, email: agent.email, role: agent.role }, JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ token, agent: { id: agent._id, name: agent.name, email: agent.email, role: agent.role } });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const agent = await Agent.findOne({ email });
    if (!agent) return res.status(401).json({ error: "Invalid email or password" });
    const isMatch = await bcrypt.compare(password, agent.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid email or password" });
    await Agent.findByIdAndUpdate(agent._id, { lastActiveAt: new Date() });
    const token = jwt.sign({ id: agent._id, email: agent.email, role: agent.role }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, agent: { id: agent._id, name: agent.name, email: agent.email, role: agent.role } });
  } catch (err) {
    next(err);
  }
}

async function getMe(req, res, next) {
  try {
    const agent = await Agent.findById(req.agentId).select("-password");
    if (!agent) return res.status(404).json({ error: "Agent not found" });
    res.json({ agent });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, getMe };