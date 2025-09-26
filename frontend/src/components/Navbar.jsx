import React, { useState, useEffect, useRef } from "react";
import logo from "../images/logos/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";

const Navbar = () => {
  const routes = {
    Home: "/",
    About: "/about",
    Services: "/services",
    Contact: "/contact",
  };

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef(null);
  const btnRef = useRef(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // subtle background change on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // close drawer on outside click
  useEffect(() => {
    const onClick = (e) => {
      if (!open) return;
      if (drawerRef.current && !drawerRef.current.contains(e.target) && !btnRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
  };

  const LinkItem = ({ label, to }) => {
    const isActive = pathname === to;
    return (
      <Link
        to={to}
        className={`relative px-2 py-1 transition-all duration-300 ${
          isActive ? "text-cyan-300" : "text-white/90 hover:text-cyan-400"
        }`}
      >
        {label}
        <span
          className={`absolute left-0 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 ${
            isActive ? "w-full" : "w-0 group-hover:w-full"
          }`}
        />
      </Link>
    );
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        scrolled ? "bg-slate-950/70" : "bg-slate-950/50"
      } backdrop-blur-xl border-b border-white/10 shadow-[0_2px_16px_-8px_rgba(0,0,0,0.7)]`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 group"
          aria-label="Go to home"
        >
          <img
            src={logo}
            alt="Logo"
            className="w-[132px] sm:w-[150px] object-contain transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 group">
          {Object.entries(routes).map(([label, to]) => (
            <LinkItem key={label} label={label} to={to} />
          ))}

          <button
            onClick={logout}
            className="ml-2 inline-flex items-center gap-2 rounded-full px-5 py-2 font-semibold text-white
                       bg-gradient-to-r from-indigo-600 to-violet-600
                       shadow-lg shadow-indigo-900/30 transform-gpu transition-all duration-300
                       hover:shadow-xl hover:shadow-indigo-900/40 hover:scale-[1.03] active:scale-[0.98]"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          ref={btnRef}
          onClick={() => setOpen((v) => !v)}
          aria-label="Open menu"
          aria-expanded={open}
          className="md:hidden inline-flex items-center justify-center p-2 rounded-xl text-white/90 hover:text-white
                     bg-white/10 hover:bg-white/15 border border-white/10 transition-colors"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* overlay */}
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        {/* panel */}
        <div
          ref={drawerRef}
          className={`absolute right-0 top-0 h-full w-[82%] max-w-[360px]
                      bg-slate-950/80 backdrop-blur-2xl border-l border-white/10
                      shadow-[0_20px_60px_rgba(0,0,0,0.65)]
                      transform-gpu transition-all duration-300
                      ${open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
        >
          <div className="px-5 py-4 flex items-center justify-between border-b border-white/10">
            <img src={logo} alt="Logo" className="w-[120px] object-contain" />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="p-2 rounded-lg text-white/90 hover:text-white bg-white/10 hover:bg-white/15 border border-white/10 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-4 flex flex-col gap-1">
            {Object.entries(routes).map(([label, to]) => {
              const isActive = pathname === to;
              return (
                <Link
                  key={label}
                  to={to}
                  className={`group relative rounded-xl px-4 py-3 transition-all duration-200
                              ${isActive ? "bg-white/10 text-cyan-300" : "text-white/90 hover:bg-white/8 hover:text-cyan-300"}`}
                >
                  <span className="relative z-[1]">{label}</span>
                  {/* hover glow */}
                  <span className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: "radial-gradient(120px 120px at 90% 50%, rgba(99,102,241,0.18), transparent 60%)" }} />
                </Link>
              );
            })}

            <button
              onClick={logout}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold text-white
                         bg-gradient-to-r from-indigo-600 to-violet-600
                         shadow-lg shadow-indigo-900/30 transform-gpu transition-all duration-300
                         hover:shadow-xl hover:shadow-indigo-900/40 active:scale-[0.98]"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          {/* decorative bottom gradient bar */}
          <div className="mt-auto h-12 bg-gradient-to-r from-indigo-600/30 via-violet-600/30 to-indigo-600/30" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
