import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const publicClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const statusConfig = {
  pending: {
    label: "Received",
    desc: "Your ticket has been received and is being processed.",
    color: "bg-gray-100 text-gray-600",
    dot: "bg-gray-400",
  },
  in_review: {
    label: "In review",
    desc: "Our team is reviewing your ticket and will respond shortly.",
    color: "bg-amber-100 text-amber-700",
    dot: "bg-amber-400",
  },
  auto_resolved: {
    label: "Resolved",
    desc: "We have sent you a reply. See below.",
    color: "bg-green-100 text-green-700",
    dot: "bg-green-500",
  },
  approved: {
    label: "Resolved",
    desc: "Our team has reviewed and sent you a reply. See below.",
    color: "bg-green-100 text-green-700",
    dot: "bg-green-500",
  },
  escalated: {
    label: "Escalated",
    desc: "Your ticket has been escalated to a senior agent. We will contact you soon.",
    color: "bg-red-100 text-red-700",
    dot: "bg-red-500",
  },
  rejected: {
    label: "Being handled",
    desc: "A support agent is personally handling your ticket.",
    color: "bg-blue-100 text-blue-700",
    dot: "bg-blue-500",
  },
};

export default function TicketStatus() {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [retries, setRetries] = useState(0);

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 10;

    async function fetchTicket() {
      try {
        const res = await publicClient.get(`/api/portal/ticket/${ticketId}`);
        setTicket(res.data.ticket);
        setLoading(false);
      } catch (err) {
        attempts++;
        setRetries(attempts);
        if (attempts >= maxAttempts) {
          setNotFound(true);
          setLoading(false);
        }
      }
    }

    fetchTicket();
    const interval = setInterval(() => {
      if (ticket || notFound) {
        clearInterval(interval);
        return;
      }
      fetchTicket();
    }, 3000);

    return () => clearInterval(interval);
  }, [ticketId]);

  // Auto refresh ticket status every 5s after found
  useEffect(() => {
    if (!ticket) return;
    const interval = setInterval(() => {
      publicClient.get(`/api/portal/ticket/${ticketId}`)
        .then(r => setTicket(r.data.ticket))
        .catch(() => {});
    }, 5000);
    return () => clearInterval(interval);
  }, [ticket]);

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Processing your ticket...</p>
        <p className="text-gray-400 text-sm mt-1">Our AI is working on it — usually takes 20-30 seconds</p>
        {retries > 0 && (
          <p className="text-gray-300 text-xs mt-2">Checking... attempt {retries}</p>
        )}
      </div>
    </div>
  );

  if (notFound || !ticket) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <p className="text-gray-600 font-medium">Ticket not found</p>
        <p className="text-gray-400 text-sm mt-1">Check your ticket ID and try again</p>
        <div className="flex gap-3 justify-center mt-4">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 text-sm border rounded-lg px-4 py-2 hover:bg-gray-100 transition"
          >
            ← Go back
          </button>
          <button
            onClick={() => navigate("/portal")}
            className="text-purple-500 text-sm border border-purple-200 rounded-lg px-4 py-2 hover:bg-purple-50 transition"
          >
            Submit new ticket
          </button>
        </div>
      </div>
    </div>
  );

  const config = statusConfig[ticket.status] || statusConfig.pending;
  const reply = ticket.finalReply || ticket.draftReply;
  const isResolved = ticket.status === "auto_resolved" || ticket.status === "approved";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">

        {/* Back button */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-gray-500 text-sm hover:text-gray-700 transition"
          >
            ← Back
          </button>
          <button
            onClick={() => navigate("/portal")}
            className="text-purple-500 text-sm hover:underline"
          >
            New ticket
          </button>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Your ticket</h1>
          <p className="text-xs text-gray-400 mt-1 font-mono">{ticket.id}</p>
        </div>

        {/* Status badge */}
        <div className={`rounded-xl px-4 py-3 flex items-center gap-3 mb-4 ${config.color}`}>
          <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${config.dot}`}></div>
          <div>
            <p className="font-medium text-sm">{config.label}</p>
            <p className="text-xs mt-0.5 opacity-80">{config.desc}</p>
          </div>
        </div>

        {/* Ticket details */}
        <div className="bg-white border rounded-xl p-5 mb-4">
          <p className="text-xs text-gray-400 mb-1">Your request</p>
          <p className="font-medium text-gray-800 mb-2">{ticket.subject}</p>
          <p className="text-sm text-gray-600">{ticket.body}</p>
          <p className="text-xs text-gray-400 mt-3">
            Submitted {new Date(ticket.createdAt).toLocaleString()}
          </p>
        </div>

        {/* AI Reply */}
        {isResolved && reply && (
          <div className="bg-white border border-green-200 rounded-xl p-5 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-xs font-semibold">
                AI
              </div>
              <p className="text-sm font-medium text-gray-700">Support team reply</p>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{reply}</p>
          </div>
        )}

        {/* Still processing */}
        {!isResolved && (
          <div className="bg-white border rounded-xl p-4 text-center mb-4">
            <p className="text-sm text-gray-500">
              We are working on your ticket. This page updates automatically every 5 seconds.
            </p>
            <p className="text-xs text-gray-400 mt-1">Typical response time: under 2 minutes</p>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 border rounded-lg py-2 text-sm text-gray-600 hover:bg-gray-100 transition"
          >
            ← Back
          </button>
          <button
            onClick={() => navigate("/portal")}
            className="flex-1 bg-purple-500 text-white rounded-lg py-2 text-sm font-medium hover:bg-purple-600 transition"
          >
            Submit another →
          </button>
        </div>

      </div>
    </div>
  );
}