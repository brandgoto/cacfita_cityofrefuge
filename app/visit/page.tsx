import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock3, Coffee, Heart, MapPin, Shirt, Users } from "lucide-react";
import { LeadForm } from "@/components/lead-form";
import { ButtonLink, PageHero, SiteFrame } from "@/components/site-shell";
import { site } from "@/lib/site-data";

export const metadata: Metadata = { title: "Plan Your Visit", description: "Plan your first visit to CAC FITA London City of Refuge at Courtyard by Marriott London.", alternates: { canonical: "/visit" } };

const questions = [
  { icon: Shirt, title: "What should I wear?", copy: "Come as you are. You will see everything from casual to dressed up—there is no dress code." },
  { icon: Users, title: "Can I bring my family?", copy: "Absolutely. City of Refuge is being built with people and families of every generation in mind." },
  { icon: Heart, title: "What will it feel like?", copy: "Warm, welcoming and Christ-centred, with worship, prayer, biblical teaching and time to connect." },
  { icon: Coffee, title: "Will there be refreshments?", copy: "Yes. Light refreshments will be served on both days of launch weekend." },
];

export default function VisitPage() { return <SiteFrame><main>
  <PageHero eyebrow="Your first visit" title={<>We saved you<br /><em>a place.</em></>} copy="Visiting a church for the first time can feel like a big step. Here is everything you need to arrive with confidence." image="/visit.png"><ButtonLink href="#details">See visit details</ButtonLink><ButtonLink href={site.directionsUrl} tone="white" external>Get directions</ButtonLink></PageHero>
  <section className="section visit-details" id="details"><div className="container visit-layout"><div><p className="event-label">Launch weekend</p><h2>Make your way to <em>City of Refuge.</em></h2><p className="large-copy">We’ll be ready to welcome you, help you find your way and introduce you to the community.</p><ButtonLink href="#coming" tone="navy">Let us know you’re coming</ButtonLink></div><div className="visit-card"><div><Clock3 /><span><small>Saturday</small><strong>October 31, 2026 · 12 Noon</strong></span></div><div><Clock3 /><span><small>Sunday</small><strong>November 1, 2026 · 11:00 AM</strong></span></div><div><MapPin /><span><small>{site.venue}</small><strong>{site.addressLines.join(", ")}</strong></span></div><ButtonLink href={site.directionsUrl} external>Open in Google Maps</ButtonLink></div></div></section>
  <section className="section connect-page" id="coming"><div className="container form-layout"><div className="form-intro"><p className="event-label">Before you arrive</p><h2>Tell us you’re <em>coming.</em></h2><p>Share a few details so we can look forward to welcoming you at launch weekend.</p></div><div className="form-panel"><h2>Plan your visit</h2><p>Required fields are marked with an asterisk.</p><Suspense fallback={<p>Loading form…</p>}><LeadForm mode="visit" /></Suspense></div></div></section>
  <section className="section first-visit"><div className="container"><div className="event-feature-head"><div><p className="event-label">Good to know</p><h2>Your questions,<br /><em>answered.</em></h2></div><p>No pressure and no need to have everything figured out. We want your first visit to feel easy.</p></div><div className="visit-question-grid">{questions.map(({ icon: Icon, title, copy }) => <article key={title}><Icon /><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>
  <section className="visit-cta"><div className="container"><span>Come be part of it.</span><h2>You belong here.</h2><div className="button-row"><ButtonLink href="/connect">Connect before you come</ButtonLink><ButtonLink href="/events" tone="white">Explore the event</ButtonLink></div></div></section>
</main></SiteFrame>; }
