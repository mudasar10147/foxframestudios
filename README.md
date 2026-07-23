# FoxFrame Studio

Premium gaming-inspired portfolio — project foundation.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Motion
- shadcn/ui
- Lucide React
- Geist & Orbitron fonts
- next-themes
- React Hook Form + Zod
- Resend

## Getting Started

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Format with Prettier |
| `pnpm typecheck` | TypeScript check |

## Project Structure

```
src/
├── app/           # App Router pages and layouts
├── components/    # UI, layout, shared, and section components
├── constants/     # Site configuration and constants
├── hooks/         # Custom React hooks
├── lib/           # Utilities, fonts, integrations
├── providers/     # React context providers
├── styles/        # Global styles
└── types/         # Shared TypeScript types
```
