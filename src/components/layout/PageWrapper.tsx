import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageWrapperProps = {
  className?: string;
  children: ReactNode;
};

export function PageWrapper({ className, children }: PageWrapperProps) {
  return (
    <div className={cn("relative flex min-h-dvh flex-col", className)}>
      {children}
    </div>
  );
}
