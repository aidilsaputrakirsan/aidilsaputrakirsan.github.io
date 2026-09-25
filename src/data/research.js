// File: data/research.js
// Research, publications & Tri Dharma data — powers the Research section on
// the profile page (/aidil/), the CV, and the publication count in the heroes.
//
// Publications sync from OpenAlex, research grants & community service from the
// public SINTA profile, teaching from PDDikti (see the blocks below) — all
// refreshed monthly.
// Items marked `verify: true` still need checking against SINTA / Google Scholar.
//
// type: 'journal' | 'conference' | 'community' (community-service article)
// Bilingual text is { en, id }; paper titles stay in their original language.
import openalex from './publications.openalex.json';
import sinta from './sinta.json';
import pddikti from './pddikti.json';

export const academicProfiles = [
  { label: 'SINTA', url: 'https://sinta.kemdiktisaintek.go.id/authors/profile/6760340' },
  { label: 'Google Scholar', url: 'https://scholar.google.com/citations?user=lzQbWuEAAAAJ' },
  { label: 'IEEE Xplore', url: 'https://ieeexplore.ieee.org/author/37087083867' },
  {
    label: 'PDDikti',
    url: 'https://pddikti.kemdiktisaintek.go.id/detail-dosen/IoSReu3bNE8rzmlkYrqfc14bBpHS_uOaRK6Z9ZaoLKvhph-ffRox5Ttp7BblMlTtwFkFHw==',
  },
];

export const researchInterests = [
  { en: 'Applied AI & LLM systems', id: 'AI terapan & sistem LLM' },
  { en: 'AI-assisted assessment', id: 'Penilaian berbantuan AI' },
  'Internet of Things',
  { en: 'Wireless Sensor Networks', id: 'Jaringan Sensor Nirkabel' },
  { en: 'Software Engineering', id: 'Rekayasa Perangkat Lunak' },
];

// --- Publications ---------------------------------------------------------
// Most entries come automatically from OpenAlex (publications.openalex.json,
// refreshed monthly by `npm run publications` / GitHub Actions). Don't edit
// that JSON — use the three lists below instead:
//
// 1. publicationFixes: keyed by DOI, overrides fields of an OpenAlex entry
//    (wrong venue name, odd capitalisation, add `indexing: 'SINTA 3'`, …).
// 2. manualPublications: papers OpenAlex doesn't have. Full entries.
// 3. hiddenPublications: DOIs or exact titles to drop (wrong author match).
export const publicationFixes = {
  '10.11591/ijece.v14i1.pp520-531': {
    venue: 'International Journal of Electrical and Computer Engineering (IJECE), Vol. 14 No. 1',
  },
  '10.31602/jst.v9i1.6372': {
    title: 'Development of HR Operational Dashboard Website at PT. Telkom Regional VI',
    venue: 'Al Ulum: Jurnal Sains dan Teknologi, Vol. 9 No. 1',
  },
  '10.24198/dharmakarya.v10i4.34869': {
    title: 'Optimalisasi Peningkatan Teknologi dalam Pengembangan Notifikasi SIAKAD Berbasis Mobile di Sekolah Balikpapan',
    venue: 'Dharmakarya: Jurnal Aplikasi Ipteks untuk Masyarakat, Vol. 10 No. 4',
    indexing: 'SINTA 3',
  },
  '10.1109/elecsym.2019.8901669': {
    title: 'Efficient Energy for Cluster Head Selection Using New LEACH-Based Routing Protocol in Wireless Sensor Network',
    venue: 'International Electronics Symposium (IES) 2019, IEEE',
  },
};

export const manualPublications = [
  {
    title: 'Pengembangan Kampung Warna-warni Teluk Seribu sebagai Destinasi Wisata Smart Tourism',
    venue: 'Prosiding Seminar Nasional Pengabdian kepada Masyarakat',
    year: '2021',
    type: 'community',
    url: '',
    verify: true,
  },
];

export const hiddenPublications = [];

const hidden = new Set(hiddenPublications.map((s) => s.toLowerCase()));

// Newest first.
export const publications = [
  ...openalex.items
    .filter((p) => !hidden.has(p.doi) && !hidden.has(p.title.toLowerCase()))
    .map((p) => ({ ...p, ...publicationFixes[p.doi] })),
  ...manualPublications,
].sort((a, b) => b.year.localeCompare(a.year));

// --- Research grants & community service -----------------------------------
// Synced from the public SINTA profile (sinta.json, refreshed monthly by
// `npm run sinta` / GitHub Actions — don't edit that JSON). Tweak it here:
//   sintaLinks:  item id (see sinta.json) → URL shown as the row's link
//   manualResearchGrants / manualCommunityService: activities SINTA lacks
//   hiddenSinta: item ids to drop
// Every row renders as { title, year, sub, url }.
const LEAD = { en: 'Lead', id: 'Ketua' };
const MEMBER = { en: 'Member', id: 'Anggota' };

export const sintaLinks = {
  'rancangan-dan-implementasi-smart-home-system-untuk':
    'https://lppm.itk.ac.id/detail-hasil-penelitan/rancangan-dan-implementasi-smart-home-system-untuk-pengendalian-sakelar-listrik-berbasis-iot',
  'optimalisasi-pengelolaan-sistem-monitoring-data-energi':
    'https://lppm.itk.ac.id/detail-hasil-penelitan/optimalisasi-pengelolaan-sistem-monitoring-data-energi-listrik-pada-smart-home-system-untuk-saklar-listrik-menggunakan-metode-extreme-programming',
  'pengembangan-kawasan-wisata-kuliner-kelurahan-damai': 'https://doi.org/10.24198/dharmakarya.v12i3.40845',
};

export const hiddenSinta = [];

export const manualResearchGrants = [];

export const manualCommunityService = [
  {
    title: {
      en: 'Mobile SIAKAD notification app for SD Al-Azhar 58 Balikpapan',
      id: 'Aplikasi notifikasi SIAKAD mobile untuk SD Al-Azhar 58 Balikpapan',
    },
    sub: 'SD Al-Azhar 58 Balikpapan',
    year: '2021',
    url: 'https://lppm.itk.ac.id/detail-berita/pengabdian-kepada-masyarakat-optimalisasi-peningkatan-teknologi-dalam-pengembangan-siakad-berbasis-mobile-di-sekolah-balikpapan',
  },
  {
    title: {
      en: 'Smart-tourism development for Kampung Warna-warni Teluk Seribu',
      id: 'Pengembangan smart tourism Kampung Warna-warni Teluk Seribu',
    },
    sub: 'Teluk Seribu, Balikpapan',
    year: '2021',
    url: '',
  },
];

const fromSinta = (items, schemeLabel) =>
  items
    .filter((x) => !hiddenSinta.includes(x.id))
    .map((x) => {
      const scheme = schemeLabel(x);
      const role = x.role === 'lead' ? LEAD : MEMBER;
      return {
        title: x.title,
        year: x.year,
        sub: { en: `${scheme.en} · ${role.en}`, id: `${scheme.id} · ${role.id}` },
        url: sintaLinks[x.id] ?? '',
      };
    });

const byYear = (a, b) => b.year.localeCompare(a.year);

export const researchGrants = [
  ...fromSinta(sinta.research, (x) =>
    x.selfFunded
      ? { en: 'Self-funded', id: 'Mandiri' }
      : { en: `ITK internal grant (${x.scheme})`, id: `Hibah internal ITK (${x.scheme})` },
  ),
  ...manualResearchGrants,
].sort(byYear);

export const communityService = [
  ...fromSinta(sinta.service, (x) =>
    x.selfFunded
      ? { en: 'Self-funded', id: 'Mandiri' }
      : x.scheme === 'PMMD'
        ? { en: 'ITK community program (PMMD)', id: 'Program Mahasiswa Mengabdi Desa (PMMD)' }
        : { en: `ITK community grant (${x.scheme})`, id: `Hibah pengabdian ITK (${x.scheme})` },
  ),
  ...manualCommunityService,
].sort(byYear);

// --- Teaching ---------------------------------------------------------------
// Synced from PDDikti (pddikti.json, refreshed monthly by `npm run pddikti` /
// GitHub Actions — don't edit that JSON). Add an English name here when a new
// course shows up; unknown names fall back to the Indonesian one.
export const courseNames = {
  'Komputasi Awan': 'Cloud Computing',
  'Pemrograman Web': 'Web Programming',
  'Matematika Diskrit': 'Discrete Mathematics',
  'Desain dan Manajemen Jaringan Komputer': 'Computer Network Design & Management',
  'Pemrograman Berorientasi Objek': 'Object-Oriented Programming',
  'Algoritme Pemrograman': 'Programming Algorithms',
  'Pemrograman Terstruktur': 'Structured Programming',
  'Struktur Data': 'Data Structures',
  'Pemrograman Mobile': 'Mobile Programming',
  'Proposal Tugas Akhir': 'Thesis Proposal',
  'Manajemen Pusat Data': 'Data Center Management',
  'Basis Data': 'Database Systems',
};

// "2020/2021 Ganjil" → 2020, "2020/2021 Genap" → 2021 (calendar year it ran)
const semYear = (s) => Number(s.slice(0, 4)) + (/genap/i.test(s) ? 1 : 0);

export const teachingSummary = { latestSemester: pddikti.latestSemester, totalClasses: pddikti.totalClasses };

export const teaching = pddikti.courses.map((c) => {
  const from = semYear(c.first);
  const to = semYear(c.last);
  const years = from === to ? `${from}` : `${from}–${to}`;
  return {
    name: { en: courseNames[c.name] ?? c.name, id: c.name },
    detail: {
      en: `${c.semesters} semester${c.semesters > 1 ? 's' : ''} · ${years}`,
      id: `${c.semesters} semester · ${years}`,
    },
    current: c.current,
  };
});
