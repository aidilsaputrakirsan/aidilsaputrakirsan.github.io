import { motion } from 'framer-motion';
import ScrollCanvas from '../ui/ScrollCanvas';

function Hero() {
  return (
    // The Hero section itself now takes on the massive height needed to complete the scroll animation
    <section id="hero" className="relative w-full min-h-[500vh] bg-[#111111]">

      {/* 1. The Canvas Background (absolute and sticky inside its own component) */}
      <ScrollCanvas />

      {/* 2. The Hero Content Container (sticky so it stays on screen while the canvas below scrolls) */}
      <div className="sticky top-0 w-full h-screen flex items-center justify-center pointer-events-none z-10">
        <div className="container mx-auto px-6 grid grid-cols-1 items-center gap-12 max-w-[1400px]">

          {/* Left Column: Massive Typography */}
          <div className="flex flex-col justify-center pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p className="text-xl md:text-2xl text-textLight font-medium max-w-lg mb-10 leading-snug drop-shadow-md">
                Building dynamic, intelligent, and scalable digital solutions for the future of information systems.
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                <a href="#projects" className="bg-[#222222] hover:bg-[#333333] text-textLight px-6 py-4 rounded font-mono text-sm transition-colors border border-[#333333] flex items-center justify-center gap-3">
                  <span><span className="text-textMuted">npm i</span> @myst-tech/core </span>
                  <span className="animate-bounce font-sans text-animeRed">↓</span>
                </a>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;