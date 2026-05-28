"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import GlowCard from "./GlowCard";
import SectionHeading from "./SectionHeading";

interface Achievement {
  title: string;
  description: string;
  date: string;
  icon: React.ReactNode;
}

const achievements: Achievement[] = [
  {
    title: "Knight on LeetCode",
    description: "Maintained a contest rating in the top 5% globally, solving 600+ algorithmic challenges.",
    date: "2023 - Present",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "Rtemis Hackathon Finalist",
    description: "Successfully reached the final round of the Rtemis Hackathon.",
    date: "2024",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.36c-5.91.54-9.11-5.1-7.39-10.11a6 6 0 0110.11-2.42 10.36 10.36 0 004.92 6.67c1.3.69 2.5 1.83 2.5 3.39" />
      </svg>
    ),
  },
  {
    title: "Elite Hack 2.0 Finalist",
    description: "Competed as a finalist in Elite Hack 2.0, building innovative solutions under time constraints.",
    date: "2024",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
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

export default function AchievementsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* Background blobs */}
      <div className="pointer-events-none absolute right-0 top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-primary/[0.04] blur-[100px]" />

      <div className="section-container">
        {/* ── Section Heading ── */}
        <SectionHeading number="05" subtitle="Milestones" title="Achievements" />

        {/* ── Achievements Grid ── */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement, i) => (
            <motion.div
              key={achievement.title}
              variants={fadeUp(0.2 + i * 0.1)}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="h-full"
            >
              <GlowCard className="h-full">
                <div className="flex flex-col h-full">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      {achievement.icon}
                    </span>
                    <span className="rounded-full border border-glass-border bg-surface-light px-3 py-1 text-xs font-medium text-foreground/50">
                      {achievement.date}
                    </span>
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-foreground">
                    {achievement.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground/60">
                    {achievement.description}
                  </p>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
