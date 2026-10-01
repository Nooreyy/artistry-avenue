import {
  ArrowRight,
  Sparkles,
  BookOpen,
  PenLine,
  Palette,
  ShieldCheck,
  Truck,
  Heart,
  Star,
} from "lucide-react";

import { useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import products from "../data/products";
import { subscribeNewsletter } from "../services/marketing";

const categories = [
  {
    title: "Notebooks",
    description: "Write your ideas",
    icon: BookOpen,
  },
  {
    title: "Pens & Pencils",
    description: "Write beautifully",
    icon: PenLine,
  },
  {
    title: "Art & Craft",
    description: "Create freely",
    icon: Palette,
  },
  {
    title: "Planners",
    description: "Share creativity",
    icon: Sparkles,
  },
];

const benefits = [
  {
    title: "Quality Products",
    description:
      "Carefully selected stationery for everyday creativity.",
    icon: ShieldCheck,
  },
  {
    title: "Fast Delivery",
    description:
      "Get your favorite stationery delivered to your doorstep.",
    icon: Truck,
  },
  {
    title: "Made for Creators",
    description:
      "Beautiful products that inspire you to create more.",
    icon: Heart,
  },
];

function Home() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscriptionError, setSubscriptionError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubscribe(event) {
    event.preventDefault();
    setSubmitting(true);
    setSubscriptionError("");
    try {
      await subscribeNewsletter({ email });
      setSubscribed(true);
    } catch (requestError) {
      setSubscriptionError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* ==================== HERO ==================== */}
      <section className="bg-[#FFE9EC]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:gap-16 md:py-24 lg:px-8">

          {/* Hero Content */}
          <div className="max-w-xl">

            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#7E000C] shadow-sm">
              <Sparkles size={14} />
              Sparkle • Create • Inspire
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-[#7E000C] sm:text-5xl md:text-6xl">
              Everything You Need
              <span className="mt-2 block text-gray-900">
                For Your Creative Journey.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-gray-600 md:text-lg">
              Discover beautiful stationery, creative supplies and
              everyday essentials designed to bring your ideas to life.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-full bg-[#7E000C] px-7 py-3.5 text-sm font-semibold text-white transition duration-300 hover:bg-[#620009] hover:shadow-lg"
              >
                Shop Collection
                <ArrowRight size={17} />
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center rounded-full border border-[#7E000C] bg-white px-7 py-3.5 text-sm font-semibold text-[#7E000C] transition duration-300 hover:bg-[#7E000C] hover:text-white"
              >
                Learn More
              </Link>
            </div>

            {/* Everyday inspiration */}
            <div className="mt-10 grid max-w-md grid-cols-3 border-t border-[#7E000C]/10 pt-7">

              <div>
                <p className="text-xl font-bold text-[#7E000C] sm:text-2xl">
                  Write
                </p>
                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  Your thoughts
                </p>
              </div>

              <div className="border-l border-[#7E000C]/10 pl-5">
                <p className="text-xl font-bold text-[#7E000C] sm:text-2xl">
                  Plan
                </p>
                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  What comes next
                </p>
              </div>

              <div className="border-l border-[#7E000C]/10 pl-5">
                <p className="text-xl font-bold text-[#7E000C] sm:text-2xl">
                  Create
                </p>
                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  Something yours
                </p>
              </div>

            </div>
          </div>

          {/* Hero Image */}
          <div className="relative mx-auto w-full max-w-xl">

            <div className="overflow-hidden rounded-[2rem] border-8 border-white bg-white shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85"
                alt="Creative stationery workspace"
                className="h-[420px] w-full object-cover sm:h-[500px]"
              />
            </div>

            {/* Floating Card */}
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur sm:left-8 sm:right-8">

              <div className="flex items-center justify-between gap-4">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#7E000C]">
                    New Collection
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-900 sm:text-base">
                    Create Something Beautiful
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Discover our latest stationery
                  </p>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFE9EC] text-[#7E000C]">
                  <Sparkles size={20} />
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ==================== BENEFITS ==================== */}
      <section className="border-b border-[#FFE9EC] bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 py-8 md:grid-cols-3 md:gap-8 lg:px-8">

          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="flex items-start gap-4 rounded-2xl p-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFE9EC] text-[#7E000C]">
                  <Icon size={21} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {benefit.title}
                  </h3>

                  <p className="mt-1 text-sm leading-5 text-gray-500">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}

        </div>
      </section>

      {/* ==================== CATEGORIES ==================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

          {/* Heading */}
          <div className="mx-auto mb-12 max-w-2xl text-center">

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#7E000C]">
              Explore Our Collection
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Shop By Category
            </h2>

            <p className="mt-4 text-sm leading-6 text-gray-500 sm:text-base">
              Find everything you need to write, plan, create and
              express your ideas.
            </p>

          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">

            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  key={category.title}
                  to={`/products?category=${encodeURIComponent(category.title)}`}
                  className="group flex min-h-[245px] flex-col items-center justify-center rounded-2xl border border-[#FFE9EC] bg-[#FFE9EC]/40 p-6 text-center transition duration-300 hover:-translate-y-1 hover:bg-[#FFE9EC] hover:shadow-lg"
                >

                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-[#7E000C] shadow-sm transition duration-300 group-hover:bg-[#7E000C] group-hover:text-white">
                    <Icon size={30} strokeWidth={1.6} />
                  </div>

                  <h3 className="mt-5 font-semibold text-gray-900">
                    {category.title}
                  </h3>

                  <p className="mt-2 text-xs text-gray-500 sm:text-sm">
                    {category.description}
                  </p>

                  <span className="mt-4 text-xs font-semibold text-[#7E000C]">
                    Shop Now →
                  </span>

                </Link>
              );
            })}

          </div>
        </div>
      </section>

      {/* ==================== FEATURED PRODUCTS ==================== */}
      <section className="bg-[#FFE9EC]/50">
        <div
          id="featured"
          className="mx-auto max-w-7xl px-6 py-20 lg:px-8"
        >

          {/* Heading */}
          <div className="mb-10 flex items-end justify-between gap-6">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#7E000C]">
                Customer Favorites
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                Featured Products
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
                Discover some of our favorite stationery pieces
                for your everyday creativity.
              </p>
            </div>

            <Link
              to="/products"
              className="hidden shrink-0 items-center gap-2 text-sm font-semibold text-[#7E000C] transition hover:gap-3 sm:flex"
            >
              View All
              <ArrowRight size={17} />
            </Link>

          </div>

          {/* Products */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>

          {/* Mobile View All */}
          <div className="mt-8 text-center sm:hidden">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#7E000C]"
            >
              View All Products
              <ArrowRight size={17} />
            </Link>
          </div>

        </div>
      </section>

      {/* ==================== PROMOTIONAL BANNER ==================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

          <div className="relative overflow-hidden rounded-[2rem] bg-[#7E000C] px-6 py-16 text-center text-white sm:px-12 md:px-16">

            {/* Decorative Shapes */}
            <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-white/10" />

            <div className="absolute -bottom-24 -right-10 h-64 w-64 rounded-full bg-white/10" />

            {/* Content */}
            <div className="relative mx-auto max-w-2xl">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FFE9EC] text-[#7E000C]">
                <Sparkles size={24} />
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.3em] text-[#FFE9EC]">
                Discover Something New
              </p>

              <h2 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
                Make Space For Creativity.
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
                Refresh your stationery collection with beautiful
                products made for your everyday ideas, plans and
                creative projects.
              </p>

              <Link
                to="/products"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#FFE9EC] px-7 py-3.5 text-sm font-semibold text-[#7E000C] transition duration-300 hover:bg-white"
              >
                Explore Products
                <ArrowRight size={17} />
              </Link>

            </div>
          </div>

        </div>
      </section>

      {/* ==================== TESTIMONIAL ==================== */}
      <section className="border-y border-[#FFE9EC] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-8">

          {/* Stars */}
          <div className="flex justify-center gap-1 text-[#7E000C]">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={18}
                fill="currentColor"
              />
            ))}
          </div>

          <blockquote className="mx-auto mt-6 max-w-3xl text-xl font-medium leading-8 text-gray-800 sm:text-2xl md:text-3xl md:leading-10">
            "Artistry Avenue makes stationery shopping feel like
            discovering little pieces of inspiration."
          </blockquote>

          <div className="mt-6">
            <p className="font-semibold text-[#7E000C]">
              Our Creative Community
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Loved by stationery and creativity enthusiasts
            </p>
          </div>

        </div>
      </section>

      {/* ==================== NEWSLETTER ==================== */}
      <section className="bg-[#FFE9EC]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

          <div className="mx-auto max-w-2xl text-center">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#7E000C] text-white">
              <Sparkles size={20} />
            </div>

            <h2 className="mt-5 text-3xl font-bold text-[#7E000C] sm:text-4xl">
              Stay Inspired
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
              Subscribe to our newsletter for new arrivals,
              creative inspiration and special offers.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="mx-auto mt-7 flex max-w-lg flex-col gap-3 sm:flex-row"
            >

              <label className="sr-only" htmlFor="newsletter-email">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(event) => { setEmail(event.target.value); setSubscribed(false); setSubscriptionError(""); }}
                placeholder="Enter your email address"
                className="min-w-0 flex-1 rounded-full border border-white bg-white px-5 py-3.5 text-sm text-gray-800 outline-none transition focus:border-[#7E000C]"
              />

              <button
                type="submit"
                disabled={submitting}
                className="rounded-full bg-[#7E000C] px-7 py-3.5 text-sm font-semibold text-white transition duration-300 hover:bg-[#620009] disabled:cursor-wait disabled:opacity-70"
              >
                {submitting ? "Sending…" : "Subscribe"}
              </button>

              {subscribed && <p role="status" className="text-sm text-[#7E000C] sm:absolute sm:mt-14">Thanks for joining our list.</p>}
              {subscriptionError && <p role="alert" className="text-sm text-[#7E000C] sm:absolute sm:mt-14">{subscriptionError}</p>}

            </form>

          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;