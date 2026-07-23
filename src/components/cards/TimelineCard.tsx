import { cn } from "@/lib/utils";
import { Card } from "./Card";
import { Badge } from "@/components/badges/Badge";

type TimelineCardProps = {
  role: string;
  company: string;
  period: string;
  summary: string;
  tags?: string[];
  className?: string;
};

export function TimelineCard({
  role,
  company,
  period,
  summary,
  tags,
  className,
}: TimelineCardProps) {
  return (
    <Card hoverable className={cn("flex flex-col gap-3", className)}>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-h4 text-text-primary">{role}</h3>
        <span className="text-body-sm text-text-muted">{period}</span>
      </div>
      <p className="text-body-sm text-accent-primary">{company}</p>
      <p className="text-body text-text-secondary">{summary}</p>
      {tags && tags.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li key={tag}>
              <Badge variant="default" size="sm">
                {tag}
              </Badge>
            </li>
          ))}
        </ul>
      ) : null}
    </Card>
  );
}
