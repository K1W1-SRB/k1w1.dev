import Section from "../components/layout/Section";
import {
  SiFigma,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiGit,
  SiNestjs,
  SiNodedotjs,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";

// TODO: add the technologies PT2C is built with.
const technologies = [
  { name: "TypeScript", icon: SiTypescript, color: "text-blue-400" },
  { name: "React", icon: SiReact, color: "text-cyan-400" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
  { name: "React Native", icon: TbBrandReactNative, color: "text-sky-400" },
  { name: "Node.js", icon: SiNodedotjs, color: "text-green-500" },
  { name: "NestJS", icon: SiNestjs, color: "text-red-400" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-teal-400" },
  { name: "Figma", icon: SiFigma, color: "text-pink-400" },
  { name: "Git", icon: SiGit, color: "text-orange-500" },
];

/** The stack I build with, as a compact row of chips. */
function TechnologiesSection() {
  return (
    <Section id="stack" eyebrow="Stack" title="What I build with">
      <ul className="flex flex-wrap gap-3">
        {technologies.map(({ name, icon: Icon, color }) => (
          <li key={name} className="flex items-center gap-2 rounded-full border border-black-50 bg-zinc-900 px-4 py-2">
            <Icon size={18} className={color} aria-hidden="true" />
            <span className="text-sm font-medium">{name}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export default TechnologiesSection;
