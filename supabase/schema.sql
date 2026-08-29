-- AURA Hotel CMS schema — Supabase / Postgres
-- Enable RLS and create core tables

create extension if not exists "uuid-ossp";

create table if not exists properties (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  category text not null,
  price integer not null,
  size text, bed text, view text, capacity integer,
  description text,
  image text, images text[],
  amenities text[], features text[], included text[], policy text,
  status text not null default 'published' check (status in ('draft','published','archived')),
  created_at timestamptz default now(), updated_at timestamptz default now()
);

create table if not exists experiences (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null, category text, duration text, price text,
  image text, description text, inclusions text[],
  status text default 'published', created_at timestamptz default now()
);

create table if not exists offers (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null, subtitle text, image text, description text, price text,
  validity text, inclusions text[], terms text,
  active boolean default true, starts_at date, ends_at date,
  created_at timestamptz default now()
);

create table if not exists bookings (
  id uuid primary key default uuid_generate_v4(),
  stay_slug text not null references properties(slug),
  check_in date not null, check_out date not null,
  adults integer not null, children integer default 0,
  guest_name text not null, guest_email text not null, guest_phone text,
  special_request text,
  addons text[],
  nights integer, rate integer, addons_total integer, total integer,
  status text default 'pending' check (status in ('pending','confirmed','cancelled')),
  created_at timestamptz default now()
);

create table if not exists media (
  id uuid primary key default uuid_generate_v4(),
  url text not null, alt text, category text, ordering integer default 0,
  created_at timestamptz default now()
);

-- Example RLS (enable and restrict to authenticated for write)
alter table properties enable row level security;
alter table bookings enable row level security;
create policy "public read properties" on properties for select using (status='published');
create policy "public read experiences" on experiences for select using (true);
-- bookings: only service_role can insert via server
