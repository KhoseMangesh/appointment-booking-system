import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwtjsonwebtoken from "";
import { connectDB } from "../../../lib/db";
import User from "../../../models/user";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const role = email === "mangeshkhose794@gmail.com" ? "admin" : "user";

    const user = await User.create({ name, email, passwordHash, role });

    const token = jwt.sign(
      { userId: user._id.toString(), role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      message: "Registered successfully",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
