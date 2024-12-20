import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <h1 className="text-2xl font-bold">Aidil Saputra Kirsan</h1>
        <nav className="space-x-4">
          <a href="https://aidilsaputrakirsan.github.io/Pengajaran-Materi-Theory" className="hover:underline" title="Materi Teori">Pengajaran Materi Teori</a>
          <a href="https://aidilsaputrakirsan.github.io/Pengajaran-Tugas-Pemeriksaan" className="hover:underline" title="Tugas Pemeriksaan">Pengajaran Tugas Pemeriksaan</a>
          <a href="https://github.com/aidilsaputrakirsan/Pengajaran-Modul-Praktikum" className="hover:underline" title="Modul Praktikum">Pengajaran Modul Praktikum</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;