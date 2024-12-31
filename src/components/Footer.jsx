import React, { useState, useEffect } from 'react';
import { ArrowUp, Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#232323] dark:bg-[#F7F7F7] text-[#A9A9A9] dark:text-[#757575] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-[#E0E0E0] dark:text-[#212121] mb-4">Aidil Saputra Kirsan</h3>
            <p className="mb-4 text-[#A9A9A9] dark:text-[#757575]">
              Lecturer at Institut Teknologi Kalimantan (ITK) with expertise in Information Systems 
              and Full Stack Development.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/aidilsaputrakirsan"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#4CAF50] dark:hover:text-[#FF5722] transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com/in/aidilsaputrakirsan"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#4CAF50] dark:hover:text-[#FF5722] transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#E0E0E0] dark:text-[#212121] mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-[#4CAF50] dark:hover:text-[#FF5722] transition-colors">About</a>
              </li>
              <li>
                <a href="#skills" className="hover:text-[#4CAF50] dark:hover:text-[#FF5722] transition-colors">Skills</a>
              </li>
              <li>
                <a href="#experience" className="hover:text-[#4CAF50] dark:hover:text-[#FF5722] transition-colors">Experience</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[#4CAF50] dark:hover:text-[#FF5722] transition-colors">Projects</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#4CAF50] dark:hover:text-[#FF5722] transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#E0E0E0] dark:text-[#212121] mb-4">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#4CAF50] dark:text-[#FF5722]" />
                <a
                  href="mailto:aidil@lecturer.itk.ac.id"
                  className="hover:text-[#4CAF50] dark:hover:text-[#FF5722] transition-colors"
                >
                  aidil@lecturer.itk.ac.id
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#4CAF50] dark:text-[#FF5722]" />
                <a
                  href="tel:+6285398952880"
                  className="hover:text-[#4CAF50] dark:hover:text-[#FF5722] transition-colors"
                >
                  +62 853 9895 xxxx
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#4CAF50] dark:text-[#FF5722]" />
                <span>
                  Sepinggan Baru, Balikpapan Selatan
                  <br />
                  Balikpapan, Indonesia
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[#2C2C2C] dark:border-[#E0E0E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-[#A9A9A9] dark:text-[#757575]">
              © {currentYear} Aidil Saputra Kirsan. All rights reserved.
            </p>
            <p className="text-sm text-[#A9A9A9] dark:text-[#757575] mt-2 md:mt-0">
              Lecturer at Institut Teknologi Kalimantan
            </p>
          </div>
        </div>
      </div>

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-[#4CAF50] dark:bg-[#FF5722] text-[#E0E0E0] dark:text-[#212121] rounded-full shadow-lg hover:bg-[#388E3C] dark:hover:bg-[#E64A19] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4CAF50]"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </footer>
  );
};

export default Footer;
