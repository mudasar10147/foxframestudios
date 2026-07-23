import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "./Card";

type ServiceCardProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  features?: string[];
  className?: string;
};

export function ServiceCard({
  title,
  description,
  icon,
  features,
  className,
}: ServiceCardProps) {
  return (
    <Card hoverable glow className={cn("flex h-full flex-col gap-3", className)}>
      {icon ? (
        <span className="flex size-12 items-center justify-center rounded-md border border-border-default bg-elevated-surface text-accent-primary">
          {icon}
        </span>
      ) : null}
      <h3 className="text-h4 text-text-primary">{title}</h3>
      <p className="text-body text-text-secondary">{description}</p>
      {features && features.length > 0 ? (
        <ul className="mt-1 flex flex-col gap-2">
          {features.map((feature) => (
            <li
              key={feature}
              className="text-body-sm flex items-center gap-2 text-text-secondary"
            >
              <Check
                size={14}
                className="text-accent-primary"
                aria-hidden="true"
              />
              {feature}
            </li>
          ))}
        </ul>
      ) : null}
    </Card>
  );
}
