import { site } from "@/lib/site";

import { ButtonAnchor } from "./button";
import { Icon, type IconName } from "./icon";

type ContactCardProps = {
  icon: IconName;
  title: string;
  value: string;
  detail?: string;
  href?: string;
  external?: boolean;
  /** True when the value is still a placeholder rather than real data. */
  isPlaceholder?: boolean;
  id?: string;
};

export function ContactCard({
  icon,
  title,
  value,
  detail,
  href,
  external = false,
  isPlaceholder = false,
  id,
}: ContactCardProps) {
  const body = (
    <>
      <span className="inline-flex size-10 items-center justify-center rounded-full bg-brand-50 text-leaf">
        <Icon name={icon} size={20} />
      </span>

      <div className="min-w-0 flex-1">
        <h3 className="font-display text-sm font-semibold tracking-[0.1em] text-gold uppercase">
          {title}
        </h3>
        <p
          className={`mt-1.5 text-base font-medium ${
            isPlaceholder ? "text-ink-soft italic" : "text-forest"
          }`}
        >
          {value}
        </p>
        {detail ? <p className="mt-1 text-sm text-ink-soft">{detail}</p> : null}
      </div>
    </>
  );

  const shell = `flex items-start gap-4 rounded-card border border-hairline bg-white p-5 ${
    href && !isPlaceholder ? "transition-colors hover:border-leaf-400/50 hover:bg-brand-50/40" : ""
  }`;

  if (href && !isPlaceholder) {
    return (
      <a
        id={id}
        href={href}
        className={shell}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {body}
      </a>
    );
  }

  return (
    <div id={id} className={shell}>
      {body}
    </div>
  );
}

export function ContactSection() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <ContactCard
        icon="map-pin"
        title="Alamat"
        value={`${site.address.line2}, ${site.address.line3}`}
        detail={`${site.address.postcode} ${site.address.country}`}
        href={site.maps.directions}
        external
      />

      <ContactCard
        id="whatsapp"
        icon="whatsapp"
        title="WhatsApp"
        value={site.contact.whatsappDisplay}
        detail="Hubungi untuk pertanyaan umum."
        href={`https://wa.me/${site.contact.whatsapp}`}
        external
      />

      <ContactCard
        icon="phone"
        title="Telefon"
        value={site.contact.phoneDisplay}
        href={`tel:${site.contact.whatsapp}`}
      />

      <ContactCard
        icon="mail"
        title="E-mel"
        value={site.contact.emailDisplay}
        href={`mailto:${site.contact.email}`}
      />
    </div>
  );
}

export function DirectionsButton() {
  return (
    <ButtonAnchor href={site.maps.directions} external>
      <Icon name="direction" size={18} />
      Dapatkan Arah
    </ButtonAnchor>
  );
}
