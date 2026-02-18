"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Profile = {
  fullName: string;
  age: number;
  weight: number;
  pastMedicalCondition: string;
};

type Appointment = {
  _id: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  approvalStatus: "pending" | "approved" | "rejected";
};

export default function UserDashboard() {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);

  const [profile, setProfile] = useState<Profile>({
    fullName: "",
    age: 0,
    weight: 0,
    pastMedicalCondition: "",
  });

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);

  // Separate messages so "Saved" doesn't get wiped by auto-refresh
  const [saveMsg, setSaveMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Get token + ensure not admin
  useEffect(() => {
    const t = localStorage.getItem("token");
    const u = localStorage.getItem("user");
    if (!t || !u) return;

    const user = JSON.parse(u);
    if (user.role === "admin") return; // admin shouldn't be here

    setToken(t);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null); // stops auto-refresh + hides dashboard immediately
    router.push("/login");
  }

  async function loadAll(t: string) {
    setLoading(true);
    setErrorMsg(null);

    try {
      const [pRes, aRes] = await Promise.all([
        fetch("/api/profile", { headers: { Authorization: `Bearer ${t}` } }),
        fetch("/api/appointments", { headers: { Authorization: `Bearer ${t}` } }),
      ]);

      const pData = await pRes.json().catch(() => ({}));
      const aData = await aRes.json().catch(() => ({}));

      if (!pRes.ok) {
        setErrorMsg(pData?.error || "Failed to load profile");
      } else if (pData.profile) {
        setProfile(pData.profile);
      }

      if (!aRes.ok) {
        setErrorMsg(aData?.error || "Failed to load appointments");
      } else {
        setAppointments(aData.appointments || []);
      }
    } catch {
      setErrorMsg("Network error while loading dashboard data");
    } finally {
      setLoading(false);
    }
  }

  // Initial load + auto refresh (so admin approve/reject reflects here)
  useEffect(() => {
    if (!token) return;

    loadAll(token);
    const id = setInterval(() => loadAll(token), 5000);

    return () => clearInterval(id);
  }, [token]);

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;

    setLoading(true);
    setSaveMsg(null);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrorMsg(data?.error || "Failed to save profile");
        return;
      }

      setSaveMsg("Profile saved successfully ✅");
    } catch {
      setErrorMsg("Network error while saving profile");
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white border border-slate-100 shadow-sm rounded-2xl p-6 text-center">
          <h2 className="text-xl font-bold text-slate-900">Login Required</h2>
          <p className="mt-2 text-sm text-slate-600">Please login to open your dashboard.</p>
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

  const upcoming = appointments;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 space-y-6">
      <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">User Dashboard</h2>
            <p className="mt-1 text-sm text-slate-600">
              Save your personal info and view appointment status.
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
              onClick={() => token && loadAll(token)}
              disabled={loading}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60 transition"
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>

        <form onSubmit={saveProfile} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Full Name">
              <input
                className="input"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                placeholder="Your full name"
              />
            </Field>

            <Field label="Age">
              <input
                className="input"
                type="number"
                value={profile.age}
                onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })}
              />
            </Field>

            <Field label="Weight (kg)">
              <input
                className="input"
                type="number"
                value={profile.weight}
                onChange={(e) => setProfile({ ...profile, weight: Number(e.target.value) })}
              />
            </Field>

            <div className="md:col-span-2">
              <Field label="Past Medical Condition">
                <textarea
                  className="input min-h-[90px]"
                  value={profile.pastMedicalCondition}
                  onChange={(e) =>
                    setProfile({ ...profile, pastMedicalCondition: e.target.value })
                  }
                  placeholder="e.g. diabetes, asthma, surgery history..."
                />
              </Field>
            </div>
          </div>

          {saveMsg && (
            <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
              {saveMsg}
            </div>
          )}

          {errorMsg && (
            <div className="rounded-xl border border-rose-100 bg-rose-50 px-3 py-2 text-sm text-rose-800">
              {errorMsg}
            </div>
          )}

          <button
            disabled={loading}
            className="w-full rounded-xl bg-emerald-700 px-4 py-2.5 text-white font-semibold hover:bg-emerald-800 disabled:opacity-60 transition"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>

      <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-bold text-slate-900">Upcoming Appointments</h3>

          <div className="flex gap-2">
            <Link
              href="/appointments"
              className="rounded-xl bg-emerald-700 px-4 py-2 text-white text-sm font-semibold hover:bg-emerald-800 transition"
            >
              Book New
            </Link>

            <button
              onClick={() => token && loadAll(token)}
              disabled={loading}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60 transition"
            >
              Refresh
            </button>
          </div>
        </div>

        {upcoming.length === 0 ? (
          <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            No appointments yet.
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b">
                  <th className="py-2 pr-3">Patient</th>
                  <th className="py-2 pr-3">Date</th>
                  <th className="py-2 pr-3">Time</th>
                  <th className="py-2 pr-3">Doctor</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {upcoming.map((a) => (
                  <tr key={a._id} className="border-b last:border-b-0">
                    <td className="py-3 pr-3 font-semibold text-slate-900">{a.patientName}</td>
                    <td className="py-3 pr-3 font-semibold text-slate-900">{a.date}</td>
                    <td className="py-3 pr-3 font-semibold text-slate-900">{a.time}</td>
                    <td className="py-3 pr-3 font-semibold text-slate-900">{a.doctorName}</td>
                    <td className="py-3">
                      <StatusPill status={a.approvalStatus} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="mt-3 text-xs text-slate-500">
              Status auto-updates every 5 seconds (admin approve/reject will reflect here).
            </p>
          </div>
        )}
      </div>

      <style jsx global>{`
        .input {
          width: 100%;
          border: 1px solid rgb(0, 0, 0);
          border-radius: 0.75rem;
          padding: 0.625rem 0.75rem;
          outline: none;
          background: white;
          color: #000;
        }
        .input:focus {
          border-color: rgb(16 185 129);
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1 text-sm font-semibold text-slate-700">{label}</div>
      {children}
    </label>
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
