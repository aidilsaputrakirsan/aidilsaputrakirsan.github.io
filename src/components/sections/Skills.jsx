import { useState } from 'react';
import SkillChart from '../ui/SkillChart';
import { skillCategories, skillsData, radarChartData } from '../../data/skills';

function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredSkills = activeCategory === 'all' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeCategory);

  return (
    <section id="skills" className="py-20">
      <div className="section-container">
        <h2 className="section-title" data-aos="fade-right">Technical Skills</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          {/* Radar Chart */}
          <div data-aos="fade-up" data-aos-delay="100" className="card p-6">
            <h3 className="text-2xl font-semibold mb-6 text-center">Skill Categories</h3>
            <SkillChart data={radarChartData} />
          </div>
          
          {/* Skill Categories */}
          <div data-aos="fade-up" data-aos-delay="200">
            <h3 className="text-2xl font-semibold mb-6">My Skills</h3>
            <p className="text-textSecondary mb-6">
              I've acquired a versatile skill set throughout my career as both a developer and educator.
              Here's a breakdown of my technical expertise in various domains.
            </p>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {skillCategories.map(category => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-full transition-all ${
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
          </div>
        </div>
        
        {/* Skill Progress Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
          {filteredSkills.map((skill, index) => (
            <div 
              key={skill.name} 
              data-aos="fade-up" 
              data-aos-delay={100 + (index % 6) * 100}
            >
              <div className="flex justify-between mb-1">
                <span>{skill.name}</span>
                <span className="text-accentPrimary">{skill.value}%</span>
              </div>
              <div className="skill-bar">
                <div 
                  className="skill-progress transition-all duration-1000"
                  style={{ width: `${skill.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;