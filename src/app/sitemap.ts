import type { MetadataRoute } from "next";
import { SITE } from "@/constants/site";
import { getPublishedPosts, getPublishedProjects, SERVICE_SLUGS } from "@/lib/content-store";

export const dynamic = "force-dynamic";

const STATIC_ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/work", priority: 0.9 },
  { path: "/services", priority: 0.9 },
  ...SERVICE_SLUGS.map((s) => ({ path: `/services/${s}`, priority: 0.8 })),
  { path: "/blog", priority: 0.6 },
  { path: "/contact", priority: 0.7 },
];

const url = (path: string) => new URL(path, SITE.url).toString();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, posts] = await Promise.all([getPublishedProjects(), getPublishedPosts()]);
  const now = new Date();

  return [
    ...STATIC_ROUTES.map(({ path, priority }) => ({
      url: url(path),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...projects
      .filter((p) => p.caseStudy)
      .map((p) => ({ url: url(`/work/${p.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...posts.map((p) => ({
      url: url(`/blog/${p.slug}`),
      lastModified: new Date(p.updatedAt),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
