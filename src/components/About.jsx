import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-[#181818] dark:bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-[#E0E0E0] dark:text-[#212121] sm:text-4xl">
            About Me
          </h2>
          <div className="mt-4 w-16 h-1 bg-[#4CAF50] mx-auto rounded"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-[#232323] dark:bg-[#F7F7F7] rounded-lg shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden">
                <img
                  src="https://i.imgur.com/5JKdbmA.png"
                  alt="Profile"
                  className="w-32 h-32 object-cover"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#FF9800]" />
                <a 
                  href="mailto:aidil@lecturer.itk.ac.id"
                  className="text-[#A9A9A9] dark:text-[#757575] hover:text-[#FF9800] dark:hover:text-[#FF5722]"
                >
                  aidil@lecturer.itk.ac.id
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#FF9800]" />
                <a 
                  href="tel:+6285398952880"
                  className="text-[#A9A9A9] dark:text-[#757575] hover:text-[#FF9800] dark:hover:text-[#FF5722]"
                >
                  +62 853 9895 xxxx
                </a>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#FF9800] mt-1" />
                <span className="text-[#A9A9A9] dark:text-[#757575]">
                  Sepinggan Baru, Balikpapan Selatan,
                  Balikpapan – Indonesia
                </span>
              </div>

              <div className="border-t border-[#2C2C2C] dark:border-[#E0E0E0] pt-4 mt-4">
                <h3 className="text-lg font-semibold text-[#E0E0E0] dark:text-[#212121] mb-2">
                  Personal Information
                </h3>
                <div className="grid grid-cols-2 gap-4 text-[#A9A9A9] dark:text-[#757575]">
                  <div>
                    <p className="font-medium">Date of Birth</p>
                    <p>March 17th, 1994</p>
                  </div>
                  <div>
                    <p className="font-medium">Nationality</p>
                    <p>Indonesian</p>
                  </div>
                  <div>
                    <p className="font-medium">Language</p>
                    <p>Indonesia, English</p>
                  </div>
                  <div>
                    <p className="font-medium">Current Role</p>
                    <p>Lecturer at ITK</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#232323] dark:bg-[#F7F7F7] rounded-lg shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold text-[#E0E0E0] dark:text-[#212121] mb-4">
                Professional Overview
              </h3>
              <p className="text-[#A9A9A9] dark:text-[#757575] leading-relaxed">
                A dedicated and adaptable professional specializing in Information Systems and Computer Engineering. Currently serving as a Lecturer at Institut Teknologi Kalimantan (ITK), contributing to academic excellence through teaching and research. Actively involved in freelance application development with a proven track record of delivering innovative solutions across web, mobile, and IoT platforms
              </p>
            </div>

            <div className="bg-[#232323] dark:bg-[#F7F7F7] rounded-lg shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold text-[#E0E0E0] dark:text-[#212121] mb-4">
                Key Attributes
              </h3>
              <ul className="space-y-3 text-[#A9A9A9] dark:text-[#757575]">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-[#4CAF50] rounded-full"></span>
                  <span>Dedicated to Faith and Gratitude to Allah</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-[#4CAF50] rounded-full"></span>
                  <span>Quick to Learn and Adapt to New Challenges</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-[#4CAF50] rounded-full"></span>
                  <span>Committed to Lifelong Learning and Professional Development</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-[#4CAF50] rounded-full"></span>
                  <span>Strong Ethical Foundation and Discipline</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-[#4CAF50] rounded-full"></span>
                  <span>Proven History of Reliability and Accountability</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
