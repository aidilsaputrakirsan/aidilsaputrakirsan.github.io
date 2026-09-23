/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiLayers, FiUserCheck, FiActivity, FiShield, FiInfo } from 'react-icons/fi';
import { productIcon } from './productIcons';
import { productsData, mystCore } from '../../data/products';

const coreApps = productsData.filter((p) => p.poweredByCore);

const principles = [
  {
    Icon: FiLayers,
    title: 'Aplikasi meminta tier, bukan nama model',
    desc: 'Mengganti model di belakang layar tidak menyentuh satu baris pun kode fitur.',
  },
  {
    Icon: FiUserCheck,
    title: 'Setiap output adalah draf',
    desc: 'Tidak ada jalur dari jawaban AI ke keputusan final tanpa manusia di antaranya.',
  },
  {
    Icon: FiActivity,
    title: 'Pemakaian tercatat, tanpa mengganggu',
    desc: 'Setiap panggilan dicatat per fitur — dan kegagalan mencatat tidak pernah menggagalkan jawaban.',
  },
  {
    Icon: FiShield,
    title: 'Sandbox tanpa jaringan',
    desc: 'Mode uji yang tidak menyentuh mesin AI sama sekali, untuk pengembangan yang aman.',
  },
];

// Animated dashed connector — horizontal on desktop, vertical on mobile.
function Flow({ color = 'rgb(var(--warm-peach))' }) {
  return (
    <div className="flex items-center justify-center py-2 lg:px-2 lg:py-0" aria-hidden="true">
      <div
        className="h-10 w-[3px] animate-flow-y rounded-full lg:hidden"
        style={{ backgroundImage: `linear-gradient(to bottom, ${color} 50%, transparent 50%)`, backgroundSize: '3px 12px' }}
      />
      <div
        className="hidden h-[3px] w-full min-w-[64px] animate-flow-x rounded-full lg:block"
        style={{ backgroundImage: `linear-gradient(to right, ${color} 50%, transparent 50%)`, backgroundSize: '12px 3px' }}
      />
    </div>
  );
}

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
};

function CoreHub() {
  return (
    <section id="core" className="relative overflow-hidden bg-warmCard py-24 text-warmInk md:py-32">
      <div className="container mx-auto max-w-[1200px] px-6">
        <motion.div {...reveal} transition={{ duration: 0.6 }} className="max-w-2xl">
          <span className="font-body text-sm font-semibold uppercase tracking-widest text-warmPeach">Di balik layar</span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Myst-Core: satu lapisan AI untuk semua aplikasi.
          </h2>
          <p className="mt-5 font-body text-lg leading-relaxed text-warmMuted">
            Aplikasi Myst Tech tidak berbicara langsung dengan mesin AI mana pun. Semuanya lewat Myst-Core —
            gateway privat yang mengatur pemilihan model, prompt, pencatatan pemakaian, dan mode uji.
          </p>
        </motion.div>

        {/* Architecture diagram */}
        <div className="mt-14 grid grid-cols-1 items-stretch lg:grid-cols-[1fr_auto_1.3fr_auto_1fr]">
          {/* Apps */}
          <motion.div {...reveal} transition={{ duration: 0.5 }} className="rounded-3xl border border-warmLine bg-warmBg p-6">
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-warmMuted">Aplikasi</p>
            <ul className="mt-4 space-y-2.5">
              {coreApps.map((p) => {
                const Icon = productIcon(p.icon);
                return (
                  <li key={p.id} className="flex items-center gap-3 rounded-2xl bg-warmCard px-3 py-2.5 shadow-soft">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl text-white" style={{ background: p.color }}>
                      <Icon />
                    </span>
                    <span className="font-body text-sm font-semibold">{p.title}</span>
                    {p.status !== 'live' && <span className="ml-auto font-body text-[10px] uppercase tracking-wide text-warmMuted">segera</span>}
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 font-body text-xs leading-relaxed text-warmMuted">
              <code className="rounded bg-warmCard px-1 py-0.5 text-[11px]">MystCore::context(…)-&gt;chat()</code>
            </p>
          </motion.div>

          <Flow />

          {/* The core */}
          <motion.div
            {...reveal}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative overflow-hidden rounded-3xl bg-warmInk p-6 text-warmBg shadow-soft-lg md:p-7"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-warmPeach opacity-40 blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3">
                <span className="relative inline-flex h-10 w-10 items-center justify-center">
                  <span className="absolute inset-0 animate-ping rounded-full bg-warmPeach opacity-30" />
                  <span className="relative h-6 w-6 rounded-full bg-warmPeach" />
                </span>
                <div>
                  <p className="font-display text-xl font-bold">Myst-Core</p>
                  <p className="font-body text-xs opacity-70">gateway · perutean tier · metering</p>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                {mystCore.tiers.map((t) => (
                  <div key={t.id} className="flex items-center justify-between gap-3 rounded-2xl bg-warmBg/10 px-4 py-2.5">
                    <code className="font-mono text-sm font-semibold text-warmPeach">{t.id}</code>
                    <span className="text-right font-body text-xs opacity-80">{t.desc}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {mystCore.capabilities.map((c) => (
                  <span key={c} className="rounded-full border border-warmBg/20 px-2.5 py-1 font-body text-[11px] font-medium opacity-90">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <Flow color="rgb(var(--warm-muted))" />

          {/* Inference engines — deliberately unnamed */}
          <motion.div {...reveal} transition={{ duration: 0.5, delay: 0.2 }} className="rounded-3xl border border-warmLine bg-warmBg p-6">
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-warmMuted">Mesin inferensi</p>
            <div className="mt-4 space-y-2.5">
              {['Model utama', 'Cadangan', 'Cadangan'].map((m, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 ${i === 0 ? 'bg-warmCard shadow-soft' : 'border border-dashed border-warmLine'}`}
                >
                  <span className={`h-2.5 w-2.5 rounded-full ${i === 0 ? 'bg-emerald-500' : 'bg-warmLine'}`} />
                  <span className="font-body text-sm font-semibold">{m}</span>
                  <span className="ml-auto font-body text-[10px] uppercase tracking-wide text-warmMuted">{i === 0 ? 'dicoba dulu' : `fallback ${i}`}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 font-body text-xs leading-relaxed text-warmMuted">
              Bila satu mesin penuh, permintaan otomatis pindah ke cadangan berikutnya. Susunan mesin adalah detail operasional yang tidak dipublikasikan.
            </p>
          </motion.div>
        </div>

        {/* Principles */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              {...reveal}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="rounded-3xl border border-warmLine bg-warmBg p-6"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-warmPeachSoft text-lg text-warmPeach">
                <Icon />
              </span>
              <h3 className="mt-4 font-display text-base font-bold leading-snug">{title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-warmMuted">{desc}</p>
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
              <span className="font-semibold text-warmInk">Yang tidak kami klaim:</span> Myst-Core bukan model bahasa yang kami latih sendiri —
              ia platform inferensi di atas mesin model.
            </span>
          </p>
          <a
            href={mystCore.docsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-warmInk px-5 py-2.5 font-body text-sm font-semibold text-warmBg transition-transform hover:-translate-y-0.5 sm:self-auto"
          >
            Dokumentasi Myst-Core <FiArrowUpRight />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default CoreHub;
