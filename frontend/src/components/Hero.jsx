import React, { useState, useEffect } from 'react';
import { profile, rotatingRoles } from '../data/PortfolioData';
import { FaGithub, FaLinkedin, FaFileDownload, FaArrowRight } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [fadeRole, setFadeRole] = useState(true);
  const [codeTilt, setCodeTilt] = useState({ x: 0, y: 0 });

  // Rotating roles loop
  useEffect(() => {
    const roleTimer = setInterval(() => {
      setFadeRole(false);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % rotatingRoles.length);
        setFadeRole(true);
      }, 300);
    }, 2800);

    return () => clearInterval(roleTimer);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCodePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
    setCodeTilt({ x, y });
  };

  const resetCodeTilt = () => setCodeTilt({ x: 0, y: 0 });

  return (
    <section id="home" className="hero-stage relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-96 h-96 ambient-glow-cyan pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 ambient-glow-violet pointer-events-none" />

      <div className="hero-frame w-[92%] max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        {/* Left Content Column */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6">
          {/* Main Heading */}
          <div className="space-y-2">
            <h1 className="hero-reference-title text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading tracking-tight text-slate-100 uppercase leading-[1.05]">
              GOVIND <span className="text-gradient-cyan">SINGH</span>
            </h1>
          </div>

          {/* Role Showcase */}
          <div className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-slate-300 flex flex-wrap items-center gap-2 h-12">
            <span>I BUILD</span>
            <span
              className={`text-gradient-purple px-2 py-0.5 rounded-lg bg-violet-950/30 border border-violet-500/30 font-mono text-cyan-400 transition-opacity duration-300 ${
                fadeRole ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {rotatingRoles[roleIndex]}
            </span>
          </div>

          {/* Subtitle Description */}
          <p className="text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed font-sans">
            "{profile.tagline}"
          </p>

          <div className="hero-proof font-mono" aria-label="Current development focus">
            <span><b>STACK</b> Java · Python · React</span>
            <span><b>STATUS</b> open to opportunities</span>
          </div>

          {/* Primary CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
            <button
              onClick={() => scrollTo('projects')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-heading font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(0,229,255,0.4)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer flex items-center space-x-2"
            >
              <span>View Projects</span>
              <FaArrowRight className="text-xs" />
            </button>

            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl glass-panel hover:bg-slate-800/80 text-slate-200 hover:text-cyan-400 font-heading font-semibold text-sm tracking-wide border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 flex items-center space-x-2 cursor-pointer"
            >
              <FaFileDownload className="text-cyan-400" />
              <span>Download Resume</span>
            </a>
          </div>

          {/* Secondary Links: Social Icons */}
          <div className="flex items-center space-x-4 pt-4 border-t border-slate-800/80 w-full">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social p-3 rounded-xl glass-panel text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all cursor-pointer"
              title="GitHub Profile"
            >
              <FaGithub className="text-xl" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social p-3 rounded-xl glass-panel text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all cursor-pointer"
              title="LinkedIn Profile"
            >
              <FaLinkedin className="text-xl" />
            </a>
            <a
              href={profile.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social p-3 rounded-xl glass-panel text-slate-300 hover:text-amber-400 hover:border-amber-500/50 transition-all cursor-pointer"
              title="LeetCode Profile"
            >
              <SiLeetcode className="text-xl" />
            </a>
          </div>
        </div>

        {/* Right code-window visual */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div
            className="hero-code-window glass-panel scanline-effect"
            onPointerMove={handleCodePointerMove}
            onPointerLeave={resetCodeTilt}
            style={{ transform: `perspective(900px) rotateX(${codeTilt.y}deg) rotateY(${codeTilt.x}deg)` }}
          >
            <div className="hero-code-topbar">
              <div className="flex items-center gap-2">
                <span className="hero-window-dot bg-rose-400" />
                <span className="hero-window-dot bg-amber-400" />
                <span className="hero-window-dot bg-emerald-400" />
              </div>
              <span className="font-mono text-[10px] text-slate-500">ENGINEER.PY</span>
            </div>
            <pre className="hero-code-content font-mono"><code>{`class Engineer:\n\n  def __init__(self):\n    self.name = 'Govind Singh'\n    self.role = 'AI/ML Full Stack'\n    self.stack = [React, Node, Python]\n    self.status = LEARNING\n\n$ python engineer.py\n>>> Booting profile...\n>>> Govind Singh\n>>> Status: OPEN TO OPPORTUNITIES\n>>> Ready to build.`}</code></pre>
          </div>
        </div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 text-slate-500 font-mono text-xs cursor-pointer hover:text-cyan-400 transition-colors" onClick={() => scrollTo('about')}>
        <span className="tracking-widest uppercase text-[10px]">SCROLL DOWN</span>
        <div className="w-5 h-9 rounded-full border-2 border-slate-700 flex justify-center p-1">
          <div className="w-1 h-2 bg-cyan-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

