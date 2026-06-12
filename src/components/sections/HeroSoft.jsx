/* eslint-disable no-unused-vars */
import { motion, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FiArrowDownRight, FiMail, FiCode, FiBookOpen, FiCpu, FiWifi, FiSearch, FiMonitor, FiUsers, FiZap } from 'react-icons/fi';
import Counter from '../ui/Counter';
import Marquee from '../ui/Marquee';
import { projectsData } from '../../data/projects';
import { yearsOfExperience, currentProjects, currentRoles } from '../../data/site';

// Soft / Warm Hero — light, fast, mobile-friendly, lots of gentle motion.
function HeroSoft() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  // Rotating photo badge — cycles through every ongoing role from
  // experience.js. Pauses on hover; click/tap skips to the next role.
  const liveRoles = currentRoles();
  const [roleIdx, setRoleIdx] = useState(0);
  const [badgePaused, setBadgePaused] = useState(false);
  useEffect(() => {
    if (reduce || badgePaused || liveRoles.length < 2) return undefined;
    const t = setInterval(() => setRoleIdx((i) => (i + 1) % liveRoles.length), 3500);
    return () => clearInterval(t);
  }, [reduce, badgePaused, liveRoles.length]);
  const badgeRole = liveRoles[roleIdx % liveRoles.length];
  // Prefer the hand-picked short labels; fall back to trimming the long ones
  const badgeTitle = badgeRole?.shortTitle ?? badgeRole?.title.split('—').pop().trim();
  const badgeCompany = badgeRole?.shortCompany ?? badgeRole?.company.split(',')[0].trim();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yBlobA = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -100]);
  const yBlobB = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  const yPhoto = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);

  // Interactive 3D tilt + glare that follows the cursor over the photo
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 200, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-12, 12]), { stiffness: 200, damping: 18 });
  const glareX = useTransform(mx, [0, 1], ['0%', '100%']);
  const glareY = useTransform(my, [0, 1], ['0%', '100%']);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.35), transparent 55%)`;

  const handlePhotoMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const handlePhotoLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  // Floating decorative shapes that drift forever
  const shapes = [
    { cls: 'top-24 left-[12%] h-4 w-4 rounded-full bg-warmPeach', dur: 6, d: 0 },
    { cls: 'top-40 right-[18%] h-3 w-3 rounded-full bg-warmSage', dur: 7, d: 1 },
    { cls: 'bottom-40 left-[20%] h-5 w-5 rounded-md bg-warmSky rotate-12', dur: 8, d: 0.5 },
    { cls: 'bottom-32 right-[30%] h-3 w-3 rounded-full bg-warmPeach', dur: 5.5, d: 1.5 },
  ];

  const roles = [
    { label: 'Full-Stack Developer', Icon: FiCode },
    { label: 'Information System Lecturer', Icon: FiBookOpen },
    { label: 'Digital Innovation Lab Head', Icon: FiZap },
    { label: 'AI Enthusiast', Icon: FiCpu },
    { label: 'IoT Engineer', Icon: FiWifi },
    { label: 'Researcher', Icon: FiSearch },
    { label: 'Tech Educator', Icon: FiMonitor },
    { label: 'Mentor', Icon: FiUsers },
  ];
  const roleItems = roles.map(({ label, Icon }) => (
    <span key={label} className="inline-flex items-center gap-3">
      <Icon className="text-2xl text-warmPeach" />
      {label}
    </span>
  ));

  return (
    <section ref={ref} id="hero" className="relative overflow-hidden bg-warmBg text-warmInk min-h-screen flex items-center">
      {/* Continuously morphing gradient blobs */}
      <motion.div
        style={{ y: yBlobA }}
        animate={reduce ? {} : { scale: [1, 1.15, 1], x: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-32 -left-24 w-[460px] h-[460px] rounded-full bg-warmPeachSoft blur-3xl opacity-70"
      />
      <motion.div
        style={{ y: yBlobB }}
        animate={reduce ? {} : { scale: [1, 1.2, 1], x: [0, -40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute top-1/3 -right-28 w-[520px] h-[520px] rounded-full bg-warmSageSoft blur-3xl opacity-60"
      />

      {/* Floating shapes */}
      {!reduce &&
        shapes.map((s, i) => (
          <motion.span
            key={i}
            className={`pointer-events-none absolute ${s.cls} opacity-70 shadow-soft`}
            animate={{ y: [0, -22, 0], rotate: [0, 18, 0] }}
            transition={{ duration: s.dur, repeat: Infinity, ease: 'easeInOut', delay: s.d }}
          />
        ))}

      {/* Dotted texture (currentColor follows the theme's ink color) */}
      <div
        className="pointer-events-none absolute inset-0 text-warmInk opacity-[0.06]"
        style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />

      <div className="relative z-10 container mx-auto px-6 max-w-[1200px] pt-28 pb-32 md:py-0">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

          {/* Left: copy */}
          <motion.div variants={container} initial="hidden" animate="show" className="md:col-span-7">
            <motion.span
              variants={item}
              className="inline-flex items-center gap-2 rounded-full border border-warmLine bg-warmCard/70 px-4 py-1.5 text-sm font-medium text-warmMuted shadow-soft backdrop-blur"
            >
              <span className="h-2 w-2 rounded-full bg-warmSage animate-pulse" />
              Available for collaboration
            </motion.span>

            <motion.h1 variants={item} className="mt-6 font-display font-extrabold tracking-tight leading-[0.98] text-5xl sm:text-6xl lg:text-7xl">
              Aidil Saputra{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Kirsan</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.9, duration: 0.6, ease: 'easeOut' }}
                  style={{ originX: 0 }}
                  className="absolute inset-x-0 bottom-1 z-0 h-3 bg-warmPeach/30 -rotate-1"
                />
              </span>
            </motion.h1>

            <motion.p variants={item} className="mt-6 max-w-xl font-body text-lg md:text-xl text-warmMuted leading-relaxed">
              Full-Stack Developer & Information System Lecturer. I build dynamic,
              intelligent, and scalable digital products — and teach the next
              generation of IT professionals.
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
              <motion.a
                href="#projects"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-2 rounded-full bg-warmInk px-7 py-3.5 font-body font-semibold text-warmBg shadow-soft hover:shadow-soft-lg"
              >
                View my work
                <FiArrowDownRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full border border-warmLine bg-warmCard px-7 py-3.5 font-body font-semibold text-warmInk hover:border-warmPeach hover:text-warmPeach"
              >
                <FiMail /> Get in touch
              </motion.a>
            </motion.div>

            {/* Mini stats with count-up */}
            <motion.div variants={item} className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
              {[
                { n: yearsOfExperience(), s: '+', l: 'Years experience' },
                { n: projectsData.length, s: '+', l: 'Projects shipped' },
                { n: currentProjects().length, s: '', l: 'Products in build' },
              ].map((x) => (
                <div key={x.l}>
                  <div className="font-display text-3xl font-bold text-warmInk">
                    <Counter to={x.n} suffix={x.s} />
                  </div>
                  <div className="font-body text-sm text-warmMuted">{x.l}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: portrait card */}
          <motion.div
            style={{ y: yPhoto }}
            initial={{ opacity: 0, scale: 0.94, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="md:col-span-5"
          >
            <motion.div
              animate={reduce ? {} : { y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              onMouseMove={handlePhotoMove}
              onMouseLeave={handlePhotoLeave}
              style={{ perspective: 900 }}
              className="relative mx-auto w-64 sm:w-80 md:w-full max-w-sm"
            >
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-warmPeachSoft to-warmSageSoft" />
              <motion.div
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                whileHover={{ scale: 1.03 }}
                className="group relative overflow-hidden rounded-[1.75rem] bg-warmCard shadow-soft-lg ring-1 ring-warmLine"
              >
                <img src="/FAidil.png" alt="Aidil Saputra Kirsan" loading="eager" className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                {/* Cursor-following glare */}
                <motion.div style={{ background: glare }} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 mix-blend-soft-light" />
                {/* Bottom gradient for depth */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>
              {badgeRole && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  onMouseEnter={() => setBadgePaused(true)}
                  onMouseLeave={() => setBadgePaused(false)}
                  onClick={() => setRoleIdx((i) => (i + 1) % liveRoles.length)}
                  role="button"
                  tabIndex={0}
                  aria-label="Current roles — click for the next one"
                  className="absolute -bottom-5 -left-5 w-[250px] cursor-pointer rounded-2xl bg-warmCard px-5 py-3 shadow-soft ring-1 ring-warmLine"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={roleIdx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      aria-live="polite"
                    >
                      <div className="truncate font-display text-sm font-bold text-warmInk">{badgeTitle}</div>
                      <div className="truncate font-body text-xs text-warmMuted">{badgeCompany}</div>
                    </motion.div>
                  </AnimatePresence>
                  {liveRoles.length > 1 && (
                    <div className="mt-2 flex gap-1.5">
                      {liveRoles.map((r, i) => (
                        <span
                          key={r.title}
                          className={`h-1 rounded-full transition-all duration-300 ${
                            i === roleIdx ? 'w-4 bg-warmPeach' : 'w-1.5 bg-warmLine'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Moving marquee strip at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 border-y border-warmLine bg-warmCard/60 py-4 backdrop-blur">
        <Marquee items={roleItems} speed={36} />
      </div>
    </section>
  );
}

export default HeroSoft;
