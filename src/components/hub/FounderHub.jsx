/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { FiArrowRight, FiFileText } from 'react-icons/fi';
import Counter from '../ui/Counter';
import { yearsOfExperience, publicationCount } from '../../data/site';
import { liveProducts } from '../../data/products';

// Short founder story on the hub — the full profile lives at /aidil/.
function FounderHub() {
  const stats = [
    { n: yearsOfExperience(), s: '+', l: 'tahun pengalaman' },
    { n: liveProducts().length, s: '', l: 'aplikasi live' },
    { n: publicationCount(), s: '', l: 'publikasi ilmiah' },
  ];

  return (
    <section id="founder" className="relative overflow-hidden bg-warmBg py-24 text-warmInk md:py-32">
      <div className="container mx-auto max-w-[1100px] px-6">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-5"
          >
            <div className="relative mx-auto w-60 sm:w-72 md:w-full md:max-w-sm">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-warmPeachSoft to-warmSkySoft" />
              <img
                src="/FAidil.png"
                alt="Aidil Saputra Kirsan"
                loading="lazy"
                className="relative aspect-[4/5] w-full rounded-[1.75rem] object-cover shadow-soft-lg ring-1 ring-warmLine"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="md:col-span-7"
          >
            <span className="font-body text-sm font-semibold uppercase tracking-widest text-warmPeach">Founder</span>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">Dibangun dari masalah yang dialami sendiri.</h2>
            <p className="mt-5 font-body text-lg leading-relaxed text-warmMuted">
              Myst Tech dirintis oleh <span className="font-semibold text-warmInk">Aidil Saputra Kirsan</span> — dosen Sistem Informasi di
              Institut Teknologi Kalimantan, Kepala Laboratorium Inovasi Digital FSTI, sekaligus Ketua RT di Balikpapan.
            </p>
            <p className="mt-4 font-body leading-relaxed text-warmMuted">
              Mengoreksi ratusan jawaban tiap minggu melahirkan Asdos-AI. Membimbing skripsi melahirkan SkripsiPintar.
              Mengurus administrasi warga melahirkan Sistem Manajemen RT.
            </p>

            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              {stats.map((x) => (
                <div key={x.l}>
                  <div className="font-display text-3xl font-bold text-warmInk">
                    <Counter to={x.n} suffix={x.s} />
                  </div>
                  <div className="font-body text-sm text-warmMuted">{x.l}</div>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <motion.a
                href="/aidil/"
                whileHover={{ y: -3 }}
                className="group inline-flex items-center gap-2 rounded-full bg-warmInk px-6 py-3 font-body font-semibold text-warmBg shadow-soft"
              >
                Profil, riset & publikasi <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </motion.a>
              <motion.button
                type="button"
                whileHover={{ y: -3 }}
                onClick={() => window.dispatchEvent(new CustomEvent('open-cv'))}
                className="inline-flex items-center gap-2 rounded-full border border-warmLine bg-warmCard px-6 py-3 font-body font-semibold text-warmInk hover:border-warmPeach hover:text-warmPeach"
              >
                <FiFileText /> Unduh CV
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default FounderHub;
