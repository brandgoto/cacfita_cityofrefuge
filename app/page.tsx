"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { ArrowRight, BookOpen, CalendarDays, Check, ChevronRight, Church, Clock3, HeartHandshake, Mail, MapPin, Menu, MessageCircle, Play, Sparkles, Users, X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const RSVP_INTEGRATION_ENDPOINT = "";
const navItems = [["Home", "#home"], ["About", "#about"], ["Launch Weekend", "#launch-weekend"], ["RSVP", "#rsvp"], ["Connect", "#connect"]];
const expectations = [
  { icon: Sparkles, title: "Worship", copy: "Meaningful worship centred on Christ." },
  { icon: HeartHandshake, title: "Prayer", copy: "A strong culture of prayer and spiritual growth." },
  { icon: Users, title: "Community", copy: "Real relationships beyond Sunday gatherings." },
  { icon: Church, title: "Families", copy: "A welcoming environment for individuals and families." },
  { icon: Play, title: "Young Adults", copy: "A growing community for students and young professionals." },
  { icon: BookOpen, title: "Biblical Teaching", copy: "Practical, Christ-centred teaching for everyday life." },
];
const faqs = [
  ["Do I need to RSVP?", "RSVP is encouraged so we can prepare to welcome you, but visitors are welcome."],
  ["Can I attend only one day?", "Yes. You can attend Saturday, Sunday, or both days."],
  ["Can I bring someone with me?", "Absolutely. Friends and family are welcome."],
  ["Is the event free?", "DETAILS GO HERE"],
  ["Where is the church located?", "The October launch weekend will take place at the Marriott venue in London, Ontario. Full location details will be published once confirmed."],
  ["Do I have to already be a CAC member?", "No. Everyone is welcome."],
];

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}><span />{children}</p>;
}

function RSVPButton({ children = "RSVP now", className = "" }: { children?: React.ReactNode; className?: string }) {
  return <Button asChild size="lg" className={`gold-button ${className}`}><a href="#rsvp">{children}<ArrowRight /></a></Button>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    // Replace this endpoint with a Formspree, Airtable proxy, Supabase Edge Function,
    // HubSpot endpoint, or Google Apps Script URL. Never place a private key here.
    if (RSVP_INTEGRATION_ENDPOINT) {
      await fetch(RSVP_INTEGRATION_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    }
    setSubmitted(true);
    form.reset();
  }

  return (
    <main>
      <header className="site-header">
        <div className="nav-shell">
          <a className="brand" href="#home" aria-label="CAC FITA London City of Refuge home">
            <Image src="/cac-logo.png" alt="Christ Apostolic Church logo" width={357} height={298} priority />
            <span><strong>CAC FITA London</strong><small>City of Refuge</small></span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">{navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
          <RSVPButton />
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation">{navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<ChevronRight /></a>)}</nav>}
      </header>

      <section id="home" className="hero">
        <div className="hero-image" aria-hidden="true"><Image src="/launch-sunday.png" alt="" fill priority sizes="(max-width: 900px) 100vw, 54vw" /></div><div className="hero-shade" />
        <div className="shell hero-content">
          <Eyebrow light>A new church community in London, Ontario</Eyebrow>
          <h1><span>CAC FITA</span>London City of Refuge</h1>
          <p className="hero-copy">A growing Christ-centred community where faith, family, prayer, worship, and purpose come together.</p>
          <div className="launch-callout">
            <div><CalendarDays /><span><small>Launch weekend</small><strong>October 24–25, 2026</strong></span></div>
            <div className="hero-times"><span>Saturday · 2:00 PM</span><span>Sunday · 11:00 AM</span></div><p>THEME GOES HERE</p>
          </div>
          <div className="hero-actions"><RSVPButton>RSVP for launch weekend</RSVPButton><Button asChild variant="outline" size="lg" className="outline-light"><a href="#about">Learn more</a></Button></div>
        </div>
        <div className="hero-caption"><span>Faith</span><span>Family</span><span>Community</span><span>Purpose</span></div>
      </section>

      <section id="launch-weekend" className="section launch-section"><div className="shell">
        <div className="section-heading"><div><Eyebrow>October 24–25, 2026</Eyebrow><h2>Join us for<br /><em>launch weekend.</em></h2></div><p>We are building a new church family in London, and we would love for you to be part of the beginning.</p></div>
        <div className="event-grid">
          <article className="event-card event-dark"><span className="event-number">24</span><p className="event-day">Saturday</p><h3>October 24, 2026</h3><p className="event-time"><Clock3 />2:00 PM</p><div className="event-rule" /><strong>THEME GOES HERE</strong><p>Program details coming soon.</p><RSVPButton>RSVP for Saturday</RSVPButton></article>
          <article className="event-card event-gold"><span className="event-number">25</span><p className="event-day">Sunday</p><h3>October 25, 2026</h3><p className="event-time"><Clock3 />11:00 AM</p><div className="event-rule" /><strong>THEME GOES HERE</strong><p>Program details coming soon.</p><Button asChild size="lg" className="navy-button"><a href="#rsvp">RSVP for Sunday<ArrowRight /></a></Button></article>
        </div>
        <div className="both-days"><div><MapPin /><span><small>Venue</small><strong>Marriott, London, Ontario</strong><em>FULL ADDRESS GOES HERE</em></span></div><div><p>Make a weekend of it.</p><h3>Attend both days</h3></div><RSVPButton>RSVP for both days</RSVPButton></div>
      </div></section>

      <section id="about" className="section about-section"><div className="shell about-grid">
        <div className="about-visual"><div className="photo-frame"><Image src="/launch-saturday.png" alt="A worshipper celebrating at CAC FITA London" fill sizes="(max-width: 800px) 90vw, 44vw" /></div><div className="about-note"><strong>You belong here.</strong><span>London, Ontario</span></div></div>
        <div className="about-copy"><Eyebrow>Who we are</Eyebrow><h2>A place for faith, family <em>&amp; community.</em></h2><p className="lead">CAC FITA London City of Refuge is a growing Christian community in London, Ontario, rooted in the teachings of Jesus Christ and connected to Christ Apostolic Church First in the Americas.</p><div className="promise-list">{["Grow spiritually", "Worship and pray together", "Build meaningful relationships", "Raise families in faith", "Discover purpose", "Serve the wider community"].map(item => <div key={item}><Check />{item}</div>)}</div></div>
      </div></section>

      <section className="refuge-section"><div className="shell refuge-grid"><div><Eyebrow light>Our name, our invitation</Eyebrow><h2>Why City<br />of Refuge?</h2></div><div className="refuge-copy"><p>City of Refuge represents a place of hope, restoration, belonging, prayer, spiritual growth, and community.</p><div className="refuge-lines"><span>You can come as you are.</span><span>You can find community.</span><span>You can grow in faith.</span><span>You can discover a spiritual home.</span></div></div></div></section>

      <section className="section expectations-section"><div className="shell"><div className="section-heading"><div><Eyebrow>Life at City of Refuge</Eyebrow><h2>What you can expect.</h2></div><p>A warm, grounded church family with room for every generation.</p></div><div className="expect-grid">{expectations.map(({ icon: Icon, title, copy }, index) => <article key={title} className="expect-card"><span>0{index + 1}</span><Icon /><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

      <section id="rsvp" className="section rsvp-section"><div className="shell rsvp-grid">
        <div className="rsvp-intro"><Eyebrow light>Your place is waiting</Eyebrow><h2>Reserve<br />your place.</h2><p>Planning to join us on October 24–25? Let us know you’re coming so we can prepare to welcome you.</p><div className="rsvp-summary"><CalendarDays /><div><strong>Launch Weekend</strong><span>Saturday · October 24 · 2:00 PM</span><span>Sunday · October 25 · 11:00 AM</span></div></div></div>
        <div className="form-card">{submitted ? <div className="success-message" role="status"><span><Check /></span><Eyebrow>RSVP received</Eyebrow><h3>Thank you!</h3><p>We’re looking forward to welcoming you to CAC FITA London City of Refuge.</p><Button onClick={() => setSubmitted(false)} variant="outline">Submit another RSVP</Button></div> :
          <form onSubmit={handleSubmit}><div className="form-heading"><span>RSVP</span><p>All fields marked * are required.</p></div>
            <div className="field-grid"><div className="field"><Label htmlFor="firstName">First name *</Label><Input id="firstName" name="firstName" autoComplete="given-name" required /></div><div className="field"><Label htmlFor="lastName">Last name *</Label><Input id="lastName" name="lastName" autoComplete="family-name" required /></div><div className="field"><Label htmlFor="phone">Phone number *</Label><Input id="phone" name="phone" type="tel" autoComplete="tel" required /></div><div className="field"><Label htmlFor="email">Email address *</Label><Input id="email" name="email" type="email" autoComplete="email" required /></div></div>
            <fieldset className="radio-field"><legend>Which day will you attend? *</legend><RadioGroup name="attendance" defaultValue="both" required>{[["saturday", "Saturday only"], ["sunday", "Sunday only"], ["both", "Both days"]].map(([value, label]) => <Label key={value} className="radio-option"><RadioGroupItem value={value} />{label}</Label>)}</RadioGroup></fieldset>
            <div className="field-grid lower-fields"><div className="field"><Label htmlFor="guests">Number of guests</Label><Input id="guests" name="guests" type="number" min="0" inputMode="numeric" placeholder="0" /></div><div className="field"><Label>Are you new to CAC?</Label><RadioGroup name="newToCac" className="inline-radios"><Label><RadioGroupItem value="yes" />Yes</Label><Label><RadioGroupItem value="no" />No</Label></RadioGroup></div></div>
            <div className="field updates-field"><Label>Would you like church updates?</Label><RadioGroup name="updates" defaultValue="yes" className="inline-radios"><Label><RadioGroupItem value="yes" />Yes, keep me updated</Label><Label><RadioGroupItem value="no" />No</Label></RadioGroup></div><Button type="submit" size="lg" className="gold-button submit-button">Confirm my RSVP<ArrowRight /></Button>
          </form>}</div>
      </div></section>

      <section id="connect" className="section connect-section"><div className="shell"><div className="section-heading"><div><Eyebrow>Keep in touch</Eyebrow><h2>Stay connected.</h2></div><p>Launch weekend is just the beginning. Stay connected as we build this new church community in London.</p></div><div className="social-grid">{[[Sparkles, "Instagram", "INSTAGRAM_URL"], [Users, "Facebook", "FACEBOOK_URL"], [Play, "TikTok", "TIKTOK_URL"], [Play, "YouTube", "YOUTUBE_URL"], [MessageCircle, "WhatsApp Community", "WHATSAPP_URL"], [Mail, "Email", "EMAIL_ADDRESS"]].map(([Icon, label, url]) => { const SocialIcon = Icon as typeof Sparkles; return <a key={String(label)} href={String(url)} onClick={(e) => e.preventDefault()} aria-label={`${label} link coming soon`}><SocialIcon /><span>{String(label)}</span><small>Link coming soon</small><ArrowRight /></a>; })}</div></div></section>

      <section className="section parent-section"><div className="shell parent-grid"><div className="logo-panel"><Image src="/cac-logo.png" alt="Christ Apostolic Church First in the Americas" width={357} height={298} /></div><div><Eyebrow>Our wider church family</Eyebrow><h2>Part of a larger family.</h2><p>CAC FITA London City of Refuge is part of Christ Apostolic Church First in the Americas, a wider Christ-centred church family committed to worship, prayer, discipleship, evangelism, and community.</p><Button asChild variant="outline" size="lg" className="parent-link"><a href="https://cacfirstintheamericas.org/" target="_blank" rel="noreferrer">Learn about CACFITA<ArrowRight /></a></Button></div></div></section>

      <section id="location" className="location-section"><div className="map-panel" aria-label="Map placeholder for Marriott, London, Ontario"><div className="map-streets" /><span className="map-pin"><MapPin /></span><p>Interactive map ready<br /><small>FULL ADDRESS GOES HERE</small></p></div><div className="location-copy"><Eyebrow light>Launch weekend venue</Eyebrow><h2>Join us<br />in London.</h2><div className="address"><MapPin /><p><strong>Marriott</strong><span>London, Ontario</span><span>FULL ADDRESS GOES HERE</span></p></div><div className="location-times"><p><span>October 24</span><strong>2:00 PM</strong></p><p><span>October 25</span><strong>11:00 AM</strong></p></div><p className="parking">Parking: PARKING DETAILS GO HERE</p><Button disabled size="lg" className="gold-button">Get directions <span>— address pending</span></Button></div></section>

      <section className="section faq-section"><div className="shell faq-grid"><div><Eyebrow>Good to know</Eyebrow><h2>Your questions,<br /><em>answered.</em></h2><p>Still wondering about something?</p><a href="mailto:EMAIL_ADDRESS">Send us a message <ArrowRight /></a></div><Accordion type="single" collapsible className="faq-list">{faqs.map(([question, answer], index) => <AccordionItem key={question} value={`faq-${index}`}><AccordionTrigger>{question}</AccordionTrigger><AccordionContent>{answer}</AccordionContent></AccordionItem>)}</Accordion></div></section>

      <section className="final-cta"><div className="final-image" aria-hidden="true"><Image src="/launch-weekend.png" alt="" fill sizes="100vw" /></div><div className="final-overlay" /><div className="shell final-content"><Eyebrow light>A new church family is taking root</Eyebrow><h2>Come be part<br />of the beginning.</h2><p>Join us for our launch weekend and discover a place to worship, grow, connect, and belong.</p><div><RSVPButton>RSVP for October 24–25</RSVPButton><Button asChild variant="outline" size="lg" className="outline-light"><a href="#connect">Join our community</a></Button></div></div></section>

      <footer><div className="shell footer-grid"><div className="footer-brand"><Image src="/cac-logo.png" alt="" width={357} height={298} /><div><strong>CAC FITA London</strong><span>City of Refuge</span></div></div><div><p>London, Ontario, Canada</p><p>A Christ Apostolic Church community under Christ Apostolic Church First in the Americas.</p></div><nav aria-label="Footer navigation">{navItems.slice(1).map(([label, href]) => <a key={href} href={href}>{label}</a>)}<a href="https://cacfirstintheamericas.org/" target="_blank" rel="noreferrer">CACFITA parent website</a></nav></div><div className="shell footer-bottom"><p>© 2026 CAC FITA London City of Refuge</p><p>A place to worship. A place to grow. A place to belong.</p></div></footer>
      <a className="mobile-rsvp" href="#rsvp"><CalendarDays />RSVP — OCT 24–25<ArrowRight /></a>
    </main>
  );
}
