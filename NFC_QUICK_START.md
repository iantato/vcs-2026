# 🏷️ NFC Sticker Setup - Quick Start Guide

## What You'll Need
1. **NFC Stickers** - Order NFC 215 or NFC 216 stickers (Amazon, AliExpress, etc.)
2. **Android Phone** - With NFC capability
3. **NFC Writing App** - Free options:
   - **TagWriter by NXP** (Official, most reliable)
   - **Nfc Tools** (Simpler UI)

## 5-Minute Setup

### Step 1: Choose Your Writing App
- **Download TagWriter by NXP** from Google Play Store (Recommended)
  - Open the app
  - Tap "Create New"

### Step 2: Add First Record (Website Profile Link)
1. In TagWriter, add a new NDEF Record
2. Select **Type: URI**
3. Enter this URL:
   ```
   https://vcs-2026.vercel.app/profile/SteveMiner
   ```
   (Replace "SteveMiner" with the person's actual Minecraft username)
4. Tap "Save Record"

### Step 3: Add Second Record (UID Backup)
1. Add another NDEF Record
2. Select **Type: Text**
3. Enter this text:
   ```
   vcs_uid:04E1F2A3B4C5D6
   ```
   (You can use any unique ID, or leave it as example - it will be replaced when NFC is read)

### Step 4: Write to Sticker
1. Tap "Write"
2. Hold the NFC sticker near your phone's back (NFC sensor area)
3. Wait for beep/vibration - Done! ✓

---

## Understanding What Just Happened

Your NFC sticker now has **two pieces of information**:

### Record 1: Website Link
- **When**: Someone taps the sticker with their phone
- **What happens**: Opens the profile page automatically
- **Example**: `https://vcs-2026.vercel.app/profile/SteveMiner`

### Record 2: Attendance Code
- **When**: Staff taps sticker on the admin scanner
- **What happens**: Logs attendance to the database
- **Format**: `vcs_uid:[UNIQUE_ID]`

---

## Example: Setting Up For One Person

Let's say you want to set up a sticker for **"BlockBuilder99"**

**What you write:**

```
Record 1 (URI):
https://vcs-2026.vercel.app/profile/BlockBuilder99

Record 2 (Text):
vcs_uid:04A2B3C4D5E6
```

**Result:**
- ✓ Anyone scanning the sticker sees BlockBuilder99's profile
- ✓ Admin scanner recognizes the UID and logs attendance
- ✓ If UID is unknown, prompts to register the user

---

## Step-by-Step: TagWriter by NXP

### Creating a New Tag

```
1. Open TagWriter
2. Tap "Create New"
3. Leave as "All Types" (default)
4. Proceed
```

### Adding URI Record

```
1. Tap "+" to add record
2. Select "URI" from list
3. Choose "https://" protocol
4. Paste: vcs-2026.vercel.app/profile/BlockBuilder99
5. Tap "Done"
```

### Adding Text Record

```
1. Tap "+" again
2. Select "Text" from list
3. Enter: vcs_uid:04A2B3C4D5E6
4. Tap "Done"
```

### Writing to Physical Sticker

```
1. Tap "Write"
2. Place NFC sticker flat against phone back
3. Keep it in contact until complete
4. You'll see checkmark when done ✓
```

---

## Multiple Stickers? Batch Them!

If you're setting up many stickers, TagWriter has a **batch write** feature:

1. Write first sticker normally
2. In TagWriter, tap "Write"
3. It will prompt for additional stickers
4. Place each new sticker and it writes the same data
5. Super fast! ⚡

---

## Troubleshooting NFC Writing

| Problem | Solution |
|---------|----------|
| "Tag not detected" | Move sticker around the phone (find NFC sensor) |
| Phone gets hot | This is normal - NFC uses a coil. Just move sticker away. |
| Write fails | Make sure sticker is blank or compatible |
| App crashes | Restart phone and app |
| Sticker is rewritable | Yes! Just write over it with new data |

---

## What NOT to Do

❌ Don't write sensitive information to NFC stickers
❌ Don't assume UID is private - it's meant to be scanned
❌ Don't use stickers in water (unless waterproof type)
❌ Don't put metal objects on stickers (blocks NFC)

---

## After You Write the Sticker

### Test It!

**Test 1: Direct Scan**
1. Open any NFC reader app
2. Scan the sticker
3. Should see both records and the profile URL

**Test 2: Profile Link**
1. Open browser on your phone
2. Go to: `https://vcs-2026.vercel.app/profile/BlockBuilder99`
3. You should see the profile page

**Test 3: Admin Scanner**
1. Go to: `https://vcs-2026.vercel.app/admin`
2. Tap "START SCANNER"
3. Scan your sticker
4. If first time: Should show registration form
5. If already registered: Should log attendance

---

## Pro Tips 💡

1. **Laminate stickers** - Makes them last longer
2. **Use colored stickers** - One color per group
3. **Label stickers** - Write name on sticker for backup
4. **Keep backups** - Write down the UIDs somewhere
5. **Test everything** - Test before giving to participants

---

## Common Usernames to Set Up

If you're preparing stickers for your existing attendees:

```
SteveMiner           → https://vcs-2026.vercel.app/profile/SteveMiner
AlexCraft            → https://vcs-2026.vercel.app/profile/AlexCraft
GodsBuilder          → https://vcs-2026.vercel.app/profile/GodsBuilder
Notch_Fan            → https://vcs-2026.vercel.app/profile/Notch_Fan
NewPlayer99          → https://vcs-2026.vercel.app/profile/NewPlayer99
```

---

## Need a Different Format?

The system is flexible! You can:
- Change the username in the URL
- Use a shorter Text value
- Add additional records (max 10)
- Update stickers anytime

Just rewrite them with TagWriter.

---

## Questions?

If something doesn't work:
1. **Check the NFC sticker** - Use another NFC app to read it
2. **Verify the URL** - Copy-paste from above, don't type manually
3. **Test with admin** - Go to `/admin` to debug
4. **Check database** - User might not be registered yet

---

**Now go write some NFC stickers! 🏷️✨**

Questions? See `NFC_SETUP.md` for more technical details.
