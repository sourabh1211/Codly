import React from 'react';
import { FaLinkedin, FaInstagram, FaSnapchat, FaEnvelope } from 'react-icons/fa';


const Contact = () => {
  const contactItems = [
    {
      icon: <FaLinkedin size={60} />,
      label: 'LinkedIn',
      link: 'https://www.linkedin.com/in/sourabh1112/',
      hoverColor: 'hover:text-blue-500',
      hoverBg: 'hover:shadow-blue-500/50',
    },
    {
      icon: <FaInstagram size={60} />,
      label: 'Instagram',
      link: 'https://www.instagram.com/sourabh_vr',
      hoverColor: 'hover:text-pink-500',
      hoverBg: 'hover:shadow-pink-500/50',
    },
    {
      icon: <FaSnapchat size={60} />,
      label: 'Snapchat',
      link: 'https://www.snapchat.com/add/sourabh_8482',
      hoverColor: 'hover:text-yellow-400',
      hoverBg: 'hover:shadow-yellow-400/40',
    },
    {
      icon: <FaEnvelope size={60} />,
      label: 'Email',
      link: 'mailto:sourabhvr8482@gmail.com',
      hoverColor: 'hover:text-green-400',
      hoverBg: 'hover:shadow-green-400/40',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f0e0e] text-white px-4 py-12 flex flex-col items-center">
      <div className="max-w-5xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
          Contact
        </h1>
        <p className="text-center text-gray-400 mb-12 text-lg">
          Feel free to connect with me on any platform or drop a message below.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
          {contactItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center justify-center gap-4 p-6 rounded-2xl bg-[#1f1f1f] transform transition-all duration-300 scale-100 hover:scale-95 shadow-md ${item.hoverBg} ${item.hoverColor}`}
            >
              <div className="transition-all duration-300">{item.icon}</div>
              <h2 className="text-xl font-semibold">{item.label}</h2>
            </a>
          ))}
        </div>

        <div className="bg-[#1f1f1f] rounded-2xl p-8 shadow-lg max-w-3xl mx-auto w-full">
          <h2 className="text-2xl font-semibold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
            Send me a message
          </h2>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="p-3 rounded-lg bg-[#2a2a2a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-3 rounded-lg bg-[#2a2a2a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="p-3 rounded-lg bg-[#2a2a2a] text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
            ></textarea>
            <button
              type="submit"
              className="mt-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-semibold py-3 rounded-lg hover:scale-105 transition-transform duration-300 shadow-md"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};


export default Contact;
