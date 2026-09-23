/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiArrowUpRight, FiMapPin, FiLock } from 'react-icons/fi';
import { projectsData, categories } from '../../data/projects';
import { productsData as products } from '../../data/products';
import { productIcon } from '../hub/productIcons';
import ProjectModalSoft from './ProjectModalSoft';

// Myst products (products.js) render as a compact strip linking to each app;
// works (projects.js) render as a compact image-free list with a detail modal.
const works = projectsData;

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
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">Products I run</h2>
              <p className="mt-3 max-w-xl font-body text-warmMuted leading-relaxed">
                Live platforms under Myst Tech — public, and open to try.
              </p>
            </div>
            <a href="/#produk" className="inline-flex items-center gap-1 font-body text-sm font-semibold text-warmPeach hover:underline">
              All apps at myst-tech.com <FiArrowUpRight />
            </a>
          </div>
        </motion.div>

        {/* Myst products — compact strip; the full launcher lives on the hub */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => {
            const Icon = productIcon(p.icon);
            const live = p.status === 'live' && p.url;
            const Tag = live ? motion.a : motion.div;
            return (
              <Tag
                key={p.id}
                {...(live ? { href: p.url, target: '_blank', rel: 'noreferrer' } : {})}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={`group flex items-center gap-4 rounded-2xl border bg-warmCard p-4 shadow-soft transition-all duration-300 ${
                  live ? 'border-warmLine hover:-translate-y-1 hover:shadow-soft-lg' : 'border-dashed border-warmLine'
                }`}
              >
                <span
                  className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl text-white transition-transform duration-500 group-hover:rotate-[-6deg] ${live ? '' : 'opacity-60'}`}
                  style={{ background: p.color, boxShadow: `0 12px 28px -12px ${p.color}` }}
                >
                  <Icon />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-display text-base font-bold">{p.title}</h3>
                    <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${live ? 'bg-emerald-500' : 'bg-amber-500'}`} title={live ? 'Live' : 'In development'} />
                  </div>
                  <p className="truncate font-body text-sm text-warmMuted">{live ? p.url.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'Coming soon'}</p>
                </div>
                {live && <FiArrowUpRight className="shrink-0 text-warmMuted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-warmPeach" />}
              </Tag>
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
