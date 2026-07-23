import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Card } from "@/components/cards/Card";
import { SkillBadge } from "@/components/badges/SkillBadge";
import { Stagger, StaggerItem } from "@/components/shared/Stagger";
import { TiltCard } from "@/components/shared/TiltCard";
import { skillGroups } from "@/constants/content";
import { SkillMeter } from "./skills/SkillMeter";

export function SkillsSection() {
  return (
    <Section id="skills" labelledBy="skills-title">
      <Container className="flex flex-col gap-12">
        <SectionHeader
          id="skills-title"
          label="Skills"
          title="Skills & Technologies"
          description="Everything I use to design and script standout Roblox game interfaces."
        />

        <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <StaggerItem key={group.category} className="h-full">
              <TiltCard>
                <Card hoverable glow className="flex h-full flex-col gap-5">
                  <h3 className="text-h4 text-text-primary">{group.category}</h3>
                  <div className="flex flex-col gap-4">
                    {group.skills.map((skill) =>
                      skill.level != null ? (
                        <SkillMeter
                          key={skill.name}
                          name={skill.name}
                          level={skill.level}
                        />
                      ) : (
                        <SkillBadge key={skill.name} label={skill.name} />
                      ),
                    )}
                  </div>
                </Card>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
