import type { IconName } from "@/components/icon";

export type Program = {
  id: string;
  title: string;
  summary: string;
  description: string;
  /** Human-readable schedule, e.g. "Setiap hari selepas Solat Maghrib". */
  schedule: string;
  audience: string;
  icon: IconName;
  featured: boolean;
};

/**
 * Regular programmes. Descriptive only — there is no enrolment or booking
 * system, so each entry is plain content the committee can edit here.
 */
export const programs: readonly Program[] = [
  {
    id: "solat-jamaah",
    title: "Solat Berjamaah",
    summary: "Lima waktu solat-solat dilakukan secara berjamaah.",
    description:
      "Solat lima waktu dan solat Jumaat dilakukan bersama-sama. Semua orang dialu-alukan, sama ada penduduk setempat atau pendatang.",
    schedule: "Lima waktu setiap hari",
    audience: "Semua penghuni dan pengunjung",
    icon: "mosque",
    featured: true,
  },
  {
    id: "kelas-al-quran",
    title: "Kelas Al-Quran",
    summary: "Mengaji Al-Quran mengikut tahap kemampuan.",
    description:
      "Peserta belajar membaca dengan tartib dan dibimbing oleh guru Al-Quran. Kumpulan dibahagikan mengikut tahap.",
    schedule: "Setiap minggu",
    audience: "Kanak-kanak dan dewasa",
    icon: "book",
    featured: true,
  },
  {
    id: "majlis-ilmah",
    title: "Majlis Ilmah",
    summary: "Kajian kitab, ceramah dan pengajian ilmiah.",
    description:
      "Siri pengajian terbuka kepada umum. Topik merangkumi akhlak, muamalat dan tafsir.",
    schedule: "Bulanan",
    audience: "Dewasa dan remaja",
    icon: "quote",
    featured: true,
  },
  {
    id: "tahlil-arwah",
    title: "Tahlil dan Doa",
    summary: "Membaca doa untuk arwah dan warga emas.",
    description:
      "Sesi tahlil sambil membaca doa untuk mereka yang telah wafat. Sumbangan untuk kos majlis dialu-alukan.",
    schedule: "Setiap Jumaat",
    audience: "Semua",
    icon: "heart",
    featured: false,
  },
  {
    id: "program-remaja",
    title: "Program Remaja",
    summary: "Aktiviti dan bimbingan untuk belia surau.",
    description:
      "Bengkel, sukan dan lawatan wakaf bagi mengisi masa lapang secara sihat.",
    schedule: "Bulanan",
    audience: "Remaja 13 hingga 19 tahun",
    icon: "users",
    featured: false,
  },
  {
    id: "bantuan-sosial",
    title: "Bantuan Sosial",
    summary: "Sumbangan dan sokongan kepada warga yang memerlukan.",
    description:
      "Bantuan boleh diberikan dalam bentuk wang tunai, barangan atau khidmat komuniti. Sila hubungi kami untuk berbincang.",
    schedule: "Mengikut keperluan",
    audience: "Warga komuniti",
    icon: "shield",
    featured: false,
  },
] as const;

export const featuredPrograms = programs.filter((program) => program.featured);
