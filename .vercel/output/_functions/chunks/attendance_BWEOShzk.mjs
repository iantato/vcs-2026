import { c as createComponent } from './_astro_assets_DTkjFF9c.mjs';
import 'piccolore';
import { r as renderComponent, b as renderTemplate, m as maybeRenderHead, c as addAttribute } from './entrypoint_EHCFQqyt.mjs';
import { $ as $$Layout } from './Layout_BOuFvl3-.mjs';
import { s as sql } from './index_BrQo3_Da.mjs';

const $$Attendance = createComponent(async ($$result, $$props, $$slots) => {
  let attendees = [];
  let groupEmeralds = [];
  try {
    const attendeesData = await sql`
    SELECT
      a.id,
      a.name,
      g.name as group,
      a.days_attended as days,
      CASE
        WHEN a.days_attended >= 5 THEN 'Netherite'
        WHEN a.days_attended >= 4 THEN 'Diamond'
        WHEN a.days_attended >= 3 THEN 'Gold'
        WHEN a.days_attended >= 2 THEN 'Iron'
        ELSE 'Wood/Coal'
      END as rank
    FROM attendees a
    LEFT JOIN groups g ON a.group_id = g.id
    ORDER BY a.days_attended DESC, a.name ASC
  `;
    const groupsData = await sql`
    SELECT id, name as group, emeralds
    FROM groups
    ORDER BY emeralds DESC
  `;
    attendees = attendeesData;
    groupEmeralds = groupsData;
  } catch (error) {
    console.error("Error fetching data from Neon:", error);
    attendees = [];
    groupEmeralds = [];
  }
  const ranks = {
    "Netherite": { color: "#443A4B", img: "https://minecraft.wiki/images/Netherite_Ingot_JE1.png" },
    "Diamond": { color: "#55FFFF", img: "https://minecraft.wiki/images/Diamond_JE3_BE3.png" },
    "Gold": { color: "#FFAA00", img: "https://minecraft.wiki/images/Gold_Ingot_JE4_BE2.png" },
    "Iron": { color: "#FFFFFF", img: "https://minecraft.wiki/images/Iron_Ingot_JE3_BE2.png" },
    "Wood/Coal": { color: "#555555", img: "https://minecraft.wiki/images/Coal_JE4_BE3.png" }
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Attendance List", "data-astro-cid-s3r55oeh": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="attendance-container" data-astro-cid-s3r55oeh> <div class="header-content" data-astro-cid-s3r55oeh> <h1 class="glow-title" data-astro-cid-s3r55oeh>Attendance Rankings</h1> <p data-astro-cid-s3r55oeh>5 Days of Wisdom - The more you attend, the higher your tier!</p> </div> <!-- Group Emeralds Leaderboard --> <div class="mc-panel" style="padding: 0; overflow: hidden; background: #0d1117; margin-bottom: 2rem;" data-astro-cid-s3r55oeh> <h2 style="padding: 1rem 1rem 0 1rem; margin: 0; color: #f0f6fc;" data-astro-cid-s3r55oeh>Group Emeralds</h2> <div class="table-responsive" data-astro-cid-s3r55oeh> <table class="mc-table" data-astro-cid-s3r55oeh> <thead data-astro-cid-s3r55oeh> <tr data-astro-cid-s3r55oeh> <th style="width: 60px; text-align: center;" data-astro-cid-s3r55oeh>Rank</th> <th style="text-align: center;" data-astro-cid-s3r55oeh>Group</th> <th style="text-align: center;" data-astro-cid-s3r55oeh>Total Emeralds</th> </tr> </thead> <tbody data-astro-cid-s3r55oeh> ${attendees.length > 0 ? attendees.map((grp, index) => renderTemplate`<tr data-astro-cid-s3r55oeh> <td data-label="Rank" style="text-align: center; font-family: var(--font-minecraft-ten); color: #8b949e; font-size: 1.2rem;" data-astro-cid-s3r55oeh> ${index + 1} </td> <td data-label="Group" style="text-align: center;" data-astro-cid-s3r55oeh> <span class="group-label" data-astro-cid-s3r55oeh>${grp.group || "Unassigned"}</span> </td> <td data-label="Total Emeralds" style="text-align: center; font-family: var(--font-minecraft-ten); color: #55FF55; font-size: 1.2rem;" data-astro-cid-s3r55oeh> ${grp.emeralds || 0} <img src="https://minecraft.wiki/images/Emerald_JE3_BE3.png" alt="Emerald" width="20" style="vertical-align: middle; margin-left: 8px; image-rendering: pixelated;" onerror="this.src='/favicon.svg'" data-astro-cid-s3r55oeh> </td> </tr>`) : renderTemplate`<tr data-astro-cid-s3r55oeh> <td colspan="3" style="text-align: center; padding: 2rem; color: #8b949e;" data-astro-cid-s3r55oeh>
No groups registered yet. Set up your database!
</td> </tr>`} </tbody> </table> </div> </div> <!-- Individual Attendance Leaderboard --> <div class="mc-panel" style="padding: 0; overflow: hidden; background: #0d1117;" data-astro-cid-s3r55oeh> <h2 style="padding: 1rem 1rem 0 1rem; margin: 0; color: #f0f6fc;" data-astro-cid-s3r55oeh>Individual Attendance</h2> <div class="table-responsive" data-astro-cid-s3r55oeh> <table class="mc-table" data-astro-cid-s3r55oeh> <thead data-astro-cid-s3r55oeh> <tr data-astro-cid-s3r55oeh> <th style="width: 60px; text-align: center;" data-astro-cid-s3r55oeh>#</th> <th style="text-align: left;" data-astro-cid-s3r55oeh>Profile</th> <th style="text-align: center;" data-astro-cid-s3r55oeh>Group</th> <th style="text-align: center;" data-astro-cid-s3r55oeh>Score (Days)</th> <th style="text-align: center;" data-astro-cid-s3r55oeh>Tier</th> </tr> </thead> <tbody data-astro-cid-s3r55oeh> ${attendees.length > 0 ? attendees.map((user, index) => renderTemplate`<tr data-astro-cid-s3r55oeh> <td data-label="#" style="text-align: center; font-family: var(--font-minecraft-ten); color: #8b949e; font-size: 1.2rem;" data-astro-cid-s3r55oeh> ${index + 1} </td> <td data-label="Profile" style="text-align: left;" data-astro-cid-s3r55oeh> <div class="user-cell" data-astro-cid-s3r55oeh> <img${addAttribute(`https://minotar.net/avatar/${user.name}/32.png`, "src")}${addAttribute(`${user.name}'s Head`, "alt")} class="avatar-head" onerror="this.src='/favicon.svg'" data-astro-cid-s3r55oeh> <span class="user-name" data-astro-cid-s3r55oeh>${user.name}</span> </div> </td> <td data-label="Group" style="text-align: center;" data-astro-cid-s3r55oeh> <span class="group-label" data-astro-cid-s3r55oeh>${user.group || "Unassigned"}</span> </td> <td data-label="Score (Days)" style="text-align: center;" data-astro-cid-s3r55oeh> <span class="score-label" data-astro-cid-s3r55oeh>${user.days}</span> </td> <td data-label="Tier" style="text-align: center;" data-astro-cid-s3r55oeh> <div class="rank-badge"${addAttribute(`color: ${ranks[user.rank].color}; border-color: ${ranks[user.rank].color};`, "style")} data-astro-cid-s3r55oeh> ${user.rank} <img${addAttribute(ranks[user.rank].img, "src")}${addAttribute(user.rank, "alt")} width="20" height="20" style="image-rendering: pixelated; margin-left: 8px;" onerror="this.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='" data-astro-cid-s3r55oeh> </div> </td> </tr>`) : renderTemplate`<tr data-astro-cid-s3r55oeh> <td colspan="5" style="text-align: center; padding: 2rem; color: #8b949e;" data-astro-cid-s3r55oeh>
No attendees registered yet. Scan an NFC tag to get started!
</td> </tr>`} </tbody> </table> </div> </div> </div> ` })}`;
}, "C:/Users/Christian/Desktop/Vacation Church School - 2026/src/pages/attendance.astro", void 0);

const $$file = "C:/Users/Christian/Desktop/Vacation Church School - 2026/src/pages/attendance.astro";
const $$url = "/attendance";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Attendance,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
