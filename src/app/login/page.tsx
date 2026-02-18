"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type Msg = { type: "success" | "error"; text: string };

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<Msg | null>(null);

  const canSubmit = useMemo(() => {
    return email.includes("@") && password.length >= 6;
  }, [email, password]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    if (!canSubmit) {
      setMsg({ type: "error", text: "Enter a valid email and password (min 6)." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setMsg({ type: "error", text: data?.error || "Login failed" });
        return;
      }

      // ✅ Save token & user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ Redirect based on role
      const role = data?.user?.role;
      const redirectTo = role === "admin" ? "/dashboard/admin" : "/appointments";

      setMsg({ type: "success", text: "Login successful! Redirecting..." });

      // ✅ Go to correct page after 2s
      setTimeout(() => router.push(redirectTo), 1500);
    } catch {
      setMsg({ type: "error", text: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900">Login</h2>
        <p className="mt-1 text-sm text-slate-600">Access your account to manage appointments.</p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <Field label="Email" hint="e.g. name@gmail.com">
            <input
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="email"
            />
          </Field>

          <Field label="Password" hint="Enter your password">
            <input
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-600">
          Don’t have an account?{" "}
          <Link href="/register" className="font-semibold text-emerald-800 hover:underline">
            Register
          </Link>
        </p>
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

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1 text-sm font-semibold text-slate-700">{label}</div>
      {children}
      <div className="mt-1 text-xs text-slate-400">{hint}</div>
    </label>
  );
}
