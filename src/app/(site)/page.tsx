import Hero from "@/sections/hero";
import FeaturedWork from "@/sections/FeaturedWork";
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
        "@type": "Person",
        "@id": `${SITE.url}/#person`,
        name: SITE.name,
        jobTitle: "Freelance Web App Developer",
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
        description: SITE.description,
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
        <FeaturedWork projects={projects} />
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
