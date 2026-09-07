import React, { useState } from 'react';
import { skillsCategories, marqueeTech } from '../data/PortfolioData';
import {
  SiJavascript, SiReact, SiTailwindcss, SiVite,
  SiNodedotjs, SiExpress, SiFastapi, SiMongodb, SiMysql, SiGit, SiGithub,
  SiPostman, SiPython, SiC, SiCplusplus, SiTypescript, SiRedux, SiHtml5,
  SiNumpy, SiPandas
} from 'react-icons/si';
import {
  FaJava, FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaDatabase,
  FaGitAlt, FaGithub, FaTerminal, FaProjectDiagram, FaBrain, FaCubes,
  FaInfoCircle, FaLaptopCode, FaCode
} from 'react-icons/fa';

// Map icon string names to components safely
const iconMap = {
  SiJava: FaJava,
  FaJava,
  SiPython,
  SiC,
  SiCplusplus,
  SiNumpy,
  SiPandas,
  SiJavascript: FaJs,
  FaJs,
  SiTypescript,
  SiHtml5: FaHtml5,
  FaHtml5,
  SiCss3: FaCss3Alt,
  FaCss3Alt,
  SiReact: FaReact,
  FaReact,
  SiTailwindcss,
  SiVite,
  SiRedux,
  SiNodedotjs: FaNodeJs,
  FaNodeJs,
  SiExpress,
  SiFastapi,
  SiMongodb,
  SiMysql: FaDatabase,
  SiGit: FaGitAlt,
  FaGitAlt,
  SiGithub: FaGithub,
  FaGithub,
  SiVisualstudiocode: FaLaptopCode,
  SiPostman,
  FaProjectDiagram,
  FaBrain,
  FaCubes,
  FaDatabase,
  FaTerminal,
  FaCode,
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Flatten all skills for "All" filter
  const allSkills = skillsCategories.flatMap((cat) =>
    cat.skills.map((s) => ({ ...s, categoryName: cat.name }))
  );

  const [hoveredSkill, setHoveredSkill] = useState(() => ({
    ...skillsCategories[0]?.skills[0],
    categoryName: skillsCategories[0]?.name || 'Languages'
  }));

  const displayedSkills =
    activeCategory === 'All'
      ? allSkills
      : skillsCategories
          .find((cat) => cat.name === activeCategory)
          ?.skills.map((s) => ({ ...s, categoryName: activeCategory })) || [];

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#0D1117]/60 border-y border-slate-800/80">
      <div className="w-[92%] max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="h-[1px] w-12 bg-cyan-400" />
          <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">02 // TECH STACK & LANGUAGES</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-100 uppercase tracking-tight">
              SKILL <span className="text-gradient-purple">UNIVERSE</span>
            </h2>
            <p className="text-slate-400 text-sm font-sans mt-2">
              Explore core programming languages, frontend engineering, backend architectures, and foundational CS competencies.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0 font-mono text-xs">
            <button
              onClick={() => {
                setActiveCategory('All');
                if (allSkills[0]) setHoveredSkill(allSkills[0]);
              }}
              className={`px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                activeCategory === 'All'
                  ? 'bg-cyan-500/20 text-cyan-400 border-cyan-400 font-bold shadow-[0_0_10px_rgba(0,229,255,0.2)]'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              ALL
            </button>
            {skillsCategories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => {
                  setActiveCategory(cat.name);
                  if (cat.skills[0]) {
                    setHoveredSkill({ ...cat.skills[0], categoryName: cat.name });
                  }
                }}
                className={`px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  activeCategory === cat.name
                    ? 'bg-cyan-500/20 text-cyan-400 border-cyan-400 font-bold shadow-[0_0_10px_rgba(0,229,255,0.2)]'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                {cat.name.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid + Inspector Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Skill Cards Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {displayedSkills.map((skill, idx) => {
              const IconComp = iconMap[skill.icon] || FaTerminal;
              const isSelected = hoveredSkill?.name === skill.name && hoveredSkill?.categoryName === skill.categoryName;

              return (
                <div
                  key={`${skill.categoryName}-${skill.name}-${idx}`}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onClick={() => setHoveredSkill(skill)}
                  className={`p-4 sm:p-5 rounded-2xl glass-panel transition-all duration-300 cursor-pointer flex flex-col items-center text-center group relative overflow-hidden select-none ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-950/20 shadow-[0_0_25px_rgba(0,229,255,0.25)] -translate-y-1 ring-1 ring-cyan-400/50'
                      : 'border-slate-800 hover:border-slate-700 hover:-translate-y-0.5'
                  }`}
                >
                  <div className={`text-3xl mb-3 transition-transform group-hover:scale-110 ${
                    isSelected ? 'text-cyan-300 scale-105' : 'text-cyan-400'
                  }`}>
                    <IconComp />
                  </div>
                  <h3 className="font-heading font-bold text-slate-100 text-sm mb-1">
                    {skill.name}
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded-full border border-slate-800">
                    {skill.categoryName}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Interactive Technology Inspector Panel */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 shadow-[0_0_20px_rgba(0,229,255,0.1)] min-h-[320px] flex flex-col justify-between">
              {hoveredSkill ? (
                <div>
                  <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-slate-800">
                    <div className="text-3xl text-cyan-400 p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/20">
                      {React.createElement(iconMap[hoveredSkill.icon] || FaTerminal)}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-slate-100 text-lg">
                        {hoveredSkill.name}
                      </h4>
                      <span className="text-xs font-mono text-cyan-400 font-semibold">
                        {hoveredSkill.categoryName} • {hoveredSkill.level}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs font-sans text-slate-300 leading-relaxed mb-6">
                    {hoveredSkill.description}
                  </p>

                  <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 font-mono text-xs flex justify-between items-center text-slate-400">
                    <span>Projects & Implementations:</span>
                    <span className="text-cyan-400 font-bold">{hoveredSkill.projectsCount}+ Repos / Modules</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center my-auto py-12 text-slate-500 space-y-3 font-mono text-xs">
                  <FaInfoCircle className="text-3xl text-cyan-500/40 animate-pulse" />
                  <p>HOVER OR CLICK A SKILL CARD TO VIEW DETAILED ENGINEERING SPECIFICATIONS</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Infinite Moving Marquee */}
        <div className="w-full overflow-hidden glass-panel py-4 rounded-xl border border-slate-800">
          <div className="animate-marquee font-mono text-sm font-bold text-slate-400 tracking-widest flex items-center space-x-8">
            {marqueeTech.concat(marqueeTech).map((tech, index) => (
              <span key={index} className="flex items-center space-x-8">
                <span className="hover:text-cyan-400 transition-colors">{tech}</span>
                <span className="text-cyan-500/50">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

