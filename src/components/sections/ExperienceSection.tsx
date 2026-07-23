import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { experience } from "@/constants/content";
import { Timeline } from "./experience/Timeline";

export function ExperienceSection() {
  return (
    <Section id="experience" labelledBy="experience-title">
      <Container className="flex flex-col gap-12">
        <SectionHeader
          id="experience-title"
          label="Experience"
          title="Experience Timeline"
          description="A track record of shipping polished UI for Roblox games and studios."
        />

        <Timeline entries={experience} />
      </Container>
    </Section>
  );
}
