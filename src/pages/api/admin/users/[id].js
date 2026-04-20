import sql from '../../../../db/index.js';

export async function PUT({ params, request }) {
  try {
    const { id } = params;
    const body = await request.json();
    let { name, group_id, emeralds, is_teacher, avatar_url } = body;

    // Ensure column exists for is_teacher
    try { await sql`ALTER TABLE attendees ADD COLUMN IF NOT EXISTS is_teacher BOOLEAN DEFAULT false`; } catch (e) {}
    try { await sql`ALTER TABLE attendees ADD COLUMN IF NOT EXISTS avatar_url TEXT`; } catch (e) {}

    if (is_teacher) {
      group_id = null;
      emeralds = 0;
    }

    // Update user
    await sql`
      UPDATE attendees
      SET
        name = ${name},
        group_id = ${group_id},
        emeralds = ${emeralds},
        is_teacher = ${is_teacher},
        avatar_url = ${avatar_url || null}
      WHERE id = ${id}
    `;

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return new Response(JSON.stringify({ error: 'Failed to update user', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function DELETE({ params }) {
  try {
    const { id } = params;
    // Delete foreign key relationships first
    await sql`DELETE FROM nfc_mappings WHERE attendee_id = ${id}`;
    await sql`DELETE FROM attendance_records WHERE attendee_id = ${id}`;
    await sql`DELETE FROM attendees WHERE id = ${id}`;
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete user' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
