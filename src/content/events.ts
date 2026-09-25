/**
 * Seed content for the events page.
 *
 * The shape deliberately mirrors the `events` table that will be created in
 * Stage 3, so switching from static content to Supabase is a change of data
 * source only — components keep the same prop type.
 */
export type EventRecord = {
  id: string;
  slug: string;
  title_ms: string;
  description_ms: string;
  /** ISO 8601 with timezone offset. */
  starts_at: string;
  ends_at: string;
  location: string;
  /** Reserved for Supabase Storage; null until the committee uploads posters. */
  poster_url: string | null;
  is_published: boolean;
};

export const events: readonly EventRecord[] = [
  {
    id: "1",
    slug: "majlis-ilmah-pertama",
    title_ms: "Majlis Ilmah: Keutamaan Akhlak",
    description_ms:
      "Sesi pengajian bersama ustaz yang membincangkan akhlak Muslim harian dan cara mewujudkannya dalam kehidupan seharian.",
    starts_at: "2026-10-16T20:30:00+08:00",
    ends_at: "2026-10-16T22:00:00+08:00",
    location: "Dewan Surau Al-Fateh KITA",
    poster_url: null,
    is_published: true,
  },
  {
    id: "2",
    slug: "gotong-royong-kampung",
    title_ms: "Gotong-Royong Kampung",
    description_ms:
      "Membersihkan persekitaran surau dan Taman Bayu bersama-sama. Semua yang ingin menyertai dialu-alukan.",
    starts_at: "2026-11-07T07:30:00+08:00",
    ends_at: "2026-11-07T11:00:00+08:00",
    location: "Kawasan Bayu Cybersouth",
    poster_url: null,
    is_published: true,
  },
  {
    id: "3",
    slug: "karnival-ramadan",
    title_ms: "Program Karnival Ramadan",
    description_ms:
      "Rangkaian program sepanjang bulan Ramadan termasuk majlis taklim, solat terawud dan bakti sosial. Tarikh terperinci akan diumumkan.",
    starts_at: "2027-02-01T08:00:00+08:00",
    ends_at: "2027-03-01T22:00:00+08:00",
    location: "Surau Al-Fateh KITA",
    poster_url: null,
    is_published: true,
  },
] as const;

/** Published events only, soonest first — matches the planned DB index. */
export const publishedEvents = events
  .filter((event) => event.is_published)
  .slice()
  .sort((a, b) => a.starts_at.localeCompare(b.starts_at));
