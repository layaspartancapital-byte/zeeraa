import { NextRequest, NextResponse } from "next/server";
import { submitBooking } from "@/lib/zapier";
import { writeBooking } from "@/lib/googleSheets";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, time, name, email, phone, company, platform, revenue } = body;

    if (!date || !time || !name || !email) {
      return NextResponse.json(
        { error: "Date, time, name, and email are required" },
        { status: 400 }
      );
    }

    const bookingData = {
      date,
      time,
      name,
      email,
      phone: phone || "",
      company: company || "",
      platform: platform || "",
      revenue: revenue || "",
    };

    const [zapierResult, sheetsResult] = await Promise.allSettled([
      submitBooking(bookingData),
      writeBooking(bookingData),
    ]);

    const zapierSuccess = zapierResult.status === "fulfilled" && zapierResult.value;
    const sheetsSuccess = sheetsResult.status === "fulfilled" && sheetsResult.value;

    if (zapierSuccess || sheetsSuccess) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Failed to submit booking" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
