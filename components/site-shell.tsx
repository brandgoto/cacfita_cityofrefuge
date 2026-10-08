"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, CalendarDays, Menu, X } from "lucide-react";
import { useState } from "react";
import { expectations, site, socialLinks } from "@/lib/site-data";

const nav = [["Home", "/"], ["About", "/about"], ["Events", "/events"], ["Visit", "/visit"], ["Connect", "/connect"]] as const;

export function ButtonLink({ href, children, tone = "gold", external = false }: { href: string; children: React.ReactNode; tone?: "gold" | "navy" | "outline" | "white"; external?: boolean }) {
  return <Link className={`button button-${tone}`} href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>{children}<ArrowRight aria-hidden="true" /></Link>;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return <header className="site-nav"><div className="nav-inner">
    <Link className="brand-lockup" href="/" aria-label="City of Refuge home"><Image src="/cac-logo.png" alt="" width={357} height={298} priority /><span><small>CAC FITA London</small><strong>City of Refuge</strong></span></Link>
    <nav className="desktop-links" aria-label="Main navigation">{nav.map(([label, href]) => <Link className={pathname === href ? "active" : ""} key={href} href={href}>{label}</Link>)}</nav>
    <ButtonLink href="/visit">Plan your visit</ButtonLink>
    <button className="menu-toggle" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
  </div>{open && <nav id="mobile-menu" className="mobile-links" aria-label="Mobile navigation">{nav.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}<ArrowRight /></Link>)}<ButtonLink href="/visit">Plan your visit</ButtonLink></nav>}</header>;
}

export function Footer() {
  return <footer className="site-footer"><div className="container footer-grid">
    <div className="footer-brand"><Image src="/cac-logo.png" alt="" width={357} height={298} /><div><small>CAC FITA London</small><strong>City of Refuge</strong><p>London, Ontario, Canada</p></div></div>
    <div><p className="footer-kicker">A place to grow</p><p>A Christ-centred community for faith, prayer, worship, biblical teaching and life together.</p></div>
    <nav aria-label="Footer navigation">{nav.slice(1).map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}<Link href={site.parentUrl} target="_blank">Parent church</Link></nav>
  </div><div className="container footer-bottom"><span>© 2026 CAC FITA London City of Refuge</span><span>{site.movement}</span></div></footer>;
}

export function SiteFrame({ children }: { children: React.ReactNode }) { return <><Navbar />{children}<Footer /><Link className="mobile-sticky" href="/visit"><CalendarDays />Plan your visit<ArrowRight /></Link></>; }

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) { return <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}><span />{children}</p>; }

export function SectionHeading({ eyebrow, title, copy, light = false }: { eyebrow: string; title: React.ReactNode; copy?: string; light?: boolean }) {
  return <div className="section-heading"><div><Eyebrow light={light}>{eyebrow}</Eyebrow><h2>{title}</h2></div>{copy && <p>{copy}</p>}</div>;
}

export function PageHero({ eyebrow, title, copy, image, children }: { eyebrow: string; title: React.ReactNode; copy: string; image: string; children?: React.ReactNode }) {
  return <section className="page-hero"><Image className="page-hero-image" src={image} alt="" fill priority sizes="100vw" /><div className="page-hero-overlay" /><div className="container page-hero-content"><Eyebrow light>{eyebrow}</Eyebrow><h1>{title}</h1><p>{copy}</p>{children && <div className="button-row">{children}</div>}</div></section>;
}

export function ExpectationGrid() { return <div className="feature-grid">{expectations.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div>; }

export function SocialLinks({ dark = false }: { dark?: boolean }) {
  return <div className={`social-links ${dark ? "social-links-dark" : ""}`}>{socialLinks.map((item) => <a key={item.label} href={item.href} onClick={(event) => event.preventDefault()} data-placeholder={item.placeholder} aria-label={`${item.label} link coming soon`}><span>{item.label}</span><small>Link coming soon</small><ArrowRight /></a>)}</div>;
}

export function EventSummary({ compact = false }: { compact?: boolean }) {
  return <div className={`event-summary ${compact ? "event-summary-compact" : ""}`}><div className="event-theme"><small>{site.movement}</small><h2>{site.eventTheme}</h2><p>{site.scripture}</p></div><div className="event-times">{site.events.map((event) => <div key={event.day}><span>{event.day}</span><strong>{event.shortDate}</strong><em>{event.time}</em></div>)}</div><div className="event-location"><small>Location</small><strong>{site.venue}</strong><span>{site.addressLines.join(" · ")}</span><p>Light refreshments will be served on both days.</p></div></div>;
}
