import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getPublishedPostBySlug } from "@/lib/content-store";

export const alt = "K1W1 blog post";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  return renderOg({ eyebrow: "Blog", title: post?.title ?? "Blog" });
}
