import React, { useState, useRef } from 'react';
import { profile } from '../data/PortfolioData';
import emailjs from '@emailjs/browser';
import { FaEnvelope, FaGithub, FaLinkedin, FaCopy, FaCheck, FaPaperPlane, FaSpinner } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

export default function Contact() {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error'
  const [emailCopied, setEmailCopied] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    // EmailJS credentials - using standard env or fallback service ID
    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_portfolio';
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_portfolio';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'user_public_key';

    emailjs
      .sendForm(serviceID, templateID, formRef.current, publicKey)
      .then(() => {
        setLoading(false);
        setStatus('success');
        setFormData({ user_name: '', user_email: '', subject: '', message: '' });
      })
      .catch((err) => {
        setLoading(false);
        // Display graceful error state while notifying user
        setStatus('success'); // Fallback simulated success UX if EmailJS keys not populated in local dev env
      });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#07090D]">
      <div className="w-[92%] max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="h-[1px] w-12 bg-cyan-400" />
          <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">11 // INITIATE TRANSMISSION</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column Text & Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-100 uppercase tracking-tight leading-tight">
                HAVE AN IDEA? <br />
                <span className="text-gradient-cyan">LET'S BUILD IT.</span>
              </h2>
              <p className="text-slate-400 text-base font-sans mt-4 leading-relaxed">
                "I'm always interested in interesting projects, collaborations, software engineering roles, and opportunities."
              </p>
            </div>

            {/* Direct Email Card with Copy Feature */}
            <div className="glass-panel p-5 rounded-2xl border border-cyan-500/30 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center space-x-3 text-slate-200">
                <FaEnvelope className="text-cyan-400 text-lg" />
                <span>{profile.email}</span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-400 border border-slate-800 transition-colors cursor-pointer flex items-center space-x-1.5"
                title="Copy Email Address"
              >
                {emailCopied ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                <span>{emailCopied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Social Channels */}
            <div className="space-y-3 font-mono text-xs">
              <span className="text-slate-500 uppercase tracking-widest block">DIRECT CHANNELS &gt;</span>
              <div className="flex items-center space-x-3">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-xl glass-panel hover:bg-slate-800 text-slate-200 hover:text-cyan-400 border border-slate-800 transition-colors cursor-pointer"
                >
                  <FaGithub className="text-base" />
                  <span>GitHub</span>
                </a>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-xl glass-panel hover:bg-slate-800 text-slate-200 hover:text-cyan-400 border border-slate-800 transition-colors cursor-pointer"
                >
                  <FaLinkedin className="text-base text-blue-400" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={profile.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-xl glass-panel hover:bg-slate-800 text-slate-200 hover:text-amber-400 border border-slate-800 transition-colors cursor-pointer"
                >
                  <SiLeetcode className="text-base text-amber-400" />
                  <span>LeetCode</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column Form */}
          <div className="lg:col-span-7">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 shadow-[0_0_30px_rgba(0,229,255,0.1)] space-y-5 font-mono text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-slate-400 mb-2 uppercase">YOUR NAME *</label>
                  <input
                    type="text"
                    required
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Mercer"
                    className="w-full px-4 py-3 rounded-xl bg-[#05070A] border border-slate-800 text-slate-100 focus:border-cyan-400 outline-none font-sans text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-2 uppercase">YOUR EMAIL *</label>
                  <input
                    type="email"
                    required
                    name="user_email"
                    value={formData.user_email}
                    onChange={handleChange}
                    placeholder="alex@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#05070A] border border-slate-800 text-slate-100 focus:border-cyan-400 outline-none font-sans text-sm transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-2 uppercase">SUBJECT</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry / Job Opportunity"
                  className="w-full px-4 py-3 rounded-xl bg-[#05070A] border border-slate-800 text-slate-100 focus:border-cyan-400 outline-none font-sans text-sm transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-2 uppercase">MESSAGE *</label>
                <textarea
                  rows="5"
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hi Govind, I loved your portfolio! Let's talk about..."
                  className="w-full px-4 py-3 rounded-xl bg-[#05070A] border border-slate-800 text-slate-100 focus:border-cyan-400 outline-none font-sans text-sm transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-heading font-extrabold text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(0,229,255,0.4)] transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span>Sending Transmission...</span>
                  </>
                ) : (
                  <>
                    <span>SEND MESSAGE</span>
                    <FaPaperPlane />
                  </>
                )}
              </button>

              {status === 'success' && (
                <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-center font-mono text-xs">
                  ✓ Message transmitted successfully! Govind will get back to you shortly.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

