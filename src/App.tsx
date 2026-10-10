import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { PressBar } from "./components/PressBar";
import { ProductGrid } from "./components/ProductGrid";
import { Reviews } from "./components/Reviews";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { AdminPanel } from "./components/AdminPanel";
import { SalesPopup, CountdownBanner, PriceGuard, LiveStockMeter } from "./components/Urgency";
import { LegalPages } from "./components/Legal";
import { loadProducts, fetchLiveProducts } from "./data/site";
import type { Product } from "./data/site";

export default function App() {
  const [hash, setHash] = useState(() => window.location.hash);
  const [loading, setLoading] = useState(true);
  const [legalPage, setLegalPage] = useState<"privacy" | "refund" | "shipping" | "terms" | null>(null);
  const [products, setProducts] = useState<Product[]>(() => loadProducts());

  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash;
      setHash(h);
      if (h === "#privacy") setLegalPage("privacy");
      else if (h === "#refund") setLegalPage("refund");
      else if (h === "#shipping") setLegalPage("shipping");
      else if (h === "#terms") setLegalPage("terms");
      else setLegalPage(null);
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    
    // Sync products from server and clear old local cache
    fetchLiveProducts().then(live => {
      if (live && live.length > 0) {
        setProducts(live);
        // Sync local storage to match server
        localStorage.setItem('mapscred_products_v3', JSON.stringify(live));
      }
      setLoading(false);
    });

    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  if (hash === "#admin") return <AdminPanel />;
  
  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-white flex flex-col items-center justify-center"
          >
             <Loader2 className="h-8 w-8 text-blue animate-spin mb-4" />
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-ink">Syncing Mapscred Cloud...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-white font-sans text-ink selection:bg-blue/10 relative">
        <div className="fixed top-0 z-[100] w-full">
          <CountdownBanner />
          <Navbar />
        </div>

        <div className="pt-[104px]"> 
          <Hero />
        </div>

        <main className="relative flex-grow">
          <LiveStockMeter />
          <PressBar />
          <ProductGrid products={products} />
          <Reviews />
          <FAQ />
        </main>

        <Footer />
        <SalesPopup />
        <PriceGuard />
        <LegalPages page={legalPage} onClose={() => { setLegalPage(null); window.history.pushState(null, "", "#"); }} />
      </div>
    </>
  );
}
