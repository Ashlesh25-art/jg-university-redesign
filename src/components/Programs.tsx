"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  Briefcase,
  Code2,
  FlaskConical,
  GraduationCap,
  Palette,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const programs: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "Engineering & Technology",
    description: "Hands-on innovation with future-ready engineering pathways.",
    icon: Code2,
  },
  {
    title: "Business & Management",
    description: "Leadership-focused programs designed for global impact.",
    icon: Briefcase,
  },
  {
    title: "Liberal Arts",
    description: "Interdisciplinary learning that fuels creativity and vision.",
    icon: Palette,
  },
  {
    title: "Pure Sciences",
    description: "Advanced labs and research mentoring for scientific minds.",
    icon: FlaskConical,
  },
  {
    title: "Education & Teaching",
    description: "Empowering future educators with practical pedagogy.",
    icon: GraduationCap,
  },
  {
    title: "Humanities",
    description: "Explore culture, language, and the human experience.",
    icon: BookOpen,
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

export default function Programs() {
  return (
    <section
      id="programs"
      className="relative scroll-mt-24 overflow-hidden bg-white py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0 pattern-grid opacity-15" />
      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
            Our Programs
          </div>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            Programs Built for the Future
          </h2>
          <p className="mt-3 text-base text-slate-600 sm:text-lg">
            Choose from industry-aligned degrees designed for career growth and
            global relevance.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <motion.div
                key={program.title}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 120, damping: 16 }}
                className="group relative"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-amber-300/30 opacity-0 blur transition group-hover:opacity-100" />
                <div className="glass-card relative h-full rounded-2xl p-8 shadow-lg ring-1 ring-slate-200/60 backdrop-blur transition group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:ring-blue-500/50">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-slate-900">
                    {program.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600">
                    {program.description}
                  </p>
                  <a
                    href="#admissions"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-500"
                  >
                    View Details
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
