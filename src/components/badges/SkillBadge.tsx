import type { ReactNode } from "react";
import { Badge } from "./Badge";

type SkillBadgeProps = {
  label: string;
  icon?: ReactNode;
  className?: string;
};

export function SkillBadge({ label, icon, className }: SkillBadgeProps) {
  return (
    <Badge variant="default" size="sm" icon={icon} className={className}>
      {label}
    </Badge>
  );
}
