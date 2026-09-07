import React, { useState } from 'react';
import { projects } from '../data/PortfolioData';
import ProjectCaseStudyModal from './ProjectCaseStudyModal';
import { FaGithub, FaExternalLinkAlt, FaBookOpen, FaStar, FaFolderOpen } from 'react-icons/fa';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState(null);

  const filters = ['ALL', ...Array.from(new Set(projects.map((p) => p.category.toUpperCase())))];

  const filteredProjects =
    activeFilter === 'ALL'
      ? projects
      : projects.filter((p) => p.category.toUpperCase() === activeFilter);

  const featuredProject = projects.find((p) => p.featured) || projects[0];

  // Prevent duplicate rendering: in "ALL" view, the featured project is already shown in the top Spotlight
  const showcaseProjects =
    activeFilter === 'ALL'
      ? filteredProjects.filter((p) => p.id !== featuredProject?.id)
      : filteredProjects;

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="w-[92%] max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="h-[1px] w-12 bg-cyan-400" />
          <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">03 // FEATURED WORK</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-100 uppercase tracking-tight">
              ENGINEERING <span className="text-gradient-cyan">PROJECTS</span>
            </h2>
            <p className="text-slate-400 text-sm font-sans mt-2">
              Production-grade applications built with precision, scalable architecture, and AI capabilities.
            </p>
          </div>

          {/* Project Category Filters */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0 font-mono text-xs">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xl border transition-all cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-cyan-500/20 text-cyan-400 border-cyan-400 font-bold shadow-[0_0_15px_rgba(0,229,255,0.25)]'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* FEATURED ENGINEERING PROJECT SPOTLIGHT */}
        {activeFilter === 'ALL' && featuredProject && (
          <div className="mb-16">
            <div className="flex items-center space-x-2 font-mono text-xs text-amber-400 mb-3">
              <FaStar className="animate-spin-slow" />
              <span className="font-bold tracking-widest uppercase">FEATURED ENGINEERING SPOTLIGHT</span>
            </div>

            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/40 shadow-[0_0_40px_rgba(0,229,255,0.15)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center space-x-3 font-mono text-xs text-cyan-400">
                  <span className="px-2.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30">
                    {featuredProject.category}
                  </span>
                  <span>PROJECT #{featuredProject.number}</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-100">
                  {featuredProject.title}
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
                  {featuredProject.description}
                </p>

                <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 text-xs font-sans text-slate-300">
                  <strong className="text-cyan-400 font-mono block mb-1">PROBLEM SOLVED:</strong>
                  {featuredProject.problem}
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {featuredProject.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300 font-mono text-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <button
                    onClick={() => setSelectedProject(featuredProject)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold font-mono text-xs flex items-center space-x-2 shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-transform hover:scale-105 cursor-pointer"
                  >
                    <FaBookOpen />
                    <span>Read Case Study</span>
                  </button>

                  <a
                    href={featuredProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-cyan-400 font-mono text-xs flex items-center space-x-2 transition-colors cursor-pointer"
                  >
                    <FaGithub />
                    <span>GitHub</span>
                  </a>

                  <a
                    href={featuredProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl glass-panel hover:bg-slate-800 text-cyan-400 font-mono text-xs flex items-center space-x-2 transition-colors cursor-pointer"
                  >
                    <FaExternalLinkAlt />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>

              {/* Large Spotlight Image */}
              <div className="lg:col-span-5 relative group overflow-hidden rounded-2xl border border-slate-700 shadow-2xl">
                <img
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  className="w-full h-72 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090D] via-transparent to-transparent opacity-60" />
              </div>
            </div>
          </div>
        )}

        {/* ALTERNATING PROJECTS SHOWCASE */}
        {activeFilter === 'ALL' && showcaseProjects.length > 0 && (
          <div className="flex items-center space-x-3 mb-10">
            <span className="h-[1px] w-8 bg-cyan-400/60" />
            <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">
              MORE PRODUCTION ARCHITECTURES
            </span>
            <span className="h-[1px] flex-1 bg-slate-800" />
          </div>
        )}

        <div className="space-y-16">
          {showcaseProjects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={project.id}
                className="glass-card p-6 sm:p-8 border border-slate-800 hover:border-cyan-500/40 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group transition-all duration-300"
              >
                {/* Image Column */}
                <div
                  className={`lg:col-span-6 relative overflow-hidden rounded-2xl border border-slate-800 group-hover:border-cyan-500/40 transition-colors ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07090D]/80 via-transparent to-transparent" />
                </div>

                {/* Details Column */}
                <div className={`lg:col-span-6 space-y-4 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="flex items-center space-x-3 font-mono text-xs text-cyan-400">
                    <span className="font-bold text-slate-500">PROJECT #{project.number}</span>
                    <span>•</span>
                    <span className="uppercase">{project.category}</span>
                  </div>

                  <h3 className="text-2xl font-bold font-heading text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-slate-300 text-sm font-sans leading-relaxed">
                    {project.description}
                  </p>

                  <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800/80 text-xs font-sans text-slate-400">
                    <span className="text-cyan-400 font-mono font-semibold block mb-0.5">PROBLEM:</span>
                    {project.problem}
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[11px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-3">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-mono text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
                    >
                      <FaBookOpen />
                      <span>Case Study</span>
                    </button>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-cyan-400 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
                      title="GitHub Repository"
                    >
                      <FaGithub className="text-sm" />
                    </a>

                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-cyan-400 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
                      title="Live Preview"
                    >
                      <FaExternalLinkAlt className="text-sm" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Case Study Modal Popup */}
        <ProjectCaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}
