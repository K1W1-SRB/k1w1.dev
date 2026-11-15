import Hero from "@/sections/hero";
import ProjectCard from "@/components/ProjectCard";
import Packages from "@/sections/Packages";
import CtaBand from "@/sections/CtaBand";
import Section from "@/components/layout/Section";
import JsonLd from "@/components/JsonLd";
import { getPublishedProjects, getServices } from "@/lib/content-store";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/constants/site";
import Link from "next/link";

export const metadata = pageMetadata({
  title: SITE.title,
  absoluteTitle: true,
  description: SITE.description,
  path: "/",
});

function structuredData() {
  const sameAs = [SITE.github, SITE.linkedin, SITE.pt2cUrl].filter(Boolean);
  const address = {
    "@type": "PostalAddress",
    addressLocality: SITE.locations.join(", "),
    addressRegion: SITE.region,
    addressCountry: SITE.country,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        // Google uses WebSite name/alternateName for the site name shown in results.
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        name: SITE.brand,
        alternateName: [...SITE.alternateNames],
        url: SITE.url,
        publisher: { "@id": `${SITE.url}/#business` },
      },
      {
        "@type": "Person",
        "@id": `${SITE.url}/#person`,
        name: SITE.name,
        jobTitle: "Freelance Software Developer",
        url: SITE.url,
        worksFor: { "@id": `${SITE.url}/#business` },
        address,
        knowsAbout: ["Next.js", "React", "React Native", "TypeScript", "Node.js", "NestJS"],
        sameAs,
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE.url}/#business`,
        name: SITE.brand,
        alternateName: [...SITE.alternateNames],
        description: SITE.description,
        serviceType: ["Software development", "Web app development", "Website development", "Mobile app development"],
        url: SITE.url,
        image: `${SITE.url}/opengraph-image`,
        founder: { "@id": `${SITE.url}/#person` },
        address,
        areaServed: [
          ...SITE.locations.map((name) => ({ "@type": "City", name })),
          { "@type": "AdministrativeArea", name: SITE.region },
        ],
        sameAs,
      },
    ],
  };
}

export default async function Home() {
  const [projects, services] = await Promise.all([getPublishedProjects(), getServices()]);

  return (
    <>
      <JsonLd data={structuredData()} />
      <Hero />

      <Section id="work" eyebrow="Selected work" title="Things I've built">
        {projects[0] && (
          <div className="flex flex-col gap-6">
            <ProjectCard project={projects[0]} wide priority headingLevel={3} />
            {projects.length > 1 && (
              <div className="grid gap-6 md:grid-cols-2">
                {projects.slice(1, 3).map((p) => (
                  <ProjectCard key={p.id} project={p} headingLevel={3} />
                ))}
              </div>
            )}
          </div>
        )}
        <Link href="/work" className="read-more mt-10 inline-block">
          See all work →
        </Link>
      </Section>

      {services.packages.length > 0 && (
        <Section id="packages" eyebrow="Packages" title="Clear scope, fixed prices">
          <Packages packages={services.packages} projects={projects} compact />
        </Section>
      )}

      <CtaBand />
    </>
  );
}
