import { defineConfig } from "drizzle-kit";

const databaseUrl = process.env.DATABASE_URL || "postgresql://postgres:Skelm15@localhost:5432/Atlas";

export default defineConfig({
  schema: "./src/schema/*.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});
