-- Migrasi 0002: Tambah No Keahlian (Format SAF0001) bagi Ahli Kariah Surau Al-Fateh KITA Bayu
-- Dijalankan pada pangkalan data Supabase PostgreSQL

-- 1. Tambah lajur no_keahlian ke dalam jadual pendaftaran_kariah sekiranya belum wujud
alter table public.pendaftaran_kariah
  add column if not exists no_keahlian text unique;

-- 2. Cipta jujukan (sequence) nombor keahlian
create sequence if not exists public.kariah_no_keahlian_seq;

-- 3. Selaraskan (backfill) semua ahli kariah sedia ada yang berstatus 'diluluskan'
--    mengikut susunan tarikh pendaftaran terawal (created_at ASC)
do $$
declare
  r record;
  counter int := 1;
begin
  for r in (
    select id
    from public.pendaftaran_kariah
    where status = 'diluluskan'
    order by created_at asc
  )
  loop
    update public.pendaftaran_kariah
    set no_keahlian = 'SAF' || lpad(counter::text, 4, '0')
    where id = r.id and no_keahlian is null;

    counter := counter + 1;
  end loop;

  -- Setkan jujukan kepada nombor seterusnya (cth: jika 35 rekod diselaraskan, jujukan seterusnya bermula pada 36)
  perform setval('public.kariah_no_keahlian_seq', counter, false);
end $$;

-- 4. Cipta fungsi untuk memberikan No Keahlian secara automatik apabila status permohonan diluluskan
create or replace function public.assign_no_keahlian_on_approval()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  -- Hanya jana No Keahlian sekiranya status bertukar kepada 'diluluskan' dan belum mempunyai nombor
  if new.status = 'diluluskan' and (new.no_keahlian is null or new.no_keahlian = '') then
    new.no_keahlian := 'SAF' || lpad(nextval('public.kariah_no_keahlian_seq')::text, 4, '0');
  end if;
  return new;
end;
$$;

-- 5. Tambah trigger pada jadual pendaftaran_kariah
drop trigger if exists trg_assign_no_keahlian_on_approval on public.pendaftaran_kariah;

create trigger trg_assign_no_keahlian_on_approval
before insert or update on public.pendaftaran_kariah
for each row
execute function public.assign_no_keahlian_on_approval();

-- 6. Cipta indeks carian bagi mempercepatkan carian No Keahlian
create index if not exists pendaftaran_kariah_no_keahlian_idx on public.pendaftaran_kariah (no_keahlian);
