import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { loginUser, requestPasswordReset } from "../services/auth";

const fieldClass = "mt-1.5 w-full rounded-md border border-stone-200 bg-white px-3.5 py-3 text-sm text-stone-900 outline-none transition focus:border-[#7E000C]";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    setError(false);
    try {
      if (resetMode) {
        await requestPasswordReset({ email });
        setMessage("If an account exists for this email, you’ll receive reset instructions.");
      } else {
        await loginUser({ email, password, remember });
        setMessage("You’re signed in.");
      }
    } catch (requestError) {
      setError(true);
      setMessage(requestError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mx-auto grid max-w-7xl items-stretch gap-8 px-5 py-10 sm:px-8 sm:py-14 md:grid-cols-[1fr_0.9fr] lg:px-10 lg:py-16">
      <div className="relative hidden min-h-[520px] overflow-hidden rounded-md bg-[#FFE9EC] md:block"><img src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=85" alt="A quiet creative desk with a notebook and pen" className="absolute inset-0 size-full object-cover" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/75 to-transparent px-8 pb-8 pt-20 text-white"><p className="font-display text-3xl">Make a little room for you.</p><p className="mt-2 text-sm text-white/80">Your favorite desk essentials are just around the corner.</p></div></div>
      <div className="mx-auto flex w-full max-w-md flex-col justify-center py-3 md:px-3"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7E000C]">Welcome back</p><h1 className="mt-3 font-display text-4xl text-stone-900">{resetMode ? "Reset your password" : "Sign in to your account"}</h1><p className="mt-3 text-sm leading-6 text-stone-600">{resetMode ? "Enter the email connected to your account and we’ll send reset instructions." : "Pick up where your next good idea begins."}</p>
        <form onSubmit={handleSubmit} className="mt-7 space-y-4"><div><label htmlFor="login-email" className="text-sm font-medium text-stone-800">Email address</label><input id="login-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} className={fieldClass} placeholder="you@example.com" /></div>
          {!resetMode && <div><div className="flex items-center justify-between gap-3"><label htmlFor="login-password" className="text-sm font-medium text-stone-800">Password</label><button type="button" onClick={() => { setResetMode(true); setMessage(""); }} className="text-xs font-medium text-[#7E000C] underline underline-offset-4">Forgot password?</button></div><input id="login-password" type="password" autoComplete="current-password" required minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} className={fieldClass} placeholder="At least 8 characters" /></div>}
          {!resetMode && <label className="flex items-center gap-2.5 text-sm text-stone-600"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} className="size-4 accent-[#7E000C]" />Remember me</label>}
          <Button type="submit" disabled={submitting} className="w-full">{submitting ? "Please wait…" : resetMode ? "Send reset instructions" : "Sign in"}</Button>{message && <p role={error ? "alert" : "status"} className={`text-sm ${error ? "text-red-700" : "text-emerald-800"}`}>{message}</p>}
        </form>
        {resetMode ? <button type="button" onClick={() => { setResetMode(false); setMessage(""); }} className="mt-5 self-start text-sm font-medium text-[#7E000C] underline underline-offset-4">Back to sign in</button> : <p className="mt-6 text-center text-sm text-stone-600">New to Artistry Avenue? <Link to="/register" className="font-semibold text-[#7E000C] underline underline-offset-4">Create an account</Link></p>}
      </div>
    </section>
  );
}

export default Login;