"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const testimonials = [
  {
    name: "Aisha Patel",
    program: "B.Tech Computer Science",
    quote:
      "JG University gave me the confidence to lead, innovate, and land my dream role in tech.",
  },
  {
    name: "Rohan Mehta",
    program: "MBA International Business",
    quote:
      "The faculty mentorship and industry projects prepared me for global opportunities.",
  },
  {
    name: "Neha Singh",
    program: "B.Sc Biotechnology",
    quote:
      "I loved the research culture and the access to world-class labs.",
  },
  {
    name: "Arjun Verma",
    program: "BA Liberal Arts",
    quote:
      "The interdisciplinary approach helped me discover my passion and purpose.",
  },
  {
    name: "Kavya Iyer",
    program: "BBA Finance",
    quote:
      "Career support and placements were outstanding, with real-world exposure.",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setSlidesToShow(3);
      } else if (width >= 768) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(1);
      }
    };
    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  const maxIndex = useMemo(
    () => Math.max(0, testimonials.length - slidesToShow),
    [slidesToShow]
  );

  useEffect(() => {
    if (index > maxIndex) {
      setIndex(0);
    }
  }, [index, maxIndex]);

  const canAutoPlay = maxIndex > 0 && !isPaused && !isDragging;

  useEffect(() => {
    if (!canAutoPlay) return;
    const interval = window.setInterval(() => {
      setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => window.clearInterval(interval);
  }, [canAutoPlay, maxIndex]);

  const dotCount = maxIndex + 1;
  const activeOffset = slidesToShow >= 3 ? 1 : 0;
  const activeIndex = Math.min(
    testimonials.length - 1,
    index + activeOffset
  );

  const handlePrev = () =>
    setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  const handleNext = () =>
    setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));

  return (
    <section
      id="testimonials"
      className="relative scroll-mt-24 overflow-hidden bg-slate-50 py-20 lg:py-24"
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
          <div className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-500">
            Testimonials
          </div>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            What Our Students Say
          </h2>
          <p className="mt-3 text-base text-slate-600 sm:text-lg">
            Real stories from students who transformed their future at JG
            University.
          </p>
        </motion.div>

        <div
          className="relative mt-10 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <motion.div
            className="flex cursor-grab active:cursor-grabbing"
            animate={{ x: `-${(index * 100) / slidesToShow}%` }}
            transition={{ type: "spring", stiffness: 90, damping: 20 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(_, info) => {
              setIsDragging(false);
              if (info.offset.x > 80) {
                handlePrev();
              }
              if (info.offset.x < -80) {
                handleNext();
              }
            }}
          >
            {testimonials.map((testimonial, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={testimonial.name}
                  style={{ width: `${100 / slidesToShow}%` }}
                  className="px-3"
                >
                  <motion.div
                    animate={{
                      scale: isActive ? 1 : 0.96,
                      opacity: isActive ? 1 : 0.7,
                    }}
                    transition={{ duration: 0.4 }}
                    className="glass-card relative rounded-2xl p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
                  >
                    <Quote className="absolute right-6 top-6 h-6 w-6 text-blue-500/40" />
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: 5 }).map((_, starIdx) => (
                        <Star
                          key={`${testimonial.name}-star-${starIdx}`}
                          className="h-4 w-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <p className="mt-4 text-sm italic text-slate-700 sm:text-base">
                      "{testimonial.quote}"
                    </p>
                    <div className="mt-6 flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600" />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">
                          {testimonial.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {testimonial.program}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:text-slate-900"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: dotCount }).map((_, dotIndex) => (
                <button
                  key={`dot-${dotIndex}`}
                  type="button"
                  onClick={() => setIndex(dotIndex)}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    dotIndex === index
                      ? "bg-blue-600"
                      : "bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to testimonial ${dotIndex + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:text-slate-900"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
