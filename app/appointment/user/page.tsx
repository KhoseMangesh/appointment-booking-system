"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UserDashboard() {
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    router.push("/");
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: "30px"
      }}>
        <h2>User Dashboard</h2>
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 16px",
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>

      <div style={{ 
        backgroundColor: "#f0fdf4", 
        padding: "25px", 
        borderRadius: "8px",
        marginBottom: "20px" 
      }}>
        <h3>Welcome to Your Dashboard</h3>
        <p>Book and manage your appointments here.</p>
        
        <div style={{ marginTop: "20px" }}>
          <Link 
            href="/appointment"
            style={{
              display: "inline-block",
              padding: "12px 24px",
              backgroundColor: "#0f766e",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
              fontWeight: "bold"
            }}
          >
            📅 Book New Appointment
          </Link>
        </div>
      </div>

      <div style={{ 
        backgroundColor: "#f8fafc", 
        padding: "20px", 
        borderRadius: "8px",
        marginBottom: "20px" 
      }}>
        <h3>Your Recent Appointments</h3>
        <p>No appointments yet. Book your first appointment!</p>
      </div>
    </div>
  );
}