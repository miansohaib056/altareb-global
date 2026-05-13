"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  UserCircle,
  MapPin,
  Heart,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { href: "/account", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/account/orders", label: "Orders", icon: Package, exact: false },
  { href: "/account/profile", label: "Profile", icon: UserCircle, exact: false },
  { href: "/account/addresses", label: "Addresses", icon: MapPin, exact: false },
  { href: "/wishlist", label: "Wishlist", icon: Heart, exact: false },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  function isActive(href: string, exact: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <div className="min-h-screen bg-brand-cream/40">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* Mobile header */}
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <h1 className="text-lg font-semibold tracking-tight text-brand-dark">
            My Account
          </h1>
          <button
            onClick={() => setMobileOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-border/60 bg-white px-3 py-2 text-sm font-medium text-brand-dark/70 transition-colors hover:bg-brand-cream/50"
          >
            <Menu className="size-4" />
            Menu
          </button>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24 rounded-2xl border border-border/40 bg-white p-4 shadow-sm">
              <div className="mb-6 border-b border-border/30 pb-4">
                <h2 className="text-sm font-semibold tracking-wide text-brand-dark/40 uppercase">
                  My Account
                </h2>
              </div>

              <nav className="space-y-1">
                {sidebarLinks.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.href, link.exact);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                        active
                          ? "bg-brand-cream text-gold"
                          : "text-brand-dark/60 hover:bg-brand-cream/60 hover:text-brand-dark"
                      )}
                    >
                      <Icon
                        className={cn(
                          "size-4.5 transition-colors",
                          active
                            ? "text-gold"
                            : "text-brand-dark/30 group-hover:text-brand-dark/50"
                        )}
                      />
                      {link.label}
                      {active && (
                        <ChevronRight className="ml-auto size-3.5 text-gold/50" />
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-6 border-t border-border/30 pt-4">
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-brand-dark/40 transition-all hover:bg-red-50 hover:text-red-500"
                >
                  <LogOut className="size-4.5" />
                  Sign Out
                </button>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 flex w-[80%] max-w-xs flex-col bg-white shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-border/30 px-6 py-5">
                <h2 className="text-sm font-semibold tracking-wide text-brand-dark/40 uppercase">
                  My Account
                </h2>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1 text-brand-dark/40 transition-colors hover:text-brand-dark"
                >
                  <X className="size-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-4 py-4">
                <div className="space-y-1">
                  {sidebarLinks.map((link, i) => {
                    const Icon = link.icon;
                    const active = isActive(link.href, link.exact);
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
                            "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                            active
                              ? "bg-brand-cream text-gold"
                              : "text-brand-dark/60 hover:bg-brand-cream/60 hover:text-brand-dark"
                          )}
                        >
                          <Icon
                            className={cn(
                              "size-5 transition-colors",
                              active ? "text-gold" : "text-brand-dark/30"
                            )}
                          />
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </nav>

              <div className="border-t border-border/30 px-4 py-4">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-brand-dark/40 transition-all hover:bg-red-50 hover:text-red-500"
                >
                  <LogOut className="size-5" />
                  Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
