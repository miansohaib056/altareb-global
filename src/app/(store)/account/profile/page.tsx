"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, Save, Lock, User } from "lucide-react";
import { toast } from "sonner";
import { getInitials } from "@/lib/utils";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().optional(),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ProfileValues = z.infer<typeof profileSchema>;
type PasswordValues = z.infer<typeof passwordSchema>;

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const profileForm = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "", phone: "" },
  });

  const passwordForm = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
    if (session?.user) {
      profileForm.reset({
        name: session.user.name || "",
        phone: "",
      });

      // Fetch user phone
      fetch(`/api/users/${session.user.id}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.phone) {
            profileForm.setValue("phone", data.phone);
          }
        })
        .catch(() => {});
    }
  }, [session, status, router, profileForm]);

  async function onProfileSubmit(data: ProfileValues) {
    if (!session?.user?.id) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/users/${session.user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, phone: data.phone }),
      });

      if (!res.ok) {
        const body = await res.json();
        toast.error(body.error || "Failed to update profile.");
        return;
      }

      toast.success("Profile updated successfully.");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  async function onPasswordSubmit(data: PasswordValues) {
    if (!session?.user?.id) return;
    setIsChangingPassword(true);
    try {
      const res = await fetch(`/api/users/${session.user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        }),
      });

      if (!res.ok) {
        const body = await res.json();
        toast.error(body.error || "Failed to change password.");
        return;
      }

      toast.success("Password changed successfully.");
      passwordForm.reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsChangingPassword(false);
    }
  }

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="size-6 animate-spin text-gold" />
      </div>
    );
  }

  if (!session?.user) return null;

  const initials = getInitials(session.user.name || session.user.email || "U");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-brand-dark">
          My Profile
        </h1>
        <p className="mt-1 text-sm text-brand-dark/50">
          Manage your personal information
        </p>
      </div>

      {/* Avatar + Info */}
      <div className="flex items-center gap-5 rounded-2xl border border-border/40 bg-white p-6 shadow-sm">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gold to-gold-dark text-xl font-bold text-white shadow-lg shadow-gold/20">
          {initials}
        </div>
        <div>
          <p className="text-lg font-semibold text-brand-dark">
            {session.user.name || "User"}
          </p>
          <p className="text-sm text-brand-dark/40">{session.user.email}</p>
        </div>
      </div>

      {/* Profile Form */}
      <div className="rounded-2xl border border-border/40 bg-white shadow-sm">
        <div className="flex items-center gap-2 border-b border-border/30 px-6 py-4">
          <User className="size-4 text-brand-dark/40" />
          <h2 className="text-sm font-semibold text-brand-dark">
            Personal Information
          </h2>
        </div>
        <form
          onSubmit={profileForm.handleSubmit(onProfileSubmit)}
          className="p-6"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-brand-dark/70"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                className="h-11 w-full rounded-xl border border-border/60 bg-brand-cream/30 px-4 text-sm text-brand-dark outline-none transition-all placeholder:text-brand-dark/30 focus:border-gold focus:ring-2 focus:ring-gold/20"
                {...profileForm.register("name")}
              />
              {profileForm.formState.errors.name && (
                <p className="mt-1.5 text-xs text-red-500">
                  {profileForm.formState.errors.name.message}
                </p>
              )}
            </div>

            {/* Email (readonly) */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-brand-dark/70"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={session.user.email || ""}
                readOnly
                className="h-11 w-full cursor-not-allowed rounded-xl border border-border/40 bg-brand-cream/10 px-4 text-sm text-brand-dark/40 outline-none"
              />
              <p className="mt-1 text-xs text-brand-dark/30">
                Email cannot be changed
              </p>
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="mb-1.5 block text-sm font-medium text-brand-dark/70"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Optional"
                className="h-11 w-full rounded-xl border border-border/60 bg-brand-cream/30 px-4 text-sm text-brand-dark outline-none transition-all placeholder:text-brand-dark/30 focus:border-gold focus:ring-2 focus:ring-gold/20"
                {...profileForm.register("phone")}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 rounded-xl bg-brand-dark px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-brand-dark/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Save className="size-4" />
              )}
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Change Password */}
      <div className="rounded-2xl border border-border/40 bg-white shadow-sm">
        <div className="flex items-center gap-2 border-b border-border/30 px-6 py-4">
          <Lock className="size-4 text-brand-dark/40" />
          <h2 className="text-sm font-semibold text-brand-dark">
            Change Password
          </h2>
        </div>
        <form
          onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
          className="p-6"
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Current Password */}
            <div>
              <label
                htmlFor="currentPassword"
                className="mb-1.5 block text-sm font-medium text-brand-dark/70"
              >
                Current Password
              </label>
              <input
                id="currentPassword"
                type="password"
                autoComplete="current-password"
                className="h-11 w-full rounded-xl border border-border/60 bg-brand-cream/30 px-4 text-sm text-brand-dark outline-none transition-all placeholder:text-brand-dark/30 focus:border-gold focus:ring-2 focus:ring-gold/20"
                {...passwordForm.register("currentPassword")}
              />
              {passwordForm.formState.errors.currentPassword && (
                <p className="mt-1.5 text-xs text-red-500">
                  {passwordForm.formState.errors.currentPassword.message}
                </p>
              )}
            </div>

            {/* New Password */}
            <div>
              <label
                htmlFor="newPassword"
                className="mb-1.5 block text-sm font-medium text-brand-dark/70"
              >
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                autoComplete="new-password"
                placeholder="Min. 8 characters"
                className="h-11 w-full rounded-xl border border-border/60 bg-brand-cream/30 px-4 text-sm text-brand-dark outline-none transition-all placeholder:text-brand-dark/30 focus:border-gold focus:ring-2 focus:ring-gold/20"
                {...passwordForm.register("newPassword")}
              />
              {passwordForm.formState.errors.newPassword && (
                <p className="mt-1.5 text-xs text-red-500">
                  {passwordForm.formState.errors.newPassword.message}
                </p>
              )}
            </div>

            {/* Confirm New Password */}
            <div>
              <label
                htmlFor="confirmNewPassword"
                className="mb-1.5 block text-sm font-medium text-brand-dark/70"
              >
                Confirm New Password
              </label>
              <input
                id="confirmNewPassword"
                type="password"
                autoComplete="new-password"
                className="h-11 w-full rounded-xl border border-border/60 bg-brand-cream/30 px-4 text-sm text-brand-dark outline-none transition-all placeholder:text-brand-dark/30 focus:border-gold focus:ring-2 focus:ring-gold/20"
                {...passwordForm.register("confirmPassword")}
              />
              {passwordForm.formState.errors.confirmPassword && (
                <p className="mt-1.5 text-xs text-red-500">
                  {passwordForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={isChangingPassword}
              className="flex items-center gap-2 rounded-xl bg-brand-dark px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-brand-dark/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isChangingPassword ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Lock className="size-4" />
              )}
              Update Password
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
