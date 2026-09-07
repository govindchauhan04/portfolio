import React, { useState, useEffect } from 'react';
import { profile } from '../data/PortfolioData';
import { FaSearch, FaExternalLinkAlt, FaCode, FaFileDownload, FaEnvelope, FaMoon, FaTimes, FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');

  const commands = [
    {
      id: 'projects',
      label: 'Go to Projects Showcase',
      action: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'skills',
      label: 'Inspect Skill Universe',
      action: () => {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'resume',
      label: 'Download Resume PDF',
      action: () => {
        window.open(profile.resumeUrl, '_blank');
        onClose();
      }
    },
    {
      id: 'github',
      label: 'Open GitHub Profile',
      action: () => {
        window.open(profile.github, '_blank');
        onClose();
      }
    },
    {
      id: 'linkedin',
      label: 'Open LinkedIn Profile',
      action: () => {
        window.open(profile.linkedin, '_blank');
        onClose();
      }
    },
    {
      id: 'leetcode',
      label: 'View LeetCode Profile',
      action: () => {
        window.open(profile.leetcode, '_blank');
        onClose();
      }
    },
    {
      id: 'contact',
      label: 'Send Email Message',
      action: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    }
  ];

  const filteredCommands = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl + K or '/' key shortcut
      if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName))) {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          window.dispatchEvent(new CustomEvent('open-command-palette'));
        }
      }
      if (e.key === 'Escape' && isOpen) onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9995] flex items-start justify-center pt-24 p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#0D1117] border border-cyan-500/40 rounded-2xl shadow-[0_0_50px_rgba(0,229,255,0.25)] overflow-hidden font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-[#07090D]">
          <FaSearch className="text-cyan-400 text-sm mr-3" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command or search section..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-slate-100 text-sm focus:ring-0 placeholder:text-slate-500"
          />
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300">
            <FaTimes />
          </button>
        </div>

        {/* Command List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd) => (
              <button
                key={cmd.id}
                onClick={cmd.action}
                className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-cyan-500/10 hover:text-cyan-400 text-slate-300 text-xs flex items-center justify-between transition-colors group cursor-pointer"
              >
                <span>&gt; {cmd.label}</span>
                <FaExternalLinkAlt className="text-[10px] text-slate-600 group-hover:text-cyan-400" />
              </button>
            ))
          ) : (
            <div className="px-4 py-6 text-center text-xs text-slate-500">
              No matching commands found
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2 bg-slate-900/90 border-t border-slate-800 text-[10px] text-slate-500 flex justify-between">
          <span>NAVIGATION: ↑↓ ENTER</span>
          <span>ESC TO CLOSE</span>
        </div>
      </div>
    </div>
  );
}

