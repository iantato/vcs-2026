# ✅ VCS 2026 - NFC & Database Integration Checklist

## Database Setup Status
- [x] Neon project created (`quiet-salad-36243909`)
- [x] Schema initialized (tables: groups, attendees, badges, nfc_mappings)
- [x] Mock data seeded (5 attendees, 3 groups, 3 badges)
- [x] Environment variables configured (`.env` with `NEON_DATABASE_URL`)
- [x] Serverless driver installed (`@neondatabase/serverless`)

## Website Updates
- [x] `/attendance` page - Now fetches live data from Neon
- [x] `/admin` page - Enhanced with NFC user registration
- [x] Dynamic group dropdown in registration form
- [x] API endpoints created:
  - `/api/attendees` - Get all data
  - `/api/user/[name]` - Get user profile
  - `/api/scan` - Log attendance
  - `/api/register` - Register new user

## NFC Integration
- [x] Unknown NFC detection
- [x] Registration form for new users
- [x] Automatic UID-to-user mapping
- [x] Attendance logging on scan
- [x] NFC setup documentation created

## NFC Sticker Configuration (You Need To Do This)
- [ ] Purchase NFC stickers (NFC 215/216 recommended)
- [ ] Write NFC records using TagWriter or Nfc Tools app:
  - **Record 1 (URI)**: `https://vcs-2026.vercel.app/profile/[USERNAME]`
  - **Record 2 (Text)**: `vcs_uid:[STICKER_UID]`
- [ ] Test scanning with admin portal at `/admin`
- [ ] Test direct scanning (should open profile page)

## Deployment Readiness
- [x] Vercel adapter installed (`@astrojs/vercel`)
- [x] Astro config updated for serverless (`output: server`)
- [x] Environment variables ready for deployment
- [ ] Push to GitHub repository
- [ ] Deploy to Vercel (set `NEON_DATABASE_URL` in Vercel dashboard)

## Testing Checklist
- [ ] Admin scanner detects known NFC → logs attendance
- [ ] Admin scanner detects unknown NFC → shows registration form
- [ ] Registration form → creates user → logs Day 1 attendance
- [ ] Attendance page → shows updated data after scan
- [ ] Profile page works with direct link
- [ ] Direct NFC scan → opens profile page (after setting up records)

## Data Already in Database
**Groups:**
- Diamond Diggers (245 emeralds)
- Ender Explorers (180 emeralds)
- Redstone Engineers (156 emeralds)

**Attendees:**
- SteveMiner - Diamond Diggers - 5 days
- AlexCraft - Ender Explorers - 4 days
- GodsBuilder - Redstone Engineers - 3 days
- Notch_Fan - Diamond Diggers - 2 days
- NewPlayer99 - Ender Explorers - 1 day

**Badges:**
- First Day!
- Helped a Friend
- Memory Verse Master

---

## Quick Commands

```bash
# Development
npm run dev                  # Start dev server (http://localhost:3000)

# Database
npm run db:init             # Initialize schema only
npm run seed                # Init schema + seed data (idempotent)

# Build
npm run build               # Build for production
npm run preview             # Preview production build
```

## Important URLs

- **Admin Scanner**: `http://localhost:3000/admin`
- **Attendance Rankings**: `http://localhost:3000/attendance`
- **User Profile**: `http://localhost:3000/profile/SteveMiner`
- **API Base**: `http://localhost:3000/api/`

## NFC Sticker Recommendations

**Format**: NDEF (NFC Data Exchange Format)
**Type**: NFC 215/216 (4KB capacity)
**Records to Write**: 2 (URI + Text)
**Tools**: 
- TagWriter by NXP (Android, free)
- Nfc Tools (Android/Web, simpler)

**UID Example Format**: `04E1F2A3B4C5D6` (14 hex characters)

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Unknown NFC detected" loop | NFC UID not yet registered. Use registration flow. |
| Profile page won't load | Username is case-sensitive. Use exact name from database. |
| API returns 404 | Database might not be seeded. Run `npm run seed`. |
| No groups in dropdown | Database schema not created. Run `npm run db:init`. |
| `.env` not loading | Make sure `.env` file is in project root. |
| Neon connection error | Check `NEON_DATABASE_URL` in `.env`. Verify it's not expired. |

---

## Files Created/Modified

**New Files:**
- `src/db/index.js` - Neon client initialization
- `src/db/init.js` - Database schema initialization
- `src/db/seed.js` - Data seeding script
- `src/db/schema.sql` - Schema reference
- `src/pages/api/attendees.js` - Attendees API
- `src/pages/api/user/[name].js` - User profile API
- `src/pages/api/scan.js` - NFC attendance logging
- `src/pages/api/register.js` - NFC user registration
- `.env` - Environment variables
- `NFC_SETUP.md` - NFC configuration guide
- `IMPLEMENTATION.md` - Complete implementation docs

**Modified Files:**
- `src/pages/attendance.astro` - Now uses Neon data
- `src/pages/admin.astro` - Enhanced NFC registration
- `astro.config.mjs` - Added Vercel adapter
- `package.json` - Added new scripts and dependencies

---

**Your VCS 2026 NFC attendance system is ready to deploy! 🎮✨**
