import { randomUUID } from "crypto";
import { mkdir, readFile, rename, writeFile } from "fs/promises";
import path from "path";

// ---------- Types ----------

export type Feature = { title: string; body: string; image: string; imageAlt: string };
export type Decision = { title: string; body: string };
export type StackItem = { name: string; why: string };
export type Testimonial = { quote: string; author: string };

export type CaseStudy = {
  problem: string; // markdown
  features: Feature[];
  decisions: Decision[];
  stack: StackItem[];
  outcomeTitle: string; // e.g. "Outcome" or "What I learned"
  outcome: string; // markdown
  testimonial: Testimonial;
  ctaText: string;
  ctaHref: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  summary: string; // one line, used on cards and the case-study hero
  image: string;
  imageAlt: string;
  status: string;
  role: string;
  year: string;
  liveUrl: string;
  featured: boolean;
  published: boolean;
  seoTitle: string;
  seoDescription: string;
  caseStudy: CaseStudy | null;
};

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string; // markdown
  coverImage: string;
  coverAlt: string;
  tags: string[];
  publishedAt: string; // YYYY-MM-DD
  updatedAt: string; // ISO
  published: boolean;
  seoDescription: string;
};

export type Package = {
  id: string;
  name: string;
  priceFrom: string; // e.g. "£1,200" or "£79"
  billing: "from" | "monthly"; // "From £1,200" vs "£79/month"
  timeline: string; // e.g. "2–3 weeks"
  summary: string;
  includes: string[];
  proofProjectSlug: string; // project shown as "See it in action"
  badge: string; // e.g. "Most popular"; empty for none
  ctaText: string;
  ctaHref: string;
  service: string; // service slug this package belongs to ("web-apps" | "websites" | "" for both)
};

export type FaqItem = { q: string; a: string };
export type ProcessStep = { title: string; body: string; duration: string };

export type ServicePage = {
  slug: string; // "web-apps" | "websites"
  title: string;
  summary: string; // meta description / card text
  intro: string; // markdown
  bullets: string[];
  proofProjectSlug: string;
};

export type ServicesContent = {
  packages: Package[];
  faq: FaqItem[];
  process: ProcessStep[];
  services: ServicePage[];
};

type ContentData = {
  projects: Project[];
  posts: Post[];
  services: ServicesContent;
  /** Old experience timeline cards. No longer rendered; carried through untouched so saving doesn't lose them. */
  expCards?: unknown[];
};

export const SERVICE_SLUGS = ["web-apps", "websites"] as const;

// ---------- Normalisation (keeps older content.json files working) ----------

const DEFAULT_CTA_TEXT = "Need something like this for your business?";

export function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

const s = (v: unknown, fallback = ""): string => (typeof v === "string" ? v : fallback);
const b = (v: unknown, fallback = false): boolean => (typeof v === "boolean" ? v : fallback);
const arr = <T>(v: unknown, map: (x: Record<string, unknown>) => T): T[] =>
  Array.isArray(v) ? v.filter((x) => x && typeof x === "object").map((x) => map(x as Record<string, unknown>)) : [];
const strArr = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x) => typeof x === "string") : []);

function normalizeCaseStudy(raw: unknown): CaseStudy | null {
  if (!raw || typeof raw !== "object") return null;
  const c = raw as Record<string, unknown>;
  const t = (c.testimonial ?? {}) as Record<string, unknown>;
  return {
    problem: s(c.problem),
    features: arr(c.features, (f) => ({
      title: s(f.title),
      body: s(f.body),
      image: s(f.image),
      imageAlt: s(f.imageAlt),
    })),
    decisions: arr(c.decisions, (d) => ({ title: s(d.title), body: s(d.body) })),
    stack: arr(c.stack, (x) => ({ name: s(x.name), why: s(x.why) })),
    outcomeTitle: s(c.outcomeTitle, "Outcome") || "Outcome",
    outcome: s(c.outcome),
    testimonial: { quote: s(t.quote), author: s(t.author) },
    ctaText: s(c.ctaText) || DEFAULT_CTA_TEXT,
    ctaHref: s(c.ctaHref) || "/services",
  };
}

/** Image files renamed to lowercase-hyphen names in the SEO pass; old content files still point at the originals. */
const LEGACY_IMAGE_PATHS: Record<string, string> = {
  "/images/bg-promo.png": "/images/bookgusto-promo.png",
  "/images/bg.png": "/images/bookgusto-landing.png",
  "/images/content.png": "/images/bookgusto-logo.png",
};
const img = (v: unknown) => {
  const path = s(v);
  return LEGACY_IMAGE_PATHS[path] ?? path;
};

export function normalizeProject(raw: Record<string, unknown>): Project {
  const id = s(raw.id) || randomUUID();
  const title = s(raw.title);
  return {
    id,
    slug: s(raw.slug) || slugify(id) || slugify(title),
    title,
    // Older entries only had `description`.
    summary: s(raw.summary) || s(raw.description),
    image: img(raw.image),
    imageAlt: s(raw.imageAlt),
    status: s(raw.status),
    role: s(raw.role),
    year: s(raw.year),
    // Older entries used `link`.
    liveUrl: s(raw.liveUrl) || s(raw.link),
    featured: b(raw.featured),
    published: b(raw.published),
    seoTitle: s(raw.seoTitle),
    seoDescription: s(raw.seoDescription),
    caseStudy: normalizeCaseStudy(raw.caseStudy),
  };
}

export function normalizePost(raw: Record<string, unknown>): Post {
  const title = s(raw.title);
  return {
    id: s(raw.id) || randomUUID(),
    slug: s(raw.slug) || slugify(title),
    title,
    excerpt: s(raw.excerpt),
    body: s(raw.body),
    coverImage: s(raw.coverImage),
    coverAlt: s(raw.coverAlt),
    tags: strArr(raw.tags),
    publishedAt: s(raw.publishedAt) || new Date().toISOString().slice(0, 10),
    updatedAt: s(raw.updatedAt) || new Date().toISOString(),
    published: b(raw.published),
    seoDescription: s(raw.seoDescription),
  };
}

export function normalizeServices(raw: unknown): ServicesContent {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  return {
    packages: arr(r.packages, (p) => {
      const id = s(p.id) || slugify(s(p.name)) || randomUUID();
      return {
        id,
        name: s(p.name),
        priceFrom: s(p.priceFrom),
        billing: p.billing === "monthly" ? ("monthly" as const) : ("from" as const),
        timeline: s(p.timeline),
        summary: s(p.summary),
        includes: strArr(p.includes),
        proofProjectSlug: s(p.proofProjectSlug),
        // Older data used a boolean `featured` flag.
        badge: s(p.badge) || (b(p.featured) ? "Most popular" : ""),
        ctaText: s(p.ctaText) || "Get a quote",
        ctaHref: s(p.ctaHref) || `/contact?package=${encodeURIComponent(id)}`,
        service: s(p.service),
      };
    }),
    faq: arr(r.faq, (f) => ({ q: s(f.q), a: s(f.a) })),
    process: arr(r.process, (p) => ({ title: s(p.title), body: s(p.body), duration: s(p.duration) })),
    services: arr(r.services, (x) => ({
      slug: s(x.slug),
      title: s(x.title),
      summary: s(x.summary),
      intro: s(x.intro),
      bullets: strArr(x.bullets),
      proofProjectSlug: s(x.proofProjectSlug),
    })),
  };
}

function isEmptyServices(sv: ServicesContent) {
  return !sv.packages.length && !sv.faq.length && !sv.process.length && !sv.services.length;
}

/**
 * For content files that predate case studies: fill fields a stored project doesn't have
 * at all (e.g. `caseStudy`, `role`) from the seed project with the same id, and add seed
 * projects that are missing entirely (e.g. the PT2C placeholder). Fields that exist, even
 * if blank or null, are left alone, so nothing set in /admin gets overwritten.
 */
function mergeSeedProjects(rawProjects: unknown, seedProjects: Project[]): Record<string, unknown>[] {
  const stored = Array.isArray(rawProjects) ? (rawProjects as Record<string, unknown>[]) : [];
  const merged = stored.map((r) => {
    const seedProject = seedProjects.find((p) => p.id === r.id);
    if (!seedProject) return r;
    return {
      ...seedProject,
      ...r,
      // Old files stored these under different names; prefer the stored copy over the seed's.
      ...(r.summary === undefined && typeof r.description === "string" ? { summary: r.description } : {}),
      ...(r.liveUrl === undefined && typeof r.link === "string" ? { liveUrl: r.link } : {}),
    };
  });
  const missing = seedProjects.filter((p) => !stored.some((r) => r.id === p.id));
  return [...merged, ...missing];
}

function normalize(raw: Record<string, unknown>, seed?: ContentData): ContentData {
  const rawProjects = seed ? mergeSeedProjects(raw.projects, seed.projects) : raw.projects;
  const projects = arr(rawProjects, normalizeProject);
  let posts = arr(raw.posts, normalizePost);
  let services = normalizeServices(raw.services);

  // Older content files predate posts/services: fill them from the seed once.
  if (seed) {
    if (!("posts" in raw)) posts = seed.posts;
    if (!("services" in raw) || isEmptyServices(services)) services = seed.services;
  }

  const data: ContentData = { projects, posts, services };
  if (Array.isArray(raw.expCards)) data.expCards = raw.expCards;
  return data;
}

// ---------- Persistence ----------

const DATA_DIR = process.env.DATA_DIR ?? path.join(process.cwd(), "data");
const CONTENT_PATH = path.join(DATA_DIR, "content.json");
const SEED_PATH = path.join(process.cwd(), "data", "seed", "content.seed.json");

let writeQueue: Promise<void> = Promise.resolve();

async function loadSeed(): Promise<ContentData> {
  const seedRaw = await readFile(SEED_PATH, "utf-8");
  return normalize(JSON.parse(seedRaw));
}

async function loadFromDisk(): Promise<ContentData> {
  try {
    const raw = JSON.parse(await readFile(CONTENT_PATH, "utf-8")) as Record<string, unknown>;
    const needsSeed = !("posts" in raw) || !("services" in raw);
    return normalize(raw, needsSeed ? await loadSeed() : undefined);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== "ENOENT") throw err;

    const seeded = await loadSeed();
    try {
      await persist(seeded);
    } catch (persistErr) {
      // Another process (e.g. a parallel Next.js build worker prerendering a
      // different page) may have seeded content.json concurrently — defer to
      // whatever it wrote rather than failing the whole build/request.
      try {
        return normalize(JSON.parse(await readFile(CONTENT_PATH, "utf-8")));
      } catch {
        throw persistErr;
      }
    }
    return seeded;
  }
}

async function persist(data: ContentData): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  const tmpPath = `${CONTENT_PATH}.${randomUUID()}.tmp`;
  await writeFile(tmpPath, JSON.stringify(data, null, 2), "utf-8");
  await rename(tmpPath, CONTENT_PATH);
}

/** Reads the full content store (published and unpublished entries). */
export async function getContent(): Promise<ContentData> {
  return loadFromDisk();
}

/** Runs a read-modify-write against the content store, serialized against concurrent writers. */
async function mutate(fn: (data: ContentData) => ContentData): Promise<ContentData> {
  const result = writeQueue.then(async () => {
    const current = await loadFromDisk();
    const next = fn(current);
    await persist(next);
    return next;
  });
  writeQueue = result.then(
    () => undefined,
    () => undefined
  );
  return result;
}

export function newId(): string {
  return randomUUID();
}

// ---------- Public read helpers ----------

/** Published projects, featured first, otherwise in admin order. */
export async function getPublishedProjects(): Promise<Project[]> {
  const { projects } = await getContent();
  const published = projects.filter((p) => p.published);
  return [...published.filter((p) => p.featured), ...published.filter((p) => !p.featured)];
}

export async function getPublishedProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getPublishedProjects();
  return projects.find((p) => p.slug === slug) ?? null;
}

/** Published posts, newest first. */
export async function getPublishedPosts(): Promise<Post[]> {
  const { posts } = await getContent();
  return posts
    .filter((p) => p.published)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getPublishedPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getPublishedPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getServices(): Promise<ServicesContent> {
  return (await getContent()).services;
}

// ---------- Mutations ----------

function upsertById<T extends { id: string }>(list: T[], item: T): T[] {
  const idx = list.findIndex((x) => x.id === item.id);
  if (idx === -1) return [...list, item];
  const next = [...list];
  next[idx] = item;
  return next;
}

function move<T extends { id: string }>(list: T[], id: string, direction: "up" | "down"): T[] {
  const next = [...list];
  const idx = next.findIndex((x) => x.id === id);
  const swapWith = direction === "up" ? idx - 1 : idx + 1;
  if (idx === -1 || swapWith < 0 || swapWith >= next.length) return list;
  [next[idx], next[swapWith]] = [next[swapWith], next[idx]];
  return next;
}

export class SlugTakenError extends Error {}

export async function upsertProject(project: Project): Promise<void> {
  await mutate((data) => {
    if (data.projects.some((p) => p.slug === project.slug && p.id !== project.id)) {
      throw new SlugTakenError(`Another project already uses the URL "${project.slug}".`);
    }
    return { ...data, projects: upsertById(data.projects, project) };
  });
}

export async function deleteProject(id: string): Promise<void> {
  await mutate((data) => ({ ...data, projects: data.projects.filter((p) => p.id !== id) }));
}

export async function reorderProject(id: string, direction: "up" | "down"): Promise<void> {
  await mutate((data) => ({ ...data, projects: move(data.projects, id, direction) }));
}

export async function upsertPost(post: Post): Promise<void> {
  await mutate((data) => {
    if (data.posts.some((p) => p.slug === post.slug && p.id !== post.id)) {
      throw new SlugTakenError(`Another post already uses the URL "${post.slug}".`);
    }
    return { ...data, posts: upsertById(data.posts, post) };
  });
}

export async function deletePost(id: string): Promise<void> {
  await mutate((data) => ({ ...data, posts: data.posts.filter((p) => p.id !== id) }));
}

export async function saveServices(services: ServicesContent): Promise<void> {
  await mutate((data) => ({ ...data, services }));
}
