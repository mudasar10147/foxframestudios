import type { Metadata } from "next";
import { MainLayout } from "@/components/layout/MainLayout";
import { ServicesSection } from "@/components/sections";

export const metadata: Metadata = {
  title: "Services",
  description:
    "End-to-end Roblox UI services to take your game from concept to launch.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <MainLayout>
      <ServicesSection />
    </MainLayout>
  );
}
