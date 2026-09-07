import React from 'react';
import { profile } from '../data/PortfolioData';
import { FaGithub, FaLinkedin, FaArrowUp } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-20 relative overflow-hidden bg-[#05070A] border-t border-slate-800">
      <div className="w-[92%] max-w-7xl mx-auto flex flex-col justify-between">
        {/* Large Typography Callout */}
        <div className="mb-16">
          <h2 className="text-4xl sm:text-7xl lg:text-8xl font-extrabold font-heading text-slate-100 uppercase tracking-tight leading-[0.95]">
            LET'S CREATE <br />
            <span className="text-gradient-purple">SOMETHING</span> <br />
            <span className="text-gradient-cyan">AWESOME.</span>
          </h2>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-slate-400">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-slate-200 font-bold">
              Designed &amp; Built by {profile.name}
            </p>
            <p className="text-slate-500">
              Built with React + curiosity + ☕
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-cyan-400 border border-slate-800 transition-colors"
              title="GitHub"
            >
              <FaGithub className="text-base" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-cyan-400 border border-slate-800 transition-colors"
              title="LinkedIn"
            >
              <FaLinkedin className="text-base" />
            </a>
            <a
              href={profile.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-amber-400 border border-slate-800 transition-colors"
              title="LeetCode"
            >
              <SiLeetcode className="text-base" />
            </a>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-800 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <FaArrowUp className="text-xs" />
          </button>
        </div>
      </div>
    </footer>
  );
}
