import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { WorkInProgress } from "@/components/shared/WorkInProgress";

export const metadata: Metadata = {
  title: "About",
  description: "Who we are, what we have shipped, and how we got here.",
};

export default function AboutPage() {
  return (
    <Container className="py-20">
      <PageHeader
        eyebrow="Studio"
        title="About"
        description="Who we are, what we have shipped, and how we got here."
      />

      <WorkInProgress />
    </Container>
  );
}
