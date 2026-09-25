// Pulls the publication list from OpenAlex (free, no key) and writes
// src/data/publications.openalex.json. research.js merges it with the
// hand-written entries, so the Research section, counters and CV update.
//
//   npm run publications
//
// Runs monthly in .github/workflows/sync-publications.yml as well.
// Wrong author match / unwanted item? Add its DOI or title to
// `hiddenPublications` in src/data/research.js (don't edit the JSON).
import { writeFile } from 'node:fs/promises';

// https://openalex.org/A5056587617 (linked to ORCID 0000-0003-4035-3217)
const AUTHOR_ID = 'A5056587617';
const OUT = new URL('../src/data/publications.openalex.json', import.meta.url);

// Journals that publish community-service (pengabdian) articles.
const COMMUNITY_VENUE = /dharmakarya|abdimas|pengabdian|community service/i;

const url =
  `https://api.openalex.org/works?filter=author.id:${AUTHOR_ID}` +
  '&sort=publication_year:desc&per-page=200' +
  '&select=id,doi,title,publication_year,type,primary_location,biblio';

const res = await fetch(url, { headers: { 'User-Agent': 'myst-tech.com publication sync' } });
if (!res.ok) throw new Error(`OpenAlex ${res.status}: ${await res.text()}`);
const { results } = await res.json();

const stripTags = (s) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
// "PENGEMBANGAN KAWASAN WISATA" → "Pengembangan Kawasan Wisata"
const fixCaps = (s) =>
  s === s.toUpperCase() ? s.toLowerCase().replace(/(^|[\s(:-])(\p{L})/gu, (m, p, c) => p + c.toUpperCase()) : s;
const titleKey = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 60);

function venueOf(w) {
  const src = w.primary_location?.source?.display_name;
  const doi = w.doi || '';
  // OpenAlex sometimes lists a repository (e.g. DOAJ) or a merged journal name.
  const name = src && !/^DOAJ/i.test(src) ? src.split('/')[0].trim() : null;
  const vol = [w.biblio?.volume && `Vol. ${w.biblio.volume}`, w.biblio?.issue && `No. ${w.biblio.issue}`]
    .filter(Boolean)
    .join(' ');
  if (name) return vol ? `${name}, ${vol}` : name;
  if (doi.includes('10.1109/')) return 'IEEE conference proceedings';
  return w.type === 'conference-paper' || w.type === 'proceedings-article' ? 'Conference proceedings' : 'Journal article';
}

function typeOf(w, venue) {
  if (COMMUNITY_VENUE.test(venue)) return 'community';
  return /conference|proceedings/.test(w.type) || /proceedings|conference/i.test(venue) ? 'conference' : 'journal';
}

const seen = new Map();
for (const w of results) {
  if (!w.title || !w.publication_year) continue;
  const title = fixCaps(stripTags(w.title));
  const venue = venueOf(w);
  const item = {
    title,
    venue,
    year: String(w.publication_year),
    type: typeOf(w, venue),
    url: w.doi || w.primary_location?.landing_page_url || '',
    doi: w.doi ? w.doi.replace('https://doi.org/', '').toLowerCase() : '',
    openalex: w.id,
  };
  // Same paper listed twice (e.g. journal + DOAJ copy) → keep the one with a DOI.
  const key = titleKey(title);
  const prev = seen.get(key);
  if (!prev || (!prev.doi && item.doi)) seen.set(key, item);
}

const items = [...seen.values()].sort((a, b) => b.year.localeCompare(a.year));
await writeFile(OUT, JSON.stringify({ source: `https://openalex.org/${AUTHOR_ID}`, items }, null, 2) + '\n');
console.log(`Saved ${items.length} publications → src/data/publications.openalex.json`);
