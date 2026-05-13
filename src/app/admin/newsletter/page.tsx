export const dynamic = "force-dynamic";

import { Newspaper } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

async function getSubscribers() {
  return prisma.newsletter.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export default async function NewsletterPage() {
  const subscribers = await getSubscribers();
  const activeCount = subscribers.filter((s) => s.active).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A1A]">
          Newsletter Subscribers
        </h1>
        <p className="text-sm text-gray-500">
          Manage your email subscriber list
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <p className="text-2xl font-bold text-[#1A1A1A]">
            {subscribers.length}
          </p>
          <p className="text-sm text-gray-500">Total Subscribers</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <p className="text-2xl font-bold text-emerald-600">{activeCount}</p>
          <p className="text-sm text-gray-500">Active</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <p className="text-2xl font-bold text-gray-400">
            {subscribers.length - activeCount}
          </p>
          <p className="text-sm text-gray-500">Unsubscribed</p>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Subscribed</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {subscribers.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-16 text-center">
                    <Newspaper className="mx-auto h-8 w-8 text-gray-300" />
                    <p className="mt-2 text-sm text-gray-400">
                      No subscribers yet
                    </p>
                  </td>
                </tr>
              ) : (
                subscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 text-sm font-medium text-[#1A1A1A]">
                      {sub.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(sub.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          sub.active
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {sub.active ? "Active" : "Unsubscribed"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
