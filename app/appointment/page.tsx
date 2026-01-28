"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AppointmentPage() {
  const router = useRouter();

  // 🔐 Protect route: only logged-in users
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login first to book an appointment");
      router.push("/login");
    }
  }, [router]);

  async function handleBooking(e: any) {
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        name: e.target.name.value,
        doctor: e.target.doctor.value,
        date: e.target.date.value,
        time: e.target.time.value,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Appointment booked successfully");
      router.push("/dashboard/user");
    } else {
      alert(data.message || "❌ Booking failed");
    }
  }

  return (
    <form
      onSubmit={handleBooking}
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        padding: "20px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
      }}
    >
      <h2>Book Appointment</h2>

      <input
        name="name"
        placeholder="Patient Name"
        required
        style={{ padding: "8px" }}
      />

      <input
        name="doctor"
        placeholder="Doctor Name"
        required
        style={{ padding: "8px" }}
      />

      <input
        name="date"
        type="date"
        required
        style={{ padding: "8px" }}
      />

      <input
        name="time"
        type="time"
        required
        style={{ padding: "8px" }}
      />

      <button
        type="submit"
        style={{
          padding: "10px",
          backgroundColor: "#0f766e",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "4px",
        }}
      >
        Book Appointment
      </button>
    </form>
  );
}
