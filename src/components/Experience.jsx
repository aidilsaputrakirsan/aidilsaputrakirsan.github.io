import React, { useState } from 'react';
import { 
  Briefcase as BriefcaseIcon,
  GraduationCap as GraduationCapIcon,
  Award as AwardIcon 
} from 'lucide-react';

const TimelineItem = ({ date, title, subtitle, description, isLeft }) => {
  return (
    <div className={`mb-8 flex justify-between items-center w-full ${
      isLeft ? 'flex-row-reverse' : ''
    }`}>
      <div className="order-1 w-5/12"></div>
      <div className="z-20 flex items-center order-1 bg-blue-600 shadow-xl w-8 h-8 rounded-full">
        <h1 className="mx-auto font-semibold text-lg text-white">{date[0]}</h1>
      </div>
      <div className={`order-1 w-5/12 px-6 py-4 bg-white dark:bg-gray-900 rounded-lg shadow-xl 
        transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
      >
        <h3 className="mb-3 font-bold text-gray-900 dark:text-white text-xl">{title}</h3>
        <h4 className="mb-3 text-blue-600 dark:text-blue-400 text-md">{subtitle}</h4>
        {description && (
          <p className="text-sm leading-snug tracking-wide text-gray-600 dark:text-gray-300">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

const TabButton = ({ active, icon: Icon, title, onClick }) => (
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

const Experience = () => {
  const [activeTab, setActiveTab] = useState('career');

  const career = [
    {
      date: "2020",
      title: "Lecturer of Information Systems",
      subtitle: "Institut Teknologi Kalimantan (ITK)",
      description: "Teaching and conducting research in Information Systems department."
    },
    {
      date: "2014",
      title: "Freelance Application Developer",
      subtitle: "Self-employed",
      description: "Developing custom web, mobile, and IoT applications for clients."
    },
    {
      date: "2015",
      title: "Network and Application Administrator",
      subtitle: "Politeknik Negeri Ujung Pandang (PNUP)",
      description: "Managing network infrastructure and applications for the institution."
    }
  ];

  const education = [
    {
      date: "2018",
      title: "Master's Degree - Magister Terapan (M.Tr.Kom)",
      subtitle: "Politeknik Elektronika Negeri Surabaya (PENS)",
      description: "Major in Informatics and Computer Engineering. Graduated with Cum Laude honors."
    },
    {
      date: "2012",
      title: "Bachelor's Degree - Sarjana Sains Terapan (S.S.T.)",
      subtitle: "Politeknik Negeri Ujung Pandang (PNUP)",
      description: "Major in Electrical Engineering with focus in Computer and Network Engineering. Graduated with Cum Laude honors."
    }
  ];

  const achievements = [
    {
      date: "2022",
      title: "Certificate of Competence - Junior Web Programmer",
      subtitle: "BNSP - Jakarta, Indonesia"
    },
    {
      date: "2021",
      title: "Research Presentation in International Program",
      subtitle: "Kanagawa Institute of Technology (KAIT)",
      description: "Presented research findings at KAIT, Japan"
    },
    {
      date: "2019",
      title: "International Student Exchange Program",
      subtitle: "Kanagawa Institute of Technology",
      description: "Participated in month-long exchange program in Japan"
    },
    {
      date: "2018",
      title: "Unggulan KEMENDIKBUD Scholarship",
      subtitle: "Ministry of Education",
      description: "Received prestigious scholarship for Master's studies"
    }
  ];

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Experience & Achievements
          </h2>
          <div className="mt-4 w-16 h-1 bg-blue-600 mx-auto rounded"></div>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <TabButton
            active={activeTab === 'career'}
            icon={BriefcaseIcon}
            title="Career"
            onClick={() => setActiveTab('career')}
          />
          <TabButton
            active={activeTab === 'education'}
            icon={GraduationCapIcon}
            title="Education"
            onClick={() => setActiveTab('education')}
          />
          <TabButton
            active={activeTab === 'achievements'}
            icon={AwardIcon}
            title="Achievements"
            onClick={() => setActiveTab('achievements')}
          />
        </div>

        {/* Timeline Container */}
        <div className="relative wrap overflow-hidden">
          <div className="absolute h-full border-2 border-blue-600 left-1/2 transform -translate-x-1/2"></div>
          
          {/* Timeline Items */}
          {activeTab === 'career' && career.map((item, index) => (
            <TimelineItem key={index} {...item} isLeft={index % 2 === 0} />
          ))}
          
          {activeTab === 'education' && education.map((item, index) => (
            <TimelineItem key={index} {...item} isLeft={index % 2 === 0} />
          ))}
          
          {activeTab === 'achievements' && achievements.map((item, index) => (
            <TimelineItem key={index} {...item} isLeft={index % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
