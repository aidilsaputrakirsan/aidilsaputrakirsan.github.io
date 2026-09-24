/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { FiArrowRight, FiBookOpen } from 'react-icons/fi';
import Marquee from '../ui/Marquee';
import {
  SiReact, SiVuedotjs, SiLaravel, SiNodedotjs, SiPostgresql, SiDocker, SiPython,
  SiEspressif, SiMqtt, SiTailwindcss, SiArduino, SiFirebase, SiLivewire,
  SiPortainer, SiProxmox, SiVirtualbox, SiLinux, SiClaude,
} from 'react-icons/si';
import { LuBrainCircuit, LuScanText } from 'react-icons/lu';
import { projectsData } from '../../data/projects';
import { productsData } from '../../data/products';
import { useLang } from '../../i18n/LangContext';
import { yearsOfExperience, CAREER_START_YEAR } from '../../data/site';

// Skill domains tied to real project categories — counts and "since" years are
// computed from projectsData, so they stay honest and auto-update.
const domains = [
  {
    // AI products live on the hub (myst-tech.com), not in the works list
    category: 'ai',
    title: 'AI Product Engineering',
    desc: {
      en: 'LLM-powered assistants for teachers, lecturers and students — every call routed through Myst-Core, a private AI layer I designed.',
      id: 'Asisten berbasis LLM untuk guru, dosen, dan mahasiswa — setiap panggilan lewat Myst-Core, lapisan AI privat rancangan saya.',
    },
    chips: ['LLM integration', 'RAG', 'Tier routing & fallback', 'Structured JSON output', 'Vision / OCR', 'Streaming', 'Usage metering'],
    href: '/#produk',
    wide: true,
    tint: 'bg-warmInk text-warmBg',
    tools: [
      { name: 'LLM', Icon: LuBrainCircuit, color: '#C43D2B' },
      { name: 'Vision / OCR', Icon: LuScanText, color: '#2F4868' },
      { name: 'Laravel', Icon: SiLaravel, color: '#FF2D20' },
      { name: 'Livewire', Icon: SiLivewire, color: '#FB70A9' },
    ],
  },
  {
    category: 'web',
    title: 'Full-Stack Web',
    desc: { en: 'Academic systems, dashboards and realtime platforms — built end to end.', id: 'Sistem akademik, dashboard, dan platform realtime — dibangun end to end.' },
    tint: 'bg-warmPeachSoft text-warmPeach',
    tools: [
      { name: 'Laravel', Icon: SiLaravel, color: '#FF2D20' },
      { name: 'Vue.js', Icon: SiVuedotjs, color: '#4FC08D' },
      { name: 'React', Icon: SiReact, color: '#61DAFB' },
      { name: 'Node.js', Icon: SiNodedotjs, color: '#5FA04E' },
      { name: 'Tailwind', Icon: SiTailwindcss, color: '#06B6D4' },
    ],
  },
  {
    category: 'iot',
    title: 'IoT & Embedded',
    desc: { en: 'Microcontrollers, sensors and network research for real-world systems.', id: 'Mikrokontroler, sensor, dan riset jaringan untuk sistem dunia nyata.' },
    tint: 'bg-warmSageSoft text-warmSage',
    tools: [
      { name: 'ESP32', Icon: SiEspressif, color: '#E7352C' },
      { name: 'Arduino', Icon: SiArduino, color: '#00878F' },
      { name: 'MQTT', Icon: SiMqtt, color: '#660066' },
      { name: 'Python', Icon: SiPython, color: '#3776AB' },
    ],
  },
  {
    category: 'mobile',
    title: { en: 'Mobile Apps', id: 'Aplikasi Mobile' },
    desc: { en: 'Cross-platform apps for field work, schools and government services.', id: 'Aplikasi lintas platform untuk kerja lapangan, sekolah, dan layanan pemerintah.' },
    tint: 'bg-warmSkySoft text-warmSky',
    tools: [
      { name: 'React Native', Icon: SiReact, color: '#61DAFB' },
      { name: 'Firebase', Icon: SiFirebase, color: '#DD2C00' },
      { name: 'Laravel', Icon: SiLaravel, color: '#FF2D20' },
    ],
  },
];

// Kept short on purpose: only tools used in shipped work. Frameworks are one line;
// the weight goes to AI, infra and hardware (see the CV skillGroups too).
const stack = [
  { name: 'Laravel', Icon: SiLaravel, color: '#FF2D20' },
  { name: 'React', Icon: SiReact, color: '#61DAFB' },
  { name: 'Vue.js', Icon: SiVuedotjs, color: '#4FC08D' },
  { name: 'Node.js', Icon: SiNodedotjs, color: '#5FA04E' },
  { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
  { name: 'Docker', Icon: SiDocker, color: '#2496ED' },
  { name: 'Portainer', Icon: SiPortainer, color: '#13BEF9' },
  { name: 'Proxmox', Icon: SiProxmox, color: '#E57000' },
  { name: 'VirtualBox', Icon: SiVirtualbox, color: '#2F61B4' },
  { name: 'Linux', Icon: SiLinux, color: 'rgb(var(--warm-ink))' },
  { name: 'ESP32', Icon: SiEspressif, color: '#E7352C' },
  { name: 'Python', Icon: SiPython, color: '#3776AB' },
  { name: 'Claude Code', Icon: SiClaude, color: '#D97757' },
];

const toolItems = stack.map(({ name, Icon, color }) => (
  <span key={name} className="inline-flex items-center gap-3">
    <Icon style={{ color }} className="text-3xl" />
    {name}
  </span>
));

function domainStats(category) {
  if (category === 'ai') {
    const ai = productsData.filter((p) => p.ai);
    return { count: ai.length, since: null, label: { en: `${ai.filter((p) => p.status === 'live').length} live products · Myst Tech`, id: `${ai.filter((p) => p.status === 'live').length} produk live · Myst Tech` } };
  }
  const projects = projectsData.filter((p) => p.category === category);
  const since = projects.length ? Math.min(...projects.map((p) => Number(p.year))) : null;
  return { count: projects.length, since, label: null };
}

function exploreCategory(category) {
  window.dispatchEvent(new CustomEvent('filter-projects', { detail: category }));
  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

function SkillsSoft() {
  const { t } = useLang();
  return (
    <section id="skills" className="relative overflow-hidden bg-warmBg py-24 md:py-32 text-warmInk">
      <div className="container mx-auto px-6 max-w-[1100px]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-2xl"
        >
          <span className="font-body text-sm font-semibold uppercase tracking-widest text-warmPeach">{t({ en: 'Skills', id: 'Keahlian' })}</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">{t({ en: 'What I work in', id: 'Bidang yang saya tekuni' })}</h2>
          <p className="mt-5 font-body text-lg text-warmMuted">
            {t({
              en: `${yearsOfExperience()}+ years across AI products, web, hardware and the classroom. Every number below comes from real shipped projects — tap a card to explore them.`,
              id: `${yearsOfExperience()}+ tahun di produk AI, web, perangkat keras, dan ruang kelas. Setiap angka di bawah berasal dari proyek nyata — ketuk kartu untuk menjelajahinya.`,
            })}
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {domains.map((d, i) => {
            const { count, since, label } = domainStats(d.category);
            return (
              <motion.button
                key={d.category}
                type="button"
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => (d.href ? window.location.assign(d.href) : exploreCategory(d.category))}
                className={`group flex flex-col rounded-3xl border border-warmLine bg-warmCard p-6 text-left shadow-soft transition-shadow duration-300 hover:shadow-soft-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-warmPeach ${
                  d.wide ? 'sm:col-span-2 relative overflow-hidden' : ''
                }`}
              >
                {d.wide && <span className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-warmPeachSoft opacity-80 blur-3xl" />}
                <div className={`relative inline-flex h-12 w-12 items-center justify-center self-start rounded-2xl ${d.tint}`}>
                  <span className="font-display text-lg font-bold">{count}</span>
                </div>
                <h3 className={`relative mt-5 font-display font-bold leading-snug ${d.wide ? 'text-2xl' : 'text-lg'}`}>{t(d.title)}</h3>
                <p className="relative mt-2 flex-1 font-body text-sm leading-relaxed text-warmMuted">{t(d.desc)}</p>
                {d.chips && (
                  <div className="relative mt-4 flex flex-wrap gap-1.5">
                    {d.chips.map((c) => (
                      <span key={c} className="rounded-full bg-warmBg px-2.5 py-1 font-body text-[11px] font-semibold text-warmInk ring-1 ring-warmLine">
                        {c}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-4 flex items-center gap-2.5">
                  {d.tools.map(({ name, Icon, color }) => (
                    <Icon key={name} title={name} style={{ color }} className="text-xl" />
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-warmLine pt-4 font-body text-xs">
                  <span className="text-warmMuted">
                    {label
                      ? t(label)
                      : t({
                          en: `${count} project${count === 1 ? '' : 's'}${since ? ` · since ${since}` : ''}`,
                          id: `${count} proyek${since ? ` · sejak ${since}` : ''}`,
                        })}
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-warmPeach">
                    {d.href ? t({ en: 'See products', id: 'Lihat produk' }) : t({ en: 'Explore', id: 'Jelajahi' })} <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </motion.button>
            );
          })}

          {/* Teaching has no project category — it points to the research section */}
          <motion.a
            href="#research"
            custom={domains.length}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.98 }}
            className="group flex flex-col rounded-3xl border border-warmLine bg-warmCard p-6 text-left shadow-soft transition-shadow duration-300 hover:shadow-soft-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-warmPeach"
          >
            <div className="inline-flex h-12 w-12 items-center justify-center self-start rounded-2xl bg-warmPeachSoft text-warmPeach">
              <FiBookOpen className="text-xl" />
            </div>
            <h3 className="mt-5 font-display text-lg font-bold leading-snug">{t({ en: 'Teaching & Research', id: 'Mengajar & Riset' })}</h3>
            <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-warmMuted">
              {t({
                en: 'Information systems lecturer at ITK — courses, thesis supervision and published research.',
                id: 'Dosen sistem informasi di ITK — mata kuliah, bimbingan skripsi, dan publikasi riset.',
              })}
            </p>
            <div className="mt-5 flex items-center justify-between border-t border-warmLine pt-4 font-body text-xs">
              <span className="text-warmMuted">{t({ en: 'since', id: 'sejak' })} {CAREER_START_YEAR}</span>
              <span className="inline-flex items-center gap-1 font-semibold text-warmPeach">
                {t({ en: 'Research', id: 'Riset' })} <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </div>
          </motion.a>
        </div>
      </div>

      {/* Moving tools marquee */}
      <div className="mt-20 border-y border-warmLine bg-warmCard py-5">
        <Marquee items={toolItems} speed={40} />
      </div>
      <p className="container mx-auto mt-5 max-w-[1100px] px-6 text-center font-body text-sm text-warmMuted">
        {t({
          en: 'Built with an AI-assisted workflow (Claude Code) — so the time goes into architecture, infrastructure and the problem itself, not boilerplate.',
          id: 'Dibangun dengan alur kerja berbantuan AI (Claude Code) — waktunya dipakai untuk arsitektur, infrastruktur, dan masalahnya sendiri, bukan kode berulang.',
        })}
      </p>
    </section>
  );
}

export default SkillsSoft;
