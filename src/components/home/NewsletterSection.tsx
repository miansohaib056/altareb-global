"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, Mail } from "lucide-react";
import { toast } from "sonner";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Something went wrong");
      }

      toast.success("Welcome aboard! Check your inbox for a confirmation.");
      setEmail("");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to subscribe. Try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-20 sm:py-28 bg-[#1A1A1A] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(200,169,126,0.08)_0%,_transparent_60%)]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C8A97E]/20 to-transparent" />

      {/* Floating decorative mail icon */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 3, -3, 0],
          transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const },
        }}
        className="absolute top-12 right-[15%] hidden lg:block"
      >
        <Mail className="w-16 h-16 text-[#C8A97E]/5" />
      </motion.div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <span className="text-[#C8A97E] text-sm font-semibold tracking-widest uppercase">
            Stay Connected
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Join Our Community
          </h2>

          <div className="mx-auto w-16 h-1 bg-gradient-to-r from-transparent via-[#C8A97E] to-transparent rounded-full" />

          <p className="max-w-lg mx-auto text-white/50 text-lg leading-relaxed">
            Be the first to know about exclusive offers, new arrivals, and
            seasonal collections. Enjoy 10% off your first order when you
            subscribe.
          </p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
          >
            <div className="relative flex-1 w-full">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-full text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#C8A97E]/50 focus:ring-1 focus:ring-[#C8A97E]/25 transition-all duration-300"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#C8A97E] text-[#1A1A1A] font-semibold rounded-full text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(200,169,126,0.3)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Subscribing
                </>
              ) : (
                <>
                  Subscribe
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </motion.form>

          <p className="text-white/25 text-xs">
            No spam, ever. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
