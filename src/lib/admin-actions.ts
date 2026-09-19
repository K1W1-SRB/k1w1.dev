"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "./auth";
import {
  deleteExpCard as deleteExpCardFromStore,
  deleteProject as deleteProjectFromStore,
  newId,
  reorderExpCard,
  reorderProject,
  upsertExpCard,
  upsertProject,
  type ExpCard,
  type Project,
} from "./content-store";

function str(formData: FormData, key: string): string {
  return (formData.get(key) as string | null)?.trim() ?? "";
}

export async function saveProject(formData: FormData) {
  const id = str(formData, "id") || newId();
  const project: Project = {
    id,
    title: str(formData, "title"),
    description: str(formData, "description"),
    image: str(formData, "image"),
    status: str(formData, "status"),
    link: str(formData, "link"),
    published: formData.get("published") === "on",
  };

  await upsertProject(project);
  revalidatePath("/");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function removeProject(id: string) {
  await deleteProjectFromStore(id);
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function moveProject(id: string, direction: "up" | "down") {
  await reorderProject(id, direction);
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function saveExpCard(formData: FormData) {
  const id = str(formData, "id") || newId();
  const responsibilities = str(formData, "responsibilities")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const card: ExpCard = {
    id,
    review: str(formData, "review"),
    imgPath: str(formData, "imgPath"),
    logoPath: str(formData, "logoPath"),
    title: str(formData, "title"),
    date: str(formData, "date"),
    responsibilities,
    published: formData.get("published") === "on",
  };

  await upsertExpCard(card);
  revalidatePath("/");
  revalidatePath("/admin/experience");
  redirect("/admin/experience");
}

export async function removeExpCard(id: string) {
  await deleteExpCardFromStore(id);
  revalidatePath("/");
  revalidatePath("/admin/experience");
}

export async function moveExpCard(id: string, direction: "up" | "down") {
  await reorderExpCard(id, direction);
  revalidatePath("/");
  revalidatePath("/admin/experience");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  redirect("/admin/login");
}
