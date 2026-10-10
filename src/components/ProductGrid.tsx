import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { loadProducts } from "../data/site";
import type { Product } from "../data/site";
import { ProductCard } from "./ProductCard";
import { EASE, Reveal } from "./Reveal";

export function ProductGrid({ products }: { products: Product[] }) {
  const [zoomImg, setZoomImg] = useState<string | null>(null);

  const handleBuy = (p: Product) => {
    const raw = p.affiliateLink?.trim();
    if (raw) {
      const url = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
      window.location.href = url;
    }
  };

  return (
    <section id="shop" className="py-20 lg:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl text-center sm:text-left mx-auto sm:mx-0">
          <Reveal>
            <h2 className="text-[clamp(2.5rem,4vw,3.25rem)] font-black leading-[1.05] tracking-tighter text-ink uppercase italic">
              Series 01 Collection<span className="text-blue">.</span>
            </h2>
            <p className="mt-4 text-lg font-medium text-sub">
              Limited-run aromatherapy essentials. Hand-calibrated for 2026 atmospheres.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {products.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <ProductCard 
                  product={p} 
                  index={i} 
                  onView={(prod) => setZoomImg(prod.image)} 
                  onBuy={handleBuy} 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {zoomImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomImg(null)}
            className="fixed inset-0 z-[300] bg-ink/98 flex items-center justify-center p-4 cursor-zoom-out"
          >
             <button className="absolute top-6 right-6 text-white bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors">
                <X className="h-6 w-6" />
             </button>
             <div className="relative group">
                <motion.img 
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  src={zoomImg} 
                  className="max-w-full max-h-[85vh] rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.5)] border border-white/10"
                />
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
