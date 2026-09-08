import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';

import CinematicIntro from './components/CinematicIntro';
import CustomCursor from './components/CustomCursor';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Videos from './components/Videos';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';
import EasterEggTerminal from './components/EasterEggTerminal';
import GovindAI from './components/GovindAI';

export default function App() {
  const [introFinished, setIntroFinished] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: false
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Listen for Ctrl+K custom event to open command palette
  useEffect(() => {
    const handleOpenCmd = () => setIsCommandPaletteOpen(true);
    window.addEventListener('open-command-palette', handleOpenCmd);
    return () => window.removeEventListener('open-command-palette', handleOpenCmd);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#07090D] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-300">
      {/* Intro Loader */}
      <CinematicIntro onComplete={() => setIntroFinished(true)} />

      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Particle Network Canvas Background */}
      <ParticleBackground />

      {/* Main App Layout */}
      <div className={`transition-opacity duration-1000 ${introFinished ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenAI={() => setIsAIOpen(true)}
        />

        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Videos />
          <Achievements />
          <Contact />
        </main>

        <Footer />
      </div>

      {/* Overlays */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      <EasterEggTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      <GovindAI
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        onToggle={() => setIsAIOpen(!isAIOpen)}
      />
    </div>
  );
}
