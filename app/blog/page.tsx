import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getAllPosts, formatDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog | Lifeskills — Breathwork, Meditation & Wellness",
  description:
    "Science-backed articles on breathwork, meditation, and wellness living. Learn practical tools to calm your mind, regulate your nervous system, and live fully.",
  openGraph: {
    title: "Blog | Lifeskills",
    description:
      "Science-backed articles on breathwork, meditation, and wellness living.",
    type: "website",
    url: "https://lifeskills.com/blog",
  },
  alternates: {
    canonical: "https://lifeskills.com/blog",
  },
};

const TOPIC: Record<string, { label: string; bg: string; text: string; gradient: string; image: string }> = {
  "science-of-breathwork": {
    label: "Breathwork",
    bg: "#0BA89A",
    text: "#fff",
    gradient: "linear-gradient(135deg, #2D4A3E 0%, #0BA89A 100%)",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80",
  },
  "meditation-tips-for-beginners": {
    label: "Meditation",
    bg: "#6BAA3E",
    text: "#fff",
    gradient: "linear-gradient(135deg, #3B6B5E 0%, #6BAA3E 100%)",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=900&q=80",
  },
  "what-is-wellness-living": {
    label: "Wellness",
    bg: "#D4940A",
    text: "#fff",
    gradient: "linear-gradient(135deg, #E8603A 0%, #F0A500 100%)",
    image: "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=900&q=80",
  },
  "somatic-healing-and-self-responsibility": {
    label: "Somatic",
    bg: "#E8603A",
    text: "#fff",
    gradient: "linear-gradient(135deg, #C4A882 0%, #E8603A 100%)",
    image: "/somatic_healing.jpeg",
  },
};

function topic(slug: string) {
  return TOPIC[slug] ?? { label: "Wellness", bg: "#2D4A3E", text: "#fff", gradient: "linear-gradient(135deg, #2D4A3E, #0BA89A)" };
}

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <Nav />
      <main className="bg-warm-sand min-h-screen">

        {/* Page header */}
        <div className="max-w-5xl mx-auto px-5 md:px-8 pt-24 md:pt-32 pb-8">
          <h1 className="font-sans font-semibold text-deep-sage text-[1.1rem]">
            The Lifeskills Blog
          </h1>
        </div>

        <div className="max-w-5xl mx-auto px-5 md:px-8 py-12 md:py-16">

          {/* Featured post */}
          {featured && (() => {
            const t = topic(featured.slug);
            return (
              <Link href={`/blog/${featured.slug}`} className="no-underline group block mb-10">
                <article className="bg-white rounded-2xl border border-black/8 overflow-hidden md:grid md:grid-cols-[2fr_3fr] transition-all hover:shadow-[0_8px_40px_rgba(0,0,0,0.1)]">

                  {/* Image panel */}
                  <div className="relative h-52 md:h-auto overflow-hidden">
                    <img
                      src={t.image}
                      alt={featured.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                    <span
                      className="absolute top-6 left-6 inline-block rounded-full px-3 py-1 font-sans text-[0.72rem] font-semibold"
                      style={{ backgroundColor: t.bg, color: t.text }}
                    >
                      {t.label}
                    </span>
                    <p className="absolute bottom-6 left-6 font-sans text-[0.78rem] text-white/70 hidden md:block">
                      {featured.readingTime} min read
                    </p>
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-10 flex flex-col justify-between gap-5">
                    <div>
                      <p className="font-sans text-[0.75rem] text-neutral-400 mb-3 md:hidden">
                        {t.label} · {featured.readingTime} min read
                      </p>
                      <h2 className="font-display font-normal text-deep-sage text-[1.5rem] md:text-[1.9rem] leading-[1.15] mb-3 group-hover:text-deep-sage-hover transition-colors">
                        {featured.title}
                      </h2>
                      <p className="font-sans text-neutral-500 text-[0.9rem] leading-[1.7] line-clamp-3">
                        {featured.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-black/8">
                      <span className="font-sans text-[0.78rem] text-neutral-400">
                        {formatDate(featured.date)} · {featured.author}
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-sans text-[0.82rem] font-semibold text-deep-sage group-hover:gap-2.5 transition-all">
                        Read article
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </div>

                </article>
              </Link>
            );
          })()}

          {/* Grid */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {rest.map((post) => {
                const t = topic(post.slug);
                return (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="no-underline group">
                    <article className="bg-white rounded-2xl border border-black/8 overflow-hidden h-full flex flex-col transition-all hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)]">

                      {/* Cover image */}
                      <div className="relative h-44 overflow-hidden flex-shrink-0">
                        <img
                          src={t.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span
                          className="absolute top-3 left-3 inline-block rounded-full px-2.5 py-0.5 font-sans text-[0.68rem] font-semibold backdrop-blur-sm"
                          style={{ backgroundColor: t.bg, color: t.text }}
                        >
                          {t.label}
                        </span>
                      </div>

                      <div className="p-6 flex flex-col flex-1 gap-3">
                        {/* Reading time */}
                        <div className="flex items-center gap-2">
                          <span className="font-sans text-[0.72rem] text-neutral-400">
                            {post.readingTime} min read
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="font-display font-normal text-deep-sage text-[1.1rem] leading-[1.3] group-hover:text-deep-sage-hover transition-colors">
                          {post.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="font-sans text-neutral-500 text-[0.82rem] leading-[1.65] line-clamp-2 flex-1">
                          {post.description}
                        </p>

                        {/* Date */}
                        <p className="font-sans text-[0.75rem] text-neutral-400 pt-3 border-t border-black/8">
                          {formatDate(post.date)}
                        </p>
                      </div>

                    </article>
                  </Link>
                );
              })}
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
