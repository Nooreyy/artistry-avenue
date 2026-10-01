import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/catalog";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "All products";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getProducts()
      .then((result) => { if (active) setProducts(result); })
      .catch((requestError) => { if (active) setError(requestError.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const categories = useMemo(() => ["All products", ...new Set(products.map((product) => product.category))], [products]);
  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === "All products" || product.category === category;
      const matchesQuery = !normalizedQuery || `${product.name} ${product.category}`.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [category, products, query]);

  function updateCategory(nextCategory) {
    const nextParams = new URLSearchParams(searchParams);
    if (nextCategory === "All products") nextParams.delete("category");
    else nextParams.set("category", nextCategory);
    setSearchParams(nextParams, { replace: true });
  }

  function handleSearch(event) {
    event.preventDefault();
    const nextParams = new URLSearchParams(searchParams);
    if (query.trim()) nextParams.set("q", query.trim());
    else nextParams.delete("q");
    setSearchParams(nextParams, { replace: true });
  }

  return (
    <>
      <section className="bg-[#FFE9EC]">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7E000C]">The stationery shop</p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div><h1 className="font-display text-4xl text-[#7E000C] sm:text-5xl">Find your next favorite.</h1><p className="mt-3 max-w-xl text-sm leading-6 text-stone-700 sm:text-base">Writing, planning, and making things a little more delightful.</p></div>
            <p className="text-sm text-stone-600">{loading ? "Gathering the collection…" : `${filteredProducts.length} ${filteredProducts.length === 1 ? "piece" : "pieces"}`}</p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-9 sm:px-8 sm:py-12 lg:px-10">
        <div className="flex flex-col gap-5 border-b border-stone-200 pb-6 lg:flex-row lg:items-center lg:justify-between">
          <form onSubmit={handleSearch} className="flex w-full gap-2 lg:max-w-md">
            <label className="sr-only" htmlFor="product-search">Search products</label>
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-stone-200 px-3 focus-within:border-[#7E000C]"><Search size={17} className="shrink-0 text-stone-500" /><input id="product-search" value={query} onChange={(event) => { const nextParams = new URLSearchParams(searchParams); if (event.target.value) nextParams.set("q", event.target.value); else nextParams.delete("q"); setSearchParams(nextParams, { replace: true }); }} placeholder="Search notebooks, pens…" className="min-w-0 flex-1 border-0 bg-transparent py-3 text-sm outline-none" /></div>
            <button type="submit" className="rounded-md bg-[#7E000C] px-4 text-sm font-semibold text-white transition hover:bg-[#5f0009]">Search</button>
          </form>
          <div className="flex items-start gap-3">
            <SlidersHorizontal size={17} className="mt-2.5 shrink-0 text-[#7E000C]" aria-hidden="true" />
            <div className="flex flex-wrap gap-2" aria-label="Filter by category">
              {categories.map((item) => <button key={item} type="button" onClick={() => updateCategory(item)} aria-pressed={category === item} className={`min-h-9 rounded-full border px-3.5 text-xs font-medium transition ${category === item ? "border-[#7E000C] bg-[#7E000C] text-white" : "border-stone-200 bg-white text-stone-700 hover:border-[#7E000C] hover:text-[#7E000C]"}`}>{item}</button>)}
            </div>
          </div>
        </div>
        {error ? (
          <div role="alert" className="py-20 text-center"><h2 className="font-display text-2xl text-stone-900">We couldn’t load the collection.</h2><p className="mt-2 text-sm text-stone-600">{error}</p></div>
        ) : loading ? (
          <div aria-live="polite" className="grid grid-cols-2 gap-3 py-8 sm:gap-5 lg:grid-cols-4">{Array.from({ length: 4 }, (_, index) => <div key={index} className="aspect-[4/5] animate-pulse rounded-md bg-rose-50" />)}</div>
        ) : filteredProducts.length ? (
          <div className="grid grid-cols-2 gap-3 py-8 sm:gap-5 lg:grid-cols-4">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        ) : (
          <div className="py-20 text-center"><h2 className="font-display text-2xl text-stone-900">Nothing on this shelf just yet.</h2><p className="mt-2 text-sm text-stone-600">Try another search or browse the full collection.</p><button type="button" onClick={() => { const nextParams = new URLSearchParams(); setSearchParams(nextParams, { replace: true }); }} className="mt-5 text-sm font-semibold text-[#7E000C] underline underline-offset-4">Clear filters</button></div>
        )}
      </section>
    </>
  );
}

export default Products;