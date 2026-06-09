/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const links = [
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Background', '#experience'],
  ['Work', '#projects'],
  ['Contact', '#contact'],
];

function NavbarSoft() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Top scroll-progress bar
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.div style={{ scaleX: progress, originX: 0 }} className="fixed top-0 left-0 right-0 z-[60] h-1 bg-warmPeach" />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-warmBg/80 backdrop-blur border-b border-warmLine shadow-soft' : 'bg-transparent'
        }`}
      >
        <nav className="container mx-auto flex items-center justify-between px-6 py-4 max-w-[1200px]">
          <a href="#hero" className="font-display text-xl font-extrabold tracking-tight text-warmInk">
            Aidil<span className="text-warmPeach">.</span>
          </a>

          <ul className="hidden md:flex items-center gap-1">
            {links.map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  className="relative rounded-full px-4 py-2 font-body text-sm font-medium text-warmMuted transition-colors hover:text-warmInk"
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/cv-AidilSaputraKirsan.pdf"
                target="_blank"
                className="ml-2 rounded-full bg-warmInk px-5 py-2 font-body text-sm font-semibold text-warmBg transition-transform hover:-translate-y-0.5"
              >
                Download CV
              </a>
            </li>
          </ul>

          <button className="md:hidden text-2xl text-warmInk" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            {open ? <FiX /> : <FiMenu />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-warmLine bg-warmBg/95 backdrop-blur"
            >
              {links.map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={() => setOpen(false)}
                    className="block px-6 py-4 font-body font-medium text-warmInk border-b border-warmLine/60"
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <a href="/cv-AidilSaputraKirsan.pdf" target="_blank" className="block px-6 py-4 font-body font-semibold text-warmPeach">
                  Download CV ↗
                </a>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}

export default NavbarSoft;
