import { motion } from "framer-motion";
import { Star, ShieldCheck, Hash } from "lucide-react";
import { money } from "../data/site";
import type { Product } from "../data/site";
import { EASE } from "./Reveal";

interface Props {
  product: Product;
  index: number;
  onView: (p: Product) => void;
  onBuy: (p: Product) => void;
}

export function ProductCard({ product, index, onView, onBuy }: Props) {
  const discount = product.compareAt
    ? Math.round((1 - product.price / product.compareAt) * 100)
    : 0;

  // Fake Unit ID generator
  const unitId = `EM-26-0${index + 42}${product.category[0].toUpperCase()}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: EASE }}
      className="group bg-white border border-line/40 p-4 rounded-[2rem] hover:shadow-2xl transition-all duration-500"
    >
      <div className="relative overflow-hidden rounded-2xl bg-mist cursor-zoom-in aspect-[4/5]" onClick={() => onView(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        />
        
        <div className="absolute top-3 left-3 flex flex-col gap-2">
           <div className="bg-ink/90 backdrop-blur text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1.5 shadow-xl">
              <Hash className="h-2.5 w-2.5 text-blue" /> Unit #{unitId}
           </div>
           {discount > 0 && (
            <span className="bg-red-600 text-white text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-lg shadow-lg w-max">
              -{discount}% EXCLUSIVE
            </span>
           )}
        </div>
      </div>

      <div className="pt-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[9px] font-black text-ink uppercase tracking-[0.2em]">Verified Distribution</span>
          <div className="flex items-center gap-1 text-[10px] font-black text-ink">
             <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {product.rating}
          </div>
        </div>

        <h3 className="text-[17px] font-black leading-tight text-ink mb-1 group-hover:text-blue transition-colors">
          {product.name}
        </h3>
        <p className="text-[11px] font-medium text-sub mb-4 italic">Series 01 Atmospheric Unit</p>

        <div className="pt-4 border-t border-line/40 flex items-center justify-between">
           <div className="flex flex-col">
              <span className="text-[10px] font-black text-sub uppercase">Market Price</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black text-ink">{money(product.price)}</span>
                {product.compareAt && (
                  <span className="text-xs font-bold text-sub line-through opacity-50">{money(product.compareAt)}</span>
                )}
              </div>
           </div>
           <button
            onClick={(e) => { e.stopPropagation(); onBuy(product); }}
            className="bg-blue text-white h-12 px-6 rounded-xl text-xs font-black shadow-lg shadow-blue/20 hover:bg-bluedark transition-all active:scale-95 flex items-center gap-2"
          >
            ORDER UNIT
          </button>
        </div>
        
        <div className="mt-4 flex items-center gap-2 text-[9px] font-black text-emerald-600 uppercase tracking-widest">
           <ShieldCheck className="h-3.5 w-3.5" /> Identity Locked session
        </div>
      </div>
    </motion.article>
  );
}
