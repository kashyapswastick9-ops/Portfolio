"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import SectionHeading from "./SectionHeading";

const educations = [
  {
    institution: "Delhi Technological University",
    degree: "B.Tech in Computer Science & Engineering",
    duration: "2023 – 2027",
    score: "CGPA: 7.94",
    color: "primary",
  },
  {
    institution: "Air Force Golden Jubilee Institute",
    degree: "High School (Science Stream)",
    duration: "2021",
    score: "Class XII: 91.4% | Class X: 96.4%",
    color: "purple",
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

export default function EducationSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  /* animated glow line height */
  const lineContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: lineContainerRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* Background blobs */}
      <div className="pointer-events-none absolute -left-20 top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-cyan/[0.03] blur-[100px]" />

      <div className="section-container relative z-10">
        {/* ── Section Heading ── */}
        <SectionHeading number="06" subtitle="Academic Background" title="Education" />

        {/* ── Timeline ── */}
        <div ref={lineContainerRef} className="relative mx-auto max-w-4xl">
          {/* Vertical line on the left */}
          <div className="absolute left-[15px] top-0 h-full w-px bg-glass-border md:left-[23px]">
            {/* Animated glow fill */}
            <motion.div
              className="w-full rounded-full bg-gradient-to-b from-primary via-purple to-cyan"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="flex flex-col gap-10 pl-12 md:pl-20">
            {educations.map((edu, index) => {
              const isPrimary = edu.color === "primary";
              return (
                <div key={edu.institution} className="relative">
                  {/* Glowing dot on the timeline */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{
                      type: "spring" as const,
                      stiffness: 350,
                      damping: 20,
                      delay: 0.2 + index * 0.2,
                    }}
                    className={`absolute -left-[44px] md:-left-[68px] top-5 h-4 w-4 rounded-full border-2 border-background shadow-[0_0_12px] ${
                      isPrimary
                        ? "bg-primary shadow-[var(--primary-glow)]"
                        : "bg-purple shadow-[var(--purple-glow)]"
                    }`}
                  />

                  {/* Card sliding in from the left */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: -50 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: {
                          duration: 0.6,
                          ease: [0.22, 1, 0.36, 1] as const,
                          delay: 0.3 + index * 0.2,
                        },
                      },
                    }}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className={`glass glass-hover group rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1 sm:p-8 ${
                      isPrimary ? "hover:border-primary/40" : "hover:border-purple/40"
                    }`}
                  >
                    <div className="mb-4">
                      <h3 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl">
                        {edu.institution}
                      </h3>
                      <p className="text-sm font-medium text-foreground/60 sm:text-base">
                        {edu.degree}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <span
                        className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                          isPrimary
                            ? "border-primary/20 bg-primary/10 text-primary"
                            : "border-purple/20 bg-purple/10 text-purple"
                        }`}
                      >
                        {edu.duration}
                      </span>
                      <span className="rounded-full border border-glass-border bg-surface-light px-3 py-1.5 text-xs font-semibold text-foreground/80">
                        {edu.score}
                      </span>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
