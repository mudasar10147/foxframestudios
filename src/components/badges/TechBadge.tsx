import type { ReactNode } from "react";
import { Badge } from "./Badge";

type TechBadgeProps = {
  label: string;
  icon?: ReactNode;
  className?: string;
};

export function TechBadge({ label, icon, className }: TechBadgeProps) {
  return (
    <Badge variant="outline" size="sm" icon={icon} className={className}>
      {label}
    </Badge>
  );
}
