"use client";

import { useState } from "react";
import Marquee from "react-fast-marquee";
import { RiReactjsLine } from "react-icons/ri";
import {
  SiMongodb,
  SiExpress,
  SiRedux,
  SiNumpy,
  SiTypescript,
  SiNextdotjs,
  SiAngular,
  SiLaravel,
  SiDocker,
  SiGooglecloud,
  SiGraphql,
  SiPostgresql,
} from "react-icons/si";
import { FaNodeJs, FaBootstrap, FaHtml5, FaCss3Alt, FaPython } from "react-icons/fa";
import { DiMysql } from "react-icons/di";
import { IoLogoJavascript } from "react-icons/io";
import { AnimateIn } from "@/components/ui/animate-in";
import { SectionLabel } from "@/components/ui/section-label";

const SKILLS = [
  // Primary production technologies (front-loaded)
  { name: "Angular",     icon: SiAngular,        color: "#DD0031" },
  { name: "React",       icon: RiReactjsLine,    color: "#22d3ee" },
  { name: "TypeScript",  icon: SiTypescript,     color: "#3178C6" },
  { name: "Node.js",     icon: FaNodeJs,         color: "#339933" },
  { name: "Python",      icon: FaPython,         color: "#3776AB" },
  // Backend & databases
  { name: "MongoDB",     icon: SiMongodb,        color: "#47A248" },
  { name: "PostgreSQL",  icon: SiPostgresql,     color: "#336791" },
  { name: "MySQL",       icon: DiMysql,          color: "#fb923c" },
  // AI / ML
  { name: "GraphQL",     icon: SiGraphql,        color: "#E10098" },
  { name: "NumPy",       icon: SiNumpy,          color: "#60a5fa" },
  // Frontend utilities
  { name: "JavaScript",  icon: IoLogoJavascript, color: "#F7DF1E" },
  { name: "Next.js",     icon: SiNextdotjs,      color: "#e5e7eb" },
  { name: "Redux",       icon: SiRedux,          color: "#764ABC" },
  { name: "Bootstrap",   icon: FaBootstrap,      color: "#a78bfa" },
  { name: "HTML5",       icon: FaHtml5,          color: "#E34F26" },
  { name: "CSS3",        icon: FaCss3Alt,        color: "#1572B6" },
  // Infrastructure & backend frameworks
  { name: "Docker",      icon: SiDocker,         color: "#2496ED" },
  { name: "GCP",         icon: SiGooglecloud,    color: "#4285F4" },
  { name: "Laravel",     icon: SiLaravel,        color: "#FF2D20" },
  { name: "Express",     icon: SiExpress,        color: "#f59e0b" },
];

function SkillCard({
  name,
  icon: Icon,
  color,
}: {
  name: string;
  icon: React.ElementType;
  color: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      role="img"
      aria-label={name}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "148px",
        padding: "28px 16px 22px",
        margin: "0 8px",
        borderRadius: "14px",
        border: `1px solid ${hovered ? color + "55" : "rgba(255,255,255,0.06)"}`,
        background: hovered ? `${color}14` : "rgba(255,255,255,0.025)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "14px",
        cursor: "default",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered ? `0 16px 36px ${color}22` : "none",
        flexShrink: 0,
      }}
    >
      <Icon
        aria-hidden="true"
        style={{
          fontSize: "52px",
          color: color,
          opacity: hovered ? 1 : 0.55,
          filter: hovered ? `drop-shadow(0 0 10px ${color}90)` : "none",
          transition: "opacity 0.25s ease, filter 0.25s ease",
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: "11px",
          color: color,
          opacity: hovered ? 1 : 0.55,
          fontWeight: 600,
          letterSpacing: "0.06em",
          transition: "opacity 0.25s ease",
          textAlign: "center",
        }}
      >
        {name}
      </span>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="py-32">
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <AnimateIn>
          <SectionLabel index="03" label="Skills" />
          <h2 className="font-serif text-[clamp(36px,5vw,72px)] leading-[1] tracking-tight mt-4">
            Tools I <span className="grad-text italic">reach for</span>.
          </h2>
        </AnimateIn>
      </div>

      <div
        className="px-6 container mx-auto max-w-6xl"
        role="region"
        aria-label="Technologies I work with"
      >
        <Marquee speed={50} pauseOnHover gradient={false}>
          {SKILLS.map((skill) => (
            <SkillCard key={skill.name} {...skill} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
