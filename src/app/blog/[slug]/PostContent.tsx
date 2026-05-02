"use client";

import Link from "next/link";
import { useState } from "react";
import { Clock, ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import type { Post, PostMeta } from "@/lib/blog";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url =
    typeof window !== "undefined"
      ? window.location.href
      : `https://safehers.africa/blog/${slug}`;

  const share = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="eyebrow opacity-50 mr-2">Share</span>
      <a
        href={share.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="eyebrow border border-ink/20 px-4 py-2 hover:bg-ink hover:text-cream transition-colors text-xs"
      >
        WhatsApp
      </a>
      <a
        href={share.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="eyebrow border border-ink/20 px-4 py-2 hover:bg-ink hover:text-cream transition-colors text-xs"
      >
        Twitter / X
      </a>
      <a
        href={share.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="eyebrow border border-ink/20 px-4 py-2 hover:bg-ink hover:text-cream transition-colors text-xs"
      >
        LinkedIn
      </a>
      <button
        onClick={copyLink}
        className="eyebrow border border-ink/20 px-4 py-2 hover:bg-ink hover:text-cream transition-colors text-xs flex items-center gap-1"
      >
        {copied ? <><Check size={12} /> Copied!</> : "Copy Link"}
      </button>
    </div>
  );
}

export default function PostContent({
  post,
  related,
}: {
  post: Post;
  related: PostMeta[];
}) {
  return (
    <>
      {/* Back */}
      <div className="pt-32 pb-0">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Link
            href="/blog"
            className="eyebrow flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity"
          >
            <ArrowLeft size={14} /> Back to Journal
          </Link>
        </div>
      </div>

      {/* Header */}
      <section className="pt-12 pb-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <span className="eyebrow text-burgundy mb-6 inline-block">
              {post.category}
            </span>
            <h1 className="display text-[clamp(2.5rem,6vw,5rem)] font-light mb-8">
              {post.title}
            </h1>
            <p className="body-prose text-ink/70 text-xl mb-10">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-ink/50 pb-8 border-b border-ink/15">
              <div>
                <p className="font-medium text-ink">{post.author}</p>
                {post.authorTitle && (
                  <p className="text-xs">{post.authorTitle}</p>
                )}
              </div>
              <span>✦</span>
              <span>{formatDate(post.date)}</span>
              <span className="flex items-center gap-1">
                <Clock size={14} /> {post.readingTime} min read
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="pb-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div
            className="max-w-3xl prose-safehers body-prose text-ink/85"
            style={{ lineHeight: "1.8" }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>

      {/* Share */}
      <section className="py-12 border-t border-ink/15">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <ShareButtons title={post.title} slug={post.slug} />
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-ink text-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <p className="eyebrow text-rose mb-4">Stay informed</p>
            <h2 className="display text-4xl font-light mb-4">
              Get safety knowledge in your inbox
            </h2>
            <p className="body-prose opacity-70 mb-8">
              Join the SafeHers newsletter for practical guides, new resources,
              and updates on our programmes across Africa.
            </p>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget as HTMLFormElement;
                const email = (form.elements.namedItem("email") as HTMLInputElement).value;
                await fetch("/api/newsletter", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email }),
                });
                form.reset();
              }}
              className="flex gap-0 max-w-md"
            >
              <input
                type="email"
                name="email"
                required
                placeholder="your@email.com"
                className="flex-1 bg-cream/10 border border-cream/20 px-4 py-3 text-sm placeholder:opacity-40 outline-none focus:border-cream/50"
              />
              <button
                type="submit"
                className="eyebrow bg-rose text-ink px-6 py-3 hover:bg-cream transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-24">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <p className="eyebrow mb-10 opacity-50">Related Articles</p>
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="group">
                  <article className="border border-ink/15 p-8 lift">
                    <span className="eyebrow text-burgundy mb-3 block text-xs">
                      {r.category}
                    </span>
                    <h3 className="display text-2xl font-light mb-4 group-hover:text-burgundy transition-colors">
                      {r.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-ink/40">
                      <span>{formatDate(r.date)}</span>
                      <span>✦</span>
                      <span>{r.readingTime} min read</span>
                    </div>
                    <div className="flex items-center gap-1 mt-4 eyebrow text-xs group-hover:text-burgundy transition-colors">
                      Read <ArrowUpRight size={12} />
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
