"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, ArrowRight, Loader2 } from "lucide-react";
import { useWishlistStore } from "@/store/wishlist";
import { useCartStore, type CartProduct } from "@/store/cart";
import ProductCard from "@/components/products/ProductCard";

interface WishlistProduct {
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

export default function WishlistPage() {
  const wishlistItems = useWishlistStore((s) => s.items);
  const removeFromWishlist = useWishlistStore((s) => s.removeItem);
  const addToCart = useCartStore((s) => s.addItem);

  const [products, setProducts] = useState<WishlistProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      if (wishlistItems.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `/api/products?ids=${wishlistItems.join(",")}`
        );
        if (res.ok) {
          const data = await res.json();
          setProducts(data.products || []);
        }
      } catch {
        // Silently fail -- empty state will show
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [wishlistItems]);

  const handleMoveToCart = (product: WishlistProduct) => {
    const cartProduct: CartProduct = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0] || "",
      stock: product.stock,
    };
    addToCart(cartProduct);
    removeFromWishlist(product.id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="size-8 text-[#C8A97E] animate-spin" />
          <p className="text-sm text-gray-500">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF7F2]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center text-center"
          >
            <div className="size-24 rounded-full bg-gray-100 flex items-center justify-center mb-8">
              <Heart className="size-12 text-gray-300" />
            </div>
            <h1 className="text-3xl font-light text-[#1A1A1A] mb-3">
              Your Wishlist is Empty
            </h1>
            <p className="text-gray-500 mb-8 max-w-md">
              Start adding items you love to your wishlist. They&apos;ll be
              saved here for you to revisit anytime.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-lg bg-[#1A1A1A] px-8 py-3 text-sm font-medium text-white hover:bg-[#2a2a2a] transition-colors"
            >
              Explore Collection
              <ArrowRight className="size-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <div className="bg-[#1A1A1A] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-light text-center"
          >
            My <span className="text-[#C8A97E]">Wishlist</span>
          </motion.h1>
          <p className="text-center text-gray-400 mt-2">
            {wishlistItems.length}{" "}
            {wishlistItems.length === 1 ? "item" : "items"} saved
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className="group relative"
              >
                <ProductCard product={product} />
                {/* Move to Cart button overlay */}
                <div className="mt-3">
                  <button
                    onClick={() => handleMoveToCart(product)}
                    disabled={!product.inStock}
                    className="w-full flex items-center justify-center gap-2 rounded-lg border border-[#C8A97E] bg-[#C8A97E]/5 py-2.5 text-sm font-medium text-[#C8A97E] hover:bg-[#C8A97E] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingBag className="size-4" />
                    {product.inStock ? "Move to Cart" : "Out of Stock"}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
