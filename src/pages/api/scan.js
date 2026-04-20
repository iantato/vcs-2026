import sql from '../../db/index.js';

export async function POST({ request }) {
  try {
    const { uid } = await request.json();

    // Initialize tables if needed
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS nfc_mappings (
          uid VARCHAR(255) PRIMARY KEY,
          attendee_id INTEGER REFERENCES attendees(id),
          is_written BOOLEAN DEFAULT false,
          registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
      // Tables may already exist
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

    // Get today's date in GMT+8
    const gmt8Date = new Date(Date.now() + 8 * 60 * 60 * 1000);
    const today = gmt8Date.toISOString().split('T')[0];

    // Check if already scanned today
    const alreadyScanned = await sql`
      SELECT id FROM attendance_records
      WHERE attendee_id = ${mapping[0].attendee_id}
      AND attended_date = ${today}
    `;

    let daysAttended;
    if (alreadyScanned.length === 0) {
      // First scan today - log attendance
      await sql`
        INSERT INTO attendance_records (attendee_id, attended_date)
        VALUES (${mapping[0].attendee_id}, ${today})
      `;

      // Get updated days_attended count (distinct dates)
      const dayCount = await sql`
        SELECT COUNT(DISTINCT attended_date) as days
        FROM attendance_records
        WHERE attendee_id = ${mapping[0].attendee_id}
      `;
      daysAttended = dayCount[0].days;
    } else {
      // Already scanned today - just get current count
      const dayCount = await sql`
        SELECT COUNT(DISTINCT attended_date) as days
        FROM attendance_records
        WHERE attendee_id = ${mapping[0].attendee_id}
      `;
      daysAttended = dayCount[0].days;
    }

    // Get attendee info
    const attendee = await sql`
      SELECT id, name FROM attendees
      WHERE id = ${mapping[0].attendee_id}
    `;

    return new Response(JSON.stringify({ success: true, attendee: { ...attendee[0], days_attended: daysAttended } }), {
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