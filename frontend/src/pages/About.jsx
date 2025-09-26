import React from "react";
import Navbar from "../components/Navbar";

const About = () => {
  const teamMembers = [
    { name: "Sourabh Verma", role: "Founder & Developer" },
    { name: "Simran Sahu", role: "Frontend Developer" },
    { name: "Ratan Kumar", role: "Backend Engineer" },
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

      {/* Page background */}
      <main className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800">
        {/* Decorative blobs */}
        <div className="pointer-events-none fixed -top-24 -left-24 w-[34rem] h-[34rem] rounded-full blur-3xl opacity-25 bg-indigo-600" />
        <div className="pointer-events-none fixed -bottom-24 -right-24 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-20 bg-violet-600" />

        <section className="relative mx-auto max-w-6xl px-6 sm:px-10 lg:px-12 pt-16 pb-20">
          {/* Header */}
          <h1 className="text-4xl sm:text-5xl font-bold text-center">
            <span className="bg-gradient-to-r from-indigo-300 via-cyan-300 to-violet-300 bg-clip-text text-transparent">
              About This IDE
            </span>
          </h1>

          {/* Intro */}
          <p className="mt-6 text-center text-base sm:text-lg leading-relaxed text-slate-300 max-w-4xl mx-auto">
            Our online code IDE is built for developers who want a fast, flexible, and collaborative environment to write and test code. Whether you're a student, professional, or hobbyist, this platform supports multi-language editing, real-time collaboration, and easy code sharing — all in the browser.
          </p>

          {/* Divider */}
          <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Team */}
          <h2 className="mt-10 text-2xl sm:text-3xl font-semibold text-center text-white/90">
            Meet the <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Team</span>
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((m, i) => (
              <div
                key={i}
                onMouseMove={onMove}
                className="group relative overflow-hidden rounded-2xl p-6
                           bg-white/5 backdrop-blur-xl border border-white/10
                           shadow-[0_10px_30px_-15px_rgba(0,0,0,0.7)]
                           transform-gpu transition-all duration-300
                           hover:-translate-y-0.5 hover:scale-[1.01] hover:ring-1 hover:ring-indigo-400/40"
              >
                {/* spotlight glow */}
                <span
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "radial-gradient(220px 220px at var(--mx,50%) var(--my,50%), rgba(99,102,241,0.22), transparent 60%)",
                  }}
                />
                {/* content */}
                <div className="relative z-[1]">
                  <div className="text-xl font-bold text-white">{m.name}</div>
                  <div className="mt-1 text-sm text-slate-400">{m.role}</div>

                  {/* subtle bottom gradient line */}
                  <div className="mt-5 h-px w-full bg-gradient-to-r from-indigo-500/30 via-violet-500/30 to-indigo-500/30" />
                </div>
              </div>
            ))}
          </div>

          {/* CTA / footer card (optional flair) */}
          <div className="mt-12 mx-auto max-w-3xl rounded-2xl p-6 bg-white/5 backdrop-blur-xl border border-white/10 text-center">
            <p className="text-slate-300">
              Have ideas to improve the IDE?{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent font-semibold">
                We’d love to hear from you.
              </span>
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default About;
