# NFC Configuration Guide for Vacation Church School 2026

## Overview

Your NFC stickers work with **two distinct data structures** that determine their behavior:

### 1. **Attendance Logging Mode** (Website Scanner)
When scanning with the admin portal (`/admin`), the NFC data is used to:
- Identify the user via their NFC UID
- Increment their attendance count
- Log the action in the database

### 2. **Profile Navigation Mode** (Direct NFC Scan)
When scanning an NFC tag with a standard NFC reader (outside the website), it can:
- Direct to a user's profile page
- Open a Deep Link on mobile devices
- Allow quick access to a person's VCS profile

---

## NFC Sticker Configuration

### **Configuration Method 1: Pure UID-Based (Recommended for VCS)**

This is the simplest and most secure method.

**What to do:**
- Write only the **UID** (unique identifier) to the NFC sticker
- The website database maps UID → User Profile

**When scanning at `/admin`:**
1. Scanner reads UID
2. System looks up UID in `nfc_mappings` table
3. If found: Logs attendance for that user
4. If not found: Prompts to create a new user account

**When scanning with standard NFC reader:**
- The UID alone won't do anything
- You need to configure the **second part** below

---

### **Configuration Method 2: Deep Link URL (Dual-Purpose)**

To make NFC tags work **both ways**, write both:
1. **Primary Record**: NDEF URL record pointing to your profile page
2. **Secondary Record**: NDEF Text record containing the UID

**Recommended NDEF Structure:**

```
Record Type 1: URI
Format: https://vcs-2026.vercel.app/profile/[USERNAME]
Example: https://vcs-2026.vercel.app/profile/SteveMiner

Record Type 2: Text
Content: vcs_uid:[UID_VALUE]
Example: vcs_uid:04E1F2A3B4C5D6
```

**Why this works:**
- Standard NFC reader apps see the **URL** and open the profile page
- Your website scanner reads the **UID text** and logs attendance
- Both use cases work seamlessly

---

## Implementation Steps

### Step 1: Create NFC Stickers with Dual Records

You'll need **NFC writing software**. Recommended tools:

**Android Options:**
- **TagWriter by NXP** (Official, free)
- **Nfc Tools** (Android app - simpler UI)
- **Android Studio NFC Tools**

**Desktop Options:**
- **NDEF Editor** (Windows)
- **NFC Tools** (Web-based via libnfc)

**Process:**
1. Launch NFC writing app
2. Place blank NFC sticker on device
3. Add Record 1 (URL):
   - Type: `URI`
   - Value: `https://vcs-2026.vercel.app/profile/[USERNAME]`
4. Add Record 2 (UID backup):
   - Type: `Text`
   - Value: `vcs_uid:[ACTUAL_UID_FROM_STICKER]`
5. Write to sticker

### Step 2: Register UIDs in Database

After creating stickers, you have **two registration options**:

**Option A: Manual Registration (Quick)**
```sql
-- After you know the user's name and UID
INSERT INTO nfc_mappings (uid, attendee_id)
SELECT uid, id FROM attendees WHERE name = 'SteveMiner';
```

**Option B: Scan Registration (Recommended)**
1. Go to `/admin` portal
2. Tap "START SCANNER"
3. Tap the NFC sticker with the new user
4. System detects unknown UID
5. Enter profile name and group
6. System auto-maps UID → User ID in database

---

## API Endpoints Reference

### Attendance Logging
```
POST /api/scan
Body: { uid: "04E1F2A3B4C5D6" }
Response: { success: true, attendee: { id, name, days_attended } }
```

### User Registration
```
POST /api/register
Body: { uid: "04E1F2A3B4C5D6", name: "SteveMiner", groupId: 1 }
Response: { success: true, user: { id, name, group_id } }
```

### Fetch User Profile
```
GET /api/user/[name]
Response: { id, name, group, daysAttended, rank, badges: [] }
```

---

## Testing Your Setup

### Test 1: Admin Scanner
1. Go to `https://vcs-2026.vercel.app/admin`
2. Tap "START SCANNER"
3. Tap an NFC sticker
4. Verify attendance is logged or new user form appears

### Test 2: Profile Link
1. Use standard NFC reader app (Android default)
2. Tap the NFC sticker
3. Should open: `https://vcs-2026.vercel.app/profile/[USERNAME]`

### Test 3: URL Handling
Create a test link manually:
```
https://vcs-2026.vercel.app/profile/SteveMiner
```
Should load the Minecraft player's profile with stats

---

## Security Considerations

⚠️ **Important Notes:**

1. **UIDs are NOT secret** - They're meant to be scanned publicly
2. **URL approach is safer** - URL records can include additional verification
3. **Database validation** - Always verify UID in `nfc_mappings` before updating attendance
4. **Rate limiting** - Consider adding rate limits to `/api/scan` to prevent spam

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Sticker not readable | Ensure NFC sticker has proper record format |
| Profile link doesn't work | Verify username matches exactly (case-sensitive) |
| Scanner doesn't detect UID | Ensure sticker has Text record with `vcs_uid:` prefix |
| Unknown card loop | User not registered in database yet - use registration flow |

---

## Quick Reference: NFC Sticker Setup

```
┌─────────────────────────────────────────┐
│     NFC Sticker Structure (Recommended) │
├─────────────────────────────────────────┤
│ Record 1 (URI):                         │
│   https://vcs-2026.vercel.app/profile   │
│   /SteveMiner                           │
├─────────────────────────────────────────┤
│ Record 2 (Text):                        │
│   vcs_uid:04E1F2A3B4C5D6                │
├─────────────────────────────────────────┤
│ Result:                                 │
│ • Direct scan = Opens profile page      │
│ • Admin scanner = Logs attendance       │
└─────────────────────────────────────────┘
```

---

Enjoy your VCS 2026 NFC attendance system! 🎮
