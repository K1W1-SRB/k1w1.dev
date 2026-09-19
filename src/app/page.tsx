import Hero from "../sections/hero";
import ShowcaseSection from "../sections/ShowcaseSection";
import NavBar from "../components/NavBar";
import ExperienceSection from "../sections/ExperienceSection";
import TechnologiesSection from "../sections/Technologies";
import Contact from "../sections/Contact";
import { getContent } from "@/lib/content-store";

export default async function Home() {
  const { projects, expCards } = await getContent();
  const publishedProjects = projects.filter((p) => p.published);
  const publishedExpCards = expCards.filter((c) => c.published);

  return (
    <>
      <NavBar />
      <Hero />
      <ShowcaseSection projects={publishedProjects} />
      <ExperienceSection expCards={publishedExpCards} />
      <TechnologiesSection />
      <Contact />
    </>
  );
}
