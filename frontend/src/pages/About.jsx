import React from 'react';

const About = () => {
  const teamMembers = [
    {
      name: "Sourabh Verma",
      role: "Founder & Developer",
    },
    {
      name: "Simran Sahu",
      role: "Frontend Developer",
    },
    {
      name: "Ratan Kumar",
      role: "Backend Engineer",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f0e0e] text-white px-6 py-16 flex flex-col items-center">
      {/* Intro */}
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 text-transparent bg-clip-text">
        About This IDE
      </h1>

      <div className="max-w-5xl text-center mb-12 text-gray-300 text-lg leading-relaxed">
        Our online code IDE is built for developers who want a fast, flexible, and collaborative environment to write and test code. Whether you're a student, professional, or hobbyist, this platform supports multi-language editing, real-time collaboration, and easy code sharing — all in the browser.
      </div>

      {/* Team Section */}
      <h2 className="text-3xl font-semibold text-center text-pink-400 mb-6">
        Meet the Team
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-5xl w-full">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-[#1f1f1f] border border-pink-500 rounded-2xl shadow-lg p-6 text-center hover:border-purple-500 transition-all"
          >
            <div className="text-xl font-bold text-white mb-2">{member.name}</div>
            <div className="text-sm text-gray-400">{member.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default About;
