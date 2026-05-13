"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/wholesale", label: "Wholesale" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const lastScrollY = useRef(0);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const cartTotal = useCartStore((s) => s.totalItems());
  const wishlistCount = useWishlistStore((s) => s.items.length);

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    setIsScrolled(currentY > 10);
    if (currentY > lastScrollY.current && currentY > 100) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    lastScrollY.current = currentY;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Announcement Bar */}
      <AnimatePresence>
        {announcementVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-50 overflow-hidden bg-brand-dark text-white"
          >
            <div className="flex items-center justify-center px-4 py-2 text-xs tracking-widest uppercase sm:text-sm">
              <span className="text-gold-light">&#10022;</span>
              <span className="mx-3">
                Free shipping on orders over $75 &mdash; Premium quality,
                delivered fresh
              </span>
              <span className="text-gold-light">&#10022;</span>
              <button
                onClick={() => setAnnouncementVisible(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/60 transition-colors hover:text-white"
                aria-label="Dismiss announcement"
              >
                <X className="size-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navbar */}
      <motion.header
        initial={false}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          isScrolled
            ? "border-b border-border/50 bg-white/80 shadow-sm backdrop-blur-xl"
            : "bg-white"
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
          {/* Left: Mobile menu + Logo */}
          <div className="flex items-center gap-4">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="p-1 text-brand-dark transition-colors hover:text-gold lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-6" />
            </button>

            {/* Logo */}
            <Link href="/" className="group flex items-baseline gap-1.5">
              <span
                className="text-xl font-bold tracking-[0.2em] text-brand-dark transition-colors group-hover:text-gold sm:text-2xl lg:text-[1.7rem]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                ALTAREB
              </span>
              <span className="text-[0.6rem] font-medium tracking-[0.35em] text-gold uppercase sm:text-[0.65rem]">
                GLOBAL
              </span>
            </Link>
          </div>

          {/* Center: Desktop nav links */}
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium tracking-wide uppercase transition-colors",
                    isActive
                      ? "text-gold"
                      : "text-brand-dark/80 hover:text-gold"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active"
                      className="absolute inset-x-4 -bottom-0.5 h-px bg-gold"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right: Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="relative p-2 text-brand-dark/70 transition-colors hover:text-gold"
              aria-label="Search"
            >
              <Search className="size-5" />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative hidden p-2 text-brand-dark/70 transition-colors hover:text-gold sm:block"
              aria-label="Wishlist"
            >
              <Heart className="size-5" />
              {wishlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-0.5 -top-0.5 flex size-4.5 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-white"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-brand-dark/70 transition-colors hover:text-gold"
              aria-label="Cart"
            >
              <ShoppingBag className="size-5" />
              {cartTotal > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-0.5 -top-0.5 flex size-4.5 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-white"
                >
                  {cartTotal}
                </motion.span>
              )}
            </Link>

            {/* Account */}
            <Link
              href="/account"
              className="hidden p-2 text-brand-dark/70 transition-colors hover:text-gold sm:block"
              aria-label="Account"
            >
              <User className="size-5" />
            </Link>
          </div>
        </nav>

        {/* Expandable search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-border/40"
            >
              <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
                <Search className="size-5 shrink-0 text-brand-dark/40" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for dates, honey, nuts, maamoul..."
                  className="flex-1 bg-transparent text-sm text-brand-dark outline-none placeholder:text-brand-dark/40"
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setSearchOpen(false);
                  }}
                />
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="p-1 text-brand-dark/40 transition-colors hover:text-brand-dark"
                >
                  <X className="size-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 flex w-[85%] max-w-sm flex-col bg-white shadow-2xl lg:hidden"
            >
              {/* Mobile header */}
              <div className="flex items-center justify-between border-b border-border/30 px-6 py-5">
                <Link
                  href="/"
                  className="flex items-baseline gap-1.5"
                  onClick={() => setMobileOpen(false)}
                >
                  <span
                    className="text-xl font-bold tracking-[0.2em] text-brand-dark"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    ALTAREB
                  </span>
                  <span className="text-[0.55rem] font-medium tracking-[0.35em] text-gold uppercase">
                    GLOBAL
                  </span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1 text-brand-dark/60 transition-colors hover:text-brand-dark"
                  aria-label="Close menu"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Mobile nav links */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <div className="space-y-1">
                  {navLinks.map((link, i) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * i + 0.1 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "flex items-center justify-between rounded-lg px-3 py-3.5 text-[15px] font-medium tracking-wide transition-colors",
                            isActive
                              ? "bg-brand-cream text-gold"
                              : "text-brand-dark hover:bg-brand-cream/60 hover:text-gold"
                          )}
                        >
                          {link.label}
                          <ChevronRight className="size-4 text-brand-dark/20" />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Mobile extra links */}
                <div className="mt-8 border-t border-border/30 pt-6">
                  <div className="space-y-1">
                    <Link
                      href="/wishlist"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-brand-dark/70 transition-colors hover:bg-brand-cream/60 hover:text-gold"
                    >
                      <Heart className="size-4.5" />
                      <span>Wishlist</span>
                      {wishlistCount > 0 && (
                        <span className="ml-auto rounded-full bg-gold/10 px-2 py-0.5 text-xs font-medium text-gold">
                          {wishlistCount}
                        </span>
                      )}
                    </Link>
                    <Link
                      href="/account"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-brand-dark/70 transition-colors hover:bg-brand-cream/60 hover:text-gold"
                    >
                      <User className="size-4.5" />
                      <span>Account</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Mobile footer */}
              <div className="border-t border-border/30 px-6 py-5">
                <p className="text-xs tracking-wide text-brand-dark/40">
                  Pure Origins, Premium Taste
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
