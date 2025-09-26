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
      body: JSON.stringify({ email, pwd })
    })
      .then(res => res.json())
      .then(data => {
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
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 flex items-center justify-center px-4">
      <form
        onSubmit={submitForm}
        className="w-full max-w-md sm:max-w-lg rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] p-8 sm:p-10 flex flex-col items-center gap-6"
      >
        <img
          className="w-40 sm:w-48 object-contain mb-1 drop-shadow"
          src={logo}
          alt="Logo"
        />

        <div className="w-full">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email address"
            required
            className="w-full h-12 sm:h-13 rounded-xl bg-slate-800/70 text-slate-100 placeholder-slate-400 border border-slate-700/60 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20 outline-none px-4 sm:px-5 transition-all"
          />
        </div>

        <div className="w-full">
          <input
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            type="password"
            placeholder="Password"
            required
            className="w-full h-12 sm:h-13 rounded-xl bg-slate-800/70 text-slate-100 placeholder-slate-400 border border-slate-700/60 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20 outline-none px-4 sm:px-5 transition-all"
          />
        </div>

        <div className="w-full text-sm text-slate-300/80 text-left">
          Don't have an account?{" "}
          <Link
            to="/signUp"
            className="text-indigo-300 hover:text-indigo-200 underline underline-offset-4 decoration-indigo-300/60 hover:decoration-indigo-200 transition-colors"
          >
            Sign Up
          </Link>
        </div>

        <button
          type="submit"
          className="w-full mt-1 h-12 sm:h-13 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:scale-[0.99] shadow-lg shadow-indigo-900/30 transition-all"
        >
          Login
        </button>

        <div className="w-full flex items-center gap-3 text-slate-400/70 text-xs">
          <div className="h-px w-full bg-white/10" />
          <span>secured login</span>
          <div className="h-px w-full bg-white/10" />
        </div>
      </form>
    </div>
  );
};

export default Login;
