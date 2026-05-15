import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";

const socialLinks = [
  { label: "Facebook", href: "#", icon: Facebook },
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "Twitter", href: "#", icon: Twitter },
];

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Admissions", href: "#admissions" },
  { label: "Contact", href: "#contact" },
];

const programLinks = [
  "Engineering",
  "Business",
  "Science",
  "Arts",
  "Humanities",
];

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-slate-950 text-slate-200">
      <div className="pointer-events-none absolute inset-0 pattern-dots opacity-10" />
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="relative mx-auto grid max-w-6xl gap-8 px-6 py-14 lg:py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="text-xl font-semibold text-white">JG University</div>
          <p className="mt-3 text-sm text-slate-400">
            Empowering future leaders through innovation, excellence, and
            transformative learning.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-300 transition hover:scale-105 hover:bg-blue-600 hover:text-white"
                  aria-label={social.label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
            Quick Links
          </div>
          <div className="mt-4 space-y-3 text-sm">
            {quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="link-underline block text-slate-300 transition hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
            Programs
          </div>
          <div className="mt-4 space-y-3 text-sm">
            {programLinks.map((program) => (
              <div key={program} className="text-slate-300">
                {program}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
            Contact
          </div>
          <div className="mt-4 space-y-4 text-sm text-slate-300">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-4 w-4" />
              <span>JG University Campus, Ahmedabad, Gujarat</span>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-1 h-4 w-4" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-1 h-4 w-4" />
              <span>admissions@jguniversity.edu</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-slate-400 md:flex-row">
          <span>© {new Date().getFullYear()} JG University. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="transition hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="transition hover:text-white">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
