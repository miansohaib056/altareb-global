"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
  Star,
  Check,
} from "lucide-react";
import { toast } from "sonner";

const addressSchema = z.object({
  label: z.string().min(1, "Label is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address1: z.string().min(1, "Address is required"),
  address2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "ZIP code is required"),
  country: z.string().min(1, "Country is required"),
  phone: z.string().optional(),
  isDefault: z.boolean().optional(),
});

type AddressValues = z.infer<typeof addressSchema>;

interface Address extends AddressValues {
  id: string;
}

export default function AddressesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const form = useForm<AddressValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      label: "Home",
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      country: "US",
      phone: "",
      isDefault: false,
    },
  });

  const fetchAddresses = useCallback(async () => {
    if (!session?.user?.id) return;
    try {
      const res = await fetch(`/api/users/${session.user.id}/addresses`);
      if (res.ok) {
        const data = await res.json();
        setAddresses(data);
      }
    } catch {
      toast.error("Failed to load addresses.");
    } finally {
      setIsLoading(false);
    }
  }, [session?.user?.id]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
    if (session?.user?.id) {
      fetchAddresses();
    }
  }, [session, status, router, fetchAddresses]);

  function openAddDialog() {
    setEditingId(null);
    form.reset({
      label: "Home",
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      country: "US",
      phone: "",
      isDefault: addresses.length === 0,
    });
    setDialogOpen(true);
  }

  function openEditDialog(address: Address) {
    setEditingId(address.id);
    form.reset({
      label: address.label,
      firstName: address.firstName,
      lastName: address.lastName,
      address1: address.address1,
      address2: address.address2 || "",
      city: address.city,
      state: address.state,
      zip: address.zip,
      country: address.country,
      phone: address.phone || "",
      isDefault: address.isDefault,
    });
    setDialogOpen(true);
  }

  async function onSubmit(data: AddressValues) {
    if (!session?.user?.id) return;
    setIsSaving(true);
    try {
      const url = editingId
        ? `/api/users/${session.user.id}/addresses/${editingId}`
        : `/api/users/${session.user.id}/addresses`;

      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json();
        toast.error(body.error || "Failed to save address.");
        return;
      }

      toast.success(
        editingId ? "Address updated." : "Address added."
      );
      setDialogOpen(false);
      fetchAddresses();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!session?.user?.id) return;
    setDeletingId(id);
    try {
      const res = await fetch(
        `/api/users/${session.user.id}/addresses/${id}`,
        { method: "DELETE" }
      );

      if (!res.ok) {
        toast.error("Failed to delete address.");
        return;
      }

      toast.success("Address deleted.");
      fetchAddresses();
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setDeletingId(null);
    }
  }

  async function handleSetDefault(id: string) {
    if (!session?.user?.id) return;
    try {
      const res = await fetch(
        `/api/users/${session.user.id}/addresses/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isDefault: true }),
        }
      );

      if (res.ok) {
        toast.success("Default address updated.");
        fetchAddresses();
      }
    } catch {
      toast.error("Failed to update default address.");
    }
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="size-6 animate-spin text-gold" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-brand-dark">
            My Addresses
          </h1>
          <p className="mt-1 text-sm text-brand-dark/50">
            Manage your shipping addresses
          </p>
        </div>
        <button
          onClick={openAddDialog}
          className="flex items-center gap-2 rounded-xl bg-brand-dark px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-brand-dark/90"
        >
          <Plus className="size-4" />
          Add Address
        </button>
      </div>

      {/* Address List */}
      {addresses.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="relative rounded-2xl border border-border/40 bg-white p-5 shadow-sm transition-all hover:shadow-md"
            >
              {/* Default badge */}
              {address.isDefault && (
                <div className="absolute -right-1 -top-1 flex items-center gap-1 rounded-full bg-gold px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm">
                  <Star className="size-2.5" />
                  Default
                </div>
              )}

              {/* Label */}
              <div className="mb-3 flex items-center gap-2">
                <MapPin className="size-4 text-gold" />
                <span className="text-sm font-semibold text-brand-dark">
                  {address.label}
                </span>
              </div>

              {/* Address content */}
              <div className="text-sm leading-relaxed text-brand-dark/60">
                <p className="font-medium text-brand-dark">
                  {address.firstName} {address.lastName}
                </p>
                <p>{address.address1}</p>
                {address.address2 && <p>{address.address2}</p>}
                <p>
                  {address.city}, {address.state} {address.zip}
                </p>
                <p>{address.country}</p>
                {address.phone && (
                  <p className="mt-1 text-brand-dark/40">{address.phone}</p>
                )}
              </div>

              {/* Actions */}
              <div className="mt-4 flex items-center gap-2 border-t border-border/20 pt-3">
                <button
                  onClick={() => openEditDialog(address)}
                  className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-brand-dark/50 transition-colors hover:bg-brand-cream hover:text-brand-dark"
                >
                  <Pencil className="size-3" />
                  Edit
                </button>
                {!address.isDefault && (
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-brand-dark/50 transition-colors hover:bg-gold/10 hover:text-gold"
                  >
                    <Check className="size-3" />
                    Set Default
                  </button>
                )}
                <button
                  onClick={() => handleDelete(address.id)}
                  disabled={deletingId === address.id}
                  className="ml-auto flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-brand-dark/30 transition-colors hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                >
                  {deletingId === address.id ? (
                    <Loader2 className="size-3 animate-spin" />
                  ) : (
                    <Trash2 className="size-3" />
                  )}
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-border/40 bg-white px-6 py-16 text-center shadow-sm">
          <MapPin className="mx-auto size-12 text-brand-dark/10" />
          <h3 className="mt-4 text-base font-semibold text-brand-dark/60">
            No saved addresses
          </h3>
          <p className="mt-1.5 text-sm text-brand-dark/30">
            Add a shipping address for faster checkout
          </p>
          <button
            onClick={openAddDialog}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-dark px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark/90"
          >
            <Plus className="size-4" />
            Add Address
          </button>
        </div>
      )}

      {/* Dialog Modal */}
      <AnimatePresence>
        {dialogOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => setDialogOpen(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-4 top-[5%] z-50 mx-auto max-h-[90vh] max-w-lg overflow-y-auto rounded-2xl border border-border/40 bg-white shadow-2xl sm:inset-x-0"
            >
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border/30 bg-white px-6 py-4">
                <h2 className="text-base font-semibold text-brand-dark">
                  {editingId ? "Edit Address" : "Add New Address"}
                </h2>
                <button
                  onClick={() => setDialogOpen(false)}
                  className="p-1 text-brand-dark/30 transition-colors hover:text-brand-dark"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Form */}
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="p-6"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Label */}
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-brand-dark/70">
                      Label
                    </label>
                    <div className="flex gap-2">
                      {["Home", "Work", "Other"].map((label) => (
                        <button
                          key={label}
                          type="button"
                          onClick={() => form.setValue("label", label)}
                          className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                            form.watch("label") === label
                              ? "border-gold bg-gold/10 text-gold"
                              : "border-border/40 text-brand-dark/40 hover:border-gold/40"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* First Name */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-brand-dark/70">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="h-10 w-full rounded-xl border border-border/60 bg-brand-cream/30 px-3.5 text-sm text-brand-dark outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/20"
                      {...form.register("firstName")}
                    />
                    {form.formState.errors.firstName && (
                      <p className="mt-1 text-xs text-red-500">
                        {form.formState.errors.firstName.message}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-brand-dark/70">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="h-10 w-full rounded-xl border border-border/60 bg-brand-cream/30 px-3.5 text-sm text-brand-dark outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/20"
                      {...form.register("lastName")}
                    />
                    {form.formState.errors.lastName && (
                      <p className="mt-1 text-xs text-red-500">
                        {form.formState.errors.lastName.message}
                      </p>
                    )}
                  </div>

                  {/* Address Line 1 */}
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-brand-dark/70">
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      placeholder="Street address"
                      className="h-10 w-full rounded-xl border border-border/60 bg-brand-cream/30 px-3.5 text-sm text-brand-dark outline-none transition-all placeholder:text-brand-dark/30 focus:border-gold focus:ring-2 focus:ring-gold/20"
                      {...form.register("address1")}
                    />
                    {form.formState.errors.address1 && (
                      <p className="mt-1 text-xs text-red-500">
                        {form.formState.errors.address1.message}
                      </p>
                    )}
                  </div>

                  {/* Address Line 2 */}
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-brand-dark/70">
                      Address Line 2{" "}
                      <span className="text-brand-dark/30">(optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Apartment, suite, unit, etc."
                      className="h-10 w-full rounded-xl border border-border/60 bg-brand-cream/30 px-3.5 text-sm text-brand-dark outline-none transition-all placeholder:text-brand-dark/30 focus:border-gold focus:ring-2 focus:ring-gold/20"
                      {...form.register("address2")}
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-brand-dark/70">
                      City
                    </label>
                    <input
                      type="text"
                      className="h-10 w-full rounded-xl border border-border/60 bg-brand-cream/30 px-3.5 text-sm text-brand-dark outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/20"
                      {...form.register("city")}
                    />
                    {form.formState.errors.city && (
                      <p className="mt-1 text-xs text-red-500">
                        {form.formState.errors.city.message}
                      </p>
                    )}
                  </div>

                  {/* State */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-brand-dark/70">
                      State / Province
                    </label>
                    <input
                      type="text"
                      className="h-10 w-full rounded-xl border border-border/60 bg-brand-cream/30 px-3.5 text-sm text-brand-dark outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/20"
                      {...form.register("state")}
                    />
                    {form.formState.errors.state && (
                      <p className="mt-1 text-xs text-red-500">
                        {form.formState.errors.state.message}
                      </p>
                    )}
                  </div>

                  {/* ZIP */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-brand-dark/70">
                      ZIP / Postal Code
                    </label>
                    <input
                      type="text"
                      className="h-10 w-full rounded-xl border border-border/60 bg-brand-cream/30 px-3.5 text-sm text-brand-dark outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/20"
                      {...form.register("zip")}
                    />
                    {form.formState.errors.zip && (
                      <p className="mt-1 text-xs text-red-500">
                        {form.formState.errors.zip.message}
                      </p>
                    )}
                  </div>

                  {/* Country */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-brand-dark/70">
                      Country
                    </label>
                    <input
                      type="text"
                      className="h-10 w-full rounded-xl border border-border/60 bg-brand-cream/30 px-3.5 text-sm text-brand-dark outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/20"
                      {...form.register("country")}
                    />
                    {form.formState.errors.country && (
                      <p className="mt-1 text-xs text-red-500">
                        {form.formState.errors.country.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-brand-dark/70">
                      Phone{" "}
                      <span className="text-brand-dark/30">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      className="h-10 w-full rounded-xl border border-border/60 bg-brand-cream/30 px-3.5 text-sm text-brand-dark outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/20"
                      {...form.register("phone")}
                    />
                  </div>

                  {/* Default checkbox */}
                  <div className="sm:col-span-2">
                    <label className="flex cursor-pointer items-center gap-2.5">
                      <input
                        type="checkbox"
                        className="size-4 rounded border-border/60 text-gold accent-gold focus:ring-gold/20"
                        {...form.register("isDefault")}
                      />
                      <span className="text-sm text-brand-dark/60">
                        Set as default shipping address
                      </span>
                    </label>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setDialogOpen(false)}
                    className="rounded-xl border border-border/60 px-4 py-2.5 text-sm font-medium text-brand-dark/60 transition-colors hover:bg-brand-cream/50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex items-center gap-2 rounded-xl bg-brand-dark px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-brand-dark/90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSaving ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : editingId ? (
                      "Update Address"
                    ) : (
                      "Add Address"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
