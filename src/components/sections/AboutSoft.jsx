/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { FiCode, FiCpu, FiBookOpen } from 'react-icons/fi';
import { yearsOfExperience, currentProjects, formatList } from '../../data/site';

const focusAreas = [
  {
    icon: FiCode,
    title: 'Full-Stack Development',
    desc: 'React, Laravel & Node.js — building scalable web apps end to end.',
    tint: 'bg-warmPeachSoft text-warmPeach',
  },
  {
    icon: FiCpu,
    title: 'IoT & Networking',
    desc: 'ESP32, MQTT and sensor systems for real-world smart solutions.',
    tint: 'bg-warmSageSoft text-warmSage',
  },
  {
    icon: FiBookOpen,
    title: 'Teaching & Research',
    desc: 'Information systems lecturer, academic writing & mentorship.',
    tint: 'bg-warmSkySoft text-warmSky',
  },
];

const stack = ['React', 'Laravel', 'Node.js', 'PostgreSQL', 'Tailwind', 'Docker', 'ESP32', 'Python'];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

function AboutSoft() {
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
            About me
          </span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Bridging code and the classroom.
          </h2>
          <p className="mt-5 font-body text-lg text-warmMuted leading-relaxed">
            Based in Balikpapan, Indonesia, I combine software development with teaching —
            over {yearsOfExperience()} years building products while inspiring future IT professionals.
            {currentProjects().length > 0 && (
              <>
                {' '}Currently working on{' '}
                {currentProjects().map((p, i, arr) => (
                  <span key={p.id}>
                    <span className="font-semibold text-warmInk">{p.title}</span>
                    {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ', and ' : '.'}
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
              key={f.title}
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
              <h3 className="mt-5 font-display text-xl font-bold">{f.title}</h3>
              <p className="mt-2 font-body text-warmMuted leading-relaxed">{f.desc}</p>
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
          <span className="font-body text-sm font-semibold text-warmMuted mr-2">Daily stack:</span>
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
