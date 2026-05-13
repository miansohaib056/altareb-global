"use client";

import { motion } from "framer-motion";
import { Award, Truck, ShieldCheck, Headphones } from "lucide-react";

const badges = [
  {
    icon: Award,
    title: "Premium Quality",
    description:
      "Every product is handpicked and quality-tested to guarantee authentic taste and freshness.",
  },
  {
    icon: Truck,
    title: "Fast Shipping",
    description:
      "Temperature-controlled shipping ensures your products arrive fresh, fast, and in perfect condition.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description:
      "Shop with confidence using industry-leading encryption and trusted payment gateways.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Our dedicated support team is always available to help with orders, returns, or questions.",
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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function TrustBadges() {
  return (
    <section className="py-16 sm:py-20 bg-white border-t border-[#1A1A1A]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6"
        >
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.title}
                variants={itemVariants}
                className="group text-center px-4"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#FAF7F2] border border-[#C8A97E]/10 mb-4 transition-all duration-300 group-hover:bg-[#C8A97E]/10 group-hover:border-[#C8A97E]/20">
                  <Icon className="w-6 h-6 text-[#C8A97E]" />
                </div>
                <h3 className="text-[#1A1A1A] font-semibold text-base mb-2">
                  {badge.title}
                </h3>
                <p className="text-[#1A1A1A]/50 text-sm leading-relaxed">
                  {badge.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
