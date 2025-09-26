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

// export default Login;
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
      headers: {
        "Content-Type": "application/json",
      },
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
    <div className="relative flex items-center justify-center min-h-screen font-['Raleway'] bg-white overflow-hidden group">
      {/* Expanding rotating panels */}
      <div className="absolute inset-0">
        <div className="absolute w-[200vmax] h-[200vmax] top-1/2 left-1/2 -mt-[100vmax] -ml-[100vmax] rotate-45 bg-[#e46569] opacity-65 transition-all duration-500 ease-[cubic-bezier(0.445,0.05,0,1)] origin-[0_50%] delay-200 group-hover:-ml-[200px] group-hover:origin-[-200px_50%] group-hover:delay-0"></div>
        <div className="absolute w-[200vmax] h-[200vmax] top-1/2 left-1/2 -mt-[100vmax] -ml-[100vmax] rotate-[135deg] bg-[#ecaf81] opacity-65 transition-all duration-500 ease-[cubic-bezier(0.445,0.05,0,1)] origin-[0_50%] delay-200 group-hover:-ml-[200px] group-hover:origin-[-200px_50%] group-hover:delay-0"></div>
        <div className="absolute w-[200vmax] h-[200vmax] top-1/2 left-1/2 -mt-[100vmax] -ml-[100vmax] -rotate-45 bg-[#60b8d4] opacity-65 transition-all duration-500 ease-[cubic-bezier(0.445,0.05,0,1)] origin-[0_50%] delay-200 group-hover:-ml-[200px] group-hover:origin-[-200px_50%] group-hover:delay-0"></div>
        <div className="absolute w-[200vmax] h-[200vmax] top-1/2 left-1/2 -mt-[100vmax] -ml-[100vmax] -rotate-[135deg] bg-[#3745b5] opacity-65 transition-all duration-500 ease-[cubic-bezier(0.445,0.05,0,1)] origin-[0_50%] delay-200 group-hover:-ml-[200px] group-hover:origin-[-200px_50%] group-hover:delay-0"></div>
      </div>

      {/* Center Login Card */}
      <form
        onSubmit={submitForm}
        className="relative w-80 sm:w-96 md:w-[400px] h-[400px] flex flex-col justify-center items-center gap-5 bg-black/90 p-8 rounded-2xl shadow-2xl opacity-0 transition-all duration-500 ease-[cubic-bezier(0.445,0.05,0,1)] delay-0 group-hover:opacity-100 group-hover:delay-200 z-20"
      >
        <img className="w-40 sm:w-48 object-contain mb-4" src={logo} alt="Logo" />

        <div className="w-full">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter your email"
            required
            className="w-full px-5 py-3 rounded-xl bg-[#1e1e1e] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
        </div>

        <div className="w-full">
          <input
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            type="password"
            placeholder="Enter your password"
            required
            className="w-full px-5 py-3 rounded-xl bg-[#1e1e1e] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
        </div>

        <div className="w-full text-sm text-gray-400 text-left">
          Don't have an account?{" "}
          <Link to="/signUp" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </div>

        <button
          type="submit"
          className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

