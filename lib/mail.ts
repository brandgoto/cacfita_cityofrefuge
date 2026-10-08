import { env } from "cloudflare:workers";
import type { Enquiry } from "@/lib/enquiry";
import { site } from "@/lib/site-data";

const SECRET_NAMES = ["RESEND_API_KEY", "RESEND_FROM_EMAIL", "CHURCH_NOTIFICATION_EMAIL"] as const;

function readSecret(name: (typeof SECRET_NAMES)[number]) {
  try {
    const fromProcess = process.env[name];
    if (typeof fromProcess === "string" && fromProcess.trim()) return fromProcess.trim();
    const fromBinding = env[name];
    if (typeof fromBinding === "string" && fromBinding.trim()) return fromBinding.trim();
  } catch {
    return "";
  }
  return "";
}

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function notificationFields(enquiry: Enquiry) {
  const fields: Array<[string, string]> = [
    ["First Name", enquiry.firstName],
    ["Last Name", enquiry.lastName],
    ["Email", enquiry.email],
    ["Phone Number", enquiry.phone],
    ["Form Source", enquiry.formSource],
  ];
  if (enquiry.interestedDay) fields.push(["Interested Day", enquiry.interestedDay]);
  if (enquiry.guests !== undefined) fields.push(["Number of Guests", String(enquiry.guests)]);
  if (enquiry.enquiry) fields.push(["Message / Enquiry", enquiry.enquiry]);
  if (enquiry.consent) fields.push(["Consent", "Yes"]);
  if (enquiry.utmSource) fields.push(["UTM Source", enquiry.utmSource]);
  if (enquiry.utmMedium) fields.push(["UTM Medium", enquiry.utmMedium]);
  if (enquiry.utmCampaign) fields.push(["UTM Campaign", enquiry.utmCampaign]);
  if (enquiry.utmContent) fields.push(["UTM Content", enquiry.utmContent]);
  if (enquiry.utmTerm) fields.push(["UTM Term", enquiry.utmTerm]);
  fields.push(["Landing Page", enquiry.landingPage]);
  return fields;
}

function notificationText(enquiry: Enquiry) {
  return notificationFields(enquiry).map(([label, value]) => `${label}: ${value}`).join("\n");
}

function notificationHtml(enquiry: Enquiry) {
  const rows = notificationFields(enquiry)
    .map(([label, value]) => `<tr><td style="padding:10px 12px 10px 0;vertical-align:top;color:#5c6b76;font-size:13px;font-weight:700;">${escapeHtml(label)}</td><td style="padding:10px 0;vertical-align:top;color:#102033;font-size:15px;white-space:pre-wrap;">${escapeHtml(value)}</td></tr>`)
    .join("");
  return `<!DOCTYPE html><html><body style="margin:0;padding:24px;background:#f6f3ee;font-family:Georgia,serif;color:#102033;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;padding:28px;"><tr><td><p style="margin:0 0 8px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#8a6a12;">City of Refuge</p><h1 style="margin:0 0 20px;font-size:28px;font-weight:500;">New enquiry</h1><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table></td></tr></table></body></html>`;
}

function confirmationText(enquiry: Enquiry) {
  const [saturday, sunday] = site.events;
  return [
    `Hello ${enquiry.firstName},`,
    "",
    `Thank you for connecting with ${site.name}.`,
    "",
    "We’re looking forward to welcoming you.",
    "",
    "Launch Weekend",
    "",
    `${saturday.day}, ${saturday.date}`,
    saturday.time,
    "",
    `${sunday.day}, ${sunday.date}`,
    sunday.time,
    "",
    "Venue:",
    site.venue,
    "864 Exeter Road",
    "London, Ontario",
    "N6E 1L5",
    "",
    "Light refreshments will be served on both days.",
    "",
    site.name,
  ].join("\n");
}

function confirmationHtml(enquiry: Enquiry) {
  const [saturday, sunday] = site.events;
  return `<!DOCTYPE html><html><body style="margin:0;padding:24px 16px;background:#f6f3ee;font-family:Georgia,serif;color:#102033;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;"><tr><td style="padding:36px 28px;font-size:17px;line-height:1.55;"><p style="margin:0 0 8px;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#8a6a12;">${escapeHtml(site.shortName)}</p><h1 style="margin:0 0 18px;font-size:32px;font-weight:500;line-height:1.15;">We’re looking forward to welcoming you</h1><p style="margin:0 0 16px;">Hello ${escapeHtml(enquiry.firstName)},</p><p style="margin:0 0 16px;">Thank you for connecting with ${escapeHtml(site.name)}.</p><p style="margin:0 0 28px;">We’re looking forward to welcoming you.</p><p style="margin:0 0 8px;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#8a6a12;">Launch Weekend</p><p style="margin:0 0 4px;"><strong>${escapeHtml(saturday.day)}, ${escapeHtml(saturday.date)}</strong><br>${escapeHtml(saturday.time)}</p><p style="margin:0 0 24px;"><strong>${escapeHtml(sunday.day)}, ${escapeHtml(sunday.date)}</strong><br>${escapeHtml(sunday.time)}</p><p style="margin:0 0 8px;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#8a6a12;">Venue</p><p style="margin:0 0 24px;">${escapeHtml(site.venue)}<br>864 Exeter Road<br>London, Ontario<br>N6E 1L5</p><p style="margin:0 0 28px;">Light refreshments will be served on both days.</p><p style="margin:0;color:#5c6b76;">${escapeHtml(site.name)}</p></td></tr></table></body></html>`;
}

async function sendEmail(apiKey: string, from: string, message: { to: string; subject: string; html: string; text: string; replyTo?: string }) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: message.to,
      subject: message.subject,
      html: message.html,
      text: message.text,
      ...(message.replyTo ? { reply_to: message.replyTo } : {}),
    }),
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) console.error("Resend email failed", response.status);
  return response.ok;
}

export async function sendEnquiryEmails(enquiry: Enquiry) {
  const apiKey = readSecret("RESEND_API_KEY");
  const from = readSecret("RESEND_FROM_EMAIL");
  const churchEmail = readSecret("CHURCH_NOTIFICATION_EMAIL");
  if (!apiKey || !from || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(churchEmail)) {
    console.error("Enquiry email is not configured");
    return false;
  }

  try {
    const [notice, confirmation] = await Promise.all([
      sendEmail(apiKey, from, {
        to: churchEmail,
        subject: `New City of Refuge Enquiry — ${enquiry.firstName} ${enquiry.lastName}`,
        html: notificationHtml(enquiry),
        text: notificationText(enquiry),
        replyTo: enquiry.email,
      }),
      sendEmail(apiKey, from, {
        to: enquiry.email,
        subject: "We’re looking forward to welcoming you",
        html: confirmationHtml(enquiry),
        text: confirmationText(enquiry),
      }),
    ]);
    return notice && confirmation;
  } catch (error) {
    console.error("Enquiry email failed", error instanceof Error ? error.name : "unknown");
    return false;
  }
}
