/* eslint-disable no-unused-vars */
import { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { FiBriefcase, FiBookOpen, FiAward } from 'react-icons/fi';
import { experienceData } from '../../data/experience';
import { educationData } from '../../data/education';
import { achievementsData } from '../../data/achievements';

const tabs = [
  { id: 'experience', label: 'Experience', icon: FiBriefcase, accent: '#E8835A' },
  { id: 'education', label: 'Education', icon: FiBookOpen, accent: '#7BA7C9' },
  { id: 'achievements', label: 'Achievements', icon: FiAward, accent: '#7FA887' },
];

function row(item, type) {
  if (type === 'experience') return { period: item.period, title: item.title, sub: item.company, desc: item.description };
  if (type === 'education') return { period: item.period, title: item.degree, sub: item.institution, desc: item.description };
  return { period: item.year, title: item.title, sub: item.organization, desc: item.description };
}

function ExperienceSoft() {
  const [active, setActive] = useState('experience');
  const accent = tabs.find((t) => t.id === active).accent;
  const data = active === 'experience' ? experienceData : active === 'education' ? educationData : achievementsData;

  // Timeline line fills in as it scrolls through the viewport
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 0.8', 'end 0.5'] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="relative bg-warmCard py-24 md:py-32 text-warmInk">
      <div className="container mx-auto px-6 max-w-[1000px]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-body text-sm font-semibold uppercase tracking-widest text-warmPeach">Journey</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">Background</h2>
        </motion.div>

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap gap-3">
          {tabs.map((t) => {
            const on = active === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-body text-sm font-semibold transition-colors ${
                  on ? 'text-warmBg' : 'text-warmMuted hover:text-warmInk'
                }`}
              >
                {on && (
                  <motion.span layoutId="tabPill" className="absolute inset-0 rounded-full" style={{ backgroundColor: t.accent }} transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                )}
                <span className="relative z-10 flex items-center gap-2"><t.icon /> {t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative mt-12 pl-8">
          <span className="absolute bottom-0 left-0 top-0 w-0.5 rounded-full" style={{ backgroundColor: accent + '30' }} />
          <motion.span
            className="absolute bottom-0 left-0 top-0 w-0.5 origin-top rounded-full"
            style={{ backgroundColor: accent, scaleY: lineScale }}
          />
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.3 }} className="flex flex-col gap-10">
              {data.map((raw, i) => {
                const it = row(raw, active);
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: i * 0.08 }}
                    className="relative"
                  >
                    <span className="absolute -left-[39px] top-1 h-4 w-4 rounded-full ring-4 ring-warmCard" style={{ backgroundColor: accent }} />
                    <span className="font-body text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>{it.period}</span>
                    <h3 className="mt-1 font-display text-xl md:text-2xl font-bold">{it.title}</h3>
                    <span className="font-body text-warmMuted">{it.sub}</span>
                    <p className="mt-3 max-w-2xl font-body text-warmMuted leading-relaxed">{it.desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default ExperienceSoft;
