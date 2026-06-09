/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';

// Infinite horizontal marquee. Cheap (single transform), pauses on reduced-motion.
function Marquee({ items, speed = 26, className = '', reverse = false }) {
  const row = [...items, ...items];
  return (
    <div className={`relative flex overflow-hidden ${className}`}>
      <motion.div
        className="flex shrink-0 items-center gap-8 pr-8"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap">
            <span className="font-display text-2xl md:text-3xl font-bold">{item}</span>
            <span className="text-warmPeach">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default Marquee;
