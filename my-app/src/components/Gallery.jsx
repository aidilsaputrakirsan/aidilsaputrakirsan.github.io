import React from 'react';

const Gallery = () => {
  const images = [
    { src: '/assets/campus1.png', caption: 'Kampus S1 - PNUP' },
    { src: '/assets/campus2.png', caption: 'Kampus S2 - PENS' }
  ];

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold mb-8 text-gray-800">Galeri Gambar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {images.map((image, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
              <img src={image.src} alt={image.caption} className="w-full" />
              <p className="bg-white py-4 text-lg font-semibold text-gray-800">{image.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;