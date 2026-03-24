import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import useAuthStore from "../store/authStore";

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error("All fields are required");
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/api/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: "agent",
      });
      login(res.data.token, res.data.agent);
      toast.success(`Welcome, ${res.data.agent.name}`);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.error || "Signup failed");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold">S</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">Create account</h1>
          <p className="text-sm text-gray-500 mt-1">Sign up to access the dashboard</p>
        </div>

        <div className="bg-white border rounded-xl p-6 flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Full name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Min 6 characters"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Confirm password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Repeat your password"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-purple-500 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-purple-600 transition disabled:opacity-50 mt-2"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Already have an account?{" "}
          <button onClick={() => navigate("/login")} className="text-purple-500 hover:underline">
            Sign in
          </button>
        </p>
        <p className="text-center text-xs text-gray-400 mt-2">
          <button onClick={() => navigate("/")} className="text-purple-500 hover:underline">
            Back to home
          </button>
        </p>
      </div>
    </div>
  );
}