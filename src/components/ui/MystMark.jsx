// src/components/ui/MystMark.jsx
// Animated, pseudo-3D version of /public/myst-mark.svg (the static file stays the favicon).
// - Core = shaded sphere that slowly "breathes".
// - Two planets travel the tilted ring and pass *behind* the core (ring split in back/front halves).
// - Pointer hover tilts the mark in perspective and speeds the orbit up.
// Plain SVG + rAF writing attributes directly (no re-render per frame). Pauses off-screen,
// static under prefers-reduced-motion.
import { useEffect, useId, useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

const RX = 23;
const RY = 9;
const PLANETS = [
  { r: 4, color: '#8FAE6E', start: -0.62, speed: 1 },      // matcha
  { r: 3, color: '#7E9CC4', start: 2.3, speed: 1 },        // indigo (same ring, opposite side)
];

export default function MystMark({ className = 'h-7 w-7', interactive = true }) {
  const uid = useId().replace(/:/g, '');
  const reduce = useReducedMotion();
  const rootRef = useRef(null);
  const backRefs = useRef([]);
  const frontRefs = useRef([]);
  const coreRef = useRef(null);
  const hover = useRef(false);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 180, damping: 16 });
  const rotateY = useSpring(ry, { stiffness: 180, damping: 16 });

  useEffect(() => {
    const place = (angles, t) => {
      PLANETS.forEach((p, i) => {
        const a = angles[i];
        const x = RX * Math.cos(a);
        const y = RY * Math.sin(a);
        const depth = Math.sin(a); // -1 = far side, +1 = near side
        const r = p.r * (1 + 0.22 * depth);
        const front = depth >= 0;
        for (const [el, show] of [[backRefs.current[i], !front], [frontRefs.current[i], front]]) {
          if (!el) continue;
          el.setAttribute('cx', x.toFixed(2));
          el.setAttribute('cy', y.toFixed(2));
          el.setAttribute('r', r.toFixed(2));
          el.style.opacity = show ? String(0.75 + 0.25 * depth) : '0';
        }
      });
      if (coreRef.current) {
        coreRef.current.setAttribute('r', (10 + 0.45 * Math.sin(t / 900)).toFixed(2));
      }
    };

    const angles = PLANETS.map((p) => p.start);
    place(angles, 0);
    if (reduce) return undefined;

    let raf = 0;
    let last = performance.now();
    let visible = true;
    let speed = 1;
    const tick = (now) => {
      const dt = Math.min(64, now - last);
      last = now;
      speed += ((hover.current ? 3.2 : 1) - speed) * 0.06;
      PLANETS.forEach((p, i) => { angles[i] += dt * 0.0011 * p.speed * speed; });
      place(angles, now);
      raf = requestAnimationFrame(tick);
    };
    const start = () => { if (!raf && visible && !document.hidden) { last = performance.now(); raf = requestAnimationFrame(tick); } };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop(); });
    if (rootRef.current) io.observe(rootRef.current);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);
    start();
    return () => { stop(); io.disconnect(); document.removeEventListener('visibilitychange', onVis); };
  }, [reduce]);

  const onMove = (e) => {
    if (!interactive || reduce) return;
    const b = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - b.left) / b.width - 0.5;
    const py = (e.clientY - b.top) / b.height - 0.5;
    ry.set(px * 36);
    rx.set(-py * 36);
  };
  const onEnter = () => { hover.current = true; };
  const onLeave = () => { hover.current = false; rx.set(0); ry.set(0); };

  const g = (n) => `${n}-${uid}`;
  const ring = { fill: 'none', stroke: '#F3EEE4', strokeWidth: 2.5, strokeLinecap: 'round' };

  return (
    <span
      ref={rootRef}
      className={`inline-block shrink-0 ${className}`}
      style={{ perspective: 220 }}
      onPointerMove={onMove}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      aria-hidden="true"
    >
      <motion.svg
        viewBox="0 0 64 64"
        className="block h-full w-full overflow-visible"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        <defs>
          <linearGradient id={g('tile')} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2A251E" />
            <stop offset="1" stopColor="#14120F" />
          </linearGradient>
          <radialGradient id={g('core')} cx=".36" cy=".32" r=".75">
            <stop offset="0" stopColor="#F4A08A" />
            <stop offset=".45" stopColor="#D8503A" />
            <stop offset="1" stopColor="#7A2014" />
          </radialGradient>
          <radialGradient id={g('glow')} cx=".5" cy=".5" r=".5">
            <stop offset="0" stopColor="#E2583F" stopOpacity=".55" />
            <stop offset="1" stopColor="#E2583F" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={g('shine')} cx=".35" cy=".3" r=".6">
            <stop offset="0" stopColor="#fff" stopOpacity=".55" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="64" height="64" rx="16" fill={`url(#${g('tile')})`} />
        <rect x=".75" y=".75" width="62.5" height="62.5" rx="15.25" fill="none" stroke="#F3EEE4" strokeOpacity=".1" strokeWidth="1.5" />
        <circle cx="32" cy="32" r="20" fill={`url(#${g('glow')})`} />

        <g transform="translate(32 32) rotate(-24)">
          {/* far half of the ring + planets while behind the core */}
          <path d={`M ${-RX} 0 A ${RX} ${RY} 0 0 1 ${RX} 0`} {...ring} strokeOpacity=".28" />
          {PLANETS.map((p, i) => (
            <circle key={`b${i}`} ref={(el) => (backRefs.current[i] = el)} r={p.r} fill={p.color} style={{ opacity: 0 }} />
          ))}
        </g>

        <circle ref={coreRef} cx="32" cy="32" r="10" fill={`url(#${g('core')})`} />
        <circle cx="32" cy="32" r="10" fill={`url(#${g('shine')})`} />

        <g transform="translate(32 32) rotate(-24)">
          {/* near half of the ring passes in front of the core */}
          <path d={`M ${RX} 0 A ${RX} ${RY} 0 0 1 ${-RX} 0`} {...ring} strokeOpacity=".7" />
          {PLANETS.map((p, i) => (
            <circle key={`f${i}`} ref={(el) => (frontRefs.current[i] = el)} r={p.r} fill={p.color} style={{ opacity: 0 }} />
          ))}
        </g>
      </motion.svg>
    </span>
  );
}
