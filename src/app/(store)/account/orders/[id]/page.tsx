export const dynamic = "force-dynamic";

import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/utils";
import {
  ArrowLeft,
  Package,
  CheckCircle2,
  Truck,
  Clock,
  XCircle,
  CreditCard,
  MapPin,
  ShoppingBag,
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

const trackingSteps = [
  { key: "PENDING", label: "Order Placed", icon: Clock },
  { key: "CONFIRMED", label: "Confirmed", icon: CheckCircle2 },
  { key: "PROCESSING", label: "Processing", icon: Package },
  { key: "SHIPPED", label: "Shipped", icon: Truck },
  { key: "DELIVERED", label: "Delivered", icon: CheckCircle2 },
];

function getStepIndex(status: string): number {
  if (status === "CANCELLED" || status === "REFUNDED") return -1;
  const idx = trackingSteps.findIndex((s) => s.key === status);
  return idx >= 0 ? idx : 0;
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: { select: { id: true, slug: true } },
        },
      },
      address: true,
    },
  });

  if (!order || order.userId !== session.user.id) {
    notFound();
  }

  const currentStep = getStepIndex(order.status);
  const isCancelled =
    order.status === "CANCELLED" || order.status === "REFUNDED";

  return (
    <div className="space-y-6">
      {/* Back + Header */}
      <div>
        <Link
          href="/account/orders"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-dark/40 transition-colors hover:text-gold"
        >
          <ArrowLeft className="size-3.5" />
          Back to Orders
        </Link>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-brand-dark sm:text-2xl">
              Order {order.orderNumber}
            </h1>
            <p className="mt-1 text-sm text-brand-dark/40">
              Placed on {formatDate(order.createdAt)}
            </p>
          </div>
          <span
            className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
              statusColors[order.status] || statusColors.PENDING
            }`}
          >
            {order.status}
          </span>
        </div>
      </div>

      {/* Order Timeline */}
      {!isCancelled && (
        <div className="rounded-2xl border border-border/40 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-sm font-semibold text-brand-dark">
            Order Progress
          </h2>
          <div className="flex items-start justify-between">
            {trackingSteps.map((step, i) => {
              const Icon = step.icon;
              const isCompleted = i <= currentStep;
              const isCurrent = i === currentStep;

              return (
                <div
                  key={step.key}
                  className="relative flex flex-1 flex-col items-center"
                >
                  {/* Connecting line */}
                  {i < trackingSteps.length - 1 && (
                    <div
                      className={`absolute left-1/2 top-4 h-0.5 w-full ${
                        i < currentStep ? "bg-gold" : "bg-border/40"
                      }`}
                    />
                  )}

                  {/* Step circle */}
                  <div
                    className={`relative z-10 flex size-8 items-center justify-center rounded-full border-2 transition-all ${
                      isCurrent
                        ? "border-gold bg-gold text-white shadow-lg shadow-gold/30"
                        : isCompleted
                          ? "border-gold bg-gold text-white"
                          : "border-border/40 bg-white text-brand-dark/20"
                    }`}
                  >
                    <Icon className="size-3.5" />
                  </div>

                  {/* Label */}
                  <p
                    className={`mt-2 text-center text-[10px] font-medium sm:text-xs ${
                      isCompleted
                        ? "text-brand-dark"
                        : "text-brand-dark/30"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              );
            })}
          </div>

          {order.trackingNumber && (
            <div className="mt-6 rounded-lg bg-brand-cream/50 px-4 py-3">
              <p className="text-xs text-brand-dark/40">Tracking Number</p>
              <p className="mt-0.5 text-sm font-semibold text-brand-dark">
                {order.trackingNumber}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Cancelled / Refunded notice */}
      {isCancelled && (
        <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-5">
          <XCircle className="size-5 shrink-0 text-red-500" />
          <div>
            <p className="text-sm font-semibold text-red-700">
              Order {order.status === "CANCELLED" ? "Cancelled" : "Refunded"}
            </p>
            <p className="mt-0.5 text-xs text-red-500/70">
              {order.status === "CANCELLED"
                ? "This order has been cancelled."
                : "This order has been refunded to your original payment method."}
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Items */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-border/40 bg-white shadow-sm">
            <div className="border-b border-border/30 px-6 py-4">
              <h2 className="text-sm font-semibold text-brand-dark">
                Items ({order.items.length})
              </h2>
            </div>
            <div className="divide-y divide-border/20">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 px-6 py-4"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="size-16 rounded-xl border border-border/30 object-cover"
                    />
                  ) : (
                    <div className="flex size-16 items-center justify-center rounded-xl border border-border/30 bg-brand-cream">
                      <ShoppingBag className="size-6 text-brand-dark/20" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-brand-dark">
                      {item.name}
                    </p>
                    <p className="mt-0.5 text-xs text-brand-dark/40">
                      Qty: {item.quantity} &times; {formatPrice(item.price)}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-brand-dark">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: Summary + Details */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="rounded-2xl border border-border/40 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold text-brand-dark">
              Order Summary
            </h2>
            <div className="space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-brand-dark/50">Subtotal</span>
                <span className="text-brand-dark">
                  {formatPrice(order.subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-brand-dark/50">Shipping</span>
                <span className="text-brand-dark">
                  {order.shipping === 0
                    ? "Free"
                    : formatPrice(order.shipping)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-brand-dark/50">Tax</span>
                <span className="text-brand-dark">
                  {formatPrice(order.tax)}
                </span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-brand-dark/50">Discount</span>
                  <span className="font-medium text-emerald-600">
                    -{formatPrice(order.discount)}
                  </span>
                </div>
              )}
              {order.couponCode && (
                <div className="flex justify-between text-sm">
                  <span className="text-brand-dark/50">Coupon</span>
                  <span className="rounded bg-gold/10 px-2 py-0.5 text-xs font-medium text-gold">
                    {order.couponCode}
                  </span>
                </div>
              )}
              <div className="border-t border-border/30 pt-2.5">
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-brand-dark">
                    Total
                  </span>
                  <span className="text-lg font-bold text-brand-dark">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="rounded-2xl border border-border/40 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-brand-dark">
              <CreditCard className="size-4 text-brand-dark/40" />
              Payment
            </div>
            <div className="mt-3 space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-brand-dark/50">Method</span>
                <span className="font-medium text-brand-dark">
                  {order.paymentMethod === "COD"
                    ? "Cash on Delivery"
                    : "Stripe"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-brand-dark/50">Status</span>
                <span
                  className={`text-xs font-semibold ${
                    order.paymentStatus === "PAID"
                      ? "text-emerald-600"
                      : order.paymentStatus === "FAILED"
                        ? "text-red-500"
                        : "text-amber-600"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          {order.address && (
            <div className="rounded-2xl border border-border/40 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-brand-dark">
                <MapPin className="size-4 text-brand-dark/40" />
                Shipping Address
              </div>
              <div className="mt-3 text-sm leading-relaxed text-brand-dark/60">
                <p className="font-medium text-brand-dark">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p>{order.address.address1}</p>
                {order.address.address2 && <p>{order.address.address2}</p>}
                <p>
                  {order.address.city}, {order.address.state}{" "}
                  {order.address.zip}
                </p>
                <p>{order.address.country}</p>
                {order.address.phone && <p className="mt-1">{order.address.phone}</p>}
              </div>
            </div>
          )}

          {/* Notes */}
          {order.notes && (
            <div className="rounded-2xl border border-border/40 bg-white p-6 shadow-sm">
              <h2 className="mb-2 text-sm font-semibold text-brand-dark">
                Order Notes
              </h2>
              <p className="text-sm text-brand-dark/50">{order.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
