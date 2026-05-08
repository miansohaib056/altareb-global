import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Pool of integrations split across 4 cells. Each cell crossfades through its own
// list at the same interval but with a staggered offset so the grid feels alive
// without all cells flipping at once.
const cellPools = [
  ['EpicCare', 'eClinicalWorks', 'AdvancedMD'],
  ['Cerner', 'Allscripts', 'CharmHealth'],
  ['Athenahealth', 'DrChrono'],
  ['NextGen', 'Kareo'],
];

const INTERVAL_MS = 4500;
const STAGGER_MS = 1100;
const CELL_HEIGHT = 'h-24 md:h-28';

function LogoCell({ pool, offsetMs, className = '' }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    let interval;
    const start = setTimeout(() => {
      setIdx((i) => (i + 1) % pool.length);
      interval = setInterval(() => {
        setIdx((i) => (i + 1) % pool.length);
      }, INTERVAL_MS);
    }, offsetMs);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [pool.length, offsetMs]);

  return (
    <div className={`relative ${CELL_HEIGHT} overflow-hidden ${className}`}>
      <AnimatePresence initial={false}>
        <motion.div
          key={pool[idx]}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="font-display font-semibold text-xl md:text-2xl text-slate-300/80 tracking-tight leading-none">
            {pool[idx]}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function LogoMarquee() {
  return (
    <section className="relative border-y border-white/10 bg-white/[0.025]">
      <div className="container-prose">
        <div className="grid grid-cols-1 lg:grid-cols-5">
          {/* Text cell — height locked to match logo cells so vertical centering aligns */}
          <div
            className={`${CELL_HEIGHT} px-6 md:px-7 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-center`}
          >
            <p className="text-[11px] uppercase tracking-[0.25em] text-cyan-300/80 leading-none">
              Integrations
            </p>
            <h3 className="mt-2.5 text-base font-semibold text-white tracking-tight leading-snug">
              Integrates with the stack your team already runs.
            </h3>
          </div>

          {/* Logo cells */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-4">
            <LogoCell pool={cellPools[0]} offsetMs={0} />
            <LogoCell
              pool={cellPools[1]}
              offsetMs={STAGGER_MS}
              className="border-l border-white/10"
            />
            <LogoCell
              pool={cellPools[2]}
              offsetMs={STAGGER_MS * 2}
              className="border-t sm:border-t-0 sm:border-l border-white/10"
            />
            <LogoCell
              pool={cellPools[3]}
              offsetMs={STAGGER_MS * 3}
              className="border-t sm:border-t-0 border-l border-white/10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
