"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import type { PostMeta } from "@/lib/blog";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogIndex({
  featured,
  posts,
  categories,
}: {
  featured: PostMeta | undefined;
  posts: PostMeta[];
  categories: string[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-24 lg:pt-48">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-6 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-ink" />
            The SafeHers Journal
          </p>
          <h1 className="display text-[clamp(3rem,8vw,8rem)] font-light max-w-[900px]">
            Safety knowledge,{" "}
            <span className="display-italic text-burgundy">shared</span>
          </h1>
        </div>
      </section>

      {/* Featured post */}
      {featured && (
        <section className="pb-16">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <p className="eyebrow mb-6 opacity-50">Featured</p>
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="grid lg:grid-cols-2 gap-12 border border-ink/15 p-10 lg:p-16 lift">
                <div>
                  <span className="inline-block eyebrow bg-burgundy text-cream px-3 py-1 mb-6">
                    {featured.category}
                  </span>
                  <h2 className="display text-4xl lg:text-5xl font-light mb-6 group-hover:text-burgundy transition-colors">
                    {featured.title}
                  </h2>
                  <p className="body-prose text-ink/70 mb-8">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-ink/50">
                    <span>{featured.author}</span>
                    <span>✦</span>
                    <span>{formatDate(featured.date)}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {featured.readingTime} min read
                    </span>
                  </div>
                </div>
                <div className="flex items-end justify-end">
                  <span className="flex items-center gap-2 eyebrow group-hover:text-burgundy transition-colors">
                    Read Article <ArrowUpRight size={16} />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Filter + grid */}
      <section className="pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-12">
            {["All", ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`eyebrow px-4 py-2 transition-colors ${
                  activeCategory === cat
                    ? "bg-ink text-cream"
                    : "border border-ink/20 text-ink/60 hover:text-ink hover:border-ink/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <article className="h-full border border-ink/15 p-8 lift flex flex-col">
                    <span className="eyebrow text-burgundy mb-4">
                      {post.category}
                    </span>
                    <h3 className="display text-2xl font-light mb-4 group-hover:text-burgundy transition-colors flex-1">
                      {post.title}
                    </h3>
                    <p className="text-sm text-ink/60 mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-ink/40 pt-4 border-t border-ink/10">
                      <span>{formatDate(post.date)}</span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {post.readingTime} min
                      </span>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="body-prose text-ink/50 text-center py-20">
              No posts in this category yet.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
