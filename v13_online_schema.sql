-- Karvan e Asal — V13 Sales Online Multi-User schema
-- Run this in Supabase SQL Editor before publishing the app.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  email text unique,
  first_name text,
  last_name text,
  contact text,
  agency text,
  address text,
  role text not null default 'user' check (role in ('user','admin','superadmin')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.vouchers (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  owner_username text,
  reference text,
  booking_date date,
  payload jsonb not null default '{}'::jsonb,
  total numeric default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.package_costs (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  owner_username text,
  reference text,
  booking_date date,
  payload jsonb not null default '{}'::jsonb,
  total numeric default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists vouchers_owner_idx on public.vouchers(owner_id);
create index if not exists package_costs_owner_idx on public.package_costs(owner_id);
create index if not exists vouchers_booking_date_idx on public.vouchers(booking_date);

alter table public.profiles enable row level security;
alter table public.vouchers enable row level security;
alter table public.package_costs enable row level security;

create or replace function public.is_super_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'superadmin' and p.active = true);
$$;

create policy "profile own or superadmin" on public.profiles
for select using (id = auth.uid() or public.is_super_admin());
create policy "profile insert own" on public.profiles
for insert with check (id = auth.uid());
create policy "profile update own or superadmin" on public.profiles
for update using (id = auth.uid() or public.is_super_admin())
with check (id = auth.uid() or public.is_super_admin());

create policy "vouchers own or superadmin select" on public.vouchers
for select using (owner_id = auth.uid() or public.is_super_admin());
create policy "vouchers own insert" on public.vouchers
for insert with check (owner_id = auth.uid() or public.is_super_admin());
create policy "vouchers own or superadmin update" on public.vouchers
for update using (owner_id = auth.uid() or public.is_super_admin())
with check (owner_id = auth.uid() or public.is_super_admin());
create policy "vouchers own or superadmin delete" on public.vouchers
for delete using (owner_id = auth.uid() or public.is_super_admin());

create policy "package own or superadmin select" on public.package_costs
for select using (owner_id = auth.uid() or public.is_super_admin());
create policy "package own insert" on public.package_costs
for insert with check (owner_id = auth.uid() or public.is_super_admin());
create policy "package own or superadmin update" on public.package_costs
for update using (owner_id = auth.uid() or public.is_super_admin())
with check (owner_id = auth.uid() or public.is_super_admin());
create policy "package own or superadmin delete" on public.package_costs
for delete using (owner_id = auth.uid() or public.is_super_admin());

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles(id, username, email, first_name, last_name, contact, agency, address)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email,'@',1)),
    new.email,
    new.raw_user_meta_data->>'firstName',
    new.raw_user_meta_data->>'lastName',
    new.raw_user_meta_data->>'contact',
    new.raw_user_meta_data->>'agency',
    new.raw_user_meta_data->>'address'
  ) on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- After your first account is registered, promote the intended super admin:
-- update public.profiles set role='superadmin' where username='umar';


-- V14 Sales: allow login with username as well as email.
-- Profiles remain protected by RLS. This SECURITY DEFINER function exposes only
-- the email address needed by Supabase Auth for an exact active username lookup.
create or replace function public.get_login_email_by_username(p_username text)
returns text
language sql
stable
security definer
set search_path = public
as $$
  select p.email
  from public.profiles p
  where lower(trim(p.username)) = lower(trim(p_username))
    and p.active = true
  limit 1;
$$;

revoke all on function public.get_login_email_by_username(text) from public;
grant execute on function public.get_login_email_by_username(text) to anon, authenticated;
