# Peringkat 2 — Supabase + RLS

Handoff untuk peringkat kedua: menukar sumber data aktiviti daripada fail statik
`src/content/events.ts` kepada jadual Supabase, kemudian mengunci jadual itu
dengan Row Level Security (RLS) supaya pelawat awam hanya boleh membaca aktiviti
yang sudah diterbitkan.

**Status:** belum bermula. Dokumen ini ialah arahan kerja untuk sesi akan datang,
bukan rekapan kerja yang sudah disiapkan.

---

## 1. Skop

### Dalam skop

- Memasang `@supabase/supabase-js`.
- Mewujudkan jadual `public.events` melalui migrasi SQL yang boleh diulang.
- Mendayakan RLS: bacaan awam terhad kepada baris `is_published = true`.
- Menukar `/events` kepada sumber data Supabase tanpa mengubah komponen.
- Menyemai (seed) data contoh daripada `src/content/events.ts`.
- Menyediakan kunci pelayan untuk peringkat 3 sahaja, tanpa menulis sebarang
  kod tulis pada peringkat ini.

### Di luar skop

Item berikut sengaja tidak dijalankan pada peringkat ini:

- Menulis ke pangkalan data daripada pelayar (publish, create, update, delete).
- Pendaftaran, enrolment, atau borang penyertaan.
- Jadual aktiviti berulang atau kalendar.
- Pembayaran, DuitNow, atau integrasi pembayaran.
- Peta terbenam dalam laman.
- Apa-apa ciri MasjidHub.

---

## 2. Prasyarat

- Node.js dan npm sedia ada (nilai semasa: Node `v26.0.0`, npm `11.12.1`).
- Akaun Supabase dan satu projek baharu.
- Akaun Vercel dan repositori Git untuk peringkat 6.
- `.env*` sudah diabaikan oleh `.gitignore` — kunci rahsia tidak boleh di-commit.

---

## 3. Peta rujukan pantas

| Perkara | Nilai / lokasi |
| --- | --- |
| Pakej | `@supabase/supabase-js` |
| Klien bacaan awam | `src/lib/supabase.ts` (baharu) |
| Pengambil data | `src/lib/events.ts` (baharu) |
| Migrasi | `supabase/migrations/0001_create_events.sql` (baharu) |
| Kontrak data | `EventRecord` dalam `src/content/events.ts` |
| Laluan awam | `/events` |
| Laluan admin | `/admin` (peringkat 3, belum wujud) |

---

## 4. Langkah-langkah

### Langkah 1 — Pasang pakej

```bash
npm install @supabase/supabase-js
```

CLI Supabase tidak perlu dipasang secara global; jalankan melalui `npx`.

### Langkah 2 — Sediakan pemboleh ubah persekitaran

Cipta `.env.local` di root projek:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANOON_KEY=<kunci-anon>
SUPABASE_SERVICE_ROLE_KEY=<kunci-service-role>
```

Jadual penuh pemboleh ubah persekitaran ada di bahagian 6.

### Langkah 3 — Inisialisasi Supabase secara lokal

```bash
npx supabase init
npx supabase link --project-ref <project-ref>
```

`init` mencipta folder `supabase/` dan fail konfigurasi tempatan. `link`
menyambungkan folder itu kepada projek Supabase supaya migrasi boleh dihantar.

### Langkah 4 — Tulis migrasi

Cipta `supabase/migrations/0001_create_events.sql`:

```sql
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_ms text not null,
  description_ms text not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  location text not null,
  poster_url text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint events_ends_after_starts check (ends_at >= starts_at)
);

-- Membantu pertanyaan kalendar: aktiviti terdekat didahulukan.
create index if not exists events_starts_at_desc_idx
  on public.events (starts_at desc);

-- updated_at diselaraskan secara automatik.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists events_set_updated_at on public.events;
create trigger events_set_updated_at
  before update on public.events
  for each row execute function public.set_updated_at();
```

Nota skema:

- `slug` unik supaya pautan kekal boleh ditambah kemudian.
- `starts_at` dan `ends_at` ialah `timestamptz`; data sentiasa disimpan dengan
  offset zon waktu, contohnya `2026-10-16T20:30:00+08:00`.
- Satu baris bermaksud satu acara sekali. Tidak ada jadual berulang pada
  peringkat ini.
- `poster_url` kekal kosong sehingga jawatankuasa memuat naik poster; bucket
  Supabase Storage belum dicipta.

### Langkah 5 — Dayakan RLS

Tambah pada fail migrasi yang sama, atau dalam migrasi baharu
`supabase/migrations/0002_events_rls.sql`:

```sql
alter table public.events enable row level security;

-- Baca sahaja, hanya baris yang sudah diterbitkan.
create policy "events_published_read_only"
  on public.events
  for select
  to anon, authenticated
  using (is_published = true);
```

Tiada policy `insert`, `update` atau `delete` yang dicipta. Peranan `anon` dan
`authenticated` dengan RLS dihidupkan tetapi tanpa policy akan ditolak pada
setiap percubaan tulis. Itu tingkah laku yang dikehendaki, bukan kesilapan yang
perlu dibaiki.

Hantar migrasi:

```bash
npx supabase db push
```

### Langkah 6 — Klien Supabase untuk bacaan awam

Cipta `src/lib/supabase.ts`:

```ts
import { createClient } from "@supabase/supabase-js";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Pemboleh ubah persekitaran ${name} tiada.`);
  }
  return value;
}

/**
 * Klien bacaan awam. Kunci anon hanya boleh membaca baris yang diterbitkan,
 * jadi klien ini selamat digunakan dalam Server Component.
 */
export function createPublicSupabaseClient() {
  return createClient(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireEnv("NEXT_PUBLIC_SUPABASE_ANOON_KEY"),
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
```

Kunci `service_role` tidak dimasukkan dalam fail ini dan tidak pernah diberi
nama bermula `NEXT_PUBLIC_`.

### Langkah 7 — Pengambil data

Cipta `src/lib/events.ts`:

```ts
import type { EventRecord } from "@/content/events";

import { createPublicSupabaseClient } from "@/lib/supabase";

const EVENT_COLUMNS =
  "id, slug, title_ms, description_ms, starts_at, ends_at, location, poster_url, is_published";

export async function getPublishedEvents(): Promise<EventRecord[]> {
  const supabase = createPublicSupabaseClient();

  const { data, error } = await supabase
    .from("events")
    .select(EVENT_COLUMNS)
    .eq("is_published", true)
    .order("starts_at", { ascending: true });

  if (error) throw error;

  // RLS sudah menapis baris; penapis di atas sekadar memudahkan pembacaan
  // kod dan tidak menggantikan RLS.
  return (data ?? []) as EventRecord[];
}
```

`EventRecord` kekal digunakan tanpa perubahan: `id` bertukar daripada `string`
seed kepada `uuid` (tetap `string` dalam TypeScript), dan PostgREST mengembalikan
`starts_at` serta `ends_at` sebagai rentetan ISO yang boleh diformat oleh
`EventCard` terus.

### Langkah 8 — Tukar sumber data di `/events`

Dalam `src/app/events/page.tsx`:

1. Buang import `publishedEvents` daripada `@/content/events`.
2. Import `getPublishedEvents` daripada `@/lib/events`.
3. Jadikan `EventsPage` satu fungsi `async` dan gunakan
   `const events = await getPublishedEvents();`.
4. Kekalkan `EventCard` dan komponen lain tanpa sebarang perubahan.

Mengenai cache: `next.config.ts` tidak mendayakan `cacheComponents`, jadi model
cache terdahulu terpakai dan `fetch` tidak di-cache secara bawaan. Tambahkan

```ts
export const revalidate = 300;
```

atau bungkus `getPublishedEvents` dengan `unstable_cache` daripada
`next/cache`. Pada peringkat 3, selepas jawatankuasa menerbitkan aktiviti, panggil
`revalidatePath("/events")` daripada Server Action supaya laman dikemas kini
segera.

Rujukan tempatan:
`node_modules/next/dist/docs/01-app/02-guides/caching-without-cache-components.md`
dan
`node_modules/next/dist/docs/01-app/03-api-reference/04-functions/revalidatePath.md`.

> Jika pemboleh ubah Supabase belum ditetapkan ketika `npm run build`
> dijalankan, `requireEnv` akan mencetuskan ralat dan build akan gagal. Tetapkan
> pemboleh ubah dahulu, atau pulangkan `publishedEvents` statik sebagai laluan
> sandaran sementara.

### Langkah 9 — Semai data contoh

Jalankan dalam SQL Editor Supabase, atau letakkan dalam
`supabase/seed.sql`:

```sql
insert into public.events
  (slug, title_ms, description_ms, starts_at, ends_at, location, poster_url, is_published)
values
  (
    'majlis-ilmah-pertama',
    'Majlis Ilmah: Keutamaan Akhlak',
    'Sesi pengajian bersama ustaz yang membincangkan akhlak Muslim harian dan cara mewujudkannya dalam kehidupan seharian.',
    '2026-10-16T20:30:00+08:00',
    '2026-10-16T22:00:00+08:00',
    'Dewan Surau Al-Fateh KITA',
    null,
    true
  ),
  (
    'gotong-royong-kampung',
    'Gotong-Royong Kampung',
    'Membersihkan persekitaran surau dan Taman Bayu bersama-sama. Semua yang ingin menyertai dialu-alukan.',
    '2026-11-07T07:30:00+08:00',
    '2026-11-07T11:00:00+08:00',
    'Kawasan Bayu Cybersouth',
    null,
    true
  ),
  (
    'karnival-ramadan',
    'Program Karnival Ramadan',
    'Rangkaian program sepanjang bulan Ramadan termasuk majlis taklim, solat terawud dan bakti sosial. Tarikh terperinci akan diumumkan.',
    '2027-02-01T08:00:00+08:00',
    '2027-03-01T22:00:00+08:00',
    'Surau Al-Fateh KITA',
    null,
    true
  ),
  -- Draf: sengaja tidak dipaparkan di laman awam.
  (
    'perbincangan-dalaman',
    'Perbincangan Dalaman',
    'Draf dalaman. Belum dibenarkan untuk diterbitkan.',
    '2027-04-01T20:30:00+08:00',
    '2027-04-01T22:00:00+08:00',
    'Surau Al-Fateh KITA',
    null,
    false
  )
on conflict (slug) do nothing;
```

`on conflict (slug) do nothing` menjadikan skrip ini boleh dijalankan semula
tanpa menghasilkan ralat.

---

## 5. Keselamatan

- Hanya kunci anon yang muncul dalam kod sisi pelayar. Pelawat awam hanya
  memerlukan kunci anon; kunci `service_role` hanya digunakan di pelayan.
- Jangan letakkan `SUPABASE_SERVICE_ROLE_KEY` dalam mana-mana pemboleh ubah
  `NEXT_PUBLIC_`, kerana ia akan dihantar kepada setiap pelayar yang memuatkan
  laman.
- `service_role` melangkau RLS. Kunci itu boleh membaca dan menulis mana-mana
  baris; anggap ia sama pentingnya dengan kata laluan pangkalan data.
- Panel admin pada peringkat 3 mesti menjadi Server Action atau Route Handler.
  Model kebenaran untuk tulisan ialah kunci `service_role` pada pelayan, bukan
  kunci anon.
- Model kebenaran peringkat 3 ialah kata laluan kongsi `ADMIN_PASSWORD` secara
  langsung, berserta operasi CRUD aktiviti dan kawalan penerbitan. Supabase Auth
  adalah pilihan, bukan syarat. Belum ada peranan setiap pengguna dan belum ada
  sejarah audit.
- Bukti RLS:

```sql
select policyname, cmd, roles, qual
from pg_policies
where tablename = 'events';
```

Satu baris sepatutnya kelihatan: `events_published_read_only`, `select`,
`{anon, authenticated}`, `(is_published = true)`.

---

## 6. Pemboleh ubah persekitaran

| Nama | Awam? | Tujuan |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | ya | Domain sebenar untuk metadata SEO (`src/app/layout.tsx`) |
| `NEXT_PUBLIC_SUPABASE_URL` | ya | URL projek Supabase (`src/lib/supabase.ts`) |
| `NEXT_PUBLIC_SUPABASE_ANOON_KEY` | ya | Kunci anon, hanya baca (`src/lib/supabase.ts`) |
| `SUPABASE_SERVICE_ROLE_KEY` | tidak | Tulisan; peringkat 3 sahaja |
| `ADMIN_PASSWORD` | tidak | Kata laluan panel; peringkat 3 sahaja |

Tetapkan pemboleh ubah yang sama dalam Vercel untuk Preview dan Production pada
peringkat 6. Untuk pembangunan lokal, `.env.local` memadai.

---

## 7. Kriteria penerimaan

- [ ] `npx supabase db push` berjaya tanpa ralat, dan `public.events` wujud
      dengan index `events_starts_at_desc_idx`.
- [ ] RLS dihidupkan pada `public.events`.
- [ ] Tiada policy `insert`, `update` atau `delete`.
- [ ] Pelawat awam dengan kunci anon hanya melihat aktiviti `is_published = true`.
      Draf `perbincangan-dalaman` tidak muncul di `/events`.
- [ ] Cubaan tulis dengan kunci anon ditolak dengan ralat permission denied.
- [ ] `/events` masih dipra-render atau di-cache dengan betul, dan `EventCard`
      tidak berubah.
- [ ] `npm run verify` lulus sepenuhnya.
- [ ] `.env*` tidak di-commit.

---

## 8. Kekal terbuka

1. **`NEXT_PUBLIC_SUPABASE_ANOON_KEY` dikekalkan dengan ejaan ini.** Nama itu
   mungkin salah taip `ANON`, tetapi ia dikekalkan atas arahan pemilik projek.
   Jika mahu dibetulkan, lakukan sekali sahaja pada peringkat 6 dan kemas kini
   semua tempat yang memetiknya.
2. **Komentar dalam `src/content/events.ts` bercanggah dengan peringkat ini.**
   Komen tersebut menyatakan jadual `events` akan dicipta pada peringkat 3,
   sedangkan peringkat 2 yang memilikinya. Betulkan komen itu dalam sesi yang
   sama.
3. **`poster_url` masih kosong.** Bucket Supabase Storage belum dicipta; muat
   naik poster adalah kerja peringkat 3 atau selepasnya.
4. **Pautan `/admin` sudah wujud** dalam `footerNav` (`src/lib/site.ts`) tetapi
   laluannya belum wujud sehingga peringkat 3, jadi ia mengembalikan 404.
   Sembunyikan atau tambah bersama panel admin.
5. **Tautan Waze belum ada** di halaman hubungi; hanya Google Maps `directions`
   dan `search` digunakan sekarang.
6. **Semakan semantik Bahasa Malaysia** masih berpending. Ayat dalam
   `src/content/*.ts` dan `src/lib/site.ts` perlu disemak oleh jawatankuasa.

---

## 9. Data yang masih belum disahkan

Semua nilai berikut ialah tempat letak dan mesti diisi jawatankuasa sebelum
terbitan:

| Data | Lokasi |
| --- | --- |
| Nombor WhatsApp, telefon, e-mel | `src/lib/site.ts` |
| Butiran lokasi (lot / seksyen) | `src/lib/site.ts` |
| Nama ahli pengurusan dan ketua jabatan | `src/content/leadership.ts` |
| Gambar galeri aktiviti | `src/content/gallery.ts` |
| Nombor DuitNow, butiran bank, kod QR | `src/app/donate/page.tsx` |
| Poster aktiviti | lajur `poster_url` pada jadual `events` |
| `NEXT_PUBLIC_SITE_URL` untuk domain sebenar | Pemboleh ubah persekitaran |

---

## 10. Reka bentuk dan aksesibiliti

- Kekalkan orientasi mobile-first yang sedia ada.
- `EventCard` memformat tarikh dalam zon `Asia/Kuala_Lumpur` dan locale `ms-MY`;
  kekalkan nilai ini.
- Elemen `<time dateTime>` sudah ada. Pastikan nilai `starts_at` kekal merangkumi
  offset zon waktu.
- Nisbah WCAG AA dalam `src/app/globals.css` tidak boleh dikorbankan;
  `--color-accent` kekal dekoratif sahaja.

---

## 11. Deploy Vercel (peringkat 6, rujukan)

- Sambungkan repositori Git dan biarkan Vercel membina setiap push.
- Tambahkan pemboleh ubah persekitaran untuk Preview dan Production.
- Jalankan migrasi di luar proses build Vercel, iaitu `supabase db push` dari
  mesin yang mempunyai akses CLI.
- Analytics dan domain tersuai adalah pilihan.

---

## 12. Senarai semak untuk sesi seterusnya

- [ ] Baca `node_modules/next/dist/docs/` untuk API semasa sebelum menukar
      cache atau laluan.
- [ ] `npm install @supabase/supabase-js`
- [ ] Tambah `NEXT_PUBLIC_SUPABASE_URL` dan kunci anon ke `.env.local`
- [ ] `npx supabase init` dan `npx supabase link --project-ref <ref>`
- [ ] Tulis `supabase/migrations/0001_create_events.sql`
- [ ] Tulis policy RLS, kemudian `npx supabase db push`
- [ ] Semai data contoh, termasuk satu draf tidak diterbitkan
- [ ] `src/lib/supabase.ts` dan `src/lib/events.ts`
- [ ] `/events` kepada data dinamik dengan `export const revalidate = 300`
- [ ] Uji RLS: baca berjaya, tulis ditolak
- [ ] `npm run verify`
- [ ] Kemas kini bahagian Status dan data yang belum disahkan dalam README
