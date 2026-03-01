/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';

const skillsList = [
  { name: 'Backend Development', level: 85, color: '#ff4c4c' },
  { name: 'IoT & Microcontrollers', level: 82, color: '#18FF92' },
  { name: 'Educational Technology', level: 80, color: '#ffffff' },
  { name: 'Frontend Development', level: 78, color: '#39C0FB' },
  { name: 'Cloud & Virtualization', level: 75, color: '#F9E858' }
];

function Skills() {
  return (
    <section id="skills" className="py-32 bg-[#111111] overflow-hidden relative border-t border-[#222]">

      {/* Myst-Tech Grid Accent */}
      <div className="absolute top-0 right-[10%] w-[1px] h-full bg-[#ff4c4c] opacity-10"></div>

      <div className="container mx-auto px-6 max-w-[1200px] relative z-10 flex flex-col justify-center min-h-[50vh]">

        <div className="relative z-10 w-full flex justify-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-[100%] md:w-3/4 lg:w-2/3 backdrop-blur-sm bg-[#111111]/60 p-6 md:p-12 rounded-xl border border-[#333]"
          >
            <h3 className="text-4xl md:text-5xl font-bold text-[#ffffff] mb-12 tracking-tight flex items-center gap-4">
              <span className="text-animeRed font-mono text-2xl">&lt;/&gt;</span> Core Competencies
            </h3>

            <div className="flex flex-col gap-10">
              {skillsList.map((skill, index) => (
                <div key={index} className="flex flex-col gap-3">
                  <div className="flex justify-between items-end font-mono uppercase tracking-widest text-[#888888] text-sm md:text-base">
                    <span>{skill.name}</span>
                    <span style={{ color: skill.color }}>{skill.level}%</span>
                  </div>
                  {/* Bar Track */}
                  <div className="h-[2px] w-full bg-[#333333] relative overflow-hidden">
                    {/* Animated Fill controlled by framer-motion */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                      className="absolute top-0 left-0 h-full"
                      style={{
                        backgroundColor: skill.color,
                        boxShadow: `0 0 10px ${skill.color}`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

export default Skills;