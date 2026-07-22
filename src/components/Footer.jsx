import React, { useState } from "react";
import { MapPin, Phone, Mail, CheckCircle2 } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/about", dropdown: true },
  { label: "HOSPITAL", href: "#hospital", dropdown: true },
  { label: "GALLERY", href: "/gallery" },
  { label: "BOOK APPOINMENT", href: "/appointment" },
  { label: "ACADEMIC", href: "/academic" },
  { label: "CAREER", href: "/career" },
  { label: "CONTACT", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "PRIVACY POLICY", href: "/privacypolicy" },
  { label: "TERMS AND CONDITION", href: "/termsandcondition" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | error | success

  const handleSubscribe = (e) => {
    e.preventDefault();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!isValid) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <>
      <footer id="contact" className="relative bg-gradient-to-br from-[#071B33] to-[#0B3D66] text-slate-200 overflow-hidden">
        <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-[#17B9A6]/10 blob pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* CONTACT */}
          <div>
            <h3 className="text-white font-bold text-[23px] mb-4 font-serif-display">Contact Us</h3>
            <ul className="space-y-3 text-[15px]">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[#D9B65C]" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Papalkar+Gastrocare+Hospital+Pusad+Maharashtra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Papalkar Gastrocare Hospital, Pusad, Maharashtra
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-[#D9B65C]" />
                <a href="tel:+917888004343" className="hover:text-white transition-colors">
                  78880 04343
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-[#D9B65C]" />
                <a href="mailto:info@papalkarhospital.com" className="hover:text-white transition-colors">
                  info@papalkarhospital.com
                </a>
              </li>
            </ul>
            <div className="flex gap-3 mt-5">
              {[
                { Icon: FaFacebookF, href: "#" },
                { Icon: FaLinkedinIn, href: "#" },
                { Icon: FaInstagram, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-[#17B9A6] flex items-center justify-center transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* MENU LINKS */}
          <div>
            <h3 className="text-white font-bold text-[23px] mb-4 font-serif-display">Menu Links</h3>
            <ul className="space-y-2 text-[14px]">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="hover:text-white hover:pl-2 transition-all inline-block">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* LEGAL LINKS */}
          <div>
            <h3 className="text-white font-bold text-[23px] mb-4 font-serif-display">Legal</h3>
            <ul className="space-y-2 text-[14px]">
              {LEGAL_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="hover:text-white hover:pl-2 transition-all inline-block">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="text-white font-bold text-[23px] mb-4 font-serif-display">Newsletter</h3>
            <p className="text-[15px] mb-4">Subscribe to get the latest updates and health tips from our team.</p>
            <form onSubmit={handleSubscribe} noValidate>
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== "idle") setStatus("idle");
                  }}
                  placeholder="Your email"
                  className={`flex-1 px-3 py-2.5 rounded-l border bg-white/5 text-white placeholder:text-slate-400 text-sm outline-none focus:ring-2 transition-shadow ${
                    status === "error"
                      ? "border-red-400 focus:ring-red-400"
                      : "border-white/20 focus:ring-[#17B9A6]"
                  }`}
                />
                <button
                  type="submit"
                  className="btn-shimmer px-4 bg-[#D9B65C] hover:brightness-110 rounded-r transition-all font-semibold text-sm text-[#071B33] shrink-0"
                >
                  Go
                </button>
              </div>
              {status === "error" && (
                <p className="text-[12px] text-red-400 mt-2">Please enter a valid email address.</p>
              )}
              {status === "success" && (
                <p className="text-[12px] text-[#17B9A6] mt-2 flex items-center gap-1.5">
                  <CheckCircle2 size={14} /> Subscribed! Thank you for joining.
                </p>
              )}
            </form>
          </div>
        </div>
        <div className="relative text-center text-[14px] py-4 border-t border-white/10">
          © {new Date().getFullYear()} Papalkar Gastrocare. All rights reserved.
        </div>
      </footer>
    </>
  );
}