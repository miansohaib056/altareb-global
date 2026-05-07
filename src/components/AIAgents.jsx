import { motion } from 'framer-motion';
import {
  ShieldCheck,
  FileCheck2,
  Code2,
  Send,
  AlertOctagon,
  TrendingUp,
  Wallet,
} from 'lucide-react';

const agents = [
  {
    name: 'ELIXA',
    role: 'Eligibility Agent',
    desc: 'Real-time patient eligibility and insurance verification — eliminating rejections before claims are sent.',
    icon: ShieldCheck,
    accent: 'from-cyan-400 to-blue-500',
    metric: { label: 'Verifications / hr', value: '12,400' },
  },
  {
    name: 'PRIA',
    role: 'Prior-Auth Agent',
    desc: 'Automates prior-authorization requests and payer follow-ups with 97% accuracy.',
    icon: FileCheck2,
    accent: 'from-blue-500 to-indigo-500',
    metric: { label: 'Auth turnaround', value: '–80%' },
  },
  {
    name: 'CODIN',
    role: 'Coding Agent',
    desc: 'Applies CPT and ICD-10 coding rules with continuous compliance updates.',
    icon: Code2,
    accent: 'from-indigo-500 to-violet-500',
    metric: { label: 'Coding accuracy', value: '99.6%' },
  },
  {
    name: 'CLAIR',
    role: 'Claims Agent',
    desc: 'Handles claim creation, scrubbing, and submission with automated error detection.',
    icon: Send,
    accent: 'from-violet-500 to-fuchsia-500',
    metric: { label: 'Clean claim rate', value: '99.99%' },
  },
  {
    name: 'DEXA',
    role: 'Denials Agent',
    desc: 'Analyzes denial patterns, generates appeals, and prevents repeat denials.',
    icon: AlertOctagon,
    accent: 'from-fuchsia-500 to-pink-500',
    metric: { label: 'Rejection cuts', value: '18–50%' },
  },
  {
    name: 'ARIS',
    role: 'A/R Agent',
    desc: 'Automates A/R follow-ups and prioritizes high-value claims for recovery.',
    icon: TrendingUp,
    accent: 'from-emerald-400 to-cyan-500',
    metric: { label: 'A/R recovery', value: '+15%' },
  },
  {
    name: 'REMITA',
    role: 'Posting Agent',
    desc: 'Posts payments, reconciles remittances, and flags discrepancies in real-time.',
    icon: Wallet,
    accent: 'from-amber-400 to-orange-500',
    metric: { label: 'Reconciliation', value: 'Real-time' },
  },
];

export default function AIAgents() {
  return (
    <section id="agents" className="relative py-12 md:py-20">
      <div className="absolute inset-0 -z-10 grid-bg opacity-60" />

      <div className="container-prose">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="chip"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-300" />
            Meet the AI Workforce
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gradient"
          >
            Seven specialists.<br className="hidden md:block" /> One revenue cycle.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 text-lg text-slate-300 max-w-2xl"
          >
            Each agent is purpose-built for one stage of the billing pipeline — collaborating
            autonomously to deliver near-perfect claims, faster payments, and fewer denials.
          </motion.p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {agents.map((a, i) => (
            <AgentCard
              key={a.name}
              agent={a}
              index={i}
              isLastOrphan={i === agents.length - 1 && agents.length % 3 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AgentCard({ agent, index, isLastOrphan }) {
  const Icon = agent.icon;
  // When the final card lands alone in a row, span both tablet cols (capped width,
  // auto-centered) and shift to the middle column on desktop.
  const orphanClasses = isLastOrphan
    ? 'sm:col-span-2 sm:justify-self-center sm:w-full sm:max-w-[calc(50%-10px)] lg:col-span-1 lg:col-start-2 lg:max-w-none'
    : '';
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`card-glow group relative glass rounded-3xl p-6 md:p-7 overflow-hidden ${orphanClasses}`}
    >
      {/* gradient hover halo */}
      <div
        className={`pointer-events-none absolute -top-20 -right-20 w-56 h-56 rounded-full bg-gradient-to-br ${agent.accent} opacity-0 group-hover:opacity-30 blur-3xl transition-opacity duration-700`}
      />

      <div className="relative flex items-start justify-between">
        <div
          className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${agent.accent} grid place-items-center shadow-lg`}
        >
          <Icon className="w-5 h-5 text-white" />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20" />
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-widest text-slate-400">
            {agent.metric.label}
          </div>
          <div className="font-display text-lg font-bold text-white">{agent.metric.value}</div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-baseline gap-3">
          <h3 className="font-display text-2xl font-bold text-white tracking-tight">
            {agent.name}
          </h3>
          <span className="font-mono text-[11px] text-cyan-300/80 uppercase tracking-wider">
            {agent.role}
          </span>
        </div>
        <p className="mt-3 text-slate-300/90 text-[15px] leading-relaxed">{agent.desc}</p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
        <span className="text-[11px] text-slate-500 uppercase tracking-wider flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative rounded-full h-1.5 w-1.5 bg-emerald-400" />
          </span>
          Active
        </span>
        <span className="text-xs text-slate-400 group-hover:text-white transition-colors flex items-center gap-1">
          Learn more
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </motion.article>
  );
}
