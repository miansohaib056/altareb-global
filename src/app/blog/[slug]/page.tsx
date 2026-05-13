export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import AnimatedSection from "@/components/shared/AnimatedSection";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      select: { title: true, excerpt: true, metaTitle: true, metaDesc: true },
    });

    if (!post) {
      return { title: "Post Not Found | Altareb Global" };
    }

    return {
      title: post.metaTitle || `${post.title} | Altareb Global`,
      description: post.metaDesc || post.excerpt || undefined,
      openGraph: {
        title: post.metaTitle || post.title,
        description: post.metaDesc || post.excerpt || undefined,
      },
    };
  } catch {
    return { title: "Blog | Altareb Global" };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  let post: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    image: string | null;
    category: string | null;
    tags: string[];
    createdAt: Date;
  } | null = null;

  try {
    post = await prisma.blogPost.findFirst({
      where: { slug, published: true },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        content: true,
        image: true,
        category: true,
        tags: true,
        createdAt: true,
      },
    });
  } catch {
    // Database may not be available during build
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-dark py-24 sm:py-32">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 40% 30%, rgba(200,169,126,0.3) 0%, transparent 50%), radial-gradient(circle at 60% 70%, rgba(200,169,126,0.2) 0%, transparent 50%)",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-gold"
            >
              <ArrowLeft className="size-4" />
              Back to Blog
            </Link>

            {post.category && (
              <span className="mt-6 inline-block rounded-full bg-gold/10 px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-gold uppercase">
                {post.category}
              </span>
            )}

            <h1
              className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {post.title}
            </h1>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-white/40">
              <Calendar className="size-4" />
              <time dateTime={post.createdAt.toISOString()}>
                {formatDate(post.createdAt)}
              </time>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            {/* Featured Image */}
            {post.image && (
              <div className="mb-12 overflow-hidden rounded-2xl">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-auto w-full object-cover"
                />
              </div>
            )}

            {/* Article Body */}
            <article
              className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-brand-dark prose-h2:mt-10 prose-h2:text-2xl prose-h3:mt-8 prose-h3:text-xl prose-p:leading-relaxed prose-p:text-brand-dark/70 prose-a:font-semibold prose-a:text-gold prose-a:no-underline hover:prose-a:text-gold-dark prose-strong:text-brand-dark prose-blockquote:border-l-gold prose-blockquote:text-brand-dark/60"
              style={{ fontFamily: "var(--font-sans)" }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-12 border-t border-border/30 pt-8">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="size-4 text-brand-dark/30" />
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-brand-cream px-3 py-1 text-xs font-medium text-brand-dark/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Back to Blog CTA */}
            <div className="mt-12 border-t border-border/30 pt-8">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-dark"
              >
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
                Back to All Posts
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
