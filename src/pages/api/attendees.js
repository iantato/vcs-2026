import sql from '../../db/index.js';

export async function GET() {
  try {
    // Initialize tables if they don't exist
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS groups (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL,
          emeralds INTEGER DEFAULT 0
        )
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS attendees (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL,
          group_id INTEGER REFERENCES groups(id),
          days_attended INTEGER DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
    } catch (e) {
      // Tables may already exist, continue
    }

    const attendees = await sql`
      SELECT
        a.id,
        a.name,
        g.name as group,
        a.days_attended as days,
        CASE
          WHEN a.days_attended >= 5 THEN 'Netherite'
          WHEN a.days_attended >= 4 THEN 'Diamond'
          WHEN a.days_attended >= 3 THEN 'Gold'
          WHEN a.days_attended >= 2 THEN 'Iron'
          ELSE 'Wood/Coal'
        END as rank
      FROM attendees a
      LEFT JOIN groups g ON a.group_id = g.id
      ORDER BY a.days_attended DESC, a.name ASC
    `;

    const groups = await sql`
      SELECT id, name as group, emeralds
      FROM groups
      ORDER BY emeralds DESC
    `;

    return new Response(JSON.stringify({ attendees, groups }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching attendees:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch data', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}