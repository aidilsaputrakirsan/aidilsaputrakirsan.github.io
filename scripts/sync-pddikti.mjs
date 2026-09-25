// Pulls the teaching history (riwayat mengajar) from PDDikti and writes
// src/data/pddikti.json: one entry per course with how many semesters/classes
// it was taught and when. research.js adds English names (`courseNames`).
//
//   npm run pddikti
//
// PDDikti has no documented API; this uses the JSON backend its website calls.
// If the request fails, the script exits without touching pddikti.json.
import { writeFile } from 'node:fs/promises';

// Encoded id from the public profile URL (pddikti…/detail-dosen/<id>).
const DOSEN_ID = 'IoSReu3bNE8rzmlkYrqfc14bBpHS_uOaRK6Z9ZaoLKvhph-ffRox5Ttp7BblMlTtwFkFHw==';
const OUT = new URL('../src/data/pddikti.json', import.meta.url);
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36',
  Accept: 'application/json',
  Origin: 'https://pddikti.kemdiktisaintek.go.id',
  Referer: 'https://pddikti.kemdiktisaintek.go.id/',
};

async function get(path) {
  const res = await fetch(`https://api-pddikti.kemdiktisaintek.go.id/${path}/${DOSEN_ID}`, { headers: HEADERS });
  if (!res.ok) throw new Error(`PDDikti ${path}: HTTP ${res.status}`);
  const body = await res.json();
  if (body.status !== 'success') throw new Error(`PDDikti ${path}: ${JSON.stringify(body).slice(0, 200)}`);
  return body.data;
}

// "2024/2025 Genap" → sortable 20242 (Ganjil = 1, Genap = 2)
const semKey = (s) => Number(s.slice(0, 4)) * 10 + (/genap/i.test(s) ? 2 : 1);

const [profile, rows] = await Promise.all([get('dosen/profile'), get('dosen/teaching-history')]);
if (!rows?.length) throw new Error('PDDikti returned no teaching history — pddikti.json left untouched.');

const latest = rows.map((r) => r.nama_semester).sort((a, b) => semKey(b) - semKey(a))[0];
const courses = new Map();
for (const r of rows) {
  const name = r.nama_matkul.replace(/\s+/g, ' ').trim();
  const c = courses.get(name.toLowerCase()) ?? { name, semesters: new Set(), classes: 0 };
  c.semesters.add(r.nama_semester);
  c.classes += 1;
  courses.set(name.toLowerCase(), c);
}

const list = [...courses.values()]
  .map((c) => {
    const sems = [...c.semesters].sort((a, b) => semKey(a) - semKey(b));
    return {
      name: c.name,
      semesters: sems.length,
      classes: c.classes,
      first: sems[0],
      last: sems.at(-1),
      current: sems.at(-1) === latest, // taught in the most recent reported semester
    };
  })
  // current courses first, then most-taught, then most recent
  .sort((a, b) => b.current - a.current || b.semesters - a.semesters || semKey(b.last) - semKey(a.last));

await writeFile(
  OUT,
  JSON.stringify(
    {
      source: `https://pddikti.kemdiktisaintek.go.id/detail-dosen/${DOSEN_ID}`,
      rank: profile.jabatan_akademik, // e.g. "Asisten Ahli"
      program: profile.nama_prodi,
      latestSemester: latest,
      totalClasses: rows.length,
      courses: list,
    },
    null,
    2,
  ) + '\n',
);
console.log(`Saved ${list.length} courses (${rows.length} classes, latest ${latest}) → src/data/pddikti.json`);
