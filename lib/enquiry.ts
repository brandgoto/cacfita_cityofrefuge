export const FORM_SOURCES = {
  ads: "Ads",
  connect: "Connect",
  visit: "Visit",
  rsvp: "Event RSVP",
} as const;

export type FormMode = keyof typeof FORM_SOURCES;

export const INTERESTED_DAYS = ["Saturday", "Sunday", "Both Days", "I’d just like more information"] as const;
export const CONNECT_DESCRIPTIONS = [
  "I’m looking for a church",
  "I’d like to attend an upcoming program",
  "I recently attended",
  "I’d like to volunteer / serve",
  "I’d like to stay updated",
  "I have a question",
  "Other",
] as const;

const DAY_MODES = new Set<FormMode>(["ads", "visit", "rsvp"]);
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export type Enquiry = {
  formType: FormMode;
  formSource: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interestedDay?: string;
  guests?: number;
  enquiry?: string;
  consent?: true;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  landingPage: string;
};

export type ParsedEnquiry = { ok: true; spam: true } | { ok: true; spam: false; enquiry: Enquiry } | { ok: false };

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function validName(value: string) {
  return value.length >= 1 && value.length <= 80 && !/[\u0000-\u001F<>]/.test(value);
}

function validEmail(value: string) {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return value.length <= 30 && digits.length >= 7 && digits.length <= 15 && /^[0-9+().\-\s]+$/.test(value);
}

function optionalLine(value: unknown, max: number) {
  if (value === undefined || value === null || value === "") return undefined;
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (trimmed.length > max || /[\r\n]/.test(trimmed)) return null;
  return trimmed;
}

function optionalMessage(value: unknown) {
  if (value === undefined || value === null || value === "") return undefined;
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (trimmed.length > 2000 || /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(trimmed)) return null;
  return trimmed;
}

function optionalGuests(value: unknown) {
  if (value === undefined || value === null || value === "") return undefined;
  const raw = typeof value === "number" ? String(value) : value;
  if (typeof raw !== "string" || !/^\d{1,2}$/.test(raw.trim())) return null;
  const guests = Number(raw);
  if (guests > 20) return null;
  return guests;
}

function isFormMode(value: string): value is FormMode {
  return value in FORM_SOURCES;
}

export function parseEnquiry(input: unknown): ParsedEnquiry {
  if (!input || typeof input !== "object") return { ok: false };
  const data = input as Record<string, unknown>;
  if (text(data.hp_field)) return { ok: true, spam: true };

  const formType = text(data.form_type);
  if (!isFormMode(formType)) return { ok: false };

  const firstName = text(data.first_name);
  const lastName = text(data.last_name);
  const email = text(data.email).toLowerCase();
  const phone = text(data.phone);
  const landingPage = text(data.landing_page);
  if (!validName(firstName) || !validName(lastName) || !validEmail(email) || !validPhone(phone)) return { ok: false };
  if (!/^\/[a-z0-9/-]*$/i.test(landingPage) || landingPage.includes("//") || landingPage.length > 120) return { ok: false };

  const enquiry: Enquiry = {
    formType,
    formSource: FORM_SOURCES[formType],
    firstName,
    lastName,
    email,
    phone,
    landingPage,
  };

  if (DAY_MODES.has(formType)) {
    const interestedDay = text(data.interested_day);
    if (!INTERESTED_DAYS.includes(interestedDay as (typeof INTERESTED_DAYS)[number])) return { ok: false };
    enquiry.interestedDay = interestedDay;
    const guests = optionalGuests(data.guests);
    if (guests === null) return { ok: false };
    if (guests !== undefined) enquiry.guests = guests;
  } else {
    const description = text(data.description);
    if (!CONNECT_DESCRIPTIONS.includes(description as (typeof CONNECT_DESCRIPTIONS)[number])) return { ok: false };
    const message = optionalMessage(data.message);
    if (message === null) return { ok: false };
    enquiry.enquiry = message ? `${description}\n\n${message}` : description;
  }

  if (data.consent === true || data.consent === "true") enquiry.consent = true;

  const utm = {
    utm_source: "utmSource",
    utm_medium: "utmMedium",
    utm_campaign: "utmCampaign",
    utm_content: "utmContent",
    utm_term: "utmTerm",
  } as const;
  for (const key of UTM_KEYS) {
    const value = optionalLine(data[key], 200);
    if (value === null) return { ok: false };
    if (value) enquiry[utm[key]] = value;
  }

  return { ok: true, spam: false, enquiry };
}
