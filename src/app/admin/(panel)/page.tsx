import type { Metadata } from "next";
import { StatCard } from "@/components/domain/StatCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ROUTES } from "@/constants/routes";
import { AdminLoadError, ProjectTypeBreakdown } from "@/features/admin";
import { requireAdmin } from "@/lib/admin-session";
import { getContactStats, type ContactStats } from "@/lib/contact-messages";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function AdminDashboardPage() {
  await requireAdmin();

  let stats: ContactStats | null = null;
  try {
    stats = await getContactStats();
  } catch (error) {
    console.error("Admin dashboard could not load stats:", error);
  }

  const topType = stats?.byProjectType[0];

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="An overview of what's come in through the contact form."
      />

      {stats ? (
        <>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard icon="mail" label="Total messages" value={stats.total} />
            <StatCard
              icon="bolt"
              label="New"
              value={stats.unread}
              hint="not yet read"
            />
            <StatCard
              icon="layers"
              label="Last 7 days"
              value={stats.lastSevenDays}
            />
            <StatCard
              icon="gamepad"
              label="Top project type"
              value={topType?.type ?? "—"}
              hint={
                topType
                  ? `${topType.count} ${topType.count === 1 ? "enquiry" : "enquiries"}`
                  : undefined
              }
            />
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <ProjectTypeBreakdown stats={stats} />

            <section
              aria-labelledby="inbox-heading"
              className="glass-card flex flex-col items-start p-5 sm:p-6"
            >
              <h2
                id="inbox-heading"
                className="text-text-secondary text-xs font-semibold tracking-[0.15em] uppercase"
              >
                Inbox
              </h2>
              <p className="text-text-primary mt-4 text-lg font-bold">
                {stats.unread === 0
                  ? "You're all caught up."
                  : `${stats.unread} ${stats.unread === 1 ? "message is" : "messages are"} waiting.`}
              </p>
              <p className="text-text-secondary mt-1 text-sm">
                Read, reply to and sort enquiries on the Messages page.
              </p>
              <ButtonLink
                href={
                  stats.unread > 0
                    ? `${ROUTES.adminMessages}?status=new`
                    : ROUTES.adminMessages
                }
                variant="outline"
                size="sm"
                className="mt-auto"
              >
                {stats.unread > 0 ? "View new messages" : "View messages"}
              </ButtonLink>
            </section>
          </div>
        </>
      ) : (
        <div className="mt-10">
          <AdminLoadError retryHref={ROUTES.admin} />
        </div>
      )}
    </>
  );
}
