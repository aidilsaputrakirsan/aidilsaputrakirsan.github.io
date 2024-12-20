import React from 'react';

const Gallery = () => {
  const images = [
    { src: '/assets/campus1.png', caption: 'Kampus S1 - PNUP' },
    { src: '/assets/campus2.png', caption: 'Kampus S2 - PENS' }
  ];

  return (
    <section id="gallery" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Galeri Gambar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.map((image, index) => (
            <div key={index} className="shadow-md rounded overflow-hidden">
              <img src={image.src} alt={image.caption} className="w-full" />
              <div className="p-4 text-center bg-white">
                <p>{image.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;