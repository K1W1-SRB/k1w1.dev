import Link from "next/link";
import PageIntro from "@/components/layout/PageIntro";
import Container from "@/components/layout/Container";
import CtaBand from "@/sections/CtaBand";
import JsonLd, { breadcrumbs } from "@/components/JsonLd";
import { getPublishedPosts } from "@/lib/content-store";
import { pageMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/format";

export const metadata = pageMetadata({
  title: "Blog – Notes on Building Web Apps",
  description:
    "Practical notes on building web apps, websites and mobile apps for small businesses: what to build, what to skip, and what it costs.",
  path: "/blog",
});

export default async function BlogIndex() {
  const posts = await getPublishedPosts();

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", ...breadcrumbs([{ name: "Blog", path: "/blog" }]) }} />
      <PageIntro
        title="Notes on building things"
        intro="Practical write-ups on web apps, websites and the decisions behind them."
      />

      <Container as="section" aria-label="Posts" className="pb-6">
        {posts.length === 0 ? (
          <div className="flex flex-col gap-4 rounded-2xl border border-black-50 bg-[#1b1b1b] p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-medium">First posts coming soon.</p>
              <p className="mt-1 text-white-50">In the meantime, have a look at what I&apos;ve built.</p>
            </div>
            <Link href="/work" className="read-more shrink-0">
              See my work →
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="card-border rounded-xl overflow-hidden group">
                {post.coverImage && (
                  <div className="h-48 overflow-hidden bg-black-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.coverImage}
                      alt={post.coverAlt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                )}
                <article className="p-8">
                  <time dateTime={post.publishedAt} className="text-sm text-blue-50">
                    {formatDate(post.publishedAt)}
                  </time>
                  <h2 className="mt-2 text-2xl font-semibold">{post.title}</h2>
                  <p className="mt-3 text-white-50">{post.excerpt}</p>
                  <span className="read-more mt-6 inline-block">Read post →</span>
                </article>
              </Link>
            ))}
          </div>
        )}
      </Container>

      <CtaBand />
    </>
  );
}
