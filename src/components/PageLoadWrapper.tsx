"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function PageLoadWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
          },
        },
      }}
      className="flex flex-col gap-0"
    >
      {/* 
        We wrap each direct child section in a motion.div here. 
        Alternatively, the sections themselves can handle their own in-view animations.
        The wrapper just ensures the initial page load has a nice fade-in.
      */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
