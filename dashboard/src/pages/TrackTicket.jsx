import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TrackTicket() {
  const [ticketId, setTicketId] = useState("");
  const navigate = useNavigate();

  function handleTrack(e) {
    e.preventDefault();
    if (!ticketId.trim()) return;
    navigate(`/portal/ticket/${ticketId.trim()}`);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">Track your ticket</h1>
          <p className="text-sm text-gray-500 mt-1">Enter your ticket ID to check the status</p>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <form onSubmit={handleTrack} className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Ticket ID</label>
              <input
                type="text"
                value={ticketId}
                onChange={e => setTicketId(e.target.value)}
                placeholder="e.g. bd18ea45-fbaf-4863..."
                className="w-full border rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-purple-400"
              />
            </div>
            <button
              type="submit"
              className="bg-purple-500 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-purple-600 transition"
            >
              Track ticket
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Don't have a ticket yet?{" "}
          <a href="/portal" className="text-purple-500 hover:underline">Submit one here</a>
        </p>
      </div>
    </div>
  );
}