import React, { useState, useRef, useEffect } from 'react';
import { profile } from '../data/PortfolioData';
import { FaRobot, FaTimes, FaPaperPlane, FaUser, FaCircle } from 'react-icons/fa';

export default function GovindAI({ isOpen, onClose, onToggle }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey! I'm Govind AI. Ask me anything about Govind's Java & Full Stack projects, DSA streak, or technical background!"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatMode, setChatMode] = useState('ready');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // Local fallback response generator for Govind's profile
  const getGovindAnswer = (query) => {
    const q = query.toLowerCase();
    if (q.includes('skill') || q.includes('stack') || q.includes('language')) {
      return `Govind specializes in Java, Python, C, HTML5, CSS3, JavaScript, Tailwind CSS, React.js, NumPy, Pandas, Node.js, FastAPI, and DSA!`;
    }
    if (q.includes('project') || q.includes('pulsebridge') || q.includes('nexshelf')) {
      return `Govind has built featured projects like PulseBridge (AI Blood Donation Platform with Groq LLaMA 3.3 70B), NexShelf (AI Library Management System), and AI Study Planner!`;
    }
    if (q.includes('dsa') || q.includes('leetcode') || q.includes('problem')) {
      return `Govind has an unbroken 200+ Days streak on LeetCode with over 350+ DSA problems solved, focusing primarily on Java data structures (Arrays, DP, Graphs, Trees).`;
    }
    if (q.includes('education') || q.includes('college') || q.includes('university') || q.includes('school')) {
      return `Govind is pursuing B.Tech in Computer Science & Engineering at Allenhouse Institute of Technology, Kanpur (2025–2029). He completed secondary education at New Kingston Senior Secondary School (86.5%).`;
    }
    if (q.includes('contact') || q.includes('email') || q.includes('hire')) {
      return `You can reach Govind via email at ${profile.email} or connect with him on LinkedIn (${profile.linkedin}) and GitHub (${profile.github}).`;
    }
    return `Govind Singh is a Software Developer specializing in Java, DSA, and Full Stack Web Engineering. Feel free to ask about his projects, skills, or education!`;
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const newMsgList = [...messages, { role: 'user', content: text }];
    setMessages(newMsgList);
    setInput('');
    setLoading(true);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const apiBase = (import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://localhost:8000' : '')).trim().replace(/\/$/, '');
      const res = await fetch(`${apiBase}/api/chat`, {
        method: 'POST',
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMsgList.map(({ role, content }) => ({ role, content }))
        })
      });

      if (!res.ok) throw new Error('API unavailable');
      const data = await res.json();
      if (typeof data.reply !== 'string' || !data.reply.trim()) throw new Error('Empty AI reply');
      setChatMode('online');
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply.trim() }]);
    } catch (err) {
      setChatMode('fallback');
      const reply = getGovindAnswer(text);
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Widget Launcher Button at bottom right */}
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-[9990] w-14 h-14 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 text-slate-950 flex items-center justify-center shadow-[0_0_25px_rgba(0,229,255,0.5)] hover:scale-110 active:scale-95 transition-transform cursor-pointer"
        title="Open Govind AI Assistant"
      >
        {isOpen ? <FaTimes className="text-xl text-slate-950" /> : <FaRobot className="text-2xl text-slate-950" />}
      </button>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-[9995] w-[90vw] sm:w-[380px] h-[500px] glass-panel rounded-3xl border border-cyan-500/40 shadow-[0_0_50px_rgba(0,229,255,0.25)] flex flex-col overflow-hidden font-mono text-xs animate-fadeIn">
          {/* Header */}
          <div className="bg-[#07090D]/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 flex items-center justify-center text-slate-950 font-bold">
                <FaRobot />
              </div>
              <div>
                <h4 className="font-bold text-slate-100 font-heading text-sm leading-none">
                  Govind.AI
                </h4>
                <span className="text-[10px] text-emerald-400 flex items-center space-x-1">
                  <FaCircle className="text-[6px] animate-pulse" />
                  <span>{chatMode === 'online' ? 'ONLINE | GROQ POWERED' : chatMode === 'fallback' ? 'BASIC PORTFOLIO ANSWERS' : 'ASK ABOUT GOVIND'}</span>
                </span>
              </div>
            </div>

            <button onClick={onClose} className="text-slate-400 hover:text-cyan-400">
              <FaTimes />
            </button>
          </div>

          {chatMode === 'fallback' && (
            <p role="status" className="px-4 py-2 text-amber-200 bg-slate-900">
              AI is temporarily unavailable. I can still answer basic questions about Govind. Try sending another message to reconnect.
            </p>
          )}

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#05070A]/90">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex space-x-2 ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                    <FaRobot className="text-[10px]" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] p-3 rounded-2xl leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold font-sans'
                      : 'bg-slate-900/90 text-slate-200 border border-slate-800 font-sans'
                  }`}
                >
                  {msg.content}
                </div>

                {msg.role === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                    <FaUser className="text-[10px]" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center space-x-2 text-cyan-400 font-mono text-[11px] animate-pulse">
                <FaRobot />
                <span>Thinking...</span>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSend} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Govind's skills or projects..."
              className="flex-1 px-3 py-2 rounded-xl bg-[#05070A] border border-slate-800 text-slate-100 outline-none text-xs focus:border-cyan-400 placeholder:text-slate-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="p-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors cursor-pointer"
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
