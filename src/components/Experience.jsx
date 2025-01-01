import React, { useState } from 'react';
import { 
  Briefcase as BriefcaseIcon,
  GraduationCap as GraduationCapIcon,
  Award as AwardIcon 
} from 'lucide-react';

const TimelineItem = ({ index, title, subtitle, description, isLeft }) => {
  return (
    <div
      className={`mb-8 flex justify-between items-center w-full ${
        isLeft ? 'flex-row-reverse' : ''
      }`}
    >
      {/* Area kosong di sisi kiri/kanan */}
      <div className={`order-1 w-5/12 ${isLeft ? 'mr-4' : 'ml-4'}`}></div>

      {/* Lingkaran nomor */}
      <div className="z-20 flex items-center order-1 shadow-lg w-8 h-8 rounded-full bg-[#4CAF50] dark:bg-[#FF5722]">
        <h1 className="mx-auto font-semibold text-lg text-[#E0E0E0] dark:text-[#212121]">
          {index + 1}
        </h1>
      </div>

      {/* Kotakan */}
      <div
        className={`order-1 w-5/12 px-6 py-4 about-glass transform transition-all duration-300 hover:scale-105 ${
          isLeft ? 'translate-x-2 mt-4' : '-translate-x-2'
        }`}
      >
        <h3 className="mb-3 font-bold text-[#E0E0E0] dark:text-[#212121] text-xl">
          {title}
        </h3>
        <h4 className="mb-3 text-[#4CAF50] dark:text-[#FF5722] text-md">
          {subtitle}
        </h4>
        {description && (
          <p className="text-sm leading-snug tracking-wide text-[#A9A9A9] dark:text-[#757575]">
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
    className={`skill-button ${active ? 'is-active' : ''} flex justify-center items-center space-x-2`}
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
    <section id="experience" className="py-20 bg-[#181818] dark:bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-[#E0E0E0] dark:text-[#212121] sm:text-4xl">
            Experience & Achievements
          </h2>
          <div className="mt-4 w-16 h-1 bg-[#4CAF50] dark:bg-[#FF5722] mx-auto rounded"></div>
        </div>

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

        <div className="relative wrap overflow-hidden">
          <div className="absolute h-full border-2 border-[#4CAF50] dark:border-[#FF5722] left-1/2 transform -translate-x-1/2"></div>
          
          {activeTab === 'career' && career.map((item, index) => (
            <TimelineItem key={index} {...item} index={index} isLeft={index % 2 === 0} />
          ))}
          
          {activeTab === 'education' && education.map((item, index) => (
            <TimelineItem key={index} {...item} index={index} isLeft={index % 2 === 0} />
          ))}
          
          {activeTab === 'achievements' && achievements.map((item, index) => (
            <TimelineItem key={index} {...item} index={index} isLeft={index % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
