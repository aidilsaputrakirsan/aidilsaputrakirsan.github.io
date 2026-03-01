import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111111] py-24 border-t border-[#222222] relative overflow-hidden">
      <div className="container mx-auto px-6 flex flex-col items-center justify-center relative z-10">

        {/* Pulsing Heart / Core */}
        <div className="relative w-32 h-32 flex items-center justify-center mb-12">
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border border-[#333333]"></div>

          {/* Pulsing Core */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut"
            }}
            className="w-4 h-4 rounded-full bg-animeRed shadow-[0_0_15px_#ff4c4c]"
          ></motion.div>

          {/* Glowing Aura */}
          <motion.div
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.2, 0, 0.2]
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut"
            }}
            className="absolute w-8 h-8 rounded-full bg-animeRed blur-sm"
          ></motion.div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-8 mb-12">
          <a href="https://github.com/aidilsaputrakirsan" target="_blank" rel="noopener noreferrer" className="text-textMuted hover:text-white transition-colors text-2xl">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/aidilsaputrakirsan" target="_blank" rel="noopener noreferrer" className="text-textMuted hover:text-[#0077b5] transition-colors text-2xl">
            <FaLinkedin />
          </a>
          <a href="https://twitter.com/aidilsaputrakirsan" target="_blank" rel="noopener noreferrer" className="text-textMuted hover:text-[#1DA1F2] transition-colors text-2xl">
            <FaTwitter />
          </a>
          <a href="mailto:aidil@lecturer.itk.ac.id" className="text-textMuted hover:text-animeRed transition-colors text-2xl">
            <FaEnvelope />
          </a>
        </div>

        <p className="text-textMuted text-sm font-mono tracking-widest uppercase">
          &copy; {currentYear} Aidil Saputra Kirsan.
        </p>
      </div>
    </footer>
  );
}

export default Footer;