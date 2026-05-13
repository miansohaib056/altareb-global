export const dynamic = "force-dynamic";

import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/utils";
import ProductsFilter from "@/components/admin/ProductsFilter";

async function getProducts() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
  return { products, categories };
}

export default async function ProductsPage() {
  const { products, categories } = await getProducts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Products</h1>
          <p className="text-sm text-gray-500">
            {products.length} product{products.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-lg bg-[#C8A97E] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#B8956A]"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Link>
      </div>

      {/* Products table with client-side filtering */}
      <ProductsFilter
        products={JSON.parse(JSON.stringify(products))}
        categories={JSON.parse(JSON.stringify(categories))}
      />
    </div>
  );
}
