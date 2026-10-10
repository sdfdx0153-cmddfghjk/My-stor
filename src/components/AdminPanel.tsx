import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  DollarSign,
  Flame,
  Layers,
  LayoutGrid,
  Lock,
  LogOut,
  Package,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { CATEGORIES, PRODUCTS, fetchLiveProducts, money } from "../data/site";
import type { Product } from "../data/site";
import { EASE } from "./Reveal";

const AUTH_KEY = "ember_admin_pw";

const adminHeaders = () => ({
  "Content-Type": "application/json",
  "x-admin-password": sessionStorage.getItem(AUTH_KEY) || "",
});

const EMPTY: Product = {
  id: "",
  name: "",
  category: "diffuser",
  price: 0,
  compareAt: undefined,
  image: "",
  badge: undefined,
  rating: 4.8,
  reviews: 0,
  tagline: "",
  description: "",
  bullets: [],
  stock: 10,
  affiliateLink: "https://www.wed2c.com/",
};

export function AdminPanel() {
  const [authed, setAuthed] = useState(() => !!sessionStorage.getItem(AUTH_KEY));
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);

  // Always load the real data from the server (database), never from localStorage
  useEffect(() => {
    if (!authed) return;
    fetchLiveProducts().then((live) => {
      if (live && live.length > 0) setProducts(live);
      else if (live) setProducts(PRODUCTS); // database empty -> start from defaults
      setLoaded(!!live);
    });
  }, [authed]);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Product | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [bulletsText, setBulletsText] = useState("");

  const filtered = useMemo(
    () =>
      products.filter((p) =>
        p.name.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [products, query],
  );

  const stats = useMemo(
    () => [
      { icon: Package, label: "Products", value: String(products.length) },
      {
        icon: DollarSign,
        label: "Average price",
        value: money(products.reduce((s, p) => s + p.price, 0) / Math.max(1, products.length)),
      },
      { icon: Layers, label: "Total stock", value: String(products.reduce((s, p) => s + p.stock, 0)) },
      {
        icon: LayoutGrid,
        label: "Categories",
        value: String(new Set(products.map((p) => p.category)).size),
      },
    ],
    [products],
  );

  /* ---------- auth ---------- */
  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-mist px-5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="w-full max-w-sm rounded-3xl border border-line/70 bg-white p-9 text-center shadow-[0_30px_80px_-30px_rgba(0,0,0,0.15)]"
        >
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue">
            <Lock className="h-6 w-6 text-white" />
          </span>
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-ink">Store Admin</h1>
          <p className="mt-2 text-sm text-sub">Enter your password to manage products.</p>
          <form
            className="mt-6"
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const r = await fetch("/api/login", { method: "POST", headers: { "x-admin-password": pw } });
                if (r.ok) {
                  sessionStorage.setItem(AUTH_KEY, pw);
                  setAuthed(true);
                } else setPwError(true);
              } catch {
                setPwError(true);
              }
            }}
          >
            <input
              type="password"
              value={pw}
              onChange={(e) => {
                setPw(e.target.value);
                setPwError(false);
              }}
              placeholder="Password"
              className={`w-full rounded-2xl border bg-white px-5 py-3.5 text-sm text-ink placeholder:text-sub/70 focus:outline-none focus:ring-2 ${
                pwError ? "border-red-400 focus:ring-red-200" : "border-line focus:border-blue focus:ring-blue/15"
              }`}
            />
            {pwError && <p className="mt-2 text-xs font-medium text-red-500">Wrong password — try again.</p>}
            <button
              type="submit"
              className="mt-4 w-full rounded-full bg-blue py-3.5 text-sm font-bold text-white transition-colors hover:bg-bluedark"
            >
              Unlock Dashboard
            </button>
          </form>
          <a href="#top" className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-blue hover:text-bluedark">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to store
          </a>
        </motion.div>
      </div>
    );
  }

  /* ---------- crud ---------- */
  const persist = async (next: Product[]) => {
    if (!loaded) {
      alert("❌ Could not load data from server. Refresh the page before editing.");
      return;
    }
    const prev = products;
    setProducts(next);
    setSaving(true);
    try {
      const r = await fetch("/api/products", {
        method: "POST",
        headers: adminHeaders(),
        body: JSON.stringify(next),
      });
      if (!r.ok) throw new Error(String(r.status));
    } catch {
      setProducts(prev);
      alert("❌ Save failed. Changes were NOT saved to the database.");
    } finally {
      setSaving(false);
    }
  };

  const openEdit = (p: Product) => {
    setEditing({ ...p });
    setBulletsText(p.bullets.join("\n"));
    setIsNew(false);
  };

  const openNew = () => {
    setEditing({ ...EMPTY, id: `p-${Date.now().toString(36)}` });
    setBulletsText("");
    setIsNew(true);
  };

  const saveEdit = () => {
    if (!editing) return;
    const final: Product = {
      ...editing,
      bullets: bulletsText.split("\n").map((b) => b.trim()).filter(Boolean),
      price: Number(editing.price) || 0,
      compareAt: editing.compareAt ? Number(editing.compareAt) : undefined,
      rating: Number(editing.rating) || 4.8,
      reviews: Number(editing.reviews) || 0,
      stock: Number(editing.stock) || 0,
    };
    const next = isNew
      ? [...products, final]
      : products.map((p) => (p.id === final.id ? final : p));
    persist(next);
    setEditing(null);
  };

  const doDelete = () => {
    if (!confirmDelete) return;
    persist(products.filter((p) => p.id !== confirmDelete));
    setConfirmDelete(null);
  };

  const doReset = () => {
    if (confirm("Reset ALL products to the default demo data?")) persist(PRODUCTS);
  };

  const field =
    "w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink placeholder:text-sub/60 focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/15";

  return (
    <div className="min-h-screen bg-mist">
      {/* Admin header */}
      <header className="sticky top-0 z-40 border-b border-line/70 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue">
              <Flame className="h-4 w-4 text-white" strokeWidth={2.5} />
            </span>
            <span className="text-[16px] font-bold tracking-tight text-ink uppercase">
              Mapscred <span className="font-medium text-sub lowercase italic">/ Admin</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="#top"
              className="flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-semibold text-ink transition-colors hover:border-ink"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> View store
            </a>
            <button
              onClick={() => {
                sessionStorage.removeItem(AUTH_KEY);
                setAuthed(false);
              }}
              className="flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-semibold text-sub transition-colors hover:border-red-300 hover:text-red-500"
            >
              <LogOut className="h-3.5 w-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.6, ease: EASE }}
              className="rounded-3xl border border-line/70 bg-white p-5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue/10 text-blue">
                <s.icon className="h-5 w-5" />
              </span>
              <p className="mt-4 text-2xl font-bold tracking-tight text-ink">{s.value}</p>
              <p className="text-xs font-medium text-sub">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <div className="relative grow sm:max-w-xs">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sub" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="w-full rounded-full border border-line bg-white py-2.5 pl-11 pr-4 text-sm text-ink placeholder:text-sub/70 focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/15"
            />
          </div>
          <button
            onClick={openNew}
            className="flex items-center gap-2 rounded-full bg-blue px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-bluedark"
          >
            <Plus className="h-4 w-4" /> Add Product
          </button>
          <button
            onClick={doReset}
            className="flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-sub transition-colors hover:border-ink hover:text-ink"
          >
            <RotateCcw className="h-4 w-4" /> Reset demo data
          </button>
          <span className="text-xs font-semibold text-sub">{saving ? "Saving…" : loaded ? "✅ Synced with database" : "Loading…"}</span>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-hidden rounded-3xl border border-line/70 bg-white">
          <div className="hidden grid-cols-[2.2fr_1fr_0.7fr_0.7fr_auto] gap-4 border-b border-line/70 bg-mist/60 px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.15em] text-sub md:grid">
            <span>Product</span>
            <span>Price</span>
            <span>Stock</span>
            <span>Rating</span>
            <span className="text-right">Actions</span>
          </div>
          <ul className="divide-y divide-line/60">
            <AnimatePresence initial={false}>
              {filtered.map((p) => (
                <motion.li
                  key={p.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="grid grid-cols-2 items-center gap-4 px-5 py-4 md:grid-cols-[2.2fr_1fr_0.7fr_0.7fr_auto] md:px-6"
                >
                  <div className="col-span-2 flex items-center gap-3.5 md:col-span-1">
                    <img
                      src={p.image}
                      alt=""
                      className="h-12 w-12 shrink-0 rounded-xl border border-line/60 object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink">{p.name}</p>
                      <p className="text-xs capitalize text-sub">
                        {p.category}
                        {p.badge && <span className="ml-1.5 font-semibold text-blue">· {p.badge}</span>}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-ink">
                    {money(p.price)}
                    {p.compareAt && (
                      <span className="ml-1.5 text-xs font-normal text-sub line-through">
                        {money(p.compareAt)}
                      </span>
                    )}
                  </p>
                  <p className="text-sm">
                    <span className={`font-semibold ${p.stock < 20 ? "text-amber-600" : "text-emerald-600"}`}>
                      {p.stock}
                    </span>{" "}
                    <span className="text-sub">units</span>
                  </p>
                  <p className="hidden text-sm font-medium text-ink md:block">{p.rating} ★</p>
                  <div className="col-span-2 flex justify-end gap-2 md:col-span-1">
                    <button
                      onClick={() => openEdit(p)}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-mist text-ink transition-colors hover:bg-blue hover:text-white"
                      aria-label={`Edit ${p.name}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setConfirmDelete(p.id)}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-mist text-ink transition-colors hover:bg-red-500 hover:text-white"
                      aria-label={`Delete ${p.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          {filtered.length === 0 && (
            <p className="px-6 py-14 text-center text-sm text-sub">No products match your search.</p>
          )}
        </div>
      </main>

      {/* Edit / Add modal */}
      <AnimatePresence>
        {editing && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditing(null)}
              className="fixed inset-0 z-[70] bg-ink/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="fixed inset-x-3 top-[4vh] z-[75] mx-auto max-h-[90vh] max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:inset-x-6 sm:p-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold tracking-tight text-ink">
                  {isNew ? "Add product" : `Edit — ${editing.name}`}
                </h2>
                <button
                  onClick={() => setEditing(null)}
                  aria-label="Close"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-mist text-sub hover:bg-line"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-semibold text-sub">Name</span>
                  <input className={field} value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
                </label>
                <label>
                  <span className="mb-1.5 block text-xs font-semibold text-sub">Category</span>
                  <select
                    className={field}
                    value={editing.category}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                  >
                    {CATEGORIES.filter((c) => c.key !== "all").map((c) => (
                      <option key={c.key} value={c.key}>{c.label}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <span className="mb-1.5 block text-xs font-semibold text-sub">Badge</span>
                  <select
                    className={field}
                    value={editing.badge ?? ""}
                    onChange={(e) =>
                      setEditing({ ...editing, badge: (e.target.value || undefined) as Product["badge"] })
                    }
                  >
                    <option value="">None</option>
                    <option value="Bestseller">Bestseller</option>
                    <option value="New">New</option>
                  </select>
                </label>
                <label>
                  <span className="mb-1.5 block text-xs font-semibold text-sub">Price ($)</span>
                  <input type="number" min="0" step="0.01" className={field} value={editing.price} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} />
                </label>
                <label>
                  <span className="mb-1.5 block text-xs font-semibold text-sub">Compare-at price ($, optional)</span>
                  <input type="number" min="0" step="0.01" className={field} value={editing.compareAt ?? ""} onChange={(e) => setEditing({ ...editing, compareAt: e.target.value ? Number(e.target.value) : undefined })} />
                </label>
                <label className="sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-semibold text-sub">Image URL</span>
                  <input className={field} value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} placeholder="https://…" />
                </label>
                <label className="sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-semibold text-sub">WED2C / W2DC Affiliate Link</span>
                  <input className={field} value={editing.affiliateLink} onChange={(e) => setEditing({ ...editing, affiliateLink: e.target.value })} placeholder="https://www.wed2c.com/..." />
                </label>
                <label>
                  <span className="mb-1.5 block text-xs font-semibold text-sub">Stock</span>
                  <input type="number" min="0" className={field} value={editing.stock} onChange={(e) => setEditing({ ...editing, stock: Number(e.target.value) })} />
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label>
                    <span className="mb-1.5 block text-xs font-semibold text-sub">Rating</span>
                    <input type="number" min="0" max="5" step="0.1" className={field} value={editing.rating} onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) })} />
                  </label>
                  <label>
                    <span className="mb-1.5 block text-xs font-semibold text-sub">Reviews</span>
                    <input type="number" min="0" className={field} value={editing.reviews} onChange={(e) => setEditing({ ...editing, reviews: Number(e.target.value) })} />
                  </label>
                </div>
                <label className="sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-semibold text-sub">Tagline</span>
                  <input className={field} value={editing.tagline} onChange={(e) => setEditing({ ...editing, tagline: e.target.value })} />
                </label>
                <label className="sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-semibold text-sub">Description</span>
                  <textarea rows={3} className={field} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
                </label>
                <label className="sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-semibold text-sub">Bullets (one per line)</span>
                  <textarea rows={3} className={field} value={bulletsText} onChange={(e) => setBulletsText(e.target.value)} />
                </label>
              </div>

              {editing.image && (
                <div className="mt-4 overflow-hidden rounded-2xl border border-line/60">
                  <img src={editing.image} alt="Preview" className="h-32 w-full object-cover" />
                </div>
              )}

              <div className="mt-6 flex gap-3">
                <button
                  onClick={saveEdit}
                  className="flex-1 rounded-full bg-blue py-3.5 text-sm font-bold text-white transition-colors hover:bg-bluedark"
                >
                  {isNew ? "Add Product" : "Save Changes"}
                </button>
                <button
                  onClick={() => setEditing(null)}
                  className="rounded-full border border-line px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete confirm */}
      <AnimatePresence>
        {confirmDelete && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmDelete(null)}
              className="fixed inset-0 z-[80] bg-ink/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="fixed left-1/2 top-1/2 z-[85] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-7 text-center shadow-2xl"
            >
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
                <Trash2 className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-ink">Delete this product?</h3>
              <p className="mt-2 text-sm text-sub">
                "{products.find((p) => p.id === confirmDelete)?.name}" will be removed
                from the storefront immediately.
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={doDelete}
                  className="flex-1 rounded-full bg-red-500 py-3 text-sm font-bold text-white transition-colors hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="flex-1 rounded-full border border-line py-3 text-sm font-semibold text-ink transition-colors hover:border-ink"
                >
                  Keep
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
