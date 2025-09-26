import React, { useState } from "react";
import logo from "../images/logos/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api_base_url } from "../helper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    if (loading) return;

    // Very basic validation – expand as needed
    if (!email || !pwd) {
      toast.error("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${api_base_url}/login`, {
        mode: "cors",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // If your API uses cookies (recommended), add: credentials: "include",
        body: JSON.stringify({ email, pwd }),
      });

      // Non-2xx handling
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Login failed (${res.status})`);
      }

      const data = await res.json();

      if (data?.success && data?.token) {
        // Prefer httpOnly secure cookies set by the server.
        // If you must store the token client-side:
        localStorage.setItem("token", data.token);

        toast.success("Logged in!");
        navigate("/"); // SPA navigation instead of full reload
      } else {
        toast.error(data?.msg || "Invalid credentials.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <form
        onSubmit={submitForm}
        className="w-full max-w-md sm:max-w-lg bg-black p-8 sm:p-10 rounded-2xl shadow-2xl flex flex-col items-center gap-5 transition-all duration-300"
        noValidate
      >
        <img className="w-48 object-contain mb-4" src={logo} alt="Company logo" />

        <div className="w-full">
          <label htmlFor="email" className="sr-only">Email</label>
          <input
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter your email"
            required
            autoComplete="email"
            aria-invalid={!email ? "true" : "false"}
            className="w-full px-5 py-3 rounded-xl bg-[#1e1e1e] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
        </div>

        <div className="w-full relative">
          <label htmlFor="password" className="sr-only">Password</label>
          <input
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            type={showPwd ? "text" : "password"}
            placeholder="Enter your password"
            required
            autoComplete="current-password"
            aria-invalid={!pwd ? "true" : "false"}
            className="w-full px-5 py-3 pr-12 rounded-xl bg-[#1e1e1e] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
          <button
            type="button"
            onClick={() => setShowPwd((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm hover:text-white"
            aria-label={showPwd ? "Hide password" : "Show password"}
          >
            {showPwd ? "Hide" : "Show"}
          </button>
        </div>

        <div className="w-full text-sm text-gray-400 text-left">
          Don&apos;t have an account?{" "}
          <Link to="/signUp" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-2 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/30"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
