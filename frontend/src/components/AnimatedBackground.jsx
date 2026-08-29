import { motion, useReducedMotion } from 'framer-motion'
import { useMemo, useState, useEffect } from 'react'
import { ArrowUpRight, CircleDot, Radio } from 'lucide-react'

/**
 * ── Design plan ──────────────────────────────────────────────
 * Subject: "Pulse" — a real-time infrastructure signal / uptime
 * monitoring product. Everything below is built from that: the
 * page IS a live console watching a system's heartbeat.
 *
 * Color   #020806 (void), #06120f (panel), #2dd4af (signal teal),
 *         #f5a623 (alert amber, used once), #eef7f4 (text hi),
 *         #7fa89c (text muted)
 * Type    Display: Georgia (slab serif, restrained, used only for
 *         the H1 — deliberately NOT another geometric sans-black).
 *         Body: system sans. Utility/data: ui-monospace.
 * Layout  Full-bleed sonar field behind a left-aligned hero with an
 *         oscilloscope pulse line as the transition into a scrolling
 *         "transmission log" console — typed lines with timestamps,
 *         the page's one signature device.
 * Signature: the transmission log — feature copy delivered as an
 *         incoming signal feed rather than an icon grid.
 * ───────────────────────────────────────────────────────────── */

const NODE_COUNT = 20

function useSignalNodes() {
  return useMemo(
    () =>
      Array.from({ length: NODE_COUNT }, (_, i) => {
        const angle = (i / NODE_COUNT) * Math.PI * 2 + Math.random() * 0.6
        const radius = 18 + Math.random() * 62
        return {
          id: i,
          x: 50 + Math.cos(angle) * radius * 0.9,
          y: 50 + Math.sin(angle) * radius * 0.55,
          size: 1.5 + Math.random() * 2.5,
          delay: Math.random() * 6,
          duration: 5 + Math.random() * 5,
        }
      }),
    []
  )
}

function useSignalLinks(nodes) {
  return useMemo(() => {
    const links = []
    nodes.forEach((n, i) => {
      const next = nodes[(i + 1) % nodes.length]
      const dist = Math.hypot(next.x - n.x, next.y - n.y)
      if (dist < 34) links.push({ id: `${n.id}-${next.id}`, a: n, b: next })
    })
    return links
  }, [nodes])
}

function SonarField() {
  const nodes = useSignalNodes()
  const links = useSignalLinks(nodes)
  const reduce = useReducedMotion()

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 38%, rgba(6,46,40,0.55) 0%, rgba(2,18,16,0.5) 40%, rgba(2,8,6,1) 80%)',
        }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '44rem',
          height: '44rem',
          left: '-14rem',
          top: '-4%',
          background: 'rgba(45,212,175,0.10)',
          filter: 'blur(150px)',
        }}
        animate={reduce ? {} : { opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      {!reduce && (
        <motion.div
          className="absolute left-1/2 top-1/2"
          style={{
            width: '60vmax',
            height: '60vmax',
            marginLeft: '-30vmax',
            marginTop: '-30vmax',
            borderRadius: '50%',
            background:
              'conic-gradient(from 0deg, rgba(45,212,175,0) 0deg, rgba(45,212,175,0) 300deg, rgba(45,212,175,0.16) 344deg, rgba(45,212,175,0.32) 360deg)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />
      )}
      {[0.62, 0.42, 0.24].map((scale, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: `${120 * scale}vmax`,
            height: `${120 * scale}vmax`,
            transform: 'translate(-50%, -50%)',
            border: '1px solid rgba(45,212,175,0.06)',
          }}
        />
      ))}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {links.map((link) => (
          <line
            key={link.id}
            x1={link.a.x}
            y1={link.a.y}
            x2={link.b.x}
            y2={link.b.y}
            stroke="rgba(45,212,175,0.16)"
            strokeWidth="0.08"
          />
        ))}
        {nodes.map((n) => (
          <motion.circle
            key={n.id}
            cx={n.x}
            cy={n.y}
            r={n.size * 0.14}
            fill="rgba(110,231,200,0.9)"
            animate={reduce ? {} : { opacity: [0.25, 1, 0.25] }}
            transition={{ duration: n.duration, repeat: Infinity, ease: 'easeInOut', delay: n.delay }}
          />
        ))}
      </svg>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 30%, transparent 20%, rgba(2,8,6,0.75) 100%)' }}
      />
    </div>
  )
}

function PulseLine() {
  const reduce = useReducedMotion()
  const path =
    'M0,30 L120,30 L140,6 L160,54 L180,30 L260,30 L280,14 L300,46 L320,30 L1200,30'
  return (
    <svg viewBox="0 0 1200 60" className="w-full h-14" preserveAspectRatio="none">
      <motion.path
        d={path}
        fill="none"
        stroke="#2dd4af"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: reduce ? 0 : 2.4, ease: 'easeInOut' }}
      />
    </svg>
  )
}

const LOG_LINES = [
  { t: '00:00:02', label: 'DEPLOY', text: 'checks propagate to every region in under 4 seconds' },
  { t: '00:00:14', label: 'DETECT', text: 'anomalies are caught before they page anyone human' },
  { t: '00:00:29', label: 'ROUTE', text: 'alerts reach the one engineer who owns the failing part' },
  { t: '00:00:41', label: 'RESOLVE', text: 'a timeline of exactly what happened, saved automatically' },
]

function TransmissionLog() {
  const [visible, setVisible] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) {
      setVisible(LOG_LINES.length)
      return
    }
    if (visible >= LOG_LINES.length) return
    const id = setTimeout(() => setVisible((v) => v + 1), 650)
    return () => clearTimeout(id)
  }, [visible, reduce])

  return (
    <div
      className="rounded-lg border border-[#123830] bg-[#06120f]/80 backdrop-blur-sm p-5 sm:p-7"
      style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}
    >
      <div className="flex items-center gap-2 pb-4 mb-4 border-b border-[#123830] text-[#7fa89c] text-xs tracking-widest uppercase">
        <Radio className="h-3.5 w-3.5 text-[#2dd4af]" aria-hidden="true" />
        Live transmission
      </div>
      <ul className="space-y-3.5">
        {LOG_LINES.map((line, i) => (
          <li
            key={line.t}
            className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 text-sm transition-opacity duration-500"
            style={{ opacity: i < visible ? 1 : 0.12 }}
          >
            <span className="text-[#4a6b62] shrink-0">{line.t}</span>
            <span className="text-[#2dd4af] font-semibold shrink-0 w-20">{line.label}</span>
            <span className="text-[#c7e6dc]">{line.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const STATS = [
  { value: '99.996%', label: 'uptime tracked' },
  { value: '412ms', label: 'median detect-to-alert' },
  { value: '3,800+', label: 'systems watched' },
]

export default function AnimatedBackground() {
  return <div className="fixed inset-0 -z-10 overflow-hidden bg-[#020806] pointer-events-none"><SonarField /></div>

  if (false) return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#020806] text-[#eef7f4] pointer-events-none">
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
        }
        .pulse-focus:focus-visible {
          outline: 2px solid #2dd4af;
          outline-offset: 3px;
          border-radius: 6px;
        }
      `}</style>

      <div className="absolute inset-0">
        <SonarField />
      </div>

      {/* ================= NAV ================= */}
      <header className="hidden">
        <div className="flex items-center gap-2">
          <CircleDot className="h-4 w-4 text-[#2dd4af]" aria-hidden="true" />
          <span className="tracking-[0.2em] text-sm font-semibold uppercase">Pulse</span>
        </div>
        <nav className="hidden sm:flex items-center gap-8 text-sm text-[#9fb3ae]">
          <a href="#log" className="pulse-focus hover:text-[#eef7f4] transition-colors">Product</a>
          <a href="#stats" className="pulse-focus hover:text-[#eef7f4] transition-colors">Reliability</a>
          <a href="#cta" className="pulse-focus hover:text-[#eef7f4] transition-colors">Pricing</a>
        </nav>
        <a
          href="#cta"
          className="pulse-focus text-sm font-medium bg-[#2dd4af] text-[#032019] px-4 py-2 rounded-md hover:bg-[#6ee7c8] transition-colors"
        >
          Start watching
        </a>
      </header>

      {/* ================= HERO ================= */}
      <main className="hidden">
        <section className="pt-16 sm:pt-24 pb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-[#2dd4af] mb-6">Live signal, always on</p>
          <h1
            className="max-w-3xl text-4xl sm:text-6xl leading-[1.05] mb-6"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            Know the moment
            <br />
            something goes quiet.
          </h1>
          <p className="max-w-xl text-base sm:text-lg text-[#9fb3ae] leading-relaxed mb-9">
            Pulse listens to every service you run and tells you the instant one
            stops responding — before your customers notice, and long before
            your on-call does.
          </p>
          <div className="flex flex-wrap items-center gap-4 mb-14">
            <a
              href="#cta"
              className="pulse-focus inline-flex items-center gap-2 bg-[#2dd4af] text-[#032019] font-medium px-6 py-3 rounded-md hover:bg-[#6ee7c8] transition-colors"
            >
              Start watching your systems
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#log"
              className="pulse-focus inline-flex items-center gap-2 text-[#c7e6dc] px-6 py-3 rounded-md border border-[#123830] hover:border-[#2dd4af] transition-colors"
            >
              See it in action
            </a>
          </div>
          <PulseLine />
        </section>

        {/* ================= TRANSMISSION LOG (signature) ================= */}
        <section id="log" className="py-16 sm:py-24 grid sm:grid-cols-5 gap-10 sm:gap-14 items-start">
          <div className="sm:col-span-2">
            <h2 className="text-2xl sm:text-3xl mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              What a healthy signal
              <br />
              looks like.
            </h2>
            <p className="text-[#9fb3ae] leading-relaxed">
              This is one real timeline: a deploy goes out, an anomaly surfaces,
              the right person is paged, and the whole story is kept for later —
              automatically, in order.
            </p>
          </div>
          <div className="sm:col-span-3">
            <TransmissionLog />
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section id="stats" className="py-16 sm:py-24 border-t border-[#123830]">
          <div className="grid sm:grid-cols-3 gap-10">
            {STATS.map((s) => (
              <div key={s.label}>
                <div
                  className="text-3xl sm:text-4xl text-[#eef7f4] mb-2"
                  style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}
                >
                  {s.value}
                </div>
                <div className="text-sm text-[#7fa89c] uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section id="cta" className="py-20 sm:py-28 text-center border-t border-[#123830]">
          <h2 className="text-3xl sm:text-4xl mb-5" style={{ fontFamily: 'Georgia, serif' }}>
            Don't wait to hear about it.
            <br />
            Hear it first.
          </h2>
          <p className="text-[#9fb3ae] mb-8 max-w-md mx-auto">
            Free for your first three services. No credit card, no war room.
          </p>
          <a
            href="#"
            className="pulse-focus inline-flex items-center gap-2 bg-[#2dd4af] text-[#032019] font-medium px-7 py-3.5 rounded-md hover:bg-[#6ee7c8] transition-colors"
          >
            Start watching, free
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </section>

        <footer className="py-10 text-center text-xs text-[#4a6b62] tracking-wide">
          PULSE — a heartbeat for your infrastructure
        </footer>
      </main>
    </div>
  )
}
