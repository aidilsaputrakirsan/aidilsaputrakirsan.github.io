
import { projectsData } from '../../data/projects';
import { FaGithub } from 'react-icons/fa';
import AnimeProjectCard from '../ui/AnimeProjectCard';

function Projects() {
  return (
    <section id="projects" className="py-24 bg-[#111111]">
      <div className="container mx-auto px-6 max-w-[1400px] mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-textLight">
          Selected Works
        </h2>
      </div>

      {/* Scrollytelling Feature Rows */}
      <div className="flex flex-col w-full">
        {projectsData.map((project, index) => (
          <AnimeProjectCard
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </div>

      {/* More Projects Button */}
      <div className="flex justify-center mt-24">
        <a
          href="https://github.com/aidilsaputrakirsan"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-bgCard hover:bg-[#2a2a2a] text-textLight border border-[#333333] px-8 py-4 rounded font-mono text-sm transition-colors flex items-center gap-3"
        >
          <FaGithub className="text-xl" /> View More on GitHub
        </a>
      </div>
    </section>
  );
}

export default Projects;