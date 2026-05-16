"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const points = [
  "Student-centered learning with global curriculum",
  "Industry-aligned programs and mentorship",
  "Innovation labs and research-driven culture",
];

export default function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 overflow-hidden bg-slate-50 py-20 lg:py-24 dark:bg-slate-950"
    >
      <div className="pointer-events-none absolute inset-0 pattern-dots opacity-20 dark:opacity-10" />
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-purple-200/30 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 p-1 shadow-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.4),_transparent_60%)]" />
            <div className="relative flex h-full w-full flex-col justify-between rounded-2xl bg-white/10 p-8 text-white backdrop-blur-lg">
              <div className="text-xs uppercase tracking-[0.3em] text-white/70">
                Campus Life
              </div>
              <div>
                <div className="text-2xl font-semibold">
                  A modern learning environment
                </div>
                <div className="mt-2 text-sm text-white/80">
                  Smart classrooms, innovation hubs, and a vibrant student
                  community.
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-white/80">
                <span className="rounded-full bg-white/20 px-3 py-1">
                  120+ Acres
                </span>
                <span className="rounded-full bg-white/20 px-3 py-1">
                  30+ Clubs
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-500 dark:text-amber-400">
            About Us
          </div>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
            Excellence in Education Since 2005
          </h2>
          <p className="mt-5 text-base text-slate-600 sm:text-lg dark:text-slate-300">
            JG University is committed to shaping future leaders through
            transformative education, cutting-edge research, and real-world
            experience. Our mission is to empower students with the knowledge,
            skills, and confidence to thrive in a rapidly evolving world.
          </p>
          <p className="mt-4 text-base text-slate-600 sm:text-lg dark:text-slate-300">
            With a focus on innovation and global collaboration, we cultivate a
            vibrant academic environment that nurtures curiosity, creativity,
            and purpose-driven leadership.
          </p>
          <div className="mt-5 space-y-3">
            {points.map((point) => (
              <div key={point} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300">
                  <Check className="h-4 w-4" />
                </span>
                <span className="text-sm text-slate-700 sm:text-base dark:text-slate-200">
                  {point}
                </span>
              </div>
            ))}
          </div>
          <a
            href="#programs"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-500 dark:text-blue-300 dark:hover:text-blue-200"
          >
            Learn More
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
