import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CAC FITA London City of Refuge | Church in London, Ontario",
  description: "CAC FITA London City of Refuge is a growing Christ-centred church community in London, Ontario. Join our launch weekend October 24–25, 2026.",
  keywords: ["Church in London Ontario", "Christian church London Ontario", "CAC London Ontario", "Christ Apostolic Church London", "African church London Ontario", "Pentecostal church London Ontario", "Church community London Ontario"],
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
