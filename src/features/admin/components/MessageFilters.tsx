import { FilterLinks } from "@/components/shared/FilterLinks";
import { ROUTES } from "@/constants/routes";
import type { MessageStatus } from "@/lib/validations";

const FILTERS: readonly { label: string; status?: MessageStatus }[] = [
  { label: "All" },
  { label: "New", status: "new" },
  { label: "Read", status: "read" },
  { label: "Replied", status: "replied" },
];

export interface MessageFiltersProps {
  /** The status being shown, or undefined for all. */
  active?: MessageStatus;
}

/** Filters the message list by status, through `?status=` in the URL. */
export function MessageFilters({ active }: MessageFiltersProps) {
  return (
    <FilterLinks
      label="Filter messages"
      links={FILTERS.map((filter) => ({
        label: filter.label,
        href: filter.status
          ? `${ROUTES.adminMessages}?status=${filter.status}`
          : ROUTES.adminMessages,
        isActive: filter.status === active,
      }))}
    />
  );
}
