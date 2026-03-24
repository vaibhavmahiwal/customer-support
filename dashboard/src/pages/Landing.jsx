import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Landing() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
  axios.get("http://localhost:3000/api/stats/public")
    .then(r => setStats(r.data))
    .catch(() => {});
}, []);

  return (
    <div className="min-h-screen bg-white">

      {/* Navbar */}
<nav className="border-b px-8 py-4 flex items-center justify-between">
  <div className="flex items-center gap-2">
    <div className="w-7 h-7 rounded-lg bg-purple-500 flex items-center justify-center">
      <span className="text-white text-xs font-bold">S</span>
    </div>
    <span className="font-semibold text-gray-800">SupportAI</span>
  </div>
  <div className="flex items-center gap-3">
    <button
      onClick={() => navigate("/portal")}
      className="text-sm text-gray-600 hover:text-gray-800 transition px-3 py-1.5"
    >
      Customer support
    </button>
    <button
      onClick={() => navigate("/login")}
      className="text-sm text-gray-600 hover:text-gray-800 transition px-3 py-1.5"
    >
      Sign in
    </button>
    <button
      onClick={() => navigate("/signup")}
      className="text-sm border border-purple-400 text-purple-600 px-4 py-1.5 rounded-lg hover:bg-purple-50 transition font-medium"
    >
      Sign up
    </button>
    <button
      onClick={() => navigate("/dashboard")}
      className="text-sm bg-purple-500 text-white px-4 py-1.5 rounded-lg hover:bg-purple-600 transition font-medium"
    >
      Dashboard
    </button>
  </div>
</nav>

      {/* Hero */}
      <section className="px-8 py-24 text-center max-w-4xl mx-auto">
        <div className="inline-block bg-purple-50 text-purple-600 text-xs font-medium px-3 py-1 rounded-full mb-6 border border-purple-100">
  AI-powered support automation
</div>
        <h1 className="text-5xl font-semibold text-gray-900 leading-tight mb-6">
          Customer support,<br />
          <span className="text-purple-500">automated by AI</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Submit a support ticket and get an AI-generated reply in under 2 minutes.
          Our three-agent AI crew classifies, drafts, and quality-checks every response.
        </p>
       <div className="flex items-center justify-center gap-4">
  <button
    onClick={() => navigate("/portal")}
    className="bg-purple-500 text-white px-8 py-3 rounded-xl text-sm font-medium hover:bg-purple-600 transition"
  >
    Submit a ticket →
  </button>
  <button
    onClick={() => navigate("/dashboard")}
    className="border text-gray-600 px-8 py-3 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
  >
    View dashboard
  </button>
</div>
      </section>

      {/* Live stats bar */}
      {stats && (
        <section className="bg-purple-50 border-y py-8">
          <div className="max-w-4xl mx-auto px-8 grid grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl font-semibold text-purple-600">{stats.total}</p>
              <p className="text-sm text-gray-500 mt-1">Tickets processed</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-purple-600">
                {stats.total > 0 ? Math.round((stats.auto_resolved / stats.total) * 100) : 0}%
              </p>
              <p className="text-sm text-gray-500 mt-1">Auto resolved</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-purple-600">&lt; 2min</p>
              <p className="text-sm text-gray-500 mt-1">Avg response time</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-purple-600">24/7</p>
              <p className="text-sm text-gray-500 mt-1">Always available</p>
            </div>
          </div>
        </section>
      )}

      {/* How it works */}
      <section className="px-8 py-20 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-3">How it works</h2>
          <p className="text-gray-500 text-sm">Three simple steps from problem to resolution</p>
        </div>
        <div className="grid grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Customer submits ticket",
              desc: "Customer fills in a simple form with their issue. No account needed — just an email and description.",
              color: "bg-purple-50 text-purple-500",
            },
            {
              step: "02",
              title: "AI crew processes it",
              desc: "Three AI agents classify the issue, search the knowledge base, draft a reply, and review it for quality.",
              color: "bg-teal-50 text-teal-500",
            },
            {
              step: "03",
              title: "Reply sent to customer",
              desc: "High confidence replies are sent automatically. Low confidence goes to a human agent for review before sending.",
              color: "bg-amber-50 text-amber-500",
            },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center text-lg font-bold mx-auto mb-4`}>
                {item.step}
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 text-sm">{item.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Arrow connectors */}
        <div className="flex justify-center gap-8 mt-4 -mt-16 pointer-events-none">
          <div className="w-1/3"></div>
          <div className="flex items-center justify-center text-gray-300 text-2xl w-8">→</div>
          <div className="w-1/3"></div>
          <div className="flex items-center justify-center text-gray-300 text-2xl w-8">→</div>
          <div className="w-1/3"></div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-3">Everything you need</h2>
            <p className="text-gray-500 text-sm">Built with modern AI and a production-ready stack</p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {[
              {
                icon: "🤖",
                title: "AI classification",
                desc: "Automatically categorises tickets by type, urgency and customer sentiment.",
                color: "bg-purple-50",
              },
              {
                icon: "⚡",
                title: "Auto reply",
                desc: "High confidence tickets are resolved automatically with no human needed.",
                color: "bg-teal-50",
              },
              {
                icon: "👤",
                title: "Human review",
                desc: "Low confidence drafts go to an agent who can approve, edit or reject.",
                color: "bg-amber-50",
              },
              {
                icon: "🔔",
                title: "Slack alerts",
                desc: "Critical tickets trigger instant Slack notifications to your support team.",
                color: "bg-red-50",
              },
              {
                icon: "📊",
                title: "Live dashboard",
                desc: "Real-time overview of all tickets, stats, charts and agent workload.",
                color: "bg-blue-50",
              },
              {
                icon: "🔍",
                title: "Ticket tracking",
                desc: "Customers can track their ticket status and see the AI reply in real time.",
                color: "bg-green-50",
              },
            ].map((feature, i) => (
              <div key={i} className="bg-white border rounded-xl p-5">
                <div className={`w-10 h-10 rounded-xl ${feature.color} flex items-center justify-center text-lg mb-3`}>
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1">{feature.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     

      {/* CTA */}
      <section className="bg-purple-500 px-8 py-20 text-center">
        <h2 className="text-3xl font-semibold text-white mb-4">Ready to try it?</h2>
        <p className="text-purple-100 text-sm mb-8 max-w-md mx-auto">
          Submit a support ticket and see the AI crew classify and draft a reply in real time.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => navigate("/portal")}
            className="bg-white text-purple-600 px-8 py-3 rounded-xl text-sm font-medium hover:bg-purple-50 transition"
          >
            Submit a ticket →
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="border border-purple-300 text-white px-8 py-3 rounded-xl text-sm font-medium hover:bg-purple-600 transition"
          >
            View dashboard
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-purple-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">S</span>
          </div>
          <span className="text-sm font-medium text-gray-600">SupportAI</span>
        </div>
        <p className="text-xs text-gray-400">AI-powered customer support</p>
        <div className="flex gap-4">
          <button onClick={() => navigate("/portal")} className="text-xs text-gray-400 hover:text-gray-600">Customer portal</button>
          <button onClick={() => navigate("/dashboard")} className="text-xs text-gray-400 hover:text-gray-600">Dashboard</button>
        </div>
      </footer>

    </div>
  );
}