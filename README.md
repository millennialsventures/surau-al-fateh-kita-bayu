# Surau Al-Fateh KITA

Laman web awam dan panel pentadbiran untuk **Surau Al-Fateh KITA**, Bayu Cybersouth,
Cyberjaya, Selangor. Dibina dengan Next.js (App Router), TypeScript, Tailwind CSS v4,
Supabase dan Vercel.

Ini adalah projek **standalone** — ia tidak bergantung pada, dan tidak memerlukan,
mana-mana pakej atau token MasjidHub yang belum diterbitkan.

---

## Status

| Peringkat | Status |
| --- | --- |
| 1. Laman statik awam | **Siap** — 8 laluan, semua prerender statik |
| 2. Supabase + RLS | Belum bermula |
| 3. Panel admin | Belum bermula |
| 4. Peng-MS | Belum bermula |
| 5. Migrasi + data | Belum bermula |
| 6. Deploy Vercel | Belum bermula |
| 7. Serahan | Belum bermula |

Sebelum laman ini diterbitkan, semua medan yang bermula dengan `TODO:` mesti
diganti dengan data sebenar daripada jawatankuasa. Lihat
[Data yang masih belum disahkan](#data-yang-masih-belum-disahkan).

---

## Handoff peringkat

Arahan kerja terperinci bagi setiap peringkat ada dalam `docs/`:

- Peringkat 2 — Supabase + RLS: [`docs/STAGE-2.md`](docs/STAGE-2.md)

---

## Menjalankan secara lokal

```bash
npm install
npm run dev          # http://localhost:3000
```

Skrip lain:

```bash
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
npm run check:copy   # semak teks Bahasa Malaysia yang rosak
npm run verify       # check:copy + lint + typecheck + build
npm run build
```

---

## Struktur

```
src/
  app/                  # laluan (App Router)
    layout.tsx          # root layout, fon, metadata SEO
    page.tsx            # /
    about/ programs/ events/ gallery/ leadership/ contact/ donate/
    sitemap.ts robots.ts
  components/           # komponen UI dikongsi
  content/              # kandungan bertyped (sumber kebenaran tunggal untuk teks)  lib/site.ts           # identiti, alamat, telefon, navigasi
public/
  logo-ek-kitabayu.png  # logo rasmi
scripts/
  check-copy.py         # penjaga untuk teks BM yang rosak
```

### Mengubah kandungan

Kebanyakan teks lived di dua tempat sahaja:

- `src/lib/site.ts` — nama, alamat, nombor telefon, e-mel, waktu solat, navigasi
- `src/content/*.ts` — program, aktiviti, galeri, kepimpinan, pengumuman

Semua Typed dengan `readonly` Supaya content dan komponen kekal konsisten.

---

## Reka bentuk

Token warna dan tipografi lived di `src/app/globals.css` (`@theme`).

| Token | Nilai | Catatan |
| --- | --- | --- |
| `--color-forest` | `#004818` | utama, 10.8:1 ke atas putih |
| `--color-forest-600` | `#006018` | hover |
| `--color-leaf` | `#186030` | 7.6:1 |
| `--color-leaf-400` | `#307830` | 5.4:1 |
| `--color-gold` | `#786018` | accent, 5.7:1 |
| `--color-accent` | `#609048` | **dekoratif sahaja** (3.7:1) |
| `--color-ink-soft` | `#3d4b43` | teks badan, 8.9:1 |
| `--color-sand` | `#faf9f6` | latar laman |

Fon: **Archivo** (tajuk) dan **Inter** (teks badan), melalui `next/font`.

> `--color-accent` purposely tidak mencukupi nisbah AA untuk teks biasa dan
> hanya digunakan untuk hiasan. Jangan gunakannya untuk teks.

---

## Data yang masih belum disahkan

Semua nilai berikut masih ialah tempat letak dan **wajib** diisi sebelum
terbitan:

- Nombor WhatsApp, telefon dan e-mel (`src/lib/site.ts`)
- Butiran lokasi yang tepat (lot / seksyen)
- Nama sebenar ahli pengurusan dan ketua jabatan (`src/content/leadership.ts`)
- Nombor DuitNow, butiran bank dan kod QR (`src/app/donate/page.tsx`)
- Gambar galeri aktiviti (`src/content/gallery.ts`)
- Poster aktiviti (`poster_url` dalam `src/content/events.ts`)
- `NEXT_PUBLIC_SITE_URL` untuk domain sebenar

---

## Peringkat seterusnya

1. **Supabase** — jadual `events`, RLS dengan `is_published = true` untuk bacaan awam.
2. **Panel admin** — `/admin` dengan kata laluan kongsi (`ADMIN_PASSWORD`),
   termasuk operasi CRUD aktiviti dan kawalan penerbitan.
3. **Deploy** — Vercel dengan pemboleh ubah persekitaran dan migrasi.

Untuk seni bina Supabase dan tetapan keselamatan yang dirancang, rujuk
[`docs/STAGE-2.md`](docs/STAGE-2.md).

---

## Penjagaan

`scripts/check-copy.py` menjaga terhadap teks Bahasa Malaysia yang rosak
(tokden asing, aksara CJK/Cyrillic, dan perkataan yang terjejas).
Jalankan `npm run check:copy` sebelum setiap commit.

---

## Catatan Next.js

Repo ini menggunakan Next.js 16, yang mempunyai perubahan yang break. Baca
`node_modules/next/dist/docs/` sebelum menulis kod baharu — lihat `AGENTS.md`.
