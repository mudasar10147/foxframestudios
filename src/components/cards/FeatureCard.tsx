import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card } from "./Card";

type FeatureCardProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  eyebrow?: string;
  className?: string;
};

export function FeatureCard({
  title,
  description,
  icon,
  eyebrow,
  className,
}: FeatureCardProps) {
  return (
    <Card variant="glass" hoverable glow className={cn("flex flex-col gap-3", className)}>
      {icon ? (
        <span className="flex size-10 items-center justify-center rounded-md border border-border-glass bg-elevated-surface text-accent-primary">
          {icon}
        </span>
      ) : null}
      {eyebrow ? <span className="text-label text-accent-primary">{eyebrow}</span> : null}
      <h3 className="text-h4 text-text-primary">{title}</h3>
      <p className="text-body-sm text-text-secondary">{description}</p>
    </Card>
  );
}
