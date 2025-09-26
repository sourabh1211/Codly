import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { FaLinkedin, FaInstagram, FaSnapchat, FaEnvelope } from "react-icons/fa";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const Contact = () => {
  const contactItems = [
    { icon: <FaLinkedin size={60} />, label: "LinkedIn",  link: "https://www.linkedin.com/in/sourabh1112/", hoverColor: "hover:text-blue-500",  hoverBg: "hover:shadow-blue-500/50" },
    { icon: <FaInstagram size={60} />, label: "Instagram", link: "https://www.instagram.com/sourabh_vr",    hoverColor: "hover:text-pink-500",  hoverBg: "hover:shadow-pink-500/50" },
    { icon: <FaSnapchat size={60} />, label: "Snapchat",  link: "https://www.snapchat.com/add/sourabh_8482", hoverColor: "hover:text-yellow-400", hoverBg: "hover:shadow-yellow-400/40" },
    { icon: <FaEnvelope size={60} />, label: "Email",     link: "mailto:sourabhvr8482@gmail.com",            hoverColor: "hover:text-green-400", hoverBg: "hover:shadow-green-400/40" },
  ];

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = form;
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill all fields");
      return;
    }
    setSending(true);
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { from_name: name, reply_to: email, message },
        PUBLIC_KEY
      );
      toast.success("Message sent! I’ll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to send. Please try again.");
    } finally {
      setSending(false);
    }
  };

  // hover spotlight for cards
  const onMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <>
      <Navbar />

      {/* Same slate gradient + blobs as other pages */}
      <main className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800">
        <div className="pointer-events-none fixed -top-24 -left-24 w-[34rem] h-[34rem] rounded-full blur-3xl opacity-25 bg-indigo-600" />
        <div className="pointer-events-none fixed -bottom-24 -right-24 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-20 bg-violet-600" />

        <section className="relative mx-auto max-w-6xl px-6 sm:px-10 lg:px-12 pt-16 pb-20">
          <h1 className="text-4xl sm:text-5xl font-bold text-center">
            <span className="bg-gradient-to-r from-indigo-300 via-cyan-300 to-violet-300 bg-clip-text text-transparent">
              Contact
            </span>
          </h1>
          <p className="text-center text-slate-300 mt-4">
            Feel free to connect with me on any platform or drop a message below.
          </p>

          {/* 2×2 social grid */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {contactItems.map((item, index) => (
              <a
                key={index}
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

          {/* Glass message form */}
          <div className="mt-12 bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)] max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-center">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Send me a message
              </span>
            </h2>

            <form onSubmit={onSubmit} className="mt-6 grid gap-4">
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                type="text"
                placeholder="Your Name"
                className="h-12 px-4 rounded-xl bg-slate-900/70 text-white placeholder-slate-400
                           border border-white/10 outline-none
                           focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20 transition-all"
              />
              <input
                name="email"
                value={form.email}
                onChange={onChange}
                type="email"
                placeholder="Your Email"
                className="h-12 px-4 rounded-xl bg-slate-900/70 text-white placeholder-slate-400
                           border border-white/10 outline-none
                           focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20 transition-all"
              />
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                rows={5}
                placeholder="Your Message"
                className="p-4 rounded-xl bg-slate-900/70 text-white placeholder-slate-400
                           border border-white/10 outline-none resize-none
                           focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20 transition-all"
              />
              <button
                type="submit"
                disabled={sending}
                className="h-12 rounded-xl font-semibold text-white
                           bg-gradient-to-r from-indigo-600 to-violet-600
                           shadow-lg shadow-indigo-900/30
                           transform-gpu transition-all duration-300
                           hover:shadow-xl hover:shadow-indigo-900/40
                           active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default Contact;
