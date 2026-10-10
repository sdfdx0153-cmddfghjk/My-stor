import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flame, Menu, X } from "lucide-react";
import { cn } from "../utils/cn";

const LINKS = [
  { label: "Shop", href: "#shop" },
  { label: "Atmosphere", href: "#spotlight" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="bg-blue text-white">
        <p className="mx-auto px-4 py-1.5 text-center text-[11px] font-semibold tracking-wide sm:text-xs uppercase tracking-[0.3em]">
          Priority US Shipping · Exclusive 2026 Collection · Official Release
        </p>
      </div>

      <motion.div
        className={cn(
          "border-b transition-all duration-500",
          scrolled
            ? "border-line/70 bg-white/80 backdrop-blur-xl shadow-lg"
            : "border-transparent bg-white/60 backdrop-blur-md",
        )}
      >
        <nav className="mx-auto flex h-[64px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="group flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue transition-transform duration-500 group-hover:rotate-6">
              <Flame className="h-4 w-4 text-white" strokeWidth={2.5} />
            </span>
            <span className="text-[17px] font-bold tracking-tight text-ink uppercase">
              Mapscred<span className="text-blue">.</span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative text-[11px] font-black uppercase tracking-widest text-sub hover:text-ink transition-colors"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#shop"
              className="hidden sm:flex items-center justify-center bg-blue text-white px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
            >
              Order Now
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-ink">
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>
      </motion.div>
    </header>
  );
}
