import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="flex min-h-dvh items-center justify-center">
      <div className="text-center">
        <h1 className="text-h4 text-text-primary">404</h1>
        <p className="text-body-sm text-text-secondary mt-2">Page not found.</p>
        <Link
          href="/"
          className="text-body-sm text-accent-primary mt-4 inline-block underline"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
