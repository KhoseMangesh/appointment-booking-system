"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        // Show success message for 3 seconds, then redirect to home
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("REGISTER ERROR:", err);
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "400px",
            padding: "40px",
            backgroundColor: "#dcfce7",
            borderRadius: "10px",
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "20px" }}>✅</div>
          <h2 style={{ color: "#065f46", marginBottom: "15px" }}>
            Registration Successful!
          </h2>
          <p style={{ color: "#047857", marginBottom: "25px" }}>
            Your account has been created successfully.
          </p>
          <p style={{ color: "#6b7280", fontSize: "14px" }}>
            Redirecting to home page in 3 seconds...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleRegister}
        style={{
          width: "400px",
          padding: "30px",
          border: "1px solid #e5e7eb",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backgroundColor: "white",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "25px", color: "#0f766e" }}>
          Create Account
        </h2>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
            Full Name
          </label>
          <input
            name="name"
            placeholder="Enter your full name"
            required
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              fontSize: "16px",
              backgroundColor: loading ? "#f3f4f6" : "white",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
            Email Address
          </label>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              fontSize: "16px",
              backgroundColor: loading ? "#f3f4f6" : "white",
            }}
          />
        </div>

        <div style={{ marginBottom: "25px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
            Password
          </label>
          <input
            name="password"
            type="password"
            placeholder="Create a strong password"
            required
            disabled={loading}
            minLength={6}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              fontSize: "16px",
              backgroundColor: loading ? "#f3f4f6" : "white",
            }}
          />
          <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "5px" }}>
            Must be at least 6 characters long
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: loading ? "#9ca3af" : "#0f766e",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "600",
            transition: "background-color 0.2s",
          }}
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <div style={{ textAlign: "center", marginTop: "20px", color: "#6b7280" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#0f766e", textDecoration: "none", fontWeight: "500" }}>
            Login here
          </a>
        </div>
      </form>
    </div>
  );
}