"use client";

import { useState } from "react";
import { ProjectsGrid } from "@/components/sections/projects/ProjectsGrid";
import { SetDivider } from "@/components/sections/projects/SetDivider";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

type ProjectGroup = {
  title: string;
  items: Project[];
};

type ProjectCollectionPickerProps = {
  groups: ProjectGroup[];
};

/** Lets visitors choose one 3D portfolio collection at a time. */
export function ProjectCollectionPicker({ groups }: ProjectCollectionPickerProps) {
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const selectedGroup = groups.find((group) => group.title === selectedTitle);

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-lg border border-border-default bg-surface p-5 sm:p-6">
        <p className="text-body text-text-muted">
          Click the following category to view the 3D model work.
        </p>
        <div className="mt-4 flex flex-wrap gap-3" aria-label="3D model categories">
          {groups.map((group) => {
            const isSelected = group.title === selectedTitle;

            return (
              <button
                key={group.title}
                aria-pressed={isSelected}
                className={cn(
                  "text-button rounded-md border px-4 py-2.5 transition-button",
                  isSelected
                    ? "border-border-glow bg-accent-primary text-text-primary shadow-purple-glow"
                    : "border-border-default bg-elevated-surface text-text-muted hover:border-border-glow hover:bg-accent-primary/10 hover:text-text-primary",
                )}
                onClick={() => setSelectedTitle(group.title)}
                type="button"
              >
                {group.title}
              </button>
            );
          })}
        </div>
      </div>

      {selectedGroup ? (
        <div className="flex flex-col gap-8">
          <SetDivider title={selectedGroup.title} count={selectedGroup.items.length} />
          <ProjectsGrid projects={selectedGroup.items} />
        </div>
      ) : null}
    </div>
  );
}
