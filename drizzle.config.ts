import { defineConfig } from "drizzle-kit";
import dotenv from 'dotenv';


dotenv.config();

export default defineConfig({
    dialect: "postgresql",
    out: "./drizzle",
    schema: "./src/lib/db/schema.ts",
    dbCredentials: {
        url: "postgres://postgres.pvynkufaahrekpnrowzd:z@kxAaY327xQLTB@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres"
    }
});