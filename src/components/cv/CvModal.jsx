/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiPrinter } from 'react-icons/fi';
import CvDocument from './CvDocument';

// Listens for a global `open-cv` event (dispatched by any "Download CV" button),
// shows the CV in an overlay, and prints to PDF via the browser.
function CvModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openCv = () => setOpen(true);
    window.addEventListener('open-cv', openCv);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('open-cv', openCv);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          id="cv-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col bg-warmInk/60 backdrop-blur-sm print:bg-white"
        >
          {/* Toolbar (hidden when printing) */}
          <div className="flex items-center justify-between gap-4 bg-warmInk px-5 py-3 text-warmBg print:hidden">
            <span className="font-display text-sm font-bold">CV — Aidil Saputra Kirsan</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 rounded-full bg-warmPeach px-5 py-2 font-body text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                <FiPrinter /> Save as PDF
              </button>
              <button onClick={() => setOpen(false)} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-warmBg/30 hover:bg-warmBg/10" aria-label="Close">
                <FiX />
              </button>
            </div>
          </div>

          {/* Scrollable CV preview */}
          <div className="cv-scroll flex-1 overflow-auto p-4 sm:p-8 print:overflow-visible print:p-0">
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto w-fit shadow-soft-lg print:shadow-none"
            >
              <CvDocument />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default CvModal;
