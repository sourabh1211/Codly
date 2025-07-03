// import React from 'react';
// import logo from "../images/logos/logo.png";
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   const routes = {
//     Home: "/",
//     About: "/about",
//     Services: "/services",
//     Contact: "/contact"
//   };

//   return (
//     <div className="nav sticky top-0 z-50 flex items-center justify-between px-6 md:px-20 h-[80px] bg-[#0f0e0e]/80 backdrop-blur-md border-b border-gray-700 shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
//       <img
//         src={logo}
//         alt="Logo"
//         className="w-[140px] md:w-[160px] object-contain cursor-pointer hover:opacity-90 transition duration-300 hover:scale-105"
//       />

//       <div className="links flex items-center gap-4 md:gap-8 text-white text-[15px] md:text-[16px] font-medium">
//         {Object.keys(routes).map((item, index) => (
//           <Link
//             to={routes[item]}
//             key={index}
//             className="relative px-2 py-1 group hover:text-cyan-400 transition-all duration-300"
//           >
//             {item}
//             <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
//           </Link>
//         ))}

//         <button
//           onClick={() => {
//             localStorage.removeItem("token");
//             localStorage.removeItem("isLoggedIn");
//             window.location.reload();
//           }}
//           className="ml-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:shadow-yellow-400/50 hover:scale-105 transition-all duration-300"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
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
    <div className="nav sticky top-0 z-50 flex items-center justify-between px-6 md:px-20 h-[80px] bg-transparent backdrop-blur-lg border-b border-gray-600/20 shadow-[0_2px_15px_rgba(0,122,255,0.3)]">
      <img
        src={logo}
        alt="Logo"
        className="w-[140px] md:w-[160px] object-contain cursor-pointer transition-transform duration-300 hover:scale-110 hover:drop-shadow-[0_0_20px_rgba(0,122,255,0.7)]"
      />

      <div className="links flex items-center gap-6 md:gap-10">
        {Object.keys(routes).map((item, index) => (
          <Link
            to={routes[item]}
            key={index}
            className="relative px-3 py-1 text-white text-[15px] md:text-[16px] font-semibold overflow-hidden group"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-300">
              {item}
            </span>
            <span className="absolute inset-0 transform scale-x-0 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-30 group-hover:scale-x-100 origin-left transition-transform duration-500"></span>
            <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-gradient-to-r from-blue-400 to-cyan-300 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}

        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("isLoggedIn");
            window.location.reload();
          }}
          className="relative ml-4 px-6 py-2 rounded-full font-bold text-white bg-gradient-to-r from-blue-500 to-cyan-500 bg-opacity-80 backdrop-blur-sm shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,200,255,0.6)] overflow-hidden"
        >
          <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          <span className="relative z-10">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
