"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

const stats = [
  { label: "Students", value: "5000+" },
  { label: "Faculty", value: "200+" },
  { label: "Programs", value: "50+" },
  { label: "Placements", value: "95%" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

export default function Hero() {
  const { scrollY } = useScroll();
  const ySlow = useTransform(scrollY, [0, 600], [0, 80]);
  const yMid = useTransform(scrollY, [0, 600], [0, 50]);
  const yFast = useTransform(scrollY, [0, 600], [0, -40]);

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-hero-gradient animated-gradient"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 via-slate-900/20 to-slate-900/40" />

      <div className="absolute inset-0 opacity-70">
        <motion.div
          style={{ y: ySlow }}
          className="absolute left-8 top-24 h-32 w-32 rounded-full bg-white/10 blur-2xl float-slower"
        />
        <motion.div
          style={{ y: yMid }}
          className="absolute right-12 top-16 h-24 w-24 rounded-full bg-amber-300/20 blur-2xl float-slow"
        />
        <motion.div
          style={{ y: yFast }}
          className="absolute left-1/3 bottom-24 h-16 w-16 rounded-full bg-white/20 blur-xl float-fast"
        />
        <motion.div
          style={{ y: yMid }}
          className="absolute right-1/4 bottom-16 h-20 w-20 rounded-full bg-purple-300/20 blur-xl float-slower"
        />
        <motion.div
          style={{ y: ySlow, clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          className="absolute left-16 bottom-20 h-24 w-24 bg-white/15 blur-sm float-slow"
        />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pb-20 pt-36 sm:pb-24 sm:pt-40">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur"
          >
            JG University
            <span className="h-1 w-1 rounded-full bg-amber-300" />
            Admissions Open 2026
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            Shape Your Future at{" "}
            <span className="text-gradient">JG University</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="mt-6 text-lg text-white/80 sm:text-xl"
          >
            Premier education institution fostering innovation, excellence,
            and leadership through world-class academics and industry-ready
            programs.
          </motion.p>
          <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-4">
            <a
              href="#admissions"
              className="ripple inline-flex items-center gap-2 rounded-full bg-white/95 px-6 py-3 text-sm font-semibold text-slate-900 shadow-2xl shadow-white/30 transition hover:-translate-y-1 hover:shadow-white/40"
            >
              Apply Now
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#programs"
              className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-1 hover:border-white hover:bg-white/20"
            >
              Explore Programs
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mt-12 grid gap-4 text-white/80 sm:grid-cols-2 md:grid-cols-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur transition hover:-translate-y-1 hover:border-white/40 hover:bg-white/15"
            >
              <div className="text-2xl font-semibold text-white">
                {stat.value}
              </div>
              <div className="text-sm uppercase tracking-wide text-white/70">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
