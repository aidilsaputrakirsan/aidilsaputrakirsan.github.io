// File: data/products.js
// Aplikasi Myst Tech — sumber data untuk halaman utama myst-tech.com
// (peluncur aplikasi + orbit 3D), strip produk di halaman profil, dan CV.
//
// Tambah aplikasi baru = tambah satu entri di sini. Urutan array = urutan tampil.
// Teks dua bahasa ditulis { en: '...', id: '...' } (lihat src/i18n/LangContext.jsx).
//
// Field:
//   id            slug unik (huruf kecil, tanpa spasi)
//   title         nama aplikasi
//   tagline       satu baris singkat            { en, id }
//   pitch         1–2 kalimat untuk kartu        { en, id }
//   description   versi Inggris panjang untuk CV
//   audience      id dari `audiences` di bawah (dipakai filter)
//   audienceLabel label target pengguna          { en, id }
//   features      3–4 poin fitur utama           [{ en, id }, ...]
//   url           alamat publik aplikasi — kosongkan ('') jika belum rilis
//   screenshot    screenshot landing page di public/images/landing/ — jadi
//                 background kartu. null = kartu memakai panel warna + ikon.
//                 Ambil ulang semua: `npm run screenshots` (lihat scripts/).
//   screenshotZoom opsional, mis. 1.5 — perbesar ke tengah jika isi landing page
//                 berupa kolom sempit di tengah (default 1 = selebar kartu).
//   poster        poster di public/images/projects/ — null jika belum ada
//   color         warna merek aplikasi (hex) — dipakai kartu & orbit 3D
//   icon          kunci ikon, lihat src/components/hub/productIcons.js
//   status        'live' | 'building' — live = di orbit 3D terhubung ke core (sinar + bola berjalan)
//   poweredByCore true jika fitur AI-nya lewat Myst-Core (orbit dalam + diagram Myst-Core)
//   ai            true jika aplikasi berbasis AI (dihitung di kartu "AI Products")
//   year          tahun aktif — tahun berjalan = "currently working on"
//   technologies  untuk CV & halaman profil

export const audiences = [
  { id: 'all', name: { en: 'All', id: 'Semua' } },
  { id: 'guru', name: { en: 'Teachers', id: 'Guru' } },
  { id: 'dosen', name: { en: 'Lecturers', id: 'Dosen' } },
  { id: 'mahasiswa', name: { en: 'Students', id: 'Mahasiswa' } },
  { id: 'komunitas', name: { en: 'Communities', id: 'Komunitas' } },
  { id: 'pribadi', name: { en: 'Personal', id: 'Pribadi' } },
];

export const productsData = [
  {
    id: 'gurupintar',
    title: 'GuruPintar',
    tagline: { en: "Teacher's management assistant", id: 'Asisten manajemen guru' },
    pitch: {
      en: "Weekly daily grades turn themselves into Kurikulum Merdeka report-card descriptions at the end of the semester.",
      id: 'Nilai harian tiap minggu otomatis jadi deskripsi rapor Kurikulum Merdeka di akhir semester.',
    },
    description:
      "An AI teaching assistant for SMP/SMA teachers built around Kurikulum Merdeka — weekly daily grades turn themselves into report-card descriptions at the end of the semester. Grades answers against the teacher's own rubric, reads handwritten answer sheets from a photo, tracks learning-objective (TP) attainment, and flags students at risk early.",
    audience: 'guru',
    audienceLabel: { en: 'Junior & senior high teachers', id: 'Guru SMP/SMA' },
    features: [
      { en: 'Grades answers against your own rubric', id: 'Koreksi jawaban sesuai rubrik Anda' },
      { en: 'Reads handwritten answers from a photo', id: 'Jawaban tulis tangan dibaca AI dari foto' },
      { en: "Tracks each student's learning objectives", id: 'Pantau ketercapaian TP tiap siswa' },
      { en: 'Question bank, blueprint & Excel export', id: 'Bank soal, kisi-kisi & ekspor Excel' },
    ],
    url: 'https://guru.myst-tech.com/',
    screenshot: '/images/landing/gurupintar.jpg',
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
    tagline: { en: 'Thesis companion & defense simulator', id: 'Pendamping skripsi & simulasi sidang' },
    pitch: {
      en: "An AI that won't write your thesis for you — but gets you ready to defend it on the big day.",
      id: 'AI yang tidak akan menuliskan skripsimu — tapi membuatmu siap mempertahankannya di hari sidang.',
    },
    description:
      'A thesis companion and defense simulator for S1/S2 students — an AI that deliberately will not write the thesis for you, but gets you ready to defend it. Runs mock defenses with an AI examiner, reviews sub-chapters with a readiness score, reads supervisor notes from a photo, and detects ghost citations.',
    audience: 'mahasiswa',
    audienceLabel: { en: "Bachelor's & master's students", id: 'Mahasiswa S1/S2' },
    features: [
      { en: 'Mock defense: an AI examiner probes weak spots', id: 'Simulasi sidang: penguji AI serang titik lemah' },
      { en: 'Sub-chapter reviews with a readiness score', id: 'Tinjauan per sub-bab dengan skor kesiapan' },
      { en: 'Detects ghost citations & suspicious references', id: 'Deteksi sitasi hantu & referensi mencurigakan' },
      { en: 'Cross-chapter consistency checks', id: 'Cek konsistensi lintas bab' },
    ],
    url: 'https://skripsi.myst-tech.com/',
    screenshot: '/images/landing/skripsipintar.jpg',
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
    tagline: { en: 'Class management assistant for lecturers', id: 'Asisten manajemen kelas untuk dosen' },
    pitch: {
      en: "Grades weekly assignments against the lecturer's rubric, maps class misconceptions, and flags students who need attention early.",
      id: 'Koreksi tugas mingguan sesuai rubrik dosen, peta miskonsepsi kelas, dan deteksi dini mahasiswa yang butuh perhatian.',
    },
    description:
      "An AI teaching-assistant platform for lecturers — grades weekly student answers against the lecturer's own rubric with personalised feedback, transcribes handwritten answer sheets, surfaces class-weakness insights and at-risk student alerts, and generates targeted remedial questions. AI recommends, the lecturer decides.",
    audience: 'dosen',
    audienceLabel: { en: 'Lecturers & teaching assistants', id: 'Dosen & asisten dosen' },
    features: [
      { en: 'Automatic grading against your rubric', id: 'Koreksi otomatis sesuai rubrik Anda' },
      { en: 'Weekly insights: a map of class misconceptions', id: 'Wawasan mingguan: peta miskonsepsi kelas' },
      { en: 'Draft WhatsApp messages & remedial questions', id: 'Draf pesan WhatsApp & soal remedial' },
      { en: 'Grade recaps exported to Excel', id: 'Ekspor rekap nilai ke Excel' },
    ],
    url: 'https://asdos.myst-tech.com/',
    screenshot: '/images/landing/asdos-ai.jpg',
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
    tagline: { en: 'Digital tools for Indonesian neighborhoods (RT)', id: 'Solusi digital untuk RT Indonesia' },
    pitch: {
      en: 'Resident letters, records, dues, and monthly reports for neighborhood units — tidy in one app, with a demo mode.',
      id: 'Surat pengantar, data warga, iuran, dan laporan bulanan RT — rapi dalam satu aplikasi, lengkap dengan mode demo.',
    },
    description:
      'A multi-tenant SaaS platform that digitizes Indonesian neighborhood (RT) administration — automated resident letters with tidy numbering, resident & demographic records, dues collection, and auto-generated monthly reports, with role-based access for administrators and residents.',
    audience: 'komunitas',
    audienceLabel: { en: 'RT officers & residents', id: 'Pengurus RT & warga' },
    features: [
      { en: 'Automatic resident letters & numbering', id: 'Surat pengantar & nomor surat otomatis' },
      { en: 'Complete resident & demographic records', id: 'Data & demografi warga lengkap' },
      { en: 'Tidier dues collection', id: 'Kelola iuran warga lebih rapi' },
      { en: 'Automatic monthly reports', id: 'Laporan bulanan otomatis' },
    ],
    url: 'https://rt.myst-tech.com/',
    screenshot: '/images/landing/manajemen-rt.jpg',
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
    tagline: { en: 'Personal voice assistant', id: 'Asisten suara pribadi' },
    pitch: {
      en: 'Say a command — Jarvis takes reminders, answers questions, and reminds you right on time, in Bahasa Indonesia.',
      id: 'Katakan perintah — Jarvis mencatat pengingat, menjawab pertanyaan, dan mengingatkanmu tepat waktu, dalam Bahasa Indonesia.',
    },
    description:
      'A personal voice assistant in Bahasa Indonesia — speak a command (push-to-talk or "Hey Jarvis") and it takes reminders, understands natural times like "tomorrow at 7", reminds you on time (including via Telegram), and answers questions by voice.',
    audience: 'pribadi',
    audienceLabel: { en: 'Everyone', id: 'Pengguna umum' },
    features: [
      { en: 'Talk directly — hold the mic or say "Hey Jarvis"', id: 'Bicara langsung — tahan mic atau ucapkan "Hey Jarvis"' },
      { en: 'Smart reminders, delivered on time (even to Telegram)', id: 'Pengingat pintar, tepat waktu (bisa ke Telegram)' },
      { en: 'Ask anything, answered by voice', id: 'Tanya apa saja, dijawab dengan suara' },
    ],
    url: '',
    screenshot: '/images/landing/jarvis-myst.jpg',
    screenshotZoom: 1.5, // narrow centred landing page → zoom in
    poster: null,
    color: '#D97706',
    icon: 'bot',
    status: 'building',
    poweredByCore: true,
    ai: true,
    year: '2026',
    technologies: ['Voice AI', 'Myst-Core (LLM)', 'Telegram Bot'],
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
    { id: 'core-text', desc: { en: 'grading, feedback, manuscript review', id: 'koreksi, umpan balik, tinjauan naskah' } },
    { id: 'core-vision', desc: { en: 'reads handwriting from photos', id: 'membaca tulisan tangan dari foto' } },
    { id: 'core-light', desc: { en: 'quick, low-cost tasks', id: 'tugas cepat & hemat' } },
  ],
  capabilities: [
    { en: 'Single gateway', id: 'Gateway tunggal' },
    { en: 'Fallback chains', id: 'Rantai fallback' },
    { en: 'Prompt registry', id: 'Prompt registry' },
    { en: 'Structured JSON output', id: 'Output JSON terstruktur' },
    { en: 'Streaming', id: 'Streaming' },
    { en: 'Usage metering', id: 'Metering pemakaian' },
    { en: 'Sandbox mode', id: 'Mode sandbox' },
  ],
};
