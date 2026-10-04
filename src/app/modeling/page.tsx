import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { WorkInProgress } from "@/components/shared/WorkInProgress";

export const metadata: Metadata = {
  title: "Modeling",
  description:
    "Props, environments, and game-ready assets modelled and optimised to spec.",
};

export default function ModelingPage() {
  return (
    <Container className="py-20">
      <PageHeader
        eyebrow="Service"
        title="Modeling"
        description="Props, environments, and game-ready assets modelled and optimised to spec."
      />

      <WorkInProgress />
    </Container>
  );
}
