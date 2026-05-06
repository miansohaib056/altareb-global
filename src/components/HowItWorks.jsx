import { motion } from 'framer-motion';
import { useRef } from 'react';
import { CheckCircle2, ArrowRight, BadgeCheck } from 'lucide-react';

const steps = [
  {
    n: '01',
    title: 'Connect your stack',
    body:
      'Plug RCM Automation into your EHR, clearinghouse, and payer portals via secure APIs. Setup is HIPAA-compliant with end-to-end encryption.',
  },
  {
    n: '02',
    title: 'Agents observe & learn',
    body:
      'Every agent ingests your historical claims, denial patterns, and payer rules — then begins suggesting improvements within hours.',
  },
  {
    n: '03',
    title: 'Autonomous execution',
    body:
      'Eligibility checks, coding, submissions, denial appeals, and payment posting happen automatically — your team supervises, not executes.',
  },
  {
    n: '04',
    title: 'Compounding revenue',
    body:
      'As the agents learn your payer mix, clean-claim rate climbs to 99.99% and collections grow 10–15% within the first 90 days.',
  },
];

export default function HowItWorks() {
  const ref = useRef(null);

  return (
    <section id="about" ref={ref} className="relative py-32">
      <div className="container-prose grid lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="chip"
          >
            How it works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-5 font-display text-4xl md:text-5xl font-bold tracking-tight text-gradient leading-[1.05]"
          >
            From manual chaos to autonomous revenue — in days.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 text-slate-300 text-lg"
          >
            Most providers are live and seeing measurable lift inside two weeks. No rip-and-replace,
            no months of consulting — your team keeps the control surface, the agents do the work.
          </motion.p>

          <div className="mt-8 flex flex-wrap gap-4">
            {[
              'HIPAA-compliant',
              'SOC 2 controls',
              'End-to-end encryption',
              'Audit-ready logs',
            ].map((p) => (
              <span
                key={p}
                className="flex items-center gap-2 text-sm text-slate-300 glass rounded-full px-3 py-1.5"
              >
                <BadgeCheck className="w-4 h-4 text-emerald-300" /> {p}
              </span>
            ))}
          </div>

          <a href="#contact" className="btn-primary mt-10 group">
            See it in action
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <ol className="lg:col-span-7 relative">
          {/* connecting line */}
          <div className="absolute left-[26px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan-400/60 via-violet-500/40 to-transparent" />

          {steps.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative pl-20 pb-12 last:pb-0"
            >
              <div className="absolute left-0 top-0 w-[54px] h-[54px] rounded-full glass grid place-items-center font-mono text-sm text-cyan-300 ring-1 ring-cyan-400/20 shadow-glow">
                {s.n}
              </div>
              <div className="glass rounded-2xl p-6">
                <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-slate-300/90 leading-relaxed">{s.body}</p>
                {i === steps.length - 1 && (
                  <div className="mt-4 flex items-center gap-2 text-emerald-300 text-sm">
                    <CheckCircle2 className="w-4 h-4" /> Average go-live: 14 days
                  </div>
                )}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
