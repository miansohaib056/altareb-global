import { motion } from 'framer-motion';
import { Sparkles, Plus, RefreshCw } from 'lucide-react';

const items = [
  { time: '08:14 AM', name: 'Sarah Mitchell', details: 'BCBS · Active · $1,200 deductible' },
  { time: '08:31 AM', name: 'James Park', details: 'Aetna · Active · $500 copay' },
  { time: '08:42 AM', name: 'Linda Chen', details: 'UnitedHealth · Pending review' },
  { time: '08:55 AM', name: 'Marcus Reed', details: 'Cigna · Active · $250 copay' },
];

const widgets = [
  { title: 'Success Rate', value: '99.2%', subLabel: 'Verification Rate', sub: '15% Success Rate' },
  { title: 'Active Plans', value: '99.2%', subLabel: 'Verification Rate', sub: '15% Active Plans' },
  { title: 'Verified Today', value: '99.2%', subLabel: 'Verification Rate', sub: '10% Verified Today' },
  { title: 'Expiring Soon', value: '99.2%', subLabel: 'Verification Rate', sub: '15% Expiring' },
];

const filters = ['All', 'Pending', 'In-progress', 'Active', 'Conflict'];

const tabs = [
  { label: 'Verification Queue', active: true },
  { label: 'Manual Review Queue' },
  { label: 'HTML Review' },
];

export default function AgentElixaPanel({ agent }) {
  const Icon = agent.icon;

  return (
    <div className="relative rounded-3xl bg-ink-900/60 border border-white/10 overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
      {/* Soft top halo in agent's hue */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b ${agent.accent} to-transparent opacity-15`}
      />

      {/* Greeting header */}
      <header className="relative flex items-start gap-3 p-5 md:p-6 border-b border-white/5">
        <div
          className={`w-12 h-12 shrink-0 rounded-full bg-gradient-to-br ${agent.accent} grid place-items-center shadow-lg ring-2 ring-white/10`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="relative flex-1 min-w-0 rounded-2xl bg-white/[0.03] border border-cyan-400/30 px-5 py-3.5">
          <div className="font-display text-xl md:text-2xl font-bold text-white tracking-tight">
            Verification Queue!
          </div>
          <p className="mt-0.5 text-sm text-slate-300">
            AI-management eligibility verification — All active patients
          </p>
          <span className="absolute -left-2 top-4 w-3 h-3 rotate-45 bg-white/[0.03] border-l border-b border-cyan-400/30" />
        </div>
      </header>

      {/* Body — content left, widgets right */}
      <div className="relative grid lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="p-5 md:p-6 space-y-4 min-w-0">
          {/* Action / queue toggle row */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-white text-sm font-medium shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-shadow"
            >
              <Plus className="w-3.5 h-3.5" />
              New Check
            </button>
            {tabs.map((t) => (
              <button
                key={t.label}
                type="button"
                className={`px-3.5 py-1.5 rounded-lg text-sm transition-colors ${
                  t.active
                    ? 'bg-cyan-500/10 ring-1 ring-cyan-400/40 text-cyan-100'
                    : 'bg-white/[0.04] border border-white/10 text-slate-300 hover:bg-white/[0.08]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Banner */}
          <div className="flex items-center gap-3 rounded-xl bg-emerald-500/[0.06] border border-emerald-400/25 px-4 py-2.5">
            <Sparkles className="w-4 h-4 text-emerald-300 shrink-0" />
            <span className="text-sm text-emerald-200/90">
              ELIXA cleared 3 high-risk patients this hour.
            </span>
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {filters.map((f, i) => (
              <button
                key={f}
                type="button"
                className={`px-3.5 py-1.5 rounded-lg text-sm transition-colors ${
                  i === 0
                    ? 'bg-white/[0.04] ring-1 ring-cyan-400/30 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {f}
              </button>
            ))}
            <button
              type="button"
              aria-label="Refresh"
              className="ml-auto w-8 h-8 grid place-items-center rounded-lg bg-white/[0.04] border border-white/10 text-slate-300 hover:bg-white/[0.08] transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Items */}
          <ul className="space-y-2.5">
            {items.map((item) => (
              <li
                key={item.time + item.name}
                className="flex items-center gap-4 rounded-xl bg-white/[0.025] border border-white/5 hover:border-white/10 transition-colors p-3.5"
              >
                <div className="hidden sm:flex flex-col items-end shrink-0 w-20">
                  <span className="font-mono text-[11px] text-slate-400">{item.time}</span>
                  <span
                    className={`mt-1 w-1 h-7 rounded-full bg-gradient-to-b ${agent.accent}`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium text-sm md:text-base truncate">
                    {item.name}
                  </div>
                  <div className="text-xs md:text-sm text-slate-400 truncate">
                    {item.details}
                  </div>
                </div>
                <span className="shrink-0 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20">
                  Verified
                </span>
                <span className="shrink-0 px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/[0.03] ring-1 text-emerald-300/90 ring-emerald-400/30">
                  High
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right widget grid */}
        <aside className="hidden lg:block border-l border-white/5 p-4 bg-white/[0.01]">
          <div className="grid grid-cols-2 gap-3">
            {widgets.map((w, i) => (
              <Widget key={w.title} widget={w} index={i} agentName={agent.name} />
            ))}
          </div>
        </aside>
      </div>

      {/* Footer */}
      <div className="relative border-t border-white/5 px-5 md:px-6 py-3 flex items-center justify-between gap-4">
        <span className="hidden sm:flex items-center gap-2 text-[11px] uppercase tracking-wider text-slate-500">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative rounded-full h-1.5 w-1.5 bg-emerald-400" />
          </span>
          {agent.name} active
        </span>
        <a
          href="#contact"
          className="group ml-auto inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-white transition-colors"
        >
          Learn more
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </div>
  );
}

function Widget({ widget, index, agentName }) {
  const id = `${agentName}-${widget.title.replace(/\s+/g, '')}`;
  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-3.5 flex flex-col">
      <div className="flex items-center gap-2 text-[11px] text-slate-300">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
        {widget.title}
      </div>
      <div className="mt-2 relative w-20 h-20 mx-auto grid place-items-center">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="6"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke={`url(#${id}-grad)`}
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ strokeDasharray: '0 276' }}
            animate={{ strokeDasharray: '232 276' }}
            transition={{ duration: 1.2, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          />
          <defs>
            <linearGradient id={`${id}-grad`} x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#22d3ee" />
              <stop offset="1" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>
        <div className="text-center">
          <div className="font-display text-sm font-bold text-white tracking-tight">
            {widget.value}
          </div>
          <div className="text-[7px] text-slate-400 leading-tight">{widget.subLabel}</div>
        </div>
      </div>
      <div className="mt-2 text-[11px] text-cyan-300 text-center">{widget.sub}</div>
    </div>
  );
}
