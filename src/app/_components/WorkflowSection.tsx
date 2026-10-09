import {
  WorkflowExplorer,
  type WorkflowTrack,
} from "@/components/domain/WorkflowExplorer";
import { Container } from "@/components/layout/Container";
import { Rise } from "@/components/shared/Rise";
import { SectionHeader } from "@/components/shared/SectionHeader";

/**
 * How each service moves through the studio, in order. The first track is the
 * whole-game pipeline, which is what the section showed before it had tabs. Kept
 * here rather than in `constants/site` until a second place needs it (§14).
 */
const WORKFLOW_TRACKS: readonly WorkflowTrack[] = [
  {
    id: "full-game",
    label: "Full Game",
    caption: "Development Process",
    stages: [
      "Discovery",
      "Wireframing",
      "System Architecture",
      "Core Gameplay",
      "Scripting & QA",
      "Launch",
    ],
  },
  {
    id: "ui-ux",
    label: "UI/UX",
    caption: "Design Process",
    stages: [
      "Discovery",
      "User Flows",
      "Wireframes",
      "Visual Design",
      "Prototype & Test",
      "Handoff",
    ],
  },
  {
    id: "scripting",
    label: "Scripting",
    caption: "Scripting Process",
    stages: [
      "Discovery",
      "System Design",
      "Core Systems",
      "Integration",
      "Testing & QA",
      "Deployment",
    ],
  },
];

export function WorkflowSection() {
  return (
    <section id="workflow" className="relative py-20 lg:py-28">
      {/*
       * The same corner grid the services box carries, so the two sections read as
       * instrumented by the same system. Only its own corner is rounded, since that
       * is the only one it touches.
       */}
      <div
        aria-hidden
        className="texture-grid texture-grid-corner pointer-events-none absolute top-0 left-0"
      />

      {/* `relative` so the content paints above the grid, which is positioned. */}
      <Container className="node-scope relative">
        <Rise trigger="in-view">
          <SectionHeader title="Studio Development Workflow" align="center" />
        </Rise>

        {/* Only the tabs and the row they switch are a client component — the
            heading and the background stay on the server (§10.1). */}
        <Rise trigger="in-view" delay={90} className="mt-10 lg:mt-12">
          {/* UI/UX is the studio's lead service, so it's the tab that opens. */}
          <WorkflowExplorer tracks={WORKFLOW_TRACKS} defaultId="ui-ux" />
        </Rise>
      </Container>
    </section>
  );
}
