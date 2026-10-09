import type { Metadata } from "next";
import { ContactSection } from "@/app/_components/ContactSection";
import { HeroSection } from "@/app/_components/HeroSection";
import { PortfolioSection } from "@/app/_components/PortfolioSection";
import { ServicesSection } from "@/app/_components/ServicesSection";
import { WorkflowSection } from "@/app/_components/WorkflowSection";
import { siteConfig } from "@/constants/site";

export const metadata: Metadata = {
  description: siteConfig.tagline,
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
