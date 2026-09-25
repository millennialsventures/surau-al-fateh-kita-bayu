"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { khairatKematianUrl, primaryNav, site } from "@/lib/site";

import { Container } from "./container";
import { Icon } from "./icon";

/** Shown in the desktop bar. "Utama" is omitted because the logo is the home link. */
const desktopHrefs = [
  "/about",
  "/programs",
  "/events",
  "/gallery",
  "/leadership",
  "/donate",
  khairatKematianUrl,
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Escape closes the drawer.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-sand/90 backdrop-blur-md">
      <Container>
        <div className="flex h-18 items-center justify-between gap-4 py-3">
          <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} — laman hadapan`}>
            <Image
              src="/logo-ek-kitabayu.png"
              alt=""
              width={44}
              height={44}
              priority
              className="size-11 shrink-0"
            />
            <span className="flex flex-col leading-tight">
              <span className="font-display text-base font-semibold text-forest sm:text-lg">
                {site.name}
              </span>
              <span className="text-[0.7rem] tracking-[0.12em] text-ink-soft uppercase">
                {site.tagline}
              </span>
            </span>
          </Link>

          <nav aria-label="Navigasi utama" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {desktopHrefs.map((href) => {
                const item = primaryNav.find((entry) => entry.href === href);
                if (!item) return null;
                const active = pathname === href;
                const className = `rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-brand-50 text-forest"
                    : "text-ink-soft hover:bg-white hover:text-forest"
                }`;

                return (
                  <li key={href}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={className}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={className}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
              <li className="ml-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-600"
                >
                  <Icon name="phone" size={16} />
                  Hubungi
                </Link>
              </li>
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="inline-flex size-11 items-center justify-center rounded-full border border-hairline bg-white text-forest lg:hidden"
          >
            <span className="sr-only">{open ? "Tutup menu" : "Buka menu"}</span>
            <Icon name={open ? "close" : "menu"} size={22} />
          </button>
        </div>
      </Container>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-hairline bg-white lg:hidden"
        >
          <Container className="py-4">
            <nav aria-label="Navigasi utama (mobile)">
              <ul className="grid gap-1">
                {primaryNav.map((item) => {
                  const active = pathname === item.href;
                  const className = `flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium ${
                    active ? "bg-brand-50 text-forest" : "text-ink"
                  }`;
                  const body = (
                    <>
                      <span>{item.label}</span>
                      <span className="text-xs text-ink-soft">{item.description}</span>
                    </>
                  );

                  return (
                    <li key={item.href}>
                      {item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setOpen(false)}
                          className={className}
                        >
                          {body}
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className={className}
                        >
                          {body}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
