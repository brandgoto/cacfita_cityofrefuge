"use client";

import Script from "next/script";

const META_PIXEL_ID = "META_PIXEL_ID";
const TIKTOK_PIXEL_ID = "TIKTOK_PIXEL_ID";
const GA_MEASUREMENT_ID = "GA_MEASUREMENT_ID";

export function TrackingScripts() {
  const metaEnabled = !META_PIXEL_ID.endsWith("_ID");
  const tiktokEnabled = !TIKTOK_PIXEL_ID.endsWith("_ID");
  const gaEnabled = !GA_MEASUREMENT_ID.endsWith("_ID");
  return <>
    {gaEnabled && <><Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} /><Script id="ga4">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');`}</Script></>}
    {metaEnabled && <Script id="meta-pixel">{`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}</Script>}
    {tiktokEnabled && <Script id="tiktok-pixel">{`!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=['page','track','identify','instances','debug','on','off','once','ready','alias','group','enableCookie','disableCookie','holdConsent','revokeConsent','grantConsent'];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.load=function(e){var n='https://analytics.tiktok.com/i18n/pixel/events.js';var i=d.createElement('script');i.type='text/javascript';i.async=!0;i.src=n+'?sdkid='+e+'&lib='+t;var a=d.getElementsByTagName('script')[0];a.parentNode.insertBefore(i,a)};ttq.load('${TIKTOK_PIXEL_ID}');ttq.page()}(window,document,'ttq');`}</Script>}
  </>;
}

type TrackingWindow = Window & { dataLayer?: unknown[]; fbq?: (...args: unknown[]) => void; ttq?: { track: (event: string) => void } };
export function trackLead(kind: "Lead" | "CompleteRegistration" = "Lead") {
  if (typeof window === "undefined") return;
  const w = window as TrackingWindow;
  w.dataLayer?.push({ event: kind });
  w.fbq?.("track", kind);
  w.ttq?.track("SubmitForm");
}
