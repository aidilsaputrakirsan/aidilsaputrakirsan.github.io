import { useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';

function Hero() {
  // Correctly initialize particles with current API
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Particle Background */}
      <Particles
        id="tsparticles"
        className="absolute inset-0"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#7B68EE",
            },
            links: {
              color: "#7B68EE",
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.3,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />
      
      <div className="container mx-auto px-4 z-10 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl mb-2">Hello, I'm</h2>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="text-gradient">Aidil Saputra Kirsan</span>
            </h1>
            <h2 className="text-2xl md:text-3xl mb-6 h-16">
              <TypeAnimation
                sequence={[
                  'Information System Lecturer',
                  1000,
                  'Full Stack Developer',
                  1000,
                ]}
                wrapper="span"
                speed={40}
                repeat={Infinity}
                className="text-textSecondary"
              />
            </h2>
            <p className="text-textSecondary text-lg mb-8 max-w-lg">
              Passionate about creating digital experiences and sharing knowledge.
              Specializing in modern web technologies and information systems.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="btn btn-primary">View Projects</a>
              <a href="#contact" className="btn btn-outline">Contact Me</a>
            </div>
          </motion.div>
        </div>
        
        <div className="lg:w-1/2 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="w-60 h-60 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-accentPrimary shadow-lg shadow-accentPrimary/20 animate-pulse-slow">
                <img 
                    src="./aidil.png" 
                    alt="Aidil Saputra Kirsan" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                    e.target.src = 'https://i.imgur.com/2QcQ3te.png';
                    }}
                />
            </div>

            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-accentPrimary/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accentSecondary/20 rounded-full blur-xl"></div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-textSecondary"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
        <span className="text-sm text-textSecondary mt-2">Scroll Down</span>
      </div>
    </section>
  );
}

export default Hero;