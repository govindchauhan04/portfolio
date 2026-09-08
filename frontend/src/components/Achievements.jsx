import React, { useState } from 'react';
import { achievements } from '../data/PortfolioData';
import { FaDownload, FaTimes } from 'react-icons/fa';

export default function Achievements() {
  const [selectedCert, setSelectedCert] = useState(null);
  const loopAchievements = [...achievements, ...achievements];

  return (
    <section id="achievements" className="certificate-section mx-auto max-w-[90rem] px-4 py-16 sm:px-8 sm:py-24">
      <h2 className="certificate-heading-glitch text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
        Certificates
      </h2>

      <div className="certificate-marquee relative mt-10 overflow-hidden py-4 sm:mt-14">
        <div className="certificate-track flex w-max gap-4 sm:gap-6">
          {loopAchievements.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              onClick={() => setSelectedCert(item)}
              className="certificate-card shrink-0 cursor-pointer overflow-visible"
              role="button"
              tabIndex={0}
              aria-label={`Open certificate: ${item.title}`}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') setSelectedCert(item);
              }}
            >
              <div className="certificate-card-image overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0f] transition-transform duration-300 ease-out hover:-translate-y-2 hover:scale-105 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="block h-auto w-full"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=800&auto=format&fit=crop';
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

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

              <a
                href={selectedCert.image}
                download
                className="mb-4 inline-flex items-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-4 py-2.5 font-mono text-xs font-bold text-cyan-300 transition-colors hover:bg-cyan-500/20"
              >
                <FaDownload />
                <span>Download Certificate</span>
              </a>

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
    </section>
  );
}

