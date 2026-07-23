import type { Metadata } from "next";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProjectsSection } from "@/components/sections";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Browse the portfolio by discipline — UI design, scripting, map building, and 3D modelling.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <MainLayout>
      <ProjectsSection />
    </MainLayout>
  );
}
