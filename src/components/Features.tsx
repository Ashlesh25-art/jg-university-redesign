"use client";

import { motion } from "framer-motion";
import { Award, BookOpen, Briefcase, FlaskConical, Globe2, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card } from "@/src/components/ui/Card";
import { useIntersectionObserver } from "@/src/hooks/useIntersectionObserver";
import { useEffect, useState } from "react";

// ─── Types ──────────────────────────────────────────────────────────────────
interface Feature {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
}

// ─── Sample data ─────────────────────────────────────────────────────────────
const features: Feature[] = [
  {
    id: "labs",
    title: "State-of-the-Art Laboratories",
    description: "Cutting-edge research labs equipped with the latest instruments, enabling real hands-on discovery across all disciplines.",
    icon: FlaskConical,
    iconColor: "text-blue-600 dark:text-blue-300",
    iconBg: "bg-blue-600/10 dark:bg-blue-500/20",
  },
  {
    id: "industry",
    title: "Industry Partnerships",
    description: "Collaborations with 200+ top companies including Google, Infosys, and Tata for internships and live industry projects.",
    icon: Briefcase,
    iconColor: "text-purple-600 dark:text-purple-300",
    iconBg: "bg-purple-600/10 dark:bg-purple-500/20",
  },
  {
    id: "placement",
    title: "95% Placement Record",
    description: "One of India's highest placement rates with an average package of ₹8.5 LPA and top recruiters visiting campus every year.",
    icon: TrendingUp,
    iconColor: "text-emerald-600 dark:text-emerald-300",
    iconBg: "bg-emerald-600/10 dark:bg-emerald-500/20",
  },
  {
    id: "faculty-exchange",
    title: "International Faculty Exchange",
    description: "Regular exchange programs with universities in the USA, UK, and Australia, bringing a truly global perspective to campus.",
    icon: Globe2,
    iconColor: "text-amber-600 dark:text-amber-300",
    iconBg: "bg-amber-600/10 dark:bg-amber-500/20",
  },
  {
    id: "library",
    title: "Modern Library",
    description: "50,000+ books, journals, and digital resources. 24/7 e-library access and dedicated quiet study and research rooms.",
    icon: BookOpen,
    iconColor: "text-indigo-600 dark:text-indigo-300",
    iconBg: "bg-indigo-600/10 dark:bg-indigo-500/20",
  },
  {
    id: "sports",
    title: "Sports & Cultural Facilities",
    description: "World-class sports complex, 30+ clubs, annual cultural fest, and vibrant student life that nurtures all-round growth.",
    icon: Award,
    iconColor: "text-rose-600 dark:text-rose-300",
    iconBg: "bg-rose-600/10 dark:bg-rose-500/20",
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────
const stagger = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.10 } },
};
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ─── Component ───────────────────────────────────────────────────────────────
export default function Features() {
  const [isLoading, setIsLoading] = useState(true);
  const headerObserver = useIntersectionObserver<HTMLDivElement>({ threshold: 0.3 });
  const gridObserver = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2 });

  useEffect(() => {
    const id = window.setTimeout(() => setIsLoading(false), 350);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white py-20 lg:py-24 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 pattern-dots opacity-20 dark:opacity-10" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          ref={headerObserver.ref}
          variants={fadeInUp}
          initial="hidden"
          animate={headerObserver.isIntersecting ? "visible" : "hidden"}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-600 dark:text-purple-400">
            Why Choose Us
          </p>
          <h2 id="features-heading" className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
            Why Choose JG University
          </h2>
          <p className="mt-3 mx-auto max-w-2xl text-base text-slate-600 sm:text-lg dark:text-slate-300">
            An ecosystem built to inspire, support, and launch ambitious careers — where every student thrives.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          ref={gridObserver.ref}
          variants={stagger}
          initial="hidden"
          animate={gridObserver.isIntersecting ? "visible" : "hidden"}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="University features"
          aria-busy={isLoading}
        >
          {isLoading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <FeatureSkeleton key={`feature-skeleton-${idx}`} />
              ))
            : features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div key={feature.id} variants={fadeInUp} role="listitem" className="group">
                <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 130, damping: 16 }}>
                  <Card glass hover={false} className="h-full p-6 ring-1 ring-slate-200/60 dark:ring-slate-700/60 hover:ring-blue-400/50 transition-all duration-300">
                    <div aria-hidden="true" className={`flex h-12 w-12 items-center justify-center rounded-full ${feature.iconBg} ${feature.iconColor} transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{feature.description}</p>
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

function FeatureSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="rounded-2xl border border-slate-200/60 bg-white/60 p-6 dark:border-slate-700/60 dark:bg-slate-900/60"
      role="listitem"
    >
      <div className="skeleton h-12 w-12 rounded-full" />
      <div className="skeleton mt-5 h-5 w-3/4 rounded" />
      <div className="skeleton mt-3 h-4 w-full rounded" />
      <div className="skeleton mt-2 h-4 w-5/6 rounded" />
    </div>
  );
}
