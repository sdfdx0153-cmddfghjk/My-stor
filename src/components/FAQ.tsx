import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Plus } from "lucide-react";
import { FAQS } from "../data/site";
import { EASE, Reveal } from "./Reveal";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-24 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
        {/* Left rail */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-ink">
              Questions, answered<span className="text-blue">.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 rounded-3xl border border-line/70 bg-mist p-7">
              <p className="text-lg font-semibold text-ink">Still curious?</p>
              <p className="mt-2 text-sm leading-relaxed text-sub">
                A real human answers{" "}
                <span className="font-medium text-blue">hello@emberhome.co</span>{" "}
                in under 24 hours — usually much faster.
              </p>
              <a
                href="mailto:hello@emberhome.co"
                className="mt-5 inline-flex items-center gap-2.5 rounded-full bg-blue px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-bluedark"
              >
                <Mail className="h-4 w-4" />
                Message us
              </a>
            </div>
          </Reveal>
        </div>

        {/* Accordion */}
        <Reveal delay={0.15}>
          <div className="divide-y divide-line/70 border-y border-line/70">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`text-lg font-semibold transition-colors sm:text-xl ${
                        isOpen ? "text-blue" : "text-ink group-hover:text-blue"
                      }`}
                    >
                      {f.q}
                    </span>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isOpen
                          ? "rotate-45 bg-blue text-white"
                          : "bg-mist text-sub group-hover:bg-line"
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-xl pb-7 leading-relaxed text-sub">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
