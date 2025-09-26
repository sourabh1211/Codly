// import React, { useState } from 'react';
// import logo from "../images/logos/logo.png";
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { api_base_url } from '../helper';

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [pwd, setPwd] = useState("");
//   const navigate = useNavigate();

//   const submitForm = (e) => {
//     e.preventDefault();
//     fetch(api_base_url + "/login", {
//       mode: "cors",
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ email, pwd })
//     }).then(res => res.json()).then(data => {
//       if (data.success) {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("isLoggedIn", true);
//         window.location.href = "/";
//       } else {
//         toast.error(data.msg);
//       }
//     });
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-white px-4">
//       <form
//         onSubmit={submitForm}
//         className="w-full max-w-md sm:max-w-lg bg-black p-8 sm:p-10 rounded-2xl shadow-2xl flex flex-col items-center gap-5 transition-all duration-300"
//       >
//         <img className="w-48 object-contain mb-4" src={logo} alt="Logo" />

//         <div className="w-full">
//           <input
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             type="email"
//             placeholder="Enter your email"
//             required
//             className="w-full px-5 py-3 rounded-xl bg-[#1e1e1e] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
//           />
//         </div>

//         <div className="w-full">
//           <input
//             onChange={(e) => setPwd(e.target.value)}
//             value={pwd}
//             type="password"
//             placeholder="Enter your password"
//             required
//             className="w-full px-5 py-3 rounded-xl bg-[#1e1e1e] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
//           />
//         </div>

//         <div className="w-full text-sm text-gray-400 text-left">
//           Don't have an account? <Link to="/signUp" className="text-blue-400 hover:underline">Sign Up</Link>
//         </div>

//         <button
//           type="submit"
//           className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login

import React, { useState } from "react";
import logo from "../images/logos/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api_base_url } from "../helper";

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
    <div className="relative w-screen h-screen overflow-hidden group font-[Raleway]">
      {/* BACKGROUND DIAMONDS (top layer) */}
      {/* emulate ::before / ::after with two huge rotated squares */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
      >
        {/* top ::before (45deg, #e46569) */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-65 z-10 transition-all duration-500 ease-[cubic-bezier(0.445,0.05,0,1)] origin-center rotate-45 group-hover:translate-x-12"
          style={{ width: "200vmax", height: "200vmax", background: "#e46569" }}
        />
        {/* top ::after (135deg, #ecaf81) */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-65 z-10 transition-all duration-500 ease-[cubic-bezier(0.445,0.05,0,1)] origin-center rotate-[135deg] group-hover:translate-x-12 delay-200"
          style={{ width: "200vmax", height: "200vmax", background: "#ecaf81" }}
        />
      </div>

      {/* BACKGROUND DIAMONDS (bottom layer) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
      >
        {/* bottom ::before (-45deg, #60b8d4) */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-65 z-0 transition-all duration-500 ease-[cubic-bezier(0.445,0.05,0,1)] origin-center -rotate-45 group-hover:-translate-x-12"
          style={{ width: "200vmax", height: "200vmax", background: "#60b8d4" }}
        />
        {/* bottom ::after (-135deg, #3745b5) */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-65 z-0 transition-all duration-500 ease-[cubic-bezier(0.445,0.05,0,1)] origin-center -rotate-[135deg] group-hover:-translate-x-12 delay-200"
          style={{ width: "200vmax", height: "200vmax", background: "#3745b5" }}
        />
      </div>

      {/* CENTER CARD */}
      <div className="absolute left-1/2 top-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 p-8 flex flex-col items-center justify-center bg-white/95 text-[#333] shadow-2xl rounded-sm opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.445,0.05,0,1)] group-hover:opacity-100 delay-200">
        <img className="w-28 object-contain mb-4" src={logo} alt="Logo" />

        <form onSubmit={submitForm} className="w-full space-y-3">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="email"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-[2px] outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            type="password"
            placeholder="password"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-[2px] outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-[2px] font-semibold transition-colors"
          >
            Login
          </button>

          <div className="text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link to="/signUp" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

