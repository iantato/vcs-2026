import 'dotenv/config';
import sql from './index.js';

async function cleanupAttendance() {
  try {
    console.log('🧹 Clearing attendance records...');

    // Delete all attendance records
    await sql`
      DELETE FROM attendance_records
    `;
    console.log('✓ All attendance records deleted');

    // Optional: Reset days_attended in attendees table
    await sql`
      UPDATE attendees SET days_attended = 0
    `;
    console.log('✓ Reset all attendance counts');

    console.log('✅ Cleanup complete!');
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    process.exit(1);
  }
}

cleanupAttendance();
