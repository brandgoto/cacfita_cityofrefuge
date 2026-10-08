"use client";

import { FormEvent, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { trackLead } from "@/components/tracking";

export function LeadForm({ mode, redirectTo }: { mode: "connect" | "ads"; redirectTo?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const tracking = Object.fromEntries(["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].map((key) => [key, search.get(key) || ""]));

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (!response.ok) throw new Error("Unable to save lead");
      trackLead("Lead");
      form.reset();
      if (redirectTo) router.push(redirectTo);
      else setState("success");
    } catch { setState("error"); }
  }

  if (state === "success") return <div className="form-success" role="status"><CheckCircle2 /><h2>Thank you for connecting with us.</h2><p>Someone from the City of Refuge community will be in touch.</p></div>;

  const options = mode === "ads"
    ? ["Saturday", "Sunday", "Both Days", "I’d just like more information"]
    : ["I’m looking for a church", "I’d like to attend an upcoming program", "I recently attended", "I’d like to volunteer / serve", "I’d like to stay updated", "I have a question", "Other"];

  return <form className="lead-form" onSubmit={submit}>
    <input type="hidden" name="form_type" value={mode} />
    <input type="hidden" name="source" value={mode === "ads" ? "paid_campaign" : "website_connect"} />
    <input type="hidden" name="campaign" value={tracking.utm_campaign || (mode === "ads" ? "rooted_in_faith_together" : "organic")} />
    <input type="hidden" name="landing_page" value={pathname} />
    {Object.entries(tracking).map(([key, value]) => <input key={key} type="hidden" name={key} value={value} />)}
    <div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <div className="form-grid">
      <label>First name<input name="first_name" autoComplete="given-name" required /></label>
      <label>Last name<input name="last_name" autoComplete="family-name" required /></label>
      <label>Phone number<input name="phone" type="tel" autoComplete="tel" required /></label>
      <label>Email address<input name="email" type="email" autoComplete="email" required /></label>
    </div>
    <label className="field-full">{mode === "ads" ? "Which day are you interested in?" : "What best describes you?"}<select name={mode === "ads" ? "interested_day" : "description"} required defaultValue=""><option value="" disabled>Select one</option>{options.map((option) => <option key={option}>{option}</option>)}</select></label>
    {mode === "ads" ? <label className="field-full">Number of guests <span>Optional</span><input name="guests" type="number" min="0" inputMode="numeric" /></label> : <label className="field-full">Message <span>Optional</span><textarea name="message" rows={5} /></label>}
    <label className="consent"><input type="checkbox" name="consent" value="true" />{mode === "ads" ? "Keep me updated about City of Refuge London." : "I’d like to receive updates from CAC FITA London City of Refuge."}</label>
    <button className="button button-gold form-submit" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : mode === "ads" ? "I’m interested" : "Stay connected"}<ArrowRight /></button>
    {state === "error" && <p className="form-error" role="alert">We couldn’t save your details. Please try again in a moment.</p>}
  </form>;
}
