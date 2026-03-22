import client from "./client";

export const getReviewQueue = () => client.get("/api/agents/tickets/review");
export const getTicketById = (id) => client.get(`/api/agents/tickets/${id}`);
export const approveTicket = (id) => client.post(`/api/agents/tickets/${id}/approve`);
export const editTicket = (id, editedReply) => client.post(`/api/agents/tickets/${id}/edit`, { editedReply });
export const rejectTicket = (id) => client.post(`/api/agents/tickets/${id}/reject`);