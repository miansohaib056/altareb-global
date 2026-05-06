import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'AI Agents', href: '#agents' },
  { label: 'Why Us', href: '#why' },
  { label: 'Results', href: '#results' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'pt-3' : 'pt-5'
      }`}
    >
      <nav
        className={`container-prose flex items-center justify-between rounded-2xl transition-all duration-500 ${
          scrolled
            ? 'glass-strong shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)] py-3 px-4 md:px-6'
            : 'py-4 px-4 md:px-6'
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden">
            <div className="absolute inset-0 ring-gradient animate-spin-slow" />
            <div className="absolute inset-[2px] rounded-[10px] bg-ink-950 grid place-items-center">
              <Sparkles className="w-4 h-4 text-cyan-300" />
            </div>
          </div>
          <span className="font-display font-bold text-white tracking-tight text-lg">
            RCM<span className="text-gradient-cv">Automation</span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors group"
              >
                {l.label}
                <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-px bg-gradient-to-r from-cyan-400 to-violet-400 group-hover:w-2/3 transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <a href="#contact" className="btn-primary text-sm py-2.5 px-5">
            Book Free Consultation
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden w-10 h-10 grid place-items-center rounded-xl glass"
          aria-label="Menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden container-prose mt-3"
          >
            <div className="glass-strong rounded-2xl p-2">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-xl text-slate-200 hover:bg-white/5"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn-primary w-full mt-2"
              >
                Book Free Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
