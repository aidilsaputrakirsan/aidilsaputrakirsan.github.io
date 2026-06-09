/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import Marquee from '../ui/Marquee';
import {
  SiReact, SiVuedotjs, SiLaravel, SiNodedotjs, SiExpress, SiPostgresql, SiMysql,
  SiMongodb, SiDocker, SiPython, SiEspressif, SiMqtt, SiTailwindcss, SiGit, SiThreedotjs,
} from 'react-icons/si';
import { yearsOfExperience } from '../../data/site';

const competencies = [
  { name: 'Backend Development', level: 85, color: '#E8835A' },
  { name: 'IoT & Microcontrollers', level: 82, color: '#7FA887' },
  { name: 'Educational Technology', level: 80, color: '#7BA7C9' },
  { name: 'Frontend Development', level: 78, color: '#E8835A' },
  { name: 'Cloud & Virtualization', level: 75, color: '#7FA887' },
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

function SkillsSoft() {
  return (
    <section id="skills" className="relative overflow-hidden bg-warmBg py-24 md:py-32 text-warmInk">
      <div className="container mx-auto px-6 max-w-[1100px]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <span className="font-body text-sm font-semibold uppercase tracking-widest text-warmPeach">Skills</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">Core competencies</h2>
          <p className="mt-5 font-body text-lg text-warmMuted">A blend of engineering, hardware and teaching — refined across {yearsOfExperience()}+ years.</p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-9">
          {competencies.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="flex items-end justify-between font-body">
                <span className="font-semibold">{s.name}</span>
                <span className="text-sm font-bold" style={{ color: s.color }}>{s.level}%</span>
              </div>
              <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-warmLine">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1.2, delay: 0.15 + i * 0.08, ease: 'easeOut' }}
                  className="h-full origin-left rounded-full"
                  style={{ width: `${s.level}%`, backgroundColor: s.color }}
                />
              </div>
            </motion.div>
          ))}
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
