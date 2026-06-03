# First Wealth

**First Wealth helps retail investors never forget why they invested.**

This MVP is a polished conviction-tracking web app, not a portfolio tracker, stock-picking tool, robo-advisor, or copy-trading product. It helps users capture the reasoning behind each holding, review whether the thesis is strengthening or weakening, and make better hold/add/sell review decisions without pretending to guarantee returns.

## Features

- Premium fintech landing page with the core message: **Never forget why you invested.**
- Portfolio screenshot upload flow with mock OCR extraction.
- Manual holding editing and fallback entry.
- Top-holding selection for setup.
- Conviction capture flow with thesis, sell criteria, confidence, time horizon, and decision.
- Mock AI thesis structuring and weekly update generation.
- Conviction dashboard with Portfolio Understanding Score, holdings, alerts, and review CTA.
- Weekly Conviction Review screen that stores review history locally.
- Individual holding detail pages with thesis bullets, sell criteria, assumptions, timeline, weekly update, and decision rationale.
- Local browser database persistence via `localStorage` for fast demos.
- OpenAI-compatible abstraction placeholder in `src/lib/ai-client.ts`.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS v4
- Local browser persistence for the MVP
- Mock AI mode by default

## Getting Started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Environment

Copy the example environment file:

```bash
cp .env.example .env.local
```

Defaults:

```bash
NEXT_PUBLIC_AI_MODE=mock
```

Optional future AI integration placeholders:

```bash
OPENAI_API_KEY=
OPENAI_BASE_URL=https://api.openai.com/v1
```

## Scripts

```bash
npm run dev       # Start local development server
npm run build     # Build production app
npm run start     # Start production server
npm run lint      # Run Next lint script
npm run typecheck # Run TypeScript checks
```

## Demo Flow

1. Visit `/` to see the landing page.
2. Click **Upload your portfolio**.
3. Upload any image or click **Extract holdings** to trigger mock OCR.
4. Edit holdings and continue to `/setup`.
5. Select up to five important holdings and capture conviction.
6. Visit `/dashboard` to see conviction status, alerts, and score.
7. Start `/review` for the weekly review habit.
8. Open any `/holding/[id]` detail page to inspect the thesis and record a decision.

## Product Principle

First Wealth avoids direct financial advice language. It does not say “buy this stock” or guarantee outcomes. It focuses on the user’s own reasoning: whether the thesis appears stronger, weaker, stable, broken, or in need of review.
