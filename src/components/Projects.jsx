import React, { useState } from 'react';
import { Globe, Smartphone, Cpu, ExternalLink } from 'lucide-react';

const ProjectCard = ({ title, description, image, category, location, year, link }) => {
  return (
    <div className="bg-[#232323] dark:bg-[#F7F7F7] rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image || "/api/placeholder/400/200"}
          alt={title}
          className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-[#4CAF50] dark:bg-[#FF5722] text-[#E0E0E0] dark:text-[#212121] text-sm px-2 py-1 rounded">
          {year}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-[#E0E0E0] dark:text-[#212121] mb-2">{title}</h3>
        <p className="text-[#A9A9A9] dark:text-[#757575] text-sm mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#A9A9A9] dark:text-[#757575] flex items-center gap-1">
            <Globe className="w-4 h-4" /> {location}
          </span>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-[#4CAF50] hover:text-[#388E3C] dark:text-[#FF5722] dark:hover:text-[#E64A19]"
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
        ? 'bg-[#4CAF50] dark:bg-[#FF5722] text-[#E0E0E0] dark:text-[#212121] shadow-lg' 
        : 'bg-[#2C2C2C] dark:bg-[#E0E0E0] text-[#A9A9A9] dark:text-[#757575] hover:bg-[#4CAF50] dark:hover:bg-[#FF5722]'
    }`}
  >
    <Icon className="w-5 h-5" />
    <span>{title}</span>
  </button>
);

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showMore, setShowMore] = useState(false);

  const projects = [
    {
      title: "FORENSI Electronic Form for Fish Species Examination",
      description: "Developed a mobile application for the Ministry of Marine Affairs and Fisheries to streamline and document fish species examination processes efficiently in collaboration with [Achmad Rifa'i].",
      category: "mobile",
      location: "Pontianak, Indonesia",
      year: "2025",
      image: "https://i.imgur.com/H4F3aHV.jpeg"
    },
    {
      title: "Metaverse for Integrated Campus Lab Introduction at ITK",
      description: "Developed a metaverse-based platform to enhance the introduction of integrated campus laboratories at ITK, providing an immersive virtual experience for users in collaboration with [Feriyanto].",
      category: "web",
      location: "Balikpapan, Indonesia",
      year: "2024",
      image: "https://i.imgur.com/OBvoFbF.jpeg"
    },
    {
      title: "ITK Legal Service System",
      description: "Developed a legal service platform to facilitate consultations and access to legal information for ITK's academic community in collaboration with [Fahmi Fauzan].",
      category: "web",
      location: "Balikpapan, Indonesia",
      year: "2024",
      image: "https://i.imgur.com/YPZ2u6C.jpeg"
    },
    {
      title: "Smart Home System for Electrical Switches",
      description: "Developed a smart home IoT-based system for controlling and monitoring electrical switches remotely in collaboration with [Anugerah Deagung].",
      category: "iot",
      location: "Balikpapan, Indonesia",
      year: "2023",
      image: "https://i.imgur.com/qkcNTup.jpeg"
    },
    {
      title: "Early Fire Detection System for Homes",
      description: "Developed a smart home IoT-based system for early fire detection with monitoring and automated control capabilities in collaboration with [Alvian].",
      category: "iot",
      location: "Balikpapan, Indonesia",
      year: "2023",
      image: "https://i.imgur.com/Kt2oJor.jpeg"
    },
    {
      title: "West Papua Command Center",
      description: "Built a comprehensive web-based command center system for West Papua province.",
      category: "web",
      location: "Manokwari, Indonesia",
      year: "2022",
      image: "https://i.imgur.com/4iIXYKr.jpeg"
    },
    {
      title: "SIAKAD Al-Azhar",
      description: "Developed web and mobile academic information system for Al Azhar 58 Balikpapan.",
      category: "mobile",
      location: "Balikpapan, Indonesia",
      year: "2021",
      image: "https://i.imgur.com/DHLAUOF.png"
    },
    {
      title: "LEACH Routing Protocol",
      description: "Research on Remaining Energy for Cluster Head Selection using LEACH routing protocol in WSN.",
      category: "iot",
      location: "Atsugi, Japan",
      year: "2019",
      image: "https://i.imgur.com/Fhh4m8H.png"
    },
    {
      title: "VANET Safety Application",
      description: "Implemented Vehicle Warning System for VANET Safety Application.",
      category: "iot",
      location: "Makassar, Indonesia",
      year: "2017",
      image: "https://i.imgur.com/fc0hYFD.jpeg"
    },
    
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const projectsToDisplay = showMore ? filteredProjects : filteredProjects.slice(0, 6);

  return (
    <section id="projects" className="py-20 bg-[#181818] dark:bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-[#E0E0E0] dark:text-[#212121] sm:text-4xl">
            Featured Projects
          </h2>
          <div className="mt-4 w-16 h-1 bg-[#4CAF50] dark:bg-[#FF5722] mx-auto rounded"></div>
        </div>

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsToDisplay.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>

        {filteredProjects.length > 6 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowMore(!showMore)}
              className="px-6 py-3 bg-[#4CAF50] text-[#E0E0E0] font-bold rounded-lg shadow-lg hover:bg-[#388E3C] dark:bg-[#FF5722] dark:hover:bg-[#E64A19] transition-all duration-300"
            >
              {showMore ? 'Show Less' : 'Read More'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
