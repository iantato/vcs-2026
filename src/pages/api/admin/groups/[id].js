import sql from '../../../../db/index.js';

export async function PUT({ params, request }) {
  try {
    const { id } = params;
    const { name } = await request.json();

    if (!name || name.trim() === '') {
      return new Response(JSON.stringify({ error: 'Name is required' }), { status: 400 });
    }

    await sql`
      UPDATE groups
      SET name = ${name.trim()}
      WHERE id = ${id}
    `;

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error updating group:', error);
    return new Response(JSON.stringify({ error: 'Failed to update group', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function DELETE({ params }) {
  try {
    const { id } = params;

    // Remove users from this group first to satisfy foreign key constraint unless using ON DELETE SET NULL
    await sql`UPDATE attendees SET group_id = NULL WHERE group_id = ${id}`;

    // Now delete the group
    await sql`DELETE FROM groups WHERE id = ${id}`;

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error deleting group:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete group', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
