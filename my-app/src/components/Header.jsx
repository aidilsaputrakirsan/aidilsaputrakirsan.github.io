import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <h1 className="text-3xl font-extrabold tracking-wide">Aidil Saputra Kirsan</h1>
        <nav className="space-x-8">
          <a href="https://aidilsaputrakirsan.github.io/Pengajaran-Materi-Teori" className="hover:text-yellow-300 transition-all duration-300 ease-in-out text-lg font-semibold" title="Materi Teori">Pengajaran Materi Teori</a>
          <a href="https://aidilsaputrakirsan.github.io/Pengajaran-Tugas-Pemeriksaan" className="hover:text-yellow-300 transition-all duration-300 ease-in-out text-lg font-semibold" title="Tugas Pemeriksaan">Pengajaran Tugas Pemeriksaan</a>
          <a href="https://github.com/aidilsaputrakirsan/Pengajaran-Modul-Praktikum" className="hover:text-yellow-300 transition-all duration-300 ease-in-out text-lg font-semibold" title="Modul Praktikum">Pengajaran Modul Praktikum</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;