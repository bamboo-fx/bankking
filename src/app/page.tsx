"use client";

import { HeroSection } from "@/components/landing/HeroSection";
import { ModulesShowcase } from "@/components/landing/ModulesShowcase";

export default function Home() {
  const scrollToModules = () => {
    document.getElementById("modules")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative">
      <HeroSection onScrollClick={scrollToModules} />
      <ModulesShowcase />
    </main>
  );
}
