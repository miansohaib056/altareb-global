import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote:
      'Our clean claim rate went from 92% to 99.6% in six weeks. The AI agents catch issues our team never would have flagged in time.',
    name: 'Dr. Maya Patel',
    title: 'CFO, Westline Cardiology Group',
    metric: '+8.4 pts',
    metricLabel: 'Clean claim rate',
  },
  {
    quote:
      "PRIA alone paid for the whole platform. Prior auths that used to take three days now close in under three hours.",
    name: 'Jonathan Reyes',
    title: 'VP Revenue Cycle, MercyHealth Network',
    metric: '–82%',
    metricLabel: 'Auth turnaround',
  },
  {
    quote:
      'We replaced two billing vendors with one fleet of agents. Collections climbed 14% in the first quarter and our team finally has time to think.',
    name: 'Aisha Bell',
    title: 'Practice Director, NorthBay Multispecialty',
    metric: '+14%',
    metricLabel: 'Quarterly collections',
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-32">
      <div className="container-prose">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="chip"
          >
            Trusted by RCM leaders
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-5 font-display text-4xl md:text-5xl font-bold tracking-tight text-gradient"
          >
            What revenue leaders say.
          </motion.h2>
        </div>

        <div className="mt-14 grid lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="card-glow group glass rounded-3xl p-7 flex flex-col"
            >
              <Quote className="w-9 h-9 text-cyan-400/50" />
              <blockquote className="mt-4 text-slate-200 text-[17px] leading-relaxed">
                "{t.quote}"
              </blockquote>

              <div className="mt-6 flex items-center gap-1 text-amber-300">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <figcaption className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">{t.name}</div>
                  <div className="text-slate-400 text-sm">{t.title}</div>
                </div>
                <div className="text-right">
                  <div className="font-display text-xl font-bold text-gradient-cv">
                    {t.metric}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-500">
                    {t.metricLabel}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
