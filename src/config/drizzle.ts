import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { config } from "dotenv";
config();

const client = postgres(process.env.DATABASE_URL as string);

export const drizzleDB = drizzle(client);
