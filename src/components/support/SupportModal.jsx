/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiHeart } from 'react-icons/fi';

// Listens for a global `open-support` event (dispatched by any "Buy me a
// coffee" trigger) and shows a QRIS scan card in an overlay.
function SupportModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openSupport = () => setOpen(true);
    window.addEventListener('open-support', openSupport);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);

    // Deep link support: myst-tech.com/?support auto-opens the modal, so
    // IG bio/story links can jump straight here without landing on the homepage first.
    if (new URLSearchParams(window.location.search).has('support')) {
      setOpen(true);
      history.replaceState(null, '', window.location.pathname);
    }

    return () => {
      window.removeEventListener('open-support', openSupport);
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-warmInk/60 p-4 backdrop-blur-sm"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 24, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 12, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-sm rounded-3xl border border-warmLine bg-warmBg p-7 text-center shadow-soft-lg"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-warmMuted hover:bg-warmPeachSoft hover:text-warmPeach"
            >
              <FiX />
            </button>

            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-warmPeachSoft text-2xl text-warmPeach">
              <FiHeart />
            </span>

            <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-warmInk">Buy me a coffee</h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-warmMuted">
              If something here helped you out, a coffee is always appreciated. Scan the QRIS
              code below with any e-wallet or mobile banking app — GoPay, OVO, DANA, ShopeePay, all supported.
            </p>

            <div className="mt-6 overflow-hidden rounded-2xl border border-warmLine bg-white p-3">
              <img
                src="/qris.jpeg"
                alt="QRIS payment code for Aidil Saputra Kirsan"
                className="mx-auto w-full max-w-[260px] rounded-xl"
              />
            </div>

            <p className="mt-5 font-body text-xs font-semibold uppercase tracking-wider text-warmMuted">
              Thank you for the support ✦
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default SupportModal;
