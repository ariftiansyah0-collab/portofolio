"use client"

import HeroSection from "@/section/HeroSection";
import AboutSection from "@/section/AboutSection";
import Navbar from "../components/navbar/Navbar";
import ProjectSection from "@/section/ProjectSection";
import ExperienceSection from "@/section/ExperienceSection";
import SectionHeader from "@/components/ui/SectionHeader";
import ContactSection from "@/section/ContactSection";
import Footer from "@/section/Footer";
import { Toaster } from "react-hot-toast";
import AnimationLayout from "@/components/layout/AnimationLayouts";

export default function Home() {
  return (
    <AnimationLayout>
      <main>
      <Navbar/>
      <HeroSection/>
      <AboutSection />
      <ProjectSection/>
      <ExperienceSection/>
      <ContactSection/>
      <Footer/>
      <Toaster/>
      </main>
    </AnimationLayout>
  );
}
