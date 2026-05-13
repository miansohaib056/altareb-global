import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { Role } from "@/generated/prisma";

/**
 * Get the current authenticated user from the session (server-side).
 * Returns the session user or `null` if not authenticated.
 */
export async function getCurrentUser() {
  const session = await auth();
  return session?.user ?? null;
}

/**
 * Require authentication. Redirects to the sign-in page if the user
 * is not authenticated. Returns the session user on success.
 */
export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/signin");
  }

  return user;
}

/**
 * Require admin role. Redirects to the home page if the user is not
 * an admin. Also redirects to sign-in if not authenticated at all.
 */
export async function requireAdmin() {
  const user = await requireAuth();

  if (user.role !== Role.ADMIN) {
    redirect("/");
  }

  return user;
}
