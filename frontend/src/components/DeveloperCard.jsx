import React, { useState, useRef } from 'react';
import { profile } from '../data/PortfolioData';
import { FaJava, FaCode, FaCheckCircle } from 'react-icons/fa';
import { SiJavascript, SiReact } from 'react-icons/si';

export default function DeveloperCard() {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth < 768) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12; // tilt angle X
    const rotateY = ((x - centerX) / centerX) * 12;  // tilt angle Y

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.4
    });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: 'transform 0.15s ease-out, box-shadow 0.3s ease-out'
      }}
      className="relative w-full max-w-sm sm:max-w-md rounded-3xl p-6 glass-panel border border-cyan-500/30 shadow-[0_0_40px_rgba(0,229,255,0.15)] overflow-hidden cursor-pointer select-none group scanline-effect"
    >
      {/* Dynamic Cursor Light / Holographic Glare Layer */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-3xl z-10"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(0, 229, 255, ${glarePos.opacity}) 0%, rgba(139, 92, 246, ${glarePos.opacity * 0.5}) 30%, transparent 70%)`
        }}
      />

      {/* Laser Scanline Beam */}
      <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent top-0 animate-[scan_4s_ease-in-out_infinite] z-20 pointer-events-none opacity-70" />

      {/* Top Header Card Info */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-5">
        <div className="flex items-center space-x-2 font-mono text-xs text-cyan-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-bold tracking-widest uppercase">ID: GS-9026-DEV</span>
        </div>
        <div className="flex items-center space-x-1.5 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-mono border border-emerald-500/30">
          <FaCheckCircle className="text-xs" />
          <span>ONLINE</span>
        </div>
      </div>

      {/* Side portrait panel and identity */}
      <div className="developer-portrait-layout mb-6">
        <div className="developer-portrait relative rounded-2xl overflow-hidden border-2 border-cyan-400/50 shadow-[0_0_24px_rgba(0,229,255,0.28)] shrink-0">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.src = '/Portfolio.png';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07090D] via-transparent to-transparent opacity-40" />
          <span className="developer-portrait-label font-mono">PORTRAIT / 01</span>
        </div>

        <div className="min-w-0">
          <span className="text-[10px] font-mono tracking-[0.22em] text-slate-500 uppercase">Digital maker</span>
          <h2 className="text-2xl font-bold font-heading text-slate-100 tracking-tight">
            GOVIND SINGH
          </h2>
          <p className="text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase mb-1">
            SOFTWARE DEVELOPER
          </p>
          <p className="text-xs text-slate-400 font-mono">
            {profile.location}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5 font-mono text-[10px] uppercase tracking-wider">
            <span className="rounded-md border border-cyan-500/30 bg-cyan-500/10 px-2 py-1 text-cyan-300">Available</span>
            <span className="rounded-md border border-violet-500/30 bg-violet-500/10 px-2 py-1 text-violet-300">Open to build</span>
          </div>
        </div>
      </div>

      {/* Attributes Grid */}
      <div className="grid grid-cols-2 gap-3 font-mono text-xs mb-6">
        <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800">
          <span className="text-slate-500 text-[10px] block uppercase tracking-wider mb-0.5">PRIMARY STACK</span>
          <span className="text-cyan-300 font-bold flex items-center space-x-1.5">
            <FaJava className="text-amber-500" />
            <span>JAVA</span>
          </span>
        </div>

        <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800">
          <span className="text-slate-500 text-[10px] block uppercase tracking-wider mb-0.5">ENGINEERING FOCUS</span>
          <span className="text-violet-300 font-bold flex items-center space-x-1.5">
            <FaCode className="text-violet-400" />
            <span>DSA / FULL STACK</span>
          </span>
        </div>
      </div>

      {/* Quick Skill Badges */}
      <div className="flex items-center justify-between text-xs font-mono pt-3 border-t border-slate-800/80 text-slate-400">
        <div className="flex items-center space-x-2">
          <span className="text-cyan-400"><SiReact /></span>
          <span className="text-amber-400"><FaJava /></span>
          <span className="text-yellow-400"><SiJavascript /></span>
        </div>
        <span className="text-[11px] text-slate-500">196+ LEETCODE SOLVED</span>
      </div>
    </div>
  );
}

