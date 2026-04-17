import { s as sql } from './index_CZzODHOr.mjs';

async function POST({ request }) {
  try {
    const { uid } = await request.json();

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
    return new Response(JSON.stringify({ error: 'Failed to log attendance' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
