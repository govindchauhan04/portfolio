import React from 'react';
import { journeyTimeline } from '../data/PortfolioData';
import { FaCode, FaJava, FaBrain, FaLaptopCode, FaTrophy, FaRocket, FaDatabase } from 'react-icons/fa';

const iconMap = {
  FaCode,
  FaJava,
  FaBrain,
  FaLaptopCode,
  FaTrophy,
  FaRocket,
  FaDatabase
};

export default function CodingJourney() {
  return (
    <section id="journey" className="py-24 relative overflow-hidden bg-[#0D1117]/60">
      <div className="w-[92%] max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="h-[1px] w-12 bg-cyan-400" />
          <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">05 // CHRONOLOGY</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-100 uppercase tracking-tight mb-16">
          CODING <span className="text-gradient-purple">JOURNEY</span>
        </h2>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-cyan-500/30 ml-4 sm:ml-8 space-y-12 pl-6 sm:pl-10">
          {/* Glowing Vertical Line Overlay */}
          <div className="absolute top-0 bottom-0 -left-[2px] w-[2px] bg-gradient-to-b from-cyan-400 via-violet-500 to-transparent shadow-[0_0_10px_#00e5ff]" />

          {journeyTimeline.map((item, index) => {
            const IconComponent = iconMap[item.icon] || FaCode;

            return (
              <div key={index} className="relative group">
                {/* Glowing Node Circle */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-10 h-10 rounded-full bg-[#07090D] border-2 border-cyan-400 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.4)] group-hover:scale-110 group-hover:bg-cyan-950 transition-all duration-300">
                  <IconComponent className="text-sm" />
                </div>

                {/* Content Card */}
                <div className="glass-card p-6 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2 font-mono">
                    <span className="text-xs text-cyan-400 font-bold px-2.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30">
                      {item.year}
                    </span>
                    <span className="text-[11px] text-violet-400 font-semibold uppercase tracking-wider">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-heading text-slate-100 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-slate-300 text-sm font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

