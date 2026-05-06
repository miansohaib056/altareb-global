import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, CheckCircle2, Activity, Sparkles, Zap } from 'lucide-react';
import ParticleField from './ParticleField';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate min-h-[100svh] flex items-center pt-32 pb-24 overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg" />
      <ParticleField />
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-hero-glow blur-2xl" />
      <div className="pointer-events-none absolute top-1/3 -left-32 w-[480px] h-[480px] rounded-full bg-cyan-500/15 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 -right-24 w-[560px] h-[560px] rounded-full bg-violet-500/15 blur-[120px]" />

      <div className="container-prose relative z-10 grid lg:grid-cols-12 gap-14 items-center">
        {/* Copy */}
        <div className="lg:col-span-7 text-center lg:text-left">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="inline-flex items-center gap-2 chip"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-300" />
            </span>
            HIPAA-compliant · Live AI agents
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-6 font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.05] font-bold tracking-tight"
          >
            <span className="text-gradient">Autonomous AI agents</span>
            <br />
            for <span className="relative inline-block">
              medical billing
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="10"
                viewBox="0 0 300 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 7 Q 75 2 150 6 T 298 5"
                  fill="none"
                  stroke="url(#u)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="u" x1="0" x2="1">
                    <stop offset="0" stopColor="#22d3ee" />
                    <stop offset="1" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
            </span>{' '}
            that secure <span className="text-gradient-cv">99% clean claims</span>.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-7 text-lg md:text-xl text-slate-300/90 max-w-2xl lg:mx-0 mx-auto"
          >
            Replace manual billing with a fleet of AI agents that automate eligibility, coding,
            prior authorizations, and denial follow-ups — capturing up to{' '}
            <span className="text-white font-semibold">20% more earned revenue</span>.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-9 flex flex-wrap items-center gap-3 lg:justify-start justify-center"
          >
            <a href="#contact" className="btn-primary group">
              Book Your Free Consultation
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#agents" className="btn-ghost group">
              Meet the AI Agents
              <Sparkles className="w-4 h-4 text-cyan-300 transition-transform group-hover:rotate-12" />
            </a>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-10 grid sm:grid-cols-3 gap-3 max-w-2xl lg:mx-0 mx-auto"
          >
            {[
              { icon: CheckCircle2, label: 'Instant Coding Validation' },
              { icon: Zap, label: 'Faster Payer Approvals' },
              { icon: ShieldCheck, label: 'Smart Denial Prioritization' },
            ].map((f) => (
              <li
                key={f.label}
                className="glass rounded-2xl px-4 py-3 flex items-center gap-3 text-sm"
              >
                <f.icon className="w-4 h-4 text-cyan-300 shrink-0" />
                <span className="text-slate-200">{f.label}</span>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative"
        >
          <HeroDashboard />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-slate-500 text-xs uppercase tracking-[0.2em]"
      >
        Scroll
        <span className="w-px h-10 bg-gradient-to-b from-cyan-400/60 to-transparent animate-pulse-slow" />
      </motion.div>
    </section>
  );
}

function HeroDashboard() {
  return (
    <div className="relative perspective-1000">
      {/* Floating orbital ring */}
      <div className="absolute -inset-10 -z-10 opacity-60">
        <div className="absolute inset-0 rounded-full ring-gradient blur-3xl opacity-30 animate-spin-slow" />
      </div>

      {/* Main card */}
      <motion.div
        whileHover={{ rotateY: -4, rotateX: 4 }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        className="relative glass-strong rounded-3xl p-5 shadow-[0_30px_80px_-30px_rgba(34,211,238,0.4)] preserve-3d"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-300/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <Activity className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
            Live activity
          </div>
        </div>

        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-slate-400">
              Clean claim rate
            </div>
            <div className="font-display text-4xl font-bold text-white mt-1">
              99.<span className="text-gradient-cv">99%</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] uppercase tracking-widest text-slate-400">Today</div>
            <div className="text-emerald-300 text-sm font-medium">+12.4%</div>
          </div>
        </div>

        {/* Sparkline */}
        <svg viewBox="0 0 400 120" className="mt-3 w-full h-28">
          <defs>
            <linearGradient id="hg" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#22d3ee" stopOpacity="0.55" />
              <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="hgline" x1="0" x2="1">
              <stop offset="0" stopColor="#22d3ee" />
              <stop offset="1" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: 'easeInOut', delay: 0.6 }}
            d="M0 90 L40 78 L80 84 L120 60 L160 66 L200 42 L240 50 L280 28 L320 36 L360 18 L400 22 L400 120 L0 120 Z"
            fill="url(#hg)"
            stroke="none"
          />
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: 'easeInOut', delay: 0.6 }}
            d="M0 90 L40 78 L80 84 L120 60 L160 66 L200 42 L240 50 L280 28 L320 36 L360 18 L400 22"
            fill="none"
            stroke="url(#hgline)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Mini stats grid */}
        <div className="grid grid-cols-3 gap-2 mt-2">
          {[
            { l: 'Eligibility', v: '4,812', d: 'verified' },
            { l: 'Prior Auth', v: '312', d: 'approved' },
            { l: 'Denials', v: '0', d: 'predicted' },
          ].map((s) => (
            <div key={s.l} className="rounded-xl bg-white/[0.03] border border-white/5 p-3">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">{s.l}</div>
              <div className="text-white text-lg font-semibold mt-0.5">{s.v}</div>
              <div className="text-[10px] text-cyan-300">{s.d}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Floating chips */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-6 -left-6 glass rounded-2xl px-3 py-2 flex items-center gap-2 shadow-glow"
      >
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 grid place-items-center">
          <CheckCircle2 className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="text-[10px] text-slate-400">CODIN</div>
          <div className="text-xs text-white font-medium">CPT 99214 verified</div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        className="absolute -bottom-6 -right-4 glass rounded-2xl px-3 py-2 flex items-center gap-2 shadow-glow-violet"
      >
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 grid place-items-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="text-[10px] text-slate-400">PRIA</div>
          <div className="text-xs text-white font-medium">Auth approved · 2.1s</div>
        </div>
      </motion.div>
    </div>
  );
}
