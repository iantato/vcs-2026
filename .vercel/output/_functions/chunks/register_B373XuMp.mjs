import { s as sql } from './index_CZzODHOr.mjs';

// Generate a unique NFC UID (hex format)
function generateUID() {
  return 'VCS' + Math.random().toString(16).substring(2, 10).toUpperCase() + Date.now().toString(16).substring(-6).toUpperCase();
}

async function POST({ request }) {
  try {
    let { uid, name, groupId, isNewSticker } = await request.json();

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
      VALUES (${name}, ${groupId}, 1)
      RETURNING id, name, group_id
    `;

    // Store NFC UID mapping
    await sql`
      CREATE TABLE IF NOT EXISTS nfc_mappings (
        uid VARCHAR(255) PRIMARY KEY,
        attendee_id INTEGER REFERENCES attendees(id),
        is_written BOOLEAN DEFAULT false,
        registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
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
    return new Response(JSON.stringify({ error: 'Failed to register user' }), {
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
