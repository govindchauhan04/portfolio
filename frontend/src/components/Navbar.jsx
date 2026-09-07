import React, { useState, useEffect } from 'react';
import { FaTerminal, FaMoon, FaSun, FaBars, FaTimes, FaRobot } from 'react-icons/fa';

export default function Navbar({ onOpenTerminal, onOpenAI }) {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [theme, setTheme] = useState('cyber-dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'notes', label: 'Notes' },
    { id: 'journey', label: 'Journey' },
    { id: 'education', label: 'Education' },
    { id: 'videos', label: 'Videos' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'contact', label: 'Contact' }
  ];

  // Active section observer & hide-on-scroll down
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Hide on scroll down
      } else {
        setIsVisible(true); // Show on scroll up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // IntersectionObserver for active section link highlighting
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'cyber-dark' ? 'cyber-contrast' : 'cyber-dark';
    setTheme(nextTheme);
    if (nextTheme === 'cyber-contrast') {
      document.documentElement.setAttribute('data-theme', 'cyber-contrast');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[94%] max-w-7xl z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0 pointer-events-none'
      }`}
    >
      <nav className="glass-panel rounded-2xl px-4 py-3 flex items-center justify-between shadow-2xl border border-cyan-500/20">
        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          className="flex items-center space-x-2 font-mono text-lg font-bold text-slate-100 hover:text-cyan-400 transition-colors group cursor-pointer"
        >
          <span className="text-cyan-400 group-hover:scale-110 transition-transform">&lt;</span>
          <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">GS</span>
          <span className="text-cyan-400 group-hover:scale-110 transition-transform">/&gt;</span>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-1 font-sans text-xs font-medium">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-cyan-400 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full shadow-[0_0_8px_#00e5ff]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Actions: Govind AI Launcher, Terminal Toggle, Theme Switch, Mobile Hamburger */}
        <div className="flex items-center space-x-2.5">
          {/* AI Assistant Chat Launcher */}
          <button
            onClick={onOpenAI}
            title="Ask Govind AI Assistant"
            className="flex items-center space-x-1.5 text-xs font-mono px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 transition-all shadow-[0_0_12px_rgba(0,229,255,0.2)] cursor-pointer"
          >
            <FaRobot className="text-cyan-400 text-sm animate-pulse" />
            <span className="hidden sm:inline font-bold">Govind.AI</span>
          </button>

          {/* Terminal Launcher */}
          <button
            onClick={onOpenTerminal}
            title="Open Interactive Terminal (> _)"
            className="flex items-center space-x-1.5 text-xs font-mono px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all cursor-pointer"
          >
            <FaTerminal className="text-xs" />
            <span className="hidden sm:inline">&gt; _</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            title="Toggle Visual Mode"
            className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800/60 transition-colors cursor-pointer"
          >
            {theme === 'cyber-dark' ? <FaSun className="text-amber-400" /> : <FaMoon className="text-cyan-400" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-slate-800/60 cursor-pointer"
          >
            {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 glass-panel rounded-2xl p-4 border border-cyan-500/30 flex flex-col space-y-1.5 font-mono text-xs animate-fadeIn max-h-[70vh] overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`text-left px-3.5 py-2 rounded-lg transition-colors ${
                activeSection === item.id
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold'
                  : 'text-slate-300 hover:bg-slate-800/40'
              }`}
            >
              &gt; {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
