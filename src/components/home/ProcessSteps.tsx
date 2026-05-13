"use client";

import { motion } from "framer-motion";
import { Globe, ShieldCheck, Package, Truck } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Globe,
    title: "Sourcing",
    description:
      "Hand-selected from trusted farms and artisans across the Middle East, ensuring authentic origins and peak quality.",
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "Quality Control",
    description:
      "Every batch undergoes rigorous testing for freshness, purity, and flavor to meet our premium standards.",
  },
  {
    number: "03",
    icon: Package,
    title: "Packaging",
    description:
      "Carefully sealed in premium, food-grade packaging to preserve flavor, freshness, and natural goodness.",
  },
  {
    number: "04",
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Swift, temperature-controlled shipping brings the finest Middle Eastern products straight to your doorstep.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function ProcessSteps() {
  return (
    <section className="py-20 sm:py-28 bg-[#1A1A1A] relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(200,169,126,0.05)_0%,_transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="text-[#C8A97E] text-sm font-semibold tracking-widest uppercase">
            Our Process
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            From Origin to You
          </h2>
          <div className="mt-4 mx-auto w-16 h-1 bg-gradient-to-r from-transparent via-[#C8A97E] to-transparent rounded-full" />
        </motion.div>

        {/* Steps - Horizontal on desktop, Vertical on mobile */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative"
        >
          {/* Horizontal connecting line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#C8A97E]/10 via-[#C8A97E]/30 to-[#C8A97E]/10" />

          {/* Vertical connecting line (mobile/tablet) */}
          <div className="lg:hidden absolute top-0 bottom-0 left-8 sm:left-10 w-px bg-gradient-to-b from-[#C8A97E]/10 via-[#C8A97E]/30 to-[#C8A97E]/10" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  variants={stepVariants}
                  className="relative flex lg:flex-col items-start lg:items-center text-left lg:text-center gap-6 lg:gap-0"
                >
                  {/* Step number + icon */}
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-32 lg:h-32 rounded-full border border-[#C8A97E]/20 bg-[#C8A97E]/5 flex items-center justify-center relative group">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#C8A97E] transition-transform duration-300 group-hover:scale-110" />
                      {/* Number badge */}
                      <span className="absolute -top-1 -right-1 lg:-top-2 lg:-right-2 w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-[#C8A97E] text-[#1A1A1A] text-xs font-bold flex items-center justify-center">
                        {step.number}
                      </span>
                    </div>

                    {/* Connector dot (desktop only) */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 w-1.5 h-1.5 rounded-full bg-[#C8A97E]/40" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="lg:mt-6 flex-1 lg:flex-initial">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed max-w-xs mx-auto">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
