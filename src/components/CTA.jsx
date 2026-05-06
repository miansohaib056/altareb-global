import { motion } from 'framer-motion';
import { ArrowRight, PhoneCall, Mail } from 'lucide-react';

export default function CTA() {
  return (
    <section id="contact" className="relative py-28">
      <div className="container-prose">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative isolate overflow-hidden rounded-[2.5rem] p-10 md:p-16"
        >
          {/* gradient frame */}
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-violet-500/20" />
          <div className="absolute inset-[1px] rounded-[2.45rem] bg-ink-950/95 backdrop-blur-xl" />

          {/* glows */}
          <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/20 blur-[140px]" />
          <div className="absolute -bottom-32 right-1/4 w-[600px] h-[600px] rounded-full bg-violet-500/20 blur-[140px]" />

          {/* shimmering grid */}
          <div className="absolute inset-0 grid-bg opacity-50" />

          <div className="relative grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <span className="chip">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-300" />
                Ready in 14 days
              </span>
              <h2 className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gradient leading-[1.05]">
                Let our agents take over your billing — and turn delays into dependable revenue.
              </h2>
              <p className="mt-5 text-lg text-slate-300 max-w-2xl">
                Book a free consultation. We'll audit your last 30 days of claims, project your
                revenue lift, and show you exactly which agents will deliver it.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a href="#contact" className="btn-primary group">
                  Book Your Free Consultation
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a href="tel:+12147642345" className="btn-ghost">
                  <PhoneCall className="w-4 h-4 text-cyan-300" />
                  +1 (214) 764-2345
                </a>
              </div>
            </div>

            {/* Contact card */}
            <div className="lg:col-span-5">
              <div className="glass-strong rounded-3xl p-6 md:p-7">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 grid place-items-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-slate-400">
                      Reach us
                    </div>
                    <div className="text-white font-medium">info@rcmautomation.ai</div>
                  </div>
                </div>

                <div className="mt-6 space-y-3 text-sm">
                  {[
                    'Free 30-day claims audit',
                    'Custom ROI projection',
                    'Live agent demo on your data',
                    'No commitment, no commitment fees',
                  ].map((p) => (
                    <div key={p} className="flex items-center gap-3 text-slate-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.7)]" />
                      {p}
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-white/5 text-xs text-slate-500">
                  12622 Paseo Cerro · Saratoga, CA 95070
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
