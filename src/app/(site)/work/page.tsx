import Link from "next/link";
import PageIntro from "@/components/layout/PageIntro";
import Container from "@/components/layout/Container";
import CtaBand from "@/sections/CtaBand";
import JsonLd, { breadcrumbs } from "@/components/JsonLd";
import { getPublishedProjects, type Project } from "@/lib/content-store";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Work – Web & Mobile App Case Studies",
  description:
    "Case studies of web apps, websites and mobile apps I've built for clients and my own products, including PT2C, BookGusto and FretVault.",
  path: "/work",
});

export default async function WorkPage() {
  const projects = await getPublishedProjects();
  const [lead, ...rest] = projects;
  // An odd one out goes full width, so the grid never leaves an empty half-column.
  const paired = rest.length % 2 === 0 ? rest : rest.slice(0, -1);
  const leftover = rest.length % 2 === 0 ? null : rest[rest.length - 1];

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", ...breadcrumbs([{ name: "Work", path: "/work" }]) }} />
      <PageIntro
        title="Things I've built"
        intro="Web apps, websites and mobile apps, each with a short case study: the problem, what I built, the decisions behind it, and how it turned out."
      />

      <Container className="flex flex-col gap-6 pb-6">
        {projects.length === 0 && <p className="text-white-50">Case studies are on their way.</p>}
        {lead && <ProjectCard project={lead} wide priority />}
        {paired.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2">
            {paired.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}
        {leftover && <ProjectCard project={leftover} wide />}
      </Container>

      <CtaBand />
    </>
  );
}

function ProjectCard({ project, wide = false, priority = false }: { project: Project; wide?: boolean; priority?: boolean }) {
  const href = project.caseStudy ? `/work/${project.slug}` : project.liveUrl || "";
  const meta = [project.status, project.year].filter(Boolean);

  const card = (
    <article
      className={`card-border h-full overflow-hidden rounded-2xl transition-colors group-hover:border-white-50/30 ${
        wide ? "md:grid md:grid-cols-12" : "flex flex-col"
      }`}
    >
      <div className={`${wide ? "md:col-span-7 aspect-[16/10] md:aspect-auto md:min-h-80" : "aspect-[16/10]"} bg-black-200 overflow-hidden`}>
        {project.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={project.imageAlt || `Screenshot of ${project.title}`}
            loading={priority ? "eager" : "lazy"}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className={`flex flex-col gap-3 p-6 md:p-8 ${wide ? "md:col-span-5 md:justify-center" : "flex-1"}`}>
        {meta.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {meta.map((m) => (
              <span key={m} className="badge">
                {m}
              </span>
            ))}
          </div>
        )}
        <h2 className={wide ? "text-2xl md:text-3xl font-semibold" : "text-2xl font-semibold"}>{project.title}</h2>
        <p className="text-white-50">{project.summary}</p>
        {project.caseStudy && <span className="read-more mt-auto pt-2 w-fit">Read the case study →</span>}
      </div>
    </article>
  );

  return href ? (
    <Link href={href} className="group block h-full">
      {card}
    </Link>
  ) : (
    card
  );
}
