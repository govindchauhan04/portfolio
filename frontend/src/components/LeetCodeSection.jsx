import React, { useState } from 'react';
import { problemSolvingStats } from '../data/PortfolioData';
import { FaPlay, FaStepForward, FaUndo, FaTrophy, FaFire, FaCheckCircle, FaCode, FaExternalLinkAlt } from 'react-icons/fa';

export default function LeetCodeSection() {
  // Binary Search Visualizer State
  const sortedArray = [1, 3, 5, 7, 9, 11, 15, 18, 21];
  const target = 11;

  const [step, setStep] = useState(0);
  const steps = [
    { low: 0, high: 8, mid: 4, val: 9, status: '9 < 11 -> Search Right half (low = mid + 1)' },
    { low: 5, high: 8, mid: 6, val: 15, status: '15 > 11 -> Search Left half (high = mid - 1)' },
    { low: 5, high: 5, mid: 5, val: 11, status: '11 == 11 -> Target Found at Index 5! O(log N)' }
  ];

  const currentStep = steps[step];

  const handleNextStep = () => {
    setStep((prev) => (prev + 1) % steps.length);
  };

  const handleReset = () => {
    setStep(0);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#07090D]">
      <div className="w-[92%] max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="h-[1px] w-12 bg-cyan-400" />
          <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">06 // ALGORITHMIC CORE</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-100 uppercase tracking-tight">
              PROBLEM SOLVING <span className="text-gradient-cyan">MODE</span>
            </h2>
            <p className="text-slate-400 text-sm font-sans mt-2">
              Continuous algorithmic practice, optimal time/space complexity, and Java DSA mastery.
            </p>
          </div>
        </div>

        {/* Top Key Metrics Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="glass-panel p-5 rounded-2xl border border-amber-500/30 flex items-center space-x-4">
            <div className="p-3.5 rounded-xl bg-amber-500/10 text-amber-400 text-2xl">
              <FaTrophy />
            </div>
            <div>
              <div className="text-2xl font-extrabold font-heading text-slate-100">{problemSolvingStats.solved}</div>
              <div className="text-xs font-mono text-slate-400 uppercase">Problems Solved</div>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-rose-500/30 flex items-center space-x-4">
            <div className="p-3.5 rounded-xl bg-rose-500/10 text-rose-400 text-2xl">
              <FaFire />
            </div>
            <div>
              <div className="text-2xl font-extrabold font-heading text-slate-100">{problemSolvingStats.streak}</div>
              <div className="text-xs font-mono text-slate-400 uppercase">Coding Streak</div>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-cyan-500/30 flex items-center space-x-4">
            <div className="p-3.5 rounded-xl bg-cyan-500/10 text-cyan-400 text-2xl">
              <FaCheckCircle />
            </div>
            <div>
              <div className="text-lg font-bold font-heading text-cyan-300">{problemSolvingStats.badge}</div>
              <div className="text-xs font-mono text-slate-400 uppercase">LeetCode Badge</div>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-violet-500/30 flex items-center space-x-4">
            <div className="p-3.5 rounded-xl bg-violet-500/10 text-violet-400 text-2xl">
              <FaCode />
            </div>
            <div>
              <div className="text-2xl font-extrabold font-heading text-slate-100">{problemSolvingStats.mainLanguage}</div>
              <div className="text-xs font-mono text-slate-400 uppercase">Primary Language</div>
            </div>
          </div>
        </div>

        {/* DSA Topic Breakdown Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-16">
          {problemSolvingStats.categories.map((cat, idx) => (
            <div
              key={idx}
              className="glass-card p-4 border border-slate-800 hover:border-cyan-500/40 text-center font-mono"
            >
              <div className="text-xs font-bold text-slate-200 mb-1">{cat.name}</div>
              <div className="text-[11px] text-cyan-400">{cat.count}</div>
            </div>
          ))}
        </div>

        {/* Difficulty Breakdown + Recent Accepted — 2 col layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">

          {/* Difficulty Breakdown */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-bold font-mono text-slate-200 uppercase tracking-widest">Difficulty Breakdown</h3>
              <span className="text-xs font-mono text-slate-500">Total: {problemSolvingStats.totalCount}</span>
            </div>

            {/* Easy */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-wider">Easy</span>
                <span className="text-xs font-mono text-slate-300 font-bold">{problemSolvingStats.easySolved}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-400 transition-all duration-700"
                  style={{ width: `${(problemSolvingStats.easySolved / problemSolvingStats.totalCount) * 100}%` }}
                />
              </div>
            </div>

            {/* Medium */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold font-mono text-amber-400 uppercase tracking-wider">Medium</span>
                <span className="text-xs font-mono text-slate-300 font-bold">{problemSolvingStats.mediumSolved}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-amber-400 transition-all duration-700"
                  style={{ width: `${(problemSolvingStats.mediumSolved / problemSolvingStats.totalCount) * 100}%` }}
                />
              </div>
            </div>

            {/* Hard */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold font-mono text-rose-400 uppercase tracking-wider">Hard</span>
                <span className="text-xs font-mono text-slate-300 font-bold">{problemSolvingStats.hardSolved}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-rose-400 transition-all duration-700"
                  style={{ width: `${(problemSolvingStats.hardSolved / problemSolvingStats.totalCount) * 100}%` }}
                />
              </div>
            </div>

            {/* Mini badge row */}
            <div className="flex items-center gap-2 flex-wrap mt-2">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-bold">{problemSolvingStats.easySolved} Easy</span>
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-mono font-bold">{problemSolvingStats.mediumSolved} Medium</span>
              <span className="px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[11px] font-mono font-bold">{problemSolvingStats.hardSolved} Hard</span>
            </div>
          </div>

          {/* Recent Accepted */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-bold font-mono text-slate-200 uppercase tracking-widest">Recent Accepted</h3>
              <a
                href={problemSolvingStats.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                {problemSolvingStats.handle} <FaExternalLinkAlt className="text-[10px]" />
              </a>
            </div>

            <div className="space-y-2.5">
              {problemSolvingStats.recentAccepted.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors"
                >
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-mono text-slate-200 truncate font-medium">{item.name}</span>
                    <span className="text-[10px] font-mono text-slate-500 mt-0.5">{item.tag} · {item.lang}</span>
                  </div>
                  <span className={`ml-3 shrink-0 px-2 py-0.5 rounded-md text-[10px] font-bold font-mono uppercase ${
                    item.difficulty === 'Easy'   ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                    item.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                                                   'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                  }`}>
                    {item.difficulty}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* INTERACTIVE ALGORITHM VISUALIZER ENGINE (Binary Search) */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-cyan-500/30 shadow-[0_0_30px_rgba(0,229,255,0.15)] font-mono">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4">
            <div>
              <h3 className="text-xl font-bold font-heading text-slate-100 flex items-center space-x-2">
                <span className="text-cyan-400">&gt;</span>
                <span>INTERACTIVE ALGORITHM VISUALIZER: BINARY SEARCH</span>
              </h3>
              <p className="text-xs text-slate-400 font-sans mt-1">
                Target: <span className="text-cyan-400 font-bold font-mono">11</span> • Time Complexity: <span className="text-emerald-400 font-bold font-mono">O(log N)</span>
              </p>
            </div>

            <div className="flex items-center space-x-3 text-xs">
              <button
                onClick={handleNextStep}
                className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-400 font-bold hover:bg-cyan-500/30 transition-colors flex items-center space-x-1.5 cursor-pointer"
              >
                <FaStepForward />
                <span>Next Step ({step + 1}/3)</span>
              </button>

              <button
                onClick={handleReset}
                className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors cursor-pointer"
                title="Reset Visualizer"
              >
                <FaUndo />
              </button>
            </div>
          </div>

          {/* Array Visual Blocks */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-6">
            {sortedArray.map((val, idx) => {
              const isLow = idx === currentStep.low;
              const isHigh = idx === currentStep.high;
              const isMid = idx === currentStep.mid;
              const isTarget = val === target && isMid;

              let borderStyle = 'border-slate-800 bg-slate-900/80 text-slate-300';
              if (isTarget) borderStyle = 'border-emerald-400 bg-emerald-950/80 text-emerald-300 font-bold shadow-[0_0_15px_#10b981]';
              else if (isMid) borderStyle = 'border-amber-400 bg-amber-950/80 text-amber-300 font-bold shadow-[0_0_15px_#f59e0b]';
              else if (idx >= currentStep.low && idx <= currentStep.high) borderStyle = 'border-cyan-500/50 bg-cyan-950/40 text-cyan-200';

              return (
                <div key={idx} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-12 sm:w-14 sm:h-14 rounded-xl border flex items-center justify-center text-sm font-bold transition-all duration-300 ${borderStyle}`}
                  >
                    {val}
                  </div>

                  <span className="text-[10px] text-slate-500 mt-1">idx {idx}</span>

                  {/* Pointer Badges */}
                  <div className="flex flex-col items-center space-y-0.5 mt-1 text-[10px] font-bold">
                    {isLow && <span className="text-cyan-400 uppercase">LOW</span>}
                    {isMid && <span className="text-amber-400 uppercase">MID</span>}
                    {isHigh && <span className="text-violet-400 uppercase">HIGH</span>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Status Console Line */}
          <div className="mt-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono flex items-center justify-between">
            <span className="text-slate-300">STATUS: {currentStep.status}</span>
            <span className="text-cyan-400 font-bold hidden sm:inline">STEP {step + 1} / 3</span>
          </div>
        </div>
      </div>
    </section>
  );
}

