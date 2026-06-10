/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiGithub, FiExternalLink, FiMapPin, FiCalendar, FiTag } from 'react-icons/fi';
import { categories } from '../../data/projects';

// Case-study overlay for a single project. Opened by clicking a card in
// ProjectsSoft; closes on backdrop click, the X button, or Escape.
function ProjectModalSoft({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  const categoryName = project
    ? categories.find((c) => c.id === project.category)?.name ?? project.category
    : '';
  const demo = project?.demoLink && project.demoLink !== '#' ? project.demoLink : null;
  const code = project?.codeLink && project.codeLink !== '#' ? project.codeLink : null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-warmInk/40 p-4 backdrop-blur-sm sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-warmCard shadow-soft-lg ring-1 ring-warmLine"
          >
            <button
              onClick={onClose}
              aria-label="Close project details"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-warmBg/90 text-lg text-warmInk shadow-soft backdrop-blur transition-colors hover:bg-warmPeach hover:text-warmBg"
            >
              <FiX />
            </button>

            <div className="overflow-y-auto overscroll-contain">
              <div className="bg-gradient-to-br from-warmPeachSoft to-warmSageSoft p-3">
                <img
                  src={project.image}
                  alt={project.title}
                  className="mx-auto max-h-[40vh] w-full rounded-2xl object-contain"
                />
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2 font-body text-xs font-semibold text-warmMuted">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-warmPeachSoft px-3 py-1 text-warmPeach">
                    <FiTag /> {categoryName}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-warmBg px-3 py-1">
                    <FiCalendar /> {project.year}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-warmBg px-3 py-1">
                    <FiMapPin /> {project.location}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-3 font-body leading-relaxed text-warmMuted">
                  {project.description}
                </p>

                <div className="mt-6">
                  <div className="font-body text-xs font-semibold uppercase tracking-widest text-warmMuted">
                    Built with
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-warmLine bg-warmBg px-3 py-1.5 font-body text-sm font-medium text-warmInk"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {(demo || code) && (
                  <div className="mt-8 flex flex-wrap gap-3">
                    {demo && (
                      <a
                        href={demo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-warmInk px-6 py-3 font-body text-sm font-semibold text-warmBg shadow-soft transition-transform hover:-translate-y-0.5"
                      >
                        <FiExternalLink /> Live demo
                      </a>
                    )}
                    {code && (
                      <a
                        href={code}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-warmLine bg-warmCard px-6 py-3 font-body text-sm font-semibold text-warmInk transition-colors hover:border-warmPeach hover:text-warmPeach"
                      >
                        <FiGithub /> Source code
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ProjectModalSoft;
