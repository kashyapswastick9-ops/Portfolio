"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import StatCard from "./StatCard";
import SectionHeading from "./SectionHeading";

/* ── animation variants ── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  },
});

const fadeLeft = (delay = 0) => ({
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
  },
});

const fadeRight = (delay = 0) => ({
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
  },
});

/* ── stat data ── */
const stats = [
  {
    value: 500,
    suffix: "+",
    label: "DSA Problems Solved",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    value: 2,
    suffix: "",
    label: "Internships Completed",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
    ),
  },
  {
    value: 7.94,
    suffix: "",
    label: "CGPA at DTU",
    decimals: 2,
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    value: 2,
    suffix: "",
    label: "ML Projects Built",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
];

/* ── highlight tags ── */
const highlights = [
  { label: "Full-Stack Dev", color: "primary" },
  { label: "Competitive Programming", color: "purple" },
  { label: "Machine Learning", color: "cyan" },
  { label: "System Design", color: "primary" },
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* Background accent blob */}
      <div className="pointer-events-none absolute -left-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-purple/[0.04] blur-[100px]" />

      <div className="section-container">
        {/* ── Section Heading ── */}
        <SectionHeading number="01" subtitle="Get to know me" title="About Me" />

        {/* ── Two-column Layout ── */}
        <div className="grid items-start gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
          {/* ═══ LEFT COLUMN — Photo + Stats ═══ */}
          <motion.div
            variants={fadeLeft(0.15)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col items-center gap-8 lg:items-start"
          >
            {/* Profile Photo Placeholder */}
            <div className="group relative">
              {/* Rotating gradient border */}
              <div className="absolute -inset-[3px] rounded-2xl bg-gradient-to-r from-primary via-purple to-cyan opacity-60 blur-[2px] transition-opacity duration-500 group-hover:opacity-100 animate-gradient" />

              {/* Inner frame */}
              <div className="relative h-72 w-72 overflow-hidden rounded-2xl bg-surface sm:h-80 sm:w-80">
                <Image
                  src="/profile.jpeg"
                  alt="Swastick Kumar Kashyap"
                  fill
                  className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
                  sizes="(max-width: 768px) 288px, 320px"
                />

                {/* Hover shimmer */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </div>
            </div>

            {/* ── Stat Cards Grid ── */}
            <div className="grid w-full max-w-sm grid-cols-2 gap-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp(0.3 + i * 0.1)}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  <StatCard
                    value={stat.value}
                    suffix={stat.suffix}
                    label={stat.label}
                    decimals={stat.decimals ?? 0}
                    icon={stat.icon}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ═══ RIGHT COLUMN — Text Content ═══ */}
          <motion.div
            variants={fadeRight(0.2)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col gap-6"
          >
            {/* Main paragraph */}
            <motion.p
              variants={fadeUp(0.3)}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-base leading-relaxed text-foreground/60 sm:text-lg"
            >
              I&apos;m a Computer Science Engineering student at{" "}
              <span className="font-semibold text-foreground">
                Delhi Technological University
              </span>
              , passionate about solving complex problems through code. My
              interests span full-stack development, competitive programming,
              machine learning, and building systems that scale.
            </motion.p>

            {/* Decorative quote-style line */}
            <motion.div
              variants={fadeUp(0.4)}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex gap-4"
            >
              <span className="mt-1 h-auto w-[3px] shrink-0 rounded-full bg-gradient-to-b from-primary via-purple to-cyan" />
              <p className="text-sm italic leading-relaxed text-foreground/40">
                I believe in writing clean, maintainable code and continuously
                learning new technologies. When I&apos;m not coding, you&apos;ll
                find me solving algorithmic challenges on LeetCode and
                Codeforces, or exploring the latest in AI/ML research.
              </p>
            </motion.div>

            {/* ── Interest / Highlight Tags ── */}
            <motion.div
              variants={fadeUp(0.5)}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-foreground/30">
                What I do
              </p>
              <div className="flex flex-wrap gap-2">
                {highlights.map((tag) => (
                  <span
                    key={tag.label}
                    className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors duration-200
                      ${
                        tag.color === "primary"
                          ? "border-primary/20 bg-primary/[0.06] text-primary/80 hover:border-primary/40 hover:bg-primary/10"
                          : tag.color === "purple"
                          ? "border-purple/20 bg-purple/[0.06] text-purple/80 hover:border-purple/40 hover:bg-purple/10"
                          : "border-cyan/20 bg-cyan/[0.06] text-cyan/80 hover:border-cyan/40 hover:bg-cyan/10"
                      }`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* ── Quick info grid ── */}
            <motion.div
              variants={fadeUp(0.6)}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mt-2 grid grid-cols-2 gap-x-6 gap-y-3"
            >
              {[
                { key: "Name", val: "Swastick Kumar Kashyap" },
                { key: "University", val: "DTU, New Delhi" },
                { key: "Degree", val: "B.Tech CSE" },
                { key: "Location", val: "New Delhi, India" },
              ].map((item) => (
                <div key={item.key} className="flex flex-col">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-foreground/25">
                    {item.key}
                  </span>
                  <span className="text-sm font-medium text-foreground/70">
                    {item.val}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
