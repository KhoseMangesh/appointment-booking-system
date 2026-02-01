import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    await connectDB();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Set role based on email
    const role = email === "mangehkhose794@gmail.com" ? "admin" : "user";

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role,
    });

    return NextResponse.json({ 
      message: "Registered successfully",
      userId: newUser._id.toString()
    });
  } catch (err: any) {
    console.error("REGISTER API ERROR:", err);
    return NextResponse.json(
      { message: "Registration failed" },
      { status: 500 }
    );
  }
}