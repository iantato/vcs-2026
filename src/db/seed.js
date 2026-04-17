import 'dotenv/config';
import sql from './index.js';

async function seed() {
  try {
    console.log('🌱 Seeding Neon database...');

    // Create groups
    const groupsData = [
      { name: 'Diamond Diggers', emeralds: 245 },
      { name: 'Ender Explorers', emeralds: 180 },
      { name: 'Redstone Engineers', emeralds: 156 }
    ];

    console.log('Creating groups...');
    for (const group of groupsData) {
      await sql`
        INSERT INTO groups (name, emeralds)
        VALUES (${group.name}, ${group.emeralds})
        ON CONFLICT DO NOTHING
      `;
    }

    // Get group IDs
    const groups = await sql`SELECT id, name FROM groups`;
    const groupMap = {};
    groups.forEach((g) => {
      groupMap[g.name] = g.id;
    });

    // Create attendees
    const attendeesData = [
      { name: 'SteveMiner', group: 'Diamond Diggers', days: 5 },
      { name: 'AlexCraft', group: 'Ender Explorers', days: 4 },
      { name: 'GodsBuilder', group: 'Redstone Engineers', days: 3 },
      { name: 'Notch_Fan', group: 'Diamond Diggers', days: 2 },
      { name: 'NewPlayer99', group: 'Ender Explorers', days: 1 }
    ];

    console.log('Creating attendees...');
    for (const attendee of attendeesData) {
      await sql`
        INSERT INTO attendees (name, group_id, days_attended)
        VALUES (${attendee.name}, ${groupMap[attendee.group]}, ${attendee.days})
        ON CONFLICT DO NOTHING
      `;
    }

    // Create badges
    const badgesData = [
      { title: 'First Day!', icon: 'https://minecraft.wiki/images/Crafting_Table_%28item%29_JE4_BE3.png' },
      { title: 'Helped a Friend', icon: 'https://minecraft.wiki/images/Golden_Apple_JE2_BE2.png' },
      { title: 'Memory Verse Master', icon: 'https://minecraft.wiki/images/Enchanted_Book.gif' }
    ];

    console.log('Creating badges...');
    for (const badge of badgesData) {
      await sql`
        INSERT INTO badges (title, icon_url)
        VALUES (${badge.title}, ${badge.icon})
        ON CONFLICT DO NOTHING
      `;
    }

    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();
