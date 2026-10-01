import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { registerUser } from "../services/auth";

const fieldClass = "mt-1.5 w-full rounded-md border border-stone-200 bg-white px-3.5 py-3 text-sm text-stone-900 outline-none transition focus:border-[#7E000C]";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError(false);
    if (form.password !== form.confirmPassword) {
      setError(true);
      setMessage("Your passwords do not match.");
      return;
    }
    setSubmitting(true);
    try {
      await registerUser({ name: form.name, email: form.email, password: form.password });
      setMessage("Your account has been created.");
    } catch (requestError) {
      setError(true);
      setMessage(requestError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mx-auto grid max-w-7xl items-stretch gap-8 px-5 py-10 sm:px-8 sm:py-14 md:grid-cols-[0.9fr_1fr] lg:px-10 lg:py-16">
      <div className="order-2 mx-auto flex w-full max-w-md flex-col justify-center py-3 md:order-1 md:px-3"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7E000C]">A fresh page</p><h1 className="mt-3 font-display text-4xl text-stone-900">Create your account</h1><p className="mt-3 text-sm leading-6 text-stone-600">Keep your stationery favorites close and be first to hear about new arrivals.</p>
        <form onSubmit={handleSubmit} className="mt-7 space-y-4"><div><label htmlFor="register-name" className="text-sm font-medium text-stone-800">Your name</label><input id="register-name" name="name" autoComplete="name" required value={form.name} onChange={updateField} className={fieldClass} placeholder="Name" /></div><div><label htmlFor="register-email" className="text-sm font-medium text-stone-800">Email address</label><input id="register-email" name="email" type="email" autoComplete="email" required value={form.email} onChange={updateField} className={fieldClass} placeholder="you@example.com" /></div><div><label htmlFor="register-password" className="text-sm font-medium text-stone-800">Password</label><input id="register-password" name="password" type="password" autoComplete="new-password" required minLength={8} value={form.password} onChange={updateField} className={fieldClass} placeholder="At least 8 characters" /></div><div><label htmlFor="register-confirm-password" className="text-sm font-medium text-stone-800">Confirm password</label><input id="register-confirm-password" name="confirmPassword" type="password" autoComplete="new-password" required minLength={8} value={form.confirmPassword} onChange={updateField} className={fieldClass} placeholder="Enter your password again" /></div><Button type="submit" disabled={submitting} className="w-full">{submitting ? "Please wait…" : "Create account"}</Button>{message && <p role={error ? "alert" : "status"} className={`text-sm ${error ? "text-red-700" : "text-emerald-800"}`}>{message}</p>}</form>
        <p className="mt-6 text-center text-sm text-stone-600">Already have an account? <Link to="/login" className="font-semibold text-[#7E000C] underline underline-offset-4">Sign in</Link></p>
      </div>
      <div className="relative order-1 min-h-48 overflow-hidden rounded-md bg-[#FFE9EC] md:order-2 md:min-h-[600px]"><img src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1000&q=85" alt="A notebook open beside a pen, ready for a new idea" className="absolute inset-0 size-full object-cover" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/75 to-transparent px-6 pb-6 pt-16 text-white sm:px-8 sm:pb-8"><p className="font-display text-2xl sm:text-3xl">A good idea deserves a good page.</p></div></div>
    </section>
  );
}

export default Register;