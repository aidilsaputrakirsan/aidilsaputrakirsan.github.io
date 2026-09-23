// File: data/research.js
// Research, publications & Tri Dharma data — powers the Research section on
// the profile page (/aidil/), the CV, and the publication count in the heroes.
//
// Entries were collected from public indexes (EMITTER, Dharmakarya, Smart Comp,
// ResearchGate, LPPM ITK). Items marked `verify: true` still need their details
// checked against SINTA / Google Scholar — fix and remove the flag.
//
// type: 'journal' | 'conference' | 'community' (community-service article)
// Bilingual text is { en, id }; paper titles stay in their original language.

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

// Newest first.
export const publications = [
  {
    title: 'Solusi IoT Terbaru untuk Kontrol AC Hemat Energi dan Cerdas',
    venue: 'Smart Comp: Jurnalnya Orang Pintar Komputer, Vol. 13 No. 1',
    year: '2024',
    type: 'journal',
    url: 'https://ejournal.poltekharber.ac.id/index.php/smartcomp/article/view/5023',
  },
  {
    title: 'Rancang Bangun Sistem Deteksi Dini Kebakaran di Rumah Menggunakan Smart Home Berbasis IoT',
    venue: { en: 'Journal article', id: 'Artikel jurnal' },
    year: '2024',
    type: 'journal',
    url: 'https://www.researchgate.net/publication/380561981',
    verify: true,
  },
  {
    title: 'Optimalisasi Peningkatan Teknologi dalam Pengembangan Notifikasi SIAKAD Berbasis Mobile di Sekolah Balikpapan',
    venue: 'Dharmakarya: Jurnal Aplikasi Ipteks untuk Masyarakat, Vol. 10 No. 4',
    year: '2021',
    type: 'community',
    indexing: 'SINTA 3',
    url: 'https://doi.org/10.24198/dharmakarya.v10i4.34869',
  },
  {
    title: 'Pengembangan Kampung Warna-warni Teluk Seribu sebagai Destinasi Wisata Smart Tourism',
    venue: 'Prosiding Seminar Nasional Pengabdian kepada Masyarakat',
    year: '2021',
    type: 'community',
    url: '',
    verify: true,
  },
  {
    title: 'Energy Efficiency Optimization for Intermediate Node Selection Using MhSA-LEACH: Multi-hop Simulated Annealing in Wireless Sensor Network',
    venue: 'EMITTER International Journal of Engineering Technology, Vol. 8 No. 1',
    year: '2020',
    type: 'journal',
    url: 'https://emitter.pens.ac.id/index.php/emitter/article/view/459',
  },
  {
    title: 'Efficient Energy for Cluster Head Selection Using New LEACH-Based Routing Protocol in Wireless Sensor Network',
    venue: { en: 'IEEE conference proceedings', id: 'Prosiding konferensi IEEE' },
    year: '2019',
    type: 'conference',
    url: 'https://ieeexplore.ieee.org/author/37087083867',
    verify: true,
  },
];

// Internally funded research (LPPM ITK).
export const researchGrants = [
  {
    title: 'Rancangan dan Implementasi Smart Home System untuk Pengendalian Sakelar Listrik Berbasis IoT',
    funder: 'LPPM Institut Teknologi Kalimantan',
    url: 'https://lppm.itk.ac.id/detail-hasil-penelitan/rancangan-dan-implementasi-smart-home-system-untuk-pengendalian-sakelar-listrik-berbasis-iot',
  },
  {
    title: 'Optimalisasi Pengelolaan Sistem Monitoring Data Energi Listrik pada Smart Home System untuk Saklar Listrik Menggunakan Metode Extreme Programming',
    funder: 'LPPM Institut Teknologi Kalimantan',
    url: 'https://lppm.itk.ac.id/detail-hasil-penelitan/optimalisasi-pengelolaan-sistem-monitoring-data-energi-listrik-pada-smart-home-system-untuk-saklar-listrik-menggunakan-metode-extreme-programming',
  },
];

export const communityService = [
  {
    title: {
      en: 'Mobile SIAKAD notification app for SD Al-Azhar 58 Balikpapan',
      id: 'Aplikasi notifikasi SIAKAD mobile untuk SD Al-Azhar 58 Balikpapan',
    },
    partner: 'SD Al-Azhar 58 Balikpapan',
    year: '2021',
    url: 'https://lppm.itk.ac.id/detail-berita/pengabdian-kepada-masyarakat-optimalisasi-peningkatan-teknologi-dalam-pengembangan-siakad-berbasis-mobile-di-sekolah-balikpapan',
  },
  {
    title: {
      en: 'Smart-tourism development for Kampung Warna-warni Teluk Seribu',
      id: 'Pengembangan smart tourism Kampung Warna-warni Teluk Seribu',
    },
    partner: 'Teluk Seribu, Balikpapan',
    year: '2021',
    url: '',
  },
];

export const teaching = [
  { en: 'Cloud Computing', id: 'Komputasi Awan' },
  { en: 'Web Programming', id: 'Pemrograman Web' },
  { en: 'Database Systems', id: 'Sistem Basis Data' },
  { en: 'Software Engineering', id: 'Rekayasa Perangkat Lunak' },
];
