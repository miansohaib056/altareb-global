"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Package, MapPin, Truck } from "lucide-react";
import { toast } from "sonner";
import { formatPrice, formatDate } from "@/lib/utils";

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  PROCESSING: "bg-purple-100 text-purple-700",
  SHIPPED: "bg-indigo-100 text-indigo-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
  REFUNDED: "bg-gray-100 text-gray-700",
};

const allStatuses = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "REFUNDED",
];

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string | null;
  product: { id: string; slug: string; images: string[] };
}

interface Address {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string | null;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string | null;
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  trackingNumber: string | null;
  notes: string | null;
  couponCode: string | null;
  createdAt: string;
  user: { id: string; name: string | null; email: string };
  items: OrderItem[];
  address: Address | null;
}

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch order");
        return res.json();
      })
      .then((data: Order) => {
        setOrder(data);
        setStatus(data.status);
        setTrackingNumber(data.trackingNumber || "");
      })
      .catch(() => toast.error("Failed to load order"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, trackingNumber }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to update order");
      }

      const updated = await res.json();
      setOrder((prev) => (prev ? { ...prev, ...updated } : prev));
      toast.success("Order updated successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update order"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center">
        <p className="text-sm text-gray-500">Order not found</p>
        <Link
          href="/admin/orders"
          className="mt-4 text-sm font-medium text-[#C8A97E] hover:text-[#B8956A]"
        >
          Back to orders
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/orders"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 hover:text-[#1A1A1A]"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-[#1A1A1A]">
            Order {order.orderNumber}
          </h1>
          <p className="text-sm text-gray-500">
            Placed on {formatDate(order.createdAt)}
          </p>
        </div>
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
            statusColors[order.status] || "bg-gray-100 text-gray-700"
          }`}
        >
          {order.status}
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Order Details - Left Column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Items */}
          <div className="rounded-xl border border-gray-200 bg-white">
            <div className="flex items-center gap-2 border-b border-gray-100 px-6 py-4">
              <Package className="h-4 w-4 text-gray-400" />
              <h2 className="text-base font-semibold text-[#1A1A1A]">
                Order Items
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    <th className="px-6 py-3">Product</th>
                    <th className="px-6 py-3 text-center">Qty</th>
                    <th className="px-6 py-3 text-right">Price</th>
                    <th className="px-6 py-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-10 w-10 rounded-lg border border-gray-100 object-cover"
                            />
                          )}
                          <span className="text-sm font-medium text-[#1A1A1A]">
                            {item.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 text-right text-sm text-gray-600">
                        {formatPrice(item.price)}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium text-[#1A1A1A]">
                        {formatPrice(item.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Order Totals */}
            <div className="border-t border-gray-100 px-6 py-4">
              <div className="ml-auto max-w-xs space-y-1">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Shipping</span>
                  <span>{formatPrice(order.shipping)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Tax</span>
                  <span>{formatPrice(order.tax)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>
                      Discount{" "}
                      {order.couponCode && (
                        <span className="text-xs text-gray-400">
                          ({order.couponCode})
                        </span>
                      )}
                    </span>
                    <span>-{formatPrice(order.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-gray-100 pt-2 text-sm font-semibold text-[#1A1A1A]">
                  <span>Total</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          {order.address && (
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="mb-4 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <h2 className="text-base font-semibold text-[#1A1A1A]">
                  Shipping Address
                </h2>
              </div>
              <div className="text-sm text-gray-600">
                <p className="font-medium text-[#1A1A1A]">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p>{order.address.address1}</p>
                {order.address.address2 && <p>{order.address.address2}</p>}
                <p>
                  {order.address.city}, {order.address.state}{" "}
                  {order.address.zip}
                </p>
                <p>{order.address.country}</p>
                {order.address.phone && (
                  <p className="mt-1 text-gray-400">{order.address.phone}</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Customer & Actions */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-base font-semibold text-[#1A1A1A]">
              Customer
            </h2>
            <div className="text-sm">
              <p className="font-medium text-[#1A1A1A]">
                {order.user.name || "Guest"}
              </p>
              <p className="text-gray-500">{order.user.email}</p>
            </div>
            <div className="mt-4 space-y-2 border-t border-gray-100 pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Payment</span>
                <span className="font-medium text-[#1A1A1A]">
                  {order.paymentMethod}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payment Status</span>
                <span className="font-medium text-[#1A1A1A]">
                  {order.paymentStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Status Update */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="mb-4 flex items-center gap-2">
              <Truck className="h-4 w-4 text-gray-400" />
              <h2 className="text-base font-semibold text-[#1A1A1A]">
                Update Order
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-[#1A1A1A] transition-colors focus:border-[#C8A97E] focus:outline-none focus:ring-1 focus:ring-[#C8A97E]"
                >
                  {allStatuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Tracking Number
                </label>
                <input
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-[#1A1A1A] placeholder-gray-400 transition-colors focus:border-[#C8A97E] focus:outline-none focus:ring-1 focus:ring-[#C8A97E]"
                  placeholder="Enter tracking number"
                />
              </div>
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#C8A97E] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#B8956A] disabled:opacity-50"
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                Save Changes
              </button>
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h2 className="mb-2 text-base font-semibold text-[#1A1A1A]">
                Notes
              </h2>
              <p className="text-sm text-gray-600">{order.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
