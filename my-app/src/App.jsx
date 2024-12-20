// src/App.jsx
import React from 'react';
import Header from './components/Header';
import About from './components/About';
import Gallery from './components/Gallery';
import Achievements from './components/Achievements';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="container mx-auto px-4">
        <About />
        <Gallery />
        <Achievements />
      </main>
      <Footer />
    </div>
  );
};

export default App;
