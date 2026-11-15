"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "./auth";
import {
  deletePost as deletePostFromStore,
  deleteProject as deleteProjectFromStore,
  newId,
  normalizePost,
  normalizeProject,
  normalizeServices,
  reorderProject,
  saveServices as saveServicesToStore,
  SERVICE_SLUGS,
  slugify,
  SlugTakenError,
  upsertPost,
  upsertProject,
} from "./content-store";

function str(formData: FormData, key: string): string {
  return (formData.get(key) as string | null)?.trim() ?? "";
}

/** Parses a JSON-encoded list from a RepeaterField hidden input. */
function jsonList(formData: FormData, key: string): Record<string, unknown>[] {
  try {
    const parsed = JSON.parse(str(formData, key) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Drops rows where every string field is blank. */
function nonEmpty<T extends Record<string, unknown>>(rows: T[]): T[] {
  return rows.filter((row) => Object.values(row).some((v) => (typeof v === "string" ? v.trim() : v)));
}

function lines(value: string): string[] {
  return value
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

/** Revalidates every public page that can show content. Cheap, and avoids stale pages. */
function revalidatePublic() {
  revalidatePath("/", "layout");
}

export type FormState = { error: string } | null;

// ---------- Projects ----------

export async function saveProject(_prev: FormState, formData: FormData): Promise<FormState> {
  const id = str(formData, "id") || newId();
  const title = str(formData, "title");
  const slug = slugify(str(formData, "slug") || title);
  if (!slug) return { error: "Please give the project a title or URL slug." };

  const hasCaseStudy = formData.get("hasCaseStudy") === "on";

  const project = normalizeProject({
    id,
    slug,
    title,
    summary: str(formData, "summary"),
    image: str(formData, "image"),
    imageAlt: str(formData, "imageAlt"),
    status: str(formData, "status"),
    role: str(formData, "role"),
    year: str(formData, "year"),
    liveUrl: str(formData, "liveUrl"),
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
    seoTitle: str(formData, "seoTitle"),
    seoDescription: str(formData, "seoDescription"),
    caseStudy: hasCaseStudy
      ? {
          problem: str(formData, "problem"),
          features: nonEmpty(jsonList(formData, "features")),
          decisions: nonEmpty(jsonList(formData, "decisions")),
          stack: nonEmpty(jsonList(formData, "stack")),
          outcomeTitle: str(formData, "outcomeTitle"),
          outcome: str(formData, "outcome"),
          testimonial: { quote: str(formData, "testimonialQuote"), author: str(formData, "testimonialAuthor") },
          ctaText: str(formData, "ctaText"),
          ctaHref: str(formData, "ctaHref"),
        }
      : null,
  });

  try {
    await upsertProject(project);
  } catch (err) {
    if (err instanceof SlugTakenError) return { error: err.message };
    throw err;
  }

  revalidatePublic();
  redirect("/admin/projects");
}

export async function removeProject(id: string) {
  await deleteProjectFromStore(id);
  revalidatePublic();
}

export async function moveProject(id: string, direction: "up" | "down") {
  await reorderProject(id, direction);
  revalidatePublic();
}

// ---------- Blog ----------

export async function savePost(_prev: FormState, formData: FormData): Promise<FormState> {
  const id = str(formData, "id") || newId();
  const title = str(formData, "title");
  const slug = slugify(str(formData, "slug") || title);
  if (!slug) return { error: "Please give the post a title or URL slug." };

  const post = normalizePost({
    id,
    slug,
    title,
    excerpt: str(formData, "excerpt"),
    body: (formData.get("body") as string | null) ?? "",
    coverImage: str(formData, "coverImage"),
    coverAlt: str(formData, "coverAlt"),
    tags: str(formData, "tags")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    publishedAt: str(formData, "publishedAt"),
    updatedAt: new Date().toISOString(),
    published: formData.get("published") === "on",
    seoDescription: str(formData, "seoDescription"),
  });

  try {
    await upsertPost(post);
  } catch (err) {
    if (err instanceof SlugTakenError) return { error: err.message };
    throw err;
  }

  revalidatePublic();
  redirect("/admin/blog");
}

export async function removePost(id: string) {
  await deletePostFromStore(id);
  revalidatePublic();
}

// ---------- Services ----------

export async function saveServices(_prev: FormState, formData: FormData): Promise<FormState> {
  const services = normalizeServices({
    packages: nonEmpty(jsonList(formData, "packages")).map((p) => ({
      ...p,
      id: slugify(typeof p.id === "string" ? p.id : "") || slugify(typeof p.name === "string" ? p.name : ""),
      includes: lines(typeof p.includes === "string" ? p.includes : ""),
    })),
    faq: nonEmpty(jsonList(formData, "faq")),
    process: nonEmpty(jsonList(formData, "process")),
    services: SERVICE_SLUGS.map((slug) => ({
      slug,
      title: str(formData, `svc-${slug}-title`),
      summary: str(formData, `svc-${slug}-summary`),
      intro: str(formData, `svc-${slug}-intro`),
      bullets: lines(str(formData, `svc-${slug}-bullets`)),
      proofProjectSlug: str(formData, `svc-${slug}-proof`),
    })),
  });

  await saveServicesToStore(services);
  revalidatePublic();
  return { error: "" };
}

// ---------- Auth ----------

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  redirect("/admin/login");
}
