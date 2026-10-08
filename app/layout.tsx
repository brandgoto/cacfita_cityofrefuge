import type { Metadata, Viewport } from "next";
import { SiteJsonLd } from "@/components/json-ld";
import { TrackingScripts } from "@/components/tracking";
import { site } from "@/lib/site-data";
import "./globals.css";

const titleDefault = "CAC FITA London City of Refuge | Church in London, Ontario";
const description =
  "CAC FITA London City of Refuge is a Christ-centred church community in London, Ontario. Join us for worship, prayer, biblical teaching and community—launch weekend October 31 & November 1, 2026.";

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: titleDefault,
    template: "%s | CAC FITA London City of Refuge",
  },
  description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.domain }],
  creator: site.name,
  publisher: site.name,
  category: "religion",
  keywords: [
    "Church in London Ontario",
    "Christian church London Ontario",
    "Christ Apostolic Church London Ontario",
    "CAC FITA London",
    "City of Refuge London",
    "CAC FITA London City of Refuge",
    "Pentecostal church London Ontario",
    "African church London Ontario",
    "Church community London Ontario",
    "Launch weekend church London",
    "Courtyard by Marriott London church",
  ],
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: site.domain,
    siteName: site.name,
    title: titleDefault,
    description,
    images: [
      {
        url: "/homepage-hero.png",
        width: 1672,
        height: 941,
        alt: "A joyful church community at CAC FITA London City of Refuge",
      },
      {
        url: "/cac-logo.png",
        width: 357,
        height: 298,
        alt: "CAC FITA London City of Refuge logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: titleDefault,
    description,
    images: ["/homepage-hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  other: {
    "geo.region": "CA-ON",
    "geo.placename": "London",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#071d31" },
    { media: "(prefers-color-scheme: dark)", color: "#071d31" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA">
      <body>
        <SiteJsonLd />
        <TrackingScripts />
        {children}
      </body>
    </html>
  );
}
