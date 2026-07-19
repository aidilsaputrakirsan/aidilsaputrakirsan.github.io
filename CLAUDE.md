# CLAUDE.md — Project Guide for AI Agents

Guidance for any AI/new chat working on this repo. Read this first.

## What this is
Personal portfolio / company-profile site for **Aidil Saputra Kirsan** (Full-Stack
Developer & Information System Lecturer, Balikpapan). React + Vite + Tailwind +
Framer Motion. Deployed to GitHub Pages (`npm run deploy`).

## Active design = "Soft / Warm" (light theme)
The site was redesigned. The current live design is the **Soft/Warm** light theme.
The original dark theme is **kept for rollback, not used**.

- Toggle lives in [src/App.jsx](src/App.jsx): `const USE_SOFT = true`.
  - `true` → new Soft/Warm site (Navbar/Hero/About/Skills/Experience/Projects/Contact/Footer + CV).
  - `false` → original dark site (old components).
- New components are suffixed **`*Soft`** (e.g. `HeroSoft.jsx`). Old ones have no suffix.
- **When editing the live site, edit the `*Soft` components**, not the old ones.
- Palette, fonts (`Sora` display / `Plus Jakarta Sans` body), shadows live in
  [tailwind.config.js](tailwind.config.js) under the `warm*` color keys.

## Content is data-driven — edit data, not JSX
All real content lives in [src/data/](src/data/). Change data → UI + CV update together.

| Content | File |
|---|---|
| Projects | [src/data/projects.js](src/data/projects.js) |
| Work experience | [src/data/experience.js](src/data/experience.js) |
| Education | [src/data/education.js](src/data/education.js) |
| Achievements/certs | [src/data/achievements.js](src/data/achievements.js) |
| Time-based values (years, current projects) | [src/data/site.js](src/data/site.js) |

## Auto-updating values — single source of truth
[src/data/site.js](src/data/site.js) drives everything time-based. **Never hardcode "5+ years"
or a "currently working on" list again** — use these helpers:

- `yearsOfExperience()` = current year − `CAREER_START_YEAR` (2020). Used in Hero stats,
  About paragraph, Skills subtitle, and CV profile.
- `currentProjects()` = projects whose `year` === the **current calendar year**. This is
  what powers "Currently working on …" (About) and "Products in build" (Hero).
- `currentRoles()` = experience entries whose `period` contains "Present". Powers the
  **rotating badge on the hero photo** — add/end a role in `experience.js` and the badge
  follows automatically. Give entries an optional `shortTitle`/`shortCompany` so the
  badge shows a hand-picked short label instead of truncating the long one.
- `formatList([...])` = "A, B, and C".

Implication: a project shows up under "currently working on" **only if its `year`
matches the current year**. If an older project is still active, bump its `year`.

## HOW TO: add a new project (most common task)
1. Put the image in [public/images/projects/](public/images/projects/) (e.g. `myproject.png`).
   Compress large images (<~500KB). Cards use `object-contain`, so the full image shows
   (no crop); odd aspect ratios get letterboxed — that's expected.
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
     year: "2026",           // current year => counts as "currently working on"
   }
   ```
3. Nothing else to wire. Hero "Projects shipped" count, the Projects section + filter,
   the "currently working on" text, and the CV "Selected Projects" all update automatically.

### Portfolio section layout (two tiers)
[ProjectsSoft.jsx](src/components/sections/ProjectsSoft.jsx) renders projects in two tiers:
- **"Products"** — entries with `featured: true`: big poster card (portrait poster in
  `public/images/projects/`, e.g. `poster-rt.jpeg`) + live link. Extra fields:
  `status: "live" | "building"` (badge), `tagline` (short line under the title),
  and `demoLink` = the real public URL. Poster click opens the raw image in a new
  tab (products don't use the detail modal).
  If the poster isn't ready yet, set `image: null` — the card renders a monogram
  panel instead (drop the poster in later and just fill `image`). No demo/code link
  → the card shows a "Launching soon" pill (used while `status: "building"`).
- **"Selected works"** — everything else: compact image-free list rows (the `image`
  field is only shown in the detail modal). `internal: true` shows an
  "Internal system" chip explaining why there's no public demo.
- Tech-stack chips are deliberately **not** shown on cards/list rows (too noisy) —
  `technologies` still matters: it feeds the detail modal's "Built with" and the CV.

**To add a new product later:** add one entry at the top of `projectsData` with
`featured: true`, `status`, `tagline`, real `demoLink`, and a poster (or `image: null`
until it's ready). Everything else (Hero stats, "currently working on", CV) follows.

## CV (Download CV)
- Built from the same data files — [src/components/cv/CvDocument.jsx](src/components/cv/CvDocument.jsx).
- "Download CV" buttons dispatch a `window` event `open-cv`; [CvModal.jsx](src/components/cv/CvModal.jsx)
  listens, shows an A4 overlay, and `window.print()` → "Save as PDF".
- Print CSS in [src/index.css](src/index.css): hides `#root`, shows only `#cv-overlay`/`#cv-print`.
  (Don't revert to `visibility:hidden` — it caused many blank pages.)
- Hand-written bits in `CvDocument.jsx` (not from data): the `profile` paragraph,
  `skillGroups`, and `contacts`. The website URL there is `myst-tech.com`.
- CV currently spans ~2 pages by choice (bigger font/spacing). Selected Projects shows the
  top 10 (`projectsData.slice(0, 10)`).

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
