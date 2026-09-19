import { randomUUID } from "crypto";
import { mkdir, readFile, rename, writeFile } from "fs/promises";
import path from "path";

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  status: string;
  link?: string;
  published: boolean;
};

export type ExpCard = {
  id: string;
  review: string;
  imgPath: string;
  logoPath: string;
  title: string;
  date: string;
  responsibilities: string[];
  published: boolean;
};

type ContentData = {
  projects: Project[];
  expCards: ExpCard[];
};

const DATA_DIR = process.env.DATA_DIR ?? path.join(process.cwd(), "data");
const CONTENT_PATH = path.join(DATA_DIR, "content.json");
const SEED_PATH = path.join(process.cwd(), "data", "seed", "content.seed.json");

let writeQueue: Promise<void> = Promise.resolve();

async function loadFromDisk(): Promise<ContentData> {
  try {
    const raw = await readFile(CONTENT_PATH, "utf-8");
    return JSON.parse(raw) as ContentData;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== "ENOENT") throw err;

    const seedRaw = await readFile(SEED_PATH, "utf-8");
    const seed = JSON.parse(seedRaw) as ContentData;
    const seeded: ContentData = {
      projects: seed.projects.map((p) => ({ ...p, id: p.id || randomUUID() })),
      expCards: seed.expCards.map((c) => ({ ...c, id: c.id || randomUUID() })),
    };
    try {
      await persist(seeded);
    } catch (persistErr) {
      // Another process (e.g. a parallel Next.js build worker prerendering a
      // different page) may have seeded content.json concurrently — defer to
      // whatever it wrote rather than failing the whole build/request.
      try {
        const raw = await readFile(CONTENT_PATH, "utf-8");
        return JSON.parse(raw) as ContentData;
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

export async function upsertProject(project: Project): Promise<void> {
  await mutate((data) => {
    const idx = data.projects.findIndex((p) => p.id === project.id);
    const projects = [...data.projects];
    if (idx === -1) projects.push(project);
    else projects[idx] = project;
    return { ...data, projects };
  });
}

export async function deleteProject(id: string): Promise<void> {
  await mutate((data) => ({
    ...data,
    projects: data.projects.filter((p) => p.id !== id),
  }));
}

export async function reorderProject(id: string, direction: "up" | "down"): Promise<void> {
  await mutate((data) => {
    const projects = [...data.projects];
    const idx = projects.findIndex((p) => p.id === id);
    const swapWith = direction === "up" ? idx - 1 : idx + 1;
    if (idx === -1 || swapWith < 0 || swapWith >= projects.length) return data;
    [projects[idx], projects[swapWith]] = [projects[swapWith], projects[idx]];
    return { ...data, projects };
  });
}

export async function upsertExpCard(card: ExpCard): Promise<void> {
  await mutate((data) => {
    const idx = data.expCards.findIndex((c) => c.id === card.id);
    const expCards = [...data.expCards];
    if (idx === -1) expCards.push(card);
    else expCards[idx] = card;
    return { ...data, expCards };
  });
}

export async function deleteExpCard(id: string): Promise<void> {
  await mutate((data) => ({
    ...data,
    expCards: data.expCards.filter((c) => c.id !== id),
  }));
}

export async function reorderExpCard(id: string, direction: "up" | "down"): Promise<void> {
  await mutate((data) => {
    const expCards = [...data.expCards];
    const idx = expCards.findIndex((c) => c.id === id);
    const swapWith = direction === "up" ? idx - 1 : idx + 1;
    if (idx === -1 || swapWith < 0 || swapWith >= expCards.length) return data;
    [expCards[idx], expCards[swapWith]] = [expCards[swapWith], expCards[idx]];
    return { ...data, expCards };
  });
}
