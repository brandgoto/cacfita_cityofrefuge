import type { Metadata } from "next";
import Image from "next/image";
import { ConversionConfirmation } from "@/components/conversion-confirmation";

export const metadata: Metadata = { title: "Thank You", robots: { index: false, follow: false } };

export default function ThankYouPage() { return <main className="thank-you-page"><Image src="/homepage-hero.png" alt="" fill priority sizes="100vw" /><div className="thank-you-shade" /><ConversionConfirmation /></main>; }
