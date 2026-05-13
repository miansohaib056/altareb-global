"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  ArrowRight,
  CreditCard,
} from "lucide-react";

const quickLinks = [
  { href: "/shop", label: "Shop All" },
  { href: "/shop?category=dates", label: "Premium Dates" },
  { href: "/shop?category=honey", label: "Natural Honey" },
  { href: "/shop?category=nuts", label: "Roasted Nuts" },
  { href: "/about", label: "Our Story" },
  { href: "/blog", label: "Blog" },
];

const customerLinks = [
  { href: "/faq", label: "FAQ" },
  { href: "/shipping", label: "Shipping & Returns" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/wholesale", label: "Wholesale Inquiry" },
  { href: "/contact", label: "Contact Us" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-brand-dark text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
            <div className="max-w-md">
              <h3
                className="text-2xl font-semibold tracking-wide text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Join the Altareb Family
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">
                Subscribe for exclusive offers, new arrivals, and curated
                recipes featuring our premium Middle Eastern delicacies.
              </p>
            </div>
            <form
              onSubmit={handleSubscribe}
              className="flex w-full max-w-md items-center gap-0"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="h-12 w-full rounded-l-lg border border-white/10 bg-white/5 pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-gold/50 focus:bg-white/10"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="flex h-12 items-center gap-2 rounded-r-lg bg-gold px-6 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-gold-dark"
              >
                {subscribed ? "Subscribed!" : "Subscribe"}
                {!subscribed && <ArrowRight className="size-4" />}
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-baseline gap-1.5">
              <span
                className="text-xl font-bold tracking-[0.2em] text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                ALTAREB
              </span>
              <span className="text-[0.55rem] font-medium tracking-[0.35em] text-gold uppercase">
                GLOBAL
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              Bringing you the finest Middle Eastern delicacies — handpicked
              dates, pure honey, premium nuts, and artisan sweets. Pure Origins,
              Premium Taste.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-gold/50 hover:bg-gold/10 hover:text-gold"
                aria-label="Facebook"
              >
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-gold/50 hover:bg-gold/10 hover:text-gold"
                aria-label="Instagram"
              >
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">
              Quick Links
            </h4>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">
              Customer Service
            </h4>
            <ul className="mt-5 space-y-3">
              {customerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">
              Contact
            </h4>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold/60" />
                <span className="text-sm leading-relaxed text-white/50">
                  Bronx, New York, NY
                </span>
              </li>
              <li>
                <a
                  href="tel:+18606175480"
                  className="flex items-center gap-3 text-sm text-white/50 transition-colors hover:text-gold"
                >
                  <Phone className="size-4 shrink-0 text-gold/60" />
                  +1 (860) 617-5480
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@altarebglobal.com"
                  className="flex items-center gap-3 text-sm text-white/50 transition-colors hover:text-gold"
                >
                  <Mail className="size-4 shrink-0 text-gold/60" />
                  info@altarebglobal.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="size-4 shrink-0 text-gold/60" />
                <span className="text-sm text-white/50">
                  Mon &ndash; Sat: 9am &ndash; 5pm
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Altareb Global. All rights
            reserved.
          </p>
          <div className="flex items-center gap-2 text-white/20">
            <CreditCard className="size-6" />
            <span className="text-[10px] tracking-wider uppercase text-white/30">
              Visa &middot; Mastercard &middot; Amex &middot; Apple Pay
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
