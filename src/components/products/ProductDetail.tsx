"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ShoppingBag,
  Minus,
  Plus,
  Star,
  Truck,
  Shield,
  RotateCcw,
  ChevronRight,
  Package,
  User,
} from "lucide-react";
import { cn, formatPrice, formatDate } from "@/lib/utils";
import { useCartStore, type CartProduct } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import ProductCard from "@/components/products/ProductCard";

interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  title: string | null;
  comment: string | null;
  createdAt: string;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
}

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
  reviews: Review[];
}

interface RelatedProduct {
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

interface ProductDetailProps {
  product: SerializedProduct;
  relatedProducts: RelatedProduct[];
}

type TabKey = "description" | "reviews" | "shipping";

function StarRating({
  rating,
  size = "sm",
}: {
  rating: number;
  size?: "sm" | "md" | "lg";
}) {
  const sizeMap = { sm: "size-3.5", md: "size-4.5", lg: "size-5" };
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            sizeMap[size],
            star <= Math.round(rating)
              ? "fill-[#C8A97E] text-[#C8A97E]"
              : "fill-gray-200 text-gray-200"
          )}
        />
      ))}
    </div>
  );
}

export default function ProductDetail({
  product,
  relatedProducts,
}: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<TabKey>("description");

  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isWishlisted = useWishlistStore((s) => s.hasItem(product.id));

  const discount =
    product.compareAt && product.compareAt > product.price
      ? Math.round(
          ((product.compareAt - product.price) / product.compareAt) * 100
        )
      : null;

  const handleAddToCart = () => {
    const cartProduct: CartProduct = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0] || "",
      stock: product.stock,
    };
    addItem(cartProduct, quantity);
  };

  const tabs: { key: TabKey; label: string }[] = [
    { key: "description", label: "Description" },
    { key: "reviews", label: `Reviews (${product.reviewCount})` },
    { key: "shipping", label: "Shipping Info" },
  ];

  // Placeholder gradients for images
  const placeholderGradients = [
    "from-[#C8A97E]/20 to-[#FAF7F2]",
    "from-[#1A1A1A]/10 to-[#C8A97E]/10",
    "from-[#FAF7F2] to-[#C8A97E]/20",
    "from-[#C8A97E]/10 to-[#1A1A1A]/5",
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-sm text-gray-500"
          >
            <Link
              href="/"
              className="hover:text-[#C8A97E] transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="size-3.5" />
            <Link
              href="/shop"
              className="hover:text-[#C8A97E] transition-colors"
            >
              Shop
            </Link>
            <ChevronRight className="size-3.5" />
            <Link
              href={`/shop?category=${product.category.slug}`}
              className="hover:text-[#C8A97E] transition-colors"
            >
              {product.category.name}
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="text-[#1A1A1A] font-medium truncate max-w-[200px]">
              {product.name}
            </span>
          </motion.nav>
        </div>
      </div>

      {/* Product Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-gray-100">
              {product.images.length > 0 ? (
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br flex items-center justify-center",
                    placeholderGradients[0]
                  )}
                >
                  <Package className="size-24 text-[#C8A97E]/40" />
                </div>
              )}
              {discount && (
                <div className="absolute top-4 left-4 bg-[#C8A97E] text-white px-3 py-1 rounded-full text-sm font-medium">
                  -{discount}%
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      "relative size-20 rounded-lg overflow-hidden border-2 transition-all shrink-0",
                      i === selectedImage
                        ? "border-[#C8A97E] ring-2 ring-[#C8A97E]/20"
                        : "border-gray-200 hover:border-[#C8A97E]/50"
                    )}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Placeholder thumbnails when no images */}
            {product.images.length === 0 && (
              <div className="mt-4 flex gap-3">
                {placeholderGradients.map((grad, i) => (
                  <div
                    key={i}
                    className={cn(
                      "size-20 rounded-lg bg-gradient-to-br border-2 shrink-0",
                      grad,
                      i === 0
                        ? "border-[#C8A97E] ring-2 ring-[#C8A97E]/20"
                        : "border-gray-200"
                    )}
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col"
          >
            {/* Category */}
            <Link
              href={`/shop?category=${product.category.slug}`}
              className="text-sm font-medium text-[#C8A97E] uppercase tracking-wider hover:text-[#B8956A] transition-colors mb-3"
            >
              {product.category.name}
            </Link>

            {/* Name */}
            <h1 className="text-3xl sm:text-4xl font-light text-[#1A1A1A] leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            {product.reviewCount > 0 && (
              <div className="flex items-center gap-3 mt-4">
                <StarRating rating={product.avgRating} size="md" />
                <span className="text-sm text-gray-500">
                  {product.avgRating.toFixed(1)} ({product.reviewCount}{" "}
                  {product.reviewCount === 1 ? "review" : "reviews"})
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-6">
              <span className="text-3xl font-medium text-[#1A1A1A]">
                {formatPrice(product.price)}
              </span>
              {product.compareAt && product.compareAt > product.price && (
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(product.compareAt)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="mt-4">
              {product.inStock ? (
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  <span className="text-sm text-emerald-600 font-medium">
                    In Stock
                    {product.stock <= 5 && product.stock > 0 && (
                      <span className="text-gray-400 font-normal">
                        {" "}
                        &mdash; Only {product.stock} left
                      </span>
                    )}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-red-400" />
                  <span className="text-sm text-red-500 font-medium">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            {/* Separator */}
            <div className="h-px bg-gray-200 my-6" />

            {/* Short description */}
            {product.description && (
              <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                {product.description}
              </p>
            )}

            {/* Quantity + Add to Cart */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="px-4 py-3 text-gray-500 hover:text-[#1A1A1A] hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Minus className="size-4" />
                </button>
                <span className="w-12 text-center text-sm font-medium text-[#1A1A1A] select-none">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  disabled={quantity >= product.stock}
                  className="px-4 py-3 text-gray-500 hover:text-[#1A1A1A] hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Plus className="size-4" />
                </button>
              </div>

              {/* Add to Cart */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2.5 rounded-lg py-3 px-6 text-sm font-medium transition-all",
                  product.inStock
                    ? "bg-[#1A1A1A] text-white hover:bg-[#2a2a2a]"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                )}
              >
                <ShoppingBag className="size-4.5" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </motion.button>

              {/* Wishlist */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleWishlist(product.id)}
                className={cn(
                  "size-12 shrink-0 rounded-lg border flex items-center justify-center transition-all",
                  isWishlisted
                    ? "border-[#C8A97E] bg-[#C8A97E]/5 text-[#C8A97E]"
                    : "border-gray-200 bg-white text-gray-400 hover:border-[#C8A97E] hover:text-[#C8A97E]"
                )}
              >
                <Heart
                  className={cn(
                    "size-5",
                    isWishlisted && "fill-[#C8A97E]"
                  )}
                />
              </motion.button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-col items-center text-center gap-2">
                <Truck className="size-5 text-[#C8A97E]" />
                <span className="text-xs text-gray-500">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Shield className="size-5 text-[#C8A97E]" />
                <span className="text-xs text-gray-500">Secure Payment</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RotateCcw className="size-5 text-[#C8A97E]" />
                <span className="text-xs text-gray-500">Easy Returns</span>
              </div>
            </div>

            {/* SKU & Tags */}
            {(product.sku || product.tags.length > 0) && (
              <div className="mt-6 space-y-2 text-sm text-gray-500">
                {product.sku && (
                  <p>
                    <span className="text-gray-400">SKU:</span> {product.sku}
                  </p>
                )}
                {product.tags.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-gray-400">Tags:</span>
                    {product.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/shop?search=${encodeURIComponent(tag)}`}
                        className="text-[#C8A97E] hover:text-[#B8956A] transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 lg:mt-24"
        >
          {/* Tab Headers */}
          <div className="border-b border-gray-200">
            <div className="flex gap-0">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    "relative px-6 py-4 text-sm font-medium transition-colors",
                    activeTab === tab.key
                      ? "text-[#1A1A1A]"
                      : "text-gray-400 hover:text-gray-600"
                  )}
                >
                  {tab.label}
                  {activeTab === tab.key && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C8A97E]"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="py-8"
            >
              {activeTab === "description" && (
                <div className="prose prose-gray max-w-none">
                  {product.description ? (
                    <div className="whitespace-pre-wrap text-gray-600 leading-relaxed max-w-3xl">
                      {product.description}
                    </div>
                  ) : (
                    <p className="text-gray-400 italic">
                      No description available for this product.
                    </p>
                  )}
                  {product.weight && (
                    <div className="mt-8 pt-6 border-t border-gray-100">
                      <h3 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wider mb-3">
                        Product Details
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between py-2 border-b border-gray-50">
                          <span className="text-gray-500">Weight</span>
                          <span className="text-[#1A1A1A]">
                            {product.weight}
                          </span>
                        </div>
                        {product.sku && (
                          <div className="flex justify-between py-2 border-b border-gray-50">
                            <span className="text-gray-500">SKU</span>
                            <span className="text-[#1A1A1A]">
                              {product.sku}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between py-2 border-b border-gray-50">
                          <span className="text-gray-500">Category</span>
                          <span className="text-[#1A1A1A]">
                            {product.category.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  {product.reviews.length > 0 ? (
                    <div className="space-y-6">
                      {/* Rating Summary */}
                      <div className="flex items-center gap-6 p-6 bg-white rounded-xl border border-gray-100">
                        <div className="text-center">
                          <div className="text-4xl font-light text-[#1A1A1A]">
                            {product.avgRating.toFixed(1)}
                          </div>
                          <StarRating rating={product.avgRating} size="md" />
                          <div className="text-sm text-gray-400 mt-1">
                            {product.reviewCount}{" "}
                            {product.reviewCount === 1 ? "review" : "reviews"}
                          </div>
                        </div>
                        <div className="h-16 w-px bg-gray-200" />
                        <div className="flex-1 space-y-1.5">
                          {[5, 4, 3, 2, 1].map((star) => {
                            const count = product.reviews.filter(
                              (r) => r.rating === star
                            ).length;
                            const pct =
                              product.reviews.length > 0
                                ? (count / product.reviews.length) * 100
                                : 0;
                            return (
                              <div
                                key={star}
                                className="flex items-center gap-2 text-sm"
                              >
                                <span className="w-3 text-gray-400">
                                  {star}
                                </span>
                                <Star className="size-3 fill-[#C8A97E] text-[#C8A97E]" />
                                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-[#C8A97E] rounded-full transition-all"
                                    style={{ width: `${pct}%` }}
                                  />
                                </div>
                                <span className="w-8 text-right text-gray-400">
                                  {count}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Reviews List */}
                      <div className="space-y-4">
                        {product.reviews.map((review) => (
                          <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-xl border border-gray-100 p-6"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-gradient-to-br from-[#C8A97E]/20 to-[#C8A97E]/5 flex items-center justify-center">
                                  {review.user.image ? (
                                    <Image
                                      src={review.user.image}
                                      alt={review.user.name || "User"}
                                      width={40}
                                      height={40}
                                      className="rounded-full"
                                    />
                                  ) : (
                                    <User className="size-5 text-[#C8A97E]" />
                                  )}
                                </div>
                                <div>
                                  <p className="font-medium text-sm text-[#1A1A1A]">
                                    {review.user.name || "Anonymous"}
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    {formatDate(review.createdAt)}
                                  </p>
                                </div>
                              </div>
                              <StarRating rating={review.rating} />
                            </div>
                            {review.title && (
                              <h4 className="mt-3 font-medium text-sm text-[#1A1A1A]">
                                {review.title}
                              </h4>
                            )}
                            {review.comment && (
                              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                                {review.comment}
                              </p>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Star className="size-12 text-gray-200 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-[#1A1A1A] mb-1">
                        No reviews yet
                      </h3>
                      <p className="text-sm text-gray-400">
                        Be the first to review this product.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "shipping" && (
                <div className="max-w-2xl space-y-6">
                  <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-100">
                    <Truck className="size-6 text-[#C8A97E] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-[#1A1A1A] mb-1">
                        Free Standard Shipping
                      </h4>
                      <p className="text-sm text-gray-500">
                        Complimentary standard shipping on all orders. Estimated
                        delivery within 5-7 business days.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-100">
                    <Package className="size-6 text-[#C8A97E] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-[#1A1A1A] mb-1">
                        Express Delivery
                      </h4>
                      <p className="text-sm text-gray-500">
                        Express delivery available at checkout. Receive your
                        order within 2-3 business days.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-100">
                    <RotateCcw className="size-6 text-[#C8A97E] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-[#1A1A1A] mb-1">
                        30-Day Returns
                      </h4>
                      <p className="text-sm text-gray-500">
                        Not satisfied? Return any unused item within 30 days of
                        delivery for a full refund. Free return shipping
                        included.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 lg:mt-24"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-light text-[#1A1A1A]">
                  You May Also Like
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                  More from {product.category.name}
                </p>
              </div>
              <Link
                href={`/shop?category=${product.category.slug}`}
                className="text-sm font-medium text-[#C8A97E] hover:text-[#B8956A] transition-colors flex items-center gap-1"
              >
                View All
                <ChevronRight className="size-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
