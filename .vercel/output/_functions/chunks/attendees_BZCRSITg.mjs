import { s as sql } from './index_CZzODHOr.mjs';

async function GET() {
  try {
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
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
