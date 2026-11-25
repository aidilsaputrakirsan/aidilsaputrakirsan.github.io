/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon, FiCoffee, FiArrowLeft, FiArrowUpRight } from 'react-icons/fi';
import LangToggle from '../ui/LangToggle';
import GooeyNav from '../reactbits/GooeyNav';
import useWarmColor from '../ui/useWarmColor';
import { useLang } from '../../i18n/LangContext';

// Defaults = the profile page (/aidil/). The hub passes its own links/brand/cta.
const defaultLinks = [
  [{ en: 'About', id: 'Tentang' }, '#about'],
  [{ en: 'Skills', id: 'Keahlian' }, '#skills'],
  [{ en: 'Research', id: 'Riset' }, '#research'],
  [{ en: 'Journey', id: 'Perjalanan' }, '#experience'],
  [{ en: 'Work', id: 'Karya' }, '#projects'],
  [{ en: 'Learn', id: 'Belajar' }, '#instagram'],
  [{ en: 'Contact', id: 'Kontak' }, '#contact'],
];

const defaultBrand = (
  <span>
    Aidil<span className="text-warmPeach">.</span>
  </span>
);

const defaultCta = { label: { en: 'Download CV', id: 'Unduh CV' }, onClick: () => window.dispatchEvent(new CustomEvent('open-cv')) };

const defaultLabels = {
  coffee: { en: 'Buy me a coffee', id: 'Traktir kopi' },
  light: { en: 'Light mode', id: 'Mode terang' },
  dark: { en: 'Dark mode', id: 'Mode gelap' },
  menu: 'Menu',
};

// GooeyNav draws on a WebGL canvas — only mount it where the desktop menu is visible.
function useIsDesktop() {
  const query = '(min-width: 768px)';
  const [match, setMatch] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatch(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return match;
}

const EASE = [0.22, 1, 0.36, 1];

// Every label may be bilingual ({ en, id }) — resolved with the current language.
// cta: { label, href } (link) or { label, onClick } (button)
// back: optional { label, href } — small "← Myst Tech" chip on the profile page
function NavbarSoft({ links = defaultLinks, brand = defaultBrand, cta = defaultCta, back = null, labels = defaultLabels }) {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));
  const isDesktop = useIsDesktop();
  const spyLock = useRef(0); // scroll-spy is paused until this timestamp (after a menu click)
  const pill = useWarmColor('warm-peach-soft');
  const ink = useWarmColor('warm-ink');
  const peach = useWarmColor('warm-peach');
  const sage = useWarmColor('warm-sage');

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
        if (performance.now() < spyLock.current) return;
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
  }, [links]);

  // Mobile menu: lock page scroll and close on Escape while it's open
  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Jump straight to the clicked section and hold the spy while the page
  // smooth-scrolls, so the gooey pill makes one move instead of one per section.
  const jumpTo = (href) => {
    spyLock.current = performance.now() + 1100;
    setActive(href.slice(1));
  };

  const activeIndex = links.findIndex(([, href]) => href.slice(1) === active);
  const gooeyItems = links.map(([label, href]) => ({ label: t(label), href }));

  return (
    <>
      <motion.div style={{ scaleX: progress, originX: 0 }} className="fixed top-0 left-0 right-0 z-[60] h-1 bg-warmPeach" />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled && !open ? 'bg-warmBg/80 backdrop-blur border-b border-warmLine shadow-soft' : 'bg-transparent'
        }`}
      >
        <nav className="container mx-auto flex items-center justify-between px-6 py-4 max-w-[1200px]">
          <div className="flex items-center gap-3">
            <a href="#hero" onClick={() => setOpen(false)} className="inline-flex items-center gap-2 font-display text-xl font-extrabold tracking-tight text-warmInk">
              {brand}
            </a>
            {back && (
              <a
                href={back.href}
                className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-warmLine px-3 py-1 font-body text-xs font-semibold text-warmMuted transition-colors hover:border-warmPeach hover:text-warmPeach"
              >
                <FiArrowLeft /> {t(back.label)}
              </a>
            )}
          </div>

          <div className="flex items-center gap-1">
            {/* Desktop: React Bits GooeyNav — the pill "melts" into the next item,
                driven by the same scroll-spy as before (-1 = hero, nothing lit). */}
            <div className="hidden md:flex items-center gap-1">
              {isDesktop && pill && (
                <GooeyNav
                  items={gooeyItems}
                  activeIndex={activeIndex}
                  onChange={(_, item) => jumpTo(item.href)}
                  theme={dark ? 'dark' : 'light'}
                  color={pill}
                  activeTextColor={ink}
                  colors={[peach, sage]}
                  frame={false}
                  size="md"
                  particleCount={10}
                  style={{ '--gn-ink': 'rgb(var(--warm-ink))', '--gn-muted': 'rgb(var(--warm-muted))' }}
                />
              )}
              {cta.href ? (
                <a
                  href={cta.href}
                  className="ml-2 inline-block rounded-full bg-warmInk px-5 py-2 font-body text-sm font-semibold text-warmBg transition-transform hover:-translate-y-0.5"
                >
                  {t(cta.label)}
                </a>
              ) : (
                <button
                  onClick={cta.onClick}
                  className="ml-2 rounded-full bg-warmInk px-5 py-2 font-body text-sm font-semibold text-warmBg transition-transform hover:-translate-y-0.5"
                >
                  {t(cta.label)}
                </button>
              )}
            </div>

            <div className="ml-2 mr-1">
              <LangToggle />
            </div>

            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-support'))}
              aria-label={t(labels.coffee)}
              title={t(labels.coffee)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-lg text-warmMuted transition-colors hover:bg-warmPeachSoft hover:text-warmPeach"
            >
              <FiCoffee />
            </button>

            <button
              onClick={toggleTheme}
              aria-label={dark ? t(labels.light) : t(labels.dark)}
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

            <button
              className="md:hidden relative z-10 p-2 text-2xl text-warmInk"
              onClick={() => setOpen((v) => !v)}
              aria-label={t(labels.menu)}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? 'x' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="flex"
                >
                  {open ? <FiX /> : <FiMenu />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile: full-screen staggered menu (StaggeredMenu-style, built with
          framer-motion — no gsap). Two colour layers sweep in, then the panel,
          then each link rises from its own line. */}
      <AnimatePresence>
        {open && (
          <motion.div key="mobile-menu" id="mobile-menu" className="fixed inset-0 z-40 md:hidden" initial="closed" animate="open" exit="closed">
            {['bg-warmPeach', 'bg-warmSage'].map((bg, i) => (
              <motion.div
                key={bg}
                className={`absolute inset-0 ${bg}`}
                variants={{
                  closed: { x: '100%', transition: { duration: 0.35, ease: EASE, delay: (1 - i) * 0.06 } },
                  open: { x: 0, transition: { duration: 0.5, ease: EASE, delay: i * 0.07 } },
                }}
              />
            ))}
            <motion.div
              className="absolute inset-0 flex flex-col overflow-y-auto bg-warmBg px-6 pb-8 pt-24"
              variants={{
                closed: { x: '100%', transition: { duration: 0.35, ease: EASE } },
                open: { x: 0, transition: { duration: 0.55, ease: EASE, delay: 0.14, when: 'beforeChildren', staggerChildren: 0.06 } },
              }}
            >
              <nav aria-label={t(labels.menu)}>
                <ol className="flex flex-col">
                  {links.map(([label, href], i) => {
                    const on = active === href.slice(1);
                    return (
                      <li key={href} className="overflow-hidden border-b border-warmLine/70">
                        <motion.a
                          href={href}
                          onClick={() => {
                            jumpTo(href);
                            setOpen(false);
                          }}
                          aria-current={on ? 'true' : undefined}
                          variants={{
                            closed: { y: '110%', rotate: 4, transition: { duration: 0.2 } },
                            open: { y: 0, rotate: 0, transition: { duration: 0.55, ease: EASE } },
                          }}
                          style={{ originX: 0 }}
                          className={`group flex items-baseline gap-3 py-3 font-display text-[2.1rem] font-extrabold leading-tight tracking-tight ${
                            on ? 'text-warmPeach' : 'text-warmInk'
                          }`}
                        >
                          <span className="w-7 shrink-0 font-body text-xs font-semibold text-warmMuted">{String(i + 1).padStart(2, '0')}</span>
                          {t(label)}
                        </motion.a>
                      </li>
                    );
                  })}
                </ol>
              </nav>

              <motion.div
                variants={{ closed: { opacity: 0, y: 12 }, open: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.1 } } }}
                className="mt-auto flex flex-col gap-3 pt-10"
              >
                {cta.href ? (
                  <a href={cta.href} className="inline-flex items-center justify-center gap-2 rounded-full bg-warmInk px-6 py-3.5 font-body font-semibold text-warmBg">
                    {t(cta.label)} <FiArrowUpRight />
                  </a>
                ) : (
                  <button
                    onClick={() => {
                      setOpen(false);
                      cta.onClick();
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-warmInk px-6 py-3.5 font-body font-semibold text-warmBg"
                  >
                    {t(cta.label)} <FiArrowUpRight />
                  </button>
                )}
                <div className="flex items-center justify-between gap-3">
                  {back ? (
                    <a href={back.href} className="inline-flex items-center gap-2 font-body text-sm font-semibold text-warmMuted">
                      <FiArrowLeft /> {t(back.label)}
                    </a>
                  ) : (
                    <span />
                  )}
                  <button
                    onClick={toggleTheme}
                    className="inline-flex items-center gap-2 rounded-full border border-warmLine px-4 py-2 font-body text-sm font-semibold text-warmInk"
                  >
                    {dark ? <FiSun /> : <FiMoon />} {dark ? t(labels.light) : t(labels.dark)}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default NavbarSoft;
