import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#7E000C] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr] md:py-14">
        <div>
          <Link to="/" className="font-display text-2xl">Artistry Avenue</Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/75">Thoughtful stationery and creative tools for the notes, plans, and ideas that make a day your own.</p>
          <p className="mt-5 font-display text-sm italic text-rose-200">A little more room for ideas.</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Explore</h2>
          <div className="mt-4 flex flex-col gap-3 text-sm text-white/75">
            <Link className="transition hover:text-white" to="/">Home</Link>
            <Link className="transition hover:text-white" to="/products">Shop all</Link>
            <Link className="transition hover:text-white" to="/about">Our story</Link>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Your account</h2>
          <div className="mt-4 flex flex-col gap-3 text-sm text-white/75">
            <Link className="transition hover:text-white" to="/login">Sign in</Link>
            <Link className="transition hover:text-white" to="/register">Create an account</Link>
          </div>
        </div>
        <div className="border-t border-white/20 pt-5 text-xs text-white/60 md:col-span-3 md:flex md:justify-between md:pt-6">
          <p>© 2026 Artistry Avenue. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Made for your next good idea.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;