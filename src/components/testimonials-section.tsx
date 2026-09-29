import { testimonials } from "@/content/testimonials";
import { Container } from "./container";

export function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <Container>
        {/* Header */}
        <div className="text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-forest">
              KATA
            </h2>
            <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#b8860b]">
              KARIAH
            </span>
          </div>
          <p className="mt-1.5 text-xs sm:text-sm text-ink-soft">
            Apa kata ahli kariah tentang Surau Al-Fateh
          </p>
        </div>

        {/* 3 Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-sand border border-hairline shadow-xs hover:shadow-md transition-shadow"
            >
              <div>
                <span className="font-serif text-4xl sm:text-5xl font-black text-leaf leading-none select-none block mb-2">
                  &ldquo;&ldquo;
                </span>
                <p className="text-xs sm:text-sm text-ink leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-hairline/80">
                <p className="font-display text-xs sm:text-sm font-bold text-forest">
                  {t.author}
                </p>
                <p className="text-[0.7rem] text-ink-soft">
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
