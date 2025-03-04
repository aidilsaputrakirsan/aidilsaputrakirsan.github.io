import { useState } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaMapMarkerAlt, FaPhone, FaArrowUp, FaGraduationCap } from 'react-icons/fa';

function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const currentYear = new Date().getFullYear();
  
  // Show/hide scroll to top button based on scroll position
  useState(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Menu links for footer (similar to navbar)
  const footerLinks = [
    { title: 'Home', href: '#hero' },
    { title: 'About', href: '#about' },
    { title: 'Skills', href: '#skills' },
    { title: 'Experience', href: '#experience' },
    { title: 'Projects', href: '#projects' },
    { title: 'Resources', href: '#educational-resources' },
    { title: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-bgPrimary pt-16 pb-8 border-t border-bgSecondary/50">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-gradient">Aidil Saputra Kirsan</span>
            </h3>
            <p className="text-textSecondary mb-4">
              Information System Lecturer & Full Stack Developer passionate about creating digital experiences and sharing knowledge with the next generation.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/aidilsaputrakirsan3" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-textSecondary hover:text-accentPrimary transition-colors text-xl"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a 
                href="https://linkedin.com/in/aidilsaputrakirsan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-textSecondary hover:text-accentPrimary transition-colors text-xl"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a 
                href="https://twitter.com/aidilsaputrakirsan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-textSecondary hover:text-accentPrimary transition-colors text-xl"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-textPrimary">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.title}>
                  <a 
                    href={link.href} 
                    className="text-textSecondary hover:text-accentPrimary transition-colors flex items-center"
                  >
                    <span className="mr-2">›</span>
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Educational Resources */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-textPrimary flex items-center">
              <FaGraduationCap className="mr-2" />Educational
            </h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://aidilsaputrakirsan.github.io/Pengajaran-Presentasi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-textSecondary hover:text-accentPrimary transition-colors flex items-center"
                >
                  <span className="mr-2">›</span>
                  Theory Materials
                </a>
              </li>
              <li>
                <a 
                  href="https://praktikum.mystadl.my.id/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-textSecondary hover:text-accentPrimary transition-colors flex items-center"
                >
                  <span className="mr-2">›</span>
                  Practicals
                </a>
              </li>
              <li>
                <a 
                  href="https://aidilsaputrakirsan.github.io/Pengajaran-Tugas" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-textSecondary hover:text-accentPrimary transition-colors flex items-center"
                >
                  <span className="mr-2">›</span>
                  Assignments
                </a>
              </li>
              <li>
                <a 
                  href="https://aidilsaputrakirsan.github.io/LiveGrades/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-textSecondary hover:text-accentPrimary transition-colors flex items-center"
                >
                  <span className="mr-2">›</span>
                  Live Grades
                </a>
              </li>
              <li>
                <a 
                  href="https://aidilsaputrakirsan.github.io/Attendance/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-textSecondary hover:text-accentPrimary transition-colors flex items-center"
                >
                  <span className="mr-2">›</span>
                  Attendance
                </a>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-textPrimary">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaEnvelope className="text-accentPrimary mt-1 mr-3" />
                <a 
                  href="mailto:aidil@lecturer.itk.ac.id" 
                  className="text-textSecondary hover:text-accentPrimary transition-colors"
                >
                  aidil@lecturer.itk.ac.id
                </a>
              </li>
              <li className="flex items-start">
                <FaPhone className="text-accentPrimary mt-1 mr-3" />
                <a 
                  href="tel:+6281234567890" 
                  className="text-textSecondary hover:text-accentPrimary transition-colors"
                >
                  +62 812 3456 7890
                </a>
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-accentPrimary mt-1 mr-3" />
                <span className="text-textSecondary">
                  Balikpapan, Indonesia
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-bgSecondary/30 pt-8 mb-6"></div>
        
        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-textSecondary text-sm mb-4 md:mb-0">
            &copy; {currentYear} Aidil Saputra Kirsan. All rights reserved.
          </p>
          
          <div className="text-textSecondary text-sm flex flex-wrap justify-center gap-4">
            <a href="#" className="hover:text-accentPrimary transition-colors">Privacy Policy</a>
            <span className="hidden md:inline">•</span>
            <a href="#" className="hover:text-accentPrimary transition-colors">Terms of Service</a>
            <span className="hidden md:inline">•</span>
            <a href="#" className="hover:text-accentPrimary transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
      
      {/* Scroll to Top Button */}
      <button
        className={`fixed right-6 bottom-6 p-3 rounded-full bg-accentPrimary text-white shadow-lg transition-all duration-300 ${
          showScrollTop ? 'opacity-70 hover:opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </button>
    </footer>
  );
}

export default Footer;