import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import type { Product } from "../data/site";
import { money } from "../data/site";
import { Embers } from "./Embers";
import { Reveal } from "./Reveal";

export function SpotlightBand({
  product,
  onBuy,
}: {
  product: Product;
  onBuy: (p: Product) => void;
}) {
  return (
    <section id="spotlight" className="relative overflow-hidden bg-deep py-24 lg:py-32">
      <div
        className="pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[620px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,110,30,0.16),transparent_65%)] blur-3xl"
        style={{ animation: "glow-pulse 7s ease-in-out infinite" }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-ember">
              <span className="h-px w-8 bg-flame/60" />
              Series 01 Spotlight
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-display text-[clamp(2.6rem,5vw,4.4rem)] font-medium leading-[1.03] tracking-[-0.015em] text-bone">
              Designed for the <br />
              <em className="bg-gradient-to-r from-ember to-flame bg-clip-text italic text-transparent">quiet hours.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-smoke">
              Ultrasonic fire-mist technology, amber atmospheric lighting, 
              and a form factor that elevates every interior style.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
              <div className="flex items-baseline gap-2.5">
                <span className="font-display text-5xl font-medium text-bone">
                  {money(product.price)}
                </span>
                {product.compareAt && (
                  <span className="text-lg text-ash line-through">
                    {money(product.compareAt)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 border-l border-white/10 pl-8">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-flame text-flame" strokeWidth={0} />
                  ))}
                </div>
                <span className="text-sm text-smoke">
                  {product.rating} · Verified Choice
                </span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <button
                onClick={() => onBuy(product)}
                className="group inline-flex items-center justify-center gap-3 bg-white text-ink px-10 py-5 rounded-2xl text-lg font-black shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                SECURE YOURS NOW
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </Reveal>
        </div>

        <div className="relative">
          <Embers count={12} />
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_40px_120px_-30px_rgba(255,100,20,0.25)]">
              <img
                src="/images/detail-flame.jpg"
                alt="Detail View"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </Reveal>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.25 }}
            className="absolute -bottom-8 -left-3 w-[46%] sm:-left-8"
          >
            <div className="overflow-hidden rounded-[1.25rem] border border-white/10 shadow-2xl">
              <img
                src="/images/variant-onyx.jpg"
                alt="Product View"
                className="aspect-square w-full object-cover"
              />
            </div>
            <p className="mt-3 pl-1 text-[9px] font-bold text-ash uppercase tracking-widest">
              Series 01 / Onyx Black
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
