const router = require("express").Router();
const {
  getStats,
  getVolumeByDay,
  getByCategory,
  getAvgConfidence,
} = require("../controllers/stats.controller");
const { apiKeyAuth } = require("../middleware/auth");

router.get("/overview", apiKeyAuth, getStats);
router.get("/volume", apiKeyAuth, getVolumeByDay);
router.get("/categories", apiKeyAuth, getByCategory);
router.get("/confidence", apiKeyAuth, getAvgConfidence);

module.exports = router;