import PageIntro from "@/components/layout/PageIntro";
import Container from "@/components/layout/Container";
import { notFound } from "next/navigation";
import Markdown from "@/components/Markdown";
import CtaBand from "@/sections/CtaBand";
import JsonLd, { breadcrumbs } from "@/components/JsonLd";
import { getPublishedPostBySlug } from "@/lib/content-store";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/constants/site";
import { formatDate } from "@/lib/format";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.seoDescription || post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
  });
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const url = `${SITE.url}/blog/${post.slug}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BlogPosting",
              headline: post.title,
              description: post.seoDescription || post.excerpt,
              datePublished: post.publishedAt,
              dateModified: post.updatedAt,
              url,
              mainEntityOfPage: url,
              ...(post.coverImage ? { image: new URL(post.coverImage, SITE.url).toString() } : {}),
              author: { "@id": `${SITE.url}/#person` },
              publisher: { "@id": `${SITE.url}/#business` },
              keywords: post.tags.join(", "),
            },
            breadcrumbs([
              { name: "Blog", path: "/blog" },
              { name: post.title, path: `/blog/${post.slug}` },
            ]),
          ],
        }}
      />

      <article>
        <PageIntro title={post.title} crumbs={[{ name: "Blog", href: "/blog" }]} narrow>
          <p className="mt-5 text-sm text-blue-50">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            {post.tags.length > 0 && <> · {post.tags.join(", ")}</>}
          </p>
        </PageIntro>

        {post.coverImage && (
          <Container medium className="mt-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.coverImage} alt={post.coverAlt} className="aspect-[16/9] w-full rounded-2xl border border-black-50 object-cover" />
          </Container>
        )}

        <Container narrow className="mt-10">
          <Markdown>{post.body}</Markdown>
        </Container>
      </article>

      <CtaBand
        title="Want help with something like this?"
        text="Fixed-price packages for websites, web apps and ongoing care."
        href="/services"
        buttonText="See packages"
        secondary={{ href: "/contact", text: "Get in touch" }}
      />
    </>
  );
}
