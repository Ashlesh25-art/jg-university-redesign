"use client";

import { motion, useInView } from "framer-motion";
import { Award, GraduationCap, TrendingUp, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Stat = {
  label: string;
  value: number;
  suffix: string;
  icon: LucideIcon;
};

const stats: Stat[] = [
  { label: "Students", value: 5000, suffix: "+", icon: Users },
  { label: "Placement Rate", value: 95, suffix: "%", icon: TrendingUp },
  { label: "Faculty Members", value: 200, suffix: "+", icon: GraduationCap },
  { label: "Programs", value: 50, suffix: "+", icon: Award },
];

function StatCard({ stat, start }: { stat: Stat; start: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let frame = 0;
    const duration = 1400;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setCount(Math.floor(stat.value * progress));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, stat.value]);

  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={start ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center rounded-2xl bg-white/10 px-6 py-8 text-center text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/15"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white">
        <Icon className="h-6 w-6" />
      </span>
      <div className="mt-4 text-3xl font-bold">
        {count.toLocaleString()}
        {stat.suffix}
      </div>
      <div className="mt-2 text-sm uppercase tracking-wide text-white/70">
        {stat.label}
      </div>
    </motion.div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="relative overflow-hidden bg-cta-gradient animated-gradient py-16 lg:py-20">
      <div className="absolute inset-0 bg-slate-900/30" />
      <div className="pointer-events-none absolute inset-0 pattern-dots opacity-20" />
      <div className="pointer-events-none absolute -left-10 top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-6 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
      <div ref={ref} className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} start={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
