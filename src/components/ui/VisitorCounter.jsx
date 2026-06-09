/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEye } from 'react-icons/fi';

// Visible visitor counter — reads the total from your own GoatCounter dashboard.
// Tracking itself is done by the GoatCounter script in index.html.
// NOTE: enable "Allow visitors to see the counts" in GoatCounter
// Settings → Site settings, otherwise this endpoint returns 403.
const GOATCOUNTER_TOTAL = 'https://aidilsaputrakirsan.goatcounter.com/counter/TOTAL.json';

function VisitorCounter() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(GOATCOUNTER_TOTAL, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        // GoatCounter returns count as a formatted string e.g. "1,234"
        const n = parseInt(String(d?.count ?? '').replace(/\D/g, ''), 10);
        if (!Number.isNaN(n)) setCount(n);
      })
      .catch(() => {}); // stay silent on failure

    return () => controller.abort();
  }, []);

  // Don't render anything until we have a real number
  if (count === null) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 rounded-full border border-warmLine bg-warmCard px-4 py-2 font-body text-sm text-warmMuted shadow-soft"
      >
        <FiEye className="text-warmPeach" />
        <span className="font-semibold text-warmInk">{count.toLocaleString('en-US')}</span>
        visitors
      </motion.div>
    </AnimatePresence>
  );
}

export default VisitorCounter;
