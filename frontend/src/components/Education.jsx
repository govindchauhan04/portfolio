import React from 'react';
import { education } from '../data/PortfolioData';
import { FaGraduationCap, FaSchool, FaAward } from 'react-icons/fa';

export default function Education() {
  return (
    <section id="education" className="py-24 relative overflow-hidden bg-[#07090D]">
      <div className="w-[92%] max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="h-[1px] w-12 bg-cyan-400" />
          <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">06.5 // ACADEMIC FOUNDATION</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-100 uppercase tracking-tight mb-16">
          ACADEMIC <span className="text-gradient-cyan">EDUCATION</span>
        </h2>

        {/* Education Rail & Cards */}
        <div className="relative border-l-2 border-cyan-500/30 ml-4 sm:ml-8 space-y-12 pl-6 sm:pl-10">
          <div className="absolute top-0 bottom-0 -left-[2px] w-[2px] bg-gradient-to-b from-cyan-400 to-transparent shadow-[0_0_10px_#00e5ff]" />

          {education.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Glowing Icon Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-10 h-10 rounded-full bg-[#07090D] border-2 border-cyan-400 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.4)] group-hover:scale-110 group-hover:bg-cyan-950 transition-all duration-300">
                {idx === 0 ? <FaGraduationCap className="text-base" /> : <FaSchool className="text-sm" />}
              </div>

              {/* Glass Card */}
              <div className="glass-card p-6 sm:p-8 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3 font-mono">
                  <span className="text-xs text-cyan-400 font-bold px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30">
                    {item.period}
                  </span>
                  {item.note && (
                    <span className="text-xs text-emerald-400 font-bold px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 flex items-center space-x-1">
                      <FaAward />
                      <span>{item.note}</span>
                    </span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-100 mb-2">
                  {item.degree}
                </h3>

                <h4 className="text-sm font-sans text-slate-400 font-medium">
                  {item.school}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}