import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { processSteps } from "@/constants/content";
import { ProcessSteps } from "./process/ProcessSteps";

export function ProcessSection() {
  return (
    <Section id="process" labelledBy="process-title">
      <Container className="flex flex-col gap-12">
        <SectionHeader
          id="process-title"
          label="Process"
          title="How I Work"
          description="A clear, collaborative process that turns ideas into game-ready UI."
        />

        <ProcessSteps steps={processSteps} />
      </Container>
    </Section>
  );
}
