# FlayerX Studio

Next.js 15 (App Router) base, deployed on Vercel. The design layer has been
cleared out for a rebuild — what remains is the build/deploy setup and the
contact backend.

## What's here

- Next.js 15 App Router + TypeScript + Tailwind CSS v4
- `vercel.json` — framework target and security headers
- `POST /api/contact` — contact endpoint, sends via Resend

## Getting Started

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

| Variable               | Purpose                                           |
| ---------------------- | ------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Public site URL for metadata. Optional on Vercel. |
| `RESEND_API_KEY`       | Server-side Resend key for the contact endpoint.  |
| `CONTACT_EMAIL`        | Recipient address for contact submissions.        |

## Scripts

| Command          | Description              |
| ---------------- | ------------------------ |
| `pnpm dev`       | Start development server |
| `pnpm build`     | Production build         |
| `pnpm start`     | Start production server  |
| `pnpm lint`      | Run ESLint               |
| `pnpm format`    | Format with Prettier     |
| `pnpm typecheck` | TypeScript check         |

## Project Structure

```
src/
├── app/
│   ├── api/contact/   # Resend-backed contact endpoint
│   ├── layout.tsx     # Root layout (minimal)
│   └── page.tsx       # Placeholder home route
├── lib/               # resend client, zod schemas
└── styles/            # globals.css (Tailwind entry)
```
