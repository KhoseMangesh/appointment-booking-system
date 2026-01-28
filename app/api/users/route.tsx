import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "d:/git/demo/appointment-booking/models/user";

export async function GET() {
  await connectDB();
  const users = await User.find();
  return NextResponse.json(users);
}
