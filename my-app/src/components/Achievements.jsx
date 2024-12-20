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
    <section id="achievements" className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Prestasi Profesional</h2>
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <details key={index} className="p-4 border rounded-md">
              <summary className="font-bold cursor-pointer">
                {achievement.title} ({achievement.year})
              </summary>
              <p className="mt-2">{achievement.description}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;