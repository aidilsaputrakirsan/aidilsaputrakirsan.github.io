// File: data/products.js
// Aplikasi Myst Tech — sumber data untuk halaman utama myst-tech.com
// (peluncur aplikasi + orbit 3D), strip produk di halaman profil, dan CV.
//
// Tambah aplikasi baru = tambah satu entri di sini. Urutan array = urutan tampil.
//
// Field:
//   id            slug unik (huruf kecil, tanpa spasi)
//   title         nama aplikasi
//   tagline       satu baris singkat (Bahasa Indonesia)
//   pitch         1–2 kalimat untuk kartu peluncur (Bahasa Indonesia)
//   description   versi Inggris untuk halaman profil/CV
//   audience      id dari `audiences` di bawah (dipakai filter)
//   audienceLabel label target pengguna yang tampil di kartu
//   features      3–4 poin fitur utama (pendek)
//   url           alamat publik aplikasi — kosongkan ('') jika belum rilis
//   poster        poster di public/images/projects/ — null jika belum ada
//   color         warna merek aplikasi (hex) — dipakai kartu & orbit 3D
//   icon          kunci ikon, lihat src/components/hub/productIcons.js
//   status        'live' | 'building'
//   poweredByCore true jika fitur AI-nya lewat Myst-Core (muncul "sinar" di orbit 3D)
//   ai            true jika aplikasi berbasis AI (dihitung di kartu "AI Products")
//   year          tahun aktif — tahun berjalan = "currently working on"
//   technologies  untuk CV & halaman profil

export const audiences = [
  { id: 'all', name: 'Semua' },
  { id: 'guru', name: 'Guru' },
  { id: 'dosen', name: 'Dosen' },
  { id: 'mahasiswa', name: 'Mahasiswa' },
  { id: 'komunitas', name: 'Komunitas' },
  { id: 'pribadi', name: 'Pribadi' },
];

export const productsData = [
  {
    id: 'gurupintar',
    title: 'GuruPintar',
    tagline: 'Asisten manajemen guru',
    pitch: 'Nilai harian tiap minggu otomatis jadi deskripsi rapor Kurikulum Merdeka di akhir semester.',
    description:
      "An AI teaching assistant for SMP/SMA teachers built around Kurikulum Merdeka — weekly daily grades turn themselves into report-card descriptions at the end of the semester. Grades answers against the teacher's own rubric, reads handwritten answer sheets from a photo, tracks learning-objective (TP) attainment, and flags students at risk early.",
    audience: 'guru',
    audienceLabel: 'Guru SMP/SMA',
    features: [
      'Koreksi jawaban sesuai rubrik Anda',
      'Jawaban tulis tangan dibaca AI dari foto',
      'Pantau ketercapaian TP tiap siswa',
      'Bank soal, kisi-kisi & ekspor Excel',
    ],
    url: 'https://guru.myst-tech.com/',
    poster: '/images/projects/poster-gurupintar.jpeg',
    color: '#5046E5',
    icon: 'book',
    status: 'live',
    poweredByCore: true,
    ai: true,
    year: '2026',
    technologies: ['Laravel', 'Livewire', 'MySQL', 'Myst-Core (LLM)', 'Vision/OCR'],
  },
  {
    id: 'skripsipintar',
    title: 'SkripsiPintar',
    tagline: 'Pendamping skripsi & simulasi sidang',
    pitch: 'AI yang tidak akan menuliskan skripsimu — tapi membuatmu siap mempertahankannya di hari sidang.',
    description:
      'A thesis companion and defense simulator for S1/S2 students — an AI that deliberately will not write the thesis for you, but gets you ready to defend it. Runs mock defenses with an AI examiner, reviews sub-chapters with a readiness score, reads supervisor notes from a photo, and detects ghost citations.',
    audience: 'mahasiswa',
    audienceLabel: 'Mahasiswa S1/S2',
    features: [
      'Simulasi sidang: penguji AI serang titik lemah',
      'Tinjauan per sub-bab dengan skor kesiapan',
      'Deteksi sitasi hantu & referensi mencurigakan',
      'Cek konsistensi lintas bab',
    ],
    url: 'https://skripsi.myst-tech.com/',
    poster: '/images/projects/poster-skripsipintar.jpeg',
    color: '#0F9488',
    icon: 'file-search',
    status: 'live',
    poweredByCore: true,
    ai: true,
    year: '2026',
    technologies: ['Laravel', 'Livewire', 'MySQL', 'Myst-Core (LLM)', 'Vision/OCR'],
  },
  {
    id: 'asdos-ai',
    title: 'Asdos-AI',
    tagline: 'Asisten manajemen kelas untuk dosen',
    pitch: 'Koreksi tugas mingguan sesuai rubrik dosen, peta miskonsepsi kelas, dan deteksi dini mahasiswa yang butuh perhatian.',
    description:
      "An AI teaching-assistant platform for lecturers — grades weekly student answers against the lecturer's own rubric with personalised feedback, transcribes handwritten answer sheets, surfaces class-weakness insights and at-risk student alerts, and generates targeted remedial questions. AI recommends, the lecturer decides.",
    audience: 'dosen',
    audienceLabel: 'Dosen & asisten dosen',
    features: [
      'Koreksi otomatis sesuai rubrik Anda',
      'Wawasan mingguan: peta miskonsepsi kelas',
      'Draf pesan WhatsApp & soal remedial',
      'Ekspor rekap nilai ke Excel',
    ],
    url: 'https://asdos.myst-tech.com/',
    poster: '/images/projects/poster-asdosai.jpg',
    color: '#3B82F6',
    icon: 'graduation',
    status: 'live',
    poweredByCore: true,
    ai: true,
    year: '2026',
    technologies: ['Laravel', 'Livewire', 'MySQL', 'Myst-Core (LLM)', 'Vision/OCR'],
  },
  {
    id: 'manajemen-rt',
    title: 'Sistem Manajemen RT',
    tagline: 'Solusi digital untuk RT Indonesia',
    pitch: 'Surat pengantar, data warga, iuran, dan laporan bulanan RT — rapi dalam satu aplikasi, lengkap dengan mode demo.',
    description:
      'A multi-tenant SaaS platform that digitizes Indonesian neighborhood (RT) administration — automated resident letters with tidy numbering, resident & demographic records, dues collection, and auto-generated monthly reports, with role-based access for administrators and residents.',
    audience: 'komunitas',
    audienceLabel: 'Pengurus RT & warga',
    features: [
      'Surat pengantar & nomor surat otomatis',
      'Data & demografi warga lengkap',
      'Kelola iuran warga lebih rapi',
      'Laporan bulanan otomatis',
    ],
    url: 'https://rt.myst-tech.com/',
    poster: '/images/projects/poster-rt.jpeg',
    color: '#5FA32E',
    icon: 'house',
    status: 'live',
    poweredByCore: false,
    ai: false,
    year: '2026',
    technologies: ['Laravel', 'Inertia.js', 'Vue.js', 'Tailwind CSS', 'MySQL'],
  },
  {
    id: 'jarvis-myst',
    title: 'Jarvis Myst',
    tagline: 'Asisten AI pribadi',
    pitch: 'Asisten AI pribadi untuk ekosistem Myst. Detail akan dibagikan menjelang peluncuran.',
    description:
      'A personal AI assistant platform for the Myst ecosystem, currently in active development. Details will be published as the product approaches launch.',
    audience: 'pribadi',
    audienceLabel: 'Pengguna umum',
    features: [],
    url: '',
    poster: null,
    color: '#D97706',
    icon: 'bot',
    status: 'building',
    poweredByCore: true,
    ai: true,
    year: '2026',
    technologies: ['AI', 'Automation'],
  },
];

export const liveProducts = () => productsData.filter((p) => p.status === 'live');
export const buildingProducts = () => productsData.filter((p) => p.status === 'building');

// Myst-Core — lapisan AI privat yang dipakai aplikasi di atas.
// Isi diambil dari README repo aidilsaputrakirsan/myst-core. Nama model &
// alamat mesin sengaja TIDAK dicantumkan (sesuai kebijakan Myst-Core).
export const mystCore = {
  docsUrl: 'https://myst-tech.com/myst-core/',
  tiers: [
    { id: 'core-text', label: 'Teks', desc: 'koreksi, umpan balik, tinjauan naskah' },
    { id: 'core-vision', label: 'Visi', desc: 'membaca tulisan tangan dari foto' },
    { id: 'core-light', label: 'Ringan', desc: 'tugas cepat & hemat' },
  ],
  capabilities: ['Gateway tunggal', 'Rantai fallback', 'Prompt registry', 'Output JSON terstruktur', 'Streaming', 'Metering pemakaian', 'Mode sandbox'],
};
