import { useState } from 'react';
import { FaGraduationCap, FaChevronRight, FaLock, FaClock } from 'react-icons/fa';

const educationalResources = [
  { name: "Theory", href: "https://aidilsaputrakirsan.github.io/Pengajaran-Presentasi", icon: "📚" },
  { name: "Practicals", href: "https://praktikum.mystadl.my.id/", badge: "Members Only", icon: "🔬" },
  { name: "Assignments", href: "https://aidilsaputrakirsan.github.io/Pengajaran-Tugas", icon: "📝" },
  { name: "Quizzes", href: "https://aidilsaputrakirsan.github.io/PrePost-Test", icon: "❓" },
  { name: "Examinations", href: "#", badge: "Coming Soon", icon: "📊" },
  { name: "Live Grades", href: "https://aidilsaputrakirsan.github.io/LiveGrades/", icon: "📈" },
  { name: "Attendance", href: "https://aidilsaputrakirsan.github.io/Attendance/", icon: "✅" }
];

function EducationalResources() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="educational-resources" className="py-20 bg-bgSecondary">
      <div className="section-container">
        <h2 className="section-title flex items-center" data-aos="fade-right">
          <FaGraduationCap className="mr-3 text-accentPrimary" />
          Educational Resources
        </h2>
        
        <p className="text-textSecondary mb-10 max-w-3xl" data-aos="fade-up">
          Access academic materials, assignments, and tools for students enrolled in my courses. 
          These resources are designed to enhance learning experiences with practical applications of information systems concepts.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {educationalResources.map((resource, index) => (
            <a
              key={resource.name}
              href={resource.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`card card-hover h-full relative transition-all duration-500 ${
                resource.badge === "Coming Soon" ? "opacity-80 pointer-events-none" : ""
              }`}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              onMouseEnter={() => setHovered(resource.name)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="flex items-start">
                <div className="text-4xl mr-4">{resource.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 flex items-center">
                    {resource.name}
                    {resource.badge && (
                      <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                        resource.badge === "Members Only" 
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}>
                        {resource.badge === "Members Only" ? <FaLock className="inline mr-1" /> : <FaClock className="inline mr-1" />}
                        {resource.badge}
                      </span>
                    )}
                  </h3>
                  <p className="text-textSecondary text-sm">
                    {resource.name === "Theory" && "Access lecture slides and course materials"}
                    {resource.name === "Practicals" && "Step-by-step tutorials and lab exercises"}
                    {resource.name === "Assignments" && "Course projects and homework tasks"}
                    {resource.name === "Quizzes" && "Practice quizzes and self-assessment tools"}
                    {resource.name === "Examinations" && "Exam preparation materials"}
                    {resource.name === "Live Grades" && "Real-time grade tracking system"}
                    {resource.name === "Attendance" && "View and manage course attendance"}
                  </p>
                </div>
                
                <div className={`absolute right-4 transition-transform duration-300 ${
                  hovered === resource.name ? "translate-x-2" : ""
                }`}>
                  <FaChevronRight className="text-accentPrimary" />
                </div>
              </div>
            </a>
          ))}
        </div>
        
        <div className="mt-12 text-center" data-aos="fade-up">
          <p className="text-textSecondary">
            Need access to members-only materials? Please contact me or check your course syllabus for access instructions.
          </p>
        </div>
      </div>
    </section>
  );
}

export default EducationalResources;