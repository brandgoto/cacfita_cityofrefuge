import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { leads } from "@/db/schema";

export async function POST(request: Request) {
  const data = await request.json() as Record<string, string>;
  if (data.website) return NextResponse.json({ ok: true });
  const required = ["form_type", "first_name", "last_name", "email", "phone", "source", "landing_page"];
  if (required.some((key) => !data[key]?.trim())) return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  if (!/^\S+@\S+\.\S+$/.test(data.email)) return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  await getDb().insert(leads).values({
    formType: data.form_type, firstName: data.first_name.trim(), lastName: data.last_name.trim(), email: data.email.trim().toLowerCase(), phone: data.phone.trim(),
    description: data.description || null, message: data.message || null, interestedDay: data.interested_day || null, guests: data.guests ? Number(data.guests) : null,
    consent: data.consent === "true", source: data.source, campaign: data.campaign || null, utmSource: data.utm_source || null, utmMedium: data.utm_medium || null,
    utmCampaign: data.utm_campaign || null, utmContent: data.utm_content || null, utmTerm: data.utm_term || null, landingPage: data.landing_page,
    createdAt: new Date().toISOString(),
  });
  return NextResponse.json({ ok: true }, { status: 201 });
}
