const Ticket = require("../models/ticket.model");

async function getReviewQueue(req, res, next) {
  try {
    const tickets = await Ticket.find({ status: "in_review" }).sort({ createdAt: -1 });
    res.json({ tickets, total: tickets.length });
  } catch (err) {
    next(err);
  }
}

async function getTicketById(req,res,next){
  try{
    const ticket=await Ticket.findOne({id:req.params.id});
    
    if(!ticket){
      return res.status(404).json({error:"ticket not found"});
    }
  res.json({ ticket });
  }catch(err){
    next(err);
  }
}






async function approveTicket(req, res, next) {
  try {
    const ticket = await Ticket.findOneAndUpdate(
      { id: req.params.ticketId },
      { status: "approved", finalReply: req.body.editedReply || undefined },
      { new: true }
    );
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    //this art increment agent stats
     await Agent.findOneAndUpdate(
      { email: req.agentEmail },
      {
        $inc: { ticketsReviewed: 1, ticketsApproved: 1 },
        lastActiveAt: new Date(),
      }
    );

    res.json({ ticketId: ticket.id, action: "approved", reply: ticket.finalReply || ticket.draftReply });
  } catch (err) {
    next(err);
  }
}

async function editAndApproveTicket(req, res, next) {
  try {
    const { editedReply } = req.body;
    const ticket = await Ticket.findOneAndUpdate(
      { id: req.params.ticketId },
      { status: "approved", finalReply: editedReply },
      { new: true }
    );
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });
    res.json({ ticketId: ticket.id, action: "approved", reply: editedReply });
  } catch (err) {
    next(err);
  }
}

async function rejectTicket(req, res, next) {
  try {
    const ticket = await Ticket.findOneAndUpdate(
      { id: req.params.ticketId },
      { status: "rejected" },
      { new: true }
    );
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });
    res.json({ ticketId: ticket.id, action: "rejected" });
  } catch (err) {
    next(err);
  }
}




module.exports = { getReviewQueue, approveTicket, editAndApproveTicket, rejectTicket ,getTicketById};