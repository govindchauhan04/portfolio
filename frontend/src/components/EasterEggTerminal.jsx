import React, { useState, useEffect, useRef } from 'react';
import { profile } from '../data/PortfolioData';
import { FaTerminal, FaTimes, FaMinus } from 'react-icons/fa';

export default function EasterEggTerminal({ isOpen, onClose }) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'sys', text: 'Govind Cyber Shell v2.5 [Type "help" for options]' }
  ]);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = inputVal.trim();
      const lower = cmd.toLowerCase();

      let responseText = [];

      if (lower === 'help') {
        responseText = [
          'AVAILABLE COMMANDS:',
          '  whoami          - Display core identity',
          '  about           - Short background story',
          '  skills          - Overview of technical skills',
          '  projects        - List top production projects',
          '  github          - Open GitHub profile',
          '  leetcode        - Open LeetCode profile',
          '  contact         - Display contact information',
          '  sudo hire govind - High-priority execution command',
          '  clear           - Clear terminal screen'
        ];
      } else if (lower === 'whoami') {
        responseText = [`${profile.name} — ${profile.role} (${profile.location})`];
      } else if (lower === 'about') {
        responseText = profile.aboutStory;
      } else if (lower === 'skills') {
        responseText = [
          'Languages: Java, Python, C, HTML5, CSS3, JavaScript, C++, SQL',
          'Frontend: React.js, Tailwind CSS, HTML5, CSS3, Vite',
          'Data Science: NumPy, Pandas, Data Analysis',
          'Backend & DB: Node.js, Express, FastAPI, MongoDB, MySQL',
          'Core: DSA, OOP, DBMS, OS | Tools: Git, GitHub, Postman, VS Code'
        ];
      } else if (lower === 'projects') {
        responseText = [
          '1. PulseBridge — AI Blood Donation Platform',
          '2. NexShelf — AI Library Management',
          '3. AI Study Planner — Schedule Generator'
        ];
      } else if (lower === 'github') {
        window.open(profile.github, '_blank');
        responseText = [`Opening ${profile.github}...`];
      } else if (lower === 'leetcode') {
        window.open(profile.leetcode, '_blank');
        responseText = [`Opening ${profile.leetcode}...`];
      } else if (lower === 'contact') {
        responseText = [`Email: ${profile.email}`, `Phone: ${profile.phone}`];
      } else if (lower === 'sudo hire govind') {
        responseText = [
          'Authenticating request...',
          'Permission granted.',
          'Excellent decision. 🚀',
          'Govind Singh is now queued for your engineering team!'
        ];
      } else if (lower === 'clear') {
        setHistory([]);
        setInputVal('');
        return;
      } else {
        responseText = [`Command not found: "${cmd}". Type "help" for command list.`];
      }

      setHistory((prev) => [
        ...prev,
        { type: 'user', text: `govind@cli:~$ ${cmd}` },
        ...responseText.map((t) => ({ type: 'sys', text: t }))
      ]);
      setInputVal('');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9990] w-full max-w-lg shadow-[0_0_40px_rgba(0,229,255,0.2)] animate-fadeIn">
      <div className="glass-panel rounded-2xl overflow-hidden border border-cyan-500/40 bg-[#07090D]/95 font-mono text-xs">
        {/* Terminal Header */}
        <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-cyan-400">
            <FaTerminal />
            <span className="font-bold">GOVIND_CLI_TERMINAL.EXE</span>
          </div>

          <div className="flex items-center space-x-2 text-slate-400">
            <button onClick={onClose} className="hover:text-cyan-400 p-1">
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Console Body */}
        <div className="p-4 h-64 overflow-y-auto space-y-2 bg-[#05070A]/90">
          {history.map((item, idx) => (
            <div
              key={idx}
              className={`${
                item.type === 'user'
                  ? 'text-cyan-400 font-bold'
                  : item.text.includes('Permission granted')
                  ? 'text-emerald-400 font-bold'
                  : 'text-slate-300'
              }`}
            >
              {item.text}
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Input Bar */}
        <div className="px-4 py-2.5 bg-slate-900 border-t border-slate-800 flex items-center space-x-2 text-cyan-400">
          <span>&gt;</span>
          <input
            type="text"
            autoFocus
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleCommand}
            placeholder="Type 'sudo hire govind' or 'help'..."
            className="w-full bg-transparent border-none outline-none text-slate-100 font-mono text-xs focus:ring-0 placeholder:text-slate-600"
          />
        </div>
      </div>
    </div>
  );
}

