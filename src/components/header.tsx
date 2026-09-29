"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { site } from "@/lib/site";
import { Container } from "./container";
import { Icon } from "./icon";
import { TopBar } from "./top-bar";

export interface HeaderProps {
  onOpenInfaqModal?: () => void;
}

const navLinks = [
  { href: "/", label: "Utama" },
  { href: "/#tentang", label: "Tentang Kami" },
  { href: "/#aktiviti", label: "Aktiviti" },
  { href: "/#perkhidmatan", label: "Info Surau" },
  { href: "/gallery", label: "Galeri" },
  { href: "/contact", label: "Hubungi" },
];

export function Header({ onOpenInfaqModal }: HeaderProps) {
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
    <>
      <TopBar />
      <header className="sticky top-0 z-40 border-b border-hairline bg-white/95 backdrop-blur-md shadow-xs">
        <Container>
          <div className="flex h-20 items-center justify-between gap-4">
            {/* Logo matching Demo132.png */}
            <Link
              href="/"
              className="flex items-center gap-3 transition-opacity hover:opacity-90"
              aria-label={`${site.name} — laman hadapan`}
            >
              <Image
                src="/logo-ek-kitabayu.png"
                alt="Logo Surau Al-Fateh"
                width={50}
                height={50}
                priority
                className="size-12 shrink-0 object-contain"
              />
              <span className="flex flex-col leading-tight">
                <span className="font-display text-lg font-bold tracking-tight text-forest sm:text-xl">
                  AL-FATEH
                </span>
                <span className="text-[0.65rem] font-semibold tracking-[0.16em] text-leaf uppercase">
                  KITA BAYU CYBERSOUTH
                </span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav aria-label="Navigasi utama" className="hidden lg:block">
              <ul className="flex items-center gap-1.5 xl:gap-2">
                {navLinks.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className={`rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                          active
                            ? "bg-brand-50 text-forest"
                            : "text-ink/80 hover:bg-brand-50/60 hover:text-forest"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}

                {/* JOM BERINFAQ CTA Button */}
                <li className="ml-3">
                  {onOpenInfaqModal ? (
                    <button
                      type="button"
                      onClick={onOpenInfaqModal}
                      className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-xs font-bold tracking-wider text-white uppercase shadow-md transition-all hover:bg-forest-600 hover:shadow-lg active:scale-95"
                    >
                      <span>JOM BERINFAQ</span>
                      <span className="text-sm">💚</span>
                    </button>
                  ) : (
                    <Link
                      href="/donate"
                      className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-xs font-bold tracking-wider text-white uppercase shadow-md transition-all hover:bg-forest-600 hover:shadow-lg active:scale-95"
                    >
                      <span>JOM BERINFAQ</span>
                      <span className="text-sm">💚</span>
                    </Link>
                  )}
                </li>
              </ul>
            </nav>

            {/* Mobile menu trigger */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                href="/donate"
                className="inline-flex items-center gap-1.5 rounded-full bg-forest px-3.5 py-1.5 text-xs font-bold text-white uppercase"
              >
                <span>INFAQ</span>
                <span className="text-xs">💚</span>
              </Link>
              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls="mobile-nav"
                className="inline-flex size-10 items-center justify-center rounded-full border border-hairline bg-white text-forest shadow-xs"
              >
                <span className="sr-only">{open ? "Tutup menu" : "Buka menu"}</span>
                <Icon name={open ? "close" : "menu"} size={20} />
              </button>
            </div>
          </div>
        </Container>

        {/* Mobile menu drawer */}
        {open ? (
          <div id="mobile-nav" className="border-t border-hairline bg-white lg:hidden">
            <Container className="py-4">
              <nav aria-label="Navigasi utama (mobile)">
                <ul className="grid gap-1.5">
                  {navLinks.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold text-ink hover:bg-brand-50 hover:text-forest"
                      >
                        {item.label}
                        <Icon name="arrow-right" size={16} className="text-leaf-400" />
                      </Link>
                    </li>
                  ))}
                  <li className="pt-2">
                    <Link
                      href="/donate"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center gap-2 rounded-xl bg-forest px-4 py-3.5 text-center text-sm font-bold text-white uppercase shadow-md"
                    >
                      <span>JOM BERINFAQ</span>
                      <span>💚</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </Container>
          </div>
        ) : null}
      </header>
    </>
  );
}
