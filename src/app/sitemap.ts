import type { MetadataRoute } from "next";
import { SITE } from "@/constants/site";

// Add new public routes here as pages are created.
const PUBLIC_ROUTES = [{ path: "/", priority: 1 }];

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_ROUTES.map(({ path, priority }) => ({
    url: new URL(path, SITE.url).toString(),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  }));
}
