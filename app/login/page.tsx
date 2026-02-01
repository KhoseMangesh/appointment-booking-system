"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState<{name: string; role: string} | null>(null);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // Save user data to localStorage
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("role", data.role);
      localStorage.setItem("email", email);
      localStorage.setItem("name", data.name);
      
      // Show success state
      setSuccess(true);
      setUserData({ name: data.name, role: data.role });
      
      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    } else {
      alert(data.message || "Login failed");
      setLoading(false);
    }
  }

  if (success && userData) {
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
            Login Successful!
          </h2>
          <div style={{
            backgroundColor: "white",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "20px",
            border: "1px solid #a7f3d0"
          }}>
            <p style={{ margin: "5px 0", fontWeight: "500" }}>
              Welcome, <span style={{ color: "#0f766e" }}>{userData.name}</span>!
            </p>
            <p style={{ margin: "5px 0", fontSize: "14px", color: "#6b7280" }}>
              Role: <span style={{
                color: userData.role === "admin" ? "#dc2626" : "#059669",
                fontWeight: "600"
              }}>
                {userData.role.toUpperCase()}
              </span>
            </p>
          </div>
          <p style={{ color: "#047857", marginBottom: "15px" }}>
            You are now logged in.
          </p>
          <p style={{ color: "#6b7280", fontSize: "14px" }}>
            Redirecting to dashboard in 3 seconds...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "70vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <form
        onSubmit={handleLogin}
        style={{
          width: "400px",
          padding: "30px",
          border: "1px solid #e5e7eb",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backgroundColor: "white"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "25px", color: "#0f766e" }}>
          Login to Your Account
        </h2>

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
            placeholder="Enter your password"
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
            transition: "background-color 0.2s"
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div style={{ textAlign: "center", marginTop: "20px", color: "#6b7280" }}>
          Don't have an account?{" "}
          <a href="/register" style={{ color: "#0f766e", textDecoration: "none", fontWeight: "500" }}>
            Register here
          </a>
        </div>

        {/* Admin Login Hint */}
        <div style={{ 
          marginTop: "25px", 
          padding: "15px", 
          backgroundColor: "#f0f9ff", 
          borderRadius: "6px",
          borderLeft: "4px solid #0ea5e9"
        }}>
          <p style={{ margin: 0, fontSize: "14px", color: "#0369a1" }}>
            <strong>Admin Login:</strong> Use email: mangehkhose794@gmail.com with password: 123456789
            <br />
            <small>(Register with this email first if it doesn't exist)</small>
          </p>
        </div>
      </form>
    </div>
  );
}