"use client";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {users.map((u: any) => (
        <p key={u._id}>{u.name} - {u.email}</p>
      ))}
    </div>
  );
}
