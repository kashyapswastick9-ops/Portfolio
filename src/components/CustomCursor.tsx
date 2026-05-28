"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true); // default true to prevent flash

  /* ── Raw mouse position ── */
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  /* ── Spring-smoothed position ── */
  const springConfig = { stiffness: 500, damping: 28, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  /* ── Detect touch devices ── */
  useEffect(() => {
    const hasTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    setIsTouchDevice(hasTouch);
  }, []);

  /* ── Track mouse position ── */
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    },
    [mouseX, mouseY, isVisible]
  );

  /* ── Mouse leave / enter window ── */
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);
  const handleMouseEnter = useCallback(() => setIsVisible(true), []);

  useEffect(() => {
    if (isTouchDevice) return;

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isTouchDevice, handleMouseMove, handleMouseLeave, handleMouseEnter]);

  /* ── Detect hovering over interactive elements ── */
  useEffect(() => {
    if (isTouchDevice) return;

    const handleHoverDetection = () => {
      const interactiveSelectors =
        "a, button, [role='button'], input, textarea, select, .interactive-hover, .glow-card";

      const handleOver = (e: Event) => {
        const target = e.target as HTMLElement;
        if (target.closest(interactiveSelectors)) {
          setIsHovering(true);
        }
      };

      const handleOut = (e: Event) => {
        const target = e.target as HTMLElement;
        if (target.closest(interactiveSelectors)) {
          setIsHovering(false);
        }
      };

      document.addEventListener("mouseover", handleOver, { passive: true });
      document.addEventListener("mouseout", handleOut, { passive: true });

      return () => {
        document.removeEventListener("mouseover", handleOver);
        document.removeEventListener("mouseout", handleOut);
      };
    };

    const cleanup = handleHoverDetection();
    return cleanup;
  }, [isTouchDevice]);

  /* ── Don't render on touch devices ── */
  if (isTouchDevice) return null;

  return (
    <>
      {/* ── Outer ring (glow) ── */}
      <motion.div
        id="custom-cursor-ring"
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 48 : 36,
          height: isHovering ? 48 : 36,
          opacity: isVisible ? 1 : 0,
          borderWidth: isHovering ? 2 : 1.5,
          borderColor: isHovering
            ? "rgba(139, 92, 246, 0.6)"
            : "rgba(59, 130, 246, 0.3)",
        }}
        transition={{
          width: { type: "spring", stiffness: 300, damping: 20 },
          height: { type: "spring", stiffness: 300, damping: 20 },
          opacity: { duration: 0.15 },
          borderColor: { duration: 0.2 },
        }}
        initial={{
          width: 36,
          height: 36,
          opacity: 0,
          borderWidth: 1.5,
          borderColor: "rgba(59, 130, 246, 0.3)",
          borderStyle: "solid",
        }}
      />

      {/* ── Inner dot (core) ── */}
      <motion.div
        id="custom-cursor-dot"
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 8 : 6,
          height: isHovering ? 8 : 6,
          opacity: isVisible ? 1 : 0,
          backgroundColor: isHovering
            ? "rgb(139, 92, 246)"
            : "rgb(59, 130, 246)",
          boxShadow: isHovering
            ? "0 0 16px 4px rgba(139, 92, 246, 0.5), 0 0 40px 8px rgba(139, 92, 246, 0.2)"
            : "0 0 10px 2px rgba(59, 130, 246, 0.4), 0 0 30px 6px rgba(59, 130, 246, 0.15)",
        }}
        transition={{
          width: { type: "spring", stiffness: 400, damping: 25 },
          height: { type: "spring", stiffness: 400, damping: 25 },
          opacity: { duration: 0.15 },
          backgroundColor: { duration: 0.2 },
          boxShadow: { duration: 0.25 },
        }}
        initial={{
          width: 6,
          height: 6,
          opacity: 0,
          backgroundColor: "rgb(59, 130, 246)",
          boxShadow:
            "0 0 10px 2px rgba(59, 130, 246, 0.4), 0 0 30px 6px rgba(59, 130, 246, 0.15)",
        }}
      />
    </>
  );
}
