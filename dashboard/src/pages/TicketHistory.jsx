import { useEffect, useState } from "react";
import client from "../api/client";

export default function TicketHistory() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    client.get("/api/agents/tickets/all").then(r => setTickets(r.data.tickets));
  }, []);

  const statusColor = {
    auto_resolved: "bg-green-100 text-green-700",
    approved: "bg-blue-100 text-blue-700",
    in_review: "bg-amber-100 text-amber-700",
    escalated: "bg-red-100 text-red-700",
    rejected: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Ticket history</h1>
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 text-gray-500 font-medium">Subject</th>
              <th className="text-left px-4 py-3 text-gray-500 font-medium">Customer</th>
              <th className="text-left px-4 py-3 text-gray-500 font-medium">Category</th>
              <th className="text-left px-4 py-3 text-gray-500 font-medium">Urgency</th>
              <th className="text-left px-4 py-3 text-gray-500 font-medium">Confidence</th>
              <th className="text-left px-4 py-3 text-gray-500 font-medium">Status</th>
              <th className="text-left px-4 py-3 text-gray-500 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">{ticket.subject}</td>
                <td className="px-4 py-3 text-gray-500">{ticket.customerEmail}</td>
                <td className="px-4 py-3 text-gray-500">{ticket.category}</td>
                <td className="px-4 py-3 text-gray-500">{ticket.urgency}</td>
                <td className="px-4 py-3 text-gray-500">{(ticket.confidence * 100).toFixed(0)}%</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor[ticket.status] || "bg-gray-100 text-gray-700"}`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs">
                  {new Date(ticket.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {tickets.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-400">No tickets yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}