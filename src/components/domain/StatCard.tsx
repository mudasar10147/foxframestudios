import { HudTile } from "@/components/ui/HudTile";
import { Icon, type IconName } from "@/components/ui/Icon";

export interface StatCardProps {
  icon: IconName;
  label: string;
  value: string | number;
  /** A short note under the value, e.g. "awaiting a reply". */
  hint?: string;
}

/** One headline number: an icon tile, the label, the value, and an optional note. */
export function StatCard({ icon, label, value, hint }: StatCardProps) {
  return (
    <div className="glass-card hover-reveal-scope flex items-start gap-4 p-5">
      <div aria-hidden className="w-12 shrink-0">
        <HudTile tone="cool">
          <Icon name={icon} />
        </HudTile>
      </div>
      <div className="min-w-0">
        <p className="text-text-secondary text-xs font-semibold tracking-[0.15em] uppercase">
          {label}
        </p>
        <p className="text-text-primary mt-1 truncate text-2xl font-extrabold">
          {value}
        </p>
        {hint ? <p className="text-text-muted mt-0.5 text-xs">{hint}</p> : null}
      </div>
    </div>
  );
}
