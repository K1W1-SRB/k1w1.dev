"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function ShowcaseSection() {
  const sectionRef = useRef(null);
  const project1Ref = useRef(null);
  const project2Ref = useRef(null);
  const project3Ref = useRef(null);

  useGSAP(() => {
    const projects = [
      project1Ref.current,
      project2Ref.current,
      project3Ref.current,
    ];
    projects.forEach((project, index) => {
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
  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">
          {/*LEFT SIDE*/}
          <div className="first-project-wrapper" ref={project1Ref}>
            <div className="image-wrapper">
              <img src="/images/project1.png" alt="First Project" />
            </div>
            <div className="text-content">
              <h2>TeamTel fastest way to make a teams voice system</h2>
              <p className="text-white-50 md:text-xl">
                TeamTel is a company i built with using nextjs nestjs
                tailwindcss using tools like reactflow teams voice API
              </p>
            </div>
          </div>
          {/*RIGHT SIDE*/}
          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={project2Ref}>
              <div className="image-wrapper bg-[#ffefdb]">
                <img src="/images/project2.png" alt="Second Project" />
              </div>
              <h2>FretVault the ultimate guitar second brain</h2>
            </div>
            <div className="project" ref={project3Ref}>
              <div className="image-wrapper bg-[#ffefdb]">
                <img src="/images/project2.png" alt="Second Project" />
              </div>
              <h2>BookGusto Restaurant Management System</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowcaseSection;
