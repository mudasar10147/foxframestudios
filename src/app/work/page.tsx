import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { WorkInProgress } from "@/components/shared/WorkInProgress";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected interface work — HUDs, menus, and UI kits shipped with studio partners.",
};

export default function WorkPage() {
  return (
    <Container className="py-20">
      <PageHeader
        eyebrow="Portfolio"
        title="Work"
        description="Selected interface work — HUDs, menus, and UI kits shipped with studio partners."
      />

      <WorkInProgress />
    </Container>
  );
}
