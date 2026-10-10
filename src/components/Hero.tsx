import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Hash, Activity, Zap } from "lucide-react";
import { Reveal } from "./Reveal";

export function Hero() {
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    // Generate a technical session ID for Mapscred
    const id = Math.floor(1000 + Math.random() * 9000);
    setSessionId(`MAPS-${id}`);
  }, []);

  return (
    <section id="top" className="relative bg-white pt-6 lg:pt-16 pb-16 overflow-hidden">
      
      {/* Background System Grid */}
      <div className="absolute inset-0 grid grid-cols-12 pointer-events-none opacity-[0.03]">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="border-r border-ink h-full" />
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 relative">
        
        {/* TOP STATUS BAR (Session & Region) */}
        <Reveal>
          <div className="flex flex-wrap items-center gap-4 mb-10 pb-4 border-b border-line/40">
             <div className="flex items-center gap-2 bg-mist px-3 py-1.5 rounded-lg border border-line/50">
                <Hash className="h-3 w-3 text-blue" />
                <span className="text-[10px] font-black text-ink uppercase tracking-wider">Session ID: {sessionId}</span>
             </div>
             <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                <Activity className="h-3 w-3 text-emerald-600" />
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Status: Priority Connection</span>
             </div>
             <div className="ml-auto hidden md:flex items-center gap-2 text-[9px] font-bold text-sub uppercase tracking-widest">
                <Zap className="h-3 w-3 text-blue" /> US-Regional Fulfillment Hub Active
             </div>
          </div>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* LEFT: MAIN COPY */}
          <div className="lg:col-span-6 relative z-20">
            <Reveal delay={0.1}>
              <h1 className="text-[clamp(3.2rem,8vw,5.5rem)] font-black leading-[0.85] tracking-[-0.05em] text-ink mb-8 uppercase">
                Atmosphere, <br />
                <span className="text-blue italic text-shadow-sm">Mastered.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-xl text-sub font-medium leading-relaxed max-w-lg mb-10">
                It's more than scent. It's that feeling of coming home. 
                The 2026 Series 01 Flame Diffuser — hand-calibrated for 
                your space and <span className="text-blue font-black italic">shipped priority</span>.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-col gap-6">
                <a
                  href="#shop"
                  className="group relative flex items-center justify-between bg-ink text-white px-8 py-6 rounded-2xl overflow-hidden shadow-2xl transition-all hover:scale-[1.05] active:scale-[0.98]"
                >
                  <div className="absolute inset-0 bg-blue translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <span className="relative text-lg font-black tracking-tighter">SECURE UNIT FOR $79.00</span>
                  <ShieldCheck className="relative h-6 w-6 text-blue group-hover:text-white transition-colors" />
                </a>
                
                <p className="text-center text-[10px] font-bold text-sub uppercase tracking-[0.25em]">
                  Reserved Price for Session #{sessionId}
                </p>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: VISUAL WITH RESERVATION BADGE */}
          <div className="lg:col-span-6 relative">
             <motion.div 
               initial={{ opacity: 0, x: 40 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 1, ease: "easeOut" }}
               className="relative"
             >
                {/* Main Luxury Image */}
                <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl border-[8px] border-white">
                   <img 
                    src="/images/lifestyle-winter.jpg" 
                    alt="Mapscred Diffuser" 
                    className="aspect-square w-full object-cover saturate-[1.1] brightness-[0.95]" 
                   />
                </div>



                {/* System Stats Overlay */}
                <div className="absolute top-8 left-8 flex flex-col gap-2 pointer-events-none">
                   <div className="bg-ink/80 backdrop-blur text-white text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
                      <div className="h-1 w-1 bg-blue rounded-full animate-pulse" /> Logistics Level 4 Sync
                   </div>
                </div>
             </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
