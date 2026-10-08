import Image from "next/image";
import { ArrowDown, CalendarDays, MapPin } from "lucide-react";
import { ButtonLink, EventSummary, ExpectationGrid, Eyebrow, SectionHeading, SiteFrame, SocialLinks } from "@/components/site-shell";
import { site } from "@/lib/site-data";

export default function HomePage() {
  return <SiteFrame><main>
    <section className="home-hero">
      <Image className="home-hero-image" src="/homepage-hero.png" alt="A joyful, multicultural church community worshipping together" fill priority sizes="100vw" />
      <div className="home-hero-shade" />
      <div className="container home-hero-content">
        <Eyebrow light>Christ Apostolic Church · First in the Americas</Eyebrow>
        <h1><span>CAC FITA</span>London</h1>
        <p className="hero-titleline">City of Refuge</p>
        <p className="hero-copy">A new Christ-centred church community in London, Ontario—rooted in faith, growing in purpose and becoming family.</p>
        <div className="button-row"><ButtonLink href="/visit">Plan your visit</ButtonLink><ButtonLink href="/events" tone="white">Launch weekend</ButtonLink></div>
      </div>
      <a className="hero-scroll" href="#welcome"><ArrowDown />Discover City of Refuge</a>
    </section>

    <section className="event-ribbon" aria-label="Launch weekend details"><div className="container event-ribbon-grid">
      <div><CalendarDays /><span><small>Launch weekend</small><strong>Oct 31 & Nov 1, 2026</strong></span></div>
      <div><MapPin /><span><small>London, Ontario</small><strong>{site.venue}</strong></span></div>
      <ButtonLink href="/events" tone="outline">View event details</ButtonLink>
    </div></section>

    <section className="section welcome-section" id="welcome"><div className="container split-layout">
      <div className="portrait-media"><Image src="/about-community.png" alt="Friends sharing a warm moment in the City of Refuge community" fill sizes="(max-width: 800px) 100vw, 45vw" /><span>Faith · People · Families · Community</span></div>
      <div className="prose-block"><Eyebrow>Welcome home</Eyebrow><h2>A church family for <em>London.</em></h2><p className="large-copy">CAC FITA London City of Refuge is a place to meet Jesus, build genuine relationships and grow in faith—whatever your story or stage of life.</p><p>We are building a welcoming community where the Word of God is lived, prayer is central, worship is wholehearted and every generation can belong.</p><ButtonLink href="/about" tone="navy">Our story</ButtonLink></div>
    </div></section>

    <section className="section launch-section"><div className="container">
      <SectionHeading eyebrow="You’re invited" title={<>Join our <em>launch weekend.</em></>} copy="Two days. One family. A brighter tomorrow. Come as you are and experience worship, prayer, biblical teaching and community." />
      <EventSummary />
      <div className="section-actions"><ButtonLink href="/visit">Plan your visit</ButtonLink><ButtonLink href="/events" tone="outline">Full event details</ButtonLink></div>
    </div></section>

    <section className="movement-section"><div className="container movement-grid">
      <div className="movement-copy"><Eyebrow light>Our movement</Eyebrow><p className="movement-script">Rooted in Faith</p><h2>Together.</h2><p>More than an event phrase, this is how we want to live: grounded in Christ, strengthened through prayer and growing side by side as one church family.</p><ButtonLink href="/about" tone="white">What we believe</ButtonLink></div>
      <div className="movement-media"><Image src="/prayer.png" alt="A church community joined together in prayer" fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
    </div></section>

    <section className="section expectations-section"><div className="container"><SectionHeading eyebrow="What to expect" title={<>Come as you are.<br /><em>There is room for you.</em></>} copy="A thoughtful, joyful church experience centred on Jesus and shaped around real life." /><ExpectationGrid /><div className="center-action"><ButtonLink href="/visit" tone="navy">Your first visit</ButtonLink></div></div></section>

    <section className="section connect-strip"><div className="container connect-grid"><div><Eyebrow light>Stay connected</Eyebrow><h2>Life together starts with <em>hello.</em></h2><p>Tell us a little about yourself, ask a question, or follow the journey as City of Refuge grows.</p><ButtonLink href="/connect">Connect with us</ButtonLink></div><SocialLinks dark /></div></section>

    <section className="parent-band"><div className="container parent-band-inner"><Image src="/cac-logo.png" alt="Christ Apostolic Church logo" width={357} height={298} /><div><Eyebrow>Our family</Eyebrow><h2>Christ Apostolic Church<br /><em>First in the Americas.</em></h2><p>CAC FITA London City of Refuge is part of a wider Christ-centred church family serving communities across the Americas.</p></div><ButtonLink href={site.parentUrl} tone="outline" external>Visit parent church</ButtonLink></div></section>
  </main></SiteFrame>;
}
