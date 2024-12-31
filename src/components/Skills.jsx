import React, { useState } from 'react';
import { 
  Code as CodeIcon,         
  Server as ServerIcon,    
  Database as DatabaseIcon,  
  Network as NetworkIcon,
  Cloud as CloudIcon,
  ScreenShare as ScreenShareIcon,   
} from 'lucide-react';

const SkillCard = ({ icon: Icon, title, skills }) => {
  return (
    <div className="bg-[#232323] dark:bg-[#F7F7F7] rounded-lg shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
      <div className="flex items-center space-x-3 mb-4">
        <Icon className="w-6 h-6 text-[#4CAF50] dark:text-[#FF5722]" />
        <h3 className="text-xl font-bold text-[#E0E0E0] dark:text-[#212121]">{title}</h3>
      </div>
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-[#A9A9A9] dark:text-[#757575]">
                {skill.name}
              </span>
              <span className="text-sm font-medium text-[#A9A9A9] dark:text-[#757575]">
                {skill.level}%
              </span>
            </div>
            <div className="w-full bg-[#2C2C2C] dark:bg-[#E0E0E0] rounded-full h-2.5">
              <div
                className="bg-[#4CAF50] dark:bg-[#FF5722] h-2.5 rounded-full transition-all duration-500 ease-out"
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
        { name: "Node.js", level: 85 },
        { name: "Express.js", level: 80 },
        { name: "Laravel", level: 85 },
        { name: "CodeIgniter", level: 80 },
        { name: "RESTful API", level: 90 },
      ]
    },
    database: {
      icon: DatabaseIcon, 
      title: "Database Management",
      skills: [
        { name: "MySQL", level: 90 },
        { name: "PostgreSQL", level: 85 },
        { name: "Oracle", level: 70 },
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
    <section id="skills" className="py-20 bg-[#181818] dark:bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-[#E0E0E0] dark:text-[#212121] sm:text-4xl">
            Technical Skills
          </h2>
          <div className="mt-4 w-16 h-1 bg-[#4CAF50] mx-auto rounded"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-2 rounded-full transition-colors ${
              activeTab === 'all'
                ? 'bg-[#4CAF50] text-[#E0E0E0] dark:bg-[#FF5722] dark:text-[#212121]'
                : 'bg-[#2C2C2C] dark:bg-[#E0E0E0] text-[#A9A9A9] dark:text-[#757575] hover:bg-[#4CAF50] dark:hover:bg-[#FF5722]'
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
                  ? 'bg-[#4CAF50] text-[#E0E0E0] dark:bg-[#FF5722] dark:text-[#212121]'
                  : 'bg-[#2C2C2C] dark:bg-[#E0E0E0] text-[#A9A9A9] dark:text-[#757575] hover:bg-[#4CAF50] dark:hover:bg-[#FF5722]'
              }`}
            >
              {skillCategories[category].title}
            </button>
          ))}
        </div>

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
