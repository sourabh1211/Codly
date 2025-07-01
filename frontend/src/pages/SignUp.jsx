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
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/signUp", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ fullName, email, pwd })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        navigate("/login");
      } else {
        toast.error(data.msg);
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <form
        onSubmit={submitForm}
        className="w-full max-w-md sm:max-w-lg bg-black p-8 sm:p-10 rounded-2xl shadow-2xl flex flex-col items-center gap-5 transition-all duration-300"
      >
        <img className="w-48 object-contain mb-4" src={logo} alt="Logo" />

        <div className="w-full">
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            placeholder="Full Name"
            required
            className="w-full px-5 py-3 rounded-xl bg-[#1e1e1e] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="w-full">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            required
            className="w-full px-5 py-3 rounded-xl bg-[#1e1e1e] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="w-full relative">
          <input
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            type={showPwd ? "text" : "password"}
            placeholder="Password"
            required
            className="w-full px-5 py-3 pr-12 rounded-xl bg-[#1e1e1e] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPwd(!showPwd)}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showPwd ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="w-full text-sm text-gray-400 text-left">
          Already have an account? <Link to="/login" className="text-blue-400 hover:underline">Login</Link>
        </div>

        <button
          type="submit"
          className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};
export default SignUp;
