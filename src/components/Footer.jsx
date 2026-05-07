import { Sparkles, Twitter, Linkedin, Github } from 'lucide-react';

const cols = [
  {
    title: 'Platform',
    links: [
      { label: 'AI Agents', href: '#agents' },
      { label: 'How it works', href: '#about' },
      { label: 'Results', href: '#results' },
      { label: 'Why RCM Automation', href: '#why' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#about' },
      { label: 'Contact', href: '#contact' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'HIPAA Notice', href: '#' },
      { label: 'Security', href: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 mt-8">
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-900 to-transparent" />

      <div className="container-prose py-10 md:py-12">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <a href="#top" className="flex items-center gap-2.5 group">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden">
                <div className="absolute inset-0 ring-gradient" />
                <div className="absolute inset-[2px] rounded-[10px] bg-ink-950 grid place-items-center">
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                </div>
              </div>
              <span className="font-display font-bold text-white tracking-tight text-xl">
                RCM<span className="text-gradient-cv">Automation</span>
              </span>
            </a>
            <p className="mt-5 text-slate-400 max-w-md leading-relaxed">
              Autonomous AI agents replacing manual medical billing — from eligibility to
              remittance. HIPAA-compliant, enterprise-secure, and built for the modern revenue
              cycle.
            </p>

            <div className="mt-6 flex gap-3">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="w-10 h-10 grid place-items-center rounded-xl glass hover:border-cyan-400/30 transition-colors"
                >
                  <Icon className="w-4 h-4 text-slate-300" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title} className="lg:col-span-2">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">{c.title}</div>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-slate-300 hover:text-white transition-colors text-sm"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-3">
            <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Contact</div>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li className="text-slate-300">
                <a href="mailto:info@rcmautomation.ai" className="hover:text-white">
                  info@rcmautomation.ai
                </a>
              </li>
              <li className="text-slate-300">
                <a href="tel:+12147642345" className="hover:text-white">
                  +1 (214) 764-2345
                </a>
              </li>
              <li className="text-slate-400">
                12622 Paseo Cerro
                <br />
                Saratoga, CA 95070
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} RCM Automation. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              All systems operational
            </span>
            <span>·</span>
            <span>HIPAA · SOC 2 · End-to-end encryption</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
