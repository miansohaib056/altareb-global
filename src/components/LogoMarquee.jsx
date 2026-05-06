import { motion } from 'framer-motion';

const logos = [
  'EpicCare', 'Cerner', 'Athenahealth', 'NextGen', 'eClinicalWorks',
  'Allscripts', 'DrChrono', 'Kareo', 'AdvancedMD', 'CharmHealth',
];

export default function LogoMarquee() {
  return (
    <section className="relative py-14 border-y border-white/5 bg-white/[0.015]">
      <div className="container-prose text-center mb-8">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
          Integrates with your stack — EHR, clearinghouse, and payer portals
        </p>
      </div>
      <div className="marquee-fade overflow-hidden">
        <motion.div
          className="flex gap-14 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        >
          {[...logos, ...logos].map((name, i) => (
            <span
              key={i}
              className="font-display font-semibold text-2xl md:text-3xl text-slate-400/70 hover:text-white transition-colors duration-300 tracking-tight"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
