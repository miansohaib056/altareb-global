export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate, truncate } from "@/lib/utils";
import AnimatedSection from "@/components/shared/AnimatedSection";

export const metadata: Metadata = {
  title: "Our Blog | Altareb Global",
  description:
    "Explore articles about premium Middle Eastern delicacies, healthy eating, traditional recipes, and the stories behind our products.",
  openGraph: {
    title: "Our Blog | Altareb Global",
    description:
      "Articles about Middle Eastern food, dates, healthy snacking, and culinary traditions.",
  },
};

export default async function BlogPage() {
  let posts: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    image: string | null;
    category: string | null;
    createdAt: Date;
  }[] = [];

  try {
    posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        image: true,
        category: true,
        createdAt: true,
      },
    });
  } catch {
    // Database may not be available during build
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-dark py-28 sm:py-36">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 45%, rgba(200,169,126,0.3) 0%, transparent 50%), radial-gradient(circle at 75% 65%, rgba(200,169,126,0.2) 0%, transparent 50%)",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <span className="inline-block text-xs font-semibold tracking-[0.3em] text-gold uppercase">
              Stories &amp; Insights
            </span>
            <h1
              className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Our <span className="text-gold">Blog</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/60">
              Discover the stories behind our products, learn about Middle
              Eastern culinary traditions, and find inspiration for healthy,
              delicious eating.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="bg-brand-cream py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <AnimatedSection className="mx-auto max-w-md text-center">
              <div className="rounded-2xl border border-gold/10 bg-white p-12 shadow-sm">
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-gold/10">
                  <Tag className="size-7 text-gold" />
                </div>
                <h2
                  className="mt-6 text-xl font-bold text-brand-dark"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  No Posts Yet
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-brand-dark/50">
                  We&apos;re working on some great content. Check back soon for
                  articles about Middle Eastern food, recipes, and more.
                </p>
                <Link
                  href="/"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-dark"
                >
                  Back to Home
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </AnimatedSection>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <AnimatedSection key={post.id} delay={i * 0.1}>
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <article className="overflow-hidden rounded-2xl border border-border/50 bg-white shadow-sm transition-all duration-300 hover:border-gold/20 hover:shadow-lg hover:shadow-gold/5">
                      {/* Image Placeholder */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        {post.image ? (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gold/10 via-brand-cream to-gold/5">
                            <div className="text-center">
                              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-gold/10">
                                <Tag className="size-5 text-gold/60" />
                              </div>
                            </div>
                          </div>
                        )}
                        {post.category && (
                          <span className="absolute left-4 top-4 rounded-full bg-brand-dark/80 px-3 py-1 text-[11px] font-semibold tracking-wide text-gold uppercase backdrop-blur-sm">
                            {post.category}
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-xs text-brand-dark/40">
                          <Calendar className="size-3.5" />
                          <time dateTime={post.createdAt.toISOString()}>
                            {formatDate(post.createdAt)}
                          </time>
                        </div>
                        <h2
                          className="mt-3 text-lg font-bold leading-snug text-brand-dark transition-colors group-hover:text-gold"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {post.title}
                        </h2>
                        {post.excerpt && (
                          <p className="mt-2 text-sm leading-relaxed text-brand-dark/55">
                            {truncate(post.excerpt, 140)}
                          </p>
                        )}
                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-colors group-hover:text-gold-dark">
                          Read More
                          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </article>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
