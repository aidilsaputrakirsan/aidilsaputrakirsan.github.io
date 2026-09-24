// File: data/experience.js
// Hanya berisi data, tidak ada JSX
// Urutan: peran yang masih berjalan dulu (dari yang paling lama dijalani,
// 2020 → 2025), lalu peran yang sudah berakhir di paling bawah.
// Teks dua bahasa: { en, id }. `period` tetap pakai "Present" (dipakai
// currentRoles() di site.js) — UI yang menerjemahkannya jadi "Sekarang".

export const experienceData = [
    {
      title: { en: "Information System Lecturer", id: "Dosen Sistem Informasi" },
      shortTitle: { en: "Information System Lecturer", id: "Dosen Sistem Informasi" },
      shortCompany: "ITK · Balikpapan 🇮🇩",
      company: "Institut Teknologi Kalimantan",
      period: "2020 - Present",
      description: {
        en: "Teaching Cloud Computing, Web Programming, Database Systems, and Software Engineering in the Information Systems program. Supervise student theses and mentor competition teams — including the hackathon-category winners of the Kideco Innovation Challenge 2026 (Kalimantan region). Research in IoT, wireless sensor networks, and applied AI.",
        id: "Mengampu Komputasi Awan, Pemrograman Web, Sistem Basis Data, dan Rekayasa Perangkat Lunak di program studi Sistem Informasi. Membimbing skripsi mahasiswa dan tim kompetisi — termasuk juara kategori hackathon Kideco Innovation Challenge 2026 (regional Kalimantan). Riset di bidang IoT, jaringan sensor nirkabel, dan AI terapan.",
      },
    },
    {
      title: { en: "Founder & AI Product Engineer", id: "Founder & AI Product Engineer" },
      shortTitle: { en: "Founder & AI Product Engineer", id: "Founder & AI Product Engineer" },
      shortCompany: "Myst Tech · Balikpapan 🇮🇩",
      company: "Myst Tech",
      period: "2021 - Present",
      description: {
        en: "Founded Myst Tech and build its AI products for Indonesian education and communities — GuruPintar (teachers), SkripsiPintar (students), Asdos-AI (lecturers), and Sistem Manajemen RT. Designed Myst-Core, the private AI layer every product calls: an LLM gateway with tier-based model routing and fallback chains, a prompt registry, streaming and structured JSON output, vision/OCR for handwritten work, usage metering, and an offline sandbox. Built end to end with Laravel, Livewire, and MySQL.",
        id: "Mendirikan Myst Tech dan membangun produk-produk AI-nya untuk pendidikan dan komunitas Indonesia — GuruPintar (guru), SkripsiPintar (mahasiswa), Asdos-AI (dosen), dan Sistem Manajemen RT. Merancang Myst-Core, lapisan AI privat yang dipanggil setiap produk: gateway LLM dengan perutean model berbasis tier dan rantai fallback, prompt registry, output streaming dan JSON terstruktur, vision/OCR untuk tulisan tangan, metering pemakaian, dan sandbox offline. Dibangun end to end dengan Laravel, Livewire, dan MySQL.",
      },
    },
    {
      title: { en: "Head of Digital Innovation Laboratory", id: "Kepala Laboratorium Inovasi Digital" },
      shortTitle: { en: "Digital Innovation Lab Head", id: "Kepala Lab Inovasi Digital" },
      shortCompany: "FSTI ITK · Balikpapan 🇮🇩",
      company: "Faculty of Science and Information Technology (FSTI), Institut Teknologi Kalimantan",
      period: "2024 - Present",
      description: {
        en: "Lead the faculty's Digital Innovation Laboratory — setting its research and development direction, coordinating lab-based projects and student involvement, and driving collaboration on digital innovation initiatives across the faculty.",
        id: "Memimpin Laboratorium Inovasi Digital fakultas — menetapkan arah riset dan pengembangan, mengoordinasikan proyek berbasis lab dan keterlibatan mahasiswa, serta mendorong kolaborasi inisiatif inovasi digital di lingkungan fakultas.",
      },
    },
    {
      title: { en: "Community Leadership — Head of Neighborhood Unit (Rukun Tetangga)", id: "Kepemimpinan Komunitas — Ketua Rukun Tetangga (RT)" },
      shortTitle: { en: "Neighborhood Unit (RT) Head", id: "Ketua RT" },
      shortCompany: "Balikpapan 🇮🇩",
      company: "Rukun Tetangga (RT), Balikpapan",
      period: "2025 - Present",
      description: {
        en: "Lead the local neighborhood unit, coordinating residents, managing community administration, and organizing public-service initiatives. Foster civic engagement, local governance, and grassroots collaboration within the community.",
        id: "Memimpin RT setempat — mengoordinasikan warga, mengelola administrasi lingkungan, dan menyelenggarakan kegiatan layanan publik. Mendorong partisipasi warga, tata kelola lokal, dan kolaborasi akar rumput.",
      },
    },
    {
      title: { en: "IT Consultant", id: "Konsultan TI" },
      company: "IT Center PNUP",
      period: "2017 - 2018",
      description: {
        en: "Provided IT consulting services for small to medium businesses. Analyzed business requirements and designed appropriate software solutions to improve business processes.",
        id: "Memberikan layanan konsultasi TI untuk usaha kecil dan menengah. Menganalisis kebutuhan bisnis dan merancang solusi perangkat lunak yang tepat untuk memperbaiki proses bisnis.",
      },
    },
  ];
