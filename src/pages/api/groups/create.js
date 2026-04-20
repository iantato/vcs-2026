import sql from '../../../db/index.js';

export async function POST({ request }) {
  try {
    const data = await request.json();
    const groupName = data.name;

    if (!groupName) {
      return new Response(JSON.stringify({ error: 'Group name is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Insert new group
    const result = await sql`
      INSERT INTO groups (name, emeralds)
      VALUES (${groupName}, 0)
      RETURNING id, name
    `;

    return new Response(JSON.stringify({ group: result[0] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error adding group:', error);

    // Handle unique constraint violation naturally
    if (error.code === '23505') {
       return new Response(JSON.stringify({ error: 'Group already exists' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ error: 'Server error adding group' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
