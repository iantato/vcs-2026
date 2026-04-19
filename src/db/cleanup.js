import 'dotenv/config';
import sql from './index.js';

async function cleanupAttendance() {
  try {
    console.log('🧹 Clearing attendance records...');

    // Delete all data
    await sql`DELETE FROM attendee_badges`;
    await sql`DELETE FROM attendance_records`;
    await sql`DELETE FROM nfc_mappings`;
    await sql`DELETE FROM attendees`;
    await sql`DELETE FROM badges`;
    await sql`DELETE FROM groups`;
    console.log('✓ All tables wiped clean');

    console.log('✅ Cleanup complete!');
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    process.exit(1);
  }
}

cleanupAttendance();
