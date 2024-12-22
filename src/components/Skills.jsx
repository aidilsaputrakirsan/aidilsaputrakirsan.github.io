import React, { useState } from 'react';
import { 
  Code as CodeIcon,         
  Server as ServerIcon,    
  Database as DatabaseIcon,  
  Network as NetworkIcon,
  Cloud as CloudIcon,
  ScreenShare as ScreenShareIcon,   
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

  const skillCategories = {
    programming: {
      icon: CodeIcon,
      title: "Programming & Development",
      skills: [
        { name: "Web Development (HTML, CSS, PHP)", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "Python", level: 90 },
        { name: "C++ & C#", level: 75 }
      ]
    },
    frontend: {
      icon: ScreenShareIcon,
      title: "Frontend Development",
      skills: [
        { name: "React", level: 90 },
        { name: "React Native", level: 80 },
        { name: "Vue.js", level: 65 }
      ]
    },
    backend: {
      icon: ServerIcon, 
      title: "Backend Development",
      skills: [
        { name: "Node.js", level: 75 },
        { name: "Express.js", level: 70 },
        { name: "Laravel", level: 85 },
        { name: "CodeIgniter", level: 80 },
        { name: "RESTful API", level: 75 },
      ]
    },
    database: {
      icon: DatabaseIcon, 
      title: "Database Management",
      skills: [
        { name: "MySQL", level: 90 },
        { name: "PostgreSQL", level: 85 },
        { name: "Oracle", level: 80 },
        { name: "Firebase Realtime Database", level: 70 }
      ]
    },
    network: {
      icon: NetworkIcon, 
      title: "Network & Infrastructure",
      skills: [
        { name: "Network Design & Implementation", level: 95 },
        { name: "LAN/WAN Configuration", level: 85 },
        { name: "Firewall Configuration (Cisco, Mikrotik)", level: 85 },
        { name: "Cloud Networking (AWS, GCP)", level: 75 },
        { name: "Network Monitoring (Nagios, Zabbix)", level: 60 }
      ]
    },
    tools: {
      icon: CloudIcon, 
      title: "Platforms & Tools",
      skills: [
        { name: "Docker", level: 85 },
        { name: "Git", level: 85 },
        { name: "Jenkins", level: 70 },
        { name: "Proxmox VE", level: 75 },
        { name: "VirtualBox", level: 90 },
        { name: "VMware", level: 90 }
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
