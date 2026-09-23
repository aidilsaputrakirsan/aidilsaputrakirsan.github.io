/* eslint-disable no-unused-vars */
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FiArrowDownRight, FiCpu, FiArrowUpRight } from 'react-icons/fi';
import Marquee from '../ui/Marquee';
import MystOrbit from '../three/MystOrbit';
import { productIcon } from './productIcons';
import { productsData, liveProducts, buildingProducts } from '../../data/products';

// Hub hero: headline + quick launcher on the left, 3D Myst Orbit on the right.
function HeroHub() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yBlobA = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -100]);
  const yBlobB = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);

  const live = liveProducts();
  const building = buildingProducts();

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  const marqueeItems = productsData.map((p) => {
    const Icon = productIcon(p.icon);
    return (
      <span key={p.id} className="inline-flex items-center gap-3">
        <Icon style={{ color: p.color }} className="text-2xl" />
        {p.title}
        <span className="font-body text-base font-medium text-warmMuted">{p.tagline}</span>
      </span>
    );
  });

  return (
    <section ref={ref} id="hero" className="relative flex min-h-screen items-center overflow-hidden bg-warmBg text-warmInk">
      <motion.div
        style={{ y: yBlobA }}
        animate={reduce ? {} : { scale: [1, 1.15, 1], x: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -left-24 -top-32 h-[460px] w-[460px] rounded-full bg-warmPeachSoft opacity-70 blur-3xl"
      />
      <motion.div
        style={{ y: yBlobB }}
        animate={reduce ? {} : { scale: [1, 1.2, 1], x: [0, -40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -right-28 top-1/3 h-[520px] w-[520px] rounded-full bg-warmSkySoft opacity-60 blur-3xl"
      />
      <div
        className="pointer-events-none absolute inset-0 text-warmInk opacity-[0.06]"
        style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />

      <div className="container relative z-10 mx-auto max-w-[1240px] px-6 pb-28 pt-28 lg:pb-24">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-4">
          {/* Copy */}
          <motion.div variants={container} initial="hidden" animate="show" className="lg:col-span-6">
            <motion.span
              variants={item}
              className="inline-flex items-center gap-2 rounded-full border border-warmLine bg-warmCard/70 px-4 py-1.5 font-body text-sm font-medium text-warmMuted shadow-soft backdrop-blur"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              {live.length} aplikasi live{building.length > 0 && ` · ${building.length} segera hadir`}
            </motion.span>

            <motion.h1
              variants={item}
              className="mt-6 font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.1rem]"
            >
              Satu pintu ke semua aplikasi{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Myst Tech.</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.9, duration: 0.6, ease: 'easeOut' }}
                  style={{ originX: 0 }}
                  className="absolute inset-x-0 bottom-1 z-0 h-3 -rotate-1 bg-warmPeach/30"
                />
              </span>
            </motion.h1>

            <motion.p variants={item} className="mt-6 max-w-xl font-body text-lg leading-relaxed text-warmMuted md:text-xl">
              Asisten AI untuk guru, dosen, mahasiswa, dan pengurus RT — dibangun di Balikpapan,
              ditenagai satu lapisan AI yang sama: <span className="font-semibold text-warmInk">Myst-Core</span>.
              AI menyiapkan draf, keputusan tetap di tangan Anda.
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
              <motion.a
                href="#produk"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-2 rounded-full bg-warmInk px-7 py-3.5 font-body font-semibold text-warmBg shadow-soft hover:shadow-soft-lg"
              >
                Jelajahi aplikasi
                <FiArrowDownRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </motion.a>
              <motion.a
                href="#core"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full border border-warmLine bg-warmCard px-7 py-3.5 font-body font-semibold text-warmInk hover:border-warmPeach hover:text-warmPeach"
              >
                <FiCpu /> Cara kerja AI kami
              </motion.a>
            </motion.div>

            {/* Quick launcher — returning users jump straight in */}
            <motion.div variants={item} className="mt-10">
              <p className="font-body text-xs font-semibold uppercase tracking-widest text-warmMuted">Langsung buka</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {live.map((p) => {
                  const Icon = productIcon(p.icon);
                  return (
                    <a
                      key={p.id}
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full border border-warmLine bg-warmCard py-1.5 pl-1.5 pr-3.5 font-body text-sm font-semibold text-warmInk shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-soft-lg"
                    >
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full text-white" style={{ background: p.color }}>
                        <Icon className="text-sm" />
                      </span>
                      {p.title}
                      <FiArrowUpRight className="text-warmMuted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* 3D orbit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="-mx-4 lg:col-span-6 lg:-mr-12 lg:ml-0"
          >
            <MystOrbit products={productsData} />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-y border-warmLine bg-warmCard/60 py-4 backdrop-blur">
        <Marquee items={marqueeItems} speed={44} />
      </div>
    </section>
  );
}

export default HeroHub;
