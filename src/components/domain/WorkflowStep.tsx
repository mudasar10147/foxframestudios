import { NodeBox } from "@/components/ui/NodeBox";
import { cn } from "@/lib/utils";

export interface WorkflowStepProps {
  /** Position in the process, shown ahead of the name. */
  index: number;
  name: string;
  className?: string;
}

/**
 * One stage of the studio's delivery process, as a lit box in the workflow diagram.
 *
 * Inert on purpose: these describe how work moves through the studio, so there is
 * nothing to press. That is also why it is neither a `Button` variant nor a copy of
 * the registry's entries — those are controls carrying selection and focus states,
 * and a change to how a control behaves has no business reaching a diagram (§6.0).
 * They share their outline and their type through tokens instead.
 *
 * `h-full` over a floor height: the row stretches every stage to the tallest, so a
 * name that wraps to two lines lifts the whole row rather than standing proud of it.
 */
export function WorkflowStep({ index, name, className }: WorkflowStepProps) {
  return (
    // `radius="lg"` is load-bearing, not taste: the ambient charge traces this box
    // with `OutlineSurge`, whose corner radius is a constant matching `rounded-lg`.
    <NodeBox
      radius="lg"
      className={cn(
        "text-text-primary flex h-full min-h-[var(--workflow-step-height)] items-center justify-center px-4 py-3 text-center text-sm font-semibold tracking-wider text-balance uppercase",
        className,
      )}
    >
      {index}. {name}
    </NodeBox>
  );
}
