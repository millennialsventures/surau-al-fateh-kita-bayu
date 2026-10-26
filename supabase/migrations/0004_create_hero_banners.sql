-- Migrasi 0004: Jadual Hero Banners (carousel awam) + Supabase Storage bucket

create table if not exists public.hero_banners (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc'::text, now()),
  image_path text not null,
  alt_text text not null default '',
  caption text,
  is_active boolean not null default true,
  sort_order integer not null default 0
);

create index if not exists hero_banners_is_active_idx on public.hero_banners (is_active);
create index if not exists hero_banners_sort_order_idx on public.hero_banners (sort_order);

alter table public.hero_banners enable row level security;

-- Pelawat awam hanya boleh membaca banner yang aktif; tiada kebenaran tulis untuk anon.
create policy "hero_banners_select_active_public"
  on public.hero_banners
  for select
  to anon, authenticated
  using (is_active = true);

-- Bucket Storage untuk imej banner (public — imej pemasaran awam, tiada keperluan signed URL)
insert into storage.buckets (id, name, public)
values ('hero-banners', 'hero-banners', true)
on conflict (id) do nothing;

-- Benarkan baca awam bagi objek dalam bucket ini sahaja; tulis/padam hanya melalui service_role.
create policy "hero_banners_objects_select_public"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'hero-banners');
