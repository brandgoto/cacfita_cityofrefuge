import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, MessageCircle, Users } from "lucide-react";
import { LeadForm } from "@/components/lead-form";
import { PageHero, SiteFrame, SocialLinks } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Connect With Us",
  description: "Connect with CAC FITA London City of Refuge. Ask a question, share interest in visiting, or receive updates about our church community in London, Ontario.",
  alternates: { canonical: "/connect" },
  openGraph: {
    title: "Connect | CAC FITA London City of Refuge",
    description: "Reach out to City of Refuge — ask a question, find community, or stay updated.",
    url: "/connect",
    images: [{ url: "/connect.png", alt: "Connect with City of Refuge" }],
  },
};

export default function ConnectPage() { return <SiteFrame><main>
  <PageHero eyebrow="Take your next step" title={<>Let’s grow<br /><em>together.</em></>} copy="Whether you are looking for a church home, have a question or simply want to stay in the loop—we would love to hear from you." image="/connect.png" />
  <section className="section connect-page"><div className="container form-layout"><div className="form-intro"><p className="event-label">Stay connected</p><h2>Start with a simple <em>hello.</em></h2><p>Share your details and someone from our team will follow up. Your information will only be used to respond to your request and, if you choose, share future updates.</p><div className="contact-promises"><div><MessageCircle /><span><strong>Ask a question</strong><small>Tell us what you would like to know.</small></span></div><div><Users /><span><strong>Find community</strong><small>Let us help you take a comfortable next step.</small></span></div><div><Mail /><span><strong>Receive updates</strong><small>Hear about gatherings and community news.</small></span></div></div></div><div className="form-panel"><h2>Connect with us</h2><p>Required fields are marked with an asterisk.</p><Suspense fallback={<p>Loading form…</p>}><LeadForm mode="connect" /></Suspense></div></div></section>
  <section className="section social-section"><div className="container"><div className="event-feature-head"><div><p className="event-label">Follow the journey</p><h2>Find us <em>online.</em></h2></div><p>Follow us on Instagram today. Additional channels will appear here as they go live.</p></div><SocialLinks /></div></section>
</main></SiteFrame>; }
