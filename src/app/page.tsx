import { Suspense } from "react";
import HeroSection from "@/section/HeroSection";
import AboutSection from "@/section/AboutSection";
import Navbar from "../components/navbar/Navbar";
import ProjectSection from "@/section/ProjectSection";
import ExperienceSection from "@/section/ExperienceSection";
import ContactSection from "@/section/ContactSection";
import Footer from "@/section/Footer";
import { Toaster } from "react-hot-toast";

function ProjectsFallback() {
  return (
    <section aria-hidden="true" className="py-24">
      <div className="mx-auto w-[90%] max-w-6xl space-y-12">
        <div className="space-y-4">
          <div className="h-5 w-24 animate-pulse rounded bg-surface" />
          <div className="h-9 w-72 max-w-full animate-pulse rounded bg-surface" />
          <div className="h-5 w-full max-w-2xl animate-pulse rounded bg-surface" />
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {[0, 1].map((item) => (
            <div key={item} className="overflow-hidden rounded border border-border bg-surface">
              <div className="h-60 animate-pulse bg-card" />
              <div className="space-y-4 p-6">
                <div className="h-6 w-2/3 animate-pulse rounded bg-card" />
                <div className="h-4 w-full animate-pulse rounded bg-card" />
                <div className="h-4 w-4/5 animate-pulse rounded bg-card" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
      <main>
      <Navbar/>
      <HeroSection/>
      <AboutSection />
      <Suspense fallback={<ProjectsFallback />}>
        <ProjectSection />
      </Suspense>
      <ExperienceSection/>
      <ContactSection/>
      <Footer/>
      <Toaster/>
      </main>
  );
}
