const CONTACT_WEBHOOK =
  process.env.ZAPIER_CONTACT_WEBHOOK ||
  "https://hooks.zapier.com/hooks/catch/REPLACE_CONTACT_WEBHOOK";
const BOOKING_WEBHOOK =
  process.env.ZAPIER_BOOKING_WEBHOOK ||
  "https://hooks.zapier.com/hooks/catch/REPLACE_BOOKING_WEBHOOK";

export async function submitContactForm(data: {
  name: string;
  email: string;
  phone: string;
  company: string;
  platform: string;
  message: string;
}): Promise<boolean> {
  try {
    const response = await fetch(CONTACT_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.ok;
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return false;
  }
}

export async function submitBooking(data: {
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  platform: string;
  revenue: string;
}): Promise<boolean> {
  try {
    const response = await fetch(BOOKING_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.ok;
  } catch (error) {
    console.error("Error submitting booking:", error);
    return false;
  }
}
