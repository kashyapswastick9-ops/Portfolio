"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SectionHeadingProps {
  number: string;
  subtitle: string;
  title: string;
}

export default function SectionHeading({ number, subtitle, title }: SectionHeadingProps) {
  const headingRef = useRef(null);
  const isInView = useInView(headingRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={headingRef}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
        },
      }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative mb-16 text-center md:text-left"
    >
      {/* Large Background Number */}
      <span className="absolute -left-4 -top-8 -z-10 select-none text-[80px] font-black leading-none text-foreground/[0.03] sm:-left-6 sm:-top-12 sm:text-[120px]">
        {number}
      </span>

      <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-primary/70">
        {subtitle}
      </p>
      <h2 className="relative inline-block text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
        {title}
        {/* Animated underline gradient */}
        <span className="absolute -bottom-2 left-0 h-[3px] w-full overflow-hidden rounded-full">
          <motion.span
            className="block h-full w-full rounded-full bg-gradient-to-r from-primary via-purple to-cyan"
            initial={{ scaleX: 0, originX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
          />
        </span>
      </h2>
    </motion.div>
  );
}
