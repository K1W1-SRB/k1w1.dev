import Hero from "../sections/hero";
import ShowcaseSection from "../sections/ShowcaseSection";
import NavBar from "../components/NavBar";
import ExperienceSection from "../sections/ExperienceSection";
import TechnologiesSection from "../sections/Technologies";
import Contact from "../sections/Contact";

export default function Home() {
  return (
    <>
      <NavBar />
      <Hero />
      <ShowcaseSection />
      <ExperienceSection />
      <TechnologiesSection />
      <Contact />
    </>
  );
}
