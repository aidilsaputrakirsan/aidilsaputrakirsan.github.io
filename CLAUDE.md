# CLAUDE.md — Project Guide for AI Agents

Guidance for any AI/new chat working on this repo. Read this first.

## What this is
**myst-tech.com** — the "one gate" hub for every Myst Tech app (GuruPintar,
SkripsiPintar, Asdos-AI, Sistem Manajemen RT, …) plus the founder profile of
**Aidil Saputra Kirsan** (Founder of Myst Tech, AI product engineer & Information
System Lecturer, Balikpapan). React + Vite + Tailwind + Framer Motion + three.js.
Deployed to GitHub Pages (`npm run deploy`).

## Two pages (Vite multi-page, no router)
| URL | HTML | Entry | Root component |
|---|---|---|---|
| `/` | [index.html](index.html) | [src/main.jsx](src/main.jsx) | [src/HubApp.jsx](src/HubApp.jsx) — Myst Tech hub |
| `/aidil/` | [aidil/index.html](aidil/index.html) | [src/main-profile.jsx](src/main-profile.jsx) | [src/App.jsx](src/App.jsx) — founder profile + CV |

Both are listed in `build.rollupOptions.input` in [vite.config.js](vite.config.js);
GitHub Pages serves `/aidil/index.html` natively. Hub sections live in
[src/components/hub/](src/components/hub/) (Hero with 3D orbit → Aplikasi launcher →
Myst-Core → Founder → Kontak). `NavbarSoft`/`FooterSoft` are shared and take props
(`links`, `brand`, `cta`, `back`, `labels`).

## Two languages: English (default) + Bahasa Indonesia
- [src/i18n/LangContext.jsx](src/i18n/LangContext.jsx): `LangProvider` (wraps both pages),
  `useLang()` → `{ lang, setLang, t }`. Choice is saved in `localStorage.lang` and shared
  by `/` and `/aidil/`. Switch = `LangToggle` (EN | ID) in the navbar.
- **Any bilingual text is `{ en: '…', id: '…' }`** — in components *and* in `src/data/*`.
  Render it with `t(value)`; plain strings pass through untouched (brand names, paper
  titles, `projects.js` descriptions — translate those later by turning them into `{ en, id }`).
- Never render a data field directly (`{item.title}`) — always `{t(item.title)}`, or React
  will crash on the object.
- The CV is always English (`resolve(v, 'en')` in CvDocument); the rollback dark theme too.
- `experience.js` keeps `period: "... - Present"` (used by `currentRoles()`); the UI shows
  "Sekarang" in ID.

## Active design = "Soft / Warm" (light + warm-dark theme)
The site was redesigned. The current live design is the **Soft/Warm** light theme.
The original dark theme is **kept for rollback, not used**.

- Toggle lives in [src/App.jsx](src/App.jsx) (profile page): `const USE_SOFT = true`.
  - `true` → Soft/Warm profile (Navbar/Hero/About/Skills/Research/Experience/Projects/Contact/Footer + CV).
  - `false` → original dark site (old components).
- New components are suffixed **`*Soft`** (e.g. `HeroSoft.jsx`). Old ones have no suffix.
- **When editing the live site, edit the `*Soft` components**, not the old ones.
- Palette, fonts (`Sora` display / `Plus Jakarta Sans` body), shadows live in
  [tailwind.config.js](tailwind.config.js) under the `warm*` color keys.

## Content is data-driven — edit data, not JSX
All real content lives in [src/data/](src/data/). Change data → UI + CV update together.

| Content | File |
|---|---|
| **Myst apps (hub launcher, 3D orbit, CV)** | [src/data/products.js](src/data/products.js) |
| Research, publications, grants, pengabdian, teaching | [src/data/research.js](src/data/research.js) |
| Works / client & campus systems | [src/data/projects.js](src/data/projects.js) |
| Work experience | [src/data/experience.js](src/data/experience.js) |
| Education | [src/data/education.js](src/data/education.js) |
| Achievements/certs | [src/data/achievements.js](src/data/achievements.js) |
| Time-based values (years, current projects) | [src/data/site.js](src/data/site.js) |

## Auto-updating values — single source of truth
[src/data/site.js](src/data/site.js) drives everything time-based. **Never hardcode "5+ years"
or a "currently working on" list again** — use these helpers:

- `yearsOfExperience()` = current year − `CAREER_START_YEAR` (2020). Used in Hero stats,
  About paragraph, Skills subtitle, and CV profile.
- `currentProjects()` = products + projects whose `year` === the **current calendar year**.
  Powers "Currently working on …" (About).
- `publicationCount()` = `publications.length` (hero/founder stats); `shippedCount()`.
- `currentRoles()` = experience entries whose `period` contains "Present". Powers the
  **rotating badge on the hero photo** — add/end a role in `experience.js` and the badge
  follows automatically. Give entries an optional `shortTitle`/`shortCompany` so the
  badge shows a hand-picked short label instead of truncating the long one.
- `formatList([...])` = "A, B, and C".

Implication: a project shows up under "currently working on" **only if its `year`
matches the current year**. If an older project is still active, bump its `year`.

## HOW TO: add a new Myst app (most common task)
Add one entry to `productsData` in [src/data/products.js](src/data/products.js) (field
docs are at the top of that file): `id`, `title`, `tagline`, `pitch` (ID), `description`
(EN, for profile/CV), `audience` (+ `audienceLabel`), `features`, `url`, `poster`,
`color` (brand hex), `icon` (key from [productIcons.js](src/components/hub/productIcons.js)),
`status: 'live' | 'building'`, `poweredByCore`, `ai`, `year`, `technologies`, `screenshot`.
Bilingual fields (`tagline`, `pitch`, `audienceLabel`, `features[]`) are `{ en, id }`.
Nothing else to wire: the hub hero badge + quick-launch chips + marquee, the 3D orbit
(new planet in the app's color; `poweredByCore` adds a beam to the core), the launcher
cards + audience filter, the Myst-Core diagram, the footer, the profile page's
"Products I run" strip, Skills "AI Product Engineering" count and the CV all update.
Put posters in `public/images/projects/` (compress, <~500KB). Not released yet →
`status: 'building'`, `url: ''`, `poster: null`.

### Landing-page screenshots on the app cards
- Cards with `screenshot` show the app's real landing page in a browser frame (zoomed to
  150% width, centred; hover scrolls down the page). `screenshot: null` → brand-colour
  panel + icon instead.
- **`npm run screenshots`** (script: [scripts/capture-landings.mjs](scripts/capture-landings.mjs))
  opens every live app's `url` in the locally installed Chrome/Edge (`playwright-core`, no
  download; or set `CHROME_PATH`), saves `public/images/landing/<id>.jpg` (1280px wide,
  ≤1600px tall, ~100–250KB) and sets that product's `screenshot` field automatically.
  `npm run screenshots -- asdos-ai` captures only the listed ids. Re-run when a landing
  page changes, then commit the images.

## HOW TO: add a publication / research / pengabdian
Add to `publications`, `researchGrants` or `communityService` in
[src/data/research.js](src/data/research.js). Newest first. The profile Research
section, counters and the CV "Publications" list update automatically. Entries with
`verify: true` were collected from public indexes and still need checking.

## HOW TO: add a work / project (non-Myst system)
1. Optional image in [public/images/projects/](public/images/projects/) (only shown in the detail modal).
2. Add an entry at the **top** of `projectsData` in [src/data/projects.js](src/data/projects.js):
   ```js
   {
     id: <next unused number>,
     title: "My Project",
     description: "One or two sentences.",
     image: "/images/projects/myproject.png",   // local path, not a CDN
     technologies: ["Laravel", "Vue.js", "MySQL"],
     category: "web",        // one of: web | mobile | iot | other
     demoLink: "#",
     codeLink: "#",          // GitHub URL or "#"
     year: "2026",
     location: "Balikpapan, Indonesia",
     internal: true,         // optional: "Internal system" chip
   }
   ```
It shows in the profile's "Selected works" list (+ filter), Skills domain counts and
the CV "Selected Projects" (top 8).

## 3D orbit (hub hero)
- [src/components/three/MystOrbit.jsx](src/components/three/MystOrbit.jsx) (React wrapper, DOM
  labels, static fallback) lazy-imports
  [createOrbitScene.js](src/components/three/createOrbitScene.js) (plain three.js, no R3F)
  after first paint → separate ~130KB-gzip chunk that never blocks the page.
- Myst-Core = the core sphere; AI apps (`poweredByCore`) orbit the inner ring with
  beams + request "packets"; other apps on the outer ring. Colors follow `products.js`
  and the light/dark theme (reads the `--warm-*` CSS vars).
- Pauses off-screen / in hidden tabs; `prefers-reduced-motion` → static, render-on-demand.
  No WebGL → the static CSS fallback stays. Keep it light: no textures/GLB unless
  compressed and small.

## CV (Download CV)
- Built from the same data files — [src/components/cv/CvDocument.jsx](src/components/cv/CvDocument.jsx).
- "Download CV" buttons dispatch a `window` event `open-cv`; [CvModal.jsx](src/components/cv/CvModal.jsx)
  listens, shows an A4 overlay, and `window.print()` → "Save as PDF".
- Print CSS in [src/index.css](src/index.css): hides `#root`, shows only `#cv-overlay`/`#cv-print`.
  (Don't revert to `visibility:hidden` — it caused many blank pages.)
- Hand-written bits in `CvDocument.jsx` (not from data): the `profile` paragraph,
  `skillGroups` (AI Engineering first), and `contacts`. Website there: `myst-tech.com/aidil`.
- Sections from data: Experience, Education, Products (live apps from products.js),
  Selected Projects (`projectsData.slice(0, 8)`), Publications, Achievements.
- CvModal is mounted on both pages (hub "Unduh CV" works too).

## Marquees (the moving text strips)
- Hero (first): **roles** with Feather icons — text identity. In [HeroSoft.jsx](src/components/sections/HeroSoft.jsx).
- Skills (second): **brand logos + names** via `react-icons/si` (bundled, no CDN).
  In [SkillsSoft.jsx](src/components/sections/SkillsSoft.jsx). Add tech by adding a
  `{ name, Icon, color }` entry (verify the `Si*` icon exists in `react-icons/si`).
- Component: [src/components/ui/Marquee.jsx](src/components/ui/Marquee.jsx) (accepts strings or JSX nodes).

## Animation conventions
- Framer Motion everywhere. Prefer `whileInView` + transforms (`scaleX`, `x/y`, `scale`)
  over animating layout props. **Don't animate `width` %** — it stalls on iOS Safari
  (skill bars use static width + animated `scaleX` for this reason).
- Always respect `useReducedMotion()` / `prefers-reduced-motion` (global rule in index.css).
- Helpers: [Counter.jsx](src/components/ui/Counter.jsx) (count-up), [Marquee.jsx](src/components/ui/Marquee.jsx).

## Performance rules
- Keep assets light. The original heavy assets (`public/frames/` 20MB scroll-canvas +
  `myst-tech.mp4` 18MB) were **deleted** — do not reintroduce that pattern; it lagged mobile.
- Lazy-load project images (already done). Compress before committing.

## Commands
```bash
npm install
npm run dev      # local dev (Vite, http://localhost:5173)
npm run build    # production build (use to verify changes compile)
npm run deploy   # build + publish to GitHub Pages
```
Always run `npm run build` after changes to confirm everything compiles.
