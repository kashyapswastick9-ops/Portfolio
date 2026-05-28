"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypeWriterProps {
  words: string[];
  /** ms per character typed */
  typingSpeed?: number;
  /** ms per character deleted */
  deletingSpeed?: number;
  /** ms to pause on completed word */
  pauseDuration?: number;
  className?: string;
}

export default function TypeWriter({
  words,
  typingSpeed = 80,
  deletingSpeed = 45,
  pauseDuration = 2000,
  className = "",
}: TypeWriterProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const currentWord = words[wordIndex];

  const tick = useCallback(() => {
    if (!isDeleting) {
      // typing
      const next = currentWord.slice(0, text.length + 1);
      setText(next);

      if (next === currentWord) {
        // finished typing — pause then start deleting
        setTimeout(() => setIsDeleting(true), pauseDuration);
        return;
      }
    } else {
      // deleting
      const next = currentWord.slice(0, text.length - 1);
      setText(next);

      if (next === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
        return;
      }
    }
  }, [text, isDeleting, currentWord, words.length, pauseDuration]);

  useEffect(() => {
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, deletingSpeed, typingSpeed]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={text}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          className="inline"
        >
          {text}
        </motion.span>
      </AnimatePresence>
      {/* Blinking cursor */}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="ml-0.5 inline-block h-[1.1em] w-[3px] translate-y-[0.05em] rounded-full bg-primary"
      />
    </span>
  );
}
