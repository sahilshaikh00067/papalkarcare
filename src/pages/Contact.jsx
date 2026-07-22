import React, { useState } from "react";
import { MapPin, Phone, Mail, Plus, Minus, Send, ShieldCheck, MessageCircle } from "lucide-react";

/* ============================================================
   CONTACT PAGE — same layout, premium styling
   Palette: Ink navy #071B33 · Royal #0B3D66 · Teal #17B9A6 · Gold #D9B65C
   Fraunces (headings) + Inter (body)
   Left: Get In Touch form   Right: Contact Information accordion
   Below: Map + CTA strip
   ============================================================ */

/* ----------------------------- WHATSAPP CONFIG ----------------------------- */

/** All "Get In Touch" messages are sent to this WhatsApp number */
const WHATSAPP_NUMBER = "918381845350";

/** Builds a formatted WhatsApp message from the contact form and opens WhatsApp with it pre-filled */
function sendContactToWhatsApp(form) {
  const lines = [
    "*New Contact Message*",
    "",
    `*Name:* ${form.name || "-"}`,
    `*Phone:* ${form.phone || "-"}`,
    `*Email:* ${form.email || "-"}`,
  ];
  if (form.message) lines.push(`*Message:* ${form.message}`);

  const text = encodeURIComponent(lines.join("\n"));
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

const ACCORDION_DATA = [
  {
    title: "Medical Hospital",
    content: (
      <div className="space-y-2.5 text-sm text-slate-600">
        <p className="flex items-start gap-2.5">
          <MapPin size={15} className="mt-0.5 text-[#17B9A6] shrink-0" />
          Papalkar Campus, Near Vijay Talkies, Nagpur Road, PUSAD
        </p>
        <p className="flex items-center gap-2.5">
          <Phone size={15} className="text-[#17B9A6] shrink-0" />
          Emergency: <a href="tel:7888004343" className="text-[#0B3D66] font-semibold hover:text-[#17B9A6] transition-colors">788-800-43-43</a>
        </p>
        <p className="flex items-center gap-2.5">
          <Mail size={15} className="text-[#17B9A6] shrink-0" />
          E-mail: <a href="mailto:papalkar@gmail.com" className="text-[#0B3D66] font-semibold hover:text-[#17B9A6] transition-colors">papalkar@gmail.com</a>
        </p>
      </div>
    ),
  },
  {
    title: "Hospital Contact",
    content: (
      <div className="space-y-2.5 text-sm text-slate-600">
        <p className="flex items-center gap-2.5"><Phone size={15} className="text-[#17B9A6]" /> Call us: 0733-246469</p>
        <p className="flex items-center gap-2.5"><Phone size={15} className="text-[#17B9A6]" /> Call us: 0733-246775</p>
        <p className="flex items-center gap-2.5"><Phone size={15} className="text-[#17B9A6]" /> Call us: 0733-248824</p>
        <p className="flex items-center gap-2.5"><Phone size={15} className="text-[#17B9A6]" /> Call us: 7888004344</p>
        <p className="flex items-center gap-2.5"><Phone size={15} className="text-[#17B9A6]" /> Call us: 7888004345</p>
      </div>
    ),
  },
  {
    title: "Blood Bank Contact",
    content: (
      <div className="space-y-2.5 text-sm text-slate-600">
        <p className="flex items-center gap-2.5"><Phone size={15} className="text-[#17B9A6]" /> Call us: 07233-246535</p>
        <p className="flex items-center gap-2.5"><Phone size={15} className="text-[#17B9A6]" /> Call us: 788-800-43-41</p>
      </div>
    ),
  },
  {
    title: "Ambulance Contact",
    content: (
      <div className="space-y-2.5 text-sm text-slate-600">
        <p className="flex items-center gap-2.5"><Phone size={15} className="text-[#17B9A6]" /> Call us: 7888004342</p>
      </div>
    ),
  },
  {
    title: "Emergency",
    content: (
      <div className="space-y-2.5 text-sm text-slate-600">
        <p className="flex items-center gap-2.5"><Phone size={15} className="text-[#17B9A6]" /> Call us: 7888004343</p>
      </div>
    ),
  },
  {
    title: "Papalkar Medishop",
    content: (
      <div className="space-y-2.5 text-sm text-slate-600">
        <p className="flex items-center gap-2.5"><Phone size={15} className="text-[#17B9A6]" /> Call us: 7888004345</p>
      </div>
    ),
  },
  {
    title: "Academic Contact",
    content: (
      <div className="space-y-2.5 text-sm text-slate-600">
        <p className="flex items-center gap-2.5"><Phone size={15} className="text-[#17B9A6]" /> Call us: 9011972665</p>
      </div>
    ),
  },
];

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div className="mb-3 group">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-5 py-3.5 rounded-lg text-sm font-bold tracking-wide text-white transition-all duration-300 shadow-sm ${
          isOpen
            ? "bg-gradient-to-r from-[#17B9A6] to-[#0B3D66] shadow-md shadow-teal-900/10"
            : "bg-gradient-to-r from-[#0B3D66] to-[#0a2f4f] hover:brightness-110 hover:shadow-md"
        }`}
      >
        {item.title}
        <span
          className={`w-6 h-6 rounded-full flex items-center justify-center border transition-transform duration-300 ${
            isOpen ? "border-white/40 rotate-180" : "border-white/25"
          }`}
        >
          {isOpen ? <Minus size={13} /> : <Plus size={13} />}
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? "240px" : "0px" }}
      >
        <div className="bg-white border border-t-0 border-slate-100 rounded-b-lg px-5 py-4 shadow-sm">
          {item.content}
        </div>
      </div>
    </div>
  );
}

function ContactInfoAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div>
      <p className="text-xs font-bold tracking-[0.25em] text-[#D9B65C] mb-1.5">REACH THE RIGHT TEAM</p>
      <h3 className="text-2xl font-bold text-[#0B3D66] mb-2 font-serif-display">Contact Information</h3>
      <span className="block w-14 h-[3px] rounded-full bg-gradient-to-r from-[#D9B65C] to-[#17B9A6] mb-6" />
      {ACCORDION_DATA.map((item, i) => (
        <AccordionItem
          key={item.title}
          item={item}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
        />
      ))}
    </div>
  );
}

function GetInTouchForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    captcha: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.captcha.trim() !== "8") {
      alert("Please answer the security question correctly.");
      return;
    }

    // Send the message straight to WhatsApp
    sendContactToWhatsApp(form);

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", phone: "", email: "", message: "", captcha: "" });
    }, 1800);
  };

  return (
    <div className="relative bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/60 overflow-hidden">
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#17B9A6]/5 blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D9B65C] via-[#17B9A6] to-[#0B3D66]" />

      <p className="relative text-xs font-bold tracking-[0.25em] text-[#17B9A6] mb-1.5">SEND A MESSAGE</p>
      <h3 className="relative text-2xl font-bold text-[#0B3D66] mb-2 font-serif-display">Get In Touch</h3>
      <span className="relative block w-14 h-[3px] rounded-full bg-gradient-to-r from-[#D9B65C] to-[#17B9A6] mb-6" />

      {submitted ? (
        <div className="relative flex flex-col items-center justify-center py-14 text-center">
          <div className="w-16 h-16 rounded-full bg-teal-50 text-[#17B9A6] flex items-center justify-center mb-4 shadow-inner">
            <MessageCircle size={24} />
          </div>
          <h4 className="text-lg font-bold text-[#0B3D66] mb-1 font-serif-display">Sent to WhatsApp!</h4>
          <p className="text-sm text-slate-500">We'll get back to you shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="relative space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border border-slate-200 rounded-lg px-4 py-2.75 text-sm bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17B9A6]/50 focus:border-[#17B9A6] transition-all"
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full border border-slate-200 rounded-lg px-4 py-2.75 text-sm bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17B9A6]/50 focus:border-[#17B9A6] transition-all"
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border border-slate-200 rounded-lg px-4 py-2.75 text-sm bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17B9A6]/50 focus:border-[#17B9A6] transition-all"
            />
          </div>

          <textarea
            name="message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            placeholder="Note"
            className="w-full border border-slate-200 rounded-lg px-4 py-2.75 text-sm bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17B9A6]/50 focus:border-[#17B9A6] transition-all resize-none"
          />

          <div>
            <label className="text-xs font-semibold text-slate-500 tracking-wide block mb-1.5">
              Which is bigger, 2 or 8?
            </label>
            <input
              name="captcha"
              value={form.captcha}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-4 py-2.75 text-sm bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#17B9A6]/50 focus:border-[#17B9A6] transition-all"
            />
          </div>

          <button
            type="submit"
            className="group relative overflow-hidden inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-[#0B3D66] to-[#17B9A6] text-white text-sm font-bold tracking-wide shadow-lg shadow-teal-900/15 hover:shadow-teal-900/30 hover:brightness-105 active:scale-[0.98] transition-all"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            <Send size={15} className="relative" /> <span className="relative">SUBMIT</span>
          </button>
        </form>
      )}
    </div>
  );
}

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#FAFBFC] font-sans text-slate-700">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .font-serif-display { font-family: 'Fraunces', serif; }
        .py-2\\.75 { padding-top: 0.6875rem; padding-bottom: 0.6875rem; }
      `}</style>

      {/* eyebrow strip */}
      <section className="bg-gradient-to-r from-[#071B33] via-[#0B3D66] to-[#0d4d78] py-3 text-center">
        <p className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] text-teal-50/90 flex items-center justify-center gap-2">
          <ShieldCheck size={13} className="text-[#D9B65C]" /> ALWAYS HERE TO HELP — 24×7 EMERGENCY CARE
        </p>
      </section>

      {/* form + accordion */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid lg:grid-cols-2 gap-8">
        <GetInTouchForm />
        <ContactInfoAccordion />
      </section>

      {/* map */}
      <section className="w-full h-[380px] relative shadow-inner">
        <iframe
          title="Hospital Location"
          src="https://www.google.com/maps?q=
Papalkar Gastrocare+Multispeciality+Hospital+Pusad&output=embed"
          className="w-full h-full border-0 grayscale-[10%] contrast-[1.03]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      {/* CTA strip */}
      <section className="relative bg-gradient-to-br from-[#071B33] via-[#0B3D66] to-[#0d4d78] py-16 text-center px-4 mt-10 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[#17B9A6]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-[#D9B65C]/10 blur-3xl pointer-events-none" />

        <p className="relative text-xs font-bold tracking-[0.3em] text-[#D9B65C] mb-3">TRUSTED CARE, EVERY TIME</p>
        <h2 className="relative text-2xl sm:text-3xl font-bold text-white max-w-3xl mx-auto leading-snug font-serif-display">
          We Provide the highest level of satisfaction care &amp; services to our patients.
        </h2>
        <a
          href="tel:+917888004343"
          className="relative mt-6 inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#D9B65C] text-[#071B33] font-bold text-sm sm:text-base tracking-wide hover:brightness-110 hover:-translate-y-0.5 shadow-lg shadow-black/20 transition-all"
        >
          <Phone size={18} /> +91-7888004343, 7888007347, 7888004342, 7888004341
        </a>
      </section>
    </div>
  );
}