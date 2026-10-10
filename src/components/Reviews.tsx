import { BadgeCheck, Star } from "lucide-react";
import { REVIEWS } from "../data/site";
import { Reveal } from "./Reveal";

export function Reviews() {
  return (
    <section id="reviews" className="bg-mist py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-ink">
              40,000+ homes<span className="text-blue">,</span>
              <br />
              all five-starred<span className="text-blue">.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-5 flex items-center justify-center gap-2.5">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" strokeWidth={0} />
                ))}
              </div>
              <p className="text-sm text-sub">
                <span className="font-semibold text-ink">4.8 average</span> from
                12,400+ verified reviews
              </p>
            </div>
          </Reveal>
        </div>

        {/* NOTE: replace with genuine customer reviews before going live */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={0.1 * i} className="h-full">
              <figure className="flex h-full flex-col rounded-3xl border border-line/60 bg-white p-8 shadow-[0_2px_20px_rgba(0,0,0,0.03)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.12)]">
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" strokeWidth={0} />
                    ))}
                  </div>
                  <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-blue">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Verified
                  </span>
                </div>

                <blockquote className="mt-6 grow">
                  <p className="text-[1.05rem] leading-[1.65] text-ink/85">
                    &ldquo;{r.quote}&rdquo;
                  </p>
                </blockquote>

                <figcaption className="mt-7 flex items-center gap-4 border-t border-line/60 pt-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue text-sm font-bold text-white">
                    {r.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-ink">{r.name}</p>
                    <p className="truncate text-xs text-sub">
                      {r.city} · {r.product}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
