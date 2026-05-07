import { motion } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

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
  {
    quote:
      'DEXA found denial patterns we had been writing off for years. We recovered six figures in the first 60 days from claims we thought were dead.',
    name: 'Marcus Whitfield',
    title: 'Director of Billing, Apex Orthopedic Partners',
    metric: '$640K',
    metricLabel: 'Recovered in 60 days',
  },
  {
    quote:
      'The migration was painless and the lift was immediate. Our coders now review edge cases instead of grinding through routine claims — burnout is finally going down.',
    name: 'Dr. Priya Iyer',
    title: 'Chief Medical Officer, Coastline Family Medicine',
    metric: '–63%',
    metricLabel: 'Coder workload',
  },
];

export default function Testimonials() {
  const trackRef = useRef(null);
  const programmaticRef = useRef(false);
  const programmaticTimerRef = useRef(0);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(1);

  // Match Tailwind breakpoints: mobile=1, md=2, lg=3 cards visible.
  useEffect(() => {
    const lg = window.matchMedia('(min-width: 1024px)');
    const md = window.matchMedia('(min-width: 768px)');
    const update = () => {
      setVisible(lg.matches ? 3 : md.matches ? 2 : 1);
    };
    update();
    lg.addEventListener('change', update);
    md.addEventListener('change', update);
    return () => {
      lg.removeEventListener('change', update);
      md.removeEventListener('change', update);
    };
  }, []);

  const maxIndex = Math.max(0, testimonials.length - visible);
  const pageCount = maxIndex + 1;

  // Keep active in valid range when viewport changes (e.g., resize from desktop to mobile).
  useEffect(() => {
    setActive((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const scrollToIndex = useCallback((idx) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll('[data-card]');
    const target = cards[idx];
    const first = cards[0];
    if (!target || !first) return;
    // Block the scroll-sync listener while we drive the scroll programmatically,
    // otherwise mid-animation it sees the old card as "closest" and yanks us back.
    programmaticRef.current = true;
    clearTimeout(programmaticTimerRef.current);
    programmaticTimerRef.current = setTimeout(() => {
      programmaticRef.current = false;
    }, 700);
    track.scrollTo({
      left: target.offsetLeft - first.offsetLeft,
      behavior: 'smooth',
    });
  }, []);

  const next = useCallback(() => {
    setActive((i) => (i >= maxIndex ? 0 : i + 1));
  }, [maxIndex]);
  const prev = useCallback(() => {
    setActive((i) => (i <= 0 ? maxIndex : i - 1));
  }, [maxIndex]);

  useEffect(() => {
    scrollToIndex(active);
  }, [active, scrollToIndex]);

  // Auto-advance every 6s — always loops, no pause.
  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i >= maxIndex ? 0 : i + 1));
    }, 6000);
    return () => clearInterval(id);
  }, [maxIndex]);

  // Sync active dot with manual scroll (touch swipes / trackpad), clamped to maxIndex.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      if (programmaticRef.current) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const cards = track.querySelectorAll('[data-card]');
        if (!cards.length) return;
        const first = cards[0];
        const trackLeft = track.scrollLeft;
        let closest = 0;
        let min = Infinity;
        cards.forEach((c, i) => {
          const d = Math.abs(c.offsetLeft - first.offsetLeft - trackLeft);
          if (d < min) {
            min = d;
            closest = i;
          }
        });
        const clamped = Math.min(closest, maxIndex);
        setActive((cur) => (cur === clamped ? cur : clamped));
      });
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [maxIndex]);

  useEffect(() => () => clearTimeout(programmaticTimerRef.current), []);

  return (
    <section className="relative py-12 md:py-20">
      <div className="container-prose">
        <div className="flex items-end justify-between gap-6 flex-wrap">
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

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonials"
              className="w-11 h-11 grid place-items-center rounded-full glass hover:border-cyan-400/40 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-slate-200" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonials"
              className="w-11 h-11 grid place-items-center rounded-full glass hover:border-cyan-400/40 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-slate-200" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="testimonial-track mt-10 flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 -mx-6 px-6 md:-mx-10 md:px-10 scroll-pl-6 md:scroll-pl-10"
          style={{ scrollbarWidth: 'none' }}
        >
          {testimonials.map((t) => (
            <figure
              key={t.name}
              data-card
              className="card-glow group glass rounded-3xl p-7 flex flex-col snap-start shrink-0 w-[88%] sm:w-[60%] md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
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

              <figcaption className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-white font-medium truncate">{t.name}</div>
                  <div className="text-slate-400 text-sm truncate">{t.title}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-display text-xl font-bold text-gradient-cv">
                    {t.metric}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-500">
                    {t.metricLabel}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active}
              className="group relative h-2 rounded-full transition-all duration-300"
              style={{ width: i === active ? 28 : 8 }}
            >
              <span
                className={`absolute inset-0 rounded-full transition-colors ${
                  i === active
                    ? 'bg-gradient-to-r from-cyan-400 to-violet-500'
                    : 'bg-white/15 group-hover:bg-white/25'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
