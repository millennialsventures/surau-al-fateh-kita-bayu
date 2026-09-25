export type Announcement = {
  id: string;
  text: string;
  href: string;
};

/**
 * Short banner shown at the top of the home page. Only the first item is
 * rendered. Replace or remove once real announcements exist.
 */
export const announcements: readonly Announcement[] = [
  {
    id: "welcome",
    text: "Selamat datang ke Surau Al-Fateh KITA",
    href: "/about",
  },
] as const;
