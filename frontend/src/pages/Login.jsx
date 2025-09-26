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
    <div className="relative h-screen w-screen overflow-hidden group font-[Raleway]">
      {/* ===== BACKGROUND (matches .top/.bottom + ::before/::after) ===== */}
      {/* top layer */}
      <div className="pointer-events-none absolute inset-0">
        {/* ::before — rotate(45deg) #e46569 */}
        <div className="
          absolute left-1/2 top-1/2 z-10
          h-[200vmax] w-[200vmax] -translate-x-1/2 -translate-y-1/2
          rotate-45 opacity-65 bg-[#e46569]
          origin-left transition-all duration-500 ease-[cubic-bezier(0.445,0.05,0,1)] delay-200
          group-hover:translate-x-[50px] group-active:translate-x-[50px]
        " />
        {/* ::after — rotate(135deg) #ecaf81 */}
        <div className="
          absolute left-1/2 top-1/2 z-10
          h-[200vmax] w-[200vmax] -translate-x-1/2 -translate-y-1/2
          rotate-[135deg] opacity-65 bg-[#ecaf81]
          origin-left transition-all duration-500 ease-[cubic-bezier(0.445,0.05,0,1)] delay-200
          group-hover:translate-x-[50px] group-active:translate-x-[50px]
        " />
      </div>

      {/* bottom layer */}
      <div className="pointer-events-none absolute inset-0">
        {/* ::before — rotate(-45deg) #60b8d4 */}
        <div className="
          absolute left-1/2 top-1/2 z-0
          h-[200vmax] w-[200vmax] -translate-x-1/2 -translate-y-1/2
          -rotate-45 opacity-65 bg-[#60b8d4]
          origin-right transition-all duration-500 ease-[cubic-bezier(0.445,0.05,0,1)] delay-200
          group-hover:-translate-x-[50px] group-active:-translate-x-[50px]
        " />
        {/* ::after — rotate(-135deg) #3745b5 */}
        <div className="
          absolute left-1/2 top-1/2 z-0
          h-[200vmax] w-[200vmax] -translate-x-1/2 -translate-y-1/2
          -rotate-[135deg] opacity-65 bg-[#3745b5]
          origin-right transition-all duration-500 ease-[cubic-bezier(0.445,0.05,0,1)] delay-200
          group-hover:-translate-x-[50px] group-active:-translate-x-[50px]
        " />
      </div>

      {/* ===== CENTER CARD (matches .center) ===== */}
      <div
        className="
          absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          h-[400px] w-[400px] bg-white text-[#333]
          rounded-[2px] shadow-2xl
          flex flex-col items-center justify-center
          p-[30px]
          opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.445,0.05,0,1)]
          group-hover:opacity-100 group-active:opacity-100
        "
      >
        <img src={logo} alt="Logo" className="w-28 h-auto mb-4 object-contain" />

        <form onSubmit={submitForm} className="w-full">
          <input
            type="email"
            placeholder="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full rounded-[1px] border border-[#ccc]
              px-[15px] py-[15px] mb-[10px]
              outline-none focus:ring-2 focus:ring-blue-500
              font-inherit
            "
          />
          <input
            type="password"
            placeholder="password"
            required
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            className="
              w-full rounded-[1px] border border-[#ccc]
              px-[15px] py-[15px] mb-[15px]
              outline-none focus:ring-2 focus:ring-blue-500
              font-inherit
            "
          />

          <button
            type="submit"
            className="
              w-full rounded-[2px] bg-blue-600 text-white
              py-3 font-semibold transition-colors
              hover:bg-blue-700
            "
          >
            Login
          </button>

          <div className="mt-3 text-sm text-gray-500">
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
