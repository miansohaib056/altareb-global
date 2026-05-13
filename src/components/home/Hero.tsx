"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const floatingVariants = {
  animate: {
    y: [0, -20, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] via-[#2A2218] to-[#1A1A1A]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(200,169,126,0.15)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(200,169,126,0.1)_0%,_transparent_50%)]" />

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C8A97E' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating decorative elements */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-[15%] right-[10%] w-20 h-20 rounded-full bg-gradient-to-br from-[#C8A97E]/20 to-transparent blur-sm hidden md:block"
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "2s" }}
        className="absolute bottom-[20%] left-[8%] w-32 h-32 rounded-full bg-gradient-to-tr from-[#C8A97E]/10 to-transparent blur-md hidden md:block"
      />
      <motion.div
        animate={{
          y: [0, 15, 0],
          opacity: [0.3, 0.6, 0.3],
          transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const },
        }}
        className="absolute top-[35%] left-[15%] w-2 h-2 rounded-full bg-[#C8A97E]/40 hidden lg:block"
      />
      <motion.div
        animate={{
          y: [0, -12, 0],
          opacity: [0.2, 0.5, 0.2],
          transition: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay: 1,
          },
        }}
        className="absolute bottom-[30%] right-[20%] w-1.5 h-1.5 rounded-full bg-[#C8A97E]/50 hidden lg:block"
      />

      {/* Gold accent lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C8A97E]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C8A97E]/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C8A97E]/30 bg-[#C8A97E]/10 text-[#C8A97E] text-sm font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              Pure Origins, Premium Taste
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]"
          >
            Premium Middle Eastern
            <br />
            <span className="bg-gradient-to-r from-[#C8A97E] via-[#E8D5B5] to-[#C8A97E] bg-clip-text text-transparent">
              Delicacies
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeUp}
            className="max-w-2xl mx-auto text-lg sm:text-xl text-white/60 leading-relaxed font-light"
          >
            Discover the finest selection of handpicked dates, raw honey,
            artisanal nuts, and traditional sweets — sourced directly from
            the heartlands of the Middle East.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              href="/shop"
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-[#C8A97E] text-[#1A1A1A] font-semibold rounded-full text-base overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(200,169,126,0.4)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10">Shop Collection</span>
              <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#E8D5B5] to-[#C8A97E] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-medium rounded-full text-base transition-all duration-300 hover:border-[#C8A97E]/50 hover:text-[#C8A97E] hover:bg-[#C8A97E]/5"
            >
              Our Story
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 pt-8 text-sm text-white/40"
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
              Free Shipping Over $75
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
              100% Authentic Products
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
              Satisfaction Guaranteed
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#FAF7F2] to-transparent" />
    </section>
  );
}
