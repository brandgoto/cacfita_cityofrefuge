"use client";

import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { trackLead } from "@/components/tracking";
import { ButtonLink } from "@/components/site-shell";

export function ConversionConfirmation() {
  useEffect(() => { trackLead("CompleteRegistration"); }, []);
  return <div className="thank-you-card"><CheckCircle2 /><p className="event-label">You’re on the list</p><h1>Thank you for<br /><em>connecting.</em></h1><p>We have received your details. Someone from the City of Refuge community will be in touch with the information you need for launch weekend.</p><div className="button-row"><ButtonLink href="/visit">Plan your visit</ButtonLink><ButtonLink href="/" tone="outline">Back to home</ButtonLink></div></div>;
}
