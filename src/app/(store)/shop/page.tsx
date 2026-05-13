export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma";
import ShopClient from "@/components/products/ShopClient";

export const metadata: Metadata = {
  title: "Shop | Altareb Global",
  description:
    "Browse our curated collection of premium products at Altareb Global.",
};

interface ShopPageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    search?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;

  const page = Math.max(1, parseInt(params.page || "1"));
  const perPage = 12;
  const skip = (page - 1) * perPage;

  // Build the where clause from search params
  const where: Prisma.ProductWhereInput = {};

  if (params.category) {
    const categorySlugs = params.category.split(",");
    where.category = { slug: { in: categorySlugs } };
  }

  if (params.search) {
    where.OR = [
      { name: { contains: params.search, mode: "insensitive" } },
      { description: { contains: params.search, mode: "insensitive" } },
      { tags: { hasSome: [params.search.toLowerCase()] } },
    ];
  }

  if (params.minPrice || params.maxPrice) {
    where.price = {};
    if (params.minPrice) {
      where.price.gte = parseFloat(params.minPrice);
    }
    if (params.maxPrice) {
      where.price.lte = parseFloat(params.maxPrice);
    }
  }

  // Sort
  let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" };
  switch (params.sort) {
    case "price-asc":
      orderBy = { price: "asc" };
      break;
    case "price-desc":
      orderBy = { price: "desc" };
      break;
    case "newest":
      orderBy = { createdAt: "desc" };
      break;
    case "name":
      orderBy = { name: "asc" };
      break;
  }

  const [products, total, categories] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true, reviews: { select: { rating: true } } },
      orderBy,
      skip,
      take: perPage,
    }),
    prisma.product.count({ where }),
    prisma.category.findMany({
      orderBy: { sortOrder: "asc" },
      include: { _count: { select: { products: true } } },
    }),
  ]);

  const totalPages = Math.ceil(total / perPage);

  const serializedProducts = products.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
    avgRating:
      p.reviews.length > 0
        ? p.reviews.reduce((sum, r) => sum + r.rating, 0) / p.reviews.length
        : 0,
    reviewCount: p.reviews.length,
    category: {
      ...p.category,
      createdAt: p.category.createdAt.toISOString(),
      updatedAt: p.category.updatedAt.toISOString(),
    },
  }));

  const serializedCategories = categories.map((c) => ({
    ...c,
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
    productCount: c._count.products,
  }));

  return (
    <ShopClient
      products={serializedProducts}
      categories={serializedCategories}
      totalPages={totalPages}
      currentPage={page}
      totalProducts={total}
      filters={{
        category: params.category || "",
        search: params.search || "",
        sort: params.sort || "newest",
        minPrice: params.minPrice || "",
        maxPrice: params.maxPrice || "",
      }}
    />
  );
}
