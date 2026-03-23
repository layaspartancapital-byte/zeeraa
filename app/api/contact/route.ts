import { NextRequest, NextResponse } from "next/server";
import { submitContactForm } from "@/lib/zapier";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, platform, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const success = await submitContactForm({
      name,
      email,
      phone: phone || "",
      company: company || "",
      platform: platform || "",
      message: message || "",
    });

    if (success) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
