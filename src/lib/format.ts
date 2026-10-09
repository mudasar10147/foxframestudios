/**
 * Dates as the admin dashboard shows them, e.g. "9 Oct 2026, 14:05 UTC".
 *
 * Fixed to UTC and labelled as such: the page renders on the server, whose clock
 * zone isn't the reader's, and a time that silently shifted would be misleading.
 */
const dateTimeFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "UTC",
});

export function formatDateTime(date: Date): string {
  return `${dateTimeFormat.format(date)} UTC`;
}

const compactNumberFormat = new Intl.NumberFormat("en-GB", {
  notation: "compact",
  maximumFractionDigits: 1,
});

/** Big counts as headline stats show them, e.g. 1,400,000 → "1.4M". */
export function formatCompactNumber(value: number): string {
  return compactNumberFormat.format(value);
}
