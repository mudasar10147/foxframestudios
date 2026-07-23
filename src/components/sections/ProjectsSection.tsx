import { MousePointerClick } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { SectionBackground } from "@/components/effects/SectionBackground";
import { Reveal } from "@/components/shared/Reveal";
import { CategoryNav } from "./projects/CategoryNav";

export function ProjectsSection() {
  return (
    <Section id="work" labelledBy="work-title" className="relative overflow-hidden">
      <SectionBackground glow />

      <Container className="relative z-10 flex flex-col gap-12">
        <SectionHeader
          id="work-title"
          label="Work"
          title="Featured Projects"
          description="Browse the portfolio by discipline — UI design, scripting, map building, and 3D modelling."
        />

        <CategoryNav />

        <Reveal variant="up">
          <div className="glass-card flex flex-col items-center gap-3 p-12 text-center">
            <MousePointerClick
              size={28}
              aria-hidden="true"
              className="text-accent-primary"
            />
            <p className="text-body-lg text-text-secondary">
              Click a category above to see my work.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
