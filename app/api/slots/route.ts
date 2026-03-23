import { NextRequest, NextResponse } from "next/server";
import { getAvailableDates, getTimeSlots } from "@/lib/googleSheets";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");
  const date = searchParams.get("date");

  try {
    if (action === "dates") {
      const dates = await getAvailableDates();
      return NextResponse.json({ dates });
    }

    if (action === "slots" && date) {
      const slots = await getTimeSlots(date);
      return NextResponse.json({ slots });
    }

    return NextResponse.json(
      { error: "Invalid action. Use action=dates or action=slots&date=YYYY-MM-DD" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Slots API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
