# AquaBank Rwanda

## About
AquaBank Rwanda is a demo/prototype web application that models a water capture, storage and distribution service for Kigali. It includes a public marketing site, a customer portal for ordering and payments (demo), and an admin dashboard for operations, monitoring, and AI prototypes.

## Problem
Kigali has strong seasonal rainfall but faces dry-season water shortages. Many households and businesses lack reliable, predictable access to safe water during dry periods.

## Solution
AquaBank captures surplus rainwater, stores it securely, tests quality, and distributes it via kiosks and scheduled deliveries. This project demonstrates the user flows, admin tooling and AI prototypes needed to operate such a system.

## Features
- Customer portal (demo)
- Water ordering and checkout (mocked payments)
- Delivery tracking (prototype)
- Subscriptions and prepaid credits (demo)
- Admin dashboard: orders, deliveries, tanks, water-quality
- Tank monitoring and depletion forecasts (AI prototype)
- Water-quality monitoring (demo data)
- Analytics and alerts
- AI prototype pages under `/admin/ai` (labelled demo)

## Tech Stack
- Next.js 13 (App Router)
- React 18 + TypeScript
- Tailwind CSS (global styles) + legacy marketing CSS
- Recharts for charts
- Firebase (Auth & Firestore) — demo fallback supported
- Mock/localStorage services for demo data

## Installation
1. Clone the repo

```bash
git clone <repo-url>
cd AquaBank
npm install
```

## Environment Setup
1. Copy `.env.example` to `.env.local` and fill in real values for production.

```bash
cp .env.example .env.local
# then edit .env.local to add real keys
```

- Do NOT commit `.env.local` or any real secret keys.
- For Firebase, set the `NEXT_PUBLIC_FIREBASE_*` values.
- For AI or payment providers, set the appropriate keys in `.env.local` or your host's secret manager.

## Running Locally

```bash
npm run dev
```

Open http://localhost:3000

## Project Structure
- `app/` — Next.js App Router pages and routes (marketing + portal + admin)
- `components/` — React components used across portal and admin
- `lib/` — integrations (e.g., `lib/firebase.ts`)
- `css/`, `js/` — legacy marketing site assets
- `public/` — static assets (icons, images)

## Deployment
- Recommended: Vercel for Next.js App Router projects. Connect the repository and set environment variables in the Vercel dashboard.
- Alternatively: build with `npm run build` and host on any Node.js server; ensure environment variables are set and `.next` is not committed.

## Important: Integrations & Mocking
- Production-ready integrations are NOT configured by default.
- Current demo/mocked integrations:
  - Payments: `components/PaymentEngine.ts` is a mock; payments are stored in `localStorage`.
  - AI: `/admin/ai` pages and `components/AIEngine.ts` are prototypes and do not call a real AI unless you wire `AI_API_KEY` and update the integration.
  - Firebase: `lib/firebase.ts` reads `NEXT_PUBLIC_FIREBASE_*` keys with demo fallbacks; if you provide real Firebase keys, the app will initialize Firebase.

## Checklist before production
- Replace demo payment flows with a secure server-side payment integration (Stripe, Mobile Money gateway).
- Move sensitive keys to server-side environment variables where appropriate (do not expose `STRIPE_SECRET_KEY` to client).
- Add real monitoring, error reporting, and backups for Firestore.
- Verify legal and regulatory requirements for water distribution in Kigali.

If you want, I can: run `npm run build` locally (you'll need to run it in your environment), help wire a real payment gateway, or prepare a Vercel deployment configuration.
# AquaBank Rwanda

A prototype Next.js + TypeScript application for AquaBank Rwanda.

Quick start:

1. Install dependencies:

```bash
npm install
```

2. Run the dev server:

```bash
npm run dev
```

Notes:
- This workspace includes a scaffolded Next.js App Router app with Tailwind CSS, Recharts and a demo Firebase client initialization.
- Existing static HTML files in the repo are preserved under the workspace root.

Next steps: migrate content, wire Firebase env vars, and implement backend integrations as needed.
