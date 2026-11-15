import PageIntro from "@/components/layout/PageIntro";
import Container from "@/components/layout/Container";
import CtaBand from "@/sections/CtaBand";
import JsonLd, { breadcrumbs } from "@/components/JsonLd";
import { getPublishedProjects } from "@/lib/content-store";
import ProjectCard from "@/components/ProjectCard";
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
