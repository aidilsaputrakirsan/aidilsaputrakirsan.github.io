import { useState } from 'react';
import { experienceData } from '../../data/experience';
import { educationData } from '../../data/education';
import { achievementsData } from '../../data/achievements';
import { FaBriefcase, FaGraduationCap, FaTrophy } from 'react-icons/fa';

function Experience() {
  const [activeTab, setActiveTab] = useState('experience');
  
  const tabs = [
    { id: 'experience', label: 'Experience', icon: <FaBriefcase /> },
    { id: 'education', label: 'Education', icon: <FaGraduationCap /> },
    { id: 'achievements', label: 'Achievements', icon: <FaTrophy /> },
  ];
  
  return (
    <section id="experience" className="py-20 bg-bgSecondary">
      <div className="section-container">
        <h2 className="section-title" data-aos="fade-right">Experience & Education</h2>
        
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12" data-aos="fade-up">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all ${
                activeTab === tab.id
                  ? 'bg-accentPrimary text-white'
                  : 'bg-bgPrimary text-textSecondary hover:bg-bgPrimary/80'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Timeline */}
        <div className="pl-4">
          {activeTab === 'experience' && (
            <div>
              {experienceData.map((item, index) => (
                <div 
                  key={index} 
                  className="timeline-item" 
                  data-aos="fade-up" 
                  data-aos-delay={100 * index}
                >
                  <div className="timeline-dot"></div>
                  <div className="mb-1 flex flex-wrap items-center gap-x-2">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <span className="text-accentPrimary">@{item.company}</span>
                  </div>
                  <div className="text-sm text-textSecondary mb-2">{item.period}</div>
                  <p className="text-textSecondary">{item.description}</p>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'education' && (
            <div>
              {educationData.map((item, index) => (
                <div 
                  key={index} 
                  className="timeline-item" 
                  data-aos="fade-up" 
                  data-aos-delay={100 * index}
                >
                  <div className="timeline-dot"></div>
                  <div className="mb-1 flex flex-wrap items-center gap-x-2">
                    <h3 className="text-xl font-semibold">{item.degree}</h3>
                    <span className="text-accentPrimary">@{item.institution}</span>
                  </div>
                  <div className="text-sm text-textSecondary mb-2">{item.period}</div>
                  <p className="text-textSecondary">{item.description}</p>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'achievements' && (
            <div>
              {achievementsData.map((item, index) => (
                <div 
                  key={index} 
                  className="timeline-item" 
                  data-aos="fade-up" 
                  data-aos-delay={100 * index}
                >
                  <div className="timeline-dot"></div>
                  <div className="mb-1 flex flex-wrap items-center gap-x-2">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <span className="text-accentPrimary">@{item.organization}</span>
                  </div>
                  <div className="text-sm text-textSecondary mb-2">{item.year}</div>
                  <p className="text-textSecondary">{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Experience;