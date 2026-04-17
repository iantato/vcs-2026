import { c as createComponent } from './_astro_assets_Cm4VkkMA.mjs';
import 'piccolore';
import { r as renderComponent, b as renderTemplate, m as maybeRenderHead, c as addAttribute } from './entrypoint_DzPtys1S.mjs';
import { $ as $$Layout, r as renderScript } from './Layout_Csp2za1U.mjs';
import { s as sql } from './index_CZzODHOr.mjs';

const $$Admin = createComponent(async ($$result, $$props, $$slots) => {
  let availableGroups = [];
  try {
    const groupsData = await sql`
    SELECT id, name FROM groups ORDER BY name ASC
  `;
    availableGroups = groupsData;
  } catch (error) {
    console.error("Error fetching groups:", error);
    availableGroups = [];
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Admin Scanner", "data-astro-cid-2zp6q64z": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="admin-container" data-astro-cid-2zp6q64z> <h1 class="glow-title" data-astro-cid-2zp6q64z>Admin NFC Portal</h1> <div class="scanner-ui" data-astro-cid-2zp6q64z> <!-- Minecraft Observer Face via Actual Texture --> <div class="observer-wrapper" data-astro-cid-2zp6q64z> <img id="observer-img" class="observer-img" src="/observer_front.png" alt="Observer" data-astro-cid-2zp6q64z> </div> <p class="status-msg" id="status-message" data-astro-cid-2zp6q64z>Waiting for NFC scan...</p> <button class="mc-button scan-btn" id="simulate-scan" data-astro-cid-2zp6q64z>START SCANNER</button> <!-- Modal for new user prompt --> <div class="new-user-form mc-panel" id="new-user-form" style="display: none; margin-top: 2rem; width: 100%;" data-astro-cid-2zp6q64z> <h3 data-astro-cid-2zp6q64z>New NFC Card Detected!</h3> <p style="color: #8b949e; margin-bottom: 1rem;" data-astro-cid-2zp6q64z>This badge isn't assigned to anyone yet.</p> <div style="margin-top: 1rem; text-align: left;" data-astro-cid-2zp6q64z> <label for="profile-name" style="color: #c9d1d9; display: block; margin-bottom: 0.5rem;" data-astro-cid-2zp6q64z>Enter Profile Name:</label> <input type="text" id="profile-name" class="mc-input" placeholder="BlockBreaker99" data-astro-cid-2zp6q64z> </div> <div style="margin-top: 1rem; text-align: left;" data-astro-cid-2zp6q64z> <label for="group-select" style="color: #c9d1d9; display: block; margin-bottom: 0.5rem;" data-astro-cid-2zp6q64z>Assign to Group:</label> <select id="group-select" class="mc-input" data-astro-cid-2zp6q64z> ${availableGroups.length > 0 ? availableGroups.map((grp) => renderTemplate`<option${addAttribute(grp.id, "value")} data-astro-cid-2zp6q64z>${grp.name}</option>`) : renderTemplate`<option value="" data-astro-cid-2zp6q64z>No groups available</option>`} </select> </div> <button class="mc-button" id="save-new-user" style="margin-top: 1.5rem; width: 100%;" data-astro-cid-2zp6q64z>Register & Log Attendance</button> </div> <!-- UID Writing Instructions --> <div class="uid-instructions mc-panel" id="uid-instructions" style="display: none; margin-top: 2rem; border-color: var(--mc-accent); background: rgba(60, 133, 39, 0.1);" data-astro-cid-2zp6q64z> <h3 style="color: #55ff55; margin-top: 0;" data-astro-cid-2zp6q64z>✓ User Registered!</h3> <p style="color: #c9d1d9; margin: 1rem 0;" data-astro-cid-2zp6q64z>Your NFC sticker needs to be written with this UID:</p> <div style="background: #0d1117; padding: 1rem; border-radius: 4px; border: 1px solid #30363d; margin: 1rem 0; font-family: var(--font-minecraft-ten); font-size: 1.1rem; color: #55ff55; text-align: center; word-break: break-all;" id="uid-display" data-astro-cid-2zp6q64z></div> <p style="color: #8b949e; font-size: 0.9rem; margin: 1rem 0;" data-astro-cid-2zp6q64z>Use <strong data-astro-cid-2zp6q64z>TagWriter by NXP</strong> or <strong data-astro-cid-2zp6q64z>Nfc Tools</strong> to write this to your physical NFC sticker as a Text record with prefix "vcs_uid:"</p> <button class="mc-button" id="close-instructions" style="margin-top: 1rem; width: 100%; background: rgba(60, 133, 39, 0.2);" data-astro-cid-2zp6q64z>Continue Scanning</button> </div> <div class="success-alert mc-panel" id="success-alert" style="display: none; margin-top: 2rem; border-color: var(--mc-accent); background: rgba(35, 134, 54, 0.1);" data-astro-cid-2zp6q64z> <h3 style="color: #55ff55; margin:0;" data-astro-cid-2zp6q64z>Attendance Logged!</h3> </div> </div> </div> ` })} ${renderScript($$result, "C:/Users/Christian/Desktop/Vacation Church School - 2026/src/pages/admin.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Christian/Desktop/Vacation Church School - 2026/src/pages/admin.astro", void 0);

const $$file = "C:/Users/Christian/Desktop/Vacation Church School - 2026/src/pages/admin.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Admin,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
