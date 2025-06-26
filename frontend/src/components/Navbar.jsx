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
    <div className="nav flex px-8 md:px-20 items-center justify-between h-[90px] bg-[#0f0e0e] shadow-lg">
      <img src={logo} className="w-[150px] md:w-[170px] object-cover" alt="Logo" />

      <div className="links flex items-center gap-4 md:gap-6 text-white text-[16px] font-medium">
        {Object.keys(routes).map((item, index) => (
          <Link
            to={routes[item]}
            key={index}
            className="relative px-2 py-1 text-white transition-all duration-300 group hover:text-blue-500"
          >
            {item}
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("isLoggedIn");
            window.location.reload();
          }}
          className="ml-2 bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 text-white px-5 py-2 rounded-full shadow-lg hover:shadow-pink-500/50 hover:scale-105 transition-all duration-300 font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
