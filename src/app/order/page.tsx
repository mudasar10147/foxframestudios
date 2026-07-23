import type { Metadata } from "next";
import { MainLayout } from "@/components/layout/MainLayout";
import { OrderSection } from "@/components/sections";
import { orderContent } from "@/constants/content";

export const metadata: Metadata = {
  title: "Order",
  description: orderContent.description,
  alternates: { canonical: "/order" },
};

export default function OrderPage() {
  return (
    <MainLayout>
      <OrderSection />
    </MainLayout>
  );
}
