-- Migrasi 0001: Pendaftaran Ahli Kariah Surau Al-Fateh KITA Bayu

create table if not exists public.pendaftaran_kariah (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc'::text, now()),
  nama_penuh text not null,
  no_kp text not null,
  alamat_kp text not null,
  alamat_semasa text not null,
  no_telefon text not null,
  email text,
  status_perkahwinan text not null default 'bujang',
  pekerjaan text,
  tempoh_menetap text not null,
  bilangan_tanggungan integer not null default 0,
  perakuan boolean not null default true,
  status text not null default 'menunggu_kelulusan',
  catatan_admin text,
  tarikh_kelulusan timestamptz,
  diluluskan_oleh text,
  constraint status_check check (status in ('menunggu_kelulusan', 'diluluskan', 'ditolak'))
);

-- Indeks carian dan tapisan
create index if not exists pendaftaran_kariah_created_at_desc_idx on public.pendaftaran_kariah (created_at desc);
create index if not exists pendaftaran_kariah_status_idx on public.pendaftaran_kariah (status);
create index if not exists pendaftaran_kariah_no_kp_idx on public.pendaftaran_kariah (no_kp);

-- Kawalan Keselamatan Peringkat Baris (RLS)
alter table public.pendaftaran_kariah enable row level security;

-- Pelawat awam / anon hanya dibenarkan membuat INSERT (hantar borang permohonan)
create policy "pendaftaran_kariah_insert_public"
  on public.pendaftaran_kariah
  for insert
  to anon, authenticated
  with check (true);

-- Tiada kebenaran SELECT / UPDATE / DELETE untuk kunci anon bagi menjaga privasi data (PDPA).
-- Pengurusan data hanya dilakukan dari pelayan (Server Action) menggunakan service_role key.
