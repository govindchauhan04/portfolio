import { Download, FileText, GraduationCap, Sparkles } from 'lucide-react'
import { profile } from '../data/PortfolioData'

const highlights = [
  'React, Node.js, Express.js, Python, and FastAPI',
  'AI-powered web applications and practical product development',
  'MongoDB, SQL, Git, GitHub, and modern frontend tooling',
]

export default function Resume() {
  return (
    <section id="resume" className="mx-auto max-w-[90rem] px-4 py-16 sm:px-8 sm:py-24">
      <h2 className="mb-10 font-display text-3xl font-semibold text-white sm:mb-12 sm:text-4xl md:text-5xl">
        Resume
      </h2>

      <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
        <article className="rounded-2xl border border-cyan-300/20 bg-[#09111d]/75 p-6 shadow-[0_0_32px_rgba(34,229,255,0.08)] backdrop-blur-sm sm:p-8">
          <div className="flex items-start gap-4">
            <div className="rounded-xl border border-cyan-300/25 bg-cyan-300/10 p-3 text-cyan-300">
              <FileText size={24} />
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Professional profile</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">{profile.title}</h3>
            </div>
          </div>

          <p className="mt-6 max-w-3xl leading-7 text-white/65">{profile.about}</p>

          <ul className="mt-6 space-y-3">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 text-sm leading-6 text-white/75">
                <Sparkles size={16} className="mt-1 shrink-0 text-emerald-300" />
                {highlight}
              </li>
            ))}
          </ul>
        </article>

        <aside className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <GraduationCap size={26} className="text-cyan-300" />
          <p className="mt-5 font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Education</p>
          <h3 className="mt-2 text-lg font-semibold text-white">B.Tech, Computer Science & Engineering</h3>
          <p className="mt-2 text-sm leading-6 text-white/55">Allenhouse Institute of Technology, Kanpur</p>
          <p className="mt-1 text-sm text-emerald-300">2025 — Expected 2029</p>

          <a
            href="/Govind_Singh_Resume.pdf"
            download="Govind_Singh_Resume.pdf"
            className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            <Download size={16} />
            Download Resume
          </a>
        </aside>
      </div>
    </section>
  )
}
