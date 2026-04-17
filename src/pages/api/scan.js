import sql from '../../db/index.js';

export async function POST({ request }) {
  try {
    const { uid } = await request.json();

    // Initialize nfc_mappings table if needed
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS nfc_mappings (
          uid VARCHAR(255) PRIMARY KEY,
          attendee_id INTEGER REFERENCES attendees(id),
          is_written BOOLEAN DEFAULT false,
          registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
    } catch (e) {
      // Table may already exist
    }

    // Lookup NFC UID in database
    const mapping = await sql`
      SELECT attendee_id, is_written FROM nfc_mappings WHERE uid = ${uid}
    `;

    if (mapping.length === 0) {
      return new Response(JSON.stringify({ error: 'Unknown NFC', uid }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Mark as written if not already (physical sticker confirmed)
    if (!mapping[0].is_written) {
      await sql`
        UPDATE nfc_mappings SET is_written = true WHERE uid = ${uid}
      `;
    }

    // Log attendance
    const attendee = await sql`
      UPDATE attendees
      SET days_attended = days_attended + 1
      WHERE id = ${mapping[0].attendee_id}
      RETURNING id, name, days_attended
    `;

    return new Response(JSON.stringify({ success: true, attendee: attendee[0] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error logging attendance:', error);
    return new Response(JSON.stringify({ error: 'Failed to log attendance', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}