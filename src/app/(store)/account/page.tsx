export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/utils";
import {
  Package,
  Clock,
  Heart,
  ShoppingBag,
  ChevronRight,
  MapPin,
  UserCircle,
} from "lucide-react";

const statusColors: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  CONFIRMED: "bg-blue-50 text-blue-700 border-blue-200",
  PROCESSING: "bg-indigo-50 text-indigo-700 border-indigo-200",
  SHIPPED: "bg-purple-50 text-purple-700 border-purple-200",
  DELIVERED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  CANCELLED: "bg-red-50 text-red-700 border-red-200",
  REFUNDED: "bg-gray-50 text-gray-700 border-gray-200",
};

export default async function AccountDashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const userId = session.user.id;

  const [totalOrders, pendingOrders, wishlistCount, recentOrders] =
    await Promise.all([
      prisma.order.count({ where: { userId } }),
      prisma.order.count({
        where: { userId, status: { in: ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED"] } },
      }),
      prisma.wishlistItem.count({ where: { userId } }),
      prisma.order.findMany({
        where: { userId },
        include: {
          items: true,
        },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

  const stats = [
    {
      label: "Total Orders",
      value: totalOrders,
      icon: ShoppingBag,
      color: "text-gold",
      bg: "bg-gold/10",
    },
    {
      label: "Active Orders",
      value: pendingOrders,
      icon: Clock,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Wishlist Items",
      value: wishlistCount,
      icon: Heart,
      color: "text-rose-500",
      bg: "bg-rose-50",
    },
  ];

  const quickLinks = [
    {
      href: "/account/orders",
      label: "View All Orders",
      description: "Track and manage your purchases",
      icon: Package,
    },
    {
      href: "/account/profile",
      label: "Edit Profile",
      description: "Update your personal information",
      icon: UserCircle,
    },
    {
      href: "/account/addresses",
      label: "Manage Addresses",
      description: "Add or edit shipping addresses",
      icon: MapPin,
    },
    {
      href: "/wishlist",
      label: "My Wishlist",
      description: "Products you have saved",
      icon: Heart,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-brand-dark sm:text-3xl">
          Welcome back, {session.user.name?.split(" ")[0] || "there"}
        </h1>
        <p className="mt-1.5 text-sm text-brand-dark/50">
          Here&apos;s an overview of your account activity
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-border/40 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex size-11 items-center justify-center rounded-xl ${stat.bg}`}
                >
                  <Icon className={`size-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-brand-dark">
                    {stat.value}
                  </p>
                  <p className="text-xs font-medium text-brand-dark/40">
                    {stat.label}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="rounded-2xl border border-border/40 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-border/30 px-6 py-4">
          <h2 className="text-base font-semibold text-brand-dark">
            Recent Orders
          </h2>
          <Link
            href="/account/orders"
            className="flex items-center gap-1 text-xs font-medium text-gold transition-colors hover:text-gold-dark"
          >
            View All
            <ChevronRight className="size-3" />
          </Link>
        </div>

        {recentOrders.length > 0 ? (
          <div className="divide-y divide-border/20">
            {recentOrders.map((order) => (
              <Link
                key={order.id}
                href={`/account/orders/${order.id}`}
                className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-brand-cream/30"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-brand-cream">
                  <Package className="size-4.5 text-brand-dark/40" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-brand-dark">
                      {order.orderNumber}
                    </p>
                    <span
                      className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                        statusColors[order.status] || statusColors.PENDING
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-brand-dark/40">
                    {formatDate(order.createdAt)} &middot;{" "}
                    {order.items.length} item
                    {order.items.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <p className="text-sm font-semibold text-brand-dark">
                  {formatPrice(order.total)}
                </p>
                <ChevronRight className="size-4 shrink-0 text-brand-dark/20" />
              </Link>
            ))}
          </div>
        ) : (
          <div className="px-6 py-12 text-center">
            <Package className="mx-auto size-10 text-brand-dark/15" />
            <p className="mt-3 text-sm font-medium text-brand-dark/40">
              No orders yet
            </p>
            <p className="mt-1 text-xs text-brand-dark/30">
              Start shopping to see your orders here
            </p>
            <Link
              href="/shop"
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-brand-dark px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-brand-dark/90"
            >
              Browse Products
            </Link>
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="grid gap-4 sm:grid-cols-2">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center gap-4 rounded-2xl border border-border/40 bg-white p-5 shadow-sm transition-all hover:border-gold/30 hover:shadow-md"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-brand-cream transition-colors group-hover:bg-gold/10">
                <Icon className="size-5 text-brand-dark/40 transition-colors group-hover:text-gold" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-brand-dark">
                  {link.label}
                </p>
                <p className="mt-0.5 text-xs text-brand-dark/40">
                  {link.description}
                </p>
              </div>
              <ChevronRight className="size-4 shrink-0 text-brand-dark/15 transition-colors group-hover:text-gold/50" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
