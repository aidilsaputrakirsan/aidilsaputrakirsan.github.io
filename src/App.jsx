import { useEffect } from 'react';

// Original (dark) site — kept for rollback
import Layout from './components/layout/Layout';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import CursorEffect from './components/ui/CursorEffect';
import ScrollProgress from './components/ui/ScrollProgress';

// New Soft/Warm site
import NavbarSoft from './components/layout/NavbarSoft';
import HeroSoft from './components/sections/HeroSoft';
import AboutSoft from './components/sections/AboutSoft';
import SkillsSoft from './components/sections/SkillsSoft';
import ExperienceSoft from './components/sections/ExperienceSoft';
import ProjectsSoft from './components/sections/ProjectsSoft';
import ContactSoft from './components/sections/ContactSoft';
import FooterSoft from './components/layout/FooterSoft';
import CvModal from './components/cv/CvModal';

// Toggle: true = new Soft/Warm site, false = original dark site
const USE_SOFT = true;

function App() {
  useEffect(() => {
    if (USE_SOFT) return;
    // AOS only animates the old dark theme — load it lazily on rollback so it
    // stays out of the live bundle's critical path.
    Promise.all([import('aos'), import('aos/dist/aos.css')]).then(([AOS]) => {
      AOS.default.init({ duration: 800, once: false, mirror: true });
    });
  }, []);

  if (USE_SOFT) {
    return (
      <div className="bg-warmBg font-body text-warmInk">
        <NavbarSoft />
        <main>
          <HeroSoft />
          <AboutSoft />
          <SkillsSoft />
          <ExperienceSoft />
          <ProjectsSoft />
          <ContactSoft />
        </main>
        <FooterSoft />
        <CvModal />
      </div>
    );
  }

  return (
    <>
      <ScrollProgress />
      <CursorEffect />
      <Layout>
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
        </main>
      </Layout>
    </>
  );
}

export default App;
