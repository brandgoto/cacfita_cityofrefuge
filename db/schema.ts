import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const leads = sqliteTable("leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  formType: text("form_type").notNull(), firstName: text("first_name").notNull(), lastName: text("last_name").notNull(),
  email: text("email").notNull(), phone: text("phone").notNull(), description: text("description"), message: text("message"),
  interestedDay: text("interested_day"), guests: integer("guests"), consent: integer("consent", { mode: "boolean" }).notNull().default(false),
  source: text("source").notNull(), campaign: text("campaign"), utmSource: text("utm_source"), utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"), utmContent: text("utm_content"), utmTerm: text("utm_term"),
  landingPage: text("landing_page").notNull(), createdAt: text("created_at").notNull(),
});
