"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function ShowcaseSection({ projects }) {
  const [featuredProject, ...secondaryProjects] = projects;
  const sectionRef = useRef(null);
  const featuredRef = useRef(null);
  const listRefs = useRef([]);
  listRefs.current = [];

  useGSAP(() => {
    [featuredRef.current, ...listRefs.current].forEach((project, index) => {
      gsap.fromTo(
        project,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: project,
            start: "top bottom -100",
          },
        }
      );
    });

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );
  }, []);

  if (!featuredProject) return null;

  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">
          {/*LEFT SIDE*/}
          <div className="first-project-wrapper" ref={featuredRef}>
            <div className="image-wrapper">
              <img src={featuredProject.image} alt={featuredProject.title} />
            </div>
            <div className="text-content">
              <div className="badges">
                <span className="text-xs px-3 py-1 rounded-full border border-white-50/30 text-white-50">
                  {featuredProject.status}
                </span>
              </div>
              <h2>{featuredProject.title}</h2>
              <p className="text-white-50 md:text-xl">
                {featuredProject.description}
              </p>
              {featuredProject.link && (
                <a
                  href={featuredProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm underline text-white-50 hover:text-white"
                >
                  Visit site →
                </a>
              )}
            </div>
          </div>
          {/*RIGHT SIDE*/}
          <div className="project-list-wrapper overflow-hidden">
            {secondaryProjects.map((project) => (
              <div
                className="project"
                key={project.id}
                ref={(el) => listRefs.current.push(el)}
              >
                <div className="">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="badges">
                  <span className="text-xs px-3 py-1 rounded-full border border-white-50/30 text-white-50">
                    {project.status}
                  </span>
                </div>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm underline text-white-50 hover:text-white"
                  >
                    Visit site →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowcaseSection;
