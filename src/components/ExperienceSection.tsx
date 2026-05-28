"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import SectionHeading from "./SectionHeading";

/* ── Experience data ── */
interface Experience {
  company: string;
  role: string;
  period: string;
  bullets: string[];
  tech: string[];
  color: "primary" | "purple";
}

const experiences: Experience[] = [
  {
    company: "Arvora",
    role: "Full Stack Developer Intern",
    period: "2024",
    bullets: [
      "Developed frontend features for an e-commerce platform selling healthy food products",
      "Built responsive product showcase pages, shopping cart functionality, and delivery tracking modules",
      "Integrated APIs for product and order management",
      "Improved UI responsiveness and overall user experience",
    ],
    tech: ["React.js", "JavaScript", "HTML", "CSS", "REST APIs", "Git"],
    color: "primary",
  },
  {
    company: "Valoir",
    role: "SDE Intern",
    period: "2023",
    bullets: [
      "Worked on UI/UX design and frontend improvements for the company application and website",
      "Assisted in social media marketing and branding initiatives",
      "Contributed to website updates and overall startup product development",
      "Collaborated across design, development, and operational workflows",
    ],
    tech: ["HTML", "CSS", "JavaScript", "UI/UX Design"],
    color: "purple",
  },
];

/* ── Animation helpers ── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  },
});

/* ── Single timeline card ── */
function TimelineCard({
  exp,
  index,
}: {
  exp: Experience;
  index: number;
}) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });

  const isLeft = index % 2 === 0; // even = left on desktop

  const slideVariant = {
    hidden: { opacity: 0, x: isLeft ? -60 : 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1] as const,
        delay: 0.15,
      },
    },
  };

  const accentColor =
    exp.color === "primary"
      ? {
          border: "border-primary/20 hover:border-primary/50",
          dot: "bg-primary shadow-[0_0_12px_var(--primary-glow)]",
          badge: "border-primary/20 bg-primary/[0.07] text-primary/80",
          icon: "text-primary bg-primary/10",
          glow: "via-primary/30",
        }
      : {
          border: "border-purple/20 hover:border-purple/50",
          dot: "bg-purple shadow-[0_0_12px_var(--purple-glow)]",
          badge: "border-purple/20 bg-purple/[0.07] text-purple/80",
          icon: "text-purple bg-purple/10",
          glow: "via-purple/30",
        };

  return (
    <div
      ref={cardRef}
      className={`relative grid grid-cols-[24px_1fr] gap-5 md:grid-cols-[1fr_48px_1fr] md:gap-0`}
    >
      {/* ═══ Desktop: left content or spacer ═══ */}
      <div
        className={`hidden md:block ${
          isLeft ? "md:pr-10" : ""
        }`}
      >
        {isLeft && (
          <motion.div
            variants={slideVariant}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <CardContent exp={exp} accentColor={accentColor} align="right" />
          </motion.div>
        )}
      </div>

      {/* ═══ Center timeline stem + dot ═══ */}
      <div className="relative flex justify-center md:mx-auto">
        {/* Glowing dot */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{
            type: "spring" as const,
            stiffness: 350,
            damping: 20,
            delay: 0.1,
          }}
          className={`relative z-10 mt-1 h-4 w-4 shrink-0 rounded-full ${accentColor.dot} ring-4 ring-background`}
        />
      </div>

      {/* ═══ Desktop: right content or spacer ═══ */}
      <div
        className={`hidden md:block ${
          !isLeft ? "md:pl-10" : ""
        }`}
      >
        {!isLeft && (
          <motion.div
            variants={slideVariant}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <CardContent exp={exp} accentColor={accentColor} align="left" />
          </motion.div>
        )}
      </div>

      {/* ═══ Mobile: always right of the line ═══ */}
      <div className="md:hidden">
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 30 },
            visible: {
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1] as const,
                delay: 0.15,
              },
            },
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <CardContent exp={exp} accentColor={accentColor} align="left" />
        </motion.div>
      </div>
    </div>
  );
}

/* ── Card inner content ── */
function CardContent({
  exp,
  accentColor,
  align,
}: {
  exp: Experience;
  accentColor: Record<string, string>;
  align: "left" | "right";
}) {
  return (
    <div
      className={`glass glass-hover group relative overflow-hidden rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20 sm:p-6 ${accentColor.border}`}
    >
      {/* Top edge glow */}
      <span
        className={`absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent ${accentColor.glow} to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
      />

      {/* Header */}
      <div className={`mb-4 flex flex-col ${align === "right" ? "items-end text-right" : ""}`}>
        <div className="mb-1 flex items-center gap-2">
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${accentColor.icon}`}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
              />
            </svg>
          </span>
          <div>
            <h3 className="text-base font-bold text-foreground sm:text-lg">
              {exp.company}
            </h3>
            <p className="text-xs font-medium text-foreground/40">
              {exp.role}
            </p>
          </div>
        </div>
        <span className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-glass-border bg-surface-light/50 px-3 py-0.5 text-[11px] font-medium text-foreground/35">
          <svg
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
            />
          </svg>
          {exp.period}
        </span>
      </div>

      {/* Bullet points */}
      <ul className={`mb-5 space-y-2 ${align === "right" ? "text-right" : ""}`}>
        {exp.bullets.map((bullet, i) => (
          <li
            key={i}
            className={`flex items-start gap-2 text-[13px] leading-relaxed text-foreground/50 ${
              align === "right" ? "flex-row-reverse" : ""
            }`}
          >
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground/20" />
            {bullet}
          </li>
        ))}
      </ul>

      {/* Tech badges */}
      <div
        className={`flex flex-wrap gap-1.5 ${
          align === "right" ? "justify-end" : ""
        }`}
      >
        {exp.tech.map((t) => (
          <span
            key={t}
            className={`rounded-md border px-2.5 py-1 text-[11px] font-medium ${accentColor.badge}`}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Main section ── */
export default function ExperienceSection() {
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
      id="experience"
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* Background blob */}
      <div className="pointer-events-none absolute right-0 top-1/4 h-[450px] w-[450px] translate-x-1/3 rounded-full bg-primary/[0.03] blur-[100px]" />

      <div className="section-container">
        {/* ── Section Heading ── */}
        <SectionHeading number="02" subtitle="Where I've worked" title="Experience" />

        {/* ── Timeline ── */}
        <div ref={lineContainerRef} className="relative">
          {/* ── Vertical line — mobile: left, desktop: center ── */}
          <div className="absolute left-[11px] top-0 h-full w-px bg-glass-border md:left-1/2 md:-translate-x-1/2">
            {/* Animated glow fill */}
            <motion.div
              className="w-full rounded-full bg-gradient-to-b from-primary via-purple to-cyan"
              style={{ height: lineHeight }}
            />
          </div>

          {/* ── Cards ── */}
          <div className="relative flex flex-col gap-12 md:gap-16">
            {experiences.map((exp, i) => (
              <TimelineCard key={exp.company} exp={exp} index={i} />
            ))}
          </div>

          {/* Terminal dot at bottom of line */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{
              type: "spring" as const,
              stiffness: 300,
              damping: 20,
              delay: 0.6,
            }}
            className="absolute -bottom-3 left-[7px] z-10 h-3 w-3 rounded-full border-2 border-cyan bg-background shadow-[0_0_10px_var(--cyan-glow)] md:left-1/2 md:-translate-x-1/2"
          />
        </div>
      </div>
    </section>
  );
}
