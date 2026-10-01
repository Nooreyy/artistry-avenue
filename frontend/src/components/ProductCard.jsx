import { useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { useCart } from "../context/useCart";

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

function ProductCard({ product }) {
  const [saved, setSaved] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  function handleAdd() {
    addToCart(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-md border border-stone-100 bg-white transition-shadow duration-200 hover:shadow-[0_12px_32px_-20px_rgba(70,0,10,0.45)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-rose-50">
        <img src={product.image} alt={product.name} loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        <button type="button" onClick={() => setSaved((value) => !value)} aria-label={saved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`} aria-pressed={saved} className={`absolute right-2 top-2 inline-flex size-9 items-center justify-center rounded-full bg-white/95 shadow-sm transition hover:text-[#7E000C] sm:right-3 sm:top-3 ${saved ? "text-[#7E000C]" : "text-stone-700"}`}>
          <Heart size={17} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7E000C] sm:text-xs">{product.category}</p>
        <h3 className="mt-1 min-h-10 text-sm font-semibold leading-5 text-stone-900 sm:text-base">{product.name}</h3>
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <span className="text-sm font-semibold text-stone-900 sm:text-base">{currency.format(product.price)}</span>
          <button type="button" onClick={handleAdd} aria-label={`Add ${product.name} to cart`} className={`inline-flex size-9 shrink-0 items-center justify-center rounded-full transition ${added ? "bg-[#7E000C] text-white" : "bg-[#FFE9EC] text-[#7E000C] hover:bg-[#7E000C] hover:text-white"}`}><ShoppingBag size={16} /></button>
        </div>
        <span className="sr-only" aria-live="polite">{added ? `${product.name} added to bag` : ""}</span>
      </div>
    </article>
  );
}

export default ProductCard;