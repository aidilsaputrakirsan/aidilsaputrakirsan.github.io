import { useState } from 'react';
import { FaGraduationCap, FaChevronRight, FaLock, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';

const educationalResources = [
  { name: "Theory", href: "https://aidilsaputrakirsan.github.io/Pengajaran-Presentasi", icon: "📚", desc: "Access lecture slides and course materials" },
  { name: "Practicals", href: "https://praktikum.mystadl.my.id/", badge: "Members Only", icon: "🔬", desc: "Step-by-step tutorials and lab exercises" },
  { name: "Assignments", href: "https://aidilsaputrakirsan.github.io/Pengajaran-Tugas", icon: "📝", desc: "Course projects and homework tasks" },
  { name: "Quizzes", href: "https://prepost-test.vercel.app", icon: "🎯", desc: "Practice quizzes and self-assessment tools" },
  { name: "Examinations", href: "#", badge: "Coming Soon", icon: "📊", desc: "Exam preparation materials" },
  { name: "Live Grades", href: "https://aidilsaputrakirsan.github.io/LiveGrades/", icon: "📈", desc: "Real-time grade tracking system" },
  { name: "Attendance", href: "https://aidilsaputrakirsan.github.io/Attendance/", icon: "✅", desc: "View and manage course attendance" }
];

function EducationalResources() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="educational-resources" className="py-24 bg-[#111111] border-t border-[#222222]">
      <div className="container mx-auto px-6 max-w-[1200px]">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-textLight mb-4 flex items-center gap-4" data-aos="fade-right">
              <FaGraduationCap className="text-animeRed" />
              Resources
            </h2>
            <p className="text-xl text-textMuted max-w-2xl" data-aos="fade-up">
              Access academic materials, assignments, and tools for students enrolled in my courses.
            </p>
          </div>
          <div className="font-mono text-sm tracking-widest uppercase text-textMuted opacity-50 pb-2">
                // Student Portal
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {educationalResources.map((resource, index) => (
            <motion.a
              key={resource.name}
              href={resource.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col p-6 border border-[#222222] bg-[#151515] hover:border-[#444444] transition-colors relative ${resource.badge === "Coming Soon" ? "opacity-50 pointer-events-none" : ""
                }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHovered(resource.name)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="flex justify-between items-start mb-12">
                <div className="text-3xl opacity-80 group-hover:opacity-100 transition-opacity group-hover:scale-110 transform duration-300">
                  {resource.icon}
                </div>
                <FaChevronRight className={`text-textMuted transition-all duration-300 ${hovered === resource.name ? "text-textLight translate-x-1" : ""}`} />
              </div>

              <div>
                <h3 className="text-xl font-bold text-textLight mb-2 flex items-center gap-3">
                  {resource.name}
                  {resource.badge && (
                    <span className="font-mono text-[10px] tracking-widest uppercase text-animeRed border border-animeRed/30 px-2 py-1 bg-animeRed/10">
                      {resource.badge === "Members Only" ? <FaLock className="inline mr-1 mb-0.5" /> : <FaClock className="inline mr-1 mb-0.5" />}
                      {resource.badge}
                    </span>
                  )}
                </h3>
                <p className="text-textMuted text-sm leading-relaxed">
                  {resource.desc}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-16 text-center border-t border-[#222222] pt-8" data-aos="fade-up">
          <p className="font-mono text-sm text-textMuted tracking-wide">
            Need access to <span className="text-animeRed">members-only</span> materials? Please contact me or check your syllabus.
          </p>
        </div>
      </div>
    </section>
  );
}

export default EducationalResources;