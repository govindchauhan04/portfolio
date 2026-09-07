import React, { useState } from 'react';
import { profile } from '../data/PortfolioData';
import { FaTerminal, FaCodeBranch, FaCheckCircle, FaLightbulb, FaCubes, FaBug, FaRocket } from 'react-icons/fa';

export default function About() {
  const [terminalCmd, setTerminalCmd] = useState('whoami');
  const [terminalOutput, setTerminalOutput] = useState([
    '> Developer',
    '> Problem Solver',
    '> Lifelong Learner'
  ]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const input = terminalCmd.trim().toLowerCase();
      let output = [];
      if (input === 'whoami') {
        output = ['> Developer', '> Problem Solver', '> Lifelong Learner'];
      } else if (input === 'stack' || input === 'skills') {
        output = ['> Languages: Java, Python, C, HTML5, CSS3, JavaScript', '> Frontend & Data: React.js, Tailwind CSS, NumPy, Pandas', '> Backend & Core: Node.js, Express, FastAPI, MongoDB, DSA'];
      } else if (input === 'contact') {
        output = [`> Email: ${profile.email}`, `> LinkedIn: ${profile.linkedin}`];
      } else if (input === 'clear') {
        output = [];
      } else {
        output = [`> Command not recognized: '${input}'. Try 'whoami', 'stack', 'contact', 'clear'.`];
      }
      setTerminalOutput(output);
    }
  };

  const philosophySteps = [
    { label: 'Think', icon: FaLightbulb, color: 'text-amber-400' },
    { label: 'Break Down', icon: FaCodeBranch, color: 'text-cyan-400' },
    { label: 'Build', icon: FaCubes, color: 'text-violet-400' },
    { label: 'Debug', icon: FaBug, color: 'text-rose-400' },
    { label: 'Improve', icon: FaRocket, color: 'text-emerald-400' }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="w-[92%] max-w-7xl mx-auto">
        {/* Section Tag Header */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="h-[1px] w-12 bg-cyan-400" />
          <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">01 // ABOUT ME</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-100 uppercase tracking-tight mb-12">
          CODE. <span className="text-gradient-cyan">CURIOSITY.</span> CONSISTENCY.
        </h2>

        {/* Story & Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Editorial Text Story */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 font-sans text-base leading-relaxed">
            {profile.aboutStory.map((paragraph, index) => (
              <p key={index} className="glass-panel p-5 rounded-2xl border-l-4 border-l-cyan-400">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Terminal Box */}
          <div className="lg:col-span-5">
            <div className="glass-panel rounded-2xl overflow-hidden border border-cyan-500/30 shadow-[0_0_30px_rgba(0,229,255,0.1)]">
              {/* Terminal Window Header */}
              <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between font-mono text-xs">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="text-slate-400 flex items-center space-x-1.5">
                  <FaTerminal className="text-cyan-400 text-xs" />
                  <span>govind@portfolio:~</span>
                </span>
              </div>

              {/* Terminal Body */}
              <div className="p-5 font-mono text-xs space-y-3 min-h-[220px] bg-[#07090D]/90">
                <div className="flex items-center space-x-2 text-cyan-400">
                  <span>govind@portfolio:~$</span>
                  <input
                    type="text"
                    value={terminalCmd}
                    onChange={(e) => setTerminalCmd(e.target.value)}
                    onKeyDown={handleCommand}
                    className="bg-transparent border-none outline-none text-slate-100 font-mono text-xs w-full focus:ring-0"
                    aria-label="Terminal input"
                  />
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  {terminalOutput.map((line, idx) => (
                    <p key={idx} className="text-slate-300 font-mono">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistic Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {profile.stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-card p-6 border border-slate-800 hover:border-cyan-500/40 text-center group cursor-pointer"
            >
              <div className="text-3xl sm:text-4xl font-extrabold font-heading text-gradient-cyan mb-1 group-hover:scale-105 transition-transform">
                {stat.value}
              </div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Developer Philosophy Pipeline */}
        <div className="glass-panel rounded-2xl p-8 border border-violet-500/20">
          <h3 className="text-xs font-mono text-violet-400 uppercase tracking-widest mb-6 text-center">
            DEVELOPER PHILOSOPHY PIPELINE
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-mono text-sm">
            {philosophySteps.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <React.Fragment key={idx}>
                  <div className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-colors shadow-sm">
                    <IconComp className={step.color} />
                    <span className="text-slate-200 font-semibold">{step.label}</span>
                  </div>
                  {idx < philosophySteps.length - 1 && (
                    <span className="text-cyan-400 font-bold hidden sm:inline">&rarr;</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

