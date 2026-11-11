"use client";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ProjectImage({ project, className = "" }) {
  if (!project.image) return <div className={`${className} bg-black-200 rounded-xl w-full h-full`} aria-hidden="true" />;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={project.image} alt={project.imageAlt || `Screenshot of ${project.title}`} className={className} />
  );
}

/** Featured project large on the left, the next two on the right. Each card links to its case study. */
function FeaturedWork({ projects }) {
  const [featuredProject, ...secondaryProjects] = projects;
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.utils.toArray(".work-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.2 * index,
            scrollTrigger: { trigger: card, start: "top bottom-=100" },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  if (!featuredProject) return null;

  return (
    <div ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">
          <Link href={`/work/${featuredProject.slug}`} className="first-project-wrapper work-card group">
            <div className="image-wrapper overflow-hidden rounded-xl">
              <ProjectImage
                project={featuredProject}
                className="transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
            <div className="text-content">
              <div className="badges">
                {featuredProject.status && <span className="badge">{featuredProject.status}</span>}
                {featuredProject.year && <span className="badge">{featuredProject.year}</span>}
              </div>
              <h3>{featuredProject.title}</h3>
              <p className="text-white-50 md:text-xl">{featuredProject.summary}</p>
              <span className="read-more">Read the case study →</span>
            </div>
          </Link>

          <div className="project-list-wrapper overflow-hidden">
            {secondaryProjects.slice(0, 2).map((project) => (
              <Link href={`/work/${project.slug}`} className="project work-card group" key={project.id}>
                <div className="image-wrapper">
                  <ProjectImage project={project} />
                </div>
                <div className="badges mt-4">
                  {project.status && <span className="badge">{project.status}</span>}
                </div>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <span className="read-more">Read the case study →</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedWork;
