import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/container";
import { isUserAdmin } from "./actions";
import { LogoutButton } from "./logout-button";

/** Minimal admin chrome — no public header, footer or WhatsApp button. */
export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const authenticated = await isUserAdmin();

  return (
    <>
      <header className="sticky top-0 z-50 bg-forest text-white shadow-sm">
        <Container>
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo-ek-kitabayu.png"
                alt="Logo Surau Al-Fateh"
                width={40}
                height={40}
                className="size-10 shrink-0 rounded-full bg-white object-contain p-0.5"
              />
              <span className="flex flex-col leading-tight">
                <span className="font-display text-base font-bold tracking-tight">AL-FATEH</span>
                <span className="text-[0.65rem] font-semibold tracking-[0.16em] text-white/70 uppercase">
                  Panel Pentadbir
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="rounded-full px-3 py-2 text-xs font-semibold text-white/80 transition-colors hover:text-white"
              >
                ← Laman Utama
              </Link>
              {authenticated ? <LogoutButton /> : null}
            </div>
          </div>
        </Container>
      </header>

      <main id="main" className="flex-1 bg-sand">
        {children}
      </main>
    </>
  );
}
