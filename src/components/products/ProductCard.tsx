"use client";

import { motion } from "framer-motion";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { formatPrice } from "@/lib/utils";

export interface ProductCardProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAt?: number | null;
  images: string[];
  inStock: boolean;
  category: { name: string };
}

interface ProductCardProps {
  product: ProductCardProduct;
}

/** Map category names to gradient placeholders */
function getCategoryGradient(category: string): string {
  const map: Record<string, string> = {
    Dates: "from-amber-800/60 via-amber-700/40 to-amber-900/70",
    "Hijazi Taste": "from-orange-800/60 via-orange-700/40 to-orange-900/70",
    "Aziz Nuts": "from-yellow-800/60 via-yellow-700/40 to-yellow-900/70",
    "Chiki Chika": "from-rose-800/60 via-rose-700/40 to-rose-900/70",
    Oslo: "from-stone-800/60 via-stone-700/40 to-stone-900/70",
    "Pure Natural": "from-emerald-800/60 via-emerald-700/40 to-emerald-900/70",
  };
  return map[category] ?? "from-[#C8A97E]/40 via-[#C8A97E]/20 to-[#C8A97E]/50";
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const hasWishlist = useWishlistStore((s) => s.hasItem(product.id));

  const discount =
    product.compareAt && product.compareAt > product.price
      ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
      : null;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;

    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0] ?? "",
      stock: 99,
    });
  }

  function handleToggleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative"
    >
      <Link href={`/product/${product.slug}`} className="block">
        {/* Image / placeholder area */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#FAF7F2] mb-4">
          {/* Gradient placeholder */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(product.category.name)} flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-110`}
          >
            <span className="text-white/20 text-6xl font-bold select-none">
              {product.name.charAt(0)}
            </span>
          </div>

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {!product.inStock && (
              <span className="px-2.5 py-1 text-xs font-semibold bg-[#1A1A1A]/80 text-white rounded-full backdrop-blur-sm">
                Out of Stock
              </span>
            )}
            {discount && product.inStock && (
              <span className="px-2.5 py-1 text-xs font-semibold bg-red-500/90 text-white rounded-full backdrop-blur-sm">
                -{discount}%
              </span>
            )}
          </div>

          {/* Quick actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <button
              onClick={handleToggleWishlist}
              aria-label={hasWishlist ? "Remove from wishlist" : "Add to wishlist"}
              className={`w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-200 ${
                hasWishlist
                  ? "bg-red-500 text-white shadow-lg"
                  : "bg-white/90 text-[#1A1A1A] hover:bg-white shadow-sm"
              }`}
            >
              <Heart
                className={`w-4 h-4 ${hasWishlist ? "fill-current" : ""}`}
              />
            </button>
            <Link
              href={`/product/${product.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="w-9 h-9 rounded-full bg-white/90 text-[#1A1A1A] backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-all duration-200"
              aria-label="Quick view"
            >
              <Eye className="w-4 h-4" />
            </Link>
          </div>

          {/* Add to cart button (bottom) */}
          <div className="absolute bottom-0 inset-x-0 p-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full py-2.5 bg-[#1A1A1A]/90 backdrop-blur-sm text-white text-sm font-medium rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:bg-[#1A1A1A] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingBag className="w-4 h-4" />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>

        {/* Product info */}
        <div className="space-y-1.5 px-1">
          <p className="text-xs font-medium text-[#C8A97E] uppercase tracking-wider">
            {product.category.name}
          </p>
          <h3 className="text-[#1A1A1A] font-semibold text-sm leading-snug group-hover:text-[#C8A97E] transition-colors duration-300 line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-[#1A1A1A] font-bold text-base">
              {formatPrice(product.price)}
            </span>
            {product.compareAt && product.compareAt > product.price && (
              <span className="text-[#1A1A1A]/40 text-sm line-through">
                {formatPrice(product.compareAt)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
