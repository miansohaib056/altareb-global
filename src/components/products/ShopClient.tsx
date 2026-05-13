"use client";

import { useState, useCallback, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  LayoutList,
  PackageOpen,
} from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import ProductCard from "@/components/products/ProductCard";

interface SerializedProduct {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  compareAt: number | null;
  sku: string | null;
  stock: number;
  inStock: boolean;
  featured: boolean;
  images: string[];
  weight: string | null;
  tags: string[];
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  avgRating: number;
  reviewCount: number;
  category: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
    sortOrder: number;
    createdAt: string;
    updatedAt: string;
  };
}

interface SerializedCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  productCount: number;
}

interface Filters {
  category: string;
  search: string;
  sort: string;
  minPrice: string;
  maxPrice: string;
}

interface ShopClientProps {
  products: SerializedProduct[];
  categories: SerializedCategory[];
  totalPages: number;
  currentPage: number;
  totalProducts: number;
  filters: Filters;
}

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name: A to Z" },
];

export default function ShopClient({
  products,
  categories,
  totalPages,
  currentPage,
  totalProducts,
  filters,
}: ShopClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(filters.search);
  const [minPriceInput, setMinPriceInput] = useState(filters.minPrice);
  const [maxPriceInput, setMaxPriceInput] = useState(filters.maxPrice);

  const selectedCategories = filters.category
    ? filters.category.split(",")
    : [];

  const updateFilters = useCallback(
    (updates: Partial<Filters>) => {
      const newFilters = { ...filters, ...updates, page: "1" };
      const params = new URLSearchParams();

      if (newFilters.search) params.set("search", newFilters.search);
      if (newFilters.category) params.set("category", newFilters.category);
      if (newFilters.sort && newFilters.sort !== "newest")
        params.set("sort", newFilters.sort);
      if (newFilters.minPrice) params.set("minPrice", newFilters.minPrice);
      if (newFilters.maxPrice) params.set("maxPrice", newFilters.maxPrice);

      startTransition(() => {
        router.push(`/shop?${params.toString()}`);
      });
    },
    [filters, router]
  );

  const goToPage = useCallback(
    (page: number) => {
      const params = new URLSearchParams();
      if (page > 1) params.set("page", String(page));
      if (filters.search) params.set("search", filters.search);
      if (filters.category) params.set("category", filters.category);
      if (filters.sort && filters.sort !== "newest")
        params.set("sort", filters.sort);
      if (filters.minPrice) params.set("minPrice", filters.minPrice);
      if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);

      startTransition(() => {
        router.push(`/shop?${params.toString()}`);
      });
    },
    [filters, router]
  );

  const toggleCategory = (slug: string) => {
    const current = new Set(selectedCategories);
    if (current.has(slug)) {
      current.delete(slug);
    } else {
      current.add(slug);
    }
    updateFilters({ category: Array.from(current).join(",") });
  };

  const clearAllFilters = () => {
    setSearchInput("");
    setMinPriceInput("");
    setMaxPriceInput("");
    startTransition(() => {
      router.push("/shop");
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ search: searchInput });
  };

  const handlePriceApply = () => {
    updateFilters({ minPrice: minPriceInput, maxPrice: maxPriceInput });
  };

  const hasActiveFilters =
    filters.category || filters.search || filters.minPrice || filters.maxPrice;

  // Generate page numbers
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("ellipsis");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("ellipsis");
      pages.push(totalPages);
    }
    return pages;
  };

  const FilterSidebar = () => (
    <div className="space-y-8">
      {/* Search */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1A1A1A] mb-4">
          Search
        </h3>
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 pr-10 text-sm placeholder:text-gray-400 focus:border-[#C8A97E] focus:outline-none focus:ring-1 focus:ring-[#C8A97E] transition-colors"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#C8A97E] transition-colors"
          >
            <Search className="size-4" />
          </button>
        </form>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1A1A1A] mb-4">
          Categories
        </h3>
        <div className="space-y-2.5">
          {categories.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div
                className={cn(
                  "size-4.5 rounded border-2 flex items-center justify-center transition-all",
                  selectedCategories.includes(cat.slug)
                    ? "border-[#C8A97E] bg-[#C8A97E]"
                    : "border-gray-300 group-hover:border-[#C8A97E]"
                )}
              >
                {selectedCategories.includes(cat.slug) && (
                  <svg
                    className="size-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <span className="text-sm text-gray-700 group-hover:text-[#1A1A1A] transition-colors flex-1">
                {cat.name}
              </span>
              <span className="text-xs text-gray-400">{cat.productCount}</span>
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.slug)}
                onChange={() => toggleCategory(cat.slug)}
                className="sr-only"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1A1A1A] mb-4">
          Price Range
        </h3>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              $
            </span>
            <input
              type="number"
              value={minPriceInput}
              onChange={(e) => setMinPriceInput(e.target.value)}
              placeholder="Min"
              min="0"
              className="w-full rounded-lg border border-gray-200 bg-white pl-7 pr-2 py-2 text-sm placeholder:text-gray-400 focus:border-[#C8A97E] focus:outline-none focus:ring-1 focus:ring-[#C8A97E] transition-colors"
            />
          </div>
          <span className="text-gray-400 text-sm">&ndash;</span>
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              $
            </span>
            <input
              type="number"
              value={maxPriceInput}
              onChange={(e) => setMaxPriceInput(e.target.value)}
              placeholder="Max"
              min="0"
              className="w-full rounded-lg border border-gray-200 bg-white pl-7 pr-2 py-2 text-sm placeholder:text-gray-400 focus:border-[#C8A97E] focus:outline-none focus:ring-1 focus:ring-[#C8A97E] transition-colors"
            />
          </div>
        </div>
        <button
          onClick={handlePriceApply}
          className="mt-3 w-full rounded-lg bg-[#1A1A1A] py-2 text-sm font-medium text-white hover:bg-[#2a2a2a] transition-colors"
        >
          Apply
        </button>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="flex items-center gap-2 text-sm text-[#C8A97E] hover:text-[#B8956A] transition-colors font-medium"
        >
          <X className="size-4" />
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <div className="bg-[#1A1A1A] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight">
              Our <span className="text-[#C8A97E]">Collection</span>
            </h1>
            <p className="mt-4 text-gray-400 max-w-xl mx-auto">
              Discover our curated selection of premium products, crafted with
              distinction and delivered with care.
            </p>
            {totalProducts > 0 && (
              <p className="mt-3 text-sm text-gray-500">
                Showing {products.length} of {totalProducts} products
              </p>
            )}
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Active filters pills */}
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center gap-2 mb-6"
          >
            <span className="text-sm text-gray-500">Active filters:</span>
            {filters.search && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-sm border border-gray-200">
                &ldquo;{filters.search}&rdquo;
                <button
                  onClick={() => {
                    setSearchInput("");
                    updateFilters({ search: "" });
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="size-3.5" />
                </button>
              </span>
            )}
            {selectedCategories.map((slug) => {
              const cat = categories.find((c) => c.slug === slug);
              return (
                <span
                  key={slug}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-sm border border-gray-200"
                >
                  {cat?.name || slug}
                  <button
                    onClick={() => toggleCategory(slug)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="size-3.5" />
                  </button>
                </span>
              );
            })}
            {(filters.minPrice || filters.maxPrice) && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-sm border border-gray-200">
                {filters.minPrice ? formatPrice(Number(filters.minPrice)) : "$0"}
                {" - "}
                {filters.maxPrice
                  ? formatPrice(Number(filters.maxPrice))
                  : "Any"}
                <button
                  onClick={() => {
                    setMinPriceInput("");
                    setMaxPriceInput("");
                    updateFilters({ minPrice: "", maxPrice: "" });
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="size-3.5" />
                </button>
              </span>
            )}
          </motion.div>
        )}

        {/* Sort bar + mobile filter toggle */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-[#1A1A1A] hover:border-[#C8A97E] transition-colors"
          >
            <SlidersHorizontal className="size-4" />
            Filters
            {hasActiveFilters && (
              <span className="size-5 rounded-full bg-[#C8A97E] text-white text-xs flex items-center justify-center">
                {selectedCategories.length +
                  (filters.search ? 1 : 0) +
                  (filters.minPrice || filters.maxPrice ? 1 : 0)}
              </span>
            )}
          </button>

          <div className="hidden lg:block" />

          <div className="flex items-center gap-4">
            <select
              value={filters.sort}
              onChange={(e) => updateFilters({ sort: e.target.value })}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-[#1A1A1A] focus:border-[#C8A97E] focus:outline-none focus:ring-1 focus:ring-[#C8A97E] cursor-pointer transition-colors"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-8 lg:gap-12">
          {/* Desktop Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block w-64 shrink-0"
          >
            <div className="sticky top-8">
              <FilterSidebar />
            </div>
          </motion.aside>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            {isPending && (
              <div className="flex items-center justify-center py-4 mb-4">
                <div className="size-5 border-2 border-[#C8A97E] border-t-transparent rounded-full animate-spin" />
                <span className="ml-2 text-sm text-gray-500">Updating...</span>
              </div>
            )}

            {products.length > 0 ? (
              <LayoutGroup>
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  <AnimatePresence mode="popLayout">
                    {products.map((product, index) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.05,
                        }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </LayoutGroup>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <div className="size-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                  <PackageOpen className="size-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-medium text-[#1A1A1A] mb-2">
                  No products found
                </h3>
                <p className="text-gray-500 mb-6 max-w-sm">
                  We couldn&apos;t find any products matching your criteria. Try
                  adjusting your filters.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="rounded-lg bg-[#C8A97E] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#B8956A] transition-colors"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-12 flex items-center justify-center gap-2"
                aria-label="Pagination"
              >
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    currentPage <= 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-[#1A1A1A] hover:bg-white border border-transparent hover:border-gray-200"
                  )}
                >
                  <ChevronLeft className="size-4" />
                  Prev
                </button>

                <div className="flex items-center gap-1">
                  {getPageNumbers().map((p, i) =>
                    p === "ellipsis" ? (
                      <span
                        key={`ellipsis-${i}`}
                        className="px-2 text-gray-400"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => goToPage(p)}
                        className={cn(
                          "size-10 rounded-lg text-sm font-medium transition-all",
                          p === currentPage
                            ? "bg-[#1A1A1A] text-white"
                            : "text-[#1A1A1A] hover:bg-white border border-transparent hover:border-gray-200"
                        )}
                      >
                        {p}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    currentPage >= totalPages
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-[#1A1A1A] hover:bg-white border border-transparent hover:border-gray-200"
                  )}
                >
                  Next
                  <ChevronRight className="size-4" />
                </button>
              </motion.nav>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-[#FAF7F2] shadow-xl lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-lg font-semibold text-[#1A1A1A]">
                    Filters
                  </h2>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="size-8 rounded-full bg-white flex items-center justify-center border border-gray-200 text-gray-500 hover:text-[#1A1A1A] transition-colors"
                  >
                    <X className="size-4" />
                  </button>
                </div>
                <FilterSidebar />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
