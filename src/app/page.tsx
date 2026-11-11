import type { Metadata } from "next";
import Hero from "../sections/hero";
import ShowcaseSection from "../sections/ShowcaseSection";
import NavBar from "../components/NavBar";
import ExperienceSection from "../sections/ExperienceSection";
import TechnologiesSection from "../sections/Technologies";
import Contact from "../sections/Contact";
import Footer from "../components/Footer";
import { getContent } from "@/lib/content-store";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

function structuredData() {
  const sameAs = [SITE.github, SITE.linkedin, SITE.pt2cUrl].filter(Boolean);
  const areaServed = [
    ...SITE.locations.map((name) => ({ "@type": "City", name })),
    { "@type": "AdministrativeArea", name: SITE.region },
  ];

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
        address: {
          "@type": "PostalAddress",
          addressLocality: SITE.locations.join(", "),
          addressRegion: SITE.region,
          addressCountry: SITE.country,
        },
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
        address: {
          "@type": "PostalAddress",
          addressLocality: SITE.locations.join(", "),
          addressRegion: SITE.region,
          addressCountry: SITE.country,
        },
        areaServed,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Development services",
          itemListElement: [
            "Custom web app development",
            "Mobile app development (React Native)",
            "API and backend development",
            "Business websites and landing pages",
          ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
        },
        sameAs,
      },
    ],
  };
}

export default async function Home() {
  const { projects, expCards } = await getContent();
  const publishedProjects = projects.filter((p) => p.published);
  const publishedExpCards = expCards.filter((c) => c.published);

  return (
    <>
      <script
        type="application/ld+json"
        // JSON.stringify output with "<" escaped so content can't break out of the script tag.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData()).replace(/</g, "\u003c"),
        }}
      />
      <NavBar />
      <main>
        <Hero />
        <ShowcaseSection projects={publishedProjects} />
        <ExperienceSection expCards={publishedExpCards} />
        <TechnologiesSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
