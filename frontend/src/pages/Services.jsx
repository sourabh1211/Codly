import React from "react";
import Navbar from "../components/Navbar";
import { FaCode, FaUsers, FaFolderOpen, FaShareAlt } from "react-icons/fa";

const Services = () => {
  const services = [
    {
      icon: <FaCode size={40} className="text-indigo-400" />,
      title: "Multi-language Code Editor",
      desc: "Write and edit code in C++, Python, Java, JavaScript, and more — directly in your browser with fast syntax highlighting and support for multiple file types.",
    },
    {
      icon: <FaUsers size={40} className="text-violet-400" />,
      title: "Real-time Collaboration",
      desc: "Collaborate seamlessly by sharing live code sessions with teammates or students. Perfect for interviews, tutoring, or pair programming.",
    },
    {
      icon: <FaFolderOpen size={40} className="text-cyan-400" />,
      title: "Project & File Management",
      desc: "Manage your projects with features like creating, deleting, and renaming files. Stay organized and productive just like in a local IDE.",
    },
    {
      icon: <FaShareAlt size={40} className="text-blue-400" />,
      title: "Code Sharing & Embedding",
      desc: "Easily copy your code, share links to snippets, or embed code blocks in blogs, websites, or documentation with one click.",
    },
  ];

  // cursor spotlight (UI-only)
  const onMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <>
      <Navbar />

      {/* SAME background + blobs as About */}
      <main className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800">
        <div className="pointer-events-none fixed -top-24 -left-24 w-[34rem] h-[34rem] rounded-full blur-3xl opacity-25 bg-indigo-600" />
        <div className="pointer-events-none fixed -bottom-24 -right-24 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-20 bg-violet-600" />

        <section className="relative mx-auto max-w-6xl px-6 sm:px-10 lg:px-12 pt-16 pb-20">
          {/* Title matches About (indigo → cyan → violet) */}
          <h1 className="text-4xl sm:text-5xl font-bold text-center">
            <span className="bg-gradient-to-r from-indigo-300 via-cyan-300 to-violet-300 bg-clip-text text-transparent">
              Our IDE Features
            </span>
          </h1>

          {/* Grid of glass cards with spotlight */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <div
                key={i}
                onMouseMove={onMove}
                className="group relative overflow-hidden rounded-2xl p-6
                           bg-white/5 backdrop-blur-xl border border-white/10
                           shadow-[0_10px_30px_-15px_rgba(0,0,0,0.7)]
                           transform-gpu transition-all duration-300
                           hover:-translate-y-0.5 hover:scale-[1.01] hover:ring-1 hover:ring-indigo-400/40"
              >
                {/* spotlight glow (same as About) */}
                <span
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "radial-gradient(220px 220px at var(--mx,50%) var(--my,50%), rgba(99,102,241,0.22), transparent 60%)",
                  }}
                />

                <div className="relative z-[1]">
                  <div className="mb-4">{s.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{s.title}</h3>
                  <p className="text-slate-300">{s.desc}</p>

                  {/* subtle divider to match the vibe */}
                  <div className="mt-5 h-px w-full bg-gradient-to-r from-indigo-500/30 via-violet-500/30 to-indigo-500/30" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Services;
