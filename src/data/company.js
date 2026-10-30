// File: data/company.js
// Identitas legal perusahaan yang menaungi merek "Myst Tech".
// Merek tetap "Myst Tech"; nama PT dipakai di konteks legal (footer, kontak,
// data terstruktur SEO di index.html, CV).
// Isi `nib`, `ahu`, `address` bila sudah siap — field kosong tidak ditampilkan.
// Data legal yang ikut di index.html (JSON-LD) perlu disamakan manual.

export const company = {
  brand: 'Myst Tech',
  legalName: 'PT Myst Tech Core',
  nib: '3010260058882', // Nomor Induk Berusaha (OSS)
  ahu: '', // Nomor SK pengesahan Kemenkumham, mis. 'AHU-0012345.AH.01.01.Tahun 2026'
  address: '', // alamat kantor / domisili usaha
  city: 'Balikpapan, Kalimantan Timur, Indonesia',
};

// Baris registrasi untuk footer/kontak, mis. "NIB 123… · AHU-…" (kosong bila belum diisi)
export const registrationLine = () =>
  [company.nib && `NIB ${company.nib}`, company.ahu && company.ahu].filter(Boolean).join(' · ');
