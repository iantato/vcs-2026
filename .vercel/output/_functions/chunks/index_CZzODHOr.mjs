import { neon } from '@neondatabase/serverless';

const url = process.env.NEON_DATABASE_URL || (typeof import.meta !== "undefined" ? "postgresql://neondb_owner:npg_HK6YqzxQ0dWN@ep-ancient-butterfly-akbu5gdg-pooler.c-3.us-west-2.aws.neon.tech/neondb?sslmode=require" : void 0);
if (!url) {
  throw new Error("NEON_DATABASE_URL environment variable is not set");
}
const sql = neon(url);

export { sql as s };
