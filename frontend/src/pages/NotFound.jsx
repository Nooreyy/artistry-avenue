import { Link } from "react-router-dom";
import Button from "../components/Button";

function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-5 py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7E000C]">Page not found</p>
      <h1 className="mt-4 font-display text-4xl text-stone-900 sm:text-5xl">This page wandered off.</h1>
      <p className="mt-4 max-w-md text-sm leading-6 text-stone-600">The address may be incorrect, or the page may have moved. Let’s get you back to the collection.</p>
      <Button as={Link} to="/" className="mt-7">Return home</Button>
    </section>
  );
}

export default NotFound;