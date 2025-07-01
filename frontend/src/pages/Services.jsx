import React from 'react';
import { FaCode, FaUsers, FaFolderOpen, FaShareAlt } from 'react-icons/fa';
const Services = () => {
  const services = [
    {
      icon: <FaCode size={40} className="text-purple-400" />,
      title: "Multi-language Code Editor",
      desc: "Write and edit code in C++, Python, Java, JavaScript, and more — directly in your browser with fast syntax highlighting and support for multiple file types.",
    },
    {
      icon: <FaUsers size={40} className="text-pink-400" />,
      title: "Real-time Collaboration",
      desc: "Collaborate seamlessly by sharing live code sessions with teammates or students. Perfect for interviews, tutoring, or pair programming.",
    },
    {
      icon: <FaFolderOpen size={40} className="text-blue-400" />,
      title: "Project & File Management",
      desc: "Manage your projects with features like creating, deleting, and renaming files. Stay organized and productive just like in a local IDE.",
    },
    {
      icon: <FaShareAlt size={40} className="text-yellow-300" />,
      title: "Code Sharing & Embedding",
      desc: "Easily copy your code, share links to snippets, or embed code blocks in blogs, websites, or documentation with one click.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f0e0e] text-white px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 text-transparent bg-clip-text">
        Our IDE Features
      </h1>

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl bg-[#1f1f1f] border border-pink-500 hover:border-purple-500 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold text-pink-400 mb-2">{service.title}</h3>
            <p className="text-gray-300">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Services;
