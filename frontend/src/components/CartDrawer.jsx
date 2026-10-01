import { useEffect } from "react";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "../context/useCart";

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

function CartDrawer({ open, onClose }) {
  const { items, subtotal, updateQuantity, removeFromCart } = useCart();

  useEffect(() => {
    if (!open) return undefined;
    function closeOnEscape(event) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <button type="button" onClick={onClose} aria-label="Close shopping bag" className="absolute inset-0 cursor-default bg-stone-900/40" />
      <aside role="dialog" aria-modal="true" aria-labelledby="cart-title" className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-stone-100 px-5 py-5 sm:px-7">
          <div>
            <h2 id="cart-title" className="font-display text-2xl text-stone-900">Your bag</h2>
            <p className="mt-1 text-xs text-stone-500">{items.length} {items.length === 1 ? "product" : "products"}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close shopping bag" className="inline-flex size-10 items-center justify-center rounded-full text-stone-600 transition hover:bg-rose-50 hover:text-[#7E000C]"><X size={20} /></button>
        </div>
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <p className="font-display text-xl text-stone-800">Your bag is waiting for inspiration.</p>
            <p className="mt-2 text-sm text-stone-500">Add a few favorites and they will appear here.</p>
            <button type="button" onClick={onClose} className="mt-6 rounded-md bg-[#7E000C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5f0009]">Continue shopping</button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-stone-100 overflow-y-auto px-5 sm:px-7">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-4 py-5">
                  <img src={product.image} alt={product.name} className="size-20 shrink-0 rounded-md bg-rose-50 object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-stone-900">{product.name}</p>
                    <p className="mt-1 text-sm text-[#7E000C]">{currency.format(product.price)}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <button type="button" aria-label={`Remove one ${product.name}`} onClick={() => updateQuantity(product.id, -1)} className="inline-flex size-7 items-center justify-center rounded border border-stone-200 text-stone-600 hover:border-[#7E000C] hover:text-[#7E000C]"><Minus size={13} /></button>
                      <span className="min-w-4 text-center text-sm">{quantity}</span>
                      <button type="button" aria-label={`Add one ${product.name}`} onClick={() => updateQuantity(product.id, 1)} className="inline-flex size-7 items-center justify-center rounded border border-stone-200 text-stone-600 hover:border-[#7E000C] hover:text-[#7E000C]"><Plus size={13} /></button>
                      <button type="button" onClick={() => removeFromCart(product.id)} className="ml-auto text-xs text-stone-500 underline underline-offset-2 hover:text-[#7E000C]">Remove</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-stone-100 px-5 py-5 sm:px-7">
              <div className="flex justify-between text-sm font-semibold text-stone-900"><span>Subtotal</span><span>{currency.format(subtotal)}</span></div>
              <p className="mt-2 text-xs text-stone-500">Shipping and taxes are calculated at checkout.</p>
              <button type="button" disabled className="mt-5 w-full rounded-md bg-[#7E000C] px-5 py-3.5 text-sm font-semibold text-white opacity-70">Checkout coming soon</button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export default CartDrawer;