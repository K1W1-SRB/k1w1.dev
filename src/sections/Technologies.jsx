import React from "react";
import { technologies } from "@/constants";
import TitleHeader from "../components/TitleHeader";
function TechnologiesSection() {
  return (
    <div id="skills" className="section-padding bg-[#212121] text-white">
      <div className="max-w-5xl mx-auto px-4">
        <TitleHeader title="My Technologies" sub="👨‍💻 My Current TechStack" />
        <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center gap-4 p-4 bg-zinc-900 rounded-lg shadow hover:bg-zinc-800 transition"
            >
              <img src={tech.icon} className="text-2xl"></img>
              <div>
                <p className="font-semibold">{tech.name}</p>
                <p className="text-sm text-gray-400">{tech.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TechnologiesSection;
