import { useEffect, useState } from "react";
import { CartContext } from "./cartContext";

const STORAGE_KEY = "artistry-avenue-cart";

function readStoredCart() {
  try {
    const savedCart = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(savedCart) ? savedCart : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredCart);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function addToCart(product) {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.product.id === product.id);
      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...currentItems, { product, quantity: 1 }];
    });
  }

  function updateQuantity(productId, change) {
    setItems((currentItems) => currentItems
      .map((item) => item.product.id === productId ? { ...item, quantity: item.quantity + change } : item)
      .filter((item) => item.quantity > 0));
  }

  function removeFromCart(productId) {
    setItems((currentItems) => currentItems.filter((item) => item.product.id !== productId));
  }

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return <CartContext.Provider value={{ items, itemCount, subtotal, addToCart, updateQuantity, removeFromCart }}>{children}</CartContext.Provider>;
}