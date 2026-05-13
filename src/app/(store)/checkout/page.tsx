"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Truck, ChevronRight, ShieldCheck, Lock } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

const shippingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address1: z.string().min(1, "Address is required"),
  address2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "ZIP code is required"),
  phone: z.string().min(1, "Phone is required"),
});

type ShippingForm = z.infer<typeof shippingSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCartStore();
  const [step, setStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<"STRIPE" | "COD">("COD");
  const [loading, setLoading] = useState(false);
  const [shippingData, setShippingData] = useState<ShippingForm | null>(null);

  const shipping = subtotal() > 100 ? 0 : 9.99;
  const tax = subtotal() * 0.08;
  const total = subtotal() + shipping + tax;

  const form = useForm<ShippingForm>({
    resolver: zodResolver(shippingSchema),
  });

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-semibold">Your cart is empty</h1>
        <p className="mt-2 text-gray-500">Add items to your cart before checking out.</p>
        <Link href="/shop" className="mt-6 rounded-full bg-[#1A1A1A] px-8 py-3 text-sm font-medium text-white hover:bg-[#C8A97E] transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const steps = ["Shipping", "Payment", "Review"];

  const onShippingSubmit = (data: ShippingForm) => {
    setShippingData(data);
    setStep(1);
  };

  const handlePlaceOrder = async () => {
    if (!shippingData) return;
    setLoading(true);

    try {
      if (paymentMethod === "STRIPE") {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map((i) => ({
              productId: i.product.id,
              name: i.product.name,
              price: i.product.price,
              quantity: i.quantity,
              image: i.product.image,
            })),
            shipping: shippingData,
          }),
        });
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
          return;
        }
        throw new Error(data.error || "Failed to create checkout session");
      }

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.product.id,
            name: i.product.name,
            price: i.product.price,
            quantity: i.quantity,
            image: i.product.image,
          })),
          paymentMethod: "COD",
          shipping: shippingData,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to place order");
      }

      clearCart();
      toast.success("Order placed successfully!");
      router.push("/account/orders");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-[#1A1A1A]">Checkout</h1>

      {/* Progress Steps */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <button
              onClick={() => i < step && setStep(i)}
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                i <= step ? "bg-[#C8A97E] text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              {i + 1}
            </button>
            <span className={`text-sm ${i <= step ? "font-medium text-[#1A1A1A]" : "text-gray-400"}`}>{s}</span>
            {i < steps.length - 1 && <ChevronRight className="h-4 w-4 text-gray-300" />}
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="shipping" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <h2 className="text-xl font-semibold">Shipping Address</h2>
                <form onSubmit={form.handleSubmit(onShippingSubmit)} className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-gray-700">First Name</label>
                      <input {...form.register("firstName")} className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-[#C8A97E] focus:outline-none focus:ring-1 focus:ring-[#C8A97E]" />
                      {form.formState.errors.firstName && <p className="mt-1 text-xs text-red-500">{form.formState.errors.firstName.message}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Last Name</label>
                      <input {...form.register("lastName")} className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-[#C8A97E] focus:outline-none focus:ring-1 focus:ring-[#C8A97E]" />
                      {form.formState.errors.lastName && <p className="mt-1 text-xs text-red-500">{form.formState.errors.lastName.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Address</label>
                    <input {...form.register("address1")} className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-[#C8A97E] focus:outline-none focus:ring-1 focus:ring-[#C8A97E]" />
                    {form.formState.errors.address1 && <p className="mt-1 text-xs text-red-500">{form.formState.errors.address1.message}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Apartment, suite, etc. (optional)</label>
                    <input {...form.register("address2")} className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-[#C8A97E] focus:outline-none focus:ring-1 focus:ring-[#C8A97E]" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700">City</label>
                      <input {...form.register("city")} className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-[#C8A97E] focus:outline-none focus:ring-1 focus:ring-[#C8A97E]" />
                      {form.formState.errors.city && <p className="mt-1 text-xs text-red-500">{form.formState.errors.city.message}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">State</label>
                      <input {...form.register("state")} className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-[#C8A97E] focus:outline-none focus:ring-1 focus:ring-[#C8A97E]" />
                      {form.formState.errors.state && <p className="mt-1 text-xs text-red-500">{form.formState.errors.state.message}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">ZIP Code</label>
                      <input {...form.register("zip")} className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-[#C8A97E] focus:outline-none focus:ring-1 focus:ring-[#C8A97E]" />
                      {form.formState.errors.zip && <p className="mt-1 text-xs text-red-500">{form.formState.errors.zip.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Phone</label>
                    <input {...form.register("phone")} type="tel" className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-[#C8A97E] focus:outline-none focus:ring-1 focus:ring-[#C8A97E]" />
                    {form.formState.errors.phone && <p className="mt-1 text-xs text-red-500">{form.formState.errors.phone.message}</p>}
                  </div>
                  <button type="submit" className="w-full rounded-full bg-[#1A1A1A] py-4 text-sm font-medium text-white hover:bg-[#C8A97E] transition-colors">
                    Continue to Payment
                  </button>
                </form>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="payment" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <h2 className="text-xl font-semibold">Payment Method</h2>
                <div className="mt-6 space-y-4">
                  <button
                    onClick={() => setPaymentMethod("COD")}
                    className={`flex w-full items-center gap-4 rounded-xl border-2 p-5 transition-colors ${
                      paymentMethod === "COD" ? "border-[#C8A97E] bg-[#FAF7F2]" : "border-gray-200"
                    }`}
                  >
                    <Truck className="h-6 w-6 text-[#C8A97E]" />
                    <div className="text-left">
                      <p className="font-medium">Cash on Delivery</p>
                      <p className="text-sm text-gray-500">Pay when you receive your order</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setPaymentMethod("STRIPE")}
                    className={`flex w-full items-center gap-4 rounded-xl border-2 p-5 transition-colors ${
                      paymentMethod === "STRIPE" ? "border-[#C8A97E] bg-[#FAF7F2]" : "border-gray-200"
                    }`}
                  >
                    <CreditCard className="h-6 w-6 text-[#C8A97E]" />
                    <div className="text-left">
                      <p className="font-medium">Credit / Debit Card</p>
                      <p className="text-sm text-gray-500">Secure payment via Stripe</p>
                    </div>
                  </button>
                </div>
                <div className="mt-8 flex gap-4">
                  <button onClick={() => setStep(0)} className="flex-1 rounded-full border border-gray-300 py-4 text-sm font-medium hover:bg-gray-50 transition-colors">
                    Back
                  </button>
                  <button onClick={() => setStep(2)} className="flex-1 rounded-full bg-[#1A1A1A] py-4 text-sm font-medium text-white hover:bg-[#C8A97E] transition-colors">
                    Review Order
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && shippingData && (
              <motion.div key="review" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <h2 className="text-xl font-semibold">Review Order</h2>
                <div className="mt-6 space-y-6">
                  <div className="rounded-xl border border-gray-200 p-5">
                    <h3 className="font-medium">Shipping Address</h3>
                    <p className="mt-2 text-sm text-gray-600">
                      {shippingData.firstName} {shippingData.lastName}<br />
                      {shippingData.address1}<br />
                      {shippingData.address2 && <>{shippingData.address2}<br /></>}
                      {shippingData.city}, {shippingData.state} {shippingData.zip}<br />
                      {shippingData.phone}
                    </p>
                  </div>
                  <div className="rounded-xl border border-gray-200 p-5">
                    <h3 className="font-medium">Payment</h3>
                    <p className="mt-2 text-sm text-gray-600">
                      {paymentMethod === "COD" ? "Cash on Delivery" : "Credit / Debit Card (Stripe)"}
                    </p>
                  </div>
                  <div className="rounded-xl border border-gray-200 p-5">
                    <h3 className="font-medium">Items ({items.length})</h3>
                    <div className="mt-3 divide-y divide-gray-100">
                      {items.map((item) => (
                        <div key={item.product.id} className="flex items-center gap-4 py-3">
                          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-[#C8A97E]/20 to-[#C8A97E]/5" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{item.product.name}</p>
                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <p className="text-sm font-medium">{formatPrice(item.product.price * item.quantity)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex gap-4">
                  <button onClick={() => setStep(1)} className="flex-1 rounded-full border border-gray-300 py-4 text-sm font-medium hover:bg-gray-50 transition-colors">
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#C8A97E] py-4 text-sm font-medium text-white hover:bg-[#B8956A] transition-colors disabled:opacity-50"
                  >
                    <Lock className="h-4 w-4" />
                    {loading ? "Processing..." : paymentMethod === "STRIPE" ? "Pay with Stripe" : "Place Order"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6">
            <h3 className="text-lg font-semibold">Order Summary</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>{formatPrice(subtotal())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tax</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-base font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs text-gray-400">
              <ShieldCheck className="h-4 w-4" />
              <span>Secure checkout — your data is protected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
