import { ProgressBar } from "@/components/ui/ProgressBar";
import type { ContactStats } from "@/lib/contact-messages";

export interface ProjectTypeBreakdownProps {
  stats: ContactStats;
}

/** How enquiries split by project type, as a labelled bar per type. */
export function ProjectTypeBreakdown({ stats }: ProjectTypeBreakdownProps) {
  return (
    <section
      aria-labelledby="by-project-type"
      className="glass-card p-5 sm:p-6"
    >
      <h2
        id="by-project-type"
        className="text-text-secondary text-xs font-semibold tracking-[0.15em] uppercase"
      >
        By project type
      </h2>
      {stats.byProjectType.length === 0 ? (
        <p className="text-text-muted mt-4 text-sm">No enquiries yet.</p>
      ) : (
        <ul className="mt-4 flex flex-col gap-4">
          {stats.byProjectType.map((entry) => (
            <li key={entry.type}>
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="text-text-primary">{entry.type}</span>
                <span className="text-text-secondary tabular-nums">
                  {entry.count}
                </span>
              </div>
              <ProgressBar
                value={(entry.count / stats.total) * 100}
                label={`${entry.type}: ${entry.count} of ${stats.total}`}
                className="mt-2"
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
