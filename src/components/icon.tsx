import type { SVGProps } from "react";

/**
 * Inline stroke icons. No icon-library dependency: the site only needs a
 * handful of glyphs, and inlining keeps the bundle small.
 *
 * Icons are decorative by default (`aria-hidden`). Any icon that carries
 * meaning on its own must be given an accessible name by the caller.
 */
export type IconName =
  | "mosque"
  | "calendar"
  | "book"
  | "users"
  | "heart"
  | "phone"
  | "mail"
  | "map-pin"
  | "clock"
  | "arrow-right"
  | "menu"
  | "close"
  | "sparkle"
  | "shield"
  | "quote"
  | "direction"
  | "wallet";

const paths: Record<IconName, React.ReactNode> = {
  mosque: (
    <>
      <path d="M12 2c1.2 1.6 2 2.9 2 4a2 2 0 0 1-4 0c0-1.1.8-2.4 2-4Z" />
      <path d="M3 21v-7a9 9 0 0 1 18 0v7" />
      <path d="M3 21h18" />
      <path d="M9 21v-4a3 3 0 0 1 6 0v4" />
      <path d="M1 21h2" />
      <path d="M21 21h2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
    </>
  ),
  book: (
    <>
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 0 4 22Z" />
      <path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  heart: (
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21.2l7.7-7.8 1.1-1a5.5 5.5 0 0 0 0-7.8Z" />
  ),
  phone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </>
  ),
  "map-pin": (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  "arrow-right": (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  close: (
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </>
  ),
  sparkle: (
    <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4Z" />
  ),
  shield: (
    <path d="M12 2 4 5.5V11c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5.5Z" />
  ),
  quote: (
    <path d="M9 7H5.5A2.5 2.5 0 0 0 3 9.5V12h6V7Zm0 0v5m12-5h-3.5A2.5 2.5 0 0 0 15 9.5V12h6V7Zm0 0v5" />
  ),
  direction: (
    <>
      <path d="m3 11 19-9-9 19-2-8Z" />
    </>
  ),
  wallet: (
    <>
      <path d="M20 8V6.5A2.5 2.5 0 0 0 17.5 4H5a2 2 0 0 0 0 4h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V6" />
      <circle cx="17" cy="13" r="1.2" />
    </>
  ),
};

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
};

export function Icon({ name, size = 20, className, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
