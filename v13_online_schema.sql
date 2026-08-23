
-- Karvan e Asal V14 Sales Consolidated Online Schema
create extension if not exists pgcrypto;

alter table public.profiles
  add column if not exists security_question text,
  add column if not exists security_answer_hash text,
  add column if not exists updated_at timestamptz not null default now();

create table if not exists public.app_config (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now()
);

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

create index if not exists sales_owner_date_idx on public.sales(owner_id,booking_date);
create index if not exists recycle_owner_idx on public.recycle_bin(owner_id,deleted_at);
create index if not exists app_config_updated_idx on public.app_config(updated_at);

alter table public.app_config enable row level security;
alter table public.recycle_bin enable row level security;
alter table public.sales enable row level security;

drop policy if exists "config authenticated read" on public.app_config;
create policy "config authenticated read" on public.app_config
for select to authenticated using (true);
drop policy if exists "config superadmin insert" on public.app_config;
create policy "config superadmin insert" on public.app_config
for insert to authenticated with check(public.is_super_admin());
drop policy if exists "config superadmin update" on public.app_config;
create policy "config superadmin update" on public.app_config
for update to authenticated using(public.is_super_admin()) with check(public.is_super_admin());
drop policy if exists "config superadmin delete" on public.app_config;
create policy "config superadmin delete" on public.app_config
for delete to authenticated using(public.is_super_admin());

drop policy if exists "recycle superadmin select" on public.recycle_bin;
create policy "recycle superadmin select" on public.recycle_bin
for select to authenticated using(public.is_super_admin());
drop policy if exists "recycle owner insert or superadmin" on public.recycle_bin;
create policy "recycle owner insert or superadmin" on public.recycle_bin
for insert to authenticated with check(owner_id=auth.uid() or public.is_super_admin());
drop policy if exists "recycle superadmin update" on public.recycle_bin;
create policy "recycle superadmin update" on public.recycle_bin
for update to authenticated using(public.is_super_admin()) with check(public.is_super_admin());
drop policy if exists "recycle superadmin delete" on public.recycle_bin;
create policy "recycle superadmin delete" on public.recycle_bin
for delete to authenticated using(public.is_super_admin());

drop policy if exists "sales own or superadmin select" on public.sales;
create policy "sales own or superadmin select" on public.sales
for select to authenticated using(owner_id=auth.uid() or public.is_super_admin());
drop policy if exists "sales own or superadmin insert" on public.sales;
create policy "sales own or superadmin insert" on public.sales
for insert to authenticated with check(owner_id=auth.uid() or public.is_super_admin());
drop policy if exists "sales own or superadmin update" on public.sales;
create policy "sales own or superadmin update" on public.sales
for update to authenticated using(owner_id=auth.uid() or public.is_super_admin())
with check(owner_id=auth.uid() or public.is_super_admin());
drop policy if exists "sales own or superadmin delete" on public.sales;
create policy "sales own or superadmin delete" on public.sales
for delete to authenticated using(owner_id=auth.uid() or public.is_super_admin());

-- Store the five registration questions and verify answers server-side.
create or replace function public.set_profile_security(
  p_user_id uuid, p_question text, p_answer text
) returns void language plpgsql security definer set search_path=public as $$
begin
  if auth.uid() is distinct from p_user_id and not public.is_super_admin() then
    raise exception 'not authorized';
  end if;
  update public.profiles
  set security_question=trim(p_question),
      security_answer_hash=crypt(lower(trim(p_answer)), gen_salt('bf')),
      updated_at=now()
  where id=p_user_id;
end $$;

create or replace function public.verify_password_reset(
  p_email text, p_question text, p_answer text
) returns boolean language sql security definer set search_path=public as $$
  select exists(
    select 1 from public.profiles p
    where lower(p.email)=lower(trim(p_email))
      and p.active=true
      and p.security_question=trim(p_question)
      and p.security_answer_hash is not null
      and p.security_answer_hash=crypt(lower(trim(p_answer)),p.security_answer_hash)
  );
$$;
revoke all on function public.verify_password_reset(text,text,text) from public;
grant execute on function public.verify_password_reset(text,text,text) to anon,authenticated;

create or replace function public.get_password_reset_question(p_email text)
returns text language sql security definer set search_path=public as $$
  select security_question from public.profiles
  where lower(email)=lower(trim(p_email)) and active=true limit 1;
$$;
revoke all on function public.get_password_reset_question(text) from public;
grant execute on function public.get_password_reset_question(text) to anon,authenticated;

create or replace function public.get_login_email_by_username(p_username text)
returns text language sql security definer set search_path=public as $$
  select p.email from public.profiles p
  where lower(trim(p.username))=lower(trim(p_username)) and p.active=true limit 1;
$$;
revoke all on function public.get_login_email_by_username(text) from public;
grant execute on function public.get_login_email_by_username(text) to anon,authenticated;

-- Create/refresh a sales row whenever a voucher changes.
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
    voucher_id,owner_id,owner_username,booking_date,description,pax,adults,
    child_bed,child_no_bed,infants,umrah_days,total,payload,updated_at
  )
  values(
    new.id,new.owner_id,new.owner_username,new.booking_date,
    coalesce(p->>'customer',new.reference,''),
    coalesce((p->>'adults')::int,0)+coalesce((p->>'childBed')::int,0)+coalesce((p->>'childNoBed')::int,0)+coalesce((p->>'infants')::int,0),
    coalesce((p->>'adults')::int,0),coalesce((p->>'childBed')::int,0),
    coalesce((p->>'childNoBed')::int,0),coalesce((p->>'infants')::int,0),
    coalesce((p->>'umrahDays')::int,0),coalesce(new.total,0),new.payload,now()
  )
  on conflict(voucher_id) do update set
    owner_id=excluded.owner_id,owner_username=excluded.owner_username,
    booking_date=excluded.booking_date,description=excluded.description,
    pax=excluded.pax,adults=excluded.adults,child_bed=excluded.child_bed,
    child_no_bed=excluded.child_no_bed,infants=excluded.infants,
    umrah_days=excluded.umrah_days,total=excluded.total,payload=excluded.payload,updated_at=now();
  return new;
end $$;

drop trigger if exists trg_sync_sale_from_voucher on public.vouchers;
create trigger trg_sync_sale_from_voucher
after insert or update or delete on public.vouchers
for each row execute function public.sync_sale_from_voucher();

-- Backfill existing vouchers into Sales.
insert into public.sales(voucher_id,owner_id,owner_username,booking_date,description,pax,adults,child_bed,child_no_bed,infants,umrah_days,total,payload)
select v.id,v.owner_id,v.owner_username,v.booking_date,coalesce(v.payload->>'customer',v.reference,''),
coalesce((v.payload->>'adults')::int,0)+coalesce((v.payload->>'childBed')::int,0)+coalesce((v.payload->>'childNoBed')::int,0)+coalesce((v.payload->>'infants')::int,0),
coalesce((v.payload->>'adults')::int,0),coalesce((v.payload->>'childBed')::int,0),coalesce((v.payload->>'childNoBed')::int,0),coalesce((v.payload->>'infants')::int,0),
coalesce((v.payload->>'umrahDays')::int,0),coalesce(v.total,0),v.payload
from public.vouchers v
on conflict(voucher_id) do update set payload=excluded.payload,total=excluded.total,updated_at=now();

-- Seed the centralized configuration only if it doesn't already exist.
insert into public.app_config(key,value) values
('fx', '75'::jsonb),
('hotels','[]'::jsonb),
('visaTypes','[]'::jsonb),
('airlines','[]'::jsonb),
('transport','[]'::jsonb),
('extras','[]'::jsonb)
on conflict(key) do nothing;

-- Ensure profile creation stores registration metadata, including security question.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path=public as $$
begin
  insert into public.profiles(
    id,username,email,first_name,last_name,contact,agency,address,
    security_question,security_answer_hash
  )
  values(
    new.id,
    coalesce(new.raw_user_meta_data->>'username',split_part(new.email,'@',1)),
    new.email,
    new.raw_user_meta_data->>'firstName',
    new.raw_user_meta_data->>'lastName',
    new.raw_user_meta_data->>'contact',
    new.raw_user_meta_data->>'agency',
    new.raw_user_meta_data->>'address',
    new.raw_user_meta_data->>'securityQuestion',
    case when coalesce(new.raw_user_meta_data->>'securityAnswer','')<>'' 
      then crypt(lower(trim(new.raw_user_meta_data->>'securityAnswer')),gen_salt('bf')) else null end
  )
  on conflict(id) do update set
    username=coalesce(excluded.username,public.profiles.username),
    email=coalesce(excluded.email,public.profiles.email),
    first_name=coalesce(excluded.first_name,public.profiles.first_name),
    last_name=coalesce(excluded.last_name,public.profiles.last_name),
    contact=coalesce(excluded.contact,public.profiles.contact),
    agency=coalesce(excluded.agency,public.profiles.agency),
    address=coalesce(excluded.address,public.profiles.address),
    security_question=coalesce(excluded.security_question,public.profiles.security_question),
    security_answer_hash=coalesce(excluded.security_answer_hash,public.profiles.security_answer_hash),
    updated_at=now();
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();
