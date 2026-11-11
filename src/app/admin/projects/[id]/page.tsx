import Link from "next/link";
import { notFound } from "next/navigation";
import { getContent, normalizeProject } from "@/lib/content-store";
import ProjectForm from "@/components/admin/ProjectForm";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let project = normalizeProject({ id: "", published: false });
  project = { ...project, id: "", slug: "" };

  if (id !== "new") {
    const { projects } = await getContent();
    const found = projects.find((p) => p.id === id);
    if (!found) notFound();
    project = found;
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">{id === "new" ? "Add project" : `Edit ${project.title}`}</h1>
        {project.published && project.caseStudy && (
          <Link href={`/work/${project.slug}`} target="_blank" className="text-sm text-white-50 hover:text-white">
            View case study ↗
          </Link>
        )}
      </div>
      <ProjectForm project={project} />
    </div>
  );
}
