# Indie Royalty Wallet Preview

Step 1–3 prototype for the Indie Royalty Web3 Music OS. The current build covers:

- **Step 1** – Wallet split form (requester wallet + collaborator tree)
- **Step 2** – Alpha intake assist form (代签)
- **Step 3** – Review & Publish page with readiness CTA（链上 / Raidar 预留按钮）

Supabase (`https://zjbnsfpzrglrmifhzopj.supabase.co`) is the single data source for all steps.

## Prerequisites

- Node 20+
- Supabase anon key (publishable) – already provided for this project
- Vercel project `indie-royalty-wallet-preview` (Auth disabled)

## Environment variables

Local only:

```bash
cp .env.example .env
```

```
NEXT_PUBLIC_SUPABASE_URL=https://zjbnsfpzrglrmifhzopj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_zMJirW1fe073BElAkCHgZw_NXdck8hK
```

CI / Vercel preview must inject via CLI:

```bash
NEXT_PUBLIC_SUPABASE_URL=... NEXT_PUBLIC_SUPABASE_ANON_KEY=... npm run lint
NEXT_PUBLIC_SUPABASE_URL=... NEXT_PUBLIC_SUPABASE_ANON_KEY=... npm run build
```

## Commands

```bash
npm install         # once
npm run lint        # eslint (required before pushing)
npm run dev         # local dev (port 3000 by default)
NEXT_PUBLIC_SUPABASE_URL=... NEXT_PUBLIC_SUPABASE_ANON_KEY=... npm run build
```

## Auth & Sessions (Step 1)

- `/api/auth/signup` + `/api/auth/login` create `profiles` rows and issue an `ir_session` HttpOnly cookie (30 days).
- `/api/auth/me` + `/api/auth/logout` hydrate / clear Zustand state on the front-end.
- Dashboard routes guard against missing sessions and redirect back to `/login`.

## Step 1: Collaborator splits

- Landing page keeps both the wallet split and Alpha assist forms inline.
- `/api/projects` now requires a valid session and stores `owner_profile_id`.
- Front-end validates wallet connection + session; anonymous requests get a “请先登录” tooltip.

## Step 2: Alpha assist intake

- `/api/alpha-intake` is also session-gated and writes `profile_id` for traceability.
- Submission drawer surfaces success/error/loading states, and warns when the session expired.

## Step 3: Review & Publish

- `/dashboard/projects/[id]` renders the “Step 3 Preview” view with:
  - Project overview, requester wallet, total percent
  - Collaborator table (name/role/email/payout/%), mirroring Supabase records
  - CTA buttons for “Push on-chain” / “Sync to Raidar” (disabled placeholders)
- `/api/projects/[id]` powers the detail view and only returns data for the logged-in owner.
- Dashboard list now links directly to these review pages (`Open review`).

## Testing checklist

1. `npm run dev` (with `.env` populated)
2. `POST /api/auth/signup` (or login with existing test user `testuser@example.com`)
3. Submit Step 1 form → confirm Supabase `projects` + `collaborators` rows
4. Submit Step 2 form → confirm Supabase `alpha_intake` rows (with `profile_id`)
5. Visit `/dashboard/projects/{projectId}` → verify data renders, CTA placeholders visible
6. `NEXT_PUBLIC_SUPABASE_URL=... NEXT_PUBLIC_SUPABASE_ANON_KEY=... npm run build`

## Deployment notes

- Always run lint + build locally before pushing to trigger Vercel preview
- Keep Vercel Authentication **disabled** for the preview project
- Supabase remains the only backend until Raidar / on-chain sync is implemented
