"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Minus,
  Plus,
  X,
  ShoppingBag,
  ArrowRight,
  Package,
  Tag,
  Loader2,
} from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);
  const subtotal = useCartStore((s) => s.subtotal());

  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isValidating, setIsValidating] = useState(false);

  const shippingEstimate = subtotal > 100 ? 0 : 9.99;
  const total = subtotal - discount + shippingEstimate;

  const handleCouponValidate = async () => {
    if (!couponCode.trim()) return;

    setIsValidating(true);
    setCouponError("");
    setCouponSuccess("");

    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode, subtotal }),
      });

      const data = await res.json();

      if (!res.ok) {
        setCouponError(data.error || "Invalid coupon code");
        setDiscount(0);
      } else {
        setCouponSuccess(
          `Coupon applied! You save ${formatPrice(data.discount)}`
        );
        setDiscount(data.discount);
      }
    } catch {
      setCouponError("Failed to validate coupon. Please try again.");
      setDiscount(0);
    } finally {
      setIsValidating(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF7F2]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center text-center"
          >
            <div className="size-24 rounded-full bg-gray-100 flex items-center justify-center mb-8">
              <ShoppingBag className="size-12 text-gray-300" />
            </div>
            <h1 className="text-3xl font-light text-[#1A1A1A] mb-3">
              Your Cart is Empty
            </h1>
            <p className="text-gray-500 mb-8 max-w-md">
              Looks like you haven&apos;t added anything to your cart yet.
              Explore our collection to find something you love.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-lg bg-[#1A1A1A] px-8 py-3 text-sm font-medium text-white hover:bg-[#2a2a2a] transition-colors"
            >
              Continue Shopping
              <ArrowRight className="size-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <div className="bg-[#1A1A1A] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-light text-center"
          >
            Shopping <span className="text-[#C8A97E]">Cart</span>
          </motion.h1>
          <p className="text-center text-gray-400 mt-2">
            {items.length} {items.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            {/* Table Header (desktop) */}
            <div className="hidden sm:grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-400">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.3 }}
                  className="group"
                >
                  {/* Desktop Row */}
                  <div className="hidden sm:grid grid-cols-12 gap-4 items-center py-6 border-b border-gray-100">
                    {/* Product */}
                    <div className="col-span-6 flex items-center gap-4">
                      <div className="relative size-20 rounded-lg overflow-hidden bg-white border border-gray-100 shrink-0">
                        {item.product.image ? (
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-[#C8A97E]/20 to-[#FAF7F2] flex items-center justify-center">
                            <Package className="size-8 text-[#C8A97E]/40" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="text-sm font-medium text-[#1A1A1A] hover:text-[#C8A97E] transition-colors line-clamp-2"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="mt-1 text-xs text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1"
                        >
                          <X className="size-3" />
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-2 text-center text-sm text-gray-600">
                      {formatPrice(item.product.price)}
                    </div>

                    {/* Quantity */}
                    <div className="col-span-2 flex justify-center">
                      <div className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1
                            )
                          }
                          className="px-2.5 py-1.5 text-gray-500 hover:text-[#1A1A1A] hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-[#1A1A1A]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              Math.min(item.quantity + 1, item.product.stock)
                            )
                          }
                          className="px-2.5 py-1.5 text-gray-500 hover:text-[#1A1A1A] hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Line Total */}
                    <div className="col-span-2 text-right text-sm font-medium text-[#1A1A1A]">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                  </div>

                  {/* Mobile Card */}
                  <div className="sm:hidden py-4 border-b border-gray-100">
                    <div className="flex gap-4">
                      <div className="relative size-24 rounded-lg overflow-hidden bg-white border border-gray-100 shrink-0">
                        {item.product.image ? (
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-[#C8A97E]/20 to-[#FAF7F2] flex items-center justify-center">
                            <Package className="size-8 text-[#C8A97E]/40" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <Link
                            href={`/product/${item.product.slug}`}
                            className="text-sm font-medium text-[#1A1A1A] hover:text-[#C8A97E] transition-colors line-clamp-2 pr-2"
                          >
                            {item.product.name}
                          </Link>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
                          >
                            <X className="size-4" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {formatPrice(item.product.price)}
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                              className="px-2.5 py-1.5 text-gray-500 hover:text-[#1A1A1A] hover:bg-gray-50 transition-colors"
                            >
                              <Minus className="size-3" />
                            </button>
                            <span className="w-7 text-center text-sm font-medium text-[#1A1A1A]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  Math.min(
                                    item.quantity + 1,
                                    item.product.stock
                                  )
                                )
                              }
                              className="px-2.5 py-1.5 text-gray-500 hover:text-[#1A1A1A] hover:bg-gray-50 transition-colors"
                            >
                              <Plus className="size-3" />
                            </button>
                          </div>
                          <span className="text-sm font-medium text-[#1A1A1A]">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Clear Cart */}
            <div className="flex justify-between items-center mt-6">
              <Link
                href="/shop"
                className="text-sm text-[#C8A97E] hover:text-[#B8956A] transition-colors font-medium flex items-center gap-1.5"
              >
                <ArrowRight className="size-4 rotate-180" />
                Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="text-sm text-gray-400 hover:text-red-500 transition-colors font-medium"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Cart Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4 mt-8 lg:mt-0"
          >
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-8">
              <h2 className="text-lg font-medium text-[#1A1A1A] mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-[#1A1A1A] font-medium">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-[#1A1A1A] font-medium">
                    {shippingEstimate === 0
                      ? "Free"
                      : formatPrice(shippingEstimate)}
                  </span>
                </div>

                {shippingEstimate > 0 && (
                  <p className="text-xs text-gray-400">
                    Free shipping on orders over $100
                  </p>
                )}
              </div>

              <div className="h-px bg-gray-100 my-4" />

              {/* Coupon Code */}
              <div className="mb-4">
                <label className="text-sm text-gray-500 mb-2 block">
                  Coupon Code
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value.toUpperCase());
                        setCouponError("");
                        setCouponSuccess("");
                      }}
                      placeholder="Enter code"
                      className="w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 py-2.5 text-sm placeholder:text-gray-400 focus:border-[#C8A97E] focus:outline-none focus:ring-1 focus:ring-[#C8A97E] transition-colors"
                    />
                  </div>
                  <button
                    onClick={handleCouponValidate}
                    disabled={isValidating || !couponCode.trim()}
                    className="rounded-lg bg-[#1A1A1A] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#2a2a2a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isValidating ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      "Apply"
                    )}
                  </button>
                </div>
                {couponError && (
                  <p className="text-xs text-red-500 mt-1.5">{couponError}</p>
                )}
                {couponSuccess && (
                  <p className="text-xs text-emerald-600 mt-1.5">
                    {couponSuccess}
                  </p>
                )}
              </div>

              <div className="h-px bg-gray-100 my-4" />

              <div className="flex justify-between mb-6">
                <span className="text-base font-medium text-[#1A1A1A]">
                  Total
                </span>
                <span className="text-xl font-medium text-[#1A1A1A]">
                  {formatPrice(total)}
                </span>
              </div>

              <Link
                href="/checkout"
                className="flex items-center justify-center gap-2 w-full rounded-lg bg-[#C8A97E] py-3.5 text-sm font-medium text-white hover:bg-[#B8956A] transition-colors"
              >
                Proceed to Checkout
                <ArrowRight className="size-4" />
              </Link>

              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-400">
                <span>Secure Checkout</span>
                <span>&bull;</span>
                <span>Free Returns</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
