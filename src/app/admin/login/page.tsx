import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { Logo } from "@/components/ui/Logo";
import { LoginForm } from "@/features/admin";

export const metadata: Metadata = {
  title: "Sign in",
};

/**
 * The sign-in page: just the studio's logo and the form, centred, with neither the
 * public header nor the admin sidebar, since nothing else is reachable yet.
 */
export default function AdminLoginPage() {
  return (
    <main
      id="main-content"
      className="flex flex-1 flex-col items-center justify-center px-4 py-16"
    >
      <div className="w-full max-w-md">
        <Logo />
        <PageHeader
          eyebrow="Admin"
          title="Sign in"
          description="For studio staff only."
          className="mt-10"
        />
        <div className="glass-card mt-8 p-6 sm:p-8">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
