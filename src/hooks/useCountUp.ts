"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseCountUpOptions {
  /** Final number to count to */
  end: number;
  /** Duration in ms (default 2000) */
  duration?: number;
  /** Start number (default 0) */
  start?: number;
  /** Decimal places (default 0) */
  decimals?: number;
  /** Only animate when scrolled into view (default true) */
  scrollTrigger?: boolean;
}

/**
 * Returns a ref to attach to the container element and the
 * current animated number value.
 */
export default function useCountUp({
  end,
  duration = 2000,
  start = 0,
  decimals = 0,
  scrollTrigger = true,
}: UseCountUpOptions): { ref: React.RefObject<HTMLElement | null>; value: string } {
  const ref = useRef<HTMLElement | null>(null);
  const [value, setValue] = useState(start);
  const hasAnimated = useRef(false);

  const animate = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    const range = end - start;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(start + range * eased);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setValue(end);
      }
    };

    requestAnimationFrame(step);
  }, [start, end, duration]);

  useEffect(() => {
    if (!scrollTrigger) {
      animate();
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [scrollTrigger, animate]);

  return {
    ref,
    value: value.toFixed(decimals),
  };
}
