import sql from '../../../db/index.js';

export async function GET({ params }) {
  try {
    const { name } = params;

    const user = await sql`
      SELECT
        a.id,
        a.name,
        g.name as group,
        g.emeralds as groupEmeralds,
        a.days_attended as daysAttended,
        CASE
          WHEN a.days_attended >= 5 THEN 'Netherite'
          WHEN a.days_attended >= 4 THEN 'Diamond'
          WHEN a.days_attended >= 3 THEN 'Gold'
          WHEN a.days_attended >= 2 THEN 'Iron'
          ELSE 'Wood/Coal'
        END as rank
      FROM attendees a
      LEFT JOIN groups g ON a.group_id = g.id
      WHERE a.name = ${name}
    `;

    if (user.length === 0) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const badges = await sql`
      SELECT b.title, b.icon_url as icon
      FROM badges b
      INNER JOIN attendee_badges ab ON b.id = ab.badge_id
      WHERE ab.attendee_id = ${user[0].id}
      ORDER BY ab.awarded_at DESC
    `;

    return new Response(JSON.stringify({ ...user[0], badges }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch user', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}