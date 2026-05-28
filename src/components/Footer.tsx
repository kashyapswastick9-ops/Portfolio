"use client";

import { motion } from "framer-motion";

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  {
    name: "GitHub",
    url: "https://github.com/swastickkashyap",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/swastickkashyap",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ),
  },
  {
    name: "LeetCode",
    url: "#",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.956-.207a1.384 1.384 0 0 0-.207-1.953l-3.5-2.831c-2.23-1.805-5.914-1.503-7.74.453l-2.022 2.165a2.127 2.127 0 0 0-.411 2.215c.34.809 1.137 1.344 1.996 1.455.08.01.161.016.241.016.945 0 1.848-.396 2.518-1.111l4.471-4.786a1.374 1.374 0 0 0 .041-1.895l-5.405-5.787a1.374 1.374 0 0 0-.961-.438h.001Z"/>
      </svg>
    ),
  },
  {
    name: "Codeforces",
    url: "#",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5v-15c0-.828.672-1.5 1.5-1.5h3zm9 7.5c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5v-7.5c0-.828.672-1.5 1.5-1.5h3z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-glass-border bg-surface-light/50 backdrop-blur-md">
      {/* Subtle top border gradient glow */}
      <div className="absolute left-0 right-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="section-container py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-3 md:items-center">
          
          {/* ═══ Left: Branding ═══ */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <a href="#" className="group relative mb-2 inline-block">
              <span className="text-2xl font-extrabold tracking-tight">
                <span className="text-gradient">S</span>
                <span className="text-gradient-primary">K</span>
                <span className="text-gradient">K</span>
              </span>
            </a>
            <p className="text-sm font-medium text-foreground/60">
              Building things that matter.
            </p>
          </div>

          {/* ═══ Center: Quick Links ═══ */}
          <div className="flex justify-center gap-8">
            {quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-foreground/60 transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* ═══ Right: Social Icons ═══ */}
          <div className="flex justify-center gap-4 md:justify-end">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                title={social.name}
                className="interactive-hover group relative flex h-10 w-10 items-center justify-center rounded-full bg-surface text-foreground/70 transition-colors hover:text-white"
              >
                <span className="absolute inset-0 rounded-full bg-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute inset-0 rounded-full opacity-0 shadow-[0_0_15px_var(--primary-glow)] transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative z-10">{social.icon}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-glass-border pt-8 text-center md:flex-row md:text-left">
          <p className="text-xs text-foreground/40">
            &copy; {new Date().getFullYear()} Swastick Kumar Kashyap. All rights reserved.
          </p>
          <p className="mt-2 text-xs text-foreground/40 md:mt-0">
            Built with <span className="font-semibold text-foreground/60">Next.js</span> & <span className="font-semibold text-foreground/60">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
