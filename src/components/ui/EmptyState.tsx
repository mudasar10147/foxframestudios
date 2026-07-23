import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-lg border border-border-default bg-surface p-12 text-center",
        className,
      )}
    >
      {icon ? (
        <span className="flex size-12 items-center justify-center rounded-full border border-border-default bg-elevated-surface text-text-muted">
          {icon}
        </span>
      ) : null}
      <div className="flex flex-col gap-2">
        <h3 className="text-h4 text-text-primary">{title}</h3>
        {description ? (
          <p className="text-body-sm text-text-secondary">{description}</p>
        ) : null}
      </div>
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
