import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getAllPosts, getPost, formatDate } from "@/lib/posts";

const POST_IMAGES: Record<string, string> = {
  "science-of-breathwork":
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
  "meditation-tips-for-beginners":
    "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1200&q=80",
  "what-is-wellness-living":
    "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=1200&q=80",
  "somatic-healing-and-self-responsibility": "/somatic_healing.jpeg",
};

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Lifeskills Blog`,
    description: post.description,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      url: `https://lifeskills.com/blog/${post.slug}`,
    },
    alternates: {
      canonical: `https://lifeskills.com/blog/${post.slug}`,
    },
  };
}

function JsonLd({ post }: { post: { title: string; description: string; date: string; author: string; slug: string } }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Lifeskills",
      url: "https://lifeskills.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://lifeskills.com/blog/${post.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// MDX prose component overrides — maps markdown elements to styled HTML
const components = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="font-display font-normal text-deep-sage text-[1.5rem] md:text-[1.75rem] leading-[1.2] mt-10 mb-4" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="font-sans font-semibold text-deep-sage text-[1.05rem] mt-7 mb-2" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="font-sans text-neutral-700 text-[1rem] leading-[1.8] mb-5" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-5 flex flex-col gap-2 pl-5" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-5 flex flex-col gap-2 pl-5 list-decimal" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="font-sans text-neutral-700 text-[1rem] leading-[1.75] marker:text-deep-sage" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-neutral-900" {...props} />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic text-neutral-600" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
    <blockquote className="border-l-4 border-deep-sage/30 pl-5 my-6 font-display italic text-neutral-600 text-[1.05rem] leading-[1.7]" {...props} />
  ),
  hr: () => <hr className="border-black/10 my-8" />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-deep-sage underline underline-offset-2 hover:text-deep-sage-hover transition-colors" {...props} />
  ),
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return notFound();

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = allPosts[currentIndex + 1] ?? null;
  const nextPost = allPosts[currentIndex - 1] ?? null;

  return (
    <>
      <JsonLd post={post} />
      <Nav />
      <main className="bg-warm-sand min-h-screen">

        {/* Article header */}
        <div className="max-w-2xl mx-auto px-5 md:px-8 pt-24 md:pt-32 pb-8">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-sans text-[0.82rem] font-medium text-neutral-500 hover:text-deep-sage transition-colors no-underline mb-8"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All articles
          </Link>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-5">
            <span className="font-sans text-[0.78rem] text-neutral-400">
              {formatDate(post.date)}
            </span>
            <span className="text-neutral-300">·</span>
            <span className="font-sans text-[0.78rem] text-neutral-400">
              {post.readingTime} min read
            </span>
            <span className="text-neutral-300">·</span>
            <span className="font-sans text-[0.78rem] text-neutral-400">
              {post.author}
            </span>
          </div>

          <h1 className="font-display font-normal text-deep-sage text-[2rem] md:text-[2.8rem] leading-[1.1] mb-5">
            {post.title}
          </h1>
          <p className="font-sans text-neutral-600 text-[1.05rem] leading-[1.7]">
            {post.description}
          </p>
        </div>

        {/* Cover image */}
        <div className="max-w-3xl mx-auto px-5 md:px-8 mb-10">
          <div className="w-full rounded-2xl h-56 md:h-80 overflow-hidden">
            <img
              src={POST_IMAGES[slug] ?? "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80"}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Article body */}
        <article className="max-w-2xl mx-auto px-5 md:px-8 pb-16">
          <MDXRemote source={post.content} components={components} />
        </article>

        {/* CTA */}
        <div className="max-w-2xl mx-auto px-5 md:px-8 mb-16">
          <div
            className="rounded-2xl p-8 text-center"
            style={{ background: "linear-gradient(135deg, #2D4A3E, #1E3A2E)" }}
          >
            <p className="font-display font-normal text-white text-[1.4rem] md:text-[1.6rem] mb-2">
              Ready to put this into practice?
            </p>
            <p className="font-sans text-white/70 text-[0.9rem] mb-6">
              Book a free intro call with one of our teachers and experience the difference.
            </p>
            <Link
              href="/find-a-teacher"
              className="inline-flex items-center justify-center rounded-full font-sans font-semibold text-[0.88rem] px-7 py-3 bg-white text-deep-sage hover:bg-white/90 transition-all no-underline"
            >
              Find a teacher
            </Link>
          </div>
        </div>

        {/* Prev / Next navigation */}
        {(prevPost || nextPost) && (
          <div className="max-w-2xl mx-auto px-5 md:px-8 pb-24 grid grid-cols-2 gap-4">
            <div>
              {prevPost && (
                <Link href={`/blog/${prevPost.slug}`} className="no-underline group">
                  <div className="bg-white rounded-xl border border-black/8 p-5 hover:shadow-md transition-shadow">
                    <p className="font-sans text-[0.72rem] text-neutral-400 mb-1 flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                        <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Previous
                    </p>
                    <p className="font-sans font-semibold text-[0.85rem] text-deep-sage leading-tight group-hover:text-deep-sage-hover transition-colors line-clamp-2">
                      {prevPost.title}
                    </p>
                  </div>
                </Link>
              )}
            </div>
            <div>
              {nextPost && (
                <Link href={`/blog/${nextPost.slug}`} className="no-underline group">
                  <div className="bg-white rounded-xl border border-black/8 p-5 hover:shadow-md transition-shadow text-right">
                    <p className="font-sans text-[0.72rem] text-neutral-400 mb-1 flex items-center gap-1 justify-end">
                      Next
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </p>
                    <p className="font-sans font-semibold text-[0.85rem] text-deep-sage leading-tight group-hover:text-deep-sage-hover transition-colors line-clamp-2">
                      {nextPost.title}
                    </p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        )}

      </main>
      <Footer />
    </>
  );
}
