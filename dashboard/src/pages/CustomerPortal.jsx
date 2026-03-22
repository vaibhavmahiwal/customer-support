import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const publicClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

export default function CustomerPortal() {
  const [form, setForm] = useState({
    subject: "",
    body: "",
    customerEmail: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      const res = await publicClient.post("/api/portal/submit", form);
      toast.success("Ticket submitted successfully");
      navigate(`/portal/ticket/${res.data.ticketId}`);
    } catch (err) {
      toast.error("Failed to submit ticket");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1 text-gray-500 text-sm hover:text-gray-700 transition mb-4"
        >
          Back to home
        </button>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">Support Center</h1>
          <p className="text-sm text-gray-500 mt-1">Submit a request and we will get back to you shortly</p>
        </div>

        <div className="bg-white border rounded-xl p-6 flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Your email</label>
            <input
              type="email"
              name="customerEmail"
              value={form.customerEmail}
              onChange={handleChange}
              placeholder="you@example.com"
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
              placeholder="Briefly describe your issue"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Message</label>
            <textarea
              name="body"
              value={form.body}
              onChange={handleChange}
              placeholder="Describe your issue in detail..."
              rows={5}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400 resize-none"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-purple-500 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-purple-600 transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit request"}
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Already submitted?{" "}
          <button
            onClick={() => navigate("/portal/track")}
            className="text-purple-500 hover:underline"
          >
            Track your ticket
          </button>
        </p>
      </div>
    </div>
  );
}