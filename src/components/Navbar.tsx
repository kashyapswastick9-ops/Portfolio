"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const sectionIds = navLinks.map((l) => l.href.replace("#", ""));

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  /* ── scroll progress bar ── */
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  /* ── active section observer ── */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* ── scroll state ── */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── smooth scroll handler ── */
  const scrollTo = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveSection(id);
      }
      setMobileMenuOpen(false);
    },
    []
  );

  return (
    <>
      {/* ── Scroll Progress Bar ── */}
      <motion.div
        id="scroll-progress"
        className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left"
        style={{
          scaleX,
          background: "var(--gradient-full)",
        }}
      />

      {/* ── Navbar ── */}
      <motion.nav
        id="navbar"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass-strong shadow-lg shadow-black/30"
            : "bg-transparent"
        }`}
      >
        <div className="section-container flex h-16 items-center justify-between md:h-[72px]">
          {/* ── Logo ── */}
          <a
            href="#"
            id="nav-logo"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group relative z-10 select-none"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="relative"
            >
              {/* Glow behind the logo */}
              <span className="absolute -inset-2 -z-10 rounded-lg bg-primary/20 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
              <span className="text-2xl font-extrabold tracking-tight">
                <span className="text-gradient">S</span>
                <span className="text-gradient-primary">K</span>
                <span className="text-gradient">K</span>
              </span>
              {/* Underline glow */}
              <span className="absolute -bottom-1 left-0 h-[2px] w-full scale-x-0 rounded-full bg-gradient-to-r from-primary via-purple to-cyan transition-transform duration-300 group-hover:scale-x-100" />
            </motion.div>
          </a>

          {/* ── Desktop Nav Links ── */}
          <div className="hidden items-center gap-0.5 md:flex">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  id={`nav-link-${link.label.toLowerCase()}`}
                  onClick={(e) => scrollTo(e, link.href)}
                  className={`interactive-hover relative rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-primary"
                      : "text-foreground/50 hover:text-foreground/90"
                  }`}
                >
                  {link.label}

                  {/* Active indicator dot */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-indicator"
                      className="absolute -bottom-0.5 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-primary shadow-[0_0_8px_var(--primary-glow)]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </a>
              );
            })}

            {/* ── CTA Button ── */}
            <a
              href="#contact"
              id="nav-cta"
              onClick={(e) => scrollTo(e, "#contact")}
              className="interactive-hover ml-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-[13px] font-semibold text-primary transition-all duration-200 hover:border-primary/60 hover:bg-primary/20 hover:shadow-md hover:shadow-primary/10"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Let&apos;s Talk
            </a>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="interactive-hover relative z-10 flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-white/5 md:hidden"
            aria-label="Toggle menu"
          >
            <div className="flex w-5 flex-col gap-[5px]">
              <motion.span
                animate={
                  mobileMenuOpen
                    ? { rotate: 45, y: 7 }
                    : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="block h-[2px] w-full rounded-full bg-foreground"
              />
              <motion.span
                animate={
                  mobileMenuOpen
                    ? { opacity: 0, scaleX: 0 }
                    : { opacity: 1, scaleX: 1 }
                }
                transition={{ duration: 0.2 }}
                className="block h-[2px] w-full rounded-full bg-foreground"
              />
              <motion.span
                animate={
                  mobileMenuOpen
                    ? { rotate: -45, y: -7 }
                    : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="block h-[2px] w-full rounded-full bg-foreground"
              />
            </div>
          </button>
        </div>

        {/* ── Mobile Menu Slide-Down ── */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-glass-border md:hidden"
            >
              <div className="glass-strong flex flex-col gap-1 px-6 py-4">
                {navLinks.map((link, i) => {
                  const isActive =
                    activeSection === link.href.replace("#", "");
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => scrollTo(e, link.href)}
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                      className={`interactive-hover flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-foreground/60 hover:bg-white/5 hover:text-foreground"
                      }`}
                    >
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_6px_var(--primary-glow)]" />
                      )}
                      {link.label}
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
