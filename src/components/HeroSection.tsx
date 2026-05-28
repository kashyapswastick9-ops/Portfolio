"use client";

import { motion } from "framer-motion";
import TypeWriter from "./TypeWriter";
import SocialIcons from "./SocialIcons";
import ParticlesBackground from "./ParticlesBackground";

/* ── Framer stagger container ── */
const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.25 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const roles = [
  "Full Stack Developer",
  "Competitive Programmer",
  "Machine Learning Enthusiast",
  "CSE Undergraduate at DTU",
];

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* ── Particles canvas ── */}
      <ParticlesBackground particleCount={55} />

      {/* ── Grid overlay ── */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-dot-grid opacity-30" />

      {/* ── Animated gradient blobs ── */}
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        {/* Primary blob — top center */}
        <motion.div
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -25, 20, 0],
            scale: [1, 1.12, 0.95, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/[0.07] blur-[100px]"
        />
        {/* Purple blob — right */}
        <motion.div
          animate={{
            x: [0, -50, 30, 0],
            y: [0, 35, -20, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-20 top-1/3 h-[400px] w-[400px] rounded-full bg-purple/[0.06] blur-[90px]"
        />
        {/* Cyan blob — bottom left */}
        <motion.div
          animate={{
            x: [0, 30, -40, 0],
            y: [0, -30, 25, 0],
            scale: [1, 1.15, 0.92, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-16 bottom-16 h-[350px] w-[350px] rounded-full bg-cyan/[0.05] blur-[80px]"
        />
      </div>

      {/* ── Hero Content ── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="section-container relative z-10 flex flex-col items-center pt-24 text-center md:pt-28"
      >
        {/* ── Greeting badge ── */}
        <motion.div variants={fadeUp} className="mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Available for opportunities
          </span>
        </motion.div>

        {/* ── Name ── */}
        <motion.h1
          variants={fadeUp}
          className="mb-4 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="text-gradient">Swastick Kumar</span>
          <br />
          <span className="text-gradient">Kashyap</span>
        </motion.h1>

        {/* ── Typing subtitle ── */}
        <motion.div
          variants={fadeUp}
          className="mb-5 flex h-9 items-center text-lg font-medium text-foreground/70 sm:text-xl md:text-2xl"
        >
          <span className="mr-2 text-foreground/40">&gt;</span>
          <TypeWriter words={roles} typingSpeed={70} deletingSpeed={40} pauseDuration={1800} />
        </motion.div>

        {/* ── Description ── */}
        <motion.p
          variants={fadeUp}
          className="mx-auto mb-10 max-w-2xl text-sm leading-relaxed text-foreground/45 sm:text-base md:text-lg"
        >
          I am a Computer Science Engineering student passionate about software development,
          competitive programming, machine learning, and building scalable digital products.
        </motion.p>

        {/* ── CTA Buttons ── */}
        <motion.div
          variants={fadeUp}
          className="mb-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
        >
          {/* Primary — View Projects */}
          <a
            href="#projects"
            id="hero-cta-projects"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="interactive-hover group relative inline-flex h-12 items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-primary via-purple to-cyan px-7 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/30"
          >
            {/* shimmer overlay */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
            </svg>
            View Projects
          </a>

          {/* Secondary — Download Resume */}
          <a
            href="/resume.pdf"
            id="hero-cta-resume"
            target="_blank"
            rel="noopener noreferrer"
            className="interactive-hover group relative inline-flex h-12 items-center gap-2.5 rounded-full border border-foreground/15 bg-surface px-7 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/40 hover:bg-surface-light hover:text-primary"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download Resume
          </a>

          {/* Ghost — Contact Me */}
          <a
            href="#contact"
            id="hero-cta-contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="interactive-hover inline-flex h-12 items-center gap-2.5 rounded-full px-7 text-sm font-semibold text-foreground/50 transition-colors duration-300 hover:text-primary"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            Contact Me
          </a>
        </motion.div>

        {/* ── Social Icons ── */}
        <motion.div variants={fadeUp}>
          <SocialIcons />
        </motion.div>

        {/* ── Scroll-down indicator ── */}
        <motion.div
          variants={fadeUp}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 md:bottom-12"
        >
          <a
            href="#about"
            id="hero-scroll-indicator"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="interactive-hover group flex flex-col items-center gap-2 text-foreground/30 transition-colors duration-300 hover:text-primary"
            aria-label="Scroll to about section"
          >
            <span className="text-[11px] font-medium uppercase tracking-[0.15em]">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex h-9 w-5 items-start justify-center rounded-full border border-current p-1"
            >
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3], height: [4, 8, 4] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-0.5 rounded-full bg-current"
              />
            </motion.div>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
