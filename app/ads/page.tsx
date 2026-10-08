import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, Check, Clock3, MapPin } from "lucide-react";
import { LeadForm } from "@/components/lead-form";
import { EventSummary, Eyebrow } from "@/components/site-shell";
import { site } from "@/lib/site-data";

export const metadata: Metadata = { title: "You’re Invited to Launch Weekend", description: "Join CAC FITA London City of Refuge for launch weekend, October 31 and November 1, 2026.", alternates: { canonical: "/ads" } };

export default function AdsPage() { return <main className="ads-page">
  <header className="ads-header"><Link href="/" aria-label="City of Refuge home"><Image src="/cac-logo.png" alt="Christ Apostolic Church" width={357} height={298} /><span><strong>CAC FITA London</strong><small>City of Refuge</small></span></Link><a href="#interest">Save my place <ArrowRight /></a></header>
  <section className="ads-hero"><Image src="/ads-hero.png" alt="Friends warmly welcoming one another at church" fill priority sizes="100vw" /><div className="ads-shade" /><div className="ads-hero-copy"><Eyebrow light>London, Ontario · Launch weekend</Eyebrow><h1>A place to belong.<br /><em>A faith to grow.</em></h1><p>Come experience worship, prayer, the Word and a welcoming new church family in London.</p><a className="button button-gold" href="#interest">I’m interested <ArrowRight /></a></div></section>
  <section className="ads-event"><div className="ads-container"><EventSummary compact /><ul><li><Check />Come as you are</li><li><Check />Bring your family and friends</li><li><Check />Light refreshments both days</li></ul></div></section>
  <section className="ads-form-section" id="interest"><div className="ads-container ads-form-grid"><div><p className="event-label">Take the next step</p><h2>Let us know you’re <em>interested.</em></h2><p>It takes less than a minute. We’ll send you the essential event details and help make your visit easy.</p><div className="ads-facts"><div><Clock3 /><span><strong>Oct 31 · 12 Noon</strong><small>Nov 1 · 11:00 AM</small></span></div><div><MapPin /><span><strong>{site.venue}</strong><small>864 Exeter Road, London</small></span></div></div></div><div className="form-panel"><h2>Save your place</h2><p>No ticket required. This simply helps us welcome you well.</p><Suspense fallback={<p>Loading form…</p>}><LeadForm mode="ads" redirectTo="/thank-you" /></Suspense></div></div></section>
  <footer className="ads-footer"><Image src="/cac-logo.png" alt="" width={357} height={298} /><p>CAC FITA London City of Refuge</p><span>Rooted in Faith Together</span></footer>
</main>; }
