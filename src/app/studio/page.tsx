import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { WorkInProgress } from "@/components/shared/WorkInProgress";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "How the studio runs: process, tooling, and the people behind the work.",
};

export default function StudioPage() {
  return (
    <Container className="py-20">
      <PageHeader
        eyebrow="Inside FoxFrame"
        title="Studio"
        description="How the studio runs: process, tooling, and the people behind the work."
      />

      <WorkInProgress />
    </Container>
  );
}
