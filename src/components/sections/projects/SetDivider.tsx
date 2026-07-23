import { cn } from "@/lib/utils";

type SetDividerProps = {
  title: string;
  /** Number of screens in the set, shown on the right of the rule. */
  count?: number;
  className?: string;
};

/** Labelled horizontal rule separating one UI kit from the next. */
export function SetDivider({ title, count, className }: SetDividerProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <h2 className="text-h4 text-text-primary whitespace-nowrap">{title}</h2>
      <span aria-hidden="true" className="h-px flex-1 bg-border-default" />
      {count != null ? (
        <span className="text-caption text-text-muted whitespace-nowrap">
          {count} {count === 1 ? "screen" : "screens"}
        </span>
      ) : null}
    </div>
  );
}
