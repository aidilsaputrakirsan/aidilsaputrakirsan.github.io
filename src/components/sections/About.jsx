/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';

function About() {
  return (
    <section id="about" className="py-32 bg-[#e4e2dd] text-[#111111] overflow-hidden relative">
      <div className="container mx-auto px-6 max-w-[1200px]">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center mb-16">

          {/* Left: Portrait Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:col-span-4 lg:col-span-5 flex justify-center md:justify-end"
          >
            <div className="relative w-64 h-80 md:w-full md:max-w-md md:h-[500px] overflow-hidden bg-[#1a1a1a] shadow-2xl border border-[#333333]">
              <img
                src="/fotoku.png"
                alt="Aidil Saputra Kirsan Portrait"
                className="w-full h-full object-cover contrast-[1.15] saturate-[0.6] hover:saturate-100 transition-all duration-700 opacity-90 hover:opacity-100"
              />
              {/* Subtle aesthetic overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 to-transparent pointer-events-none mix-blend-multiply"></div>
            </div>
          </motion.div>

          {/* Right: Massive Name Typography */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="md:col-span-8 lg:col-span-7 flex flex-col justify-center text-center md:text-left"
          >
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] uppercase">
              Aidil<br />
              Saputra<br />
              <span className="text-animeRed">Kirsan.</span>
            </h2>
          </motion.div>

        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center md:items-start md:ml-[33%] lg:ml-[41%] gap-8"
        >
          <p className="text-xl md:text-3xl font-medium max-w-3xl leading-relaxed opacity-90">
            Full Stack Developer & Information System Lecturer
          </p>

          <div className="w-24 h-[2px] bg-[#111111] opacity-20 my-4"></div>

          <p className="text-lg md:text-xl text-center max-w-4xl leading-relaxed opacity-75 font-mono">
            Based in Balikpapan, Indonesia. I combine teaching and development — with over 5 years of experience building software while inspiring the next generation of IT professionals.
            Currently working on <span className="text-[#ff4c4c] font-bold">Sitasi-ITK</span>, <span className="text-[#39C0FB] font-bold">StudyVerse</span>, and <span className="text-[#F46GR5S] font-bold">BrainVerse</span>.
          </p>

          <a href="mailto:aidil@lecturer.itk.ac.id" className="mt-8 font-mono text-sm tracking-widest uppercase border border-[#111111] px-8 py-4 hover:bg-[#111111] hover:text-[#e4e2dd] transition-colors duration-300">
            aidil@lecturer.itk.ac.id
          </a>
        </motion.div>

      </div>
    </section>
  );
}

export default About;