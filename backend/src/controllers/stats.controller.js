const Ticket = require("../models/ticket.model");

async function getStats(req, res, next) {
  try {
    const [
      total,
      pending,
      in_review,
      auto_resolved,
      approved,
      rejected,
      escalated,
    ] = await Promise.all([
      Ticket.countDocuments(),
      Ticket.countDocuments({ status: "pending" }),
      Ticket.countDocuments({ status: "in_review" }),
      Ticket.countDocuments({ status: "auto_resolved" }),
      Ticket.countDocuments({ status: "approved" }),
      Ticket.countDocuments({ status: "rejected" }),
      Ticket.countDocuments({ status: "escalated" }),
    ]);

    res.json({
      total,
      pending,
      in_review,
      auto_resolved,
      approved,
      rejected,
      escalated,
    });
  } catch (err) {
    next(err);
  }
}

async function getVolumeByDay(req, res, next) {
  try {
    const result = await Ticket.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      { $limit: 7 },
    ]);
    res.json({ volume: result });
  } catch (err) {
    next(err);
  }
}

async function getByCategory(req, res, next) {
  try {
    const result = await Ticket.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    res.json({ categories: result });
  } catch (err) {
    next(err);
  }
}

async function getAvgConfidence(req, res, next) {
  try {
    const result = await Ticket.aggregate([
      { $group: { _id: null, avgConfidence: { $avg: "$confidence" } } },
    ]);
    res.json({
      avgConfidence: result[0]?.avgConfidence?.toFixed(2) || 0,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getStats, getVolumeByDay, getByCategory, getAvgConfidence };
