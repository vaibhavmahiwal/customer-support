const router = require("express").Router();
const { apiKeyAuth } = require("../middleware/auth");
router.post("/tickets/:ticketId/approve", apiKeyAuth, async (req, res) => { res.json({ ticketId: req.params.ticketId, action: "approved" }); });
router.post("/tickets/:ticketId/reject", apiKeyAuth, async (req, res) => { res.json({ ticketId: req.params.ticketId, action: "rejected" }); });
module.exports = router;
