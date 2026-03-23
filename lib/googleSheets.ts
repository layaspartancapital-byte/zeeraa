import { google } from "googleapis";

function getAuth() {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return auth;
}

function getSheets() {
  const auth = getAuth();
  return google.sheets({ version: "v4", auth });
}

const SHEET_ID = process.env.SHEET_ID || "";

export async function getAvailableDates(): Promise<string[]> {
  try {
    const sheets = getSheets();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "availability!A:A",
    });
    const rows = response.data.values || [];
    return rows.flat().filter((date: string) => date && date.trim() !== "");
  } catch (error) {
    console.error("Error fetching available dates:", error);
    return [];
  }
}

export async function getTimeSlots(date: string): Promise<string[]> {
  try {
    const sheets = getSheets();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "slots!A:B",
    });
    const rows = response.data.values || [];
    return rows
      .filter((row: string[]) => row[0] === date)
      .map((row: string[]) => row[1])
      .filter(Boolean);
  } catch (error) {
    console.error("Error fetching time slots:", error);
    return [];
  }
}

export async function writeBooking(data: {
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
    const sheets = getSheets();
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "bookings!A:H",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            data.date,
            data.time,
            data.name,
            data.email,
            data.phone,
            data.company,
            data.platform,
            data.revenue,
          ],
        ],
      },
    });
    return true;
  } catch (error) {
    console.error("Error writing booking:", error);
    return false;
  }
}
