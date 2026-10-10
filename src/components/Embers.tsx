import { useMemo } from "react";
import type { CSSProperties } from "react";

/** Drifting ember particles that rise from the hero product. */
export function Embers({ count = 16 }: { count?: number }) {
  const parts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: 4 + Math.random() * 92,
        size: 2 + Math.random() * 3.5,
        delay: Math.random() * 7,
        duration: 4.5 + Math.random() * 5,
        drift: `${Math.random() * 90 - 45}px`,
        bottom: 8 + Math.random() * 30,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0">
      {parts.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-ember"
          style={
            {
              left: `${p.left}%`,
              bottom: `${p.bottom}%`,
              width: p.size,
              height: p.size,
              boxShadow: "0 0 14px 2px rgba(255,150,70,0.55)",
              animation: `ember-rise ${p.duration}s linear ${p.delay}s infinite`,
              opacity: 0,
              ["--drift" as string]: p.drift,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
