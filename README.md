# AURA — Balinese Cliff Retreat

Premium hospitality website — Next.js 16 App Router + TypeScript + Tailwind CSS 4 + Supabase.

## Stack
- Next.js 16 (Turbopack), TypeScript, Tailwind 4
- Supabase/PostgreSQL (schema in `supabase/schema.sql`, RLS)
- Vercel-ready, image CDN via `images.unsplash.com`

## Routes
`/`, `/stay`, `/stay/[slug]`, `/experiences`, `/experiences/[slug]`, `/dining`, `/offers`, `/offers/[slug]`, `/gallery`, `/story`, `/location`, `/contact`, `/faq`, `/booking`, `/admin` + `sitemap.xml`, `robots.txt`, `not-found`

## CMS
Data layer in `lib/data.ts` (replace with Supabase queries). Publishing states: `draft`/`published`/`archived`; offers support `active` + `starts_at`/`ends_at`.

## Booking
Integration-ready flow: dates → guests → availability (server-validated) → add-ons → guest details → review → request → confirmation. No fake payment — Stripe/payment gateway plugs into `app/booking/page.tsx` `handleConfirm` + server validation.

## Run
```bash
npm install
npm run build
npm run dev
```

## Supabase
Apply `supabase/schema.sql` in SQL editor, set env, then replace `lib/data.ts` fetches with Supabase client.

## Security
RLS enabled, no secrets in client, service-role only on server. See `supabase/schema.sql`.
