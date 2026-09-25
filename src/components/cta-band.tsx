import { ButtonLink } from "./button";
import { Container } from "./container";
import { Icon, type IconName } from "./icon";

type CtaBandProps = {
  eyebrow?: string;
  title: string;
  description: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
  icon?: IconName;
};

export function CtaBand({
  eyebrow,
  title,
  description,
  primary,
  secondary,
  icon = "heart",
}: CtaBandProps) {
  return (
    <section className="bg-forest text-brand-50">
      <div className="pattern-geo-lg" aria-hidden="true">
        <Container className="py-14 sm:py-16">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-5">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gold-300/20 text-gold-200">
                <Icon name={icon} size={24} />
              </span>
              <div className="max-w-2xl">
                {eyebrow ? (
                  <p className="text-xs font-semibold tracking-[0.16em] text-gold-300 uppercase">
                    {eyebrow}
                  </p>
                ) : null}
                <h2 className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">
                  {title}
                </h2>
                <p className="mt-3 leading-relaxed text-brand-100">{description}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
              <ButtonLink href={primary.href} variant="onDark" withArrow>
                {primary.label}
              </ButtonLink>
              {secondary ? (
                <ButtonLink href={secondary.href} variant="onDarkOutline">
                  {secondary.label}
                </ButtonLink>
              ) : null}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
