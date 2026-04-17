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

      await sql`
        CREATE TABLE IF NOT EXISTS attendance_records (
          id SERIAL PRIMARY KEY,
          attendee_id INTEGER REFERENCES attendees(id) ON DELETE CASCADE,
          attended_date DATE NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(attendee_id, attended_date)
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
        COALESCE(COUNT(DISTINCT ar.attended_date), 0) as days,
        CASE
          WHEN COALESCE(COUNT(DISTINCT ar.attended_date), 0) >= 5 THEN 'Netherite'
          WHEN COALESCE(COUNT(DISTINCT ar.attended_date), 0) >= 4 THEN 'Diamond'
          WHEN COALESCE(COUNT(DISTINCT ar.attended_date), 0) >= 3 THEN 'Gold'
          WHEN COALESCE(COUNT(DISTINCT ar.attended_date), 0) >= 2 THEN 'Iron'
          ELSE 'Wood/Coal'
        END as rank
      FROM attendees a
      LEFT JOIN groups g ON a.group_id = g.id
      LEFT JOIN attendance_records ar ON a.id = ar.attendee_id
      GROUP BY a.id, a.name, g.name
      ORDER BY days DESC, a.name ASC
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