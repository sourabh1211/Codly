import React, { useState } from 'react';
import logo from "../images/logos/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { api_base_url } from '../helper';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [leaving, setLeaving] = useState(false); // NEW: for smooth exit
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/signUp", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, pwd })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          navigate("/login");
        } else {
          toast.error(data.msg);
        }
      });
  };

  // NEW: smooth transition then navigate
  const goLoginSmooth = (e) => {
    e.preventDefault();
    // skip animation for users who prefer reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      navigate("/login");
      return;
    }
    setLeaving(true);
    setTimeout(() => navigate("/login"), 320); // match duration-300 with a tiny buffer
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2">
      {/* Left visual panel */}
      <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="pointer-events-none absolute -top-24 -left-24 w-[34rem] h-[34rem] rounded-full blur-3xl opacity-25 bg-indigo-600" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-20 bg-violet-600" />
        <div className="m-auto text-center px-10">
          <img
            src={logo}
            alt="Brand"
            className="mx-auto w-44 drop-shadow-lg transform-gpu transition-transform duration-500 motion-safe:hover:-translate-y-1"
          />
          <h1 className="mt-6 text-3xl font-semibold text-white/90">Create your account</h1>
          <p className="mt-2 text-slate-300/80">It only takes a minute to get started.</p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex items-center justify-center bg-slate-950 lg:bg-slate-900/10 px-4">
        <div
          className={`w-full max-w-md sm:max-w-lg p-6 sm:p-8 md:p-10 [perspective:1200px]
                      transition-all duration-300 transform-gpu
                      motion-reduce:transition-none
                      ${leaving ? "opacity-0 translate-y-2 scale-[0.98]" : "opacity-100 translate-y-0 scale-100"}`}
        >
          <form
            onSubmit={submitForm}
            className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl
                       shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] p-6 sm:p-8 flex flex-col gap-6
                       transform-gpu transition-transform duration-500 ease-out
                       motion-safe:hover:[transform:rotateX(4deg)_rotateY(-4deg)]
                       motion-reduce:transform-none"
          >
            {/* mobile logo */}
            <div className="lg:hidden flex justify-center">
              <img src={logo} alt="Brand" className="w-28 sm:w-32 drop-shadow" />
            </div>

            {/* Full Name */}
            <div className="space-y-1">
              <label htmlFor="fullName" className="block text-sm font-medium text-slate-300">Full Name</label>
              <input
                id="fullName"
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
                type="text"
                placeholder="Jane Doe"
                required
                autoComplete="name"
                className="w-full h-12 rounded-xl bg-slate-800/70 text-slate-100 placeholder-slate-400
                           border border-slate-700/60 outline-none px-4
                           focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20
                           transform-gpu transition-all duration-300
                           hover:border-indigo-300/80 hover:shadow-[0_8px_24px_-10px_rgba(99,102,241,0.45)]
                           motion-safe:hover:-translate-y-0.5"
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email</label>
              <input
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="w-full h-12 rounded-xl bg-slate-800/70 text-slate-100 placeholder-slate-400
                           border border-slate-700/60 outline-none px-4
                           focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20
                           transform-gpu transition-all duration-300
                           hover:border-indigo-300/80 hover:shadow-[0_8px_24px_-10px_rgba(99,102,241,0.45)]
                           motion-safe:hover:-translate-y-0.5"
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">Password</label>
              <div className="relative">
                <input
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  type={showPwd ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  autoComplete="new-password"
                  className="w-full h-12 pr-12 rounded-xl bg-slate-800/70 text-slate-100 placeholder-slate-400
                             border border-slate-700/60 outline-none px-4
                             focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20
                             transform-gpu transition-all duration-300
                             hover:border-violet-300/80 hover:shadow-[0_8px_24px_-10px_rgba(139,92,246,0.45)]
                             motion-safe:hover:-translate-y-0.5"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 p-2 rounded-lg
                             text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label={showPwd ? "Hide password" : "Show password"}
                >
                  {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Links */}
            <div className="flex items-center justify-between text-sm">
              <div className="text-slate-400">
                Already have an account?{" "}
                {/* UPDATED: intercept click for smooth exit */}
                <Link
                  to="/login"
                  onClick={goLoginSmooth}
                  className="text-indigo-300 hover:text-indigo-200 underline underline-offset-4
                             decoration-indigo-300/60 hover:decoration-indigo-200 transition-colors"
                >
                  Login
                </Link>
              </div>
              <Link to="/terms" className="text-slate-400 hover:text-slate-200 transition-colors">
                Terms
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="h-12 rounded-xl font-semibold text-white
                         bg-gradient-to-r from-indigo-600 to-violet-600
                         shadow-lg shadow-indigo-900/30
                         transform-gpu transition-all duration-300
                         hover:shadow-xl hover:shadow-indigo-900/40
                         active:scale-[0.98] motion-safe:hover:-translate-y-0.5"
            >
              Sign Up
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 text-slate-400/70 text-xs">
              <div className="h-px w-full bg-white/10" />
              <span className="tracking-wide">create &amp; explore</span>
              <div className="h-px w-full bg-white/10" />
            </div>
          </form>

          <div className="mt-4 text-center text-xs text-slate-500">
            Responsive: full-page on mobile · split layout on ≥1024px
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
