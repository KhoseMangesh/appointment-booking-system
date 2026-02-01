"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  // Check if user is admin
  useEffect(() => {
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");

    if (!userId) {
      router.push("/login");
      return;
    }

    if (role !== "admin") {
      alert("Access denied. Admin only.");
      router.push("/dashboard/user");
      return;
    }

    // Fetch users if admin
    fetch("/api/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [router]);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2>Admin Dashboard</h2>
      <p>Welcome, Admin!</p>
      
      <div style={{ 
        backgroundColor: "#f0f9ff", 
        padding: "20px", 
        borderRadius: "8px",
        marginBottom: "20px" 
      }}>
        <h3>All Registered Users</h3>
        {users.length === 0 ? (
          <p>Loading users...</p>
        ) : (
          <div>
            {users.map((u: any) => (
              <div 
                key={u._id} 
                style={{ 
                  padding: "10px", 
                  borderBottom: "1px solid #e5e7eb",
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <strong>{u.name}</strong>
                  <div style={{ fontSize: "14px", color: "#6b7280" }}>
                    {u.email}
                  </div>
                </div>
                <span style={{
                  backgroundColor: u.role === "admin" ? "#dc2626" : "#059669",
                  color: "white",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "12px"
                }}>
                  {u.role}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}