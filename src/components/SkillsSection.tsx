"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "./SectionHeading";

interface SkillCategory {
  title: string;
  color: "primary" | "purple" | "cyan" | "green";
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    color: "primary",
    skills: ["C", "C++", "Python", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "Frameworks & Technologies",
    color: "purple",
    skills: ["React.js", "Flask", "REST APIs"],
  },
  {
    title: "Libraries",
    color: "cyan",
    skills: ["pandas", "NumPy", "TensorFlow", "Scikit-learn", "Matplotlib"],
  },
  {
    title: "Core CS",
    color: "green",
    skills: [
      "Data Structures & Algorithms",
      "Operating Systems",
      "DBMS",
      "OOPs",
      "Computer Networks",
      "Theory of Computation",
      "Machine Learning",
      "Deep Learning",
    ],
  },
  {
    title: "Tools",
    color: "primary",
    skills: ["Git", "VS Code"],
  },
];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  },
});

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return {
          cardBorder: "border-primary/20",
          cardHover: "hover:border-primary/40",
          headerBg: "bg-primary/10",
          headerText: "text-primary",
          chipHover: "hover:shadow-[0_0_12px_rgba(59,130,246,0.3)] hover:border-primary/50",
          chipAccent: "bg-primary/5 border-primary/20 text-primary",
        };
      case "purple":
        return {
          cardBorder: "border-purple/20",
          cardHover: "hover:border-purple/40",
          headerBg: "bg-purple/10",
          headerText: "text-purple",
          chipHover: "hover:shadow-[0_0_12px_rgba(139,92,246,0.3)] hover:border-purple/50",
          chipAccent: "bg-purple/5 border-purple/20 text-purple",
        };
      case "cyan":
        return {
          cardBorder: "border-cyan/20",
          cardHover: "hover:border-cyan/40",
          headerBg: "bg-cyan/10",
          headerText: "text-cyan",
          chipHover: "hover:shadow-[0_0_12px_rgba(6,182,212,0.3)] hover:border-cyan/50",
          chipAccent: "bg-cyan/5 border-cyan/20 text-cyan",
        };
      case "green":
        return {
          cardBorder: "border-emerald-500/20",
          cardHover: "hover:border-emerald-500/40",
          headerBg: "bg-emerald-500/10",
          headerText: "text-emerald-500",
          chipHover: "hover:shadow-[0_0_12px_rgba(16,185,129,0.3)] hover:border-emerald-500/50",
          chipAccent: "bg-emerald-500/5 border-emerald-500/20 text-emerald-500",
        };
      default:
        return {
          cardBorder: "border-glass-border",
          cardHover: "hover:border-primary/30",
          headerBg: "bg-surface-light",
          headerText: "text-foreground",
          chipHover: "hover:border-primary/30",
          chipAccent: "bg-surface-light border-glass-border text-foreground",
        };
    }
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* Animated Dot Background Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay">
        <div className="absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      </div>

      {/* Background blobs */}
      <div className="pointer-events-none absolute -left-20 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-purple/[0.04] blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 top-1/4 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-cyan/[0.04] blur-[100px]" />

      <div className="section-container relative z-10">
        {/* ── Section Heading ── */}
        <SectionHeading number="04" subtitle="My Arsenal" title="Skills" />

        {/* ── Skills Grid ── */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, catIndex) => {
            const colors = getColorClasses(category.color);
            return (
              <motion.div
                key={category.title}
                variants={fadeUp(0.1 + catIndex * 0.1)}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className={`glass glass-hover flex h-full flex-col rounded-2xl ${colors.cardBorder} ${colors.cardHover} overflow-hidden p-6 transition-all duration-300`}
              >
                {/* Category Header */}
                <div
                  className={`-mx-6 -mt-6 mb-6 flex items-center justify-between border-b border-glass-border px-6 py-4 ${colors.headerBg}`}
                >
                  <h3 className={`text-sm font-bold tracking-wider uppercase ${colors.headerText}`}>
                    {category.title}
                  </h3>
                </div>

                {/* Skills Chips */}
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill, index) => {
                    // Give programming languages slightly more accented chips compared to regular chips in other categories
                    const isLanguage = category.title === "Languages";
                    const baseChipClass = isLanguage
                      ? colors.chipAccent
                      : "bg-surface-light border-glass-border text-foreground/80";

                    return (
                      <motion.span
                        key={skill}
                        variants={{
                          hidden: { opacity: 0, scale: 0.8 },
                          visible: {
                            opacity: 1,
                            scale: 1,
                            transition: {
                              duration: 0.4,
                              delay: 0.2 + catIndex * 0.1 + index * 0.05,
                            },
                          },
                        }}
                        className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-300 ${baseChipClass} ${colors.chipHover} cursor-default`}
                      >
                        {skill}
                      </motion.span>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
