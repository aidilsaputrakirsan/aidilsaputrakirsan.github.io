/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight, FiCheck, FiImage, FiMessageCircle } from 'react-icons/fi';
import TiltCard from '../ui/TiltCard';
import { productIcon } from './productIcons';
import { productsData, audiences } from '../../data/products';
import { useLang } from '../../i18n/LangContext';

// Only show filter pills for audiences that actually have a product
const usedAudiences = audiences.filter((a) => a.id === 'all' || productsData.some((p) => p.audience === a.id));

// Invitation card ("Got a problem worth solving?") — reuses the screenshot frame.
const INVITE = { title: 'Myst Lab', url: '', screenshot: '/images/landing/request.jpg', color: '#C43D2B' };

const hostOf = (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

function StatusBadges({ p, live }) {
  const { t } = useLang();
  return (
    <div className="flex flex-wrap gap-1.5">
      {live ? (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 font-body text-[11px] font-bold text-emerald-700 shadow-sm ring-1 ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:ring-emerald-500/30">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Live
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 font-body text-[11px] font-bold text-amber-700 shadow-sm ring-1 ring-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:ring-amber-500/30">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> {t({ en: 'In development', id: 'Sedang dibangun' })}
        </span>
      )}
    </div>
  );
}

// Header with the app's real landing page inside a browser frame.
// Hovering the card slowly scrolls the screenshot, like previewing the site.
// `badge` replaces the Live/In-development pill (used by the invitation card).
function ScreenshotHeader({ p, live, badge }) {
  const { t } = useLang();
  return (
    <div className="relative">
      <div
        className="relative h-52 overflow-hidden border-b border-warmLine"
        style={{ background: `linear-gradient(135deg, ${p.color}22, transparent)` }}
      >
        {/* browser chrome */}
        <div className="relative z-10 flex h-8 items-center gap-1.5 border-b border-warmLine bg-warmCard/95 px-3 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
          <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
          <span className="h-2 w-2 rounded-full bg-[#28C840]" />
          <span className="ml-2 truncate rounded-full bg-warmBg px-3 py-0.5 font-body text-[10px] font-medium text-warmMuted">
            {p.url ? hostOf(p.url) : 'myst-tech.com'}
          </span>
        </div>
        {/* Full-width preview (optional `screenshotZoom` zooms into the centre for
            pages whose content is a narrow centred column); hover scrolls down. */}
        <div className="relative h-[calc(100%-2rem)] overflow-hidden">
          <img
            src={p.screenshot}
            alt={t({ en: `${p.title} landing page`, id: `Halaman depan ${p.title}` })}
            loading="lazy"
            style={{ width: `${(p.screenshotZoom ?? 1) * 100}%` }}
            className="absolute left-1/2 top-0 max-w-none -translate-x-1/2 transition-transform duration-[2600ms] ease-in-out group-hover:-translate-y-[calc(100%-10rem)]"
          />
        </div>
        {/* soft fade into the card body */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-warmCard to-transparent" />
        <div className="absolute bottom-3 right-3 z-10">
          {badge ?? <StatusBadges p={p} live={live} />}
        </div>
      </div>
    </div>
  );
}

// Fallback header when there is no screenshot yet: brand panel + floating icon.
function IconHeader({ p, live, Icon }) {
  return (
    <div
      className="relative flex h-52 items-end justify-center overflow-hidden pb-9"
      style={{ background: `linear-gradient(135deg, ${p.color}26, ${p.color}0d 60%, transparent)` }}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-40 blur-2xl" style={{ background: p.color }} />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: `radial-gradient(${p.color} 1px, transparent 1px)`, backgroundSize: '18px 18px' }}
      />
      <div
        style={{ background: p.color, boxShadow: `0 18px 40px -12px ${p.color}aa` }}
        className={`relative flex h-20 w-20 items-center justify-center rounded-[1.4rem] text-white transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-4deg] ${
          live ? '' : 'opacity-70'
        }`}
      >
        <Icon className="text-4xl" />
      </div>
      <div className="absolute left-4 top-4">
        <StatusBadges p={p} live={live} />
      </div>
    </div>
  );
}

function ProductCard({ p, i }) {
  const { t } = useLang();
  const Icon = productIcon(p.icon);
  const live = p.status === 'live' && p.url;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45, delay: Math.min(i, 5) * 0.06 }}
    >
      <TiltCard
        max={5}
        className={`flex flex-col overflow-hidden rounded-3xl border bg-warmCard shadow-soft transition-shadow duration-300 hover:shadow-soft-lg ${
          live ? 'border-warmLine' : 'border-dashed border-warmLine'
        }`}
      >
        {p.screenshot ? <ScreenshotHeader p={p} live={live} /> : <IconHeader p={p} live={live} Icon={Icon} />}

        <div className="flex flex-1 flex-col px-6 pb-6 pt-6">
          <p className="font-body text-[11px] font-semibold uppercase tracking-widest text-warmMuted">
            {t({ en: 'For', id: 'Untuk' })} {t(p.audienceLabel)}
          </p>
          <h3 className="mt-1 font-display text-2xl font-bold tracking-tight">{p.title}</h3>
          <p className="mt-1 font-body text-sm font-semibold" style={{ color: p.color }}>
            {t(p.tagline)}
          </p>
          <p className="mt-3 font-body text-sm leading-relaxed text-warmMuted">{t(p.pitch)}</p>

          {p.features.length > 0 && (
            <ul className="mt-4 space-y-1.5">
              {p.features.slice(0, 3).map((f) => (
                <li key={f.en} className="flex items-start gap-2 font-body text-sm text-warmInk">
                  <FiCheck className="mt-0.5 shrink-0" style={{ color: p.color }} /> {t(f)}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
            {live ? (
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                style={{ background: p.color }}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-body text-sm font-semibold text-white shadow-soft transition-transform hover:-translate-y-0.5"
              >
                {t({ en: 'Open app', id: 'Buka aplikasi' })} <FiArrowUpRight />
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-warmLine px-5 py-2.5 font-body text-sm font-semibold text-warmMuted">
                {t({ en: 'Coming soon', id: 'Segera hadir' })}
              </span>
            )}
            {p.poster && (
              <a
                href={p.poster}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-2.5 font-body text-sm font-semibold text-warmMuted transition-colors hover:text-warmInk"
              >
                <FiImage /> Poster
              </a>
            )}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

function ProductsHub() {
  const { t } = useLang();
  const [filter, setFilter] = useState('all');
  const list = filter === 'all' ? productsData : productsData.filter((p) => p.audience === filter);

  return (
    <section id="produk" className="relative overflow-hidden bg-warmBg py-24 text-warmInk md:py-32">
      <div className="container mx-auto max-w-[1200px] px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="max-w-lg"
          >
            <span className="font-body text-sm font-semibold uppercase tracking-widest text-warmPeach">{t({ en: 'Apps', id: 'Aplikasi' })}</span>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
              {t({ en: 'Pick the one for your role.', id: 'Pilih sesuai peran Anda.' })}
            </h2>
            <p className="mt-3 font-body leading-relaxed text-warmMuted">
              {t({
                en: 'Every app was born from a real problem — in the classroom, in thesis supervision, and in the neighborhood. All free to try.',
                id: 'Setiap aplikasi lahir dari masalah nyata — di kelas, di ruang bimbingan, dan di lingkungan RT. Semuanya bisa dicoba gratis.',
              })}
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-1 md:justify-end" role="tablist" aria-label={t({ en: 'Filter by audience', id: 'Filter berdasarkan pengguna' })}>
            {usedAudiences.map((a) => {
              const on = filter === a.id;
              return (
                <button
                  key={a.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setFilter(a.id)}
                  className={`relative rounded-full px-3.5 py-2 font-body text-sm font-semibold transition-colors ${on ? 'text-warmBg' : 'text-warmMuted hover:text-warmInk'}`}
                >
                  {on && <motion.span layoutId="audPill" className="absolute inset-0 rounded-full bg-warmInk" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                  <span className="relative z-10">{t(a.name)}</span>
                </button>
              );
            })}
          </div>
        </div>

        <motion.div layout className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <ProductCard key={p.id} p={p} i={i} />
            ))}
          </AnimatePresence>

          {/* Invitation card — fills the grid and opens a conversation */}
          {filter === 'all' && (
            <motion.a
              layout
              href="#kontak"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-dashed border-warmLine bg-warmCard shadow-soft transition-colors hover:border-warmPeach"
            >
              <ScreenshotHeader
                p={INVITE}
                badge={
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-warmPeachSoft px-2.5 py-1 font-body text-[11px] font-bold text-warmPeach shadow-sm">
                    <FiMessageCircle /> {t({ en: 'Free consultation', id: 'Konsultasi gratis' })}
                  </span>
                }
              />
              <div className="flex flex-1 flex-col px-6 pb-6 pt-6">
                <h3 className="font-display text-xl font-bold">{t({ en: 'Got a problem worth solving?', id: 'Punya masalah yang ingin diselesaikan?' })}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-warmMuted">
                  {t({
                    en: 'Does your school, campus, or community need a tool like these? Tell us — the next app could start there.',
                    id: 'Sekolah, kampus, atau komunitas Anda butuh alat serupa? Ceritakan — aplikasi berikutnya bisa lahir dari situ.',
                  })}
                </p>
                <span className="mt-auto inline-flex items-center gap-1 pt-5 font-body text-sm font-semibold text-warmPeach">
                  {t({ en: 'Get in touch', id: 'Hubungi kami' })}{' '}
                  <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </motion.a>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default ProductsHub;
