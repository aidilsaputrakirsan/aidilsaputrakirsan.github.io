import { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaGraduationCap } from 'react-icons/fa';

const navLinks = [
  { title: 'Home', href: '#hero' },
  { title: 'About', href: '#about' },
  { title: 'Skills', href: '#skills' },
  { title: 'Experience', href: '#experience' },
  { title: 'Projects', href: '#projects' },
  { title: 'Resources', href: '#educational-resources', icon: <FaGraduationCap /> },
  { title: 'Contact', href: '#contact' },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle active link based on scroll position
  const [activeLink, setActiveLink] = useState('hero');
  
  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveLink(sectionId);
        }
      });
    };
    
    window.addEventListener('scroll', handleScrollSpy);
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-bgSecondary/90 backdrop-blur-sm py-3 shadow-lg' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold">
          <span className="text-gradient">ADL</span>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.title}>
                <a 
                  href={link.href} 
                  className={`hover:text-accentPrimary transition-colors flex items-center ${
                    activeLink === link.href.slice(1) ? 'text-accentPrimary font-medium' : 'text-textSecondary'
                  }`}
                >
                  {link.icon && <span className="mr-1">{link.icon}</span>}
                  {link.title}
                  {link.title === 'Resources' && (
                    <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-accentPrimary/20 text-accentPrimary">New</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu */}
        <div className={`fixed top-0 right-0 h-full w-64 bg-bgSecondary shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}>
          <div className="p-6">
            <div className="flex justify-end">
              <button 
                onClick={() => setIsOpen(false)}
                className="text-2xl focus:outline-none"
              >
                <FaTimes />
              </button>
            </div>
            <ul className="mt-8 space-y-6">
              {navLinks.map((link) => (
                <li key={link.title}>
                  <a 
                    href={link.href} 
                    className={`block text-lg hover:text-accentPrimary transition-colors flex items-center ${
                      activeLink === link.href.slice(1) ? 'text-accentPrimary font-medium' : 'text-textSecondary'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.icon && <span className="mr-2">{link.icon}</span>}
                    {link.title}
                    {link.title === 'Resources' && (
                      <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-accentPrimary/20 text-accentPrimary">New</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;