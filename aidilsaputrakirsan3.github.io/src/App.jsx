// src/App.jsx
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Layout from './components/layout/Layout';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import CursorEffect from './components/ui/CursorEffect';

function App() {
  useEffect(() => {
    // Initialize AOS animation library
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });
  }, []);

  return (
    <>
      <CursorEffect />
      <Layout>
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>
      </Layout>
    </>
  );
}

export default App;