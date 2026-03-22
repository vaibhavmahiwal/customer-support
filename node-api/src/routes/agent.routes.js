const router = require("express").Router();
const { getAllTickets, getReviewQueue, getTicketById, approveTicket, editAndApproveTicket, rejectTicket } = require("../controllers/review.controller");
const { apiKeyAuth } = require("../middleware/auth");

router.get("/tickets/all", apiKeyAuth, getAllTickets);

router.get("/tickets/review", apiKeyAuth, getReviewQueue);
router.get("/tickets/:ticketId", apiKeyAuth, getTicketById);
router.post("/tickets/:ticketId/approve", apiKeyAuth, approveTicket);
router.post("/tickets/:ticketId/edit", apiKeyAuth, editAndApproveTicket);
router.post("/tickets/:ticketId/reject", apiKeyAuth, rejectTicket);


module.exports=router;
