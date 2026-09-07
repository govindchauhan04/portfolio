import React, { useEffect } from 'react';
import { FaTimes, FaGithub, FaExternalLinkAlt, FaLightbulb, FaCubes, FaExclamationTriangle, FaGraduationCap } from 'react-icons/fa';

export default function ProjectCaseStudyModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const { caseStudy } = project;

  return (
    <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#0D1117] border border-cyan-500/30 rounded-3xl overflow-y-auto p-6 sm:p-8 md:p-10 shadow-[0_0_50px_rgba(0,229,255,0.2)] font-sans scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500 transition-colors cursor-pointer"
          title="Close Modal (Esc)"
        >
          <FaTimes className="text-lg" />
        </button>

        {/* Modal Header */}
        <div className="mb-8 pr-12">
          <div className="flex items-center space-x-3 text-xs font-mono text-cyan-400 mb-2">
            <span className="px-2.5 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/30 uppercase font-bold">
              CASE STUDY // {project.category}
            </span>
            <span>PROJECT #{project.number}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-100 mb-2">
            {project.title}
          </h2>
          <p className="text-slate-400 text-sm font-sans">
            {project.subtitle}
          </p>
        </div>

        {/* Main Cover Image */}
        <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden mb-8 border border-slate-800">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-transparent opacity-60" />
        </div>

        {/* Content Sections Grid */}
        <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
          {/* Problem & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-rose-500">
              <h3 className="font-heading font-bold text-rose-400 text-base mb-2 flex items-center space-x-2">
                <FaExclamationTriangle />
                <span>The Problem</span>
              </h3>
              <p>{project.problem}</p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-emerald-500">
              <h3 className="font-heading font-bold text-emerald-400 text-base mb-2 flex items-center space-x-2">
                <FaLightbulb />
                <span>The Solution</span>
              </h3>
              <p>{project.solution}</p>
            </div>
          </div>

          {/* Architecture & Decisions */}
          {caseStudy && (
            <>
              <div className="glass-panel p-6 rounded-2xl border border-slate-800">
                <h3 className="font-heading font-bold text-cyan-400 text-base mb-3 flex items-center space-x-2">
                  <FaCubes />
                  <span>System Architecture & Decisions</span>
                </h3>
                <p className="mb-4">{caseStudy.architecture}</p>
                <ul className="list-disc list-inside space-y-1.5 font-mono text-xs text-slate-300">
                  {caseStudy.decisions.map((dec, idx) => (
                    <li key={idx}>{dec}</li>
                  ))}
                </ul>
              </div>

              {/* Key Learnings */}
              <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-violet-500">
                <h3 className="font-heading font-bold text-violet-400 text-base mb-2 flex items-center space-x-2">
                  <FaGraduationCap />
                  <span>Key Learnings & Challenges</span>
                </h3>
                <p className="mb-2"><strong>Challenges:</strong> {caseStudy.challenges}</p>
                <p><strong>Learnings:</strong> {caseStudy.learnings}</p>
              </div>
            </>
          )}

          {/* Tech Stack Tags */}
          <div>
            <h4 className="font-mono text-xs text-slate-400 uppercase tracking-widest mb-3">TECHNOLOGY STACK</h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300 font-mono text-xs"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-10 pt-6 border-t border-slate-800">
          <div className="flex items-center space-x-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-cyan-400 font-mono text-xs flex items-center space-x-2 transition-colors cursor-pointer"
            >
              <FaGithub />
              <span>GitHub Repository</span>
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold font-mono text-xs flex items-center space-x-2 shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-transform hover:scale-105 cursor-pointer"
            >
              <FaExternalLinkAlt />
              <span>Live Deployment</span>
            </a>
          </div>

          <button
            onClick={onClose}
            className="text-xs font-mono text-slate-400 hover:text-slate-200 underline cursor-pointer"
          >
            Close Window &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

