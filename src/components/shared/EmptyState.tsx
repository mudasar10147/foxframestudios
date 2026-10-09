import type { ReactNode } from "react";
import { HudTile } from "@/components/ui/HudTile";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  icon: IconName;
  title: string;
  description?: string;
  /** A way forward, e.g. a retry or a link elsewhere (§9.3). */
  action?: ReactNode;
  className?: string;
}

/**
 * What a list or section shows when it has nothing to show, or couldn't load: an
 * icon tile, a short title, an explanation and, where there is one, a way forward.
 */
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
        "glass-card hover-reveal-scope flex flex-col items-center px-6 py-12 text-center",
        className,
      )}
    >
      <div aria-hidden className="w-16">
        <HudTile tone="cool">
          <Icon name={icon} />
        </HudTile>
      </div>
      <p className="text-text-primary mt-6 text-lg font-bold">{title}</p>
      {description ? (
        <p className="text-text-secondary mt-2 max-w-md text-sm text-pretty">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
