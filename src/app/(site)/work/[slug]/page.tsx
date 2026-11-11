import { notFound } from "next/navigation";
import CaseStudy from "@/components/case-study/CaseStudy";
import JsonLd, { breadcrumbs } from "@/components/JsonLd";
import { getPublishedProjectBySlug, getPublishedProjects } from "@/lib/content-store";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/constants/site";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const project = await getPublishedProjectBySlug(slug);
  if (!project?.caseStudy) return {};

  return pageMetadata({
    title: project.seoTitle || `${project.title} – Case Study`,
    description: project.seoDescription || project.summary,
    path: `/work/${project.slug}`,
    type: "article",
  });
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const projects = (await getPublishedProjects()).filter((p) => p.caseStudy);
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const prev = projects[index - 1] ?? null;
  const next = projects[index + 1] ?? null;
  const url = `${SITE.url}/work/${project.slug}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CreativeWork",
              "@id": `${url}#work`,
              name: project.title,
              headline: project.seoTitle || `${project.title} – Case Study`,
              description: project.seoDescription || project.summary,
              url,
              ...(project.image ? { image: new URL(project.image, SITE.url).toString() } : {}),
              ...(project.year ? { dateCreated: project.year } : {}),
              creator: { "@id": `${SITE.url}/#person` },
              keywords: project.caseStudy!.stack.map((s) => s.name).filter(Boolean).join(", "),
            },
            breadcrumbs([
              { name: "Work", path: "/work" },
              { name: project.title, path: `/work/${project.slug}` },
            ]),
          ],
        }}
      />
      <CaseStudy project={project} prev={prev} next={next} />
    </>
  );
}
