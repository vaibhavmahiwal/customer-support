import { BrowserRouter, Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Overview from "./pages/Overview";
import ReviewQueue from "./pages/ReviewQueue";
import TicketHistory from "./pages/TicketHistory";
import SubmitTicket from "./pages/SubmitTicket";
import CustomerPortal from "./pages/CustomerPortal";
import TicketStatus from "./pages/TicketStatus";
import TrackTicket from "./pages/TrackTicket";
import Landing from "./pages/Landing";
import { getReviewQueue } from "./api/tickets";

function DashboardLayout() {
  const navigate = useNavigate();
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    const fetchCount = () => {
      getReviewQueue().then(r => setReviewCount(r.data.total)).catch(() => {});
    };
    fetchCount();
    const interval = setInterval(fetchCount, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-56 bg-white border-r flex flex-col p-4">
        <h1 className="text-lg font-semibold text-gray-800 mb-8 px-2">Support AI</h1>
        <nav className="flex flex-col gap-1">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg text-sm font-medium transition ${isActive ? "bg-purple-50 text-purple-700" : "text-gray-600 hover:bg-gray-100"}`
            }
          >
            Overview
          </NavLink>
          <NavLink
            to="/dashboard/review"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg text-sm font-medium transition flex items-center justify-between ${isActive ? "bg-purple-50 text-purple-700" : "text-gray-600 hover:bg-gray-100"}`
            }
          >
            <span>Review queue</span>
            {reviewCount > 0 && (
              <span className="bg-amber-400 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                {reviewCount}
              </span>
            )}
          </NavLink>
          <NavLink
            to="/dashboard/history"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg text-sm font-medium transition ${isActive ? "bg-purple-50 text-purple-700" : "text-gray-600 hover:bg-gray-100"}`
            }
          >
            Ticket history
          </NavLink>
          <NavLink
            to="/dashboard/submit"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg text-sm font-medium transition ${isActive ? "bg-purple-50 text-purple-700" : "text-gray-600 hover:bg-gray-100"}`
            }
          >
            Submit ticket
          </NavLink>
          <div className="mt-4 pt-4 border-t flex flex-col gap-1">
            <button
              onClick={() => navigate("/")}
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 transition text-left"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/portal")}
              className="px-3 py-2 rounded-lg text-sm font-medium text-purple-600 hover:bg-purple-50 transition text-left"
            >
              Customer portal
            </button>
          </div>
        </nav>
      </div>
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/review" element={<ReviewQueue />} />
          <Route path="/history" element={<TicketHistory />} />
          <Route path="/submit" element={<SubmitTicket />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/portal" element={<CustomerPortal />} />
        <Route path="/portal/ticket/:ticketId" element={<TicketStatus />} />
        <Route path="/portal/track" element={<TrackTicket />} />
        <Route path="/dashboard/*" element={<DashboardLayout />} />
      </Routes>
    </BrowserRouter>
  );
}