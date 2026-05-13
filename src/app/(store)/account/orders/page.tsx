export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/utils";
import { Package, ChevronRight, ShoppingBag } from "lucide-react";

const statusColors: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  CONFIRMED: "bg-blue-50 text-blue-700 border-blue-200",
  PROCESSING: "bg-indigo-50 text-indigo-700 border-indigo-200",
  SHIPPED: "bg-purple-50 text-purple-700 border-purple-200",
  DELIVERED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  CANCELLED: "bg-red-50 text-red-700 border-red-200",
  REFUNDED: "bg-gray-50 text-gray-700 border-gray-200",
};

export default async function OrdersPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: {
      items: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-brand-dark">
          My Orders
        </h1>
        <p className="mt-1 text-sm text-brand-dark/50">
          Track and manage all your purchases
        </p>
      </div>

      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => {
            const itemCount = order.items.reduce(
              (sum, item) => sum + item.quantity,
              0
            );

            return (
              <Link
                key={order.id}
                href={`/account/orders/${order.id}`}
                className="group block rounded-2xl border border-border/40 bg-white shadow-sm transition-all hover:border-gold/30 hover:shadow-md"
              >
                {/* Order header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/20 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-brand-cream">
                      <Package className="size-4 text-brand-dark/40" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-brand-dark">
                        {order.orderNumber}
                      </p>
                      <p className="text-xs text-brand-dark/40">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                      statusColors[order.status] || statusColors.PENDING
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Order items preview */}
                <div className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {order.items.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-2 rounded-lg bg-brand-cream/50 px-3 py-1.5"
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="size-6 rounded object-cover"
                          />
                        ) : (
                          <div className="flex size-6 items-center justify-center rounded bg-brand-dark/5">
                            <ShoppingBag className="size-3 text-brand-dark/30" />
                          </div>
                        )}
                        <span className="max-w-32 truncate text-xs font-medium text-brand-dark/70">
                          {item.name}
                        </span>
                        <span className="text-xs text-brand-dark/30">
                          x{item.quantity}
                        </span>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="flex items-center rounded-lg bg-brand-cream/50 px-3 py-1.5 text-xs font-medium text-brand-dark/40">
                        +{order.items.length - 3} more
                      </div>
                    )}
                  </div>
                </div>

                {/* Order footer */}
                <div className="flex items-center justify-between rounded-b-2xl border-t border-border/20 bg-brand-cream/20 px-6 py-3">
                  <p className="text-xs text-brand-dark/40">
                    {itemCount} item{itemCount !== 1 ? "s" : ""}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-brand-dark">
                      {formatPrice(order.total)}
                    </p>
                    <ChevronRight className="size-4 text-brand-dark/20 transition-colors group-hover:text-gold" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-border/40 bg-white px-6 py-16 text-center shadow-sm">
          <Package className="mx-auto size-12 text-brand-dark/10" />
          <h3 className="mt-4 text-base font-semibold text-brand-dark/60">
            No orders yet
          </h3>
          <p className="mt-1.5 text-sm text-brand-dark/30">
            When you place an order, it will appear here
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-dark px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark/90"
          >
            <ShoppingBag className="size-4" />
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
