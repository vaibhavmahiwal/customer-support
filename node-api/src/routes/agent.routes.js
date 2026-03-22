const router = require("express").Router();
const {
  getReviewQueue,
  approveTicket,
  editAndApproveTicket,
  rejectTicket,
  getTicketById,
} = require("../controllers/review.controller");
const { apiKeyAuth } = require("../middleware/auth");
  
router.get("/tickets/review", apiKeyAuth, getReviewQueue);
router.post("/tickets/:ticketId/approve", apiKeyAuth, approveTicket);
router.post("/tickets/:ticketId/edit", apiKeyAuth, editAndApproveTicket);
router.post("/tickets/:ticketId/reject", apiKeyAuth, rejectTicket);
router.get("/tickets/:ticketId", apiKeyAuth, getTicketById);
module.exports=router;
