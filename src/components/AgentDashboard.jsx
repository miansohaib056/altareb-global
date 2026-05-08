import { motion } from 'framer-motion';
import {
  Search,
  Bell,
  Sparkles,
  Pause,
  RefreshCw,
  Zap,
  ListChecks,
  Target,
  PlayCircle,
  RotateCcw,
} from 'lucide-react';

// One dashboard per agent — the layout below is shared, only data differs.
const dashboards = {
  ELIXA: {
    domain: 'Eligibility Hub',
    greeting: 'You have 412 verifications complete and 38 pending today.',
    section: 'Live Verification Queue',
    banner: 'ELIXA cleared 3 high-risk patients this hour.',
    actions: ['Sync Payers', 'Run Batch'],
    items: [
      { time: '08:14 AM', title: 'Sarah Mitchell', sub: 'BCBS · Active · $1,200 deductible', status: 'Verified', priority: 'High' },
      { time: '08:31 AM', title: 'James Park', sub: 'Aetna · Active · $500 copay', status: 'Verified', priority: 'High' },
      { time: '08:42 AM', title: 'Linda Chen', sub: 'UnitedHealth · Pending review', status: 'Pending', priority: 'Medium' },
      { time: '08:55 AM', title: 'Marcus Reed', sub: 'Cigna · Active · $250 copay', status: 'Verified', priority: 'Low' },
    ],
    widget: { title: 'Verification Rate', value: '99.2%', sub: 'Above target' },
  },
  PRIA: {
    domain: 'Auth Hub',
    greeting: 'You have 18 prior auths in flight, 12 awaiting payer response.',
    section: 'Auth Pipeline',
    banner: 'PRIA approved 7 high-priority requests this morning.',
    actions: ['Sync Payers', 'New Auth'],
    items: [
      { time: '07:45 AM', title: 'MRI · Lumbar Spine · Pt #4812', sub: 'UnitedHealth · Submitted', status: 'Approved', priority: 'High' },
      { time: '08:02 AM', title: 'CT Scan · Abdomen · Pt #4815', sub: 'Aetna · Awaiting docs', status: 'Pending', priority: 'High' },
      { time: '08:18 AM', title: 'Knee Surgery · Pt #4820', sub: 'BCBS · Approved', status: 'Approved', priority: 'High' },
      { time: '08:29 AM', title: 'PT · 12 sessions · Pt #4822', sub: 'Cigna · Submitted', status: 'Pending', priority: 'Medium' },
    ],
    widget: { title: 'Auth Turnaround', value: '2.1h', sub: '–80% vs industry' },
  },
  CODIN: {
    domain: 'Coding Hub',
    greeting: 'You have 287 charts coded today with 99.6% compliance accuracy.',
    section: 'Recent Coding Decisions',
    banner: 'CODIN flagged 4 charts for upcoder review.',
    actions: ['Sync Updates', 'Run Audit'],
    items: [
      { time: '08:10 AM', title: 'Visit · Pt #5102 · Cardiology', sub: 'CPT 99214 · ICD I10, E78.5', status: 'Locked', priority: 'High' },
      { time: '08:24 AM', title: 'Procedure · Pt #5108 · Ortho', sub: 'CPT 27447 · ICD M17.11', status: 'Locked', priority: 'High' },
      { time: '08:36 AM', title: 'Visit · Pt #5114 · Internal', sub: 'CPT 99213 · awaiting documentation', status: 'Pending', priority: 'Medium' },
      { time: '08:48 AM', title: 'Lab · Pt #5119 · Endo', sub: 'CPT 80061 · ICD E11.9', status: 'Locked', priority: 'Low' },
    ],
    widget: { title: 'Coding Accuracy', value: '99.6%', sub: 'Compliance updated' },
  },
  CLAIR: {
    domain: 'Claims Hub',
    greeting: 'You have 1,124 claims scrubbed and 3 awaiting human review today.',
    section: 'Claim Submission Pipeline',
    banner: 'CLAIR caught 47 issues before submission this morning.',
    actions: ['Sync Clearinghouse', 'Submit Batch'],
    items: [
      { time: '08:05 AM', title: 'Batch #B-2204 · 312 claims', sub: 'Cigna · Scrubbed clean', status: 'Submitted', priority: 'High' },
      { time: '08:21 AM', title: 'Batch #B-2205 · 248 claims', sub: 'BCBS · 2 issues fixed', status: 'Submitted', priority: 'High' },
      { time: '08:38 AM', title: 'Batch #B-2206 · 184 claims', sub: 'UnitedHealth · Scrubbing', status: 'Pending', priority: 'Medium' },
      { time: '08:51 AM', title: 'Single · CLM-19022', sub: 'Aetna · Manual review', status: 'Review', priority: 'Low' },
    ],
    widget: { title: 'Clean Claim Rate', value: '99.99%', sub: 'Best-in-class' },
  },
  DEXA: {
    domain: 'Denials Hub',
    greeting: 'You have 56 denials in queue and 22 appeals filed this week.',
    section: 'Active Denials',
    banner: 'DEXA detected a recurring CO-197 pattern across BCBS plans.',
    actions: ['Run Pattern Scan', 'File Appeals'],
    items: [
      { time: '07:58 AM', title: 'CLM-18821 · CO-197', sub: 'BCBS · Auth not on file', status: 'Appealing', priority: 'High' },
      { time: '08:14 AM', title: 'CLM-18847 · CO-16', sub: 'Aetna · Missing modifier', status: 'Resubmitted', priority: 'High' },
      { time: '08:32 AM', title: 'CLM-18852 · PR-204', sub: 'United · Service not covered', status: 'Reviewing', priority: 'Medium' },
      { time: '08:46 AM', title: 'CLM-18860 · CO-29', sub: 'Cigna · Timely filing', status: 'Escalated', priority: 'Medium' },
    ],
    widget: { title: 'Recovery Rate', value: '74%', sub: '+18 pts QoQ' },
  },
  ARIA: {
    domain: 'A/R Hub',
    greeting: 'You have $342K in A/R prioritized with 28 follow-ups due today.',
    section: 'Priority A/R Worklist',
    banner: 'ARIA recovered $48K from the 60-day bucket this week.',
    actions: ['Run Aging', 'Send Outreach'],
    items: [
      { time: '08:00 AM', title: 'CLM-17402 · $4,820', sub: 'BCBS · 47 days · 2nd follow-up', status: 'Contacted', priority: 'High' },
      { time: '08:18 AM', title: 'CLM-17418 · $3,210', sub: 'Aetna · 62 days · escalation', status: 'Escalated', priority: 'High' },
      { time: '08:35 AM', title: 'CLM-17425 · $1,940', sub: 'UnitedHealth · 31 days · 1st outreach', status: 'Pending', priority: 'Medium' },
      { time: '08:50 AM', title: 'CLM-17432 · $2,640', sub: 'Cigna · 88 days · final notice', status: 'Final', priority: 'High' },
    ],
    widget: { title: 'A/R Recovery', value: '+15%', sub: 'YoY trend' },
  },
  REMITA: {
    domain: 'Posting Hub',
    greeting: 'You have $128K posted today with 3 discrepancies flagged for review.',
    section: 'Recent Postings',
    banner: 'REMITA reconciled 482 line items in real-time this hour.',
    actions: ['Sync ERA', 'Reconcile'],
    items: [
      { time: '08:08 AM', title: 'ERA #ER-9281 · $48,200', sub: 'BCBS · 142 line items', status: 'Posted', priority: 'High' },
      { time: '08:24 AM', title: 'ERA #ER-9283 · $32,140', sub: 'Aetna · 98 line items', status: 'Posted', priority: 'High' },
      { time: '08:39 AM', title: 'ERA #ER-9285 · $18,640', sub: 'UnitedHealth · 1 mismatch', status: 'Review', priority: 'Medium' },
      { time: '08:52 AM', title: 'ERA #ER-9287 · $24,120', sub: 'Cigna · Posting', status: 'Pending', priority: 'Low' },
    ],
    widget: { title: 'Reconciliation', value: 'Real-time', sub: '0 backlog' },
  },
  AVA: {
    domain: 'Voice Hub',
    greeting: 'You have 72 calls in progress and 8,200 calls handled today.',
    section: 'Live Call Activity',
    banner: 'AVA resolved 64 eligibility checks by phone this morning.',
    actions: ['Resume All', 'Make Call'],
    items: [
      { time: '08:12 AM', title: 'Aetna · Eligibility check', sub: 'Pt #4812 · 2m 14s · resolved', status: 'Completed', priority: 'High' },
      { time: '08:26 AM', title: 'BCBS · Auth status', sub: 'Pt #4820 · 4m 02s · resolved', status: 'Completed', priority: 'High' },
      { time: '08:38 AM', title: 'United · A/R follow-up', sub: 'CLM-17425 · in progress · 3m 18s', status: 'Active', priority: 'Medium' },
      { time: '08:51 AM', title: 'Cigna · Claim status', sub: 'CLM-17402 · queued · est. 1m 40s', status: 'Queued', priority: 'Low' },
    ],
    widget: { title: 'First-Call Resolution', value: '84%', sub: '+11 pts MoM' },
  },
};

const statusToneMap = {
  Verified: 'emerald', Approved: 'emerald', Locked: 'emerald', Posted: 'emerald',
  Submitted: 'emerald', Completed: 'emerald',
  Pending: 'amber', Reviewing: 'amber', Review: 'amber', Resubmitted: 'amber', Queued: 'amber',
  Active: 'cyan', Contacted: 'cyan',
  Escalated: 'rose', Final: 'rose',
  Appealing: 'violet',
};

const toneClass = {
  emerald: 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20',
  amber: 'bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/20',
  cyan: 'bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-400/20',
  rose: 'bg-rose-500/15 text-rose-300 ring-1 ring-rose-400/20',
  violet: 'bg-violet-500/15 text-violet-300 ring-1 ring-violet-400/20',
};

const priorityClass = {
  High: 'text-emerald-300/90 ring-emerald-400/30',
  Medium: 'text-cyan-300/90 ring-cyan-400/30',
  Low: 'text-slate-400 ring-white/15',
};

export default function AgentDashboard({ agent }) {
  const data = dashboards[agent.name] ?? dashboards.ELIXA;
  const Icon = agent.icon;

  return (
    <div className="relative rounded-3xl bg-ink-900/60 border border-white/10 overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
      {/* Soft top halo in agent's hue */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b ${agent.accent} to-transparent opacity-15`}
      />

      {/* Header */}
      <header className="relative flex items-center gap-3 px-5 md:px-6 py-4 border-b border-white/5">
        <div
          className={`hidden sm:grid w-10 h-10 place-items-center rounded-xl bg-gradient-to-br ${agent.accent} shadow-lg shrink-0`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="hidden sm:block shrink-0">
          <div className="font-display font-bold text-white text-sm leading-tight">
            {agent.name}
          </div>
          <div className="text-[11px] text-slate-400">{data.domain}</div>
        </div>
        <div className="flex-1 relative ml-0 sm:ml-3">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder={`Search ${agent.name} workspace…`}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400/40 focus:bg-white/[0.06] transition-colors"
          />
        </div>
        <button
          type="button"
          aria-label="Pause"
          className="hidden md:grid w-9 h-9 place-items-center rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition-colors"
        >
          <Pause className="w-4 h-4 text-slate-300" />
        </button>
        <button
          type="button"
          aria-label="Notifications"
          className="hidden md:grid w-9 h-9 place-items-center rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition-colors"
        >
          <Bell className="w-4 h-4 text-slate-300" />
        </button>
      </header>

      {/* Body */}
      <div className="relative grid lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="p-5 md:p-6 space-y-5">
          {/* Greeting bubble */}
          <div className="flex items-start gap-3">
            <div
              className={`w-11 h-11 shrink-0 rounded-full bg-gradient-to-br ${agent.accent} grid place-items-center shadow-lg ring-2 ring-white/10`}
            >
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div className="relative flex-1 rounded-2xl bg-white/[0.03] border border-cyan-400/30 px-5 py-3.5">
              <div className="font-display text-lg md:text-xl font-bold text-white tracking-tight">
                Good to see you, Muhammad!
              </div>
              <p className="mt-0.5 text-sm text-slate-300">{data.greeting}</p>
              <span className="absolute -left-2 top-4 w-3 h-3 rotate-45 bg-white/[0.03] border-l border-b border-cyan-400/30" />
            </div>
          </div>

          {/* Section header */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 grid place-items-center rounded-lg bg-white/[0.04] border border-white/10">
                <ListChecks className="w-4 h-4 text-cyan-300" />
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-white tracking-tight">
                {data.section}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              {data.actions.map((action, i) => {
                const ActionIcon = i === 0 ? RefreshCw : Zap;
                return (
                  <button
                    key={action}
                    type="button"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs md:text-sm text-slate-200 hover:bg-white/[0.08] hover:border-cyan-400/30 transition-colors"
                  >
                    <ActionIcon className="w-3.5 h-3.5 text-cyan-300" />
                    {action}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Banner */}
          <div className="flex items-center gap-3 rounded-xl bg-emerald-500/[0.06] border border-emerald-400/25 px-4 py-2.5">
            <Sparkles className="w-4 h-4 text-emerald-300 shrink-0" />
            <span className="text-sm text-emerald-200/90">{data.banner}</span>
          </div>

          {/* Items */}
          <ul className="space-y-2.5">
            {data.items.map((item) => {
              const tone = statusToneMap[item.status] ?? 'cyan';
              return (
                <li
                  key={item.title}
                  className="flex items-center gap-4 rounded-xl bg-white/[0.025] border border-white/5 hover:border-white/10 transition-colors p-3.5"
                >
                  <div className="hidden sm:flex flex-col items-end shrink-0 w-20">
                    <span className="font-mono text-[11px] text-slate-400">{item.time}</span>
                    <span className={`mt-1 w-1 h-7 rounded-full bg-gradient-to-b ${agent.accent}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-medium text-sm md:text-base truncate">
                      {item.title}
                    </div>
                    <div className="text-xs md:text-sm text-slate-400 truncate">{item.sub}</div>
                  </div>
                  <span
                    className={`hidden md:inline-flex shrink-0 px-2.5 py-1 rounded-full text-[11px] font-medium ${toneClass[tone]}`}
                  >
                    {item.status}
                  </span>
                  <span
                    className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/[0.03] ring-1 ${priorityClass[item.priority]}`}
                  >
                    {item.priority}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right widget */}
        <aside className="hidden lg:flex flex-col border-l border-white/5 p-5 gap-4 bg-white/[0.01]">
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5 flex flex-col items-center text-center">
            <div className="flex items-center gap-2 self-start text-[11px] uppercase tracking-[0.2em] text-slate-400">
              <Target className="w-3.5 h-3.5 text-cyan-300" />
              Performance
            </div>
            <div className="mt-4 relative w-36 h-36 grid place-items-center">
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
                  stroke={`url(#perfGradient-${agent.name})`}
                  strokeWidth="6"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: '0 276' }}
                  animate={{ strokeDasharray: '232 276' }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                />
                <defs>
                  <linearGradient
                    id={`perfGradient-${agent.name}`}
                    x1="0"
                    x2="1"
                    y1="0"
                    y2="1"
                  >
                    <stop offset="0" stopColor="#22d3ee" />
                    <stop offset="1" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="text-center">
                <div className="font-display text-2xl font-bold text-white tracking-tight">
                  {data.widget.value}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 px-2">
                  {data.widget.title}
                </div>
              </div>
            </div>
            <div className="mt-2 text-[11px] text-emerald-300">{data.widget.sub}</div>
            <div className="mt-4 flex items-center gap-2 w-full">
              <button
                type="button"
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-slate-200 hover:bg-white/[0.08] transition-colors"
              >
                <PlayCircle className="w-3.5 h-3.5 text-cyan-300" />
                Resume
              </button>
              <button
                type="button"
                aria-label="Reset"
                className="w-9 h-9 grid place-items-center rounded-lg bg-white/[0.04] border border-white/10 text-slate-300 hover:bg-white/[0.08] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5">
            <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
              Live Activity
            </div>
            <div className="mt-3 space-y-2">
              {[
                { label: 'In progress', value: '24', cls: 'text-cyan-300' },
                { label: 'Completed today', value: '418', cls: 'text-emerald-300' },
                { label: 'Flagged', value: '3', cls: 'text-amber-300' },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">{s.label}</span>
                  <span className={`font-display font-bold ${s.cls}`}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Footer with Learn more CTA */}
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
