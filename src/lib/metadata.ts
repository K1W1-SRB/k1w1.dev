import type { Metadata } from "next";
import { SITE } from "@/constants/site";

/**
 * Per-page metadata. The root layout sets site-wide Open Graph values, but a page
 * that sets `openGraph` replaces them, so every page builds its own through this.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  type = "website",
  images,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  type?: "website" | "article";
  images?: string[];
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE.brand}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "en_GB",
      siteName: SITE.brand,
      url: path,
      title: fullTitle,
      description,
      ...(images?.length ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(images?.length ? { images } : {}),
    },
  };
}
