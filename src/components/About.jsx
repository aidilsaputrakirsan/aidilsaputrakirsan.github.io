import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            About Me
          </h2>
          <div className="mt-4 w-16 h-1 bg-blue-600 mx-auto rounded"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Personal Info Card */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden">
                <img
                  src="/api/placeholder/128/128"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <a 
                  href="mailto:aidil@lecturer.itk.ac.id"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  aidil@lecturer.itk.ac.id
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-600" />
                <a 
                  href="tel:+6285398952880"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  +62 853 9895 2880
                </a>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                <span className="text-gray-600 dark:text-gray-300">
                  Sepinggan Baru, Balikpapan Selatan,
                  Balikpapan – Indonesia
                </span>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Personal Information
                </h3>
                <div className="grid grid-cols-2 gap-4 text-gray-600 dark:text-gray-300">
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

          {/* Professional Summary */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Professional Overview
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                A dedicated and versatile professional with expertise in Information Systems and Computer Engineering. 
                Currently serving as a Lecturer at Institut Teknologi Kalimantan (ITK) while maintaining an active 
                presence in freelance application development across web, mobile, and IoT platforms.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Key Attributes
              </h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  <span>Fast learner with strong adaptability skills</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  <span>Committed to continuous learning and professional growth</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  <span>Dedicated and hardworking professional</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  <span>Strong focus on honesty and discipline</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  <span>Proven track record of responsibility and reliability</span>
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