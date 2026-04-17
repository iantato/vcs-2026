import { c as createComponent } from './_astro_assets_DTkjFF9c.mjs';
import 'piccolore';
import { r as renderComponent, b as renderTemplate, m as maybeRenderHead, c as addAttribute } from './entrypoint_EHCFQqyt.mjs';
import { $ as $$Layout } from './Layout_BOuFvl3-.mjs';

const $$Profile = createComponent(($$result, $$props, $$slots) => {
  const user = {
    name: "SteveMiner",
    group: "Diamond Diggers",
    groupEmeralds: 64,
    daysAttended: 5,
    rank: "Netherite",
    rankColor: "#443A4B",
    badges: [
      { title: "First Day!", icon: "https://minecraft.wiki/images/Crafting_Table_%28item%29_JE4_BE3.png" },
      { title: "Helped a Friend", icon: "https://minecraft.wiki/images/Golden_Apple_JE2_BE2.png" },
      { title: "Memory Verse Master", icon: "https://minecraft.wiki/images/Enchanted_Book.gif" }
    ]
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "My Profile", "data-astro-cid-wwes6yjo": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="profile-container" data-astro-cid-wwes6yjo> <div class="profile-header mc-panel" style="padding: 2rem;" data-astro-cid-wwes6yjo> <div class="avatar-box" data-astro-cid-wwes6yjo> <img${addAttribute(`https://minotar.net/avatar/${user.name}/120.png`, "src")}${addAttribute(`${user.name}'s Head`, "alt")} class="avatar-head" onerror="this.src='/favicon.svg'" data-astro-cid-wwes6yjo> </div> <div class="player-info" data-astro-cid-wwes6yjo> <h1 class="player-name" data-astro-cid-wwes6yjo>${user.name}</h1> <p class="group-title" data-astro-cid-wwes6yjo> <span class="group-label" data-astro-cid-wwes6yjo>GROUP</span> <span class="group-name" data-astro-cid-wwes6yjo>${user.group}</span> </p> <p class="emerald-count" data-astro-cid-wwes6yjo> <img src="https://minecraft.wiki/images/Emerald_JE3_BE3.png" alt="Emerald" width="20" style="vertical-align: middle; margin-right: 8px;" onerror="this.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='" data-astro-cid-wwes6yjo>
Group Emeralds: <span style="color: #c9d1d9; font-family: var(--font-minecraft-ten); min-width: 30px; display: inline-block;" data-astro-cid-wwes6yjo>${user.groupEmeralds}</span> </p> </div> </div> <div class="profile-details" data-astro-cid-wwes6yjo> <!-- Rank and Attendance --> <div class="mc-panel rank-panel" data-astro-cid-wwes6yjo> <h2 style="border-bottom: 2px solid #30363d; padding-bottom: 0.5rem; color: #f0f6fc;" data-astro-cid-wwes6yjo>Progress & Tier</h2> <div class="tier-box" data-astro-cid-wwes6yjo> <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.75rem;" data-astro-cid-wwes6yjo> <p style="color: #8b949e; margin: 0; font-size: 1rem; text-transform: uppercase;" data-astro-cid-wwes6yjo>Attendance</p> <p style="font-family: var(--font-minecraft-ten); color: var(--mc-accent); margin: 0; font-size: 1.25rem;" data-astro-cid-wwes6yjo>${user.daysAttended} / 5</p> </div> <div class="progress-bar" data-astro-cid-wwes6yjo> <div class="progress-fill"${addAttribute(`width: ${user.daysAttended / 5 * 100}%;`, "style")} data-astro-cid-wwes6yjo></div> </div> <div style="margin-top: 2rem; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;" data-astro-cid-wwes6yjo> <p style="color: #8b949e; font-size: 0.9rem; text-transform: uppercase; margin: 0;" data-astro-cid-wwes6yjo>Current Tier</p> <div${addAttribute(`display: inline-block; padding: 0.5rem 1.5rem; background-color: #111; background-image: linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(255,255,255,0.05) 100%); border-radius: 8px; border: 1px solid ${user.rankColor}40; box-shadow: 0 0 15px ${user.rankColor}30, inset 0 1px 0 rgba(255,255,255,0.1);`, "style")} data-astro-cid-wwes6yjo> <h3${addAttribute(`color: ${user.rankColor}; margin: 0; font-size: 2.25rem; letter-spacing: 2px; text-shadow: 1px 1px 0 #000, 0 0 15px ${user.rankColor}80;`, "style")} data-astro-cid-wwes6yjo>${user.rank}</h3> </div> </div> </div> </div> <!-- Achievements/Badges --> <div class="mc-panel badges-panel" data-astro-cid-wwes6yjo> <h2 style="border-bottom: 2px solid #30363d; padding-bottom: 0.5rem; color: #f0f6fc;" data-astro-cid-wwes6yjo>Achievements</h2> <div class="badges-grid" data-astro-cid-wwes6yjo> ${user.badges.map((badge) => renderTemplate`<div class="badge-item" data-astro-cid-wwes6yjo> <div class="badge-icon-box" data-astro-cid-wwes6yjo> <img${addAttribute(badge.icon, "src")}${addAttribute(badge.title, "alt")} width="40" height="40" style="image-rendering: pixelated;" onerror="this.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='" data-astro-cid-wwes6yjo> </div> <p class="badge-title" data-astro-cid-wwes6yjo>${badge.title}</p> </div>`)} </div> </div> </div> </div> ` })}`;
}, "C:/Users/Christian/Desktop/Vacation Church School - 2026/src/pages/profile.astro", void 0);

const $$file = "C:/Users/Christian/Desktop/Vacation Church School - 2026/src/pages/profile.astro";
const $$url = "/profile";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Profile,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
