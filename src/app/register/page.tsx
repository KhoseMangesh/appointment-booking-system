"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type Msg = { type: "success" | "error"; text: string };

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<Msg | null>(null);

  const canSubmit = useMemo(() => {
    return name.trim().length >= 2 && email.includes("@") && password.length >= 6;
  }, [name, email, password]);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    if (!canSubmit) {
      setMsg({ type: "error", text: "Please fill all fields correctly (password min 6)." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setMsg({ type: "error", text: data?.error || "Registration failed" });
        return;
      }

      // Save token + user for later requests
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMsg({ type: "success", text: "Registration successful! Redirecting to Home..." });

      setTimeout(() => router.push("/"), 3000);
    } catch {
      setMsg({ type: "error", text: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
        <p className="mt-1 text-sm text-slate-600">
          Register to book appointments at City Hospital.
        </p>

        <form onSubmit={handleRegister} className="mt-6 space-y-4">
          <Field label="Full Name" placeholder="e.g. Mangesh Khose">
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </Field>

          <Field label="Email" placeholder="e.g. name@gmail.com">
            <input
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="email"
            />
          </Field>

          <Field label="Password" placeholder="Minimum 6 characters">
            <input
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="new-password"
            />
          </Field>

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
            className="w-full rounded-xl bg-emerald-700 px-4 py-2.5 text-white font-semibold hover:bg-emerald-800 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-600">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-emerald-800 hover:underline">
            Login
          </Link>
        </p>
      </div>

      {/* Tailwind helper class for inputs */}
      <style jsx global>{`
        .input {
          width: 100%;
          border: 1px solid rgb(226 232 240);
          border-radius: 0.75rem;
          padding: 0.625rem 0.75rem;
          outline: none;
        }
        .input:focus {
          border-color: rgb(16 185 129);
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  placeholder,
  children,
}: {
  label: string;
  placeholder: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1 text-sm font-semibold text-slate-700">{label}</div>
      <div className="relative">
        {children}
        <div className="mt-1 text-xs text-slate-400">{placeholder}</div>
      </div>
    </label>
  );
}
