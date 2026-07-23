import type { Metadata } from "next";
import { MainLayout } from "@/components/layout/MainLayout";
import { SkillsSection } from "@/components/sections";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Everything I use to design and script standout Roblox game interfaces.",
  alternates: { canonical: "/skills" },
};

export default function SkillsPage() {
  return (
    <MainLayout>
      <SkillsSection />
    </MainLayout>
  );
}
