import { EmptyState } from "@/components/shared/EmptyState";
import { ButtonLink } from "@/components/ui/ButtonLink";

/**
 * What an admin page shows when the database can't be read. One component so the
 * dashboard and the messages page say it the same way, with a way to retry.
 */
export function AdminLoadError({ retryHref }: { retryHref: string }) {
  return (
    <EmptyState
      icon="settings"
      title="Messages couldn't be loaded"
      description="The database didn't respond. Check that DATABASE_URL is set for this deployment, then try again."
      action={
        <ButtonLink href={retryHref} variant="outline">
          Try again
        </ButtonLink>
      }
    />
  );
}
