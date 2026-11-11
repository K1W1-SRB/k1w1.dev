import Link from "next/link";
import type { Project } from "@/lib/content-store";

/** Project card used on /work and the home page. Wide cards put the image beside the text on desktop. */
export default function ProjectCard({
  project,
  wide = false,
  priority = false,
  headingLevel = 2,
}: {
  project: Project;
  wide?: boolean;
  priority?: boolean;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 3 ? "h3" : "h2";
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
        <Heading className={wide ? "text-2xl md:text-3xl font-semibold" : "text-2xl font-semibold"}>{project.title}</Heading>
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
