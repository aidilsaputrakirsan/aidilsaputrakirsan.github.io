/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { FiArrowUpRight, FiLayers, FiUserCheck, FiActivity, FiShield, FiInfo } from 'react-icons/fi';
import { productIcon } from './productIcons';
import { productsData, mystCore } from '../../data/products';
import { useLang } from '../../i18n/LangContext';
import MystMark from '../ui/MystMark';

const coreApps = productsData.filter((p) => p.poweredByCore);

const principles = [
  {
    Icon: FiLayers,
    title: { en: 'Apps ask for a tier, not a model name', id: 'Aplikasi meminta tier, bukan nama model' },
    desc: {
      en: 'Swapping the model behind the scenes never touches a single line of feature code.',
      id: 'Mengganti model di belakang layar tidak menyentuh satu baris pun kode fitur.',
    },
  },
  {
    Icon: FiUserCheck,
    title: { en: 'Every output is a draft', id: 'Setiap output adalah draf' },
    desc: {
      en: "There is no path from an AI answer to a final decision without a human in between.",
      id: 'Tidak ada jalur dari jawaban AI ke keputusan final tanpa manusia di antaranya.',
    },
  },
  {
    Icon: FiActivity,
    title: { en: 'Usage is metered, never in the way', id: 'Pemakaian tercatat, tanpa mengganggu' },
    desc: {
      en: 'Every call is logged per feature — and a failed log never fails the answer.',
      id: 'Setiap panggilan dicatat per fitur — dan kegagalan mencatat tidak pernah menggagalkan jawaban.',
    },
  },
  {
    Icon: FiShield,
    title: { en: 'Offline sandbox', id: 'Sandbox tanpa jaringan' },
    desc: {
      en: 'A test mode that never touches an AI engine — for safe development.',
      id: 'Mode uji yang tidak menyentuh mesin AI sama sekali, untuk pengembangan yang aman.',
    },
  },
];

// Animated dashed connector — horizontal on desktop, vertical on mobile.
// `packet` (a request id) sends one dot along it in `packetColor`; transform-only.
function Flow({ color = 'rgb(var(--warm-peach))', packet = null, packetColor }) {
  const dot = { background: packetColor || color, boxShadow: `0 0 0 4px ${packetColor || color}33` };
  return (
    <div className="flex items-center justify-center py-2 lg:px-2 lg:py-0" aria-hidden="true">
      <div className="relative lg:hidden">
        <div
          className="h-10 w-[3px] animate-flow-y rounded-full"
          style={{ backgroundImage: `linear-gradient(to bottom, ${color} 50%, transparent 50%)`, backgroundSize: '3px 12px' }}
        />
        {packet !== null && (
          <motion.span key={packet} className="absolute inset-0" initial={{ y: '-100%' }} animate={{ y: '0%' }} transition={{ duration: 0.6, ease: 'easeInOut' }}>
            <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full" style={dot} />
          </motion.span>
        )}
      </div>
      <div className="relative hidden w-full min-w-[64px] overflow-visible lg:block">
        <div
          className="h-[3px] w-full animate-flow-x rounded-full"
          style={{ backgroundImage: `linear-gradient(to right, ${color} 50%, transparent 50%)`, backgroundSize: '12px 3px' }}
        />
        {packet !== null && (
          <motion.span key={packet} className="absolute inset-0" initial={{ x: '-100%' }} animate={{ x: '0%' }} transition={{ duration: 0.6, ease: 'easeInOut' }}>
            <span className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full" style={dot} />
          </motion.span>
        )}
      </div>
    </div>
  );
}

// ---- Live request illustration -------------------------------------------
// One simulated request per cycle: an app sends it → Myst-Core picks a tier →
// the primary engine answers (every 4th request it is "at capacity" and the
// request moves to fallback 1). Illustrative only — no real traffic or numbers.
const VISIBLE_APPS = 4;
const liveCoreApps = coreApps.filter((p) => p.status === 'live');

function pickTier(app, n) {
  const vision = (app.technologies || []).some((x) => /vision|ocr/i.test(x));
  if (vision && n % 2 === 1) return 'core-vision';
  return n % 3 === 2 ? 'core-light' : 'core-text';
}

// phase timeline (ms from the start of a request)
const T = { route: 650, infer: 1300, busy: 1300, fallback: 2000, done: 2100, doneFallback: 2800, next: 3400, nextFallback: 4100 };

function useCoreSimulation(running) {
  const [req, setReq] = useState({ n: 0, phase: 'idle' });
  useEffect(() => {
    if (!running || liveCoreApps.length === 0) return undefined;
    const n = req.n;
    const fallback = n % 4 === 3;
    const at = (ms, phase) => setTimeout(() => setReq((r) => (r.n === n ? { ...r, phase } : r)), ms);
    const timers = [
      setTimeout(() => setReq({ n, phase: 'send' }), 0),
      at(T.route, 'route'),
      ...(fallback ? [at(T.busy, 'busy'), at(T.fallback, 'fallback'), at(T.doneFallback, 'done')] : [at(T.infer, 'infer'), at(T.done, 'done')]),
      setTimeout(() => setReq({ n: n + 1, phase: 'send' }), fallback ? T.nextFallback : T.next),
    ];
    return () => timers.forEach(clearTimeout);
  }, [running, req.n]);

  const sender = liveCoreApps[req.n % Math.max(1, liveCoreApps.length)];
  return {
    ...req,
    sender,
    tier: sender ? pickTier(sender, req.n) : null,
    fallback: req.n % 4 === 3,
  };
}

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
};

// Rows shown in the Apps card: at most VISIBLE_APPS; with more apps the list
// rotates so the app sending right now is always the newest (bottom) row.
function visibleApps(sender) {
  if (coreApps.length <= VISIBLE_APPS || !sender) return coreApps.slice(0, VISIBLE_APPS);
  const end = coreApps.indexOf(sender);
  return Array.from({ length: VISIBLE_APPS }, (_, k) => coreApps[(end - (VISIBLE_APPS - 1) + k + coreApps.length) % coreApps.length]);
}

// State of engine row `i` in the current phase: idle | working | busy | done
function engineState({ phase, fallback }, i) {
  if (phase === 'idle' || phase === 'send' || phase === 'route') return 'idle';
  if (i === 0) {
    if (fallback) return 'busy';
    return phase === 'infer' ? 'working' : 'done';
  }
  if (i === 1 && fallback && phase !== 'busy') return phase === 'fallback' ? 'working' : 'done';
  return 'idle';
}

function CoreHub() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const diagramRef = useRef(null);
  const inView = useInView(diagramRef, { margin: '-80px' });
  const sim = useCoreSimulation(inView && !reduce);
  const active = sim.phase !== 'idle';
  const apps = visibleApps(active ? sim.sender : null);

  return (
    <section id="core" className="relative overflow-hidden bg-warmCard py-24 text-warmInk md:py-32">
      <div className="container mx-auto max-w-[1200px] px-6">
        <motion.div {...reveal} transition={{ duration: 0.6 }} className="max-w-2xl">
          <span className="font-body text-sm font-semibold uppercase tracking-widest text-warmPeach">{t({ en: 'Behind the scenes', id: 'Di balik layar' })}</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            {t({ en: 'Myst-Core: one AI layer for every app.', id: 'Myst-Core: satu lapisan AI untuk semua aplikasi.' })}
          </h2>
          <p className="mt-5 font-body text-lg leading-relaxed text-warmMuted">
            {t({
              en: "Myst Tech apps never talk to an AI engine directly. Everything goes through Myst-Core — a private gateway that handles model selection, prompts, usage metering, and test mode.",
              id: 'Aplikasi Myst Tech tidak berbicara langsung dengan mesin AI mana pun. Semuanya lewat Myst-Core — gateway privat yang mengatur pemilihan model, prompt, pencatatan pemakaian, dan mode uji.',
            })}
          </p>
        </motion.div>

        {/* Architecture diagram — animated as one illustrative request per cycle */}
        <p className="mt-12 flex items-center justify-end gap-2 font-body text-xs text-warmMuted">
          <span className={`h-1.5 w-1.5 rounded-full transition-colors ${active ? 'bg-warmPeach' : 'bg-warmLine'}`} />
          {t({ en: 'Illustration of a request flow', id: 'Ilustrasi alur permintaan' })}
        </p>
        <div ref={diagramRef} className="mt-3 grid grid-cols-1 items-stretch lg:grid-cols-[1fr_auto_1.3fr_auto_1fr]">
          {/* Apps */}
          <motion.div {...reveal} transition={{ duration: 0.5 }} className="rounded-3xl border border-warmLine bg-warmBg p-6">
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-warmMuted">{t({ en: 'Apps', id: 'Aplikasi' })}</p>
            <ul className="mt-4 space-y-2.5">
              <AnimatePresence initial={false} mode="popLayout">
                {apps.map((p) => {
                  const Icon = productIcon(p.icon);
                  const sending = active && sim.sender?.id === p.id;
                  return (
                    <motion.li
                      key={p.id}
                      layout
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -18 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-center gap-3 rounded-2xl bg-warmCard px-3 py-2.5 shadow-soft"
                      style={{ boxShadow: sending ? `0 0 0 1.5px ${p.color}` : undefined, transition: 'box-shadow .3s' }}
                    >
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl text-white" style={{ background: p.color }}>
                        <Icon />
                      </span>
                      <span className="font-body text-sm font-semibold">{p.title}</span>
                      {p.status !== 'live' ? (
                        <span className="ml-auto font-body text-[10px] uppercase tracking-wide text-warmMuted">{t({ en: 'soon', id: 'segera' })}</span>
                      ) : (
                        <AnimatePresence>
                          {sending && sim.phase === 'send' && (
                            <motion.span
                              key="send"
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0 }}
                              className="ml-auto font-body text-[10px] font-semibold uppercase tracking-wide"
                              style={{ color: p.color }}
                            >
                              {t({ en: 'sending', id: 'mengirim' })}
                            </motion.span>
                          )}
                          {sending && sim.phase === 'done' && (
                            <motion.span
                              key="done"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0 }}
                              className="ml-auto font-body text-[10px] font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400"
                            >
                              {t({ en: 'answered', id: 'terjawab' })}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      )}
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>
            <p className="mt-4 font-body text-xs leading-relaxed text-warmMuted">
              <code className="rounded bg-warmCard px-1 py-0.5 text-[11px]">
                MystCore::context(<span className="text-warmPeach">{active ? `'${sim.sender.id}'` : '…'}</span>)-&gt;chat()
              </code>
            </p>
          </motion.div>

          <Flow packet={active && sim.phase === 'send' ? sim.n : null} packetColor={sim.sender?.color} />

          {/* The core */}
          <motion.div
            {...reveal}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative overflow-hidden rounded-3xl bg-warmInk p-6 text-warmBg shadow-soft-lg md:p-7"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-warmPeach opacity-40 blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3">
                <MystMark className="h-11 w-11" interactive={false} />
                <div>
                  <p className="font-display text-xl font-bold">Myst-Core</p>
                  <p className="font-body text-xs opacity-70">{t({ en: 'gateway · tier routing · metering', id: 'gateway · perutean tier · metering' })}</p>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                {mystCore.tiers.map((tier) => {
                  const on = active && sim.phase !== 'send' && sim.tier === tier.id;
                  return (
                    <div
                      key={tier.id}
                      className={`relative flex items-center justify-between gap-3 overflow-hidden rounded-2xl px-4 py-2.5 transition-colors duration-300 ${on ? 'bg-warmPeach/20' : 'bg-warmBg/10'}`}
                    >
                      {on && (
                        <motion.span
                          key={sim.n}
                          className="pointer-events-none absolute inset-y-0 left-0 w-full origin-left bg-warmPeach/20"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                        />
                      )}
                      <code className="relative shrink-0 whitespace-nowrap font-mono text-sm font-semibold text-warmPeach">{tier.id}</code>
                      <span className="relative text-right font-body text-xs opacity-80">{t(tier.desc)}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {mystCore.capabilities.map((c) => (
                  <span key={c.en} className="rounded-full border border-warmBg/20 px-2.5 py-1 font-body text-[11px] font-medium opacity-90">
                    {t(c)}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <Flow
            color="rgb(var(--warm-muted))"
            packet={active && ['route', 'busy'].includes(sim.phase) ? `${sim.n}-${sim.phase}` : null}
            packetColor="rgb(var(--warm-peach))"
          />

          {/* Inference engines — deliberately unnamed */}
          <motion.div {...reveal} transition={{ duration: 0.5, delay: 0.2 }} className="rounded-3xl border border-warmLine bg-warmBg p-6">
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-warmMuted">{t({ en: 'Inference engines', id: 'Mesin inferensi' })}</p>
            <div className="mt-4 space-y-2.5">
              {[t({ en: 'Primary model', id: 'Model utama' }), t({ en: 'Backup', id: 'Cadangan' }), t({ en: 'Backup', id: 'Cadangan' })].map((m, i) => {
                const st = engineState(sim, i);
                const label = {
                  idle: i === 0 ? t({ en: 'tried first', id: 'dicoba dulu' }) : `fallback ${i}`,
                  working: t({ en: 'processing', id: 'memproses' }),
                  busy: t({ en: 'at capacity', id: 'penuh' }),
                  done: t({ en: 'done', id: 'selesai' }),
                }[st];
                const dot = { idle: i === 0 ? 'bg-emerald-500' : 'bg-warmLine', working: 'bg-warmPeach', busy: 'bg-amber-500', done: 'bg-emerald-500' }[st];
                const lit = st !== 'idle' || i === 0;
                const ring = st === 'busy' ? 'ring-1 ring-amber-400/60' : st === 'working' ? 'ring-1 ring-warmPeach/60' : '';
                const tone =
                  st === 'busy'
                    ? 'font-semibold text-amber-600 dark:text-amber-400'
                    : st === 'done'
                    ? 'font-semibold text-emerald-600 dark:text-emerald-400'
                    : 'text-warmMuted';
                return (
                  <div
                    key={i}
                    className={`relative flex items-center gap-3 overflow-hidden rounded-2xl border px-3 py-2.5 transition-all duration-300 ${
                      lit ? 'border-transparent bg-warmCard shadow-soft' : 'border-dashed border-warmLine'
                    } ${ring}`}
                  >
                    {st === 'working' && (
                      <motion.span
                        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-warmPeach/15 to-transparent"
                        initial={{ x: '-100%' }}
                        animate={{ x: '300%' }}
                        transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                      />
                    )}
                    <span className={`relative h-2.5 w-2.5 rounded-full transition-colors duration-300 ${dot}`} />
                    <span className="relative font-body text-sm font-semibold">{m}</span>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={label}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className={`relative ml-auto font-body text-[10px] uppercase tracking-wide ${tone}`}
                      >
                        {label}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 font-body text-xs leading-relaxed text-warmMuted">
              {t({
                en: 'When one engine is at capacity, requests move to the next backup automatically. The engine lineup is an operational detail we don’t publish.',
                id: 'Bila satu mesin penuh, permintaan otomatis pindah ke cadangan berikutnya. Susunan mesin adalah detail operasional yang tidak dipublikasikan.',
              })}
            </p>
          </motion.div>
        </div>

        {/* Principles */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title.en}
              {...reveal}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="rounded-3xl border border-warmLine bg-warmBg p-6"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-warmPeachSoft text-lg text-warmPeach">
                <Icon />
              </span>
              <h3 className="mt-4 font-display text-base font-bold leading-snug">{t(title)}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-warmMuted">{t(desc)}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...reveal}
          transition={{ duration: 0.5 }}
          className="mt-10 flex flex-col gap-4 rounded-3xl border border-warmLine bg-warmBg p-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="flex items-start gap-2.5 font-body text-sm leading-relaxed text-warmMuted">
            <FiInfo className="mt-0.5 shrink-0 text-warmPeach" />
            <span>
              <span className="font-semibold text-warmInk">{t({ en: 'What we don’t claim:', id: 'Yang tidak kami klaim:' })}</span>{' '}
              {t({
                en: 'Myst-Core is not a language model we trained ourselves — it is an inference platform on top of model engines.',
                id: 'Myst-Core bukan model bahasa yang kami latih sendiri — ia platform inferensi di atas mesin model.',
              })}
            </span>
          </p>
          <a
            href={mystCore.docsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-warmInk px-5 py-2.5 font-body text-sm font-semibold text-warmBg transition-transform hover:-translate-y-0.5 sm:self-auto"
          >
            {t({ en: 'Myst-Core docs', id: 'Dokumentasi Myst-Core' })} <FiArrowUpRight />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default CoreHub;
