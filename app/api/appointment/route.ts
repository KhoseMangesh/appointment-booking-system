import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Appointment from "d:/git/demo/appointment-booking/models/appointment";

export async function POST(req: Request) {
  try {
    const { userId, name, doctor, date, time } = await req.json();
    await connectDB();

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const appt = await Appointment.create({
      userId,
      name,
      doctor,
      date,
      time,
    });

    return NextResponse.json({
      message: "Appointment saved",
      appointment: appt,
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to book appointment" },
      { status: 500 }
    );
  }
}
