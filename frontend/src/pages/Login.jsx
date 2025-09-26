import React, { useState } from 'react';
import logo from "../images/logos/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api_base_url } from '../helper';

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/login", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, pwd }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("isLoggedIn", true);
          window.location.href = "/";
        } else {
          toast.error(data.msg);
        }
      });
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#0a0f1c] relative overflow-hidden">
      {/* soft gradients like the mock */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_480px_at_15%_-10%,rgba(59,130,246,0.25),transparent_60%),radial-gradient(700px_420px_at_110%_35%,rgba(168,85,247,0.18),transparent_60%)]" />

      {/* Left side: form */}
      <section className="relative z-10 flex items-center">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-10 md:py-16">
          <img className="h-8 w-auto mb-8" src={logo} alt="Logo" />

          <form
            onSubmit={submitForm}
            className="w-full max-w-xl rounded-2xl bg-[#0b1323]/80 backdrop-blur-md border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] p-6 sm:p-8"
          >
            <div className="space-y-4">
              <div>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#121a2b] text-white placeholder-slate-400 outline-none border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
                />
              </div>

              <div>
                <input
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  type="password"
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#121a2b] text-white placeholder-slate-400 outline-none border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
                />
              </div>
            </div>

            <div className="mt-4 w-full text-sm text-slate-400 text-left">
              Don't have an account?{" "}
              <Link to="/signUp" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">
                Sign Up
              </Link>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-xl font-semibold transition shadow-lg shadow-blue-600/25"
            >
              Login
            </button>
          </form>
        </div>
      </section>

      {/* Right side: decorative hero like the screenshot (no data changes) */}
      <aside className="relative hidden md:block">
        <div className="absolute inset-0">
          {/* replace with your asset if desired */}
          <div className="h-full w-full bg-[url('/images/auth-hero.jpg')] bg-cover bg-center opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-l from-[#0a0f1c] via-transparent to-transparent" />
        </div>
      </aside>
    </div>
  );
};

export default Login;
