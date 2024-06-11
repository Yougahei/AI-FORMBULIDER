import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./configs/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://ai-form-builder_owner:0VUDmrI8MouT@ep-aged-firefly-a1d8o2v3.ap-southeast-1.aws.neon.tech/ai-form-builder?sslmode=require ",
  },
});
