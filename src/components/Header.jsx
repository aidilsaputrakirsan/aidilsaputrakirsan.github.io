// src/components/Header.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { Link } from 'react-scroll';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { simpleConfig } from "./particlesConfig"; // Pastikan konfigurasi ini benar

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Initialize tsparticles
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  // Optional: handle particles loaded
  const particlesLoaded = useCallback(async (container) => {
    // Anda dapat menggunakan container untuk manipulasi partikel jika diperlukan
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Navbar */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg' : 
        'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">ADL</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="about"
                smooth={true}
                duration={500}
                className="cursor-pointer hover:text-blue-600 dark:text-white transition-colors"
              >
                About
              </Link>
              <Link
                to="skills"
                smooth={true}
                duration={500}
                className="cursor-pointer hover:text-blue-600 dark:text-white transition-colors"
              >
                Skills
              </Link>
              <Link
                to="experience"
                smooth={true}
                duration={500}
                className="cursor-pointer hover:text-blue-600 dark:text-white transition-colors"
              >
                Experience
              </Link>
              <Link
                to="projects"
                smooth={true}
                duration={500}
                className="cursor-pointer hover:text-blue-600 dark:text-white transition-colors"
              >
                Projects
              </Link>
              <div className="relative group">
                <button className="hover:text-blue-600 dark:text-white transition-colors">
                  Educational Resources
                </button>
                <div className="absolute left-0 mt-2 w-60 rounded-md shadow-lg bg-white dark:bg-gray-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform">
                  <div className="rounded-md ring-1 ring-black ring-opacity-5 py-1">
                    <a
                      href="https://aidilsaputrakirsan.github.io/Pengajaran-Materi-Teori"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Theory
                    </a>
                    <a
                      href="https://github.com/aidilsaputrakirsan/Pengajaran-Modul-Praktikum"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <span>Practicals</span>
                      <span className="text-gray-400 text-xs"> (Members Only)</span>
                    </a>
                    <a
                      href="https://aidilsaputrakirsan.github.io/Pengajaran-Tugas/Pengumpulan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Assignments
                    </a>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Quizzes
                    </a>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Examinations
                    </a>
                  </div>
                </div>
              </div>
              <Link
                to="contact"
                smooth={true}
                duration={500}
                className="cursor-pointer hover:text-blue-600 dark:text-white transition-colors"
              >
                Contact
              </Link>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {isMenuOpen ? 
                  <X className="w-6 h-6 dark:text-white" /> : 
                  <Menu className="w-6 h-6 dark:text-white" />
                }
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="about"
                smooth={true}
                duration={500}
                className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white cursor-pointer"
              >
                About
              </Link>
              <Link
                to="skills"
                smooth={true}
                duration={500}
                className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white cursor-pointer"
              >
                Skills
              </Link>
              <Link
                to="experience"
                smooth={true}
                duration={500}
                className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white cursor-pointer"
              >
                Experience
              </Link>
              <Link
                to="projects"
                smooth={true}
                duration={500}
                className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white cursor-pointer"
              >
                Projects
              </Link>
              <div className="px-3 py-2">
                <span className="block text-sm font-medium text-gray-400">Educational Resources</span>
                <a 
                  href="https://aidilsaputrakirsan.github.io/Pengajaran-Materi-Teori"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white"
                >
                  Theory
                </a>

                <a 
                  href="https://aidilsaputrakirsan.github.io/Pengajaran-Tugas/Pengumpulan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white"
                >
                  Assignments
                </a>
                <a 
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white"
                >
                  Quizzes
                </a>

                <a 
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white"
                >
                  Examinations
                </a>
                
              </div>
              <Link
                to="contact"
                smooth={true}
                duration={500}
                className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white cursor-pointer"
              >
                Contact
              </Link>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
              </button>
            </div>
          </div>
        )}

      </nav>

      {/* Hero Section */}
      <div className="pt-16 relative">
        {/* Particles Background */}
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={simpleConfig} // Pastikan konfigurasi sederhana ini benar
          className="absolute top-0 left-0 w-full h-full z-0"
        />

        {/* Content Overlay */}
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                <span className="block">Aidil Saputra Kirsan</span>
                <span className="block text-blue-600 dark:text-blue-400">Full Stack Developer</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Fast-learner, willing to learn, hard-worker, honest, discipline, responsible, and adapt quickly.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <Link
                    to="contact"
                    smooth={true}
                    duration={500}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors cursor-pointer"
                  >
                    Contact Me
                  </Link>
                </div>
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  <Link
                    to="projects"
                    smooth={true}
                    duration={500}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-colors cursor-pointer"
                  >
                    View Projects
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
