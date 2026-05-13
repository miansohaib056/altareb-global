"use client";

import { useState, useEffect } from "react";
import { Ticket, Plus, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { formatPrice, formatDate } from "@/lib/utils";

interface Coupon {
  id: string;
  code: string;
  description: string | null;
  discount: number;
  isPercent: boolean;
  minOrder: number;
  maxUses: number | null;
  usedCount: number;
  active: boolean;
  expiresAt: string | null;
  createdAt: string;
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  // Form state
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [isPercent, setIsPercent] = useState(true);
  const [minOrder, setMinOrder] = useState("");
  const [maxUses, setMaxUses] = useState("");
  const [expiresAt, setExpiresAt] = useState("");

  const fetchCoupons = () => {
    fetch("/api/coupons")
      .then((res) => res.json())
      .then((data) => setCoupons(Array.isArray(data) ? data : []))
      .catch(() => toast.error("Failed to load coupons"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const resetForm = () => {
    setCode("");
    setDescription("");
    setDiscount("");
    setIsPercent(true);
    setMinOrder("");
    setMaxUses("");
    setExpiresAt("");
    setShowForm(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !discount) {
      toast.error("Code and discount are required");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          description: description || undefined,
          discount,
          isPercent,
          minOrder: minOrder || undefined,
          maxUses: maxUses || undefined,
          expiresAt: expiresAt || undefined,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create coupon");
      }

      toast.success("Coupon created");
      resetForm();
      fetchCoupons();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create coupon"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const toggleActive = async (coupon: Coupon) => {
    setTogglingId(coupon.id);
    try {
      const res = await fetch(`/api/coupons/${coupon.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !coupon.active }),
      });

      if (!res.ok) throw new Error("Failed to update coupon");

      setCoupons((prev) =>
        prev.map((c) =>
          c.id === coupon.id ? { ...c, active: !c.active } : c
        )
      );
      toast.success(
        coupon.active ? "Coupon deactivated" : "Coupon activated"
      );
    } catch {
      toast.error("Failed to update coupon status");
    } finally {
      setTogglingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Coupons</h1>
          <p className="text-sm text-gray-500">
            {coupons.length} coupon{coupons.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-[#C8A97E] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#B8956A]"
        >
          <Plus className="h-4 w-4" />
          Create Coupon
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-[#1A1A1A]">
              New Coupon
            </h2>
            <button
              onClick={resetForm}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Coupon Code *
                </label>
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-mono uppercase text-[#1A1A1A] placeholder-gray-400 transition-colors focus:border-[#C8A97E] focus:outline-none focus:ring-1 focus:ring-[#C8A97E]"
                  placeholder="e.g., SAVE20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-[#1A1A1A] placeholder-gray-400 transition-colors focus:border-[#C8A97E] focus:outline-none focus:ring-1 focus:ring-[#C8A97E]"
                  placeholder="Optional description"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Discount *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-[#1A1A1A] placeholder-gray-400 transition-colors focus:border-[#C8A97E] focus:outline-none focus:ring-1 focus:ring-[#C8A97E]"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  value={isPercent ? "percent" : "flat"}
                  onChange={(e) => setIsPercent(e.target.value === "percent")}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-[#1A1A1A] transition-colors focus:border-[#C8A97E] focus:outline-none focus:ring-1 focus:ring-[#C8A97E]"
                >
                  <option value="percent">Percentage (%)</option>
                  <option value="flat">Flat Amount ($)</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Min Order ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={minOrder}
                  onChange={(e) => setMinOrder(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-[#1A1A1A] placeholder-gray-400 transition-colors focus:border-[#C8A97E] focus:outline-none focus:ring-1 focus:ring-[#C8A97E]"
                  placeholder="0"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Max Uses
                </label>
                <input
                  type="number"
                  value={maxUses}
                  onChange={(e) => setMaxUses(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-[#1A1A1A] placeholder-gray-400 transition-colors focus:border-[#C8A97E] focus:outline-none focus:ring-1 focus:ring-[#C8A97E]"
                  placeholder="Unlimited"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Expires At
                </label>
                <input
                  type="date"
                  value={expiresAt}
                  onChange={(e) => setExpiresAt(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-[#1A1A1A] transition-colors focus:border-[#C8A97E] focus:outline-none focus:ring-1 focus:ring-[#C8A97E]"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-lg bg-[#C8A97E] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#B8956A] disabled:opacity-50"
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                Create Coupon
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Coupons Table */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                <th className="px-6 py-3">Code</th>
                <th className="px-6 py-3">Discount</th>
                <th className="px-6 py-3">Min Order</th>
                <th className="px-6 py-3">Usage</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Expires</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {coupons.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <Ticket className="mx-auto h-8 w-8 text-gray-300" />
                    <p className="mt-2 text-sm text-gray-400">
                      No coupons yet
                    </p>
                  </td>
                </tr>
              ) : (
                coupons.map((coupon) => {
                  const isExpired =
                    coupon.expiresAt &&
                    new Date(coupon.expiresAt) < new Date();

                  return (
                    <tr key={coupon.id} className="hover:bg-gray-50/50">
                      <td className="px-6 py-4">
                        <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-mono font-semibold text-[#1A1A1A]">
                          {coupon.code}
                        </span>
                        {coupon.description && (
                          <p className="mt-0.5 text-xs text-gray-400">
                            {coupon.description}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-[#1A1A1A]">
                        {coupon.isPercent
                          ? `${coupon.discount}%`
                          : formatPrice(coupon.discount)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {coupon.minOrder > 0
                          ? formatPrice(coupon.minOrder)
                          : "-"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {coupon.usedCount}
                        {coupon.maxUses !== null
                          ? ` / ${coupon.maxUses}`
                          : ""}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            isExpired
                              ? "bg-red-100 text-red-700"
                              : coupon.active
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {isExpired
                            ? "Expired"
                            : coupon.active
                            ? "Active"
                            : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {coupon.expiresAt
                          ? formatDate(coupon.expiresAt)
                          : "Never"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => toggleActive(coupon)}
                          disabled={togglingId === coupon.id}
                          className="text-sm font-medium text-[#C8A97E] hover:text-[#B8956A] disabled:opacity-50"
                        >
                          {togglingId === coupon.id ? (
                            <Loader2 className="inline h-4 w-4 animate-spin" />
                          ) : coupon.active ? (
                            "Deactivate"
                          ) : (
                            "Activate"
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
