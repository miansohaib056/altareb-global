export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import Hero from "@/components/home/Hero";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ProcessSteps from "@/components/home/ProcessSteps";
import Testimonials from "@/components/home/Testimonials";
import TrustBadges from "@/components/home/TrustBadges";
import NewsletterSection from "@/components/home/NewsletterSection";

export default async function HomePage() {
  let featuredProducts: {
    id: string;
    name: string;
    slug: string;
    price: number;
    compareAt: number | null;
    images: string[];
    inStock: boolean;
    category: { name: string };
  }[] = [];

  try {
    const products = await prisma.product.findMany({
      where: { featured: true, inStock: true },
      include: { category: true },
      take: 8,
      orderBy: { createdAt: "desc" },
    });

    featuredProducts = products.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: p.price,
      compareAt: p.compareAt,
      images: p.images,
      inStock: p.inStock,
      category: { name: p.category.name },
    }));
  } catch {
    // Database may not be available yet during build
  }

  return (
    <>
      <Hero />
      <TrustBadges />
      <CategoryShowcase />
      <FeaturedProducts products={featuredProducts} />
      <ProcessSteps />
      <Testimonials />
      <NewsletterSection />
    </>
  );
}
