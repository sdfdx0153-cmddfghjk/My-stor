import { motion } from "framer-motion";
import { ATMOSPHERE_PALETTE } from "./Atmosphere";

interface Props {
  activeIdx: number;
  onChange: (i: number) => void;
}

export function AromaExperience({ activeIdx, onChange }: Props) {
  const color = ATMOSPHERE_PALETTE[activeIdx];

  return (
    <section className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 flex flex-col items-center justify-center">
        
        <motion.div
          key={`glow-${activeIdx}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.5 }}
          className="absolute w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: color.glow }}
        />

        <div className="relative z-10 flex flex-col items-center">
          <div className="relative w-56 h-72 sm:w-64 sm:h-80 mb-12">
            <img
              src="/images/variant-onyx.jpg"
              alt="Flame Diffuser"
              className="w-full h-full object-cover rounded-[2.5rem] shadow-2xl border border-white/5"
              style={{ boxShadow: `0 40px 100px -20px ${color.glow}40` }}
            />
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-40 overflow-hidden pointer-events-none">
              {[1,2,3].map((i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [0, -100], 
                    opacity: [0, 0.4, 0],
                    scale: [1, 1.8] 
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 1.3 }}
                  className="absolute bottom-0 w-8 h-8 rounded-full blur-xl"
                  style={{ left: `${20 + i * 20}%`, background: color.glow }}
                />
              ))}
            </div>
          </div>

          <motion.div
            key={`name-${activeIdx}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-3">
              Atmosphere Selection
            </p>
            <h3
              className="text-4xl sm:text-5xl font-black italic tracking-tighter"
              style={{ color: color.glow }}
            >
              {color.name}
            </h3>
          </motion.div>

          <div className="flex items-center gap-4 mb-14 bg-white/5 p-2 rounded-full backdrop-blur-md border border-white/10">
            {ATMOSPHERE_PALETTE.map((c, i) => (
              <button
                key={i}
                onClick={() => onChange(i)}
                className={`relative rounded-full transition-all duration-500 ${
                  i === activeIdx ? "w-12 h-5 scale-110" : "w-5 h-5 opacity-40 hover:opacity-100"
                }`}
                style={{ backgroundColor: c.glow }}
              >
                {i === activeIdx && (
                  <motion.div
                    layoutId="dot-glow"
                    className="absolute inset-0 rounded-full blur-md"
                    style={{ background: c.glow, opacity: 0.8 }}
                  />
                )}
              </button>
            ))}
          </div>

          <a
            href="#shop"
            className="group relative overflow-hidden bg-white text-ink px-12 py-6 rounded-2xl text-xl font-black shadow-2xl transition-all hover:scale-[1.05] active:scale-[0.98] uppercase tracking-tighter"
          >
            OWN THE ATMOSPHERE
          </a>
        </div>
      </div>
    </section>
  );
}
