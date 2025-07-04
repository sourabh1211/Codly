import React from 'react';
import logo from "../images/logos/logo.png";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const routes = {
    Home: "/",
    About: "/about",
    Services: "/services",
    Contact: "/contact"
  };

  return (
    <div className="nav sticky top-0 z-50 flex items-center justify-between px-6 md:px-20 h-[80px] bg-[#0f0e0e]/80 backdrop-blur-md border-b border-gray-700 shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
      <img
        src={logo}
        alt="Logo"
        className="w-[140px] md:w-[160px] object-contain cursor-pointer hover:opacity-90 transition duration-300 hover:scale-105"
      />

      <div className="links flex items-center gap-4 md:gap-8 text-white text-[15px] md:text-[16px] font-medium">
        {Object.keys(routes).map((item, index) => (
          <Link
            to={routes[item]}
            key={index}
            className="relative px-2 py-1 group hover:text-cyan-400 transition-all duration-300"
          >
            {item}
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}

        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("isLoggedIn");
            window.location.reload();
          }}
          className="ml-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:shadow-yellow-400/50 hover:scale-105 transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
