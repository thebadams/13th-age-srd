import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { config } from "dotenv";
import { classes } from "../src/schema.js";
import { getClasses } from "../prisma/seed.js";
config();
const client = postgres(process.env.DATABASE_URL as string);
const db = drizzle(client);

async function seedClasses() {
  const classData = await getClasses();
  try {
    const newClasses = await db.insert(classes).values(classData);
    console.log(newClasses);
  } catch (error) {
    console.error(error);
  }
}
