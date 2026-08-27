-- Karvan e Asal Umrah Manager V16.6 — consolidated Supabase setup
-- Run once in Supabase SQL Editor. Safe to re-run where statements use IF NOT EXISTS / CREATE OR REPLACE.

create extension if not exists pgcrypto;

create table if not exists public.app_config (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now()
);

create table if not exists public.sales (
  id uuid primary key default gen_random_uuid(),
  voucher_id uuid unique references public.vouchers(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  owner_username text,
  booking_date date,
  description text,
  pax integer not null default 0,
  adults integer not null default 0,
  child_bed integer not null default 0,
  child_no_bed integer not null default 0,
  infants integer not null default 0,
  umrah_days integer not null default 0,
  total numeric not null default 0,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create index if not exists sales_owner_date_idx on public.sales(owner_id, booking_date);
create index if not exists app_config_updated_idx on public.app_config(updated_at);

-- Karvan e Asal Umrah Manager V16.6
create extension if not exists pgcrypto with schema extensions;

-- Secure security-question recovery metadata migration.
-- Run once in Supabase SQL Editor.

alter table public.profiles
  add column if not exists security_question text,
  add column if not exists security_answer_hash text;

-- Keep the profile recovery fields synchronized from Supabase Auth metadata.
create or replace function public.sync_karvan_profile_recovery()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id, email, username, first_name, last_name, contact, agency, address,
    security_question, security_answer_hash, active, updated_at
  ) values (
    new.id,
    lower(new.email),
    coalesce(new.raw_user_meta_data->>'username', split_part(lower(new.email),'@',1)),
    coalesce(new.raw_user_meta_data->>'firstName',''),
    coalesce(new.raw_user_meta_data->>'lastName',''),
    coalesce(new.raw_user_meta_data->>'contact',''),
    coalesce(new.raw_user_meta_data->>'agency',''),
    coalesce(new.raw_user_meta_data->>'address',''),
    new.raw_user_meta_data->>'securityQuestion',
    new.raw_user_meta_data->>'securityAnswerHash',
    true,
    now()
  )
  on conflict (id) do update set
    email = excluded.email,
    username = coalesce(excluded.username, public.profiles.username),
    first_name = coalesce(excluded.first_name, public.profiles.first_name),
    last_name = coalesce(excluded.last_name, public.profiles.last_name),
    contact = coalesce(excluded.contact, public.profiles.contact),
    agency = coalesce(excluded.agency, public.profiles.agency),
    address = coalesce(excluded.address, public.profiles.address),
    security_question = excluded.security_question,
    security_answer_hash = excluded.security_answer_hash,
    updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_karvan_recovery on auth.users;
create trigger on_auth_user_karvan_recovery
after insert or update of email, raw_user_meta_data on auth.users
for each row execute function public.sync_karvan_profile_recovery();

-- Backfill existing profiles from Auth metadata (raw answers are never used).
update public.profiles p
set security_question = u.raw_user_meta_data->>'securityQuestion',
    security_answer_hash = u.raw_user_meta_data->>'securityAnswerHash',
    updated_at = now()
from auth.users u
where u.id = p.id
  and (
    u.raw_user_meta_data ? 'securityQuestion'
    or u.raw_user_meta_data ? 'securityAnswerHash'
  );

-- Server-side verification. The client only submits the answer for comparison;
-- the stored value remains a SHA-256 hash.
create or replace function public.verify_password_reset(
  p_email text,
  p_question text,
  p_answer text
)
returns boolean
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  stored_hash text;
  expected_question text;
  answer_hash text;
begin
  select security_question, security_answer_hash
    into expected_question, stored_hash
  from public.profiles
  where lower(email)=lower(trim(p_email))
    and active=true
  limit 1;

  if stored_hash is null or expected_question is null then
    return false;
  end if;

  if expected_question <> trim(p_question) then
    return false;
  end if;

  answer_hash := encode(digest(lower(trim(p_answer)), 'sha256'), 'hex');
  return answer_hash = stored_hash;
end;
$$;

revoke all on function public.verify_password_reset(text,text,text) from public;
grant execute on function public.verify_password_reset(text,text,text) to anon, authenticated;

-- V16.6 password-reset question lookup.
create or replace function public.get_password_reset_question(p_email text)
returns text
language sql
security definer
set search_path = public, extensions
as $$
  select security_question
  from public.profiles
  where lower(email)=lower(trim(p_email))
    and active=true
  limit 1;
$$;
revoke all on function public.get_password_reset_question(text) from public;
grant execute on function public.get_password_reset_question(text) to anon, authenticated;
-- Karvan e Asal Umrah Manager V16.6
-- Run once in Supabase SQL Editor after the existing schema is present.
-- Enforces owner-only access for ordinary users and Super Admin access for shared reporting/configuration.

-- Sales reporting must never expose another user's sales to an ordinary user.
alter table if exists public.sales enable row level security;
drop policy if exists "sales owner or superadmin select" on public.sales;
create policy "sales owner or superadmin select" on public.sales
for select to authenticated
using (owner_id = auth.uid() or public.is_super_admin());
drop policy if exists "sales owner or superadmin insert" on public.sales;
create policy "sales owner or superadmin insert" on public.sales
for insert to authenticated
with check (owner_id = auth.uid() or public.is_super_admin());
drop policy if exists "sales owner or superadmin update" on public.sales;
create policy "sales owner or superadmin update" on public.sales
for update to authenticated
using (owner_id = auth.uid() or public.is_super_admin())
with check (owner_id = auth.uid() or public.is_super_admin());
drop policy if exists "sales owner or superadmin delete" on public.sales;
create policy "sales owner or superadmin delete" on public.sales
for delete to authenticated
using (owner_id = auth.uid() or public.is_super_admin());

-- Shared application configuration: everyone authenticated may read it;
-- only Super Admin may create/change/delete it.
alter table if exists public.app_config enable row level security;
drop policy if exists "app config authenticated read" on public.app_config;
create policy "app config authenticated read" on public.app_config
for select to authenticated using (true);
drop policy if exists "app config superadmin insert" on public.app_config;
create policy "app config superadmin insert" on public.app_config
for insert to authenticated with check (public.is_super_admin());
drop policy if exists "app config superadmin update" on public.app_config;
create policy "app config superadmin update" on public.app_config
for update to authenticated using (public.is_super_admin()) with check (public.is_super_admin());
drop policy if exists "app config superadmin delete" on public.app_config;
create policy "app config superadmin delete" on public.app_config
for delete to authenticated using (public.is_super_admin());

-- User records: users see their own records; Super Admin can manage all.
alter table if exists public.vouchers enable row level security;
drop policy if exists "vouchers owner or superadmin select" on public.vouchers;
create policy "vouchers owner or superadmin select" on public.vouchers for select to authenticated using (owner_id=auth.uid() or public.is_super_admin());
drop policy if exists "vouchers owner or superadmin insert" on public.vouchers;
create policy "vouchers owner or superadmin insert" on public.vouchers for insert to authenticated with check (owner_id=auth.uid() or public.is_super_admin());
drop policy if exists "vouchers owner or superadmin update" on public.vouchers;
create policy "vouchers owner or superadmin update" on public.vouchers for update to authenticated using (owner_id=auth.uid() or public.is_super_admin()) with check (owner_id=auth.uid() or public.is_super_admin());
drop policy if exists "vouchers owner or superadmin delete" on public.vouchers;
create policy "vouchers owner or superadmin delete" on public.vouchers for delete to authenticated using (owner_id=auth.uid() or public.is_super_admin());

alter table if exists public.package_costs enable row level security;
drop policy if exists "package costs owner or superadmin select" on public.package_costs;
create policy "package costs owner or superadmin select" on public.package_costs for select to authenticated using (owner_id=auth.uid() or public.is_super_admin());
drop policy if exists "package costs owner or superadmin insert" on public.package_costs;
create policy "package costs owner or superadmin insert" on public.package_costs for insert to authenticated with check (owner_id=auth.uid() or public.is_super_admin());
drop policy if exists "package costs owner or superadmin update" on public.package_costs;
create policy "package costs owner or superadmin update" on public.package_costs for update to authenticated using (owner_id=auth.uid() or public.is_super_admin()) with check (owner_id=auth.uid() or public.is_super_admin());
drop policy if exists "package costs owner or superadmin delete" on public.package_costs;
create policy "package costs owner or superadmin delete" on public.package_costs for delete to authenticated using (owner_id=auth.uid() or public.is_super_admin());

notify pgrst, 'reload schema';
-- V14 Sales: Online Recycle Bin repair
-- Run this once in Supabase SQL Editor.

create table if not exists public.recycle_bin (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  owner_username text,
  record_type text not null check(record_type in ('voucher','quote')),
  original_id uuid,
  payload jsonb not null default '{}'::jsonb,
  deleted_by uuid references auth.users(id) on delete set null,
  deleted_at timestamptz not null default now()
);

create index if not exists recycle_owner_idx
  on public.recycle_bin(owner_id, deleted_at);

alter table public.recycle_bin enable row level security;

drop policy if exists "recycle superadmin select" on public.recycle_bin;
create policy "recycle superadmin select"
  on public.recycle_bin for select to authenticated
  using (public.is_super_admin());

drop policy if exists "recycle owner insert or superadmin" on public.recycle_bin;
create policy "recycle owner insert or superadmin"
  on public.recycle_bin for insert to authenticated
  with check (owner_id = auth.uid() or public.is_super_admin());

drop policy if exists "recycle superadmin update" on public.recycle_bin;
create policy "recycle superadmin update"
  on public.recycle_bin for update to authenticated
  using (public.is_super_admin())
  with check (public.is_super_admin());

drop policy if exists "recycle superadmin delete" on public.recycle_bin;
create policy "recycle superadmin delete"
  on public.recycle_bin for delete to authenticated
  using (public.is_super_admin());

notify pgrst, 'reload schema';

-- Username login resolver. It exposes only the email needed by Supabase Auth.
create or replace function public.get_login_email_by_username(p_username text)
returns text language sql security definer set search_path=public as $$
  select p.email from public.profiles p
  where lower(trim(p.username))=lower(trim(p_username)) and p.active=true
  limit 1;
$$;
revoke all on function public.get_login_email_by_username(text) from public;
grant execute on function public.get_login_email_by_username(text) to anon, authenticated;

-- Keep the Sales reporting table synchronized with online vouchers.
create or replace function public.sync_sale_from_voucher()
returns trigger language plpgsql security definer set search_path=public as $$
declare p jsonb;
begin
  if TG_OP='DELETE' then
    delete from public.sales where voucher_id=old.id;
    return old;
  end if;
  p=new.payload;
  insert into public.sales(
    voucher_id,owner_id,owner_username,booking_date,description,pax,adults,child_bed,child_no_bed,infants,umrah_days,total,payload,updated_at
  ) values(
    new.id,new.owner_id,new.owner_username,new.booking_date,coalesce(p->>'customer',new.reference,''),
    coalesce((p->>'adults')::int,0)+coalesce((p->>'childBed')::int,0)+coalesce((p->>'childNoBed')::int,0)+coalesce((p->>'infants')::int,0),
    coalesce((p->>'adults')::int,0),coalesce((p->>'childBed')::int,0),coalesce((p->>'childNoBed')::int,0),coalesce((p->>'infants')::int,0),
    coalesce((p->>'umrahDays')::int,0),coalesce(new.total,0),new.payload,now()
  )
  on conflict(voucher_id) do update set
    owner_id=excluded.owner_id,owner_username=excluded.owner_username,booking_date=excluded.booking_date,description=excluded.description,
    pax=excluded.pax,adults=excluded.adults,child_bed=excluded.child_bed,child_no_bed=excluded.child_no_bed,infants=excluded.infants,
    umrah_days=excluded.umrah_days,total=excluded.total,payload=excluded.payload,updated_at=now();
  return new;
end $$;

drop trigger if exists trg_sync_sale_from_voucher on public.vouchers;
create trigger trg_sync_sale_from_voucher after insert or update or delete on public.vouchers
for each row execute function public.sync_sale_from_voucher();

insert into public.sales(voucher_id,owner_id,owner_username,booking_date,description,pax,adults,child_bed,child_no_bed,infants,umrah_days,total,payload)
select v.id,v.owner_id,v.owner_username,v.booking_date,coalesce(v.payload->>'customer',v.reference,''),
coalesce((v.payload->>'adults')::int,0)+coalesce((v.payload->>'childBed')::int,0)+coalesce((v.payload->>'childNoBed')::int,0)+coalesce((v.payload->>'infants')::int,0),
coalesce((v.payload->>'adults')::int,0),coalesce((v.payload->>'childBed')::int,0),coalesce((v.payload->>'childNoBed')::int,0),coalesce((v.payload->>'infants')::int,0),
coalesce((v.payload->>'umrahDays')::int,0),coalesce(v.total,0),v.payload
from public.vouchers v
on conflict(voucher_id) do update set payload=excluded.payload,total=excluded.total,updated_at=now();



-- V16.6 profile protection: users can read their own profile; Super Admin can manage all.
alter table if exists public.profiles enable row level security;
drop policy if exists "profiles self or superadmin select" on public.profiles;
create policy "profiles self or superadmin select" on public.profiles
for select to authenticated using (id = auth.uid() or public.is_super_admin());
drop policy if exists "profiles self update limited" on public.profiles;
create policy "profiles self update limited" on public.profiles
for update to authenticated
using (id = auth.uid() or public.is_super_admin())
with check (id = auth.uid() or public.is_super_admin());

notify pgrst, 'reload schema';
