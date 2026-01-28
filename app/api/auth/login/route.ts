import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "d:/git/demo/appointment-booking/models/user";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  await connectDB();

  const user = await User.findOne({ email });
  if (!user)
    return NextResponse.json({ message: "No account found" }, { status: 400 });

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });

  return NextResponse.json({
    message: "Login successful",
    userId: user._id,
    role: user.role
  });
}
