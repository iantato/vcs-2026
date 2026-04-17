import { neon } from '@neondatabase/serverless';

// Retrieve the database URL from environment variables
const url = process.env.NEON_DATABASE_URL;

if (!url) {
  console.error('NEON_DATABASE_URL environment variable is not set');
  throw new Error('NEON_DATABASE_URL environment variable is not set. Please set it in your .env file or Vercel environment variables.');
}

const sql = neon(url, {
  fullResults: false,
  arrayMode: false,
});

export { sql as s };
