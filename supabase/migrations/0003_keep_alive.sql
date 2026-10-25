-- Migrasi 0003: Jadual & fungsi keep-alive untuk mengelakkan projek Supabase (free-tier) di-pause

-- Jadual satu baris yang menyimpan masa ping terakhir
create table if not exists public.keep_alive (
  id integer primary key default 1,
  last_ping timestamptz not null default timezone('utc'::text, now()),
  constraint keep_alive_single_row check (id = 1)
);

-- RLS diaktifkan tanpa sebarang polisi: anon tidak boleh baca/tulis jadual ini secara terus
alter table public.keep_alive enable row level security;

-- Fungsi RPC yang melakukan aktiviti tulis sebenar pada pangkalan data.
-- security definer membolehkan anon mengemas kini satu cap masa sahaja tanpa akses kepada data lain.
create or replace function public.keep_alive_ping()
returns timestamptz
language plpgsql
security definer
set search_path = public
as $$
declare
  ping_time timestamptz;
begin
  insert into public.keep_alive (id, last_ping)
  values (1, timezone('utc'::text, now()))
  on conflict (id) do update set last_ping = excluded.last_ping
  returning last_ping into ping_time;

  return ping_time;
end;
$$;

revoke all on function public.keep_alive_ping() from public;
grant execute on function public.keep_alive_ping() to anon, authenticated;
