export const runtime = "nodejs";

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "../../../../lib/db";
import Appointment from "../../../../models/appointments";

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

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    const user = getUser(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden (admin only)" }, { status: 403 });
    }

    const { id } = await context.params; // ✅ FIX: params must be awaited

    const { approvalStatus } = await req.json();
    if (!["approved", "rejected"].includes(approvalStatus)) {
      return NextResponse.json({ error: "Invalid approvalStatus" }, { status: 400 });
    }

    const updated = await Appointment.findByIdAndUpdate(
      id,
      { approvalStatus },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Updated", appointment: updated });
  } catch (err) {
    console.error("PATCH /api/appointments/[id] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
