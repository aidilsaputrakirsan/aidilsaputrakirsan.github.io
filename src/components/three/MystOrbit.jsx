/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { productIcon } from '../hub/productIcons';
import { useLang } from '../../i18n/LangContext';

// Interactive 3D orbit of every Myst product around Myst-Core.
// three.js is loaded lazily (separate chunk) after first paint. Until it is
// ready — or if WebGL is unavailable — a static CSS version of the same
// layout is shown, so the hero never looks empty.
function MystOrbit({ products }) {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const stageRef = useRef(null);
  const labelRefs = useRef([]);
  const coreLabelRef = useRef(null);
  const sceneRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(-1);
  const [touch] = useState(() => typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches);
  const [small] = useState(() => typeof window !== 'undefined' && window.innerWidth < 560); // ≈ the scene's 520px stage cutoff

  useEffect(() => {
    let cancelled = false;
    let scene = null;
    let handle = null;
    // Start downloading three.js right away (in parallel with the rest of the
    // page), but only build the scene once the browser has a quiet moment —
    // capped so a busy hero (marquee, Framer Motion) can't postpone it for long.
    const load = import('./createOrbitScene');
    const idle = window.requestIdleCallback
      ? (cb) => window.requestIdleCallback(cb, { timeout: 400 })
      : (cb) => setTimeout(cb, 50);
    const build = ({ createOrbitScene }) => {
      if (cancelled || !stageRef.current) return;
      try {
        scene = createOrbitScene(stageRef.current, {
          products,
          labels: labelRefs.current,
          coreLabel: coreLabelRef.current,
          reduceMotion: !!reduce,
          animateIn: false, // the static preview already shows the layout
          onHover: setActive,
          onSelect: (i) => {
            const p = products[i];
            if (p?.url) window.open(p.url, '_blank', 'noopener');
          },
        });
      } catch {
        return; // no WebGL — keep the static fallback
      }
      sceneRef.current = scene;
      setReady(true);
    };
    load
      .then((mod) => {
        if (!cancelled) handle = idle(() => build(mod));
      })
      .catch(() => {
        /* chunk failed to load — keep the static fallback */
      });

    return () => {
      cancelled = true;
      if (handle !== null) (window.cancelIdleCallback ?? clearTimeout)(handle);
      scene?.dispose();
      sceneRef.current = null;
    };
  }, [products, reduce]);

  // Re-render once React has swapped the labels to scene positioning
  // (matters under reduced motion, where the loop stops after one frame).
  useEffect(() => {
    if (ready) sceneRef.current?.highlight(-1);
  }, [ready]);

  const highlight = (i) => {
    setActive(i);
    sceneRef.current?.highlight(i);
  };

  const fallback = fallbackLayout(products, small);
  const at = (i) => ({ left: `calc(50% + ${fallback.pos[i].x}cqw)`, top: `calc(50% + ${fallback.pos[i].y}cqw)` });

  const current = products[active];

  return (
    <div className="relative h-[340px] w-full sm:h-[460px] lg:h-[540px]" style={{ containerType: 'inline-size' }}>
      {/* 3D stage (fades in over the static preview once built) */}
      <div ref={stageRef} className={`absolute inset-0 transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`} />

      {/* Static fallback visual (fades out once WebGL is up) */}
      <AnimatePresence>
        {!ready && (
          <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="pointer-events-none absolute inset-0" aria-hidden="true">
            {fallback.rings.map((r) => (
              <div
                key={r.radius}
                className="absolute left-1/2 top-1/2 rounded-[50%] border border-warmMuted/35"
                style={{ width: `${r.w}cqw`, height: `${r.h}cqw`, transform: `translate(-50%, calc(-50% + ${r.dy}cqw)) rotate(${r.rot}rad)` }}
              />
            ))}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-soft-lg"
              style={{ width: `${fallback.core}cqw`, height: `${fallback.core}cqw`, background: sphere('rgb(var(--warm-peach))') }}
            />
            {products.map((p, i) => (
              <span
                key={p.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full shadow-soft"
                style={{ ...at(i), width: `${fallback.planet}cqw`, height: `${fallback.planet}cqw`, background: sphere(p.color), opacity: p.status === 'live' ? 1 : 0.55 }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Core label — centered under the core (moved by the scene once ready) */}
      <div
        ref={coreLabelRef}
        style={ready ? { left: 0, top: 0 } : { left: '50%', top: `calc(50% + ${fallback.core / 2}cqw)`, transform: 'translate(-50%, 0.4rem)' }}
        className="pointer-events-none absolute"
      >
        <span className="rounded-full bg-warmCard/80 px-3 py-1 font-display text-xs font-bold tracking-wide text-warmInk shadow-soft ring-1 ring-warmLine backdrop-blur">
          Myst-Core
        </span>
      </div>

      {/* Product labels — positioned by the 3D scene every frame */}
      {products.map((p, i) => {
        const Icon = productIcon(p.icon);
        const live = p.status === 'live' && p.url;
        const Tag = live ? 'a' : 'span';
        const ring = active === i ? { '--tw-ring-color': p.color } : {};
        const style = ready ? { left: 0, top: 0, ...ring } : { ...at(i), transform: `translate(-50%, calc(-100% - ${fallback.planet * 0.6}cqw))`, ...ring };
        return (
          <Tag
            key={p.id}
            ref={(el) => (labelRefs.current[i] = el)}
            href={live ? p.url : undefined}
            target={live ? '_blank' : undefined}
            rel={live ? 'noreferrer' : undefined}
            onMouseEnter={() => highlight(i)}
            onMouseLeave={() => highlight(-1)}
            onFocus={() => highlight(i)}
            onBlur={() => highlight(-1)}
            style={style}
            className={`absolute inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-warmCard/90 px-2 py-0.5 font-body text-[10px] font-semibold sm:px-2.5 sm:py-1 text-warmInk shadow-soft ring-1 backdrop-blur transition-[box-shadow] duration-300 sm:text-xs ${
              active === i ? 'ring-2' : 'ring-warmLine'
            } ${live ? 'cursor-pointer' : 'cursor-default'}`}
          >
            <Icon style={{ color: p.color }} className="text-sm" />
            {p.title}
            {!live && <span className="rounded-full bg-warmBg px-1.5 text-[9px] uppercase tracking-wide text-warmMuted">{t({ en: 'soon', id: 'segera' })}</span>}
          </Tag>
        );
      })}

      {/* Info card for the hovered product */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center px-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current ? current.id : 'hint'}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="max-w-sm rounded-2xl bg-warmCard/90 px-4 py-2.5 text-center shadow-soft ring-1 ring-warmLine backdrop-blur"
          >
            {current ? (
              <>
                <div className="font-display text-sm font-bold" style={{ color: current.color }}>
                  {current.title}
                </div>
                <div className="font-body text-xs text-warmMuted">
                  {t(current.tagline)}
                  {current.status === 'live' && current.url && (
                    <span className="ml-1 inline-flex items-center font-semibold text-warmInk">
                      · {t({ en: 'click to open', id: 'klik untuk membuka' })} <FiArrowUpRight />
                    </span>
                  )}
                </div>
              </>
            ) : (
              <div className="font-body text-xs text-warmMuted">
                {touch
                  ? t({ en: 'Tap an app name to open it.', id: 'Ketuk nama aplikasi untuk membukanya.' })
                  : t({ en: 'Hover a planet to see its app — click to open.', id: 'Arahkan ke sebuah planet untuk melihat aplikasinya — klik untuk membuka.' })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Static preview that mirrors the 3D scene's first frame (same rings, tilts and
// start angles as createOrbitScene.js), so swapping to WebGL is a soft
// cross-fade instead of a jump. Units are cqw (% of the stage width).
// Phones get their own numbers: the scene frames the orbit tighter there.
//   scale: cqw at the outer ring's radius (≈ the camera framing)
//   view:  the camera looks down ~30°, so rings flatten
//   drop:  perspective makes the near half bigger, so rings sit a bit lower
const FRAMING = {
  wide: { scale: 37, view: 0.62, drop: 0.18, planet: 0.76 },
  small: { scale: 43, view: 0.6, drop: 0.23, planet: 0.85 },
};

function fallbackLayout(products, small) {
  const { scale: SCALE, view: VIEW, drop: DROP, planet } = FRAMING[small ? 'small' : 'wide'];
  const inner = products.filter((p) => p.poweredByCore);
  const outer = products.filter((p) => !p.poweredByCore);
  const outerRadius = outer.length ? 4.1 : 3.0;
  const k = SCALE / outerRadius;
  const rings = [
    { radius: 3.0, tilt: 0.12, items: inner },
    { radius: 4.1, tilt: -0.16, items: outer },
  ].filter((r) => r.items.length);
  const pos = [];
  rings.forEach((ring, n) => {
    const rot = -ring.tilt; // three.js +z rotation = counter-clockwise on screen
    ring.items.forEach((product, i) => {
      const a = (i / ring.items.length) * Math.PI * 2 + (n === 0 ? 0.4 : 1.2);
      const x = Math.cos(a) * ring.radius * k;
      const y = Math.sin(a) * ring.radius * k * VIEW;
      pos[products.indexOf(product)] = {
        x: x * Math.cos(rot) - y * Math.sin(rot),
        y: x * Math.sin(rot) + y * Math.cos(rot) + ring.radius * k * DROP,
      };
    });
  });
  return {
    pos,
    rings: rings.map((r) => ({ radius: r.radius, w: 2 * r.radius * k, h: 2 * r.radius * k * VIEW, dy: r.radius * k * DROP, rot: -r.tilt })),
    core: 2 * k,
    planet: planet * k,
  };
}

// Lit-sphere look in plain CSS (highlight top-left, shade bottom-right)
const sphere = (color) =>
  `radial-gradient(circle at 34% 30%, color-mix(in srgb, ${color} 45%, white) 0%, ${color} 42%, color-mix(in srgb, ${color} 65%, black) 100%)`;

export default MystOrbit;
