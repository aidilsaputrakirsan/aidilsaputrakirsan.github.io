/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { FiArrowRight, FiBookOpen } from 'react-icons/fi';
import Marquee from '../ui/Marquee';
import {
  SiReact, SiVuedotjs, SiLaravel, SiNodedotjs, SiExpress, SiPostgresql, SiMysql,
  SiMongodb, SiDocker, SiPython, SiEspressif, SiMqtt, SiTailwindcss, SiGit,
  SiThreedotjs, SiArduino, SiFirebase,
} from 'react-icons/si';
import { projectsData } from '../../data/projects';
import { yearsOfExperience, CAREER_START_YEAR } from '../../data/site';

// Skill domains tied to real project categories — counts and "since" years are
// computed from projectsData, so they stay honest and auto-update.
const domains = [
  {
    category: 'web',
    title: 'Full-Stack Web',
    desc: 'Academic systems, dashboards and realtime platforms — built end to end.',
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
    desc: 'Microcontrollers, sensors and network research for real-world systems.',
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
    title: 'Mobile Apps',
    desc: 'Cross-platform apps for field work, schools and government services.',
    tint: 'bg-[#E6EEF4] text-warmSky',
    tools: [
      { name: 'React Native', Icon: SiReact, color: '#61DAFB' },
      { name: 'Firebase', Icon: SiFirebase, color: '#DD2C00' },
      { name: 'Laravel', Icon: SiLaravel, color: '#FF2D20' },
    ],
  },
];

const stack = [
  { name: 'React', Icon: SiReact, color: '#61DAFB' },
  { name: 'Vue.js', Icon: SiVuedotjs, color: '#4FC08D' },
  { name: 'Laravel', Icon: SiLaravel, color: '#FF2D20' },
  { name: 'Node.js', Icon: SiNodedotjs, color: '#5FA04E' },
  { name: 'Express', Icon: SiExpress, color: '#2B2520' },
  { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
  { name: 'MySQL', Icon: SiMysql, color: '#4479A1' },
  { name: 'MongoDB', Icon: SiMongodb, color: '#47A248' },
  { name: 'Docker', Icon: SiDocker, color: '#2496ED' },
  { name: 'Python', Icon: SiPython, color: '#3776AB' },
  { name: 'ESP32', Icon: SiEspressif, color: '#E7352C' },
  { name: 'MQTT', Icon: SiMqtt, color: '#660066' },
  { name: 'Tailwind', Icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Git', Icon: SiGit, color: '#F05032' },
  { name: 'Three.js', Icon: SiThreedotjs, color: '#2B2520' },
];

const toolItems = stack.map(({ name, Icon, color }) => (
  <span key={name} className="inline-flex items-center gap-3">
    <Icon style={{ color }} className="text-3xl" />
    {name}
  </span>
));

function domainStats(category) {
  const projects = projectsData.filter((p) => p.category === category);
  const since = projects.length ? Math.min(...projects.map((p) => Number(p.year))) : null;
  return { count: projects.length, since };
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
          <span className="font-body text-sm font-semibold uppercase tracking-widest text-warmPeach">Skills</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">What I work in</h2>
          <p className="mt-5 font-body text-lg text-warmMuted">
            {yearsOfExperience()}+ years across web, hardware and the classroom.
            Every number below comes from real shipped projects — tap a card to explore them.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {domains.map((d, i) => {
            const { count, since } = domainStats(d.category);
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
                onClick={() => exploreCategory(d.category)}
                className="group flex flex-col rounded-3xl border border-warmLine bg-warmCard p-6 text-left shadow-soft transition-shadow duration-300 hover:shadow-soft-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-warmPeach"
              >
                <div className={`inline-flex h-12 w-12 items-center justify-center self-start rounded-2xl ${d.tint}`}>
                  <span className="font-display text-lg font-bold">{count}</span>
                </div>
                <h3 className="mt-5 font-display text-lg font-bold leading-snug">{d.title}</h3>
                <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-warmMuted">{d.desc}</p>

                <div className="mt-4 flex items-center gap-2.5">
                  {d.tools.map(({ name, Icon, color }) => (
                    <Icon key={name} title={name} style={{ color }} className="text-xl" />
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-warmLine pt-4 font-body text-xs">
                  <span className="text-warmMuted">
                    {count} project{count === 1 ? '' : 's'}{since ? ` · since ${since}` : ''}
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-warmPeach">
                    Explore <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </motion.button>
            );
          })}

          {/* Teaching has no project category — it points to the journey instead */}
          <motion.a
            href="#experience"
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
            <h3 className="mt-5 font-display text-lg font-bold leading-snug">Teaching & Research</h3>
            <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-warmMuted">
              Information systems lecturer at ITK — curricula, mentorship and published research.
            </p>
            <div className="mt-5 flex items-center justify-between border-t border-warmLine pt-4 font-body text-xs">
              <span className="text-warmMuted">since {CAREER_START_YEAR}</span>
              <span className="inline-flex items-center gap-1 font-semibold text-warmPeach">
                Journey <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </div>
          </motion.a>
        </div>
      </div>

      {/* Moving tools marquee */}
      <div className="mt-20 border-y border-warmLine bg-warmCard py-5">
        <Marquee items={toolItems} speed={40} />
      </div>
    </section>
  );
}

export default SkillsSoft;
