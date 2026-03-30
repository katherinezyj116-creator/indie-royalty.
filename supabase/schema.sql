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

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  display_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.sessions (
  token text primary key,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists sessions_profile_idx on public.sessions(profile_id);
create index if not exists sessions_expires_idx on public.sessions(expires_at);

alter table if exists public.projects
  add column if not exists owner_profile_id uuid references public.profiles(id);

create index if not exists projects_owner_profile_idx on public.projects(owner_profile_id);

alter table if exists public.alpha_intake
  add column if not exists profile_id uuid references public.profiles(id);

create index if not exists alpha_intake_profile_idx on public.alpha_intake(profile_id);
