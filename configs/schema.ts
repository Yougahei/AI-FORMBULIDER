import { serial, varchar, text } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const jsonForms = pgTable("jsonForms", {
  id: serial("id").primaryKey(),
  jsonform: text("jsonform").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createDate: varchar("createDate").notNull(),
});
