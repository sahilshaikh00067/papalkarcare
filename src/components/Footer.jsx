import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";
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
  // { label: "PRIVACY POLICY", href: "/privacypolicy" },


];

export default function Footer() {
  return (
    <>
      <footer id="contact" className="relative bg-gradient-to-br from-[#071B33] to-[#0B3D66] text-slate-200 overflow-hidden">
        <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-[#17B9A6]/10 blob pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div>
            <h3 className="text-white font-bold text-[23px] mb-4 font-serif-display">Contact Us</h3>
            <ul className="space-y-3 text-[15px]">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[#D9B65C]" />
                Papalkar Gastrocare Hospital, Pusad, Maharashtra
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-[#D9B65C]" /> 78880 04343
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-[#D9B65C]" /> info@papalkarhospital.com
              </li>
            </ul>
            <div className="flex gap-3 mt-5">
              {[FaFacebookF, FaLinkedinIn, FaInstagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-[#17B9A6] flex items-center justify-center transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-[23px] mb-4 font-serif-display">Menu Links</h3>
            <ul className="space-y-2 text-[14px]">
              {NAV_LINKS.slice(0, 6).map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="hover:text-white hover:pl-2 transition-all inline-block">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-[23px] mb-4 font-serif-display">Newsletter</h3>
            <p className="text-[15px] mb-4">Subscribe to get the latest updates and health tips from our team.</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2.5 rounded-l border border-white/20 bg-white/5 text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#17B9A6]"
              />
              <button className="btn-shimmer px-4 bg-[#D9B65C] hover:brightness-110 rounded-r transition-all font-semibold text-sm text-[#071B33]">
                Go
              </button>
            </form>
          </div>
        </div>
        <div className="relative text-center text-[14px] py-4 border-t border-white/10">
          © {new Date().getFullYear()} Papalkar Gastrocare. All rights reserved.
        </div>
      </footer >
    </>
  );
}