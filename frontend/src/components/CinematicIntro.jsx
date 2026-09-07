import React, { useState, useEffect } from 'react';
import { FaTerminal, FaCheckCircle, FaForward } from 'react-icons/fa';

export default function CinematicIntro({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING PORTFOLIO...');
  const [isDone, setIsDone] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if user already saw full intro during this browser session
    const hasVisited = sessionStorage.getItem('gsc_portfolio_visited');
    if (hasVisited) {
      // Fast path for returning visitors
      setIsVisible(false);
      onComplete && onComplete();
      return;
    }

    const logs = [
      { threshold: 15, text: 'INITIALIZING PORTFOLIO KERNEL...' },
      { threshold: 35, text: 'LOADING REACT & GSAP MODULES...' },
      { threshold: 60, text: 'INDEXING JAVA DSA & PROJECT ARTIFACTS...' },
      { threshold: 85, text: 'CONFIGURING CYBER ENGINE...' },
      { threshold: 100, text: 'SYSTEM READY. EXECUTING GOVIND.EXE...' }
    ];

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            sessionStorage.setItem('gsc_portfolio_visited', 'true');
            setTimeout(() => {
              setIsVisible(false);
              onComplete && onComplete();
            }, 600);
          }, 300);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 8) + 4;
        const currentLog = logs.find((l) => next >= l.threshold && prev < l.threshold);
        if (currentLog) {
          setStatusText(currentLog.text);
        }
        return next > 100 ? 100 : next;
      });
    }, 80);

    return () => clearInterval(timer);
  }, [onComplete]);

  const handleSkip = () => {
    sessionStorage.setItem('gsc_portfolio_visited', 'true');
    setIsVisible(false);
    onComplete && onComplete();
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#07090D] transition-opacity duration-700 ${
        isDone ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="w-full max-w-md px-6 flex flex-col items-center font-mono">
        {/* Terminal Header Icon */}
        <div className="w-14 h-14 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 shadow-[0_0_25px_rgba(0,229,255,0.25)] animate-pulse">
          <FaTerminal className="text-2xl" />
        </div>

        <h1 className="text-xl font-bold tracking-wider text-slate-100 mb-2">
          GOVIND.EXE
        </h1>

        <p className="text-xs text-cyan-400 tracking-widest uppercase mb-8 h-5 text-center">
          {statusText}
        </p>

        {/* Progress Bar Container */}
        <div className="w-full bg-slate-900/80 border border-slate-800 rounded-full h-3 p-0.5 overflow-hidden mb-4 shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-150 ease-out relative shadow-[0_0_12px_rgba(0,229,255,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Counter */}
        <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-8">
          <span>[████████████████]</span>
          <span className="text-cyan-400 font-bold">{progress}%</span>
        </div>

        {/* Skip button */}
        <button
          onClick={handleSkip}
          className="flex items-center space-x-2 text-xs text-slate-400 hover:text-cyan-400 transition-colors px-4 py-2 rounded-lg bg-slate-900/40 border border-slate-800 hover:border-cyan-500/40"
        >
          <span>Skip Intro</span>
          <FaForward className="text-xs" />
        </button>
      </div>
    </div>
  );
}

