const router = require("express").Router();
const { apiKeyAuth } = require("../middleware/auth");
router.get("/overview", apiKeyAuth, async (req, res) => { res.json({ ticketsToday: 0, autoResolved: 0, inHumanReview: 0, criticalEscalations: 0 }); });
module.exports = router;
