export const runtime = "nodejs";

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "../../../lib/db";
import Profile from "../../../models/profile";

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
  try {
    await connectDB();
    const user = getUser(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const profile = await Profile.findOne({ userId: user.userId });
    return NextResponse.json({ profile: profile || null });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const user = getUser(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { fullName, age, weight, pastMedicalCondition } = await req.json();

    const profile = await Profile.findOneAndUpdate(
      { userId: user.userId },
      { fullName, age, weight, pastMedicalCondition },
      { upsert: true, new: true }
    );

    return NextResponse.json({ message: "Saved", profile });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
