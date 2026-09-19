import Link from "next/link";
import { getContent } from "@/lib/content-store";
import { moveProject, removeProject } from "@/lib/admin-actions";

export default async function AdminProjectsPage() {
  const { projects } = await getContent();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Projects</h1>
        <Link href="/admin/projects/new" className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black-100">
          Add project
        </Link>
      </div>
      <p className="mb-4 text-sm text-white-50">
        First item is the featured project on the homepage. Use the arrows to reorder.
      </p>
      <div className="flex flex-col gap-3">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="flex items-center gap-4 rounded-lg border border-black-50 bg-black-200 p-4"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.image} alt="" className="h-16 w-24 rounded-md object-cover" />
            <div className="flex-1">
              <p className="font-medium">{project.title}</p>
              <p className="text-sm text-white-50">
                {project.status} {!project.published && "· Draft"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <form action={moveProject.bind(null, project.id, "up")}>
                <button type="submit" disabled={index === 0} className="px-2 text-white-50 disabled:opacity-30">
                  ↑
                </button>
              </form>
              <form action={moveProject.bind(null, project.id, "down")}>
                <button
                  type="submit"
                  disabled={index === projects.length - 1}
                  className="px-2 text-white-50 disabled:opacity-30"
                >
                  ↓
                </button>
              </form>
              <Link href={`/admin/projects/${project.id}`} className="text-sm text-white-50 hover:text-white">
                Edit
              </Link>
              <form action={removeProject.bind(null, project.id)}>
                <button type="submit" className="text-sm text-red-400 hover:text-red-300">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
