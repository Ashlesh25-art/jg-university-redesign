"use client";

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

// ─── Types ──────────────────────────────────────────────────────────────────

interface CardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  /** Apply glassmorphism background (default: true) */
  glass?: boolean;
  /** Lift card on hover (default: true) */
  hover?: boolean;
  /** Show animated gradient glow on hover (default: false) */
  glow?: boolean;
  /** Animate card in when it enters the viewport (default: false) */
  animate?: boolean;
  /** Stagger delay in seconds for animated cards (default: 0) */
  delay?: number;
}

// ─── Framer-motion animation variants ───────────────────────────────────────

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// ─── Component ──────────────────────────────────────────────────────────────

/**
 * Reusable Card with glassmorphism, hover lift, gradient glow,
 * and optional scroll-triggered entry animation.
 *
 * Works in both light and dark mode via .glass-card CSS class.
 */
export function Card({
  children,
  glass = true,
  hover = true,
  glow = false,
  animate = false,
  delay = 0,
  className = "",
  ...props
}: CardProps) {
  // Build the combined class string
  const baseClass = [
    "relative rounded-2xl transition",
    glass ? "glass-card shadow-lg ring-1 ring-slate-200/60 dark:ring-slate-700/60" : "",
    hover ? "hover:-translate-y-1 hover:shadow-2xl" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Inner glow layer (only rendered when glow=true)
  const glowLayer = glow ? (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-amber-300/20 opacity-0 blur transition-opacity duration-300 group-hover:opacity-100"
    />
  ) : null;

  // Use a single motion element to avoid prop type conflicts.
  const motionConfig = animate
    ? {
        variants: cardVariants,
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.5, delay },
      }
    : { initial: false };

  return (
    <motion.div className={baseClass} {...motionConfig} {...props}>
      {glowLayer}
      {children}
    </motion.div>
  );
}
