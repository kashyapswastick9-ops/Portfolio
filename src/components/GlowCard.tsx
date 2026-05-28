"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  /** Extra gradient colors — defaults to primary→purple→cyan */
  gradientColors?: string;
}

export default function GlowCard({
  children,
  className = "",
  gradientColors = "var(--primary), var(--purple), var(--cyan)",
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`glow-card group relative overflow-hidden rounded-xl ${className}`}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Animated gradient border layer */}
      <div
        className="pointer-events-none absolute -inset-[1px] rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, ${gradientColors}, ${gradientColors.split(",")[0]})`,
          animationName: "gradient-rotate",
          animationDuration: "4s",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          backgroundSize: "200% 200%",
        }}
      />

      {/* Mouse-follow glow spotlight */}
      <div
        className="pointer-events-none absolute -inset-[1px] rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isHovered
            ? `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.15), transparent 60%)`
            : "none",
        }}
      />

      {/* Inner card content — sits above the border layers */}
      <div className="relative z-10 rounded-[11px] bg-surface p-6 transition-colors duration-300 group-hover:bg-surface-light">
        {children}
      </div>
    </motion.div>
  );
}
