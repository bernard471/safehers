"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText, Check, X } from "lucide-react";
import { RESOURCES, type Resource } from "@/lib/resources";

const CATEGORIES = ["All", ...Array.from(new Set(RESOURCES.map((r) => r.category)))];

function DownloadModal({
  resource,
  onClose,
}: {
  resource: Resource;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrMsg("");
    try {
      const r = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, resourceId: resource.id, country }),
      });
      const data = await r.json();
      if (r.ok) {
        setStatus("success");
        // Open download URL
        window.open(data.downloadUrl, "_blank");
      } else {
        setStatus("error");
        setErrMsg(data.error ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrMsg("Network error. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative bg-cream max-w-md w-full p-10 z-10"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 opacity-40 hover:opacity-100 transition-opacity"
        >
          <X size={20} />
        </button>

        {status !== "success" ? (
          <>
            <p className="eyebrow text-burgundy mb-4">Free Download</p>
            <h2 className="display text-2xl font-light mb-2">{resource.title}</h2>
            <p className="text-sm text-ink/60 mb-8">
              Enter your email to receive this resource. We will also add you to our
              mailing list with occasional safety updates — unsubscribe any time.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="eyebrow text-xs opacity-60 block mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full border border-ink/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-ink/50"
                />
              </div>
              <div>
                <label className="eyebrow text-xs opacity-60 block mb-1">Country</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Ghana"
                  className="w-full border border-ink/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-ink/50"
                />
              </div>
              {errMsg && (
                <p className="text-xs text-burgundy">{errMsg}</p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-ink text-cream py-3 eyebrow hover:bg-burgundy transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Download size={14} />
                {status === "loading" ? "Processing..." : "Download Now"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-moss/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={28} className="text-moss" />
            </div>
            <h2 className="display text-3xl font-light mb-4">Download started</h2>
            <p className="text-sm text-ink/60 mb-6">
              Your download should have opened in a new tab. If not,{" "}
              <button
                onClick={() => setStatus("idle")}
                className="link-underline"
              >
                try again
              </button>
              .
            </p>
            <button
              onClick={onClose}
              className="eyebrow border border-ink/20 px-6 py-2 hover:bg-ink hover:text-cream transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const filtered =
    activeCategory === "All"
      ? RESOURCES
      : RESOURCES.filter((r) => r.category === activeCategory);

  const typeColors: Record<string, string> = {
    PDF: "bg-burgundy/10 text-burgundy",
    Checklist: "bg-moss/10 text-moss",
    Toolkit: "bg-gold/10 text-ink",
    Protocol: "bg-terracotta/10 text-terracotta",
    Guide: "bg-rose/30 text-ink",
  };

  return (
    <>
      <section className="pt-40 pb-24 lg:pt-48">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="eyebrow mb-6 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-ink" />
            Free Resources
          </p>
          <h1 className="display text-[clamp(3rem,8vw,8rem)] font-light max-w-[900px] mb-6">
            Tools you can{" "}
            <span className="display-italic text-burgundy">use today</span>
          </h1>
          <p className="body-prose max-w-2xl text-ink/70">
            Every resource below is free. Enter your email to download. These
            tools are designed to be printed, shared, and put to immediate use.
          </p>
        </div>
      </section>

      <section className="pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-12">
            {CATEGORIES.map((cat) => (
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
            {filtered.map((resource, i) => (
              <motion.article
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="border border-ink/15 p-8 flex flex-col lift"
              >
                <div className="flex items-start justify-between mb-6">
                  <FileText size={28} className="text-burgundy" />
                  <span
                    className={`eyebrow text-xs px-2 py-1 ${typeColors[resource.type] ?? "bg-ink/10"}`}
                  >
                    {resource.type}
                  </span>
                </div>
                <p className="eyebrow text-burgundy text-xs mb-2">
                  {resource.category}
                </p>
                <h3 className="display text-xl font-light mb-4 flex-1">
                  {resource.title}
                </h3>
                <p className="text-sm text-ink/60 mb-6">{resource.description}</p>
                {resource.pages && (
                  <p className="text-xs text-ink/40 mb-4">
                    {resource.pages} pages
                  </p>
                )}
                <button
                  onClick={() => setSelectedResource(resource)}
                  className="w-full border border-ink py-3 eyebrow text-xs hover:bg-ink hover:text-cream transition-colors flex items-center justify-center gap-2 mt-auto"
                >
                  <Download size={14} /> Free Download
                </button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedResource && (
          <DownloadModal
            resource={selectedResource}
            onClose={() => setSelectedResource(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
