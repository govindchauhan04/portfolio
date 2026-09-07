import React from 'react';
import { labExperiments } from '../data/PortfolioData';
import { FaFlask, FaCode, FaCheckCircle } from 'react-icons/fa';

export default function ExperimentLab() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#0D1117]/40 border-t border-slate-800/80">
      <div className="w-[92%] max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="h-[1px] w-12 bg-cyan-400" />
          <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">09 // INNOVATION LAB</span>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-100 uppercase tracking-tight flex items-center space-x-3">
            <span>/LAB</span>
            <FaFlask className="text-violet-400 text-3xl" />
          </h2>
          <p className="text-slate-400 text-sm font-sans mt-2">
            Things I build just because I'm curious — micro tools, visualizers, & UI shaders.
          </p>
        </div>

        {/* Experiment Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {labExperiments.map((exp) => (
            <div
              key={exp.id}
              className="glass-card p-6 border border-slate-800 hover:border-violet-500/40 transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs mb-3">
                  <span className="px-2.5 py-0.5 rounded bg-violet-950/80 border border-violet-500/30 text-violet-300 font-bold uppercase text-[10px]">
                    {exp.category}
                  </span>
                  <span className="text-emerald-400 text-[10px] flex items-center space-x-1">
                    <FaCheckCircle />
                    <span>{exp.status}</span>
                  </span>
                </div>

                <h3 className="font-heading font-bold text-slate-100 text-base mb-2 group-hover:text-cyan-300 transition-colors">
                  {exp.title}
                </h3>

                <p className="text-slate-300 text-xs font-sans leading-relaxed mb-4">
                  {exp.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1 pt-3 border-t border-slate-800/80 font-mono text-[10px] text-slate-400">
                {exp.tech.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

