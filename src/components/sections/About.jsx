// src/components/sections/About.jsx
import { FaCode, FaLaptopCode, FaChalkboardTeacher, FaBook } from 'react-icons/fa';

function About() {
  return (
    <section id="about" className="py-20 bg-bgSecondary">
      <div className="section-container">
        <h2 className="section-title" data-aos="fade-right">About Me</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div data-aos="fade-up" data-aos-delay="100">
            <h3 className="text-2xl font-semibold mb-4">Get to know me</h3>
            <p className="text-textSecondary mb-4">
              I'm an Information System Lecturer and Full Stack Developer with a passion for creating
              innovative digital solutions and educating the next generation of IT professionals.
            </p>
            <p className="text-textSecondary mb-4">
              With over 5 years of experience in both academia and industry, I specialize in modern web
              technologies, database design, system analysis, and software development methodologies.
            </p>
            <p className="text-textSecondary mb-6">
              I believe in continuous learning and staying updated with the latest technological trends.
              My teaching approach combines theoretical knowledge with practical, real-world applications
              to prepare students for successful careers in the IT industry.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="btn btn-primary">Contact Me</a>
              <a href="/cv-AidilSaputraKirsan.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline">Download CV</a>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-6" data-aos="fade-up" data-aos-delay="200">
              My Expertise
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                className="card card-hover" 
                data-aos="zoom-in" 
                data-aos-delay="300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-lg bg-accentPrimary/20 flex items-center justify-center mr-4">
                    <FaCode className="text-2xl text-accentPrimary" />
                  </div>
                  <h4 className="text-xl font-medium">Web Development</h4>
                </div>
                <p className="text-textSecondary">
                  Building responsive, modern web applications using the latest frameworks and technologies.
                </p>
              </div>
              
              <div 
                className="card card-hover" 
                data-aos="zoom-in" 
                data-aos-delay="400"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-lg bg-accentPrimary/20 flex items-center justify-center mr-4">
                    <FaLaptopCode className="text-2xl text-accentPrimary" />
                  </div>
                  <h4 className="text-xl font-medium">Full Stack Solutions</h4>
                </div>
                <p className="text-textSecondary">
                  End-to-end application development with expertise in both frontend and backend technologies.
                </p>
              </div>
              
              <div 
                className="card card-hover" 
                data-aos="zoom-in" 
                data-aos-delay="500"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-lg bg-accentPrimary/20 flex items-center justify-center mr-4">
                    <FaChalkboardTeacher className="text-2xl text-accentPrimary" />
                  </div>
                  <h4 className="text-xl font-medium">Education</h4>
                </div>
                <p className="text-textSecondary">
                  Teaching information systems, programming, and database design with a focus on practical skills.
                </p>
              </div>
              
              <div 
                className="card card-hover" 
                data-aos="zoom-in" 
                data-aos-delay="600"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-lg bg-accentPrimary/20 flex items-center justify-center mr-4">
                    <FaBook className="text-2xl text-accentPrimary" />
                  </div>
                  <h4 className="text-xl font-medium">Research</h4>
                </div>
                <p className="text-textSecondary">
                  Conducting research in information systems, data analysis, and emerging technologies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;