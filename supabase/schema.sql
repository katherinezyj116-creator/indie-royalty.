-- Enable pgcrypto for UUID generation
create extension if not exists "pgcrypto";

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  overview text,
  language text default 'en',
  requester_address text not null,
  total_percent numeric default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.collaborators (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  name text,
  role text,
  email text,
  payout_preference text,
  percent numeric default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.revenue_lanes (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  lane_type text not null,
  amount numeric,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.alpha_intake (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  role text not null,
  revenue_range text not null,
  current_process text,
  language text default 'en',
  created_at timestamptz not null default now()
);
