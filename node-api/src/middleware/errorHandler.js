function errorHandler(err, req, res, next) {
  console.error("[Error]", err.message);
  if (err.name === "ZodError") {
    return res.status(400).json({ error: "Validation failed", details: err.errors });
  }
  res.status(err.status || 500).json({ error: err.message || "Internal server error" });
}

module.exports = errorHandler;