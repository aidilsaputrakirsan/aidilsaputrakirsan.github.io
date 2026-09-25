// Pulls research grants (penelitian) and community service (pengabdian) from the
// public SINTA profile page and writes src/data/sinta.json. research.js merges
// it with hand-written entries (links, extra items, hidden items).
//
//   npm run sinta
//
// SINTA has no public API, so this reads the profile HTML. If SINTA blocks the
// request or changes its markup, the script exits without touching sinta.json
// (the site keeps the last good data) — check its output when numbers stall.
import { writeFile } from 'node:fs/promises';

const SINTA_ID = '6760340';
const ME = 'Aidil Saputra Kirsan';
const OUT = new URL('../src/data/sinta.json', import.meta.url);
// SINTA answers 403 to non-browser user agents.
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36';

// Title case for SINTA's ALL-CAPS titles, keeping acronyms and Indonesian
// conjunctions/prepositions the way they're normally written.
const ACRONYMS = { itk: 'ITK', iot: 'IoT', rfid: 'RFID', pxp: 'PXP', simlab: 'SIMLAB', rt: 'RT', ict: 'ICT', sd: 'SD', ai: 'AI', ui: 'UI', ux: 'UX', umkm: 'UMKM' };
const SMALL = new Set(['dan', 'di', 'ke', 'dari', 'untuk', 'pada', 'dengan', 'sebagai', 'melalui', 'yang', 'dalam', 'atau', 'bagi', 'terhadap']);
const titleCase = (s) =>
  s
    .toLowerCase()
    .split(' ')
    .map((w, i) => {
      const bare = w.replace(/[^a-z0-9]/g, '');
      if (ACRONYMS[bare]) return w.replace(bare, ACRONYMS[bare]);
      if (i > 0 && SMALL.has(w)) return w;
      return w.replace(/\p{L}/u, (c) => c.toUpperCase());
    })
    .join(' ');

const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const clean = (s) => decode(s.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
// Stable key for research.js overrides: first words of the title.
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60).replace(/-[^-]*$/, '');

async function scrape(view) {
  const res = await fetch(`https://sinta.kemdiktisaintek.go.id/authors/profile/${SINTA_ID}?view=${view}`, {
    headers: { 'User-Agent': UA, Accept: 'text/html', 'Accept-Language': 'id,en' },
  });
  if (!res.ok) throw new Error(`SINTA ${view}: HTTP ${res.status}`);
  const html = await res.text();
  return html
    .split('ar-list-item')
    .slice(1)
    .map((block) => {
      const pick = (re) => block.match(re)?.[1] ?? '';
      const raw = clean(pick(/ar-title">\s*<a[^>]*>([\s\S]*?)<\/a>/));
      const leader = clean(pick(/Leader : ([^<]*)/));
      const scheme = clean(pick(/el-book"><\/i>([^<]*)/)); // e.g. "HIBAH INTERNAL ( RKS )"
      const year = pick(/zmdi-calendar"><\/i>\s*(\d{4})/);
      const status = clean(pick(/ar-quartile text-success"[^>]*>([^<]*)/)) || null;
      if (!raw || !year) return null;
      const title = titleCase(raw);
      return {
        id: slug(title),
        title,
        year,
        role: leader.toLowerCase() === ME.toLowerCase() ? 'lead' : 'member',
        leader,
        // innermost "(…)": "HIBAH INTERNAL ( RKS )" → RKS, "INTERNAL ( … (PMMD) )" → PMMD
        scheme: [...scheme.matchAll(/\(\s*([^()]+?)\s*\)/g)].pop()?.[1] ?? scheme,
        selfFunded: /mandiri/i.test(scheme),
        status,
      };
    })
    .filter(Boolean);
}

const [research, service] = await Promise.all([scrape('researches'), scrape('services')]);
if (research.length === 0 && service.length === 0) {
  throw new Error('SINTA returned no items — markup changed or request blocked. sinta.json left untouched.');
}
await writeFile(
  OUT,
  JSON.stringify({ source: `https://sinta.kemdiktisaintek.go.id/authors/profile/${SINTA_ID}`, research, service }, null, 2) + '\n',
);
console.log(`Saved ${research.length} research grants + ${service.length} community service → src/data/sinta.json`);
