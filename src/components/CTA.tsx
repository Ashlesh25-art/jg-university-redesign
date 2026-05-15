"use client";

import { motion } from "framer-motion";
import { Download, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section
      id="admissions"
      className="relative overflow-hidden bg-cta-gradient animated-gradient py-20 lg:py-24"
    >
      <div className="absolute inset-0 bg-slate-900/20" />
      <div className="pointer-events-none absolute inset-0 pattern-dots opacity-20" />
      <div className="pointer-events-none absolute left-10 top-10 h-32 w-32 rounded-full bg-white/15 blur-2xl" />
      <div className="pointer-events-none absolute right-16 bottom-8 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-6 bg-slate-950" />
      <div className="relative mx-auto max-w-5xl px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
            <Sparkles className="h-4 w-4" />
            Admissions 2026
          </div>
          <h2 className="mt-6 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Ready to Start Your Journey?
          </h2>
          <p className="mt-4 text-base text-white/80 sm:text-lg">
            Join thousands of students shaping their future with JG University.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              className="ripple relative inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-2xl shadow-white/30 transition hover:-translate-y-1"
            >
              <span className="absolute -inset-2 rounded-full bg-white/30 blur-lg opacity-40 animate-pulse" />
              <span className="relative">Apply Now</span>
            </a>
            <a
              href="#programs"
              className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-1 hover:border-white hover:bg-white/20"
            >
              <Download className="h-4 w-4" />
              Download Brochure
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
