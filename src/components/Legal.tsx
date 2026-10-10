import { motion } from "framer-motion";
import { X, ShieldCheck, Truck, RotateCcw } from "lucide-react";

interface Props {
  page: "privacy" | "refund" | "shipping" | "terms" | null;
  onClose: () => void;
}

export function LegalPages({ page, onClose }: Props) {
  if (!page) return null;

  const content = {
    privacy: {
      title: "Privacy Policy",
      icon: <ShieldCheck className="h-6 w-6 text-blue" />,
      text: "At Mapscred, we respect your privacy. We only collect data necessary to process your order and improve your shopping experience. We never sell your personal information to third parties. Your session is protected by 256-bit SSL encryption. All payment data is handled by our secure global partners.",
    },
    refund: {
      title: "Refund Policy",
      icon: <RotateCcw className="h-6 w-6 text-blue" />,
      text: "We offer a 30-day money-back guarantee. If you are not 100% satisfied with your Mapscred unit, you can return it within 30 days for a full refund. No questions asked. We even cover the return shipping for all US domestic orders. Your satisfaction is our absolute priority.",
    },
    shipping: {
      title: "Shipping Policy",
      icon: <Truck className="h-6 w-6 text-blue" />,
      text: "Mapscred units are dispatched from our regional fulfillment hubs within 24-48 hours. Standard US shipping takes 3-5 business days. You will receive a tracking number as soon as your unit leaves our facility. International shipping available to 40+ countries (6-12 days).",
    },
    terms: {
      title: "Terms of Service",
      icon: <ShieldCheck className="h-6 w-6 text-blue" />,
      text: "By using the Mapscred store, you agree to our terms of service. All products are sold for personal home use only. We reserve the right to limit quantities per session. Mapscred is an authorized distributor of the 2026 Series 01 collection.",
    },
  }[page];

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-6 bg-ink/80 backdrop-blur-xl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white max-w-xl w-full rounded-[2.5rem] p-10 relative shadow-2xl border border-white/20"
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-sub hover:text-ink transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex items-center gap-4 mb-8">
           <div className="h-12 w-12 bg-blue/10 rounded-2xl flex items-center justify-center">
              {content.icon}
           </div>
           <h2 className="text-2xl font-black text-ink uppercase tracking-tight">{content.title}</h2>
        </div>

        <div className="prose prose-sm text-sub font-medium leading-relaxed">
           <p>{content.text}</p>
           <p className="mt-6 text-[10px] font-black text-ink/30 uppercase tracking-[0.2em]">Mapscred Global Distribution · 2026 Edition</p>
        </div>

        <button 
          onClick={onClose}
          className="mt-10 w-full bg-mist text-ink py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-line transition-colors"
        >
          Close Document
        </button>
      </motion.div>
    </div>
  );
}
