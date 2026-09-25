/**
 * Google Apps Script for Lil Gaints Contact Form & Email Notifications
 * 
 * ─────────────────────────────────────────────────────────────────────────────
 * ⚡ 3-MINUTE SETUP INSTRUCTIONS:
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. Open your Google Sheet:
 *    https://docs.google.com/spreadsheets/d/1k911JQrPVnUyP-moPVGddKJCpAlEz6kE6Wu3OCGLecc/edit
 * 
 * 2. In Google Sheets menu, click:
 *    "Extensions" (or "Tools") > "Apps Script"
 * 
 * 3. Delete any code inside Code.gs and paste this entire file content.
 * 
 * 4. Click the blue "Deploy" button at top right > "New deployment".
 *    - Click the gear icon next to "Select type" and choose: "Web app"
 *    - Description: "Lil Gaints Contact Webhook"
 *    - Execute as: "Me" (your email)
 *    - Who has access: "Anyone"  <-- CRITICAL: Choose "Anyone" so the website can post!
 * 
 * 5. Click "Deploy" and authorize permissions when prompted.
 * 
 * 6. Copy the "Web app URL" (it starts with https://script.google.com/macros/s/...)
 * 
 * 7. In your project root, open or create `.env.local` and add:
 *    GOOGLE_SHEET_WEBHOOK_URL="https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
 * 
 * 8. Restart your dev server (`npm run dev`) so Next.js loads the new env variable.
 * ─────────────────────────────────────────────────────────────────────────────
 */

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    message: "Lil Gaints Google Sheet & Gmail Webhook is active and listening for POST submissions."
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var sheetId = "1k911JQrPVnUyP-moPVGddKJCpAlEz6kE6Wu3OCGLecc";
    var ss;
    try {
      ss = SpreadsheetApp.openById(sheetId);
    } catch (openErr) {
      ss = SpreadsheetApp.getActiveSpreadsheet();
    }
    
    var sheet = ss.getSheets()[0];
    
    // Create formatted header row if sheet is fresh
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Transmission ID", "Name", "Email", "Project Brief", "Project Types"]);
      sheet.getRange(1, 1, 1, 6)
        .setFontWeight("bold")
        .setBackground("#181818")
        .setFontColor("#FFFFFF");
      sheet.setFrozenRows(1);
    }
    
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var timestamp = new Date();
    var txId = data.transmissionId || ("LG-" + Math.floor(1000 + Math.random() * 9000));
    var name = data.name || "Anonymous";
    var email = data.email || "";
    var project = data.project || "";
    var tags = Array.isArray(data.tags) ? data.tags.join(", ") : (data.tags || "None");

    // 1. Append entry to Google Sheet
    sheet.appendRow([timestamp, txId, name, email, project, tags]);

    // 2. Send email notification to raikon.tech@gmail.com
    var subject = "⚡ New Project Brief: " + name + " [" + txId + "]";
    var htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #101010; background-color: #fcfcf9; border: 1px solid #e5e5df; border-radius: 10px;">
        <div style="border-bottom: 2px solid #E14E26; padding-bottom: 14px; margin-bottom: 20px;">
          <span style="font-size: 11px; font-family: monospace; letter-spacing: 0.1em; color: #888; text-transform: uppercase;">LIL GAINTS TRANSMISSION // ${txId}</span>
          <h2 style="font-size: 22px; font-weight: 700; margin: 8px 0 0 0; color: #101010;">⚡ New Project Brief</h2>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; color: #777; font-size: 13px; width: 110px;">Client Name:</td>
            <td style="padding: 8px 0; font-weight: 600; font-size: 15px; color: #101010;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #777; font-size: 13px;">Client Email:</td>
            <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${email}" style="color: #E14E26; text-decoration: none; font-weight: 500;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #777; font-size: 13px;">Selected Types:</td>
            <td style="padding: 8px 0; font-size: 14px;"><span style="background: #f1f1eb; color: #333; padding: 3px 8px; border-radius: 4px; font-size: 12px; font-family: monospace;">${tags}</span></td>
          </tr>
        </table>

        <div style="margin-bottom: 24px;">
          <div style="font-size: 11px; font-family: monospace; color: #888; margin-bottom: 8px; text-transform: uppercase;">Project Description:</div>
          <div style="background: #ffffff; border: 1px solid #e2e2dc; border-left: 4px solid #E14E26; border-radius: 6px; padding: 16px; font-size: 14px; line-height: 1.6; color: #222;">
            ${project.replace(/\\n/g, '<br>')}
          </div>
        </div>

        <div style="border-top: 1px solid #e5e5df; padding-top: 14px; font-size: 11px; color: #999; font-family: monospace;">
          <span>Logged to Google Sheet at ${timestamp.toLocaleString()}</span>
        </div>
      </div>
    `;

    MailApp.sendEmail({
      to: "raikon.tech@gmail.com",
      subject: subject,
      htmlBody: htmlBody
    });

    return ContentService.createTextOutput(JSON.stringify({ 
      status: "success", 
      transmissionId: txId, 
      message: "Row added to Google Sheet and email dispatched to raikon.tech@gmail.com" 
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      status: "error", 
      message: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
