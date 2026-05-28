"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import GlowCard from "./GlowCard";
import SectionHeading from "./SectionHeading";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  },
});

export default function ContactSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    // Simulate network request
    setTimeout(() => {
      setStatus("success");
      setFormState({ name: "", email: "", message: "" });
      
      // Reset after 3s
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("kashyapswastick9@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* Background blobs */}
      <div className="pointer-events-none absolute -bottom-20 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/[0.04] blur-[100px]" />

      <div className="section-container relative z-10">
        {/* ── Section Heading ── */}
        <SectionHeading number="07" subtitle="Get In Touch" title="Contact Me" />

        {/* ── Contact Content ── */}
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
          {/* ═══ Left Side: Info Cards ═══ */}
          <motion.div
            variants={fadeUp(0.2)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col gap-6"
          >
            <div>
              <h3 className="mb-4 text-2xl font-bold text-foreground">
                Let&apos;s talk about everything!
              </h3>
              <p className="mb-8 text-base leading-relaxed text-foreground/60">
                I&apos;m currently looking for new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
              </p>
            </div>

            {/* Email Card (Click to Copy) */}
            <div 
              onClick={copyEmail}
              className="glass glass-hover group relative flex cursor-pointer items-center gap-5 rounded-xl border border-glass-border p-5 transition-all hover:border-primary/40"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </span>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-foreground/40">Mail Me</p>
                <p className="text-base font-semibold text-foreground">kashyapswastick9@gmail.com</p>
              </div>
              
              {/* Copied Toast Overlay */}
              <AnimatePresence>
                {copied && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="absolute right-5 flex items-center gap-1.5 rounded-md bg-green-500/20 px-3 py-1 text-xs font-bold text-green-500"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    Copied!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Location Card */}
              <div className="glass flex flex-col items-center justify-center gap-3 rounded-xl border border-glass-border p-5 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan/10 text-cyan">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Location</p>
                  <p className="text-sm font-semibold text-foreground">New Delhi, India</p>
                </div>
              </div>

              {/* Social Links */}
              <div className="glass flex flex-col items-center justify-center gap-4 rounded-xl border border-glass-border p-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Socials</p>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/swastickkashyap"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-light text-foreground transition-colors hover:bg-white hover:text-black"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com/in/swastickkashyap"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-light text-foreground transition-colors hover:bg-[#0A66C2] hover:text-white"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ═══ Right Side: Form ═══ */}
          <motion.div
            variants={fadeUp(0.3)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <GlowCard className="p-6 sm:p-8">
              <div className="mb-6">
                <h4 className="text-xl font-bold text-foreground">Send a Message</h4>
                <p className="text-sm text-foreground/50">I will get back to you within 24 hours.</p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="rounded-lg border border-glass-border bg-surface-light px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 transition-shadow focus:border-primary/50 focus:bg-surface focus:outline-none focus:ring-1 focus:ring-primary/50"
                    placeholder="Your Name"
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="rounded-lg border border-glass-border bg-surface-light px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 transition-shadow focus:border-primary/50 focus:bg-surface focus:outline-none focus:ring-1 focus:ring-primary/50"
                    placeholder="Email Address"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="resize-none rounded-lg border border-glass-border bg-surface-light px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 transition-shadow focus:border-primary/50 focus:bg-surface focus:outline-none focus:ring-1 focus:ring-primary/50"
                    placeholder="What's on your mind?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className="group relative mt-2 inline-flex h-12 w-full items-center justify-center overflow-hidden rounded-lg bg-primary px-7 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-80"
                >
                  <AnimatePresence mode="wait">
                    {status === "idle" && (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                      >
                        Send Message
                        <svg className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                      </motion.div>
                    )}
                    {status === "loading" && (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      >
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      </motion.div>
                    )}
                    {status === "success" && (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 text-green-300"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        Message Sent!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </form>
            </GlowCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
