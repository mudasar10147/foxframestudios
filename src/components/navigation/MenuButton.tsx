import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

type MenuButtonProps = {
  open: boolean;
  onToggle: () => void;
  controls: string;
  className?: string;
};

export function MenuButton({
  open,
  onToggle,
  controls,
  className,
}: MenuButtonProps) {
  return (
    <button
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      aria-controls={controls}
      onClick={onToggle}
      className={cn(
        "transition-button inline-flex size-10 items-center justify-center rounded-md border border-border-default bg-elevated-surface text-text-primary hover:border-border-strong lg:hidden",
        className,
      )}
    >
      {open ? <X size={20} /> : <Menu size={20} />}
    </button>
  );
}
