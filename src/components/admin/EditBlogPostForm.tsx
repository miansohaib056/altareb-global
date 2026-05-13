"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { slugify } from "@/lib/utils";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  image: string | null;
  published: boolean;
  category: string | null;
  tags: string[];
  metaTitle: string | null;
  metaDesc: string | null;
}

export default function EditBlogPostForm({ post }: { post: BlogPost }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const [title, setTitle] = useState(post.title);
  const [slug, setSlug] = useState(post.slug);
  const [excerpt, setExcerpt] = useState(post.excerpt || "");
  const [content, setContent] = useState(post.content);
  const [category, setCategory] = useState(post.category || "");
  const [tags, setTags] = useState(post.tags.join(", "));
  const [image, setImage] = useState(post.image || "");
  const [metaTitle, setMetaTitle] = useState(post.metaTitle || "");
  const [metaDesc, setMetaDesc] = useState(post.metaDesc || "");
  const [published, setPublished] = useState(post.published);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setSlug(slugify(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    setSubmitting(true);
    try {
      const tagsArray = tags
        ? tags.split(",").map((t) => t.trim()).filter(Boolean)
        : [];

      const res = await fetch(`/api/blog/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          excerpt: excerpt || null,
          content,
          image: image || null,
          published,
          category: category || null,
          tags: tagsArray,
          metaTitle: metaTitle || null,
          metaDesc: metaDesc || null,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to update post");
      }

      toast.success("Blog post updated");
      router.push("/admin/blog");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update post"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/blog"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 hover:text-[#1A1A1A]"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Edit Blog Post</h1>
          <p className="text-sm text-gray-500">Update your article</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-base font-semibold text-[#1A1A1A]">
            Post Details
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Title *
              </label>
              <input
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-[#1A1A1A] placeholder-gray-400 transition-colors focus:border-[#C8A97E] focus:outline-none focus:ring-1 focus:ring-[#C8A97E]"
                placeholder="Post title"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Slug
              </label>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-mono text-gray-600 placeholder-gray-400 transition-colors focus:border-[#C8A97E] focus:outline-none focus:ring-1 focus:ring-[#C8A97E]"
                placeholder="auto-generated-from-title"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Excerpt
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={2}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-[#1A1A1A] placeholder-gray-400 transition-colors focus:border-[#C8A97E] focus:outline-none focus:ring-1 focus:ring-[#C8A97E]"
                placeholder="Brief summary of the post"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Content *
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-[#1A1A1A] placeholder-gray-400 transition-colors focus:border-[#C8A97E] focus:outline-none focus:ring-1 focus:ring-[#C8A97E]"
                placeholder="Write your blog post content..."
              />
            </div>
          </div>
        </div>

        {/* Metadata */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-base font-semibold text-[#1A1A1A]">
            Organization
          </h2>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-[#1A1A1A] placeholder-gray-400 transition-colors focus:border-[#C8A97E] focus:outline-none focus:ring-1 focus:ring-[#C8A97E]"
                  placeholder="e.g., News, Tips"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Tags (comma separated)
                </label>
                <input
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-[#1A1A1A] placeholder-gray-400 transition-colors focus:border-[#C8A97E] focus:outline-none focus:ring-1 focus:ring-[#C8A97E]"
                  placeholder="tag1, tag2, tag3"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Featured Image URL
              </label>
              <input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-[#1A1A1A] placeholder-gray-400 transition-colors focus:border-[#C8A97E] focus:outline-none focus:ring-1 focus:ring-[#C8A97E]"
                placeholder="https://..."
              />
            </div>
          </div>
        </div>

        {/* SEO */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-base font-semibold text-[#1A1A1A]">SEO</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Meta Title
              </label>
              <input
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-[#1A1A1A] placeholder-gray-400 transition-colors focus:border-[#C8A97E] focus:outline-none focus:ring-1 focus:ring-[#C8A97E]"
                placeholder="SEO title (defaults to post title)"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Meta Description
              </label>
              <textarea
                value={metaDesc}
                onChange={(e) => setMetaDesc(e.target.value)}
                rows={2}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-[#1A1A1A] placeholder-gray-400 transition-colors focus:border-[#C8A97E] focus:outline-none focus:ring-1 focus:ring-[#C8A97E]"
                placeholder="SEO description"
              />
            </div>
          </div>
        </div>

        {/* Publish Toggle */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-[#1A1A1A]">
                Publishing
              </h2>
              <p className="text-xs text-gray-400">
                {published
                  ? "This post is live and visible to everyone"
                  : "This post is saved as a draft"}
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={published}
              onClick={() => setPublished(!published)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#C8A97E] focus:ring-offset-2 ${
                published ? "bg-[#C8A97E]" : "bg-gray-200"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  published ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Link
            href="/admin/blog"
            className="rounded-lg border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-lg bg-[#C8A97E] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#B8956A] disabled:opacity-50"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
}
