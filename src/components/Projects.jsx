import React, { useState } from 'react';
import { Globe, Smartphone, Cpu, ExternalLink } from 'lucide-react';

const ProjectCard = ({ title, description, image, category, location, year, link }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image || "/api/placeholder/400/200"}
          alt={title}
          className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-sm px-2 py-1 rounded">
          {year}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Globe className="w-4 h-4" /> {location}
          </span>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              View Project
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const FilterButton = ({ active, icon: Icon, title, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${
      active 
        ? 'bg-blue-600 text-white shadow-lg' 
        : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
    }`}
  >
    <Icon className="w-5 h-5" />
    <span>{title}</span>
  </button>
);

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      title: "Smart Home IoT Devices",
      description: "Developed IoT devices for home automation with power monitoring and control capabilities.",
      category: "iot",
      location: "Balikpapan, Indonesia",
      year: "2023",
      image: "/api/placeholder/400/200"
    },
    {
      title: "West Papua Command Center",
      description: "Built a comprehensive web-based command center system for West Papua province.",
      category: "web",
      location: "Manokwari, Indonesia",
      year: "2022",
      image: "/api/placeholder/400/200"
    },
    {
      title: "SIAKAD Al-Azhar",
      description: "Developed web and mobile academic information system for Al Azhar 58 Balikpapan.",
      category: "mobile",
      location: "Balikpapan, Indonesia",
      year: "2021",
      image: "/api/placeholder/400/200"
    },
    {
      title: "LEACH Routing Protocol",
      description: "Research on Remaining Energy for Cluster Head Selection using LEACH routing protocol in WSN.",
      category: "iot",
      location: "Atsugi, Japan",
      year: "2019",
      image: "/api/placeholder/400/200"
    },
    {
      title: "VANET Safety Application",
      description: "Implemented Vehicle Warning System for VANET Safety Application.",
      category: "iot",
      location: "Makassar, Indonesia",
      year: "2017",
      image: "/api/placeholder/400/200"
    },
    {
      title: "Islamic University Data Center",
      description: "Developed web-based data center system for Islamic University of Makassar.",
      category: "web",
      location: "Makassar, Indonesia",
      year: "2015",
      image: "/api/placeholder/400/200"
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Featured Projects
          </h2>
          <div className="mt-4 w-16 h-1 bg-blue-600 mx-auto rounded"></div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <FilterButton
            active={activeFilter === 'all'}
            icon={Globe}
            title="All Projects"
            onClick={() => setActiveFilter('all')}
          />
          <FilterButton
            active={activeFilter === 'web'}
            icon={Globe}
            title="Web Applications"
            onClick={() => setActiveFilter('web')}
          />
          <FilterButton
            active={activeFilter === 'mobile'}
            icon={Smartphone}
            title="Mobile Apps"
            onClick={() => setActiveFilter('mobile')}
          />
          <FilterButton
            active={activeFilter === 'iot'}
            icon={Cpu}
            title="IoT Projects"
            onClick={() => setActiveFilter('iot')}
          />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
