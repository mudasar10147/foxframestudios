import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { WorkInProgress } from "@/components/shared/WorkInProgress";

export const metadata: Metadata = {
  title: "Scripting",
  description:
    "Gameplay and tooling scripts built to slot into an existing production pipeline.",
};

export default function ScriptingPage() {
  return (
    <Container className="py-20">
      <PageHeader
        eyebrow="Service"
        title="Scripting"
        description="Gameplay and tooling scripts built to slot into an existing production pipeline."
      />

      <WorkInProgress />
    </Container>
  );
}
