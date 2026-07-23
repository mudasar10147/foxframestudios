import type { Metadata } from "next";
import { MainLayout } from "@/components/layout/MainLayout";
import { ContactSection } from "@/components/sections";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch about Roblox UI design, scripting, map building, or 3D modelling work.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <MainLayout>
      <ContactSection />
    </MainLayout>
  );
}
