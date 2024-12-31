import React, { useState, useEffect, useCallback } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { Link } from 'react-scroll';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { simpleConfig } from "./particlesConfig";
import Typed from 'react-typed';

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

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {}, []);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#F7F7F7]' : 'bg-[#232323]'}`}>
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#2C2C2C]/80 dark:bg-[#E0E0E0]/80 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-[#4CAF50] dark:text-[#FF5722]">ADL</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((section) => (
                <Link
                  key={section}
                  to={section.toLowerCase()}
                  smooth={true}
                  duration={500}
                  className="cursor-pointer text-gray-200 dark:text-gray-800 hover:text-[#4CAF50] dark:hover:text-[#FF5722] transition-colors"
                >
                  {section}
                </Link>
              ))}
              <div className="relative group">
                <button className="hover:text-[#4CAF50] dark:hover:text-[#FF5722] text-gray-200 dark:text-gray-800 transition-colors">
                  Educational Resources
                </button>
                <div className="absolute left-0 mt-2 w-60 rounded-md shadow-lg bg-[#2C2C2C] dark:bg-[#E0E0E0] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform">
                  <div className="rounded-md ring-1 ring-black ring-opacity-5 py-1">
                    <a
                      href="https://aidilsaputrakirsan.github.io/Pengajaran-Materi-Teori"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-sm text-gray-200 dark:text-gray-800 hover:bg-[#4CAF50] dark:hover:bg-[#FF5722]"
                    >
                      Theory
                    </a>
                    <a
                      href="https://github.com/aidilsaputrakirsan/Pengajaran-Modul-Praktikum"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-sm text-gray-200 dark:text-gray-800 hover:bg-[#4CAF50] dark:hover:bg-[#FF5722]"
                    >
                      Practicals <span className="text-gray-400 text-xs">(Members Only)</span>
                    </a>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-sm text-gray-200 dark:text-gray-800 hover:bg-[#4CAF50] dark:hover:bg-[#FF5722]"
                    >
                      Assignments
                    </a>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-sm text-gray-200 dark:text-gray-800 hover:bg-[#4CAF50] dark:hover:bg-[#FF5722]"
                    >
                      Quizzes
                    </a>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-sm text-gray-200 dark:text-gray-800 hover:bg-[#4CAF50] dark:hover:bg-[#FF5722]"
                    >
                      Examinations
                    </a>
                  </div>
                </div>
              </div>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-gray-600" />
                ) : (
                  <Moon className="w-5 h-5 text-yellow-400" />
                )}
              </button>
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-gray-200 dark:text-gray-800" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-200 dark:text-gray-800" />
                )}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-[#232323] dark:bg-[#F7F7F7] shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((section) => (
                <Link
                  key={section}
                  to={section.toLowerCase()}
                  smooth={true}
                  duration={500}
                  className="block px-3 py-2 rounded-md text-gray-200 dark:text-gray-800 hover:bg-gray-700 dark:hover:bg-gray-200 cursor-pointer"
                >
                  {section}
                </Link>
              ))}
              <div className="block px-3 py-2 rounded-md text-gray-200 dark:text-gray-800">
                Educational Resources
                <div className="ml-4">
                  {[
                    { name: "Theory", href: "https://aidilsaputrakirsan.github.io/Pengajaran-Materi-Teori" },
                    { name: "Practicals", href: "https://github.com/aidilsaputrakirsan/Pengajaran-Modul-Praktikum" },
                    { name: "Assignments", href: "#" },
                    { name: "Quizzes", href: "#" },
                    { name: "Examinations", href: "#" },
                  ].map((resource, idx) => (
                    <a
                      key={idx}
                      href={resource.href}
                      className="block text-sm hover:text-[#4CAF50] dark:hover:text-[#FF5722]"
                    >
                      {resource.name}
                    </a>
                  ))}
                </div>
              </div>
              <button
                onClick={toggleDarkMode}
                className="flex items-center justify-center p-2 rounded-full bg-gray-700 dark:bg-gray-200 text-gray-200 dark:text-gray-800 hover:bg-gray-600 dark:hover:bg-gray-300 transition-colors"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-gray-600" />
                ) : (
                  <Moon className="w-5 h-5 text-yellow-400" />
                )}
              </button>
            </div>
          </div>
        )}
      </nav>

      <div className="pt-16 relative">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={simpleConfig(darkMode)} // Kirimkan nilai `darkMode` ke konfigurasi partikel
        className="absolute top-0 left-0 w-full h-full z-0"
      />
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-[#4CAF50] dark:text-[#FF5722] sm:text-5xl md:text-6xl">
                <Typed
                  strings={["Aidil Saputra Kirsan", "Full Stack Developer"]}
                  typeSpeed={80}
                  backSpeed={60}
                  loop
                />
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-300 dark:text-gray-700 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Fast-learner, willing to learn, hard-worker, honest, discipline, responsible, and adapt quickly.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <Link
                    to="contact"
                    smooth={true}
                    duration={500}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-[#4CAF50] bg-white hover:bg-gray-100 dark:text-[#FF5722] dark:bg-[#2C2C2C] dark:hover:bg-[#383838] md:py-4 md:text-lg md:px-10 transition-colors cursor-pointer"
                  >
                    Contact Me
                  </Link>
                </div>
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  <Link
                    to="projects"
                    smooth={true}
                    duration={500}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-[#4CAF50] bg-white hover:bg-gray-100 dark:text-[#FF5722] dark:bg-[#2C2C2C] dark:hover:bg-[#383838] md:py-4 md:text-lg md:px-10 transition-colors cursor-pointer"
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
