import type { Metadata } from "next";
import { Suspense } from "react";
import { CalendarDays, Clock3, Coffee, MapPin } from "lucide-react";
import { LeadForm } from "@/components/lead-form";
import { ButtonLink, EventSummary, PageHero, SiteFrame } from "@/components/site-shell";
import { site } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Events & Launch Weekend",
  description: "Join CAC FITA London City of Refuge for launch weekend on October 31 and November 1, 2026 at Courtyard by Marriott London. Worship, prayer, the Word and community.",
  alternates: { canonical: "/events" },
  openGraph: {
    title: "Launch Weekend | CAC FITA London City of Refuge",
    description: "Two welcoming gatherings — October 31 at 12:00 Noon and November 1 at 11:00 AM — at Courtyard by Marriott London.",
    url: "/events",
    images: [{ url: "/events-hero.png", alt: "Launch weekend at City of Refuge" }],
  },
};

export default function EventsPage() { return <SiteFrame><main>
  <PageHero eyebrow="Gather with us" title={<>Faith grows<br /><em>in community.</em></>} copy="Discover what’s happening at City of Refuge and make plans to join us." image="/events-hero.png"><ButtonLink href="#launch">Launch weekend</ButtonLink><ButtonLink href="/visit" tone="white">Plan your visit</ButtonLink></PageHero>
  <section className="section" id="launch"><div className="container"><div className="event-feature-head"><div><p className="event-label">Featured event · 2026</p><h2>Launch <em>weekend.</em></h2></div><p>Two welcoming gatherings created for worship, prayer, the Word and genuine connection. Attend one day or join us for both.</p></div><EventSummary />
    <div className="event-detail-grid">
      <article><CalendarDays /><small>Dates</small><strong>October 31 & November 1</strong><p>Saturday and Sunday</p></article>
      <article><Clock3 /><small>Times</small><strong>12 Noon & 11:00 AM</strong><p>Doors open before each gathering</p></article>
      <article><MapPin /><small>Venue</small><strong>{site.venue}</strong><p>{site.addressLines.join(", ")}</p></article>
      <article><Coffee /><small>Hospitality</small><strong>Stay and connect</strong><p>Light refreshments served both days</p></article>
    </div>
    <div className="section-actions"><ButtonLink href="#rsvp">RSVP for launch weekend</ButtonLink><ButtonLink href="/visit" tone="outline">Plan your visit</ButtonLink><ButtonLink href={site.directionsUrl} tone="outline" external>Get directions</ButtonLink></div>
  </div></section>
  <section className="section schedule-section"><div className="container schedule-grid"><div><p className="event-label">Saturday · October 31</p><h2>Opening gathering</h2><p>We begin at <strong>12:00 Noon</strong> with worship, prayer, the Word and a warm welcome into our new church community.</p></div><div><p className="event-label">Sunday · November 1</p><h2>Sunday worship</h2><p>Join us at <strong>11:00 AM</strong> as we continue launch weekend together and look ahead to all God will build in London.</p></div></div></section>
  <section className="section connect-page" id="rsvp"><div className="container form-layout"><div className="form-intro"><p className="event-label">Launch weekend</p><h2>Save your <em>place.</em></h2><p>Let us know which day you plan to join. No ticket is required — this simply helps us welcome you well.</p></div><div className="form-panel"><h2>Event RSVP</h2><p>Required fields are marked with an asterisk.</p><Suspense fallback={<p>Loading form…</p>}><LeadForm mode="rsvp" /></Suspense></div></div></section>
  <section className="section future-events"><div className="container"><div className="future-card"><span>What’s next</span><h2>More gatherings are coming.</h2><p>New worship services, prayer gatherings and community moments will be added here as dates are confirmed.</p><ButtonLink href="/connect" tone="navy">Get event updates</ButtonLink></div><div className="past-card"><span>Past events</span><p>Our event archive will grow here as the City of Refuge story unfolds.</p></div></div></section>
</main></SiteFrame>; }
