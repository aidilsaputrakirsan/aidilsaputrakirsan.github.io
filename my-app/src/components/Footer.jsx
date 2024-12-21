import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-800 to-purple-800 text-white py-8">
      <div className="container mx-auto px-6 text-center">
        <p className="mb-4 text-lg">© 2024 Aidil Saputra Kirsan. All rights reserved.</p>
        <div className="flex justify-center space-x-8">
          <a href="https://linkedin.com/in/aidil" className="hover:text-yellow-300 text-lg transition">LinkedIn</a>
          <a href="https://github.com/aidilsaputrakirsan" className="hover:text-yellow-300 text-lg transition">GitHub</a>
          <a href="mailto:aidil@lecturer.itk.ac.id" className="hover:text-yellow-300 text-lg transition">Email</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;