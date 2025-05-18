import React from "react";
import TitleHeader from "../components/TitleHeader";
import {
  SiFigma,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiGit,
  SiSupabase,
  SiAppwrite,
  SiNestjs,
  SiNodedotjs,
} from "react-icons/si";

const technologies = [
  {
    name: "Figma",
    desc: "Design Tool",
    icon: SiFigma,
    glow: "bg-pink-500",
  },
  {
    name: "TypeScript",
    desc: "JavaScript, but better",
    icon: SiTypescript,
    glow: "bg-blue-500",
  },
  {
    name: "React",
    desc: "JavaScript Library",
    icon: SiReact,
    glow: "bg-cyan-400",
  },
  {
    name: "NextJS",
    desc: "React framework",
    icon: SiNextdotjs,
    glow: "bg-white",
  },
  {
    name: "Tailwind",
    desc: "CSS framework",
    icon: SiTailwindcss,
    glow: "bg-teal-400",
  },
  {
    name: "Git",
    desc: "Version control",
    icon: SiGit,
    glow: "bg-orange-500",
  },
  {
    name: "NodeJS",
    desc: "JavaScript runtime environment",
    icon: SiNodedotjs,
    glow: "bg-green-600",
  },
  {
    name: "NestJS",
    desc: "Node Framework",
    icon: SiNestjs,
    glow: "bg-red-400",
  },
];

function TechnologiesSection() {
  return (
    <div id="skills" className="section-padding bg-[#212121] text-white">
      <div className="max-w-5xl mx-auto px-4">
        <TitleHeader title="My Technologies" sub="👨‍💻 My Current TechStack" />
        <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {technologies.map(({ name, desc, icon: Icon, glow }) => (
            <div
              key={name}
              className="flex items-center gap-4 p-4 bg-zinc-900 rounded-lg shadow hover:bg-zinc-800 transition"
            >
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div
                  className={`absolute inset-0 rounded-md ${glow} blur-sm opacity-60`}
                />
                <Icon size={24} />
              </div>
              <div>
                <p className="font-semibold">{name}</p>
                <p className="text-sm text-gray-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TechnologiesSection;
