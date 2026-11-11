import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getPublishedProjectBySlug } from "@/lib/content-store";

export const alt = "Case study";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getPublishedProjectBySlug(slug);
  return renderOg({
    eyebrow: "Case study",
    title: project?.title ?? "Case study",
    subtitle: project?.summary && !project.summary.startsWith("TODO") ? project.summary.slice(0, 110) : undefined,
  });
}
