import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Cpu, Activity, Database, Network, Zap } from 'lucide-react';

export default function Showcase() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-4, 4]);

  return (
    <section id="why" ref={ref} className="relative py-20 overflow-hidden">
      {/* Aurora background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-violet-500/20 blur-[100px] opacity-70" />
      </div>

      <div className="container-prose">
        <div className="text-center max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="chip"
          >
            The Platform
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gradient"
          >
            A neural network for revenue.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 text-lg text-slate-300"
          >
            Every claim flows through a coordinated mesh of agents, each learning from the
            outcome of the last. The result: cleaner submissions, faster payments, and zero
            blind spots.
          </motion.p>
        </div>

        {/* 3D-style orbital visual */}
        <div className="relative mt-14 mx-auto max-w-5xl perspective-1000">
          <motion.div
            style={{ rotate, y: y1 }}
            className="relative aspect-[16/10] glass-strong rounded-[2rem] p-6 md:p-10 shadow-[0_60px_120px_-40px_rgba(34,211,238,0.35)]"
          >
            {/* concentric rings */}
            <div className="absolute inset-0 grid place-items-center pointer-events-none">
              {[0.55, 0.75, 0.95].map((s, i) => (
                <div
                  key={i}
                  className="absolute aspect-square rounded-full border border-white/[0.06]"
                  style={{
                    width: `${s * 100}%`,
                    animation: `spin-slow ${30 + i * 10}s linear ${i % 2 ? 'reverse' : ''} infinite`,
                  }}
                >
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_20px_4px_rgba(34,211,238,0.7)]" />
                  <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_16px_3px_rgba(139,92,246,0.7)]" />
                </div>
              ))}
            </div>

            {/* Center brain/core */}
            <div className="relative h-full grid place-items-center">
              <motion.div
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-44 h-44 md:w-56 md:h-56"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 blur-2xl opacity-60 animate-pulse-slow" />
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-cyan-400 to-violet-600 opacity-90" />
                <div className="absolute inset-3 rounded-full bg-ink-950" />
                <div className="absolute inset-0 grid place-items-center">
                  <Cpu className="w-12 h-12 md:w-14 md:h-14 text-white" />
                </div>
                <div className="absolute -inset-3 rounded-full border border-white/10" />
                <div className="absolute -inset-6 rounded-full border border-white/5" />
              </motion.div>
            </div>

            {/* Orbiting nodes */}
            <Orbital
              icon={Activity}
              label="Eligibility"
              value="4,812 verified"
              className="absolute top-6 left-6"
              delay={0}
            />
            <Orbital
              icon={Database}
              label="Coding"
              value="ICD-10 · CPT"
              className="absolute top-10 right-6"
              delay={0.5}
            />
            <Orbital
              icon={Network}
              label="Submissions"
              value="99.99% clean"
              className="absolute bottom-10 left-10"
              delay={1}
            />
            <Orbital
              icon={Zap}
              label="Auth"
              value="2.1s avg"
              className="absolute bottom-6 right-12"
              delay={1.5}
            />
          </motion.div>

          {/* Stat cards floating */}
          <motion.div
            style={{ y: y2 }}
            className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 hidden lg:block"
          >
            <div className="glass rounded-2xl p-4 w-44 shadow-glow">
              <div className="text-[10px] uppercase tracking-widest text-slate-400">
                Manual work
              </div>
              <div className="font-display text-3xl font-bold text-white mt-1">–70%</div>
              <div className="text-xs text-cyan-300 mt-0.5">Across the pipeline</div>
            </div>
          </motion.div>

          <motion.div
            style={{ y: y1 }}
            className="absolute -right-4 md:-right-12 top-1/3 hidden lg:block"
          >
            <div className="glass rounded-2xl p-4 w-44 shadow-glow-violet">
              <div className="text-[10px] uppercase tracking-widest text-slate-400">
                Collections
              </div>
              <div className="font-display text-3xl font-bold text-white mt-1">+15%</div>
              <div className="text-xs text-violet-300 mt-0.5">in &lt; 90 days</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Orbital({ icon: Icon, label, value, className, delay = 0 }) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
      className={`glass rounded-2xl p-3 flex items-center gap-3 ${className}`}
    >
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 grid place-items-center">
        <Icon className="w-4 h-4 text-white" />
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-widest text-slate-400">{label}</div>
        <div className="text-xs text-white font-medium">{value}</div>
      </div>
    </motion.div>
  );
}
