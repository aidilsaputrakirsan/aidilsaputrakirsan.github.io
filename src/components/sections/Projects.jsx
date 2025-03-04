import { useState } from 'react';
import { motion } from 'framer-motion';
import { categories, projectsData } from '../../data/projects';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

function Projects() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);
  
  const filteredProjects = activeCategory === 'all'
    ? projectsData
    : projectsData.filter(project => project.category === activeCategory);
  
  return (
    <section id="projects" className="py-20">
      <div className="section-container">
        <h2 className="section-title" data-aos="fade-right">Featured Projects</h2>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12" data-aos="fade-up">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-6 py-2 rounded-full transition-all ${
                activeCategory === category.id
                  ? 'bg-accentPrimary text-white'
                  : 'bg-bgSecondary text-textSecondary hover:bg-bgSecondary/80'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card card-hover overflow-hidden"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              data-aos="fade-up"
              data-aos-delay={100 * (index % 3)}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden h-52 -mx-6 -mt-6 mb-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500"
                  style={{
                    transform: hoveredProject === project.id ? 'scale(1.05)' : 'scale(1)',
                  }}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/600x400?text=${project.title.replace(/ /g, '+')}`;
                  }}
                />
                
                {/* Overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-bgPrimary/90 to-transparent opacity-0 transition-opacity duration-300 flex items-end p-6"
                  style={{
                    opacity: hoveredProject === project.id ? 1 : 0,
                  }}
                >
                  <div className="flex gap-3">
                    <a
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-accentPrimary text-white p-2 rounded-full hover:bg-accentSecondary transition-colors"
                    >
                      <FaGithub className="text-lg" />
                    </a>
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-accentPrimary text-white p-2 rounded-full hover:bg-accentSecondary transition-colors"
                    >
                      <FaExternalLinkAlt className="text-lg" />
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Project Info */}
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-textSecondary mb-4">{project.description}</p>
              
              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="text-xs px-2 py-1 rounded-full bg-accentPrimary/10 text-accentPrimary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* More Projects Button */}
        <div className="flex justify-center mt-12">
          <a 
            href="https://github.com/aidilsaputrakirsan" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-outline flex items-center gap-2"
          >
            <FaGithub /> View More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

export default Projects;