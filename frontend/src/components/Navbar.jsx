import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import logo from "../assets/logo.jpg";
import { useCart } from "../context/useCart";
import CartDrawer from "./CartDrawer";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors hover:text-[#7E000C] ${isActive ? "text-[#7E000C]" : "text-stone-700"}`;

  function handleSearch(event) {
    event.preventDefault();
    navigate(`/products?q=${encodeURIComponent(searchTerm.trim())}`);
    setSearchOpen(false);
    setMenuOpen(false);
  }

  return (
    <header className="relative z-40 bg-white">
      <div className="bg-[#7E000C] px-4 py-2 text-center text-[11px] font-medium tracking-wide text-white sm:text-xs">
        Complimentary shipping on orders over $49 <span aria-hidden="true">·</span> 10% off your first order
      </div>

      <nav aria-label="Main navigation" className="border-b border-rose-100 bg-white">
        <div className="relative mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="Artistry Avenue home">
            <img
              src={logo}
              alt=""
              className="h-12 w-8 object-contain"
            />
            <span className="font-display text-lg leading-none text-[#7E000C] sm:text-xl">Artistry Avenue</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <NavLink to="/" end className={navLinkClass}>Home</NavLink>
            <NavLink to="/products" className={navLinkClass}>Products</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen((open) => !open)}
              className="inline-flex size-10 items-center justify-center rounded-full text-stone-700 transition hover:bg-rose-50 hover:text-[#7E000C]"
              aria-label={searchOpen ? "Close search" : "Search products"}
              aria-expanded={searchOpen}
            >
              {searchOpen ? <X size={19} /> : <Search size={19} />}
            </button>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative inline-flex size-10 items-center justify-center rounded-full text-stone-700 transition hover:bg-rose-50 hover:text-[#7E000C]"
              aria-label={`Open shopping bag, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
            >
              <ShoppingBag size={19} />
              {itemCount > 0 && <span className="absolute right-0.5 top-0.5 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-[#7E000C] px-1 text-[10px] font-semibold text-white">{itemCount}</span>}
            </button>
            <Link
              to="/login"
              className="hidden rounded-full border border-rose-200 px-4 py-2 text-sm font-medium text-[#7E000C] transition hover:border-[#7E000C] hover:bg-rose-50 sm:inline-flex"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="hidden rounded-full bg-[#7E000C] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#5f0009] sm:inline-flex"
            >
              Register
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex size-10 items-center justify-center rounded-full text-stone-700 transition hover:bg-rose-50 md:hidden"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <form onSubmit={handleSearch} className="absolute right-4 top-full z-50 flex w-[min(22rem,calc(100vw-2rem))] gap-2 rounded-lg border border-rose-100 bg-white p-3 shadow-lg sm:right-6 lg:right-[max(2rem,calc((100vw-80rem)/2))]">
            <label className="sr-only" htmlFor="site-search">Search products</label>
            <input id="site-search" autoFocus value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search stationery" className="min-w-0 flex-1 rounded-md border border-stone-200 px-3 py-2 text-sm outline-none focus:border-[#7E000C]" />
            <button type="submit" className="rounded-md bg-[#7E000C] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#5f0009]">Search</button>
          </form>
        )}

        {menuOpen && (
          <div className="absolute left-0 right-0 top-full z-40 border-b border-rose-100 bg-white px-5 py-4 shadow-md md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-4">
              <NavLink to="/" end onClick={() => setMenuOpen(false)} className={navLinkClass}>Home</NavLink>
              <NavLink to="/products" onClick={() => setMenuOpen(false)} className={navLinkClass}>Products</NavLink>
              <NavLink to="/about" onClick={() => setMenuOpen(false)} className={navLinkClass}>About</NavLink>
              <div className="flex gap-5 border-t border-rose-100 pt-4 text-sm font-medium text-[#7E000C]">
                <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)}>Create account</Link>
              </div>
            </div>
          </div>
        )}
      </nav>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}

export default Navbar;