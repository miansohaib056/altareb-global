"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const categories = [
  {
    name: "Dates",
    slug: "dates",
    emoji: "🌴",
    description: "Premium Medjool & Ajwa dates",
    count: 24,
    gradient: "from-amber-900/90 to-amber-800/70",
    accent: "bg-amber-400/20",
  },
  {
    name: "Hijazi Taste",
    slug: "hijazi-taste",
    emoji: "🧁",
    description: "Mamoul & traditional date cakes",
    count: 12,
    gradient: "from-orange-900/90 to-orange-800/70",
    accent: "bg-orange-400/20",
  },
  {
    name: "Aziz Nuts",
    slug: "aziz-nuts",
    emoji: "🥜",
    description: "Roasted & flavored nut mixes",
    count: 18,
    gradient: "from-yellow-900/90 to-yellow-800/70",
    accent: "bg-yellow-400/20",
  },
  {
    name: "Chiki Chika",
    slug: "chiki-chika",
    emoji: "🍪",
    description: "Artisanal biscuits & cookies",
    count: 15,
    gradient: "from-rose-900/90 to-rose-800/70",
    accent: "bg-rose-400/20",
  },
  {
    name: "Oslo",
    slug: "oslo",
    emoji: "🍰",
    description: "Premium chocolate cakes",
    count: 10,
    gradient: "from-stone-900/90 to-stone-800/70",
    accent: "bg-stone-400/20",
  },
  {
    name: "Pure Natural",
    slug: "pure-natural",
    emoji: "🍯",
    description: "Raw honey & natural products",
    count: 8,
    gradient: "from-emerald-900/90 to-emerald-800/70",
    accent: "bg-emerald-400/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function CategoryShowcase() {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#C8A97E] text-sm font-semibold tracking-widest uppercase">
            Browse Categories
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
            Our Collections
          </h2>
          <div className="mt-4 mx-auto w-16 h-1 bg-gradient-to-r from-transparent via-[#C8A97E] to-transparent rounded-full" />
          <p className="mt-5 max-w-xl mx-auto text-[#1A1A1A]/60 text-lg">
            Explore our carefully curated range of authentic Middle Eastern
            delicacies
          </p>
        </motion.div>

        {/* Category grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {categories.map((category) => (
            <motion.div key={category.slug} variants={cardVariants}>
              <Link
                href={`/shop?category=${category.slug}`}
                className="group relative block rounded-2xl overflow-hidden"
              >
                <div
                  className={`relative bg-gradient-to-br ${category.gradient} p-8 sm:p-10 min-h-[200px] flex flex-col justify-between transition-all duration-500 group-hover:shadow-xl`}
                >
                  {/* Decorative accent circle */}
                  <div
                    className={`absolute -top-10 -right-10 w-40 h-40 rounded-full ${category.accent} blur-2xl transition-all duration-500 group-hover:scale-125`}
                  />

                  {/* Emoji icon */}
                  <motion.span
                    className="text-5xl mb-6 block relative z-10"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {category.emoji}
                  </motion.span>

                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#E8D5B5] transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-white/60 text-sm mb-3">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/40 text-xs font-medium">
                        {category.count} products
                      </span>
                      <span className="inline-flex items-center gap-1 text-[#C8A97E] text-sm font-medium opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                        Explore
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>

                  {/* Hover border glow */}
                  <div className="absolute inset-0 rounded-2xl border border-[#C8A97E]/0 transition-all duration-500 group-hover:border-[#C8A97E]/30" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
