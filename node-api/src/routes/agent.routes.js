const router = require("express").Router();
const { getAllTickets, getReviewQueue, getTicketById, approveTicket, editAndApproveTicket, rejectTicket } = require("../controllers/review.controller");
const { jwtAuth } = require("../middleware/jwtAuth");

router.get("/tickets/all", jwtAuth, getAllTickets);

router.get("/tickets/review", jwtAuth, getReviewQueue);
router.get("/tickets/:ticketId", jwtAuth, getTicketById);
router.post("/tickets/:ticketId/approve", jwtAuth, approveTicket);
router.post("/tickets/:ticketId/edit", jwtAuth, editAndApproveTicket);
router.post("/tickets/:ticketId/reject", jwtAuth, rejectTicket);


module.exports=router;
