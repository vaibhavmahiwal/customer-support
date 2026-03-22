import { useEffect, useState } from "react";
import { getOverview, getVolume, getCategories } from "../api/stats";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Overview() {
  const [stats, setStats] = useState(null);
  const [volume, setVolume] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
  const fetchData = () => {
    getOverview().then(r => setStats(r.data));
    getVolume().then(r => setVolume(r.data.volume));
    getCategories().then(r => setCategories(r.data.categories));
  };

  fetchData();
  const interval = setInterval(fetchData, 15000);
  return () => clearInterval(interval);
}, []);

  if (!stats) return <div className="p-6 text-gray-500">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Overview</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border p-4">
          <p className="text-sm text-gray-500">Total tickets</p>
          <p className="text-3xl font-semibold mt-1">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <p className="text-sm text-gray-500">Auto resolved</p>
          <p className="text-3xl font-semibold mt-1 text-green-600">{stats.auto_resolved}</p>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <p className="text-sm text-gray-500">In review</p>
          <p className="text-3xl font-semibold mt-1 text-amber-500">{stats.in_review}</p>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <p className="text-sm text-gray-500">Escalated</p>
          <p className="text-3xl font-semibold mt-1 text-red-500">{stats.escalated}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border p-4">
          <h2 className="text-sm font-medium text-gray-600 mb-4">Tickets by day</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={volume}>
              <XAxis dataKey="_id" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#7F77DD" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border p-4">
          <h2 className="text-sm font-medium text-gray-600 mb-4">Tickets by category</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={categories} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="_id" type="category" tick={{ fontSize: 11 }} width={80} />
              <Tooltip />
              <Bar dataKey="count" fill="#1D9E75" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}