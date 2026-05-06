import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

const stats = [
  {
    value: 99.99,
    suffix: '%',
    decimals: 2,
    label: 'Claim accuracy',
    sub: 'Near-perfect submissions',
    accent: 'from-cyan-400 to-blue-500',
  },
  {
    value: 70,
    suffix: '%',
    label: 'Less manual work',
    sub: 'Across the entire pipeline',
    accent: 'from-blue-500 to-violet-500',
  },
  {
    value: 20,
    suffix: '%',
    prefix: '+',
    label: 'More earned revenue',
    sub: 'Captured by automation',
    accent: 'from-violet-500 to-fuchsia-500',
  },
  {
    value: 80,
    suffix: '%',
    prefix: '–',
    label: 'Prior-auth delays',
    sub: 'Reduced end-to-end',
    accent: 'from-emerald-400 to-cyan-500',
  },
];

export default function Stats() {
  return (
    <section id="results" className="relative py-32">
      <div className="absolute inset-0 -z-10 bg-radial-fade opacity-50" />

      <div className="container-prose">
        <div className="text-center max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="chip"
          >
            Outcomes, not promises
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gradient"
          >
            Results that compound, month over month.
          </motion.h2>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} index={i} />
          ))}
        </div>

        {/* Big trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 glass-strong rounded-3xl p-8 md:p-10 grid md:grid-cols-3 gap-8 items-center text-center md:text-left"
        >
          <div>
            <div className="font-display text-5xl font-bold text-gradient-cv">1,000+</div>
            <div className="text-slate-400 mt-1 text-sm uppercase tracking-wider">
              Provider clients
            </div>
          </div>
          <div>
            <div className="font-display text-5xl font-bold text-gradient-cv">1,000+</div>
            <div className="text-slate-400 mt-1 text-sm uppercase tracking-wider">
              Five-star reviews
            </div>
          </div>
          <div>
            <div className="font-display text-5xl font-bold text-gradient-cv">98%</div>
            <div className="text-slate-400 mt-1 text-sm uppercase tracking-wider">
              Customer retention
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StatCard({ stat, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const count = useMotionValue(0);
  const display = useTransform(count, (v) =>
    `${stat.prefix ?? ''}${v.toFixed(stat.decimals ?? 0)}${stat.suffix ?? ''}`,
  );

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, stat.value, {
      duration: 2.2,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.1 + index * 0.1,
    });
    return controls.stop;
  }, [inView, count, stat.value, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="card-glow relative glass rounded-3xl p-7 overflow-hidden"
    >
      <div
        className={`absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br ${stat.accent} opacity-20 blur-3xl`}
      />
      <motion.div className="relative font-display text-5xl md:text-6xl font-bold text-white tracking-tight">
        {display}
      </motion.div>
      <div className="relative mt-3">
        <div className="text-white font-medium">{stat.label}</div>
        <div className="text-slate-400 text-sm">{stat.sub}</div>
      </div>
    </motion.div>
  );
}
