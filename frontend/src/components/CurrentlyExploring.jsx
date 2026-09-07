import React from 'react';
import { currentlyExploring } from '../data/PortfolioData';
import { FaCog, FaMicrochip } from 'react-icons/fa';

export default function CurrentlyExploring() {
  const getAsciiBar = (percent) => {
    const totalBlocks = 10;
    const filledBlocks = Math.round((percent / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;
    return '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks);
  };

  return (
    <section className="py-20 relative overflow-hidden bg-[#07090D] border-t border-slate-800/80">
      <div className="w-[92%] max-w-7xl mx-auto">
        <div className="flex items-center space-x-3 mb-4">
          <span className="h-[1px] w-12 bg-cyan-400" />
          <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">10 // ACTIVE PROCESSES</span>
        </div>

        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-100 uppercase tracking-tight flex items-center space-x-3 font-mono">
            <span>CURRENTLY.EXPLORING()</span>
            <FaMicrochip className="text-cyan-400 animate-pulse text-2xl" />
          </h2>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30 hidden sm:inline-block">
            ● SYSTEM THREADS: RUNNING
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono">
          {currentlyExploring.map((process, idx) => (
            <div
              key={idx}
              className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/30 transition-all"
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-slate-200">{process.name}</span>
                <span className="text-cyan-400 text-[11px] uppercase">{process.status}</span>
              </div>

              <div className="flex items-center justify-between text-xs text-cyan-400 mb-2">
                <span className="font-bold">[{getAsciiBar(process.progress)}]</span>
                <span className="text-slate-400">{process.progress}%</span>
              </div>

              <p className="text-xs font-sans text-slate-400 leading-relaxed pt-2 border-t border-slate-800/80">
                {process.details}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

