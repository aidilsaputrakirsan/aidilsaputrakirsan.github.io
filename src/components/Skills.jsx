import React, { useState } from 'react';
import { 
  Code as CodeIcon,     // Rename untuk menghindari konflik
  Server as ServerIcon,
  Database as DatabaseIcon,
  Monitor as MonitorIcon,
  Network as NetworkIcon 
} from 'lucide-react';

// Komponen SkillCard
const SkillCard = ({ icon: Icon, title, skills }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
      <div className="flex items-center space-x-3 mb-4">
        <Icon className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {skill.name}
              </span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {skill.level}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  const [activeTab, setActiveTab] = useState('all');

  // Pastikan setiap icon di sini menggunakan alias yang sudah diimpor di atas
  const skillCategories = {
    programming: {
      icon: CodeIcon,
      title: "Programming & Development",
      skills: [
        { name: "Web Development (HTML, CSS, PHP)", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "Python", level: 80 },
        { name: "C++ & C#", level: 75 },
        { name: "Database (MySQL, Oracle)", level: 85 }
      ]
    },
    network: {
      icon: NetworkIcon,
      title: "Network & Infrastructure",
      skills: [
        { name: "Cisco Appliance Configuration", level: 90 },
        { name: "Basic Routing & Switching", level: 85 },
        { name: "Wireless Networking", level: 80 },
        { name: "Mikrotik MTCNA", level: 85 },
        { name: "Server Administration", level: 80 }
      ]
    },
    virtualization: {
      icon: ServerIcon,
      title: "Virtualization Technology",
      skills: [
        { name: "VMware", level: 85 },
        { name: "Virtual Box", level: 80 },
        { name: "PROXMOX VE", level: 75 }
      ]
    },
    operating: {
      icon: MonitorIcon,
      title: "Operating Systems",
      skills: [
        { name: "Linux (Debian, Ubuntu, Kali)", level: 90 },
        { name: "Windows Server", level: 85 },
        { name: "Open WRT", level: 80 }
      ]
    }
  };

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Technical Skills
          </h2>
          <div className="mt-4 w-16 h-1 bg-blue-600 mx-auto rounded"></div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-2 rounded-full transition-colors ${
              activeTab === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            All Skills
          </button>
          {Object.keys(skillCategories).map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeTab === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {skillCategories[category].title}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(skillCategories).map(([key, category]) => (
            (activeTab === 'all' || activeTab === key) && (
              <SkillCard
                key={key}
                icon={category.icon}
                title={category.title}
                skills={category.skills}
              />
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
