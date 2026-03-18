const router = require("express").Router();
const { createTicket } = require("../controllers/ticket.controller");

router.post("/", createTicket);

module.exports = router;