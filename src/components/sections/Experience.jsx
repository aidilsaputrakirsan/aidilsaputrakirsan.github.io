/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { experienceData } from '../../data/experience';
import { educationData } from '../../data/education';
import { achievementsData } from '../../data/achievements';
import { FaBriefcase, FaGraduationCap, FaTrophy } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

function Experience() {
  const [activeTab, setActiveTab] = useState('experience');

  const tabs = [
    { id: 'experience', label: 'Experience', icon: <FaBriefcase /> },
    { id: 'education', label: 'Education', icon: <FaGraduationCap /> },
    { id: 'achievements', label: 'Achievements', icon: <FaTrophy /> },
  ];

  return (
    <section id="experience" className="py-24 bg-[#151515] border-t border-[#222222]">
      <div className="container mx-auto px-6 max-w-[1000px]">
        <h2 className="text-4xl md:text-5xl font-bold text-textLight mb-12" data-aos="fade-right">
          Background
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-16" data-aos="fade-up">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`px-6 py-3 rounded-sm flex items-center gap-3 transition-colors font-mono text-sm tracking-widest uppercase border ${activeTab === tab.id
                ? 'bg-animeRed text-white border-animeRed'
                : 'bg-transparent text-textMuted border-[#333333] hover:text-textLight hover:border-[#666666]'
                }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className={activeTab === tab.id ? 'opacity-100' : 'opacity-50'}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative pl-6 md:pl-8 border-l border-[#333333]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'experience' && (
                <div className="flex flex-col gap-12">
                  {experienceData.map((item, index) => (
                    <div key={index} className="relative">
                      {/* Timeline Node */}
                      <div className="absolute -left-[31px] md:-left-[39px] w-4 h-4 rounded-full bg-[#151515] border-2 border-animeRed mt-1.5"></div>

                      <div className="flex flex-col">
                        <span className="font-mono text-xs text-animeRed tracking-widest mb-2">{item.period}</span>
                        <h3 className="text-2xl font-bold text-textLight mb-1">{item.title}</h3>
                        <span className="text-lg text-textMuted mb-4">{item.company}</span>
                        <p className="text-textMuted leading-relaxed max-w-2xl">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'education' && (
                <div className="flex flex-col gap-12">
                  {educationData.map((item, index) => (
                    <div key={index} className="relative">
                      {/* Timeline Node */}
                      <div className="absolute -left-[31px] md:-left-[39px] w-4 h-4 rounded-full bg-[#151515] border-2 border-[#39C0FB] mt-1.5"></div>

                      <div className="flex flex-col">
                        <span className="font-mono text-xs text-[#39C0FB] tracking-widest mb-2">{item.period}</span>
                        <h3 className="text-2xl font-bold text-textLight mb-1">{item.degree}</h3>
                        <span className="text-lg text-textMuted mb-4">{item.institution}</span>
                        <p className="text-textMuted leading-relaxed max-w-2xl">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'achievements' && (
                <div className="flex flex-col gap-12">
                  {achievementsData.map((item, index) => (
                    <div key={index} className="relative">
                      {/* Timeline Node */}
                      <div className="absolute -left-[31px] md:-left-[39px] w-4 h-4 rounded-full bg-[#151515] border-2 border-[#F9E858] mt-1.5"></div>

                      <div className="flex flex-col">
                        <span className="font-mono text-xs text-[#F9E858] tracking-widest mb-2">{item.year}</span>
                        <h3 className="text-2xl font-bold text-textLight mb-1">{item.title}</h3>
                        <span className="text-lg text-textMuted mb-4">{item.organization}</span>
                        <p className="text-textMuted leading-relaxed max-w-2xl">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default Experience;