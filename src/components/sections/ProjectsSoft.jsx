/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiArrowUpRight, FiMapPin } from 'react-icons/fi';
import { projectsData, categories } from '../../data/projects';

function ProjectsSoft() {
  const [filter, setFilter] = useState('all');
  const list = filter === 'all' ? projectsData : projectsData.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative overflow-hidden bg-warmBg py-24 md:py-32 text-warmInk">
      <div className="container mx-auto px-6 max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span className="font-body text-sm font-semibold uppercase tracking-widest text-warmPeach">Portfolio</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">Selected works</h2>
          </div>

          {/* Filter pills */}
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

        {/* Grid */}
        <motion.div layout className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
                whileHover={{ y: -8 }}
                className="group flex flex-col overflow-hidden rounded-3xl border border-warmLine bg-warmCard shadow-soft transition-shadow duration-300 hover:shadow-soft-lg"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-warmPeachSoft">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-warmBg/90 px-3 py-1 font-body text-xs font-bold text-warmInk backdrop-blur">{p.year}</span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-bold leading-snug">{p.title}</h3>
                  <p className="mt-2 line-clamp-3 font-body text-sm text-warmMuted leading-relaxed">{p.description}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.technologies.slice(0, 3).map((t) => (
                      <span key={t} className="rounded-full bg-warmBg px-2.5 py-1 font-body text-[11px] font-medium text-warmMuted">{t}</span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-warmLine pt-4">
                    <span className="inline-flex items-center gap-1 font-body text-xs text-warmMuted"><FiMapPin /> {p.location.split(',')[0]}</span>
                    {p.codeLink && p.codeLink !== '#' ? (
                      <a href={p.codeLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-body text-sm font-semibold text-warmInk transition-colors hover:text-warmPeach">
                        <FiGithub /> Code
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1 font-body text-sm font-semibold text-warmPeach">View <FiArrowUpRight /></span>
                    )}
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
    </section>
  );
}

export default ProjectsSoft;
