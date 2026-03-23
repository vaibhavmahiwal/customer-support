const router = require("express").Router();
const {
  getStats,
  getVolumeByDay,
  getByCategory,
  getAvgConfidence,
} = require("../controllers/stats.controller");
const { jwtAuth } = require("../middleware/jwtAuth");

router.get("/overview", jwtAuth, getStats);
router.get("/volume", jwtAuth, getVolumeByDay);
router.get("/categories", jwtAuth, getByCategory);
router.get("/confidence", jwtAuth, getAvgConfidence);

module.exports = router;