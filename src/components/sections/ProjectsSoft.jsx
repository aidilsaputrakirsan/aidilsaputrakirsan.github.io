/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiArrowUpRight, FiMapPin, FiExternalLink, FiLock, FiCalendar } from 'react-icons/fi';
import { projectsData, categories } from '../../data/projects';
import ProjectModalSoft from './ProjectModalSoft';

// Featured products (featured: true in projects.js) get big poster cards with a
// live link; everything else renders as a compact image-free works list.
const products = projectsData.filter((p) => p.featured);
const works = projectsData.filter((p) => !p.featured);

const statusBadge = {
  live: { label: 'Live', dot: 'bg-emerald-500', text: 'text-emerald-700', bg: 'bg-emerald-50 ring-emerald-200' },
  building: { label: 'In development', dot: 'bg-amber-500', text: 'text-amber-700', bg: 'bg-amber-50 ring-amber-200' },
};

function ProjectsSoft() {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const list = filter === 'all' ? works : works.filter((p) => p.category === filter);

  // Skill domain cards (SkillsSoft) jump here pre-filtered via this event.
  useEffect(() => {
    const onFilter = (e) => {
      if (categories.some((c) => c.id === e.detail)) setFilter(e.detail);
    };
    window.addEventListener('filter-projects', onFilter);
    return () => window.removeEventListener('filter-projects', onFilter);
  }, []);

  return (
    <section id="projects" className="relative overflow-hidden bg-warmBg py-24 md:py-32 text-warmInk">
      <div className="container mx-auto px-6 max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-body text-sm font-semibold uppercase tracking-widest text-warmPeach">Portfolio</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">Products</h2>
          <p className="mt-3 max-w-xl font-body text-warmMuted leading-relaxed">
            Ready-to-use platforms I build and run — live, public, and open to try.
          </p>
        </motion.div>

        {/* Featured product cards */}
        <div className="mt-12 flex flex-col gap-8">
          {products.map((p, i) => {
            const badge = statusBadge[p.status] ?? statusBadge.live;
            const demo = p.demoLink && p.demoLink !== '#' ? p.demoLink : null;
            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="grid overflow-hidden rounded-3xl border border-warmLine bg-warmCard shadow-soft md:grid-cols-[minmax(0,380px)_1fr]"
              >
                {p.image ? (
                  // Poster opens the raw image in a new tab (no modal for products).
                  <a
                    href={p.image}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${p.title} poster in a new tab`}
                    className="group relative bg-gradient-to-br from-warmPeachSoft to-warmSageSoft p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-warmPeach"
                  >
                    <img
                      src={p.image}
                      alt={`${p.title} poster`}
                      loading="lazy"
                      className="mx-auto max-h-[420px] w-full rounded-2xl object-contain shadow-soft transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <span className="absolute bottom-6 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-warmInk/80 px-3 py-1 font-body text-xs font-semibold text-warmBg opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                      <FiExternalLink /> Open poster in new tab
                    </span>
                  </a>
                ) : (
                  // No poster yet — monogram panel keeps the card balanced.
                  <div className="flex min-h-[220px] items-center justify-center bg-gradient-to-br from-warmPeachSoft to-warmSageSoft p-4 md:min-h-[320px]">
                    <div className="text-center">
                      <span className="font-display text-6xl font-bold text-warmInk/20 md:text-7xl">
                        {p.title.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
                      </span>
                      <p className="mt-2 font-body text-xs font-semibold uppercase tracking-widest text-warmMuted">{p.title}</p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col justify-center p-7 md:p-10">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-body text-xs font-bold ring-1 ${badge.bg} ${badge.text}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${badge.dot}`} /> {badge.label}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-warmBg px-3 py-1 font-body text-xs font-semibold text-warmMuted">
                      <FiCalendar /> {p.year}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-2xl md:text-3xl font-bold tracking-tight">{p.title}</h3>
                  {p.tagline && <p className="mt-1 font-body text-sm font-semibold text-warmPeach">{p.tagline}</p>}
                  <p className="mt-3 font-body text-sm md:text-base text-warmMuted leading-relaxed">{p.description}</p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    {demo && (
                      <a
                        href={demo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-warmInk px-6 py-3 font-body text-sm font-semibold text-warmBg shadow-soft transition-transform hover:-translate-y-0.5"
                      >
                        <FiExternalLink /> Visit site
                      </a>
                    )}
                    {p.codeLink && p.codeLink !== '#' && (
                      <a
                        href={p.codeLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-warmLine bg-warmCard px-6 py-3 font-body text-sm font-semibold text-warmInk transition-colors hover:border-warmPeach hover:text-warmPeach"
                      >
                        <FiGithub /> Source code
                      </a>
                    )}
                    {!demo && (!p.codeLink || p.codeLink === '#') && (
                      <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-warmLine px-6 py-3 font-body text-sm font-semibold text-warmMuted">
                        Launching soon
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Works list header + filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mt-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Selected works</h3>
            <p className="mt-2 max-w-xl font-body text-sm text-warmMuted leading-relaxed">
              Systems built for institutions and clients — most run privately on internal networks.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((c) => {
              const on = filter === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setFilter(c.id)}
                  className={`relative rounded-full px-4 py-2 font-body text-sm font-semibold transition-colors ${on ? 'text-warmBg' : 'text-warmMuted hover:text-warmInk'}`}
                >
                  {on && <motion.span layoutId="projPill" className="absolute inset-0 rounded-full bg-warmInk" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                  <span className="relative z-10">{c.name}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Compact image-free list */}
        <motion.div layout className="mt-8 flex flex-col gap-3">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, delay: Math.min(i, 6) * 0.04 }}
                role="button"
                tabIndex={0}
                aria-label={`View details of ${p.title}`}
                onClick={() => setSelected(p)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelected(p);
                  }
                }}
                className="group cursor-pointer rounded-2xl border border-warmLine bg-warmCard px-5 py-4 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-warmPeach md:px-6"
              >
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-5">
                  <span className="shrink-0 font-body text-xs font-bold text-warmMuted md:w-12">{p.year}</span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-display text-base font-bold leading-snug">{p.title}</h4>
                      {p.internal && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-warmBg px-2 py-0.5 font-body text-[10px] font-semibold uppercase tracking-wide text-warmMuted">
                          <FiLock className="text-[10px]" /> Internal system
                        </span>
                      )}
                    </div>
                    <p className="mt-1 line-clamp-2 md:line-clamp-1 font-body text-sm text-warmMuted leading-relaxed">{p.description}</p>
                  </div>

                  <div className="flex shrink-0 items-center gap-3 md:w-auto">
                    <span className="inline-flex items-center gap-1 font-body text-xs text-warmMuted"><FiMapPin /> {p.location.split(',')[0]}</span>
                    {p.codeLink && p.codeLink !== '#' && (
                      <a
                        href={p.codeLink}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${p.title} source code on GitHub`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-lg text-warmMuted transition-colors hover:text-warmPeach"
                      >
                        <FiGithub />
                      </a>
                    )}
                    <span className="inline-flex items-center gap-1 font-body text-sm font-semibold text-warmPeach">
                      Details <FiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-14 flex justify-center">
          <motion.a
            href="https://github.com/aidilsaputrakirsan"
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -3 }}
            className="inline-flex items-center gap-2 rounded-full border border-warmLine bg-warmCard px-7 py-3.5 font-body font-semibold text-warmInk shadow-soft hover:border-warmPeach hover:text-warmPeach"
          >
            <FiGithub /> View more on GitHub
          </motion.a>
        </div>
      </div>

      <ProjectModalSoft project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

export default ProjectsSoft;
