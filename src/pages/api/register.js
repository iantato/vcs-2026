import sql from '../../db/index.js';

// Generate a unique NFC UID (hex format)
function generateUID() {
  return 'VCS' + Math.random().toString(16).substring(2, 10).toUpperCase() + Date.now().toString(16).substring(-6).toUpperCase();
}

export async function POST({ request }) {
  try {
    let { uid, name, groupId, isNewSticker } = await request.json();

    // Initialize tables if they don't exist
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS groups (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL,
          emeralds INTEGER DEFAULT 0
        )
      `;

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

      // Safely ensure emeralds column exists for legacy production databases
      try { await sql`ALTER TABLE attendees ADD COLUMN IF NOT EXISTS emeralds INTEGER DEFAULT 0`; } catch (e) {}

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

    // Check if user already exists
    const existingUser = await sql`
      SELECT id FROM attendees WHERE name = ${name}
    `;

    if (existingUser.length > 0) {
      return new Response(JSON.stringify({ error: 'User already exists' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // If it's a brand new sticker or no UID provided, generate one
    if (isNewSticker || !uid || uid === 'UNKNOWN') {
      uid = generateUID();
    }

    // Create new user
    const newUser = await sql`
      INSERT INTO attendees (name, group_id, days_attended)
      VALUES (${name}, ${groupId}, 0)
      RETURNING id, name, group_id
    `;

    // Log first attendance today
    const today = new Date().toISOString().split('T')[0];
    await sql`
      INSERT INTO attendance_records (attendee_id, attended_date)
      VALUES (${newUser[0].id}, ${today})
    `;

    await sql`
      INSERT INTO nfc_mappings (uid, attendee_id, is_written)
      VALUES (${uid}, ${newUser[0].id}, ${!isNewSticker})
      ON CONFLICT (uid) DO UPDATE SET attendee_id = ${newUser[0].id}
    `;

    return new Response(JSON.stringify({
      success: true,
      user: newUser[0],
      generatedUID: uid,
      isNewSticker: isNewSticker,
      message: isNewSticker ? 'Please write this UID to the physical NFC sticker' : 'User registered successfully'
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error registering user:', error);
    return new Response(JSON.stringify({ error: 'Failed to register user', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
