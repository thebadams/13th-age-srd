import type { Config } from 'drizzle-kit';
import { config } from 'dotenv';

config();
export default {
	schema: './src/db/*',
	out: './drizzle',
	driver: 'pg',
	dbCredentials: {
		connectionString: process.env.DATABASE_URL as string,
	},
} satisfies Config;
