import { useState } from "react";
import { ArrowRight, Check, Flame, ShieldCheck } from "lucide-react";

const SHOP_LINKS = [
  { label: "All Products", href: "#shop" },
  { label: "Flame Diffuser", href: "#spotlight" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

const SUPPORT_LINKS = [
  { label: "Shipping Policy", href: "#faq" },
  { label: "Refund Policy", href: "#faq" },
  { label: "Track Your Order", href: "#faq" },
  { label: "Contact", href: "mailto:hello@emberhome.co" },
  { label: "Store Admin", href: "#admin" },
];

const SOCIALS = [
  { monogram: "IG", label: "Instagram" },
  { monogram: "FB", label: "Facebook" },
  { monogram: "YT", label: "YouTube" },
];

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="border-t border-line/70 bg-mist">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue">
                <Flame className="h-4 w-4 text-white" strokeWidth={2.5} />
              </span>
              <span className="text-[17px] font-bold tracking-tight text-ink uppercase">
                Mapscred<span className="text-blue">.</span>
              </span>
            </a>
            <p className="mt-5 max-w-sm leading-relaxed text-sub">
              A focused niche store for flame diffusers, aroma oils and cozy home
              scent add-ons. Every Buy Now button can be connected to your own
              WED2C affiliate link from the admin area.
            </p>

            <p className="mt-9 text-[11px] font-semibold uppercase tracking-[0.25em] text-sub/80">
              The Cozy Nights Letter
            </p>
            {subscribed ? (
              <p className="mt-4 flex items-center gap-2 text-sm font-medium text-blue">
                <Check className="h-4 w-4" /> You're in. First letter lands Sunday.
              </p>
            ) : (
              <form
                className="mt-4 flex max-w-sm overflow-hidden rounded-full border border-line bg-white focus-within:border-blue"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubscribed(true);
                }}
              >
                <input
                  type="email"
                  required
                  placeholder="you@evenings.com"
                  className="w-full bg-transparent px-5 py-3 text-sm text-ink placeholder:text-sub/70 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="m-1 flex h-9 w-11 shrink-0 items-center justify-center rounded-full bg-blue text-white transition-colors hover:bg-bluedark"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sub/80">
              Shop
            </p>
            <ul className="mt-5 space-y-3.5">
              {SHOP_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-sub transition-colors hover:text-blue">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sub/80">
              Support
            </p>
            <ul className="mt-5 space-y-3.5">
              {SUPPORT_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-sub transition-colors hover:text-blue">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href="#top"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-[11px] font-bold tracking-widest text-sub transition-all hover:border-blue hover:text-blue"
                >
                  {s.monogram}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-8 border-t border-line/70 pt-8 sm:flex-row">
          <div className="flex flex-col gap-2">
            <p className="text-xs text-sub">© 2026 Mapscred Distribution. All rights reserved.</p>
            <div className="flex items-center gap-4 text-[10px] font-bold text-ink uppercase tracking-widest">
               <a href="#privacy" className="hover:text-blue transition-colors">Privacy</a>
               <span className="opacity-20">|</span>
               <a href="#refund" className="hover:text-blue transition-colors">Returns</a>
               <span className="opacity-20">|</span>
               <a href="#terms" className="hover:text-blue transition-colors">Terms</a>
            </div>
          </div>
          
          {/* High-Quality Trust Badges */}
          <div className="flex flex-wrap items-center gap-4 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
             <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
             <div className="h-6 w-px bg-line" />
             <div className="flex items-center gap-1.5 border border-line px-2 py-1 rounded bg-white shadow-sm">
                <ShieldCheck className="h-3 w-3 text-emerald-600" />
                <span className="text-[8px] font-black uppercase text-ink">Norton Secured</span>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
