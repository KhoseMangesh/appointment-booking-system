import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "No account found with this email. Please register first." },
        { status: 400 }
      );
    }

    // Verify password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json(
        { message: "Invalid password. Please try again." },
        { status: 400 }
      );
    }

    // Check if this is the admin email
    const isAdminEmail = email === "mangehkhose794@gmail.com";
    
    // Update user role if they're logging in with admin email
    if (isAdminEmail) {
      await User.findOneAndUpdate(
        { email },
        { $set: { role: "admin" } },
        { new: true }
      );
    }

    return NextResponse.json({
      message: "Login successful",
      userId: user._id.toString(),
      role: isAdminEmail ? "admin" : user.role,
      name: user.name
    });
  } catch (err: any) {
    console.error("LOGIN ERROR:", err);
    return NextResponse.json(
      { message: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}