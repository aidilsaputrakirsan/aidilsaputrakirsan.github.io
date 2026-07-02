/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon, FiCoffee } from 'react-icons/fi';

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
  const [active, setActive] = useState('');
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  // Top scroll-progress bar
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: highlight the section currently in the middle of the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );
    ['hero', ...links.map(([, href]) => href.slice(1))].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
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

          <div className="flex items-center gap-1">
            <ul className="hidden md:flex items-center gap-1">
            {links.map(([label, href]) => {
              const on = active === href.slice(1);
              return (
                <li key={href}>
                  <a
                    href={href}
                    aria-current={on ? 'true' : undefined}
                    className={`relative rounded-full px-4 py-2 font-body text-sm font-medium transition-colors ${
                      on ? 'text-warmInk' : 'text-warmMuted hover:text-warmInk'
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="navPill"
                        className="absolute inset-0 rounded-full bg-warmPeachSoft"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </a>
                </li>
              );
            })}
            <li>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-cv'))}
                className="ml-2 rounded-full bg-warmInk px-5 py-2 font-body text-sm font-semibold text-warmBg transition-transform hover:-translate-y-0.5"
              >
                Download CV
              </button>
            </li>
            </ul>

            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-support'))}
              aria-label="Buy me a coffee"
              title="Buy me a coffee"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-lg text-warmMuted transition-colors hover:bg-warmPeachSoft hover:text-warmPeach"
            >
              <FiCoffee />
            </button>

            <button
              onClick={toggleTheme}
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full text-lg text-warmMuted transition-colors hover:bg-warmPeachSoft hover:text-warmPeach md:ml-1"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={dark ? 'sun' : 'moon'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex"
                >
                  {dark ? <FiSun /> : <FiMoon />}
                </motion.span>
              </AnimatePresence>
            </button>

            <button className="md:hidden text-2xl text-warmInk p-2" onClick={() => setOpen((v) => !v)} aria-label="Menu">
              {open ? <FiX /> : <FiMenu />}
            </button>
          </div>
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
                    className={`block px-6 py-4 font-body font-medium border-b border-warmLine/60 ${
                      active === href.slice(1) ? 'text-warmPeach' : 'text-warmInk'
                    }`}
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    setOpen(false);
                    window.dispatchEvent(new CustomEvent('open-cv'));
                  }}
                  className="block w-full px-6 py-4 text-left font-body font-semibold text-warmPeach"
                >
                  Download CV ↗
                </button>
              </li>
              <li>
                <button
                  onClick={toggleTheme}
                  className="flex w-full items-center gap-2 px-6 py-4 text-left font-body font-semibold text-warmInk"
                >
                  {dark ? <FiSun /> : <FiMoon />} {dark ? 'Light mode' : 'Dark mode'}
                </button>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}

export default NavbarSoft;
