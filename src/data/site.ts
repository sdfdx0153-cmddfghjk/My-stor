import productsData from "../../products.json";

export interface ColorOption {
  label: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  compareAt?: number;
  image: string;
  badge?: "Bestseller" | "New";
  rating: number;
  reviews: number;
  tagline: string;
  description: string;
  bullets: string[];
  options?: ColorOption[];
  stock: number;
  affiliateLink: string;
}

export const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "diffuser", label: "Diffusers" },
  { key: "oils", label: "Oils" },
  { key: "candle", label: "Candles" },
  { key: "humidifier", label: "Humidifiers" },
];

export const PRODUCTS: Product[] = productsData as Product[];

export const money = (n: number) => `$${n.toFixed(n % 1 ? 2 : 0)}`;

const STORAGE_KEY = "mapscred_products_v3";

export function loadProducts(): Product[] {
  // Always return local storage or fallback for initial render
  // The App will handle the Live Fetch from server
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) return parsed;
    }
  } catch {}
  return PRODUCTS;
}

export async function fetchLiveProducts(): Promise<Product[] | null> {
  try {
    const res = await fetch('/api/products');
    if (res.ok) return await res.json();
  } catch (e) {}
  return null;
}


export function saveProducts(products: Product[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function resetProducts() {
  localStorage.removeItem(STORAGE_KEY);
}

export const PRESS = [
  { label: "DWELL", cls: "font-sans font-bold tracking-[0.45em] text-base" },
  { label: "kinfolk.", cls: "font-display italic text-2xl tracking-tight" },
  { label: "ELLE DECOR", cls: "font-display text-xl tracking-[0.14em]" },
  { label: "ARCHITECTURAL DIGEST", cls: "font-sans text-sm tracking-[0.3em] font-medium" },
  { label: "GQ", cls: "font-display font-semibold text-2xl tracking-tight" },
  { label: "WIRED", cls: "font-sans font-extrabold text-xl tracking-[0.08em]" },
];

export interface Review {
  quote: string;
  name: string;
  city: string;
  initials: string;
  product: string;
}

export const REVIEWS: Review[] = [
  {
    quote: "Our Brooklyn apartment finally feels like the retreat we needed. The Flame goes on at 6 PM sharp, and the whole evening just slows down. Absolutely worth every penny.",
    name: "Sarah Miller",
    city: "Brooklyn, NY",
    initials: "SM",
    product: "Series 01 Diffuser",
  },
  {
    quote: "I fall asleep to it every single night. The fire effect is so realistic my cat literally sat and watched it for an hour. Best sleep I've had in years.",
    name: "Mike Rodriguez",
    city: "Chicago, IL",
    initials: "MR",
    product: "Onyx Black Edition",
  },
  {
    quote: "I was skeptical about the 'luxury' claim, but the weight and finish are top-tier. It looks like a $200 piece of decor. Fast shipping to Seattle too!",
    name: "Amanda Kern",
    city: "Seattle, WA",
    initials: "AK",
    product: "Stone Ceramic Unit",
  },
];

export const FAQS = [
  {
    q: "What happens when someone clicks Buy Now?",
    a: "Buy Now sends the customer directly to that product's affiliate checkout link. You can change every product link anytime from the admin dashboard.",
  },
  {
    q: "Is the flame on the diffuser real fire?",
    a: "No. The effect comes from ultrasonic mist and warm LED light. It looks like fire but stays cool to the touch.",
  },
  {
    q: "Can I add or remove products myself?",
    a: "Yes. Open the Store Admin area, log in, then add new products, edit prices, update images, or delete products.",
  },
];
