export const runtime = "nodejs";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "../../../lib/db";
import User from "../../../models/user";

const ADMIN_EMAIL = "mangeshkhose794@gmail.com";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // ✅ Force correct role:
    // Admin email -> admin
    // Everyone else -> user (if missing or wrong)
    if (user.email === ADMIN_EMAIL) {
      if (user.role !== "admin") {
        user.role = "admin";
        await user.save();
      }
    } else {
      if (!user.role || user.role === "admin") {
        user.role = "user";
        await user.save();
      }
    }

    const token = jwt.sign(
      { userId: user._id.toString(), role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      message: "Logged in successfully",
      token,
      user: {
        id: user._id.toString(),
        name: user.name || "",
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
