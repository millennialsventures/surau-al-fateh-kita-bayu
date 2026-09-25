/**
 * Single source of truth for organisation identity, contact details and
 * navigation. Every page and component reads from here so that changing a
 * phone number or address is a one-line edit.
 *
 * Fields prefixed with TODO are not yet confirmed by the surau committee and
 * must be replaced before the site goes live.
 */

export const site = {
  name: "Surau Al-Fateh KITA",
  shortName: "Surau Al-Fateh",
  tagline: "Rumah Ibadah Untuk Semua",
  description:
    "Surau Al-Fateh KITA ialah rumah ibadah komuniti di Bayu Cybersouth, Cyberjaya. Tempat solat berjamaah, mengaji dan berkhidmat kepada penduduk sekampung dengan santun dan terbuka.",
  shortDescription:
    "Rumah ibadah komuniti di Bayu Cybersouth, Cyberjaya — solat berjamaah, majlis ilmah dan program komuniti.",

  locale: "ms-MY",
  lang: "ms",
  themeColor: "#004818",

  address: {
    line1: "Surau Al-Fateh KITA",
    line2: "Bayu Cybersouth",
    line3: "Cyberjaya, Selangor",
    postcode: "63000",
    country: "Malaysia",
    /** TODO: confirm the exact lot / section reference with the committee. */
    landmark: "TODO: butiran lokasi",
  },

  contact: {
    /** TODO: replace with the official WhatsApp number (E.164, digits only). */
    whatsapp: "",
    whatsappDisplay: "TODO: nombor WhatsApp",
    phoneDisplay: "TODO: nombor telefon",
    email: "",
    emailDisplay: "TODO: alamat e-mel",
  },

  social: {
    facebook: "",
    instagram: "",
    youtube: "",
    tiktok: "",
  },

  /**
   * Map links are deep links only — no embedded map, which keeps the page
   * fast, avoids a third-party cookie banner, and loads well on the slower
   * mobile connections common in the area.
   */
  maps: {
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=Bayu+Cybersouth+Cyberjaya+Selangor",
    search:
      "https://www.google.com/maps/search/?api=1&query=Bayu+Cybersouth+Cyberjaya+Selangor",
  },

  hours: [
    { label: "Solat Subuh", value: "05:30" },
    { label: "Solat Zohor", value: "13:15" },
    { label: "Solat Asar", value: "16:30" },
    { label: "Solat Maghrib", value: "19:15" },
    { label: "Solat Isyak", value: "20:30" },
  ],

  /** Label shown wherever data is still unconfirmed. */
  todoLabel: "Maklumat belum disahkan",
} as const;

export type Site = typeof site;

export type NavItem = {
  href: string;
  label: string;
  description: string;
  /**
   * Outbound link. Consumers must render it as a plain anchor opened in a new
   * tab, and must never treat it as a local route (no active state, no
   * sitemap entry).
   */
  external?: boolean;
};

/** Outbound partner service, kept here so the URL is defined in one place. */
export const khairatKematianUrl = "https://www.e-khairat.com/";

/** Primary navigation, used by the header, mobile menu and footer. */
export const primaryNav = [
  { href: "/", label: "Utama", description: "Laman hadapan" },
  { href: "/about", label: "Tentang", description: "Mengenai surau kami" },
  { href: "/events", label: "Aktiviti", description: "Aktiviti dan acara" },
  { href: "/programs", label: "Program", description: "Program belajar tetap" },
  { href: "/gallery", label: "Galeri", description: "Gambar aktiviti" },
  { href: "/leadership", label: "Kepimpinan", description: "Jabatan dan jawatankuasa" },
  { href: "/contact", label: "Hubungi", description: "Lokasi dan cara menghubungi" },
  { href: "/donate", label: "Derma", description: "Cara menyumbangkan" },
  {
    href: khairatKematianUrl,
    label: "Khairat Kematian",
    description: "Perkhidmatan khairat",
    external: true,
  },
] satisfies readonly NavItem[];

/** Shown as a highlighted button in the header. */
export const ctaNav = {
  href: "/contact",
  label: "Hubungi Kami",
} as const;

/** Footer link groups. */
export const footerNav = [
  {
    title: "Surau",
    items: [
      { href: "/about", label: "Tentang Kami" },
      { href: "/leadership", label: "Kepimpinan" },
      { href: "/gallery", label: "Galeri" },
    ],
  },
  {
    title: "Program",
    items: [
      { href: "/programs", label: "Program" },
      { href: "/events", label: "Aktiviti" },
      { href: "/donate", label: "Derma" },
    ],
  },
  {
    title: "Hubungi",
    items: [
      { href: "/contact", label: "Lokasi & Akses" },
      { href: "/contact#whatsapp", label: "WhatsApp" },
      { href: "/admin", label: "Admin" },
    ],
  },
] as const;
