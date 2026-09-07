import React from 'react';
import { videos } from '../data/PortfolioData';
import { FaPlay, FaVideo } from 'react-icons/fa';

export default function Videos() {
  return (
    <section id="videos" className="py-24 relative overflow-hidden bg-[#07090D]">
      <div className="w-[92%] max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="h-[1px] w-12 bg-cyan-400" />
          <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">07.5 // MEDIA LOGS</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-100 uppercase tracking-tight flex items-center space-x-3">
              <span>MEDIA</span> <span className="text-gradient-cyan">LOGS</span>
              <FaVideo className="text-cyan-400 text-3xl ml-2" />
            </h2>
            <p className="text-slate-400 text-sm font-sans mt-2">
              Curated high-value video resources for Data Science, Machine Learning, Python, and Neural Networks.
            </p>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((vid) => (
            <div
              key={vid.videoId}
              className="glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
            >
              {/* YouTube Embed Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                <iframe
                  title={vid.title}
                  src={`https://www.youtube-nocookie.com/embed/${vid.videoId}`}
                  className="w-full h-full border-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              {/* Title & Description */}
              <div className="p-4 space-y-2">
                <h3 className="font-heading font-bold text-slate-200 text-sm group-hover:text-cyan-300 transition-colors line-clamp-2">
                  {vid.title}
                </h3>
                <p className="text-xs text-slate-400 font-sans leading-relaxed line-clamp-2">
                  {vid.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
