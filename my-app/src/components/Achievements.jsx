import React from 'react';

const Achievements = () => {
  const achievements = [
    {
      title: 'Best Graduate Cum Laude',
      year: '2020',
      description: 'Lulus dengan predikat Cum Laude dari PENS dalam bidang Teknik Informatika.'
    },
    {
      title: 'Junior Web Programmer',
      year: '2022',
      description: 'Mendapatkan sertifikasi Junior Web Programmer dari BNSP, Jakarta.'
    },
    {
      title: 'International Research Presentation',
      year: '2021',
      description: 'Presentasi penelitian di Kanagawa Institute of Technology, Jepang.'
    }
  ];

  return (
    <section id="achievements" className="py-20 bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold mb-8 text-gray-800">Prestasi Profesional</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-bold mb-4 text-blue-600">{achievement.title}</h3>
              <p className="text-lg font-medium text-gray-600 mb-2">{achievement.year}</p>
              <p className="text-gray-700 leading-relaxed">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;