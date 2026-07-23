import type { Metadata } from "next";
import { MainLayout } from "@/components/layout/MainLayout";
import { AboutSection } from "@/components/sections";
import { aboutContent } from "@/constants/content";

export const metadata: Metadata = {
  title: "About",
  description: aboutContent.description,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <MainLayout>
      <AboutSection />
    </MainLayout>
  );
}
