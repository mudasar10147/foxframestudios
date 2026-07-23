import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card } from "./Card";

type StatCardProps = {
  value: string;
  label: string;
  icon?: ReactNode;
  className?: string;
};

export function StatCard({ value, label, icon, className }: StatCardProps) {
  return (
    <Card hoverable className={cn("flex flex-col gap-1", className)}>
      {icon ? <span className="mb-2 text-accent-primary">{icon}</span> : null}
      <span className="text-h3 text-text-primary">{value}</span>
      <span className="text-body-sm text-text-muted">{label}</span>
    </Card>
  );
}
