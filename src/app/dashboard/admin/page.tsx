"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Appointment = {
  _id: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  approvalStatus: "pending" | "approved" | "rejected";
};

export default function AdminDashboard() {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    const u = localStorage.getItem("user");

    if (!t || !u) return;

    const user = JSON.parse(u);
    if (user.role !== "admin") return;

    setToken(t);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null); // hides admin dashboard immediately
    router.push("/login");
  }

  async function loadAppointments(t: string) {
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch("/api/appointments", {
        headers: { Authorization: `Bearer ${t}` },
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setMsg(data?.error || "Failed to load appointments");
        setAppointments([]);
        return;
      }

      setAppointments(data.appointments || []);
    } catch {
      setMsg("Network error while loading appointments");
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) loadAppointments(token);
  }, [token]);

  async function setStatus(id: string, approvalStatus: "approved" | "rejected") {
    if (!token) return;

    setLoading(true);
    setMsg(null);

    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ approvalStatus }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMsg(data?.error || "Failed to update status");
        return;
      }

      // ✅ Always re-fetch to keep admin table in sync with DB
      await loadAppointments(token);

      setMsg(`Appointment ${approvalStatus} ✅`);
    } catch {
      setMsg("Network error while updating appointment");
    } finally {
      setLoading(false);
    }
  }

  // If not logged in as admin
  if (!token) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white border border-slate-100 shadow-sm rounded-2xl p-6 text-center">
          <h2 className="text-xl font-bold text-slate-900">Admin Login Required</h2>
          <p className="mt-2 text-sm text-slate-600">
            You must login as admin to access this page.
          </p>
          <Link
            href="/login"
            className="mt-4 inline-block rounded-xl bg-emerald-700 px-4 py-2.5 text-white font-semibold hover:bg-emerald-800 transition"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 space-y-6">
      {/* Header card */}
      <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Admin Dashboard</h2>
            <p className="mt-1 text-sm text-slate-600">
              All appointments will appear here. Approve or reject any request.
            </p>
          </div>

          {/* ✅ Logout LEFT of Refresh (as you asked) */}
          <div className="flex gap-2">
            <button
              onClick={handleLogout}
              className="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-700 transition"
            >
              Logout
            </button>

            <button
              onClick={() => token && loadAppointments(token)}
              disabled={loading}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60 transition"
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>

        {msg && (
          <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-700">
            {msg}
          </div>
        )}
      </div>

      {/* Table card */}
      <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Appointments Table</h3>
          {loading && <span className="text-sm text-slate-500">Loading...</span>}
        </div>

        {/* ✅ Always show table (even if empty) */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b">
                <th className="py-2 pr-3 font-semibold text-slate-900">Patient Name</th>
                <th className="py-2 pr-3 font-semibold text-slate-900">Date & Time</th>
                <th className="py-2 pr-3 font-semibold text-slate-900">Preferred Doctor</th>
                <th className="py-2 pr-3 font-semibold text-slate-900">Status</th>
                <th className="py-2 font-semibold text-slate-900">Action</th>
              </tr>
            </thead>

            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-slate-500">
                    No appointments yet.
                  </td>
                </tr>
              ) : (
                appointments.map((a) => (
                  <tr key={a._id} className="border-b last:border-b-0">
                    <td className="py-3 pr-3 font-semibold text-slate-900">{a.patientName}</td>

                    <td className="py-3 pr-3 font-semibold text-slate-900">
                      {a.date} — {a.time}
                    </td>

                    <td className="py-3 pr-3 font-semibold text-slate-900">{a.doctorName}</td>

                    <td className="py-3 pr-3 ">
                      <StatusPill status={a.approvalStatus} />
                    </td>

                    <td className="py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setStatus(a._id, "approved")}
                          disabled={loading}
                          className="rounded-xl bg-emerald-700 px-3 py-2 text-white text-xs font-semibold hover:bg-emerald-800 disabled:opacity-60 transition"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => setStatus(a._id, "rejected")}
                          disabled={loading}
                          className="rounded-xl bg-rose-600 px-3 py-2 text-white text-xs font-semibold hover:bg-rose-700 disabled:opacity-60 transition"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: "pending" | "approved" | "rejected" }) {
  const cls =
    status === "approved"
      ? "bg-emerald-50 text-emerald-700"
      : status === "rejected"
      ? "bg-rose-50 text-rose-700"
      : "bg-amber-50 text-amber-700";

  return (
    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${cls}`}>
      {status}
    </span>
  );
}
