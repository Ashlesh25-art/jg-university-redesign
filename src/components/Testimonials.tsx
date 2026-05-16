"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Card } from "@/src/components/ui/Card";
import { useIntersectionObserver } from "@/src/hooks/useIntersectionObserver";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Testimonial {
  id: string;
  name: string;
  program: string;
  /** Graduation year */
  year: number;
  quote: string;
  /** Initials for avatar */
  initials: string;
}

// ─── Sample data (includes brief + supporting entries) ──────────────────────
const testimonials: Testimonial[] = [
  {
    id: "rahul",
    name: "Rahul Sharma",
    program: "B.Tech",
    year: 2023,
    quote:
      "JG University transformed my career. The faculty support and industry exposure are unmatched.",
    initials: "RS",
  },
  {
    id: "priya",
    name: "Priya Patel",
    program: "MBA",
    year: 2024,
    quote:
      "Best decision of my life. The learning environment here is incredible — I grew both professionally and personally.",
    initials: "PP",
  },
  {
    id: "amit",
    name: "Amit Kumar",
    program: "MCA",
    year: 2023,
    quote:
      "World-class education with a focus on practical skills. I landed my dream job within two months of graduating.",
    initials: "AK",
  },
  {
    id: "neha",
    name: "Neha Singh",
    program: "B.Sc Biotechnology",
    year: 2024,
    quote:
      "I loved the research culture and the access to world-class labs. JG University truly nurtures scientific curiosity.",
    initials: "NS",
  },
  {
    id: "arjun",
    name: "Arjun Verma",
    program: "BA Liberal Arts",
    year: 2023,
    quote:
      "The interdisciplinary approach helped me discover my passion and purpose. The campus life is vibrant and enriching.",
    initials: "AV",
  },
];

// Avatar gradient palette — maps to each testimonial by index
const avatarGradients = [
  "from-blue-600 to-purple-600",
  "from-purple-600 to-pink-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-indigo-600 to-blue-600",
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const headerObserver = useIntersectionObserver<HTMLDivElement>({ threshold: 0.3 });
  const carouselObserver = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2 });

  useEffect(() => {
    const id = window.setTimeout(() => setIsLoading(false), 350);
    return () => window.clearTimeout(id);
  }, []);

  // ── Responsive slides count ─────────────────────────────────────────────────
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setSlidesToShow(w >= 1024 ? 3 : w >= 768 ? 2 : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = useMemo(
    () => Math.max(0, testimonials.length - slidesToShow),
    [slidesToShow]
  );

  // Reset index when maxIndex changes (e.g. on resize)
  useEffect(() => {
    if (index > maxIndex) setIndex(0);
  }, [index, maxIndex]);

  // ── Auto-scroll every 5 s (pauses on hover / focus / drag) ─────────────────
  const canAutoPlay = maxIndex > 0 && !isPaused && !isDragging;
  useEffect(() => {
    if (!canAutoPlay) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => window.clearInterval(id);
  }, [canAutoPlay, maxIndex]);

  const handlePrev = () => setIndex((p) => (p <= 0 ? maxIndex : p - 1));
  const handleNext = () => setIndex((p) => (p >= maxIndex ? 0 : p + 1));

  // Highlight the centre card when showing 3
  const activeOffset = slidesToShow >= 3 ? 1 : 0;
  const activeIndex = Math.min(testimonials.length - 1, index + activeOffset);

  // Keyboard navigation on the carousel region
  const regionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative scroll-mt-24 overflow-hidden bg-slate-50 py-20 lg:py-24 dark:bg-slate-950"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 pattern-grid opacity-15 dark:opacity-10" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          ref={headerObserver.ref}
          initial="hidden"
          animate={headerObserver.isIntersecting ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-500 dark:text-amber-400">
            Testimonials
          </p>
          <h2 id="testimonials-heading" className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
            What Our Students Say
          </h2>
          <p className="mt-3 text-base text-slate-600 sm:text-lg dark:text-slate-300">
            Real stories from students who transformed their future at JG University.
          </p>
        </motion.div>

        {/* Carousel region */}
        {isLoading ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
            {Array.from({ length: 3 }).map((_, idx) => (
              <TestimonialSkeleton key={`testimonial-skeleton-${idx}`} />
            ))}
          </div>
        ) : (
          <div
            ref={regionRef}
            role="region"
            aria-label="Student testimonials carousel"
            aria-roledescription="carousel"
            className="relative mt-10 overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
          >
            <motion.div
              ref={carouselObserver.ref}
              className="flex cursor-grab active:cursor-grabbing"
              animate={{
                x: `-${(index * 100) / slidesToShow}%`,
                opacity: carouselObserver.isIntersecting ? 1 : 0,
              }}
              transition={{ type: "spring", stiffness: 90, damping: 20 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={(_, info) => {
                setIsDragging(false);
                if (info.offset.x > 80) handlePrev();
                if (info.offset.x < -80) handleNext();
              }}
              aria-live="polite"
            >
              {testimonials.map((t, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <div
                    key={t.id}
                    style={{ width: `${100 / slidesToShow}%` }}
                    className="px-3 flex-shrink-0"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`Testimonial ${idx + 1} of ${testimonials.length}: ${t.name}`}
                  >
                    <motion.div
                      animate={{ scale: isActive ? 1 : 0.96, opacity: isActive ? 1 : 0.70 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Card glass hover className="relative p-8 shadow-lg">
                        {/* Decorative quote icon */}
                        <Quote aria-hidden="true" className="absolute right-6 top-6 h-7 w-7 text-blue-500/30 dark:text-blue-400/50" />

                        {/* Stars */}
                        <div role="img" aria-label="5 out of 5 stars" className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} aria-hidden="true" className="h-4 w-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>

                        {/* Quote */}
                        <blockquote className="mt-4">
                          <p className="text-sm italic leading-relaxed text-slate-700 sm:text-base dark:text-slate-200">
                            &ldquo;{t.quote}&rdquo;
                          </p>
                        </blockquote>

                        {/* Author */}
                        <footer className="mt-6 flex items-center gap-4">
                          <div
                            aria-hidden="true"
                            className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${avatarGradients[idx % avatarGradients.length]} text-sm font-bold text-white shadow-md`}
                          >
                            {t.initials}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 dark:text-white">{t.name}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              {t.program} · Class of {t.year}
                            </div>
                          </div>
                        </footer>
                      </Card>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        )}

        {/* Controls */}
        <div className="mt-6 flex items-center justify-center gap-3" role="group" aria-label="Carousel controls">
          <button
            type="button"
            onClick={handlePrev}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          {/* Dot indicators */}
          <div className="flex items-center gap-2" role="tablist" aria-label="Select testimonial">
            {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                role="tab"
                aria-selected={dotIdx === index}
                aria-label={`Go to slide ${dotIdx + 1}`}
                onClick={() => setIndex(dotIdx)}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                  dotIdx === index
                    ? "w-6 bg-blue-600 dark:bg-blue-400"
                    : "bg-slate-300 hover:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-600"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

function TestimonialSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="rounded-2xl border border-slate-200/60 bg-white/60 p-8 dark:border-slate-700/60 dark:bg-slate-900/60"
    >
      <div className="skeleton h-4 w-24 rounded" />
      <div className="skeleton mt-4 h-4 w-full rounded" />
      <div className="skeleton mt-2 h-4 w-5/6 rounded" />
      <div className="skeleton mt-6 h-10 w-10 rounded-full" />
      <div className="skeleton mt-3 h-4 w-1/2 rounded" />
    </div>
  );
}
