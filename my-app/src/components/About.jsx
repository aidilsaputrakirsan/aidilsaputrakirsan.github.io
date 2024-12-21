// src/components/About.jsx
import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold mb-10">Tentang Saya</h2>
        <p className="text-xl leading-relaxed mb-8">
          Saya Aidil Saputra Kirsan, seorang dosen yang berdedikasi di Institut Teknologi Kalimantan (ITK). Dengan latar belakang pendidikan S1 di Politeknik Negeri Ujung Pandang (PNUP) dan S2 di Politeknik Elektronika Negeri Surabaya (PENS), saya memiliki minat besar dalam IoT, pengembangan aplikasi, dan sistem cerdas.
        </p>
        <button className="px-8 py-4 bg-yellow-400 text-gray-800 rounded-full font-semibold shadow-lg hover:bg-yellow-500 hover:shadow-2xl transform hover:scale-105 transition-all duration-500">
          Pelajari Lebih Lanjut
        </button>
      </div>
    </section>
  );
};

export default About;
