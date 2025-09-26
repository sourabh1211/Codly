import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { FaLinkedin, FaInstagram, FaSnapchat, FaEnvelope, FaCheck, FaCopy, FaPaperPlane } from "react-icons/fa";

const Contact = () => {
  const contactItems = [
    { icon: <FaLinkedin size={60} />, label: "LinkedIn",  link: "https://www.linkedin.com/in/sourabh1112/", hoverColor: "hover:text-blue-500",  hoverBg: "hover:shadow-blue-500/50" },
    { icon: <FaInstagram size={60} />, label: "Instagram", link: "https://www.instagram.com/sourabh_vr",    hoverColor: "hover:text-pink-500",  hoverBg: "hover:shadow-pink-500/50" },
    { icon: <FaSnapchat size={60} />, label: "Snapchat",  link: "https://www.snapchat.com/add/sourabh_8482", hoverColor: "hover:text-yellow-400", hoverBg: "hover:shadow-yellow-400/40" },
    { icon: <FaEnvelope size={60} />, label: "Email",     link: "mailto:sourabhvr8482@gmail.com",            hoverColor: "hover:text-green-400", hoverBg: "hover:shadow-green-400/40" },
  ];

  const [copied, setCopied] = useState(false);
  const emailAddress = "sourabhvr8482@gmail.com";

  const onMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (_) {
      // fallback if clipboard blocked
      window.prompt("Copy this email", emailAddress);
    }
  };

  return (
    <>
      <Navbar />

      {/* Same slate gradient + blobs */}
      <main className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800">
        <div className="pointer-events-none fixed -top-24 -left-24 w-[34rem] h-[34rem] rounded-full blur-3xl opacity-25 bg-indigo-600" />
        <div className="pointer-events-none fixed -bottom-24 -right-24 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-20 bg-violet-600" />

        <section className="relative mx-auto max-w-6xl px-6 sm:px-10 lg:px-12 pt-16 pb-20">
          {/* Header */}
          <h1 className="text-4xl sm:text-5xl font-bold text-center">
            <span className="bg-gradient-to-r from-indigo-300 via-cyan-300 to-violet-300 bg-clip-text text-transparent">
              Contact
            </span>
          </h1>
          <p className="text-center text-slate-300 mt-4">
            Connect with me on your favorite platform—or reach out directly.
          </p>

          {/* 2×2 social grid (glass + spotlight) */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {contactItems.map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={onMove}
                className={`group relative overflow-hidden rounded-2xl p-6 text-center
                            bg-white/5 backdrop-blur-xl border border-white/10
                            shadow-[0_10px_30px_-15px_rgba(0,0,0,0.7)]
                            transform-gpu transition-all duration-300
                            hover:-translate-y-0.5 hover:scale-[1.01] hover:ring-1 hover:ring-indigo-400/40
                            ${item.hoverBg} ${item.hoverColor}`}
              >
                <span
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "radial-gradient(220px 220px at var(--mx,50%) var(--my,50%), rgba(99,102,241,0.22), transparent 60%)",
                  }}
                />
                <div className="relative z-[1] flex flex-col items-center gap-4">
                  <div className="transition-all duration-300">{item.icon}</div>
                  <h2 className="text-xl font-semibold">{item.label}</h2>
                </div>
              </a>
            ))}
          </div>

          {/* 🔥 Attractive CTA + Quick info (replaces the form) */}
          <div className="mt-12 space-y-6">
            {/* Gradient CTA Banner */}
            <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8
                            bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600
                            shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
              <div className="absolute -inset-1 opacity-30 blur-3xl pointer-events-none
                              bg-[radial-gradient(60%_60%_at_30%_50%,rgba(255,255,255,0.35),transparent)]" />
              <div className="relative z-[1] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">Let’s Build Something Cool</h3>
                  <p className="mt-1 text-violet-100/90">
                    Open to collaborations, freelance work, and interesting projects.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={`mailto:${emailAddress}`}
                    className="inline-flex items-center gap-2 h-11 px-4 rounded-xl bg-white/10 text-white border border-white/20
                               hover:bg-white/15 hover:border-white/30 transition"
                  >
                    <FaPaperPlane className="text-white" />
                    Email me
                  </a>
                  <button
                    onClick={copyEmail}
                    className="inline-flex items-center gap-2 h-11 px-4 rounded-xl bg-white text-slate-900 font-semibold
                               hover:opacity-90 transition"
                  >
                    {copied ? <FaCheck /> : <FaCopy />}
                    {copied ? "Copied!" : "Copy email"}
                  </button>
                </div>
              </div>
            </div>

            {/* Glass Stats / Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl p-5 bg-white/5 backdrop-blur-xl border border-white/10 text-center">
                <div className="text-sm text-slate-400">Typical response</div>
                <div className="mt-1 text-xl font-semibold text-white">Under 24 hrs</div>
              </div>
              <div className="rounded-2xl p-5 bg-white/5 backdrop-blur-xl border border-white/10 text-center">
                <div className="text-sm text-slate-400">Timezone</div>
                <div className="mt-1 text-xl font-semibold text-white">IST (UTC+5:30)</div>
              </div>
              <div className="rounded-2xl p-5 bg-white/5 backdrop-blur-xl border border-white/10 text-center">
                <div className="text-sm text-slate-400">Availability</div>
                <div className="mt-1 text-xl font-semibold text-white">Mon–Sat</div>
              </div>
            </div>

            {/* FAQ-style quick info (no JS, just details/summary) */}
            <div className="rounded-2xl p-6 bg-white/5 backdrop-blur-xl border border-white/10">
              <details className="group">
                <summary className="cursor-pointer list-none flex items-center justify-between">
                  <span className="text-white font-semibold">What’s the best way to reach you?</span>
                  <span className="text-slate-300 group-open:rotate-180 transition">⌄</span>
                </summary>
                <p className="mt-3 text-slate-300">
                  Email is the fastest. I also check LinkedIn DMs regularly.
                </p>
              </details>
              <div className="my-4 h-px w-full bg-white/10" />
              <details className="group">
                <summary className="cursor-pointer list-none flex items-center justify-between">
                  <span className="text-white font-semibold">Open to collaboration?</span>
                  <span className="text-slate-300 group-open:rotate-180 transition">⌄</span>
                </summary>
                <p className="mt-3 text-slate-300">
                  Absolutely—especially web apps, UI polish with Tailwind, or tooling/IDE projects.
                </p>
              </details>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Contact;
