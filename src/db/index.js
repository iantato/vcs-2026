import { neon } from '@neondatabase/serverless';

// Retrieve the database URL from the environment variables
// import.meta.env is for Astro/browser, process.env is for Node.js
const url = process.env.NEON_DATABASE_URL || (typeof import.meta !== 'undefined' ? import.meta.env?.NEON_DATABASE_URL : undefined);

if (!url) {
  throw new Error('NEON_DATABASE_URL environment variable is not set');
}

const sql = neon(url);

export default sql;