"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Admissions", href: "#admissions" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkClass = `link-underline text-sm font-medium transition ${
    scrolled
      ? "text-slate-700 hover:text-slate-900"
      : "text-white/80 hover:text-white"
  }`;

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed left-0 right-0 top-0 z-50"
    >
      <div className="mx-auto mt-4 max-w-6xl px-4 sm:px-6">
        <div
          className={`rounded-full p-[1px] transition ${
            scrolled
              ? "bg-gradient-to-r from-blue-200/70 via-purple-200/70 to-amber-200/60 shadow-2xl shadow-blue-900/20"
              : "bg-white/20"
          }`}
        >
          <div
            className={`flex items-center justify-between gap-4 rounded-full px-5 py-3 transition ${
              scrolled
                ? "bg-white/90 backdrop-blur-xl"
                : "bg-white/10 backdrop-blur-md"
            }`}
          >
            <a
              href="#home"
              className={`flex items-center gap-3 ${
                scrolled ? "text-slate-900" : "text-white"
              }`}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-600/30">
                JG
              </span>
              <span className="text-lg font-semibold">University</span>
            </a>

            <nav className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className={linkClass}>
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="#admissions"
                className="ripple hidden items-center rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:from-blue-500 hover:to-blue-400 md:inline-flex"
              >
                Apply Now
              </a>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition md:hidden ${
                  scrolled
                    ? "border-slate-200 bg-white/70 text-slate-700 hover:text-slate-900"
                    : "border-white/40 bg-white/10 text-white"
                }`}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.aside
              className="absolute right-0 top-0 h-full w-80 bg-white px-6 py-8 shadow-2xl"
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-slate-900">
                  JG University
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-10 flex flex-col gap-6 text-base font-medium text-slate-700">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="transition hover:text-slate-900"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <a
                href="#admissions"
                className="ripple mt-10 inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500"
              >
                Apply Now
              </a>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
