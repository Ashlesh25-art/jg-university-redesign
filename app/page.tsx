import About from "@/src/components/About";
import CTA from "@/src/components/CTA";
import Features from "@/src/components/Features";
import Footer from "@/src/components/Footer";
import Hero from "@/src/components/Hero";
import Navbar from "@/src/components/Navbar";
import Programs from "@/src/components/Programs";
import Stats from "@/src/components/Stats";
import Testimonials from "@/src/components/Testimonials";

export default function Home() {
  return (
    <div className="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />
      <main className="flex flex-col">
        <Hero />
        <About />
        <Programs />
        <Features />
        <Testimonials />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
