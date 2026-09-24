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

  useEffect(() => {
    let cancelled = false;
    let scene = null;
    const start = () =>
      import('./createOrbitScene')
        .then(({ createOrbitScene }) => {
          if (cancelled || !stageRef.current) return;
          scene = createOrbitScene(stageRef.current, {
            products,
            labels: labelRefs.current,
            coreLabel: coreLabelRef.current,
            reduceMotion: !!reduce,
            onHover: setActive,
            onSelect: (i) => {
              const p = products[i];
              if (p?.url) window.open(p.url, '_blank', 'noopener');
            },
          });
          sceneRef.current = scene;
          setReady(true);
        })
        .catch(() => {
          /* no WebGL — keep the static fallback */
        });

    // Let the page paint first, then pull in three.js
    const idle = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 200));
    const handle = idle(start);
    return () => {
      cancelled = true;
      window.cancelIdleCallback?.(handle);
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

  // Static layout for the fallback: products spread on an ellipse
  const fallbackPos = (i) => {
    const a = (i / products.length) * Math.PI * 2 - Math.PI / 2;
    return { left: `${50 + Math.cos(a) * 38}%`, top: `${52 + Math.sin(a) * 30}%` };
  };

  const current = products[active];

  return (
    <div className="relative h-[340px] w-full sm:h-[460px] lg:h-[540px]">
      {/* 3D stage */}
      <div ref={stageRef} className="absolute inset-0" />

      {/* Static fallback visual (fades out once WebGL is up) */}
      <AnimatePresence>
        {!ready && (
          <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute left-1/2 top-[52%] h-[60%] w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-warmMuted/30" />
            <div className="absolute left-1/2 top-[52%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-warmPeach to-[#f3b08f] shadow-soft-lg sm:h-36 sm:w-36" />
            {products.map((p, i) => (
              <span
                key={p.id}
                className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-soft"
                style={{ ...fallbackPos(i), background: p.color, opacity: p.status === 'live' ? 1 : 0.5 }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Core label — centered under the core (moved by the scene once ready) */}
      <div
        ref={coreLabelRef}
        style={ready ? { left: 0, top: 0 } : { left: '50%', top: '52%', transform: 'translate(-50%, 4.5rem)' }}
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
        const style = ready ? { left: 0, top: 0, ...ring } : { ...fallbackPos(i), transform: 'translate(-50%, -140%)', ...ring };
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

export default MystOrbit;
