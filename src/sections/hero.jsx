"use client";
import React from "react";
import { words } from "@/constants";
import Button from "@/components/Button";
import HeroExperience from "@/components/heromodel/HeroExperience";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Hero() {
  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1, .hero-text h2",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.5, ease: "power2.inOut" }
    );
  });
  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="hero-layout">
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
          <div className="flex flex-col gap-7">
            <div className="hero-text">
              <h1>
                Creating
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word) => (
                      <span
                        key={word.text}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        <img
                          src={word.icon}
                          alt=""
                          className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white"
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h2>That just work</h2>
            </div>
            <p className="text-white md:text-xl relative z-10 pointer-events-none">
              Digital craftsmanship for real-world software
            </p>
            <Button
              text="See My Work"
              className="md:w-80 md:h-16 w-60 h-12"
              href="/work"
            />
          </div>
        </header>

        <figure>
          <div className="hero-3d-layout ">
            <HeroExperience />
          </div>
        </figure>
      </div>
    </section>
  );
}

export default Hero;
