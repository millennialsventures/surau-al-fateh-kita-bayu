import Image from "next/image";
import Link from "next/link";

import { footerNav, site } from "@/lib/site";

import { Container } from "./container";
import { Icon } from "./icon";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-hairline bg-forest text-brand-100">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="sm:col-span-2 lg:col-span-3">
            <div className="flex items-center gap-3">
              <Image
                src="/logo-ek-kitabayu.png"
                alt=""
                width={52}
                height={52}
                className="size-13 shrink-0"
              />
              <div>
                <p className="font-display text-lg font-semibold text-white">{site.name}</p>
                <p className="text-sm text-brand-200">{site.tagline}</p>
              </div>
            </div>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-brand-200">
              {site.description}
            </p>

            <address className="mt-6 space-y-3 text-sm not-italic text-brand-100">
              <p className="flex items-start gap-3">
                <span className="mt-0.5 text-gold-300">
                  <Icon name="map-pin" size={18} />
                </span>
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.line2}, {site.address.line3} {site.address.postcode}
                </span>
              </p>

              <p className="flex items-center gap-3">
                <span className="text-gold-300">
                  <Icon name="phone" size={18} />
                </span>
                <span>{site.contact.whatsappDisplay}</span>
              </p>
            </address>
          </div>

          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title} className="lg:col-span-1">
              <h2 className="font-display text-sm font-semibold tracking-[0.12em] text-gold-300 uppercase">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-brand-100 transition-colors hover:text-white hover:underline hover:underline-offset-4"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-brand-600/40 pt-6 text-xs text-brand-200 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Hak cipta terpelihara.
          </p>
          <p>Dibina dengan sokongan komuniti.</p>
        </div>
      </Container>
    </footer>
  );
}
