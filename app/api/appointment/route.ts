import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId, name, doctor, date, time } = await request.json();
    
    // Your existing logic here
    // ...

    return NextResponse.json({
      message: "Appointment saved",
      appointment: { /* your data */ }
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to book appointment" },
      { status: 500 }
    );
  }
}