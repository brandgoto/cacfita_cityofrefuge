import type { Metadata } from "next";
import { TrackingScripts } from "@/components/tracking";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cacfitacityofrefuge.ca"),
  title: { default: "CAC FITA London City of Refuge | Church in London, Ontario", template: "%s | CAC FITA London City of Refuge" },
  description: "CAC FITA London City of Refuge is a Christ-centred church community in London, Ontario focused on faith, prayer, worship, biblical teaching and community.",
  keywords: ["Church in London Ontario", "Christian church London Ontario", "Christ Apostolic Church London Ontario", "CAC FITA London", "City of Refuge London", "African church London Ontario", "Pentecostal church London Ontario", "Church community London Ontario"],
  alternates: { canonical: "/" }, icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><TrackingScripts />{children}</body></html>; }
