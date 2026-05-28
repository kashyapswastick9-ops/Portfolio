"use client";

import useCountUp from "@/hooks/useCountUp";

interface StatCardProps {
  value: number;
  suffix?: string;
  label: string;
  decimals?: number;
  icon: React.ReactNode;
}

export default function StatCard({ value, suffix = "", label, decimals = 0, icon }: StatCardProps) {
  const counter = useCountUp({ end: value, duration: 2200, decimals });

  return (
    <div
      ref={counter.ref as React.RefObject<HTMLDivElement>}
      className="glass glass-hover group relative flex flex-col gap-1.5 rounded-xl p-4 transition-all duration-300"
    >
      {/* Subtle top-edge glow on hover */}
      <span className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-200 group-hover:bg-primary/20">
          {icon}
        </span>
        <div className="min-w-0">
          <p className="text-xl font-bold tracking-tight text-foreground">
            {counter.value}
            {suffix && <span className="text-primary">{suffix}</span>}
          </p>
          <p className="truncate text-xs text-foreground/40">{label}</p>
        </div>
      </div>
    </div>
  );
}
