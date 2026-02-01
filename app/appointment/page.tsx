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

  async function handleBooking(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    const userId = localStorage.getItem("userId");
    
    if (!userId) {
      alert("Please login first");
      router.push("/login");
      return;
    }
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const name = formData.get("name") as string;
    const doctor = formData.get("doctor") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;

    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, name, doctor, date, time }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Appointment booked successfully");
      router.push("/dashboard/user");
    } else {
      alert(data.message || "❌ Booking failed");
    }
  }

  // ... rest of the component remains the same
}