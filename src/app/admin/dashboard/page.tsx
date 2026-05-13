export const dynamic = "force-dynamic";

import Link from "next/link";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Eye,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/utils";
import DashboardCharts from "@/components/admin/DashboardCharts";

async function getDashboardData() {
  const now = new Date();
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const [
    totalRevenue,
    thisMonthRevenue,
    lastMonthRevenue,
    totalOrders,
    totalCustomers,
    totalProducts,
    recentOrders,
    monthlyRevenue,
  ] = await Promise.all([
    prisma.order.aggregate({
      _sum: { total: true },
      where: { paymentStatus: "PAID" },
    }),
    prisma.order.aggregate({
      _sum: { total: true },
      where: {
        paymentStatus: "PAID",
        createdAt: { gte: thisMonthStart },
      },
    }),
    prisma.order.aggregate({
      _sum: { total: true },
      where: {
        paymentStatus: "PAID",
        createdAt: { gte: lastMonthStart, lt: thisMonthStart },
      },
    }),
    prisma.order.count(),
    prisma.user.count({ where: { role: "USER" } }),
    prisma.product.count(),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, email: true } },
        items: true,
      },
    }),
    prisma.order.groupBy({
      by: ["createdAt"],
      _sum: { total: true },
      where: {
        createdAt: { gte: sixMonthsAgo },
        paymentStatus: "PAID",
      },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  // Aggregate monthly revenue
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const monthlyMap = new Map<string, number>();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    monthlyMap.set(key, 0);
  }

  for (const entry of monthlyRevenue) {
    const d = new Date(entry.createdAt);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    const current = monthlyMap.get(key) || 0;
    monthlyMap.set(key, current + (entry._sum.total || 0));
  }

  const chartData = Array.from(monthlyMap.entries()).map(([key, revenue]) => {
    const [year, month] = key.split("-").map(Number);
    return {
      month: `${monthNames[month]} ${year}`,
      revenue: Math.round(revenue * 100) / 100,
    };
  });

  const currentRev = thisMonthRevenue._sum.total || 0;
  const prevRev = lastMonthRevenue._sum.total || 0;
  const revenueChange =
    prevRev > 0 ? ((currentRev - prevRev) / prevRev) * 100 : 0;

  return {
    totalRevenue: totalRevenue._sum.total || 0,
    revenueChange,
    totalOrders,
    totalCustomers,
    totalProducts,
    recentOrders,
    chartData,
  };
}

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  PROCESSING: "bg-indigo-100 text-indigo-700",
  SHIPPED: "bg-purple-100 text-purple-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
  REFUNDED: "bg-gray-100 text-gray-700",
};

export default async function DashboardPage() {
  const data = await getDashboardData();

  const stats = [
    {
      label: "Total Revenue",
      value: formatPrice(data.totalRevenue),
      change: data.revenueChange,
      icon: DollarSign,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Total Orders",
      value: data.totalOrders.toLocaleString(),
      icon: ShoppingCart,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Total Customers",
      value: data.totalCustomers.toLocaleString(),
      icon: Users,
      color: "bg-violet-50 text-violet-600",
    },
    {
      label: "Total Products",
      value: data.totalProducts.toLocaleString(),
      icon: Package,
      color: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Dashboard</h1>
          <p className="text-sm text-gray-500">
            Welcome back. Here is an overview of your store.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 rounded-lg bg-[#C8A97E] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#B8956A]"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <Eye className="h-4 w-4" />
            View Orders
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-gray-200 bg-white p-6"
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.color}`}
              >
                <stat.icon className="h-5 w-5" />
              </div>
              {stat.change !== undefined && (
                <span
                  className={`inline-flex items-center gap-1 text-xs font-medium ${
                    stat.change >= 0 ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {stat.change >= 0 ? (
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowDownRight className="h-3.5 w-3.5" />
                  )}
                  {Math.abs(stat.change).toFixed(1)}%
                </span>
              )}
            </div>
            <p className="mt-4 text-2xl font-bold text-[#1A1A1A]">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <DashboardCharts data={data.chartData} />

      {/* Recent Orders */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h3 className="text-lg font-semibold text-[#1A1A1A]">Recent Orders</h3>
          <Link
            href="/admin/orders"
            className="text-sm font-medium text-[#C8A97E] hover:text-[#B8956A]"
          >
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                <th className="px-6 py-3">Order</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.recentOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-sm text-gray-400"
                  >
                    No orders yet
                  </td>
                </tr>
              ) : (
                data.recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="text-sm font-medium text-[#1A1A1A] hover:text-[#C8A97E]"
                      >
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-700">
                        {order.user.name || "Guest"}
                      </p>
                      <p className="text-xs text-gray-400">{order.user.email}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          statusColors[order.status] || "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium text-[#1A1A1A]">
                      {formatPrice(order.total)}
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
