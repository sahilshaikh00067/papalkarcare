import React, { useState, useEffect } from "react";
import { Phone, CreditCard, ChevronDown, Menu, X } from "lucide-react";
import logop from "../assets/Images/logop.jpg";

const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/about" },  //dropdown: true
//   { label: "HOSPITAL", href: "/#hospital", dropdown: true },
  { label: "GALLERY", href: "/gallery" },
  { label: "BOOK APPOINTMENT", href: "/appointment" },
  { label: "ACADEMIC", href: "/academic" },
  { label: "CAREER", href: "/career" },
  { label: "CONTACT", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ---------- TOP BAR ---------- */}
      <div className="hidden md:flex items-center justify-between px-6 lg:px-12 py-3 border-b border-slate-100 bg-white/80 backdrop-blur-sm relative z-40">
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-14 h-14 rounded-full bg-white ring-2 ring-[#D9B65C]/60 flex items-center justify-center shadow-lg overflow-hidden transition-transform duration-500 group-hover:rotate-[360deg]">
            <img
              src={logop}
              alt="Papalkar Hospital Logo"
              className="w-11 h-11 object-contain"
            />
          </div>
          <div className="leading-tight">
            <p className="text-2xl font-extrabold text-[#0B3D66] font-serif-display">
              Papalkar <span className="text-[#D9B65C]"> Gastrocare</span>
            </p>
            <p className="text-[10px] tracking-widest text-slate-400 -mt-1">Multi Speciality Hospital</p>
            <p className="text-[11px] italic text-[#D9B65C] -mt-0.5">Care for life...</p>
          </div>
        </a>

        <div className="flex items-center gap-8 text-sm font-medium text-slate-600">
          <span className="flex items-center gap-2">
            <Phone size={16} className="text-[#0B3D66]" /> 8799992699
          </span>
          <span className="flex items-center gap-2">
            <CreditCard size={16} className="text-[#0B3D66]" /> Online Payment
          </span>
        </div>
      </div>

      {/* ---------- MAIN NAV ---------- */}
      <nav
        className={`sticky top-0 z-30 transition-all duration-500 ${
          scrolled
            ? "glass-dark shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)]"
            : "bg-gradient-to-r from-[#0B3D66] to-[#17B9A6]"
        }`}
      >
        <div className="hidden md:flex items-center justify-center gap-8 px-6 lg:px-12 py-3 text-white text-sm font-semibold tracking-wide">
          {NAV_LINKS.map((link) => (
            <div key={link.label} className="relative group">
              <a href={link.href} className="nav-link flex items-center gap-1 hover:text-[#D9B65C] transition-colors">
                {link.label}
                {link.dropdown && <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />}
              </a>
              {link.dropdown && (
                <div className="absolute left-0 top-full mt-2 w-52 bg-white text-slate-700 shadow-2xl rounded-b-md opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 py-2 text-xs font-medium">
                  <a href="#" className="block px-4 py-2 hover:bg-sky-50 hover:pl-6 transition-all">Our History</a>
                  <a href="#" className="block px-4 py-2 hover:bg-sky-50 hover:pl-6 transition-all">Vision &amp; Mission</a>
                  <a href="#" className="block px-4 py-2 hover:bg-sky-50 hover:pl-6 transition-all">Infrastructure</a>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="md:hidden flex items-center justify-between px-4 py-3">
          <a href="/" className="flex items-center gap-2 text-white font-extrabold font-serif-display">
            PAPALKAR<span className="text-[#D9B65C]">GASTROCARE</span>
          </a>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden bg-[#071B33] text-white flex flex-col px-4 pb-4 gap-1">
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href} className="py-2 border-b border-white/10 text-sm font-semibold hover:pl-2 transition-all">
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}