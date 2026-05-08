import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import {
  ShieldCheck,
  FileCheck2,
  Code2,
  Search,
  Zap,
  Coins,
  CircleDollarSign,
  Phone,
} from 'lucide-react';
import AgentDashboard from './AgentDashboard';
import AgentElixaPanel from './AgentElixaPanel';

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
    icon: Search,
    accent: 'from-violet-500 to-fuchsia-500',
    metric: { label: 'Clean claim rate', value: '99.99%' },
  },
  {
    name: 'DEXA',
    role: 'Denials Agent',
    desc: 'Analyzes denial patterns, generates appeals, and prevents repeat denials.',
    icon: Zap,
    accent: 'from-fuchsia-500 to-pink-500',
    metric: { label: 'Rejection cuts', value: '18–50%' },
  },
  {
    name: 'ARIA',
    role: 'A/R Agent',
    desc: 'Automates A/R follow-ups and prioritizes high-value claims for recovery.',
    icon: Coins,
    accent: 'from-emerald-400 to-cyan-500',
    metric: { label: 'A/R recovery', value: '+15%' },
  },
  {
    name: 'REMITA',
    role: 'Posting Agent',
    desc: 'Posts payments, reconciles remittances, and flags discrepancies in real-time.',
    icon: CircleDollarSign,
    accent: 'from-amber-400 to-orange-500',
    metric: { label: 'Reconciliation', value: 'Real-time' },
  },
  {
    name: 'AVA',
    role: 'Voice Agent',
    desc: 'Automates patient and payer calls — verifying eligibility, checking auth status, and chasing A/R by voice.',
    icon: Phone,
    accent: 'from-rose-400 to-pink-500',
    metric: { label: 'Calls / day', value: '8,200' },
  },
];

export default function AIAgents() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeAgent = agents[activeIdx];

  return (
    <section id="agents" className="relative py-12 md:py-20 overflow-x-hidden">
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
            Eight specialists.<br className="hidden md:block" /> One revenue cycle.
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

        <div className="mt-12 grid lg:grid-cols-[280px_minmax(0,1fr)] gap-5">
          {/* Tabs — horizontal scroll on mobile, vertical column on lg+ */}
          <div
            role="tablist"
            aria-label="AI agents"
            className="flex lg:flex-col gap-3 lg:gap-3.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0 snap-x snap-mandatory lg:snap-none"
            style={{ scrollbarWidth: 'none' }}
          >
            {agents.map((a, i) => (
              <AgentTab
                key={a.name}
                agent={a}
                isActive={i === activeIdx}
                onClick={() => setActiveIdx(i)}
              />
            ))}
          </div>

          {/* Active agent's dashboard */}
          <div className="min-w-0 max-w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeAgent.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="min-w-0"
              >
                {activeAgent.name === 'ELIXA' ? (
                  <AgentElixaPanel agent={activeAgent} />
                ) : (
                  <AgentDashboard agent={activeAgent} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function AgentTab({ agent, isActive, onClick }) {
  const Icon = agent.icon;
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={onClick}
      className={`group relative shrink-0 lg:shrink min-w-[220px] lg:min-w-0 snap-start flex items-center gap-3 p-3.5 rounded-2xl text-left transition-all duration-300 ${
        isActive
          ? 'bg-white/[0.05] ring-1 ring-cyan-400/30 shadow-[0_8px_30px_-12px_rgba(34,211,238,0.4)]'
          : 'bg-white/[0.02] ring-1 ring-white/5 hover:bg-white/[0.04] hover:ring-white/10'
      }`}
    >
      {/* active accent strip on the left edge */}
      <span
        className={`absolute left-0 top-3 bottom-3 w-1 rounded-full bg-gradient-to-b ${agent.accent} transition-opacity duration-300 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        className={`relative w-10 h-10 rounded-xl bg-gradient-to-br ${agent.accent} grid place-items-center shadow-lg shrink-0`}
      >
        <Icon className="w-5 h-5 text-white" />
        <div className="absolute inset-0 rounded-xl ring-1 ring-white/20" />
      </div>
      <div className="flex-1 min-w-0">
        <div
          className={`font-display font-bold tracking-tight transition-colors ${
            isActive ? 'text-white' : 'text-slate-200 group-hover:text-white'
          }`}
        >
          {agent.name}
        </div>
        <div className="font-mono text-[11px] text-cyan-300/80 uppercase tracking-wider truncate">
          {agent.role}
        </div>
      </div>
      {isActive && (
        <span className="hidden lg:flex items-center gap-1 text-[10px] uppercase tracking-wider text-emerald-300">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative rounded-full h-1.5 w-1.5 bg-emerald-400" />
          </span>
          Live
        </span>
      )}
    </button>
  );
}
