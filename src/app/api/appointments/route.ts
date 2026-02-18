export const runtime = "nodejs";

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "../../../lib/db";
import Appointment from "../../../models/appointments";

function getUser(req: Request) {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  const token = auth.slice(7);
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; role: string };
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  await connectDB();

  const user = getUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // ✅ Admin sees everything, user sees only their own
  const filter = user.role === "admin" ? {} : { userId: user.userId };

  const appointments = await Appointment.find(filter)
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json({ appointments });
}

export async function POST(req: Request) {
  await connectDB();

  const user = getUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

  const { patientName, age, weight, doctorName, date, time } = body;

  if (!patientName || !doctorName || !date || !time) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // ✅ Block double booking for same doctor+date+time
  const exists = await Appointment.findOne({ doctorName, date, time }).lean();
  if (exists) {
    return NextResponse.json(
      { error: "This time slot is already booked. Please choose another slot." },
      { status: 409 }
    );
  }

  try {
    const appt = await Appointment.create({
      userId: user.userId,
      patientName,
      age: Number(age),
      weight: Number(weight),
      doctorName,
      date,
      time,
      // approvalStatus defaults to "pending"
    });

    return NextResponse.json({ appointment: appt }, { status: 201 });
  } catch (err: any) {
    // Race-condition safe if you used unique index
    if (err?.code === 11000) {
      return NextResponse.json(
        { error: "This time slot is already booked. Please choose another slot." },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}