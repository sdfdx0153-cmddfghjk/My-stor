import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck, Globe, Truck, MapPin } from "lucide-react";

const CITIES = ["NY", "Chicago", "Miami", "Austin", "Seattle", "London", "Toronto"];

export function SalesPopup() {
  const [current, setCurrent] = useState<{ city: string; time: string } | null>(null);

  useEffect(() => {
    const show = () => {
      const city = CITIES[Math.floor(Math.random() * CITIES.length)];
      setCurrent({ city, time: "Just now" });
      setTimeout(() => setCurrent(null), 4000);
    };
    const timer = setInterval(show, 15000);
    const initial = setTimeout(show, 4000);
    return () => { clearInterval(timer); clearTimeout(initial); };
  }, []);

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 left-4 right-4 z-[110] sm:left-6 sm:right-auto sm:w-max bg-white border border-line/60 p-3 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex items-center gap-3"
        >
          <div className="h-9 w-9 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
            <Truck className="h-4.5 w-4.5" />
          </div>
          <div className="text-[10px] font-black uppercase tracking-widest text-ink">
            Shipment to <span className="text-blue">{current.city}</span> · {current.time}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function CountdownBanner() {
  return (
    <div className="bg-ink text-white py-2">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-8 text-[8px] sm:text-[9px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em]">
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="flex items-center gap-1 text-blue">
            <Globe className="h-3 w-3" /> <span className="hidden xs:inline">LOGISTICS</span> 2026
          </span>
          <span className="opacity-30">|</span>
          <span className="text-emerald-500">DISPATCH: ACTIVE</span>
        </div>
        <div className="flex items-center gap-1.5">
           <div className="h-1 w-1 rounded-full bg-red-600 animate-ping" />
           <span className="hidden xs:inline">BATCH 04:</span> <span className="text-blue">94% SOLD</span>
        </div>
      </div>
    </div>
  );
}

export function PriceGuard() {
  return (
    <div className="fixed right-4 bottom-24 z-40 flex flex-col gap-2 sm:right-6">
       <div className="bg-white/90 backdrop-blur border border-line/60 p-2 sm:p-3 rounded-xl shadow-xl flex items-center gap-2 rotate-[-1deg]">
          <ShieldCheck className="h-3.5 w-3.5 text-blue" />
          <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-ink">Verified</span>
       </div>
       <div className="bg-white/90 backdrop-blur border border-line/60 p-2 sm:p-3 rounded-xl shadow-xl flex items-center gap-2 rotate-[1deg]">
          <MapPin className="h-3.5 w-3.5 text-emerald-500" />
          <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-ink">US Hub</span>
       </div>
    </div>
  );
}

export function LiveStockMeter() {
  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 mt-8 mb-8 sm:mt-12 sm:mb-12">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 py-4 sm:py-6 border-y border-line/40">
          <div>
             <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-sub mb-1">Stock Protocol</p>
             <h4 className="text-xs sm:text-sm font-black text-ink uppercase tracking-tighter">Automated Inventory Management</h4>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex-1 h-1 bg-line/30 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} whileInView={{ width: '92%' }} transition={{ duration: 1.5 }} className="h-full bg-blue shadow-[0_0_8px_rgba(0,113,227,0.5)]" />
             </div>
             <p className="text-[9px] sm:text-[10px] font-mono font-black text-ink whitespace-nowrap">92% SOLD</p>
          </div>
          <div className="text-center md:text-right">
             <p className="text-[9px] sm:text-[10px] font-black text-red-600 uppercase tracking-widest animate-pulse">Next Unit Price: $94.00</p>
          </div>
       </div>
    </div>
  );
}
