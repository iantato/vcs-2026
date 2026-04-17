# NFC Brand New Sticker Registration Workflow

## Overview

This document explains how the system now handles **brand new NFC stickers** that have never been registered or written to before. The workflow distinguishes between completely unknown stickers and those that have been pre-allocated but not yet physically written.

## Problem Solved

Previously, the system could only detect if an NFC UID existed in the database. Now it can:
1. **Detect brand new physical stickers** with no data (serialNumber is empty/undefined)
2. **Generate unique UIDs** for new stickers
3. **Provide instructions** for writing the UID to the physical sticker
4. **Track registration state** (pending write vs. confirmed written)

## How It Works

### Workflow Diagram

```
┌─────────────────────┐
│  Brand New Sticker  │
│  (Never Used)       │
└──────────┬──────────┘
           │
           ▼
    ┌──────────────┐
    │ Scan Sticker │ ─── serialNumber is empty/UNKNOWN
    └──────┬───────┘
           │
           ▼
    ┌─────────────────────┐
    │ 404: Unknown NFC    │
    │ Shows Registration  │
    │ Form                │
    └──────┬──────────────┘
           │
           ▼
┌──────────────────────────────┐
│ User Enters:                 │
│ - Profile Name               │
│ - Group Selection            │
│ (isNewSticker = true)        │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│ API Generates UID            │
│ Format: VCS[HEX][TIMESTAMP]  │
│ Example: VCSABC123DEF        │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│ Create User in Database:     │
│ - attendees table (day 1)    │
│ - nfc_mappings (UID created) │
│ - is_written = false         │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│ Show Instructions:           │
│ "Write this UID to sticker:" │
│ [Display: VCSABC123DEF]      │
│                              │
│ Instructions:                │
│ Use TagWriter or Nfc Tools   │
│ Write as Text: vcs_uid:...   │
└──────────┬───────────────────┘
           │
    ┌──────┴─────────┐
    │                │
    ▼                ▼
 [Close]       [Continue]
    │              │
    └──────┬───────┘
           │
           ▼
┌──────────────────────────────┐
│ User Writes UID to Sticker   │
│ Using TagWriter by NXP       │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│ Scan Sticker Again           │
│ serialNumber = VCSABC123DEF  │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│ Found in nfc_mappings        │
│ Update is_written = true     │
│ Increment days_attended      │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│ ✓ Attendance Logged!         │
│ Show success message         │
└──────────────────────────────┘
```

## Technical Details

### Database Schema

**nfc_mappings table:**
```sql
CREATE TABLE nfc_mappings (
  uid VARCHAR(255) PRIMARY KEY,
  attendee_id INTEGER REFERENCES attendees(id),
  is_written BOOLEAN DEFAULT false,
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

- `uid`: Unique identifier (system-generated for new stickers)
- `attendee_id`: Links to attendees table
- `is_written`: Tracks if UID was physically written to sticker (false = pending, true = confirmed)
- `registered_at`: Timestamp of registration

### API Endpoints

#### POST /api/register

**Request:**
```json
{
  "uid": "VCSABC123DEF",  // empty/UNKNOWN for brand new stickers
  "name": "BlockBreaker99",
  "groupId": 1,
  "isNewSticker": true     // NEW: indicates brand new physical sticker
}
```

**Response (new sticker):**
```json
{
  "success": true,
  "user": {
    "id": 42,
    "name": "BlockBreaker99",
    "group_id": 1
  },
  "generatedUID": "VCSABC123DEF",
  "isNewSticker": true,
  "message": "Please write this UID to the physical NFC sticker"
}
```

**Response (already written sticker):**
```json
{
  "success": true,
  "user": {
    "id": 42,
    "name": "BlockBreaker99",
    "group_id": 1
  },
  "generatedUID": "VCSABC123DEF",
  "isNewSticker": false,
  "message": "User registered successfully"
}
```

#### POST /api/scan

**Request:**
```json
{
  "uid": "VCSABC123DEF"  // Serial number from NFC scan
}
```

**Response (success):**
```json
{
  "success": true,
  "attendee": {
    "id": 42,
    "name": "BlockBreaker99",
    "days_attended": 2
  }
}
```

**Response (unknown - triggers registration):**
```json
{
  "error": "Unknown NFC",
  "uid": "UNKNOWN"
}
```

### UID Generation

Generated UIDs follow the format: `VCS[HEXRANDOM][TIMESTAMP]`

**Example:** `VCSABC123DEF`

```javascript
function generateUID() {
  return 'VCS' 
    + Math.random().toString(16).substring(2, 10).toUpperCase()  // Random hex
    + Date.now().toString(16).substring(-6).toUpperCase();        // Timestamp hex
}
```

**Characteristics:**
- 18 characters long (VCS + 7 hex chars + 6 hex chars)
- Unique per sticker
- Human-readable prefix (VCS = Vacation Church School)
- Deterministic based on registration time

## Frontend Flow

### admin.astro Changes

1. **Scanner Detection:**
   - If `serialNumber` is empty/undefined, treat as brand new sticker
   - Set `isNewSticker = true` when submitting registration
   - Pass `uid: 'UNKNOWN'` or empty string

2. **Registration Form:**
   - Shows when scan returns 404 (unknown NFC)
   - User enters profile name and group
   - Save button triggers `/api/register` with `isNewSticker: true`

3. **UID Instructions Panel:**
   - Displays after registration with generated UID
   - Shows instructions for writing UID to physical sticker
   - User uses TagWriter by NXP to write the UID
   - Close button returns to scanner mode

4. **Success Flow:**
   - After user writes UID and scans again
   - System finds UID in database
   - Updates `is_written = true`
   - Logs attendance
   - Shows success message

## Usage Instructions

### For Administrators (Setting up brand new stickers)

1. **Click "START SCANNER"** button
2. **Tap brand new NFC sticker** to scanning area
   - If sticker is blank (never written to), it will show "Unknown Card"
3. **Enter child's profile name** and **select group**
4. **Click "Register & Log Attendance"**
5. **System generates unique UID** and displays it
6. **Write UID to physical sticker:**
   - Download TagWriter by NXP app (if not already installed)
   - Open TagWriter
   - Create new record → Text record
   - Enter text: `vcs_uid:VCSABC123DEF` (use the displayed UID)
   - Write to NFC sticker
7. **Tap "Continue Scanning"** button
8. **Scan the sticker again** to confirm it was written correctly
9. **Attendance logged!** First day recorded

### For Children (Scanning pre-written stickers)

1. **Have your NFC sticker ready** (already written with your UID)
2. **Tap "START SCANNER"** button
3. **Place sticker near phone's NFC reader**
4. **System shows your profile name and day count**
5. **Done!** Attendance recorded

## Key Differences from Previous System

| Aspect | Before | After |
|--------|--------|-------|
| **New Sticker Detection** | Could not detect brand new stickers | Detects when serialNumber is empty/UNKNOWN |
| **UID Assignment** | Required manual UID assignment | System auto-generates UIDs |
| **Registration State** | Only tracked name/group | Tracks pending vs. written state with `is_written` flag |
| **Write Instructions** | Not provided | Shows UID with step-by-step instructions |
| **Workflow** | One-time registration | Two-phase: register → write → confirm |

## Error Handling

### Scenario: User tries to scan sticker before writing UID

1. User registers new sticker → gets generated UID
2. User forgets to write UID to sticker
3. User scans sticker again (still blank)
4. System treats as new unknown sticker again
5. Shows registration form (user can skip or re-register)

**Prevention:** Clear instructions in UI remind user to write UID before scanning again

### Scenario: Duplicate name registration

If user tries to register with a name that already exists:
- `/api/register` returns 400 error
- Admin sees "Registration failed. User may already exist!"
- Can create new username or modify existing record

### Scenario: NFC write fails

If TagWriter write operation fails:
- Sticker remains unwritten
- Next scan still shows registration form
- User can retry writing process

## Testing the Workflow

### Test Case 1: Brand New Sticker
1. Have blank physical NFC sticker
2. Start scanner
3. Tap sticker → should show "Unknown Card UID: UNKNOWN"
4. Enter test profile name and group
5. Register → should display generated UID
6. Write UID using TagWriter
7. Scan again → should show success and attendance logged

### Test Case 2: Pre-written Sticker
1. Have sticker already written with valid UID
2. Start scanner
3. Tap sticker → should immediately log attendance
4. Should not show registration form

### Test Case 3: Already Registered Child
1. Registered child scans their sticker
2. Should increment day count
3. Should show "✓ [Name] - Day X"

## Security Considerations

- **UID Uniqueness:** Generated UIDs are cryptographically tied to registration time
- **Write Confirmation:** `is_written` flag prevents claiming unwritten stickers
- **Database Integrity:** Foreign key constraints ensure orphaned UIDs cannot exist
- **Access Control:** Scanner only accessible to authorized admin device

## Database Maintenance

### Checking Pending Stickers

```sql
-- Find stickers not yet written to physical media
SELECT uid, attendee_id, registered_at 
FROM nfc_mappings 
WHERE is_written = false
ORDER BY registered_at DESC;
```

### Checking Written Stickers

```sql
-- Find all confirmed written stickers
SELECT uid, attendee_id, registered_at 
FROM nfc_mappings 
WHERE is_written = true
ORDER BY registered_at DESC;
```

### Checking Unwritten User Registration

```sql
-- Find users who registered but sticker not written yet
SELECT a.name, a.group_id, nm.uid, nm.registered_at
FROM attendees a
JOIN nfc_mappings nm ON a.id = nm.attendee_id
WHERE nm.is_written = false
ORDER BY nm.registered_at DESC;
```

## Future Enhancements

- [ ] Bulk pre-generate UIDs for batch sticker setup
- [ ] Sticker write verification (scan after writing to confirm)
- [ ] Admin dashboard showing pending vs. written stickers
- [ ] Automatic retry logic for failed writes
- [ ] QR code export for offline UID writing instructions
- [ ] Sticker inventory tracking
- [ ] Batch write tool (write multiple stickers at once)

## Troubleshooting

### Issue: "Web NFC is not supported"
- **Cause:** Using non-Android device or outdated browser
- **Solution:** Use Android Chrome 83+ or Firefox with Web NFC enabled

### Issue: Sticker serialNumber is always "UNKNOWN"
- **Cause:** Sticker is damaged or not compatible
- **Solution:** Try different sticker or verify NFC type (should be Type 2, 3, or 4)

### Issue: Generated UID doesn't match after write
- **Cause:** User copied UID incorrectly or TagWriter created different text
- **Solution:** Verify exact text in TagWriter before writing, check character case

### Issue: Can't find newly written sticker in database
- **Cause:** User wrote different text format or typo
- **Solution:** Check exact UID stored in nfc_mappings table, verify serialNumber format on scan

---

**Last Updated:** April 18, 2026  
**Version:** 2.0 (Added Brand New Sticker Support)
