import 'dotenv/config';
import sql from './index.js';

async function initSchema() {
  try {
    console.log('🔧 Initializing database schema...');

    // Create the groups table
    await sql`
      CREATE TABLE IF NOT EXISTS groups (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        emeralds INTEGER DEFAULT 0
      )
    `;
    console.log('✓ groups table created');

    // Create the attendees table
    await sql`
      CREATE TABLE IF NOT EXISTS attendees (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        group_id INTEGER REFERENCES groups(id),
        days_attended INTEGER DEFAULT 0,
        emeralds INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✓ attendees table created');

    // Create the badges table
    await sql`
      CREATE TABLE IF NOT EXISTS badges (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        icon_url TEXT NOT NULL
      )
    `;
    console.log('✓ badges table created');

    // Create the attendee_badges join table
    await sql`
      CREATE TABLE IF NOT EXISTS attendee_badges (
        attendee_id INTEGER REFERENCES attendees(id) ON DELETE CASCADE,
        badge_id INTEGER REFERENCES badges(id) ON DELETE CASCADE,
        awarded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (attendee_id, badge_id)
      )
    `;
    console.log('✓ attendee_badges table created');

    // Add emeralds column to attendees if it doesn't exist
    try {
      await sql`ALTER TABLE attendees ADD COLUMN emeralds INTEGER DEFAULT 0`;
    } catch(e) {}
    
    // Create the nfc_mappings table
    await sql`
      CREATE TABLE IF NOT EXISTS nfc_mappings (
        uid VARCHAR(255) PRIMARY KEY,
        attendee_id INTEGER REFERENCES attendees(id),
        is_written BOOLEAN DEFAULT false,
        registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Add is_written column if it doesn't exist (for existing databases)
    try {
      await sql`
        ALTER TABLE nfc_mappings ADD COLUMN is_written BOOLEAN DEFAULT false
      `;
    } catch (e) {
      // Column already exists, skip
    }

    console.log('✓ nfc_mappings table created');

    // Create attendance_records table to track attendance by date
    await sql`
      CREATE TABLE IF NOT EXISTS attendance_records (
        id SERIAL PRIMARY KEY,
        attendee_id INTEGER REFERENCES attendees(id) ON DELETE CASCADE,
        attended_date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(attendee_id, attended_date)
      )
    `;
    console.log('✓ attendance_records table created');

    console.log('✅ Database schema initialized successfully!');
  } catch (error) {
    console.error('❌ Error initializing schema:', error);
    process.exit(1);
  }
}

initSchema();
