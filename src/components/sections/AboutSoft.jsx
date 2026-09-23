/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { FiCode, FiCpu, FiBookOpen } from 'react-icons/fi';
import { yearsOfExperience, currentProjects } from '../../data/site';
import { useLang } from '../../i18n/LangContext';

const focusAreas = [
  {
    icon: FiCpu,
    title: 'AI Product Engineering',
    desc: {
      en: 'LLM gateways, RAG, vision/OCR and structured output — shipped in products real teachers and students use.',
      id: 'Gateway LLM, RAG, vision/OCR, dan output terstruktur — dipakai langsung oleh guru dan mahasiswa sungguhan.',
    },
    tint: 'bg-warmPeachSoft text-warmPeach',
  },
  {
    icon: FiCode,
    title: 'Full-Stack Development',
    desc: {
      en: 'Laravel, Livewire, Vue & React — multi-tenant SaaS and campus systems, built end to end.',
      id: 'Laravel, Livewire, Vue & React — SaaS multi-tenant dan sistem kampus, dibangun end to end.',
    },
    tint: 'bg-warmSageSoft text-warmSage',
  },
  {
    icon: FiBookOpen,
    title: { en: 'Teaching & Research', id: 'Mengajar & Riset' },
    desc: {
      en: 'Information systems lecturer — IoT & sensor-network research, now applied AI in education.',
      id: 'Dosen sistem informasi — riset IoT & jaringan sensor, kini AI terapan di pendidikan.',
    },
    tint: 'bg-warmSkySoft text-warmSky',
  },
];

const stack = ['Laravel', 'Livewire', 'LLM APIs', 'RAG', 'React', 'Vue.js', 'MySQL', 'PostgreSQL', 'Tailwind', 'Docker'];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

function AboutSoft() {
  const { t } = useLang();
  return (
    <section id="about" className="relative overflow-hidden bg-warmCard py-24 md:py-32 text-warmInk">
      <div className="container mx-auto px-6 max-w-[1100px]">

        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-2xl"
        >
          <span className="font-body text-sm font-semibold uppercase tracking-widest text-warmPeach">
            {t({ en: 'About me', id: 'Tentang saya' })}
          </span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            {t({ en: 'Bridging AI, code, and the classroom.', id: 'Menjembatani AI, kode, dan ruang kelas.' })}
          </h2>
          <p className="mt-5 font-body text-lg text-warmMuted leading-relaxed">
            {t({
              en: `Based in Balikpapan, Indonesia, I combine building AI products with teaching — over ${yearsOfExperience()} years shipping software while inspiring future IT professionals.`,
              id: `Berbasis di Balikpapan, Indonesia, saya memadukan pembuatan produk AI dengan mengajar — lebih dari ${yearsOfExperience()} tahun merilis perangkat lunak sambil menginspirasi calon profesional TI.`,
            })}
            {currentProjects().length > 0 && (
              <>
                {' '}{t({ en: 'Currently working on', id: 'Sedang mengerjakan' })}{' '}
                {currentProjects().map((p, i, arr) => (
                  <span key={p.id}>
                    <span className="font-semibold text-warmInk">{p.title}</span>
                    {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? t({ en: ', and ', id: ', dan ' }) : '.'}
                  </span>
                ))}
              </>
            )}
          </p>
        </motion.div>

        {/* Focus cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {focusAreas.map((f, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-warmLine bg-warmBg p-7 shadow-soft transition-shadow duration-300 hover:shadow-soft-lg"
            >
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${f.tint}`}>
                <f.icon className="text-xl" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold">{t(f.title)}</h3>
              <p className="mt-2 font-body text-warmMuted leading-relaxed">{t(f.desc)}</p>
            </motion.div>
          ))}
        </div>

        {/* Tech stack chips */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-14 flex flex-wrap items-center gap-3"
        >
          <span className="font-body text-sm font-semibold text-warmMuted mr-2">{t({ en: 'Daily stack:', id: 'Stack harian:' })}</span>
          {stack.map((s, i) => (
            <motion.span
              key={s}
              custom={i}
              variants={fadeUp}
              className="rounded-full border border-warmLine bg-warmCard px-4 py-2 font-body text-sm font-medium text-warmInk transition-colors duration-300 hover:border-warmPeach hover:text-warmPeach"
            >
              {s}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default AboutSoft;
