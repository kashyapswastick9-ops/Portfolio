"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function GlobalGlow() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const springX = useSpring(0, { stiffness: 100, damping: 30 });
  const springY = useSpring(0, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      springX.set(e.clientX);
      springY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [springX, springY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[-1]"
      style={{
        background: `radial-gradient(600px circle at var(--x) var(--y), rgba(59, 130, 246, 0.04), transparent 60%)`,
      }}
      // Custom CSS properties for motion
      animate={{ "--x": `${springX.get()}px`, "--y": `${springY.get()}px` }}
    />
  );
}
