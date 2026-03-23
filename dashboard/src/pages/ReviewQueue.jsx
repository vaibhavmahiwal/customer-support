import { useEffect, useState } from "react";
import { getReviewQueue, approveTicket, rejectTicket, editTicket } from "../api/tickets";
import toast from 'react-hot-toast';


export default function ReviewQueue() {
  const [tickets, setTickets] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editedReply, setEditedReply] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  const fetchTickets = () => {
    getReviewQueue().then(r => setTickets(r.data.tickets));
  };

  fetchTickets(); // load immediately
  const interval = setInterval(fetchTickets, 10000); // refresh every 10s

  return () => clearInterval(interval); // cleanup
}, []);

  function openTicket(ticket) {
    setSelected(ticket);
    setEditedReply(ticket.draftReply);
  }

 async function handleApprove() {
  setLoading(true);
  try {
    await approveTicket(selected.id);
    setTickets(tickets.filter(t => t.id !== selected.id));
    setSelected(null);
    toast.success("Ticket approved and sent to customer");
  } catch (err) {
    toast.error("Failed to approve ticket");
  }
  setLoading(false);
}

async function handleEdit() {
  setLoading(true);
  try {
    await editTicket(selected.id, editedReply);
    setTickets(tickets.filter(t => t.id !== selected.id));
    setSelected(null);
    toast.success("Edited reply sent to customer");
  } catch (err) {
    toast.error("Failed to send edited reply");
  }
  setLoading(false);
}

async function handleReject() {
  setLoading(true);
  try {
    await rejectTicket(selected.id);
    setTickets(tickets.filter(t => t.id !== selected.id));
    setSelected(null);
    toast.success("Ticket rejected");
  } catch (err) {
    toast.error("Failed to reject ticket");
  }
  setLoading(false);
}


  return (
    <div className="p-6 flex gap-6">
      {/* Ticket list */}
      <div className="w-1/3">
        <h1 className="text-xl font-semibold mb-4">Review queue ({tickets.length})</h1>
        {tickets.length === 0 && (
          <p className="text-gray-400 text-sm">No tickets waiting for review</p>
        )}
        {tickets.map(ticket => (
          <div
            key={ticket.id}
            onClick={() => openTicket(ticket)}
            className={`border rounded-xl p-4 mb-3 cursor-pointer hover:border-gray-400 transition ${selected?.id === ticket.id ? "border-purple-400 bg-purple-50" : "bg-white"}`}
          >
            <p className="font-medium text-sm text-gray-800">{ticket.subject}</p>
            <p className="text-xs text-gray-500 mt-1">{ticket.customerEmail}</p>
            <div className="flex gap-2 mt-2">
              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{ticket.urgency}</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{ticket.category}</span>
              <span className="text-xs text-gray-400">conf: {ticket.confidence}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Ticket detail */}
      {selected && (
        <div className="flex-1 bg-white border rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-1">{selected.subject}</h2>
          <p className="text-sm text-gray-500 mb-4">{selected.customerEmail}</p>

          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-xs text-gray-400 mb-1">Customer message</p>
            <p className="text-sm text-gray-700">{selected.body}</p>
          </div>

          <div className="mb-4">
            <p className="text-xs text-gray-400 mb-1">AI draft reply — edit if needed</p>
            <textarea
              className="w-full border rounded-lg p-3 text-sm text-gray-700 min-h-32 focus:outline-none focus:border-purple-400"
              value={editedReply}
              onChange={e => setEditedReply(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleApprove}
              disabled={loading}
              className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition"
            >
              Approve as-is
            </button>
            <button
              onClick={handleEdit}
              disabled={loading}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-600 transition"
            >
              Send edited reply
            </button>
            <button
              onClick={handleReject}
              disabled={loading}
              className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition"
            >
              Reject
            </button>
          </div>
        </div>
      )}
    </div>
  );
}