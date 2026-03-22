import { useState } from "react";
import toast from "react-hot-toast";
import client from "../api/client";

export default function SubmitTicket() {
  const [form, setForm] = useState({
    subject: "",
    body: "",
    customerEmail: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.subject || !form.body || !form.customerEmail) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const res = await client.post("/api/tickets", form);
      toast.success(`Ticket queued — ID: ${res.data.ticketId.slice(0, 8)}...`);
      setForm({ subject: "", body: "", customerEmail: "" });
    } catch (err) {
      toast.error("Failed to submit ticket");
    }
    setLoading(false);
  }

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">Submit ticket</h1>
      <p className="text-sm text-gray-500 mb-6">Submit a test ticket and watch it process through the AI pipeline.</p>

      <form onSubmit={handleSubmit} className="bg-white border rounded-xl p-6 flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Customer email</label>
          <input
            type="email"
            name="customerEmail"
            value={form.customerEmail}
            onChange={handleChange}
            placeholder="customer@example.com"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Subject</label>
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="e.g. Cannot login to my account"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Message</label>
          <textarea
            name="body"
            value={form.body}
            onChange={handleChange}
            placeholder="Describe the issue in detail..."
            rows={5}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-purple-500 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-purple-600 transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit ticket"}
        </button>
      </form>

      <div className="mt-6 bg-white border rounded-xl p-4">
        <p className="text-xs font-medium text-gray-500 mb-3">Quick test tickets</p>
        <div className="flex flex-col gap-2">
          {[
            { subject: "Cannot login", body: "I keep getting an error when I try to login.", customerEmail: "test1@example.com" },
            { subject: "Charged twice", body: "I was charged twice for my subscription this month.", customerEmail: "test2@example.com" },
            { subject: "URGENT - System down", body: "Our entire system is down and customers are affected. Critical emergency.", customerEmail: "test3@example.com" },
            { subject: "I have a problem", body: "Something seems off but not sure what exactly.", customerEmail: "test4@example.com" },
          ].map((ticket, i) => (
            <button
              key={i}
              onClick={() => setForm(ticket)}
              className="text-left text-xs px-3 py-2 rounded-lg border hover:bg-gray-50 transition text-gray-600"
            >
              {ticket.subject}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}