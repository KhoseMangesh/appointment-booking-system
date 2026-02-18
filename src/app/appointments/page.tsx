"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Msg = { type: "success" | "error"; text: string };

const DOCTORS = [
  "Dr. Sharma (General Physician)",
  "Dr. Patil (Cardiologist)",
  "Dr. Deshmukh (Dermatologist)",
  "Dr. Joshi (Orthopedics)",
  "Dr. Khan (Dentist)",
];

// --- slot helpers ---
function pad2(n: number) {
  return String(n).padStart(2, "0");
}
function toHHMM(h: number, m: number) {
  return `${pad2(h)}:${pad2(m)}`;
}
function format12h(hhmm: string) {
  const [hStr, mStr] = hhmm.split(":");
  let h = Number(hStr);
  const m = Number(mStr);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${pad2(m)} ${ampm}`;
}
function buildSlots() {
  const slots: string[] = [];
  // 9:00 -> 14:00 (2 PM) excluding 14:00 itself
  for (let h = 9; h < 14; h++) {
    slots.push(toHHMM(h, 0));
    slots.push(toHHMM(h, 30));
  }
  // 17:00 -> 22:00 (10 PM) excluding 22:00 itself
  for (let h = 17; h < 22; h++) {
    slots.push(toHHMM(h, 0));
    slots.push(toHHMM(h, 30));
  }
  return slots;
}
const SLOTS = buildSlots();

export default function BookAppointmentPage() {
  const [token, setToken] = useState<string | null>(null);

  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [doctorName, setDoctorName] = useState(DOCTORS[0]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState(""); // selected slot "HH:MM"

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<Msg | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const canSubmit = useMemo(() => {
    const a = Number(age);
    const w = Number(weight);
    return (
      patientName.trim().length >= 2 &&
      age.length > 0 &&
      weight.length > 0 &&
      Number.isFinite(a) &&
      Number.isFinite(w) &&
      a >= 0 &&
      a <= 120 &&
      w > 0 &&
      w <= 400 &&
      doctorName.length > 0 &&
      date.length > 0 &&
      time.length > 0
    );
  }, [patientName, age, weight, doctorName, date, time]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    if (!token) {
      setMsg({ type: "error", text: "Please login first to book an appointment." });
      return;
    }
    if (!canSubmit) {
      setMsg({ type: "error", text: "Please fill all fields and select a time slot." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          patientName,
          age: Number(age),
          weight: Number(weight),
          doctorName,
          date,
          time, // ✅ slot
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.status === 409) {
        setMsg({ type: "error", text: data?.error || "Slot already booked. Choose another." });
        return;
      }

      if (!res.ok) {
        setMsg({ type: "error", text: data?.error || "Booking failed" });
        return;
      }

      setMsg({ type: "success", text: "Appointment booked successfully ✅" });

      setPatientName("");
      setAge("");
      setWeight("");
      setDoctorName(DOCTORS[0]);
      setDate("");
      setTime("");
    } catch {
      setMsg({ type: "error", text: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Book Appointment</h2>
            <p className="mt-1 text-sm text-slate-600">
              Select doctor, date, and a 30-minute slot.
            </p>
          </div>

          {!token && (
            <Link
              href="/login"
              className="shrink-0 rounded-xl bg-emerald-700 px-4 py-2 text-white text-sm font-semibold hover:bg-emerald-800 transition"
            >
              Login
            </Link>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Patient Name" hint="e.g. Rahul Patil">
              <input className="input" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
            </Field>

            <Field label="Doctor Name" hint="Choose doctor">
              <select className="input" value={doctorName} onChange={(e) => setDoctorName(e.target.value)}>
                {DOCTORS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </Field>

            <Field label="Age" hint="0 - 120">
              <input className="input" type="number" value={age} onChange={(e) => setAge(e.target.value)} />
            </Field>

            <Field label="Weight (kg)" hint="1 - 400">
              <input className="input" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
            </Field>

            <Field label="Appointment Date" hint="Select date">
              <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </Field>

            <div />
          </div>

          {/* ✅ Slot picker */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-bold text-slate-900">Select Time Slot</div>
                <div className="text-xs text-slate-600">
                  Morning: 9:00 AM–2:00 PM • Evening: 5:00 PM–10:00 PM (30-min slots)
                </div>
              </div>
              {time && (
                <div className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1">
                  Selected: {format12h(time)}
                </div>
              )}
            </div>

            <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {SLOTS.map((s) => {
                const selected = time === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setTime(s)}
                    className={[
                      "rounded-xl px-2 py-2 text-xs font-semibold border transition",
                      selected
                        ? "bg-emerald-700 text-white border-emerald-700"
                        : "bg-white text-slate-800 border-slate-200 hover:bg-slate-50",
                    ].join(" ")}
                  >
                    {format12h(s)}
                  </button>
                );
              })}
            </div>

            <div className="mt-2 text-xs text-slate-500">
              Note: If someone already booked the same date+slot (for the same doctor), booking will be blocked.
            </div>
          </div>

          {msg && (
            <div
              className={[
                "rounded-xl px-3 py-2 text-sm border",
                msg.type === "success"
                  ? "bg-emerald-50 text-emerald-800 border-emerald-100"
                  : "bg-rose-50 text-rose-800 border-rose-100",
              ].join(" ")}
            >
              {msg.text}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !canSubmit}
            className="w-full rounded-xl bg-emerald-700 px-4 py-2.5 text-white font-semibold hover:bg-emerald-800 disabled:opacity-60 transition"
          >
            {loading ? "Booking..." : "Confirm Appointment"}
          </button>
        </form>
      </div>

      <style jsx global>{`
        .input {
          width: 100%;
          border: 1px solid rgb(226 232 240);
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

function Field({ label, hint, children }: { label: string; hint: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1 text-sm font-semibold text-slate-700">{label}</div>
      {children}
      <div className="mt-1 text-xs text-slate-400">{hint}</div>
    </label>
  );
}
