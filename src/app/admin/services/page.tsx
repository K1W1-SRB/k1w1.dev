import { getContent, SERVICE_SLUGS } from "@/lib/content-store";
import ServicesForm from "@/components/admin/ServicesForm";

export default async function AdminServicesPage() {
  const { services, projects } = await getContent();

  // Always offer both service pages, even if the store is missing one.
  const pages = SERVICE_SLUGS.map(
    (slug) =>
      services.services.find((s) => s.slug === slug) ?? {
        slug,
        title: "",
        summary: "",
        intro: "",
        bullets: [],
        proofProjectSlug: "",
      }
  );

  return (
    <div className="max-w-3xl">
      <h1 className="mb-2 text-xl font-semibold">Services</h1>
      <p className="mb-6 text-sm text-white-50">
        Packages, the &quot;How I work&quot; timeline, the FAQ and the two service pages.
      </p>
      <ServicesForm
        services={{ ...services, services: pages }}
        projects={projects.map((p) => ({ slug: p.slug, title: p.title }))}
      />
    </div>
  );
}
