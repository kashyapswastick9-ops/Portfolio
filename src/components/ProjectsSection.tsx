"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import GlowCard from "./GlowCard";
import SectionHeading from "./SectionHeading";

interface Project {
  title: string;
  category: "ML" | "Web" | "All";
  description: string;
  bullets: string[];
  tech: { name: string; colorClass: string }[];
  link?: string;
  github: string;
  image?: string;
  imageGradient: string;
}

const projects: Project[] = [
  {
    title: "Employee Attrition Prediction",
    category: "ML",
    description: "Machine learning models to predict employee attrition using various algorithms.",
    bullets: [
      "Built ML models to predict employee attrition using logistic regression, decision trees, and ensemble methods",
      "Performed preprocessing, feature engineering, and model evaluation",
      "Used ROC-AUC, confusion matrix, and accuracy metrics",
    ],
    tech: [
      { name: "Python", colorClass: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
      { name: "pandas", colorClass: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" },
      { name: "scikit-learn", colorClass: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
      { name: "matplotlib", colorClass: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
    ],
    github: "#",
    image: "/attrition_cover.png",
    imageGradient: "from-primary/40 to-purple/40",
  },
  {
    title: "Emojify – Facial Emotion Recognition",
    category: "ML",
    description: "CNN model for classifying facial expressions into real-time emoji predictions.",
    bullets: [
      "Built and trained a CNN model on the FER2013 dataset",
      "Classified facial expressions into 7 emotion categories",
      "Generated real-time emoji predictions using OpenCV",
    ],
    tech: [
      { name: "Python", colorClass: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
      { name: "TensorFlow", colorClass: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
      { name: "Keras", colorClass: "bg-red-500/10 text-red-400 border-red-500/20" },
      { name: "OpenCV", colorClass: "bg-green-500/10 text-green-400 border-green-500/20" },
    ],
    github: "#",
    link: "#",
    image: "/emojify_cover.png",
    imageGradient: "from-purple/40 to-cyan/40",
  },
];

const categories = ["All", "ML", "Web"];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3 },
  },
});

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projects.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* Background blobs */}
      <div className="pointer-events-none absolute -right-20 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-cyan/[0.04] blur-[100px]" />

      <div className="section-container">
        {/* ── Section Heading ── */}
        <SectionHeading number="03" subtitle="Selected Works" title="Projects" />

        {/* ── Category Filter ── */}
        <motion.div
          variants={fadeUp(0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-12 flex justify-center gap-4"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                  : "bg-surface-light text-foreground/60 hover:bg-surface hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ── Projects Grid ── */}
        <motion.div layout className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                variants={fadeUp(0.2 + i * 0.1)}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="h-full"
              >
                <GlowCard className="flex h-full flex-col !p-0">
                  {/* Image Placeholder */}
                  <div className="relative h-48 w-full overflow-hidden rounded-t-[11px]">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <>
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${project.imageGradient} opacity-80 transition-transform duration-500 group-hover:scale-110`}
                        />
                        <div className="absolute inset-0 bg-dot-grid opacity-30 mix-blend-overlay" />
                      </>
                    )}
                    
                    {/* Floating Action Links (Live/GitHub) */}
                    <div className="absolute right-4 top-4 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="interactive-hover flex h-10 w-10 items-center justify-center rounded-full bg-surface/80 text-foreground backdrop-blur-md transition-colors hover:bg-primary hover:text-white"
                        title="View Source"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                      </a>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="interactive-hover flex h-10 w-10 items-center justify-center rounded-full bg-surface/80 text-foreground backdrop-blur-md transition-colors hover:bg-primary hover:text-white"
                          title="Live Demo"
                        >
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
  
                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="mb-2 text-xl font-bold text-foreground">
                      {project.title}
                    </h3>
                    <p className="mb-4 text-sm font-medium text-foreground/50">
                      {project.description}
                    </p>
                    <ul className="mb-6 space-y-2">
                      {project.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[13px] leading-relaxed text-foreground/70">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    
                    {/* Tech stack at bottom */}
                    <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-glass-border/50">
                      {project.tech.map((t) => (
                        <span
                          key={t.name}
                          className={`rounded-md border px-2.5 py-1 text-[11px] font-medium tracking-wide ${t.colorClass}`}
                        >
                          {t.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* View More Button */}
        <motion.div
          variants={fadeUp(0.6)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16 flex justify-center"
        >
          <a
            href="https://github.com/swastickkashyap"
            target="_blank"
            rel="noopener noreferrer"
            className="interactive-hover group flex items-center gap-2 rounded-full border border-primary/30 bg-primary/[0.05] px-6 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
          >
            View More on GitHub
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
