import { useMemo } from "react";
import type { CSSProperties } from "react";

export const ATMOSPHERE_PALETTE = [
  { glow: "#ff7828", name: "Ember Amber" },
  { glow: "#b450dc", name: "Lavender Dusk" },
  { glow: "#288cff", name: "Ocean Calm" },
  { glow: "#ffb43c", name: "Golden Hour" },
  { glow: "#64dcb4", name: "Eucalyptus" },
  { glow: "#ff5078", name: "Rose Garden" },
];

interface Particle {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  blur: number;
  opacity: number;
}

export function GlobalAtmosphere({ activeIdx }: { activeIdx: number }) {
  const color = ATMOSPHERE_PALETTE[activeIdx];

  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 35 }, (_, i) => ({
        id: i,
        left: -5 + Math.random() * 110,
        size: 200 + Math.random() * 400,
        delay: Math.random() * -15,
        duration: 12 + Math.random() * 10,
        drift: Math.random() * 160 - 80,
        blur: 50 + Math.random() * 50,
        opacity: 0.08 + Math.random() * 0.06,
      })),
    [],
  );

  const hex = color.glow;

  return (
    <>
      <style>{`
        @keyframes mist-float-global {
          0% { transform: translateY(0) scale(0.7); opacity: 0; }
          15% { opacity: var(--p-op); }
          100% { transform: translateY(-120vh) translateX(var(--mist-drift)) scale(2.5); opacity: 0; }
        }
      `}</style>
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
        {particles.map((p) => (
          <div
            key={p.id}
            style={
              {
                position: "absolute",
                bottom: "-30vh",
                left: `${p.left}%`,
                width: p.size,
                height: p.size,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${hex}35 0%, transparent 70%)`,
                filter: `blur(${p.blur}px)`,
                animation: `mist-float-global ${p.duration}s ease-in-out ${p.delay}s infinite`,
                "--mist-drift": `${p.drift}px`,
                "--p-op": p.opacity,
                willChange: "transform, opacity",
                transition: "background 1.5s ease",
              } as CSSProperties
            }
          />
        ))}
      </div>
    </>
  );
}
