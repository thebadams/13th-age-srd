import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { config } from "dotenv";
import { classes } from "../src/db/class.schema.js";
import { readFile } from "fs/promises";
import path from "path";
config();
const client = postgres(process.env.DATABASE_URL as string);
const db = drizzle(client);

async function getClasses() {
  const file = path.join(process.cwd(), "data/classes.json");
  const res = await readFile(file, "utf8");
  const data = JSON.parse(res);
  return data.classes;
}
async function seedClasses() {
  const classData = await getClasses();
  console.log(classData);
  try {
    const newClasses = await db.insert(classes).values(classData);
    console.log(newClasses);
  } catch (error) {
    console.error(error);
  }
}

seedClasses();
