import { c as createComponent, $ as $$Font } from './_astro_assets_DTkjFF9c.mjs';
import 'piccolore';
import { d as createRenderInstruction, r as renderComponent, e as renderHead, f as renderSlot, b as renderTemplate } from './entrypoint_EHCFQqyt.mjs';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title} | VCS 2026</title>${renderComponent($$result, "Font", $$Font, { "cssVariable": "--font-minecraft" })}${renderComponent($$result, "Font", $$Font, { "cssVariable": "--font-minecraft-ten" })}${renderHead()}</head> <body> <header class="navbar"> <div class="logo">VCS 2026</div> <!-- Mobile Burger Toggle --> <button class="burger-menu" id="burger-btn" aria-label="Toggle navigation"> <span class="burger-lines"></span> </button> <nav id="nav-links"> <a href="/">Home</a> <a href="/admin">Admin Scanner</a> <a href="/attendance">Attendance</a> <a href="/profile">My Profile</a> </nav> </header> <main class="container"> ${renderSlot($$result, $$slots["default"])} </main> ${renderScript($$result, "C:/Users/Christian/Desktop/Vacation Church School - 2026/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "C:/Users/Christian/Desktop/Vacation Church School - 2026/src/layouts/Layout.astro", void 0);

export { $$Layout as $, renderScript as r };
