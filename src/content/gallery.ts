export type GalleryCategory = "solat" | "program" | "kegiatan" | "kampus";

export type GalleryItem = {
  id: string;
  title: string;
  category: GalleryCategory;
  caption: string;
  /** TODO: replace with real photographs under /public/gallery. */
  image: string | null;
};

/**
 * Placeholder gallery. No photography has been supplied yet, so every tile
 * renders a labelled placeholder rather than a broken image.
 */
export const gallery: readonly GalleryItem[] = [
  {
    id: "g1",
    title: "Solat Berjamaah",
    category: "solat",
    caption: "Suasana solat lima waktu di dewan surau.",
    image: null,
  },
  {
    id: "g2",
    title: "Kelas Al-Quran",
    category: "program",
    caption: "Sesi mengaji untuk kanak-kanak.",
    image: null,
  },
  {
    id: "g3",
    title: "Gotong-Royong",
    category: "kegiatan",
    caption: "Aktiviti membersihkan kawasan komuniti.",
    image: null,
  },
  {
    id: "g4",
    title: "Majlis Ilmah",
    category: "program",
    caption: "Kajian kitab terbuka kepada umum.",
    image: null,
  },
  {
    id: "g5",
    title: "Kampus Surau",
    category: "kampus",
    caption: "Kawasan Bayu Cybersouth.",
    image: null,
  },
  {
    id: "g6",
    title: "Program Remaja",
    category: "program",
    caption: "Bengkel dan sukan untuk belia surau.",
    image: null,
  },
] as const;

export const galleryCategories: readonly { value: GalleryCategory; label: string }[] = [
  { value: "solat", label: "Solat" },
  { value: "program", label: "Program" },
  { value: "kegiatan", label: "Kegiatan" },
  { value: "kampus", label: "Kampus" },
] as const;
