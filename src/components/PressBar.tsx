import { Fragment } from "react";
import { PRESS } from "../data/site";

export function PressBar() {
  const row = [...PRESS, ...PRESS];

  return (
    <section className="border-y border-line/60 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.4em] text-sub/70">
          As featured in
        </p>
        <div
          className="mt-5 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          }}
        >
          <div
            className="flex w-max items-center gap-16 pr-16"
            style={{ animation: "marquee-x 34s linear infinite" }}
          >
            {row.map((p, i) => (
              <Fragment key={i}>
                <span
                  className={`whitespace-nowrap text-sub/50 transition-colors duration-300 hover:text-ink ${p.cls}`}
                >
                  {p.label}
                </span>
                <span className="h-1 w-1 shrink-0 rounded-full bg-blue/30" />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
