import React, { useState } from 'react';
import { achievements } from '../data/PortfolioData';
import { FaTrophy, FaCertificate, FaSearchPlus, FaTimes } from 'react-icons/fa';

export default function Achievements() {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="achievements" className="py-24 relative overflow-hidden bg-[#07090D]">
      <div className="w-[92%] max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="h-[1px] w-12 bg-cyan-400" />
          <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">08 // MILESTONES & HONORS</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-100 uppercase tracking-tight">
              ACCOMPLISHMENTS & <span className="text-gradient-purple">CERTIFICATES</span>
            </h2>
            <p className="text-slate-400 text-sm font-sans mt-2">
              Verified hackathons, certifications, and programming milestones. Click any certificate to inspect full resolution.
            </p>
          </div>
        </div>

        {/* Gallery Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedCert(item)}
              className="glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              {/* Image Preview Container */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full h-full ${item.category === 'BADGE' ? 'object-contain' : 'object-cover group-hover:scale-105'} transition-transform duration-500`}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=800&auto=format&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-transparent to-transparent opacity-60" />

                <div className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <FaSearchPlus />
                </div>

                <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-[10px] font-mono text-cyan-400 uppercase font-bold">
                  {item.category}
                </div>
              </div>

              {/* Title & Info */}
              <div className="p-5 space-y-2">
                <h3 className="font-heading font-bold text-slate-100 text-sm group-hover:text-cyan-300 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-xs font-mono text-slate-400">
                  {item.issuer} • {item.date}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Certificate Glass Zoom Modal */}
        {selectedCert && (
          <div
            className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
            onClick={() => setSelectedCert(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-[#0D1117] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,229,255,0.2)] font-sans"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-3 rounded-full bg-slate-900 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
              >
                <FaTimes />
              </button>

              <div className="mb-4">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase block mb-1">
                  {selectedCert.category} // VERIFIED DOCUMENT
                </span>
                <h3 className="text-xl font-bold font-heading text-slate-100">
                  {selectedCert.title}
                </h3>
                <p className="text-xs text-slate-400 font-mono">{selectedCert.issuer} — {selectedCert.date}</p>
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-800 max-h-[65vh] flex justify-center bg-black/40 p-2">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="max-h-[60vh] w-auto object-contain rounded-xl"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=800&auto=format&fit=crop';
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

