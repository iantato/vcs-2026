import sql from '../../db/index.js';

export async function GET() {
  try {
    // Delete all data
    await sql`DELETE FROM attendee_badges`;
    await sql`DELETE FROM attendance_records`;
    await sql`DELETE FROM nfc_mappings`;
    await sql`DELETE FROM attendees`;
    await sql`DELETE FROM badges`;
    await sql`DELETE FROM groups`;

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'All tables wiped clean' 
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
