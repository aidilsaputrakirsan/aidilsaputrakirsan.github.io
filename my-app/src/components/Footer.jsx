import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p>© 2024 Aidil Saputra Kirsan. All rights reserved.</p>
        <div className="mt-4 flex justify-center space-x-4">
          <a href="https://linkedin.com/in/aidil" className="hover:underline">LinkedIn</a>
          <a href="https://github.com/aidilsaputrakirsan" className="hover:underline">GitHub</a>
          <a href="mailto:aidil@lecturer.itk.ac.id" className="hover:underline">Email</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;