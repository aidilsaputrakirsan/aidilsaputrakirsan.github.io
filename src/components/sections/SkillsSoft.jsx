/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import Marquee from '../ui/Marquee';

const competencies = [
  { name: 'Backend Development', level: 85, color: '#E8835A' },
  { name: 'IoT & Microcontrollers', level: 82, color: '#7FA887' },
  { name: 'Educational Technology', level: 80, color: '#7BA7C9' },
  { name: 'Frontend Development', level: 78, color: '#E8835A' },
  { name: 'Cloud & Virtualization', level: 75, color: '#7FA887' },
];

const tools = ['React', 'Vue.js', 'Laravel', 'Node.js', 'Express', 'PostgreSQL', 'MySQL', 'MongoDB', 'Docker', 'Python', 'ESP32', 'MQTT', 'Tailwind', 'Git', 'Three.js'];

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
          <p className="mt-5 font-body text-lg text-warmMuted">A blend of engineering, hardware and teaching — refined across 5+ years.</p>
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
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.level}%` }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 1.2, delay: 0.15 + i * 0.08, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: s.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Moving tools marquee */}
      <div className="mt-20 border-y border-warmLine bg-warmCard py-5">
        <Marquee items={tools} speed={40} />
      </div>
    </section>
  );
}

export default SkillsSoft;
