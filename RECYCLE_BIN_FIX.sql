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
