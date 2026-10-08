export const site = {
  name: "CAC FITA London City of Refuge",
  shortName: "City of Refuge",
  city: "London, Ontario",
  domain: "https://cacfitacityofrefuge.ca",
  parent: "Christ Apostolic Church — First in the Americas",
  parentUrl: "https://cacfirstintheamericas.org/",
  movement: "Rooted in Faith Together",
  eventTheme: "The Gospel: God’s Message to All Nations",
  scripture: "Matthew 28:19",
  venue: "Courtyard by Marriott London",
  addressLines: ["864 Exeter Road", "London, Ontario, Canada", "N6E 1L5"],
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=864+Exeter+Road+London+Ontario+N6E+1L5",
  events: [
    { day: "Saturday", date: "October 31, 2026", shortDate: "October 31", time: "12:00 Noon" },
    { day: "Sunday", date: "November 1, 2026", shortDate: "November 1", time: "11:00 AM" },
  ],
} as const;

export const socialLinks = [
  { label: "Instagram", href: "#", placeholder: "INSTAGRAM_URL" },
  { label: "Facebook", href: "#", placeholder: "FACEBOOK_URL" },
  { label: "TikTok", href: "#", placeholder: "TIKTOK_URL" },
  { label: "YouTube", href: "#", placeholder: "YOUTUBE_URL" },
  { label: "WhatsApp", href: "#", placeholder: "WHATSAPP_URL" },
] as const;

export const expectations = [
  { title: "Worship", copy: "Christ-centred worship with room to respond authentically." },
  { title: "Prayer", copy: "A community that prays together and grows together." },
  { title: "The Word", copy: "Practical biblical teaching for everyday life." },
  { title: "Community", copy: "Real relationships that continue beyond a gathering." },
  { title: "Families", copy: "A welcoming place for every generation." },
  { title: "Purpose", copy: "Space to discover, serve and live your faith." },
] as const;
