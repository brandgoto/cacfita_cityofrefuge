import { NextResponse } from "next/server";
import { parseEnquiry } from "@/lib/enquiry";
import { sendEnquiryEmails } from "@/lib/mail";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Unable to submit" }, { status: 400 });
  }

  const parsed = parseEnquiry(payload);
  if (!parsed.ok) return NextResponse.json({ error: "Unable to submit" }, { status: 400 });
  if (parsed.spam) return NextResponse.json({ ok: true });

  const sent = await sendEnquiryEmails(parsed.enquiry);
  if (!sent) return NextResponse.json({ error: "Unable to submit" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
