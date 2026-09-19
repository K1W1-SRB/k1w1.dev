import { notFound } from "next/navigation";
import { getContent } from "@/lib/content-store";
import { saveProject } from "@/lib/admin-actions";
import ImageUploadField from "@/components/admin/ImageUploadField";
import type { Project } from "@/lib/content-store";

const BLANK: Project = {
  id: "",
  title: "",
  description: "",
  image: "",
  status: "",
  link: "",
  published: false,
};

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let project: Project = BLANK;
  if (id !== "new") {
    const { projects } = await getContent();
    const found = projects.find((p) => p.id === id);
    if (!found) notFound();
    project = found;
  }

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-xl font-semibold">{id === "new" ? "Add project" : "Edit project"}</h1>
      <form action={saveProject} className="flex flex-col gap-4">
        <input type="hidden" name="id" defaultValue={project.id} />

        <div>
          <label className="mb-2 block text-sm text-white-50">Title</label>
          <input
            name="title"
            defaultValue={project.title}
            required
            className="w-full rounded-md border border-blue-100 bg-blue-100 px-4 py-2 text-white outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-white-50">Description</label>
          <textarea
            name="description"
            defaultValue={project.description}
            rows={5}
            required
            className="w-full rounded-md border border-blue-100 bg-blue-100 px-4 py-2 text-white outline-none"
          />
        </div>

        <ImageUploadField name="image" label="Image" defaultValue={project.image} />

        <div>
          <label className="mb-2 block text-sm text-white-50">Status</label>
          <input
            name="status"
            defaultValue={project.status}
            placeholder="Live / Paused / Landing page / ..."
            className="w-full rounded-md border border-blue-100 bg-blue-100 px-4 py-2 text-white outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-white-50">Link (optional)</label>
          <input
            name="link"
            type="url"
            defaultValue={project.link}
            placeholder="https://..."
            className="w-full rounded-md border border-blue-100 bg-blue-100 px-4 py-2 text-white outline-none"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-white-50">
          <input type="checkbox" name="published" defaultChecked={project.published} />
          Published (visible on the live site)
        </label>

        <button type="submit" className="mt-2 w-fit rounded-md bg-white px-6 py-2 font-medium text-black-100">
          Save
        </button>
      </form>
    </div>
  );
}
