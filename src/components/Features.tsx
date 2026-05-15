"use client";

import { motion } from "framer-motion";
import {
  Award,
  Briefcase,
  Building2,
  FlaskConical,
  TrendingUp,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const features: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "World-Class Faculty",
    description: "Learn from expert mentors with global industry exposure.",
    icon: Users,
  },
  {
    title: "Modern Infrastructure",
    description: "State-of-the-art labs, libraries, and innovation spaces.",
    icon: Building2,
  },
  {
    title: "Industry Partnerships",
    description: "Collaborations with leading companies for internships.",
    icon: Briefcase,
  },
  {
    title: "Global Recognition",
    description: "Accredited programs with international visibility.",
    icon: Award,
  },
  {
    title: "Research Excellence",
    description: "Pioneering research initiatives across disciplines.",
    icon: FlaskConical,
  },
  {
    title: "Career Support",
    description: "Personalized coaching for placements and careers.",
    icon: TrendingUp,
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Features() {
  return (
    <section
      id="features"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0 pattern-dots opacity-20" />
      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-600">
            Why Choose Us
          </div>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            Why Choose JG University
          </h2>
          <p className="mt-3 text-base text-slate-600 sm:text-lg">
            An ecosystem designed to inspire, support, and launch ambitious
            careers.
          </p>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 1 },
            visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 120, damping: 16 }}
                className="group rounded-2xl bg-white/90 p-6 shadow-md ring-1 ring-slate-200/60 backdrop-blur transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600/10 text-blue-600 transition group-hover:rotate-6 group-hover:animate-pulse group-hover:bg-blue-600 group-hover:text-white">
                  <Icon className="h-6 w-6 transition group-hover:scale-110" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
