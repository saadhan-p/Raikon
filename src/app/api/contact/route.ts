import { NextResponse } from "next/server";

const SHEET_ID = "1k911JQrPVnUyP-moPVGddKJCpAlEz6kE6Wu3OCGLecc";
const NOTIFICATION_EMAIL = "raikon.tech@gmail.com";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, project, tags = [] } = body;

    if (!name || !email || !project) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, project" },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    const transmissionId = `LG-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString(36).slice(-3).toUpperCase()}`;

    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

    if (webhookUrl && webhookUrl.trim() !== "") {
      try {
        const gasResponse = await fetch(webhookUrl.trim(), {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({
            timestamp,
            transmissionId,
            name,
            email,
            project,
            tags,
            sheetId: SHEET_ID,
            notifyEmail: NOTIFICATION_EMAIL,
          }),
          redirect: "follow",
        });

        const gasResultText = await gasResponse.text();
        console.log(`[Google Apps Script Result] Status: ${gasResponse.status}`, gasResultText);
      } catch (webhookErr) {
        console.error("Error forwarding to Google Sheet Webhook:", webhookErr);
      }
    } else {
      console.warn(
        `⚠️ [Action Required]: GOOGLE_SHEET_WEBHOOK_URL is not set in .env.local.\n` +
        `Submissions are only printed to console until you deploy scripts/google-apps-script.js in Google Sheets Apps Script and add the Web App URL to .env.local.\n` +
        `Received: Name=${name}, Email=${email}, Project=${project}`
      );
    }

    return NextResponse.json({
      success: true,
      transmissionId,
      timestamp,
      message: "Brief received and queued for dispatch",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to process transmission" },
      { status: 500 }
    );
  }
}
