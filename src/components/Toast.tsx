import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

export function Toast({
  toast,
  onDone,
}: {
  toast: { id: number; msg: string } | null;
  onDone: () => void;
}) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, [toast, onDone]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: -24, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="fixed left-1/2 top-24 z-[95] flex -translate-x-1/2 items-center gap-2.5 rounded-full bg-ink py-3 pl-3.5 pr-6 text-sm font-medium text-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.4)]"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue">
            <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
          </span>
          {toast.msg}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
