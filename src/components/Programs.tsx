"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Briefcase, Code2, FlaskConical, GraduationCap, Microscope } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "@/src/components/ui/Card";
import { useIntersectionObserver } from "@/src/hooks/useIntersectionObserver";

// ─── Types ──────────────────────────────────────────────────────────────────

interface Program {
  /** Unique program identifier */
  id: string;
  /** Display name of the program */
  title: string;
  /** Short degree label e.g. "B.Tech" */
  degree: string;
  /** Brief description of the program */
  description: string;
  /** Duration */
  duration: string;
  /** Lucide icon component */
  icon: LucideIcon;
  /** Tailwind gradient for icon bg */
  gradient: string;
}

// ─── Sample data ─────────────────────────────────────────────────────────────

const programs: Program[] = [
  {
    id: "btech",
    title: "Bachelor of Engineering (B.Tech)",
    degree: "B.Tech",
    description:
      "Hands-on innovation with future-ready engineering pathways across CS, Mechanical, Civil, and Electronics.",
    duration: "4 Years",
    icon: Code2,
    gradient: "from-blue-500/20 to-cyan-500/10",
  },
  {
    id: "mba",
    title: "Master of Business Administration (MBA)",
    degree: "MBA",
    description:
      "Leadership-focused curriculum designed for global impact, with specialisations in Finance, Marketing, and Strategy.",
    duration: "2 Years",
    icon: Briefcase,
    gradient: "from-purple-500/20 to-pink-500/10",
  },
  {
    id: "bsc",
    title: "Bachelor of Science (B.Sc)",
    degree: "B.Sc",
    description:
      "Advanced labs and expert mentoring for Physics, Chemistry, Mathematics, and Biotechnology.",
    duration: "3 Years",
    icon: FlaskConical,
    gradient: "from-emerald-500/20 to-teal-500/10",
  },
  {
    id: "ba",
    title: "Bachelor of Arts (BA)",
    degree: "BA",
    description:
      "Interdisciplinary learning that fuels creativity, critical thinking, and vision across humanities and social sciences.",
    duration: "3 Years",
    icon: BookOpen,
    gradient: "from-amber-500/20 to-orange-500/10",
  },
  {
    id: "mca",
    title: "Master of Computer Applications (MCA)",
    degree: "MCA",
    description:
      "Industry-aligned postgraduate program covering advanced software engineering, AI, and cloud computing.",
    duration: "2 Years",
    icon: Microscope,
    gradient: "from-indigo-500/20 to-blue-500/10",
  },
  {
    id: "phd",
    title: "Ph.D. Programs",
    degree: "Ph.D.",
    description:
      "Research-intensive doctoral programs across all disciplines, guided by world-class faculty and industry mentors.",
    duration: "3–5 Years",
    icon: GraduationCap,
    gradient: "from-rose-500/20 to-red-500/10",
  },
];

// ─── Framer-motion variants ──────────────────────────────────────────────────

const stagger = {
  hidden:  { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.10 } },
};

const fadeInUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.5, ease: "easeOut" } },
};

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function ProgramSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="rounded-2xl border border-slate-200/60 bg-white/60 p-8 dark:border-slate-700/60 dark:bg-slate-900/60"
      role="listitem"
    >
      <div className="skeleton h-12 w-12 rounded-xl" />
      <div className="skeleton mt-5 h-5 w-3/4 rounded" />
      <div className="skeleton mt-3 h-4 w-full rounded" />
      <div className="skeleton mt-2 h-4 w-5/6 rounded" />
      <div className="skeleton mt-6 h-4 w-24 rounded" />
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function Programs() {
  // Track which card is keyboard-focused for ring highlight
  const [focusedId, setFocusedId] = useState<string | null>(null);

  // Lightweight loading state for future data fetching
  const [isLoading, setIsLoading] = useState(true);

  // Intersection observers for header + grid reveal
  const headerObserver = useIntersectionObserver<HTMLDivElement>({ threshold: 0.3 });
  const gridObserver = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2 });

  useEffect(() => {
    const id = window.setTimeout(() => setIsLoading(false), 350);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <section
      id="programs"
      aria-labelledby="programs-heading"
      className="relative scroll-mt-24 overflow-hidden bg-white py-20 lg:py-24 dark:bg-slate-950"
    >
      {/* Background grid pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 pattern-grid opacity-15 dark:opacity-10"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section header */}
        <motion.div
          ref={headerObserver.ref}
          variants={fadeInUp}
          initial="hidden"
          animate={headerObserver.isIntersecting ? "visible" : "hidden"}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">
            Our Programs
          </p>
          <h2
            id="programs-heading"
            className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white"
          >
            Programs Built for the Future
          </h2>
          <p className="mt-3 mx-auto max-w-2xl text-base text-slate-600 sm:text-lg dark:text-slate-300">
            Choose from six industry-aligned degrees — each crafted for career
            growth, research excellence, and global relevance.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          ref={gridObserver.ref}
          variants={stagger}
          initial="hidden"
          animate={gridObserver.isIntersecting ? "visible" : "hidden"}
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="Available programs"
          aria-busy={isLoading}
        >
          {isLoading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <ProgramSkeleton key={`program-skeleton-${idx}`} />
              ))
            : programs.map((program) => {
            const Icon = program.icon;
            const isFocused = focusedId === program.id;

            return (
              <motion.div
                key={program.id}
                variants={fadeInUp}
                role="listitem"
                className="group relative"
              >
                {/* Gradient glow on hover */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/25 via-purple-500/15 to-amber-300/20 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100"
                />

                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 130, damping: 16 }}
                >
                  <Card
                    glass
                    hover={false} /* hover handled by motion above */
                    className={`h-full p-8 ${
                      isFocused
                        ? "ring-2 ring-blue-500"
                        : "ring-1 ring-slate-200/60 dark:ring-slate-700/60"
                    }`}
                    aria-label={`${program.title} (${program.degree})`}
                  >
                    {/* Icon */}
                    <span
                      aria-hidden="true"
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${program.gradient} text-blue-600 dark:text-blue-300 transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="h-6 w-6" />
                    </span>

                    {/* Degree badge */}
                    <span className="mt-4 inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                      {program.degree}
                    </span>

                    {/* Title */}
                    <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
                      {program.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {program.description}
                    </p>

                    {/* Duration */}
                    <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="h-1 w-1 rounded-full bg-amber-400" aria-hidden="true" />
                      <span>Duration: {program.duration}</span>
                    </div>

                    {/* CTA link */}
                    <a
                      href="#admissions"
                      onFocus={() => setFocusedId(program.id)}
                      onBlur={() => setFocusedId(null)}
                      className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none"
                      aria-label={`Apply for ${program.title}`}
                    >
                      View Details
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </Card>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
