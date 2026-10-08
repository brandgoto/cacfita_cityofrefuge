import { site, socialLinks } from "@/lib/site-data";

export function SiteJsonLd() {
  const sameAs = socialLinks.map((item) => item.href).filter((href) => href.startsWith("http"));
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.domain}/#organization`,
        name: site.name,
        alternateName: [site.shortName, "CAC FITA London"],
        url: site.domain,
        logo: {
          "@type": "ImageObject",
          url: `${site.domain}/cac-logo.png`,
          width: 357,
          height: 298,
        },
        image: `${site.domain}/homepage-hero.png`,
        parentOrganization: {
          "@type": "Organization",
          name: site.parent,
          url: site.parentUrl,
        },
        sameAs,
      },
      {
        "@type": "Church",
        "@id": `${site.domain}/#church`,
        name: site.name,
        alternateName: site.shortName,
        url: site.domain,
        description:
          "A Christ-centred church community in London, Ontario focused on faith, prayer, worship, biblical teaching and community.",
        image: `${site.domain}/homepage-hero.png`,
        logo: `${site.domain}/cac-logo.png`,
        address: {
          "@type": "PostalAddress",
          streetAddress: "864 Exeter Road",
          addressLocality: "London",
          addressRegion: "ON",
          postalCode: "N6E 1L5",
          addressCountry: "CA",
        },
        areaServed: {
          "@type": "City",
          name: "London",
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: "Ontario",
          },
        },
        event: site.events.map((event) => ({
          "@type": "Event",
          name: `${site.shortName} Launch Weekend — ${event.day}`,
          description: `${site.eventTheme}. Join CAC FITA London City of Refuge for launch weekend at ${site.venue}.`,
          startDate: event.day === "Saturday" ? "2026-10-31T12:00:00-04:00" : "2026-11-01T11:00:00-04:00",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          location: {
            "@type": "Place",
            name: site.venue,
            address: {
              "@type": "PostalAddress",
              streetAddress: "864 Exeter Road",
              addressLocality: "London",
              addressRegion: "ON",
              postalCode: "N6E 1L5",
              addressCountry: "CA",
            },
          },
          organizer: { "@id": `${site.domain}/#organization` },
          image: `${site.domain}/homepage-hero.png`,
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${site.domain}/#website`,
        url: site.domain,
        name: site.name,
        description:
          "Official website for CAC FITA London City of Refuge — a Christ-centred church community in London, Ontario.",
        publisher: { "@id": `${site.domain}/#organization` },
        inLanguage: "en-CA",
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
