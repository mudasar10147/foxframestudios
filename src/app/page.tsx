import { MainLayout } from "@/components/layout/MainLayout";
import {
  AboutSection,
  ContactSection,
  HeroSection,
  OrderSection,
  ProcessSection,
  ProjectsSection,
  ServicesSection,
  SkillsSection,
} from "@/components/sections";

export default function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ServicesSection />
      <ProcessSection />
      <OrderSection />
      <ContactSection />
    </MainLayout>
  );
}
