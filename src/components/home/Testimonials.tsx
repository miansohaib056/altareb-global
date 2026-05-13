"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah M.",
    location: "New York, USA",
    rating: 5,
    text: "The Medjool dates are absolutely divine. You can taste the difference compared to supermarket varieties. Fresh, plump, and perfectly sweet. My family goes through a box every week now!",
  },
  {
    id: 2,
    name: "Ahmed K.",
    location: "London, UK",
    rating: 5,
    text: "I have been searching for authentic mamoul that reminds me of home, and Hijazi Taste delivered exactly that. The packaging was pristine and the flavors transported me back to my grandmother's kitchen.",
  },
  {
    id: 3,
    name: "Fatima R.",
    location: "Toronto, Canada",
    rating: 5,
    text: "The Pure Natural honey is exceptional. Rich, aromatic, and clearly unprocessed. I use it daily in my tea and cooking. Best online purchase I have made this year.",
  },
  {
    id: 4,
    name: "David L.",
    location: "Sydney, Australia",
    rating: 4,
    text: "Aziz Nuts mix is my go-to snack now. Perfectly roasted with just the right amount of seasoning. The quality is restaurant-grade. Fast shipping was a pleasant surprise too.",
  },
  {
    id: 5,
    name: "Layla H.",
    location: "Dubai, UAE",
    rating: 5,
    text: "The Oslo chocolate cakes make the perfect gift. Sent a box to my parents and they were over the moon. Premium quality you can actually see and taste. Will definitely reorder.",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  const testimonial = testimonials[current];

  return (
    <section className="py-20 sm:py-28 bg-[#FAF7F2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-[#C8A97E] text-sm font-semibold tracking-widest uppercase">
            Testimonials
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
            What Our Customers Say
          </h2>
          <div className="mt-4 mx-auto w-16 h-1 bg-gradient-to-r from-transparent via-[#C8A97E] to-transparent rounded-full" />
        </motion.div>

        {/* Testimonial card */}
        <div className="relative">
          {/* Quote decoration */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 sm:left-8 sm:translate-x-0 z-10">
            <div className="w-12 h-12 rounded-full bg-[#C8A97E] flex items-center justify-center shadow-lg">
              <Quote className="w-5 h-5 text-white" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-[#1A1A1A]/5 px-6 sm:px-12 pt-12 pb-8 min-h-[260px] flex flex-col justify-between overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={testimonial.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex-1"
              >
                {/* Stars */}
                <div className="flex items-center gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating
                          ? "text-[#C8A97E] fill-[#C8A97E]"
                          : "text-[#C8A97E]/20"
                      }`}
                    />
                  ))}
                </div>

                {/* Review text */}
                <p className="text-[#1A1A1A]/70 text-base sm:text-lg leading-relaxed mb-6">
                  {testimonial.text}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C8A97E] to-[#E8D5B5] flex items-center justify-center text-white text-sm font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[#1A1A1A] font-semibold text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-[#1A1A1A]/40 text-xs">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation dots */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    index === current
                      ? "w-8 h-2 bg-[#C8A97E]"
                      : "w-2 h-2 bg-[#C8A97E]/20 hover:bg-[#C8A97E]/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
