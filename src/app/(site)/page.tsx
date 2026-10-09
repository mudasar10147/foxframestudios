import type { Metadata } from "next";
import { ContactSection } from "@/app/_components/ContactSection";
import { HeroSection } from "@/app/_components/HeroSection";
import { PortfolioSection } from "@/app/_components/PortfolioSection";
import { ServicesSection } from "@/app/_components/ServicesSection";
import { WorkflowSection } from "@/app/_components/WorkflowSection";

export const metadata: Metadata = {
  description:
    "Crafting immersive interfaces, systems, and assets for next-gen worlds.",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <WorkflowSection />
      <ContactSection />
    </>
  );
}
