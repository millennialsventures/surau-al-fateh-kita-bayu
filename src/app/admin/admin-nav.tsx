"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Icon, type IconName } from "@/components/icon";

const navItems: { href: "/admin" | "/admin/banners"; label: string; icon: IconName }[] = [
  { href: "/admin", label: "Papan Pemuka", icon: "clipboard-list" },
  { href: "/admin/banners", label: "Banner", icon: "image" },
];

interface AdminNavProps {
  authenticated: boolean;
}

export function AdminNav({ authenticated }: AdminNavProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  if (!authenticated) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Tutup menu" : "Buka menu"}
        aria-expanded={isOpen}
        className="fixed top-20 left-4 z-40 flex size-10 items-center justify-center rounded-full bg-forest text-white shadow-md lg:hidden"
      >
        <Icon name={isOpen ? "close" : "menu"} size={18} />
      </button>

      {isOpen ? (
        <div
          aria-hidden="true"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 translate-x-0 bg-white p-4 shadow-xl transition-transform duration-300 ease-[var(--ease-calm)] lg:sticky lg:top-16 lg:z-0 lg:h-[calc(100vh-4rem)] lg:w-60 lg:shrink-0 lg:translate-x-0 lg:border-r lg:border-hairline lg:bg-sand lg:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav aria-label="Navigasi pentadbir" className="mt-16 space-y-1 lg:mt-0">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                  active ? "bg-forest text-white" : "text-forest/80 hover:bg-brand-50"
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
