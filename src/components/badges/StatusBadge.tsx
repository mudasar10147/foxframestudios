import { cn } from "@/lib/utils";
import { Badge } from "./Badge";

type StatusTone = "available" | "busy" | "offline";

const toneMap: Record<StatusTone, { dot: string; variant: "success" | "warning" | "default" }> = {
  available: { dot: "bg-status-success", variant: "success" },
  busy: { dot: "bg-status-warning", variant: "warning" },
  offline: { dot: "bg-text-muted", variant: "default" },
};

type StatusBadgeProps = {
  label: string;
  tone?: StatusTone;
  pulse?: boolean;
  className?: string;
};

export function StatusBadge({
  label,
  tone = "available",
  pulse = true,
  className,
}: StatusBadgeProps) {
  const { dot, variant } = toneMap[tone];
  return (
    <Badge variant={variant} size="sm" className={className}>
      <span className="relative flex size-2">
        {pulse ? (
          <span
            className={cn(
              "absolute inline-flex size-full animate-ping rounded-full opacity-60",
              dot,
            )}
          />
        ) : null}
        <span className={cn("relative inline-flex size-2 rounded-full", dot)} />
      </span>
      {label}
    </Badge>
  );
}
