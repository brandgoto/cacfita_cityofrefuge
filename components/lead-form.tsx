"use client";

import { FormEvent, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { trackLead } from "@/components/tracking";
import { CONNECT_DESCRIPTIONS, INTERESTED_DAYS, type FormMode } from "@/lib/enquiry";

const DAY_MODES = new Set<FormMode>(["ads", "visit", "rsvp"]);

const submitLabel: Record<FormMode, string> = {
  ads: "I’m interested",
  connect: "Stay connected",
  visit: "Let us know you’re coming",
  rsvp: "Save my place",
};

export function LeadForm({ mode }: { mode: FormMode }) {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const tracking = Object.fromEntries(["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].map((key) => [key, search.get(key) || ""]));
  const asksForDay = DAY_MODES.has(mode);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (!response.ok) throw new Error("Unable to submit");
      trackLead("Lead");
      router.push("/thank-you");
    } catch {
      setState("error");
    }
  }

  return (
    <form className="lead-form" onSubmit={submit}>
      <input type="hidden" name="form_type" value={mode} />
      <input type="hidden" name="landing_page" value={pathname} />
      {Object.entries(tracking).map(([key, value]) => <input key={key} type="hidden" name={key} value={value} />)}
      <div className="honeypot" aria-hidden="true"><label>Company<input name="hp_field" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="form-grid">
        <label>First name *<input name="first_name" autoComplete="given-name" required maxLength={80} /></label>
        <label>Last name *<input name="last_name" autoComplete="family-name" required maxLength={80} /></label>
        <label>Phone number *<input name="phone" type="tel" autoComplete="tel" required maxLength={30} /></label>
        <label>Email address *<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
      </div>
      {asksForDay ? (
        <>
          <label className="field-full">Which day are you interested in? *<select name="interested_day" required defaultValue=""><option value="" disabled>Select one</option>{INTERESTED_DAYS.map((option) => <option key={option}>{option}</option>)}</select></label>
          <label className="field-full">Number of guests <span>Optional</span><input name="guests" type="number" min="0" max="20" inputMode="numeric" /></label>
        </>
      ) : (
        <>
          <label className="field-full">What best describes you? *<select name="description" required defaultValue=""><option value="" disabled>Select one</option>{CONNECT_DESCRIPTIONS.map((option) => <option key={option}>{option}</option>)}</select></label>
          <label className="field-full">Message <span>Optional</span><textarea name="message" rows={5} maxLength={2000} /></label>
        </>
      )}
      <label className="consent"><input type="checkbox" name="consent" value="true" />{mode === "ads" ? "Keep me updated about City of Refuge London." : "I’d like to receive updates from CAC FITA London City of Refuge."}</label>
      <button className="button button-gold form-submit" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : submitLabel[mode]}<ArrowRight /></button>
      {state === "error" && <p className="form-error" role="alert">We couldn’t submit your details right now. Please try again.</p>}
    </form>
  );
}
