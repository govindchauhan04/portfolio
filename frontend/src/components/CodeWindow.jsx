import React, { useState, useEffect, useRef } from 'react';
import { codeWindowSnippet } from '../data/PortfolioData';
import { FaCopy, FaCheck, FaTerminal } from 'react-icons/fa';

export default function CodeWindow() {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef(null);
  const hasAnimated = useRef(false);

  const lines = codeWindowSnippet.split('\n');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          // Reveal lines one by one
          lines.forEach((line, index) => {
            setTimeout(() => {
              setDisplayedLines((prev) => [...prev, line]);
            }, index * 120);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [lines]);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeWindowSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Basic syntax highlighter helper
  const highlightSyntax = (line) => {
    if (line.trim().startsWith('//')) {
      return <span className="text-slate-500 italic">{line}</span>;
    }
    if (line.includes('public class')) {
      return (
        <span>
          <span className="text-purple-400 font-bold">public class </span>
          <span className="text-amber-300 font-bold">Developer </span>
          <span className="text-slate-200">&#123;</span>
        </span>
      );
    }
    if (line.includes('private String')) {
      const parts = line.split('=');
      return (
        <span>
          <span className="text-purple-400">private </span>
          <span className="text-cyan-400">String </span>
          <span className="text-slate-200">{parts[0].replace('private String', '')}</span>
          {parts[1] && (
            <>
              <span className="text-rose-400">=</span>
              <span className="text-emerald-300">{parts[1]}</span>
            </>
          )}
        </span>
      );
    }
    if (line.includes('private boolean')) {
      return (
        <span>
          <span className="text-purple-400">private </span>
          <span className="text-cyan-400">boolean </span>
          <span className="text-slate-200">isCurious() &#123;</span>
        </span>
      );
    }
    if (line.includes('return true;')) {
      return (
        <span>
          <span className="text-purple-400">return </span>
          <span className="text-rose-400">true</span>; <span className="text-slate-500 italic">// Lifelong Learner</span>
        </span>
      );
    }
    if (line.includes('public void build()')) {
      return (
        <span>
          <span className="text-purple-400">public void </span>
          <span className="text-blue-400 font-bold">build</span>() &#123;
        </span>
      );
    }
    if (line.includes('while')) {
      return (
        <span>
          <span className="text-purple-400">while </span>(isCurious()) &#123;
        </span>
      );
    }
    if (line.includes('String[] interests')) {
      return (
        <span>
          <span className="text-purple-400">private </span>
          <span className="text-cyan-400">String[] </span>
          <span className="text-slate-200">interests = &#123;</span>
        </span>
      );
    }

    return <span className="text-slate-300">{line}</span>;
  };

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden bg-[#07090D]">
      <div className="w-[92%] max-w-5xl mx-auto">
        <div className="flex items-center space-x-3 mb-4">
          <span className="h-[1px] w-12 bg-cyan-400" />
          <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">04 // SOURCE CODE</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-100 uppercase tracking-tight mb-8">
          ENGINEERING <span className="text-gradient-cyan">BLUEPRINT</span>
        </h2>

        {/* VS Code Window Container */}
        <div className="glass-panel rounded-2xl overflow-hidden border border-cyan-500/30 shadow-[0_0_40px_rgba(0,229,255,0.15)] font-mono">
          {/* Header Bar */}
          <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-xs text-slate-400 ml-4 font-mono">Developer.java</span>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors px-3 py-1 rounded bg-slate-800/60 border border-slate-700 cursor-pointer"
            >
              {copied ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>

          {/* Code Lines Body */}
          <div className="p-6 overflow-x-auto text-xs sm:text-sm bg-[#05070A] leading-relaxed">
            {displayedLines.map((line, idx) => (
              <div key={idx} className="flex space-x-4">
                <span className="text-slate-600 select-none text-right w-6 shrink-0">{idx + 1}</span>
                <div className="whitespace-pre">{highlightSyntax(line)}</div>
              </div>
            ))}
            {displayedLines.length < lines.length && (
              <div className="flex space-x-4 animate-pulse">
                <span className="text-slate-600 text-right w-6 shrink-0">{displayedLines.length + 1}</span>
                <span className="w-2 h-4 bg-cyan-400 inline-block" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

