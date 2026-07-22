import React, { useRef, useEffect, useState } from "react";
import {
  ShieldCheck,
  HeartPulse,
  Users,
  Award,
  Sparkles,
  Target,
  Eye,
  Quote,
  ChevronRight,
} from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";


import dr1 from "../assets/Images/dr1.jpg";
import dr2 from "../assets/Images/dr2.jpg";
import dr3 from "../assets/Images/dr3.png";
import dr4 from "../assets/Images/dr4.png";
import dr5 from "../assets/Images/dr5.jpg";
import dr6 from "../assets/Images/dr6.png";
import dr7 from "../assets/Images/dr7.png";
import { useNavigate } from "react-router-dom";


/* ============================================================
   Same design language as Home: Ink navy / Royal / Teal / Gold
   Fraunces display + Inter body + glass + reveal-on-scroll
   ============================================================ */

const STATS = [
  { icon: Users, value: "40+", label: "Specialist Doctors" },
  { icon: HeartPulse, value: "50,000+", label: "Patients Treated" },
  { icon: Award, value: "3–4", label: "Decades of Trust" },
  { icon: ShieldCheck, value: "24×7", label: "Emergency Care" },
];

const VALUES = [
  { icon: HeartPulse, title: "Compassionate Care", desc: "Every patient is treated with empathy, dignity, and undivided attention." },
  { icon: ShieldCheck, title: "Clinical Excellence", desc: "Evidence-based protocols and the latest technology guide every diagnosis." },
  { icon: Users, title: "Patient First", desc: "Transparent communication and honest guidance at every step of care." },
];

const DOCTORS = [
  { img: dr1, name: "Dr. Viren Papalkar", role: "Chief Cardiologist" },
  { img: dr2, name: "Dr. Sanjay Agrawal", role: "Senior Physician" },
  { img: dr3, name: "Dr. Satish Chiddarwar", role: "Neurologist" },
  { img: dr4, name: "Dr. Aruna Papalkar", role: "Neuro Specialist" },
  { img: dr5, name: "Dr. Lata Agrawal", role: "Gynecologist" },
  { img: dr6, name: "Dr. Rahul Jadhav", role: "General Physician" },
  { img: dr7, name: "Dr. Ankur Jain", role: "Orthopedic Surgeon" },
];


/* ----------------------------- REVEAL HOOK ----------------------------- */

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const { ref, visible } = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ----------------------------- PAGE ----------------------------- */

export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-porcelain font-sans text-slate-700 overflow-x-hidden">
      <PageStyles />

      {/* ---------- HERO ---------- */}
      <section className="relative bg-gradient-to-br from-[#071B33] via-[#0B3D66] to-[#17B9A6] text-white py-24 sm:py-28 px-4 sm:px-8 lg:px-16 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-white/5 blob" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#D9B65C]/10 blob blob-delay" />

        <div className="relative max-w-3xl mx-auto text-center">
          <p className="hero-fade text-xs font-bold tracking-[0.3em] text-[#D9B65C] mb-4 flex items-center justify-center gap-2">
            <Sparkles size={14} /> ABOUT 
Papalkar Gastrocare
          </p>
          <h1 className="hero-fade hero-fade-d1 text-4xl sm:text-6xl font-bold font-serif-display mb-4">
            Care Rooted In Trust
          </h1>
          <p className="hero-fade hero-fade-d2 text-teal-50/80 text-sm sm:text-base max-w-xl mx-auto mb-2">
            For over three decades, 
Papalkar Gastrocare Multispeciality Hospital has stood
            as a beacon of compassionate, world-class healthcare in Pusad.
          </p>
          <p className="hero-fade hero-fade-d3 text-teal-50/60 text-xs tracking-wide">
            Home <ChevronRight className="inline" size={12} /> About Us
          </p>
        </div>
      </section>

      {/* ---------- STATS ---------- */}
      <section className="relative z-10 max-w-5xl mx-auto -mt-10 sm:-mt-12 px-4 sm:px-8">
        <Reveal className="glass-card rounded-2xl shadow-2xl grid grid-cols-2 sm:grid-cols-4 divide-x divide-slate-200">
          {STATS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="flex flex-col items-center text-center gap-1 py-6 px-2">
                <Icon size={22} className="text-[#17B9A6] mb-1" />
                <p className="text-xl font-extrabold text-[#0B3D66] font-serif-display">{s.value}</p>
                <p className="text-[11px] font-semibold text-slate-500 tracking-wide">{s.label}</p>
              </div>
            );
          })}
        </Reveal>
      </section>

      {/* ---------- OUR STORY ---------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 pt-24 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal className="relative">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl lift-img">
            <img
              src={dr1}
              alt="
Papalkar Gastrocare Hospital"
              className="w-full h-[420px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071B33]/50 to-transparent" />
          </div>
          <div className="absolute -bottom-8 -right-6 sm:-right-10 glass-card rounded-2xl shadow-2xl px-7 py-6 border-t-4 border-[#D9B65C]">
            <p className="text-3xl font-extrabold text-[#0B3D66] font-serif-display">3–4</p>
            <p className="text-xs font-semibold text-slate-500 tracking-wide">Decades of Service</p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="text-xs font-bold tracking-[0.3em] text-[#D9B65C] mb-3">OUR STORY</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 font-serif-display mb-4 leading-tight">
            A Legacy Of Healing, Built On Trust
          </h2>
          <span className="draw-line-static w-16 mb-6" />
          <p className="text-sm text-slate-500 leading-relaxed mb-4">
            What began as a small clinic in Pusad has grown into a full-fledged
            multispeciality hospital, driven by one unwavering belief — that
            every patient deserves care that is prompt, personal, and precise.
          </p>
          <p className="text-sm text-slate-500 leading-relaxed mb-6">
            Today, our team of senior specialists and dedicated staff work
            around the clock across cardiology, neurology, critical care, and
            more — supported by modern diagnostics and a patient-first culture
            that has earned the trust of thousands of families.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                <Target size={18} className="text-[#17B9A6]" />
              </div>
              <div>
                <p className="font-bold text-slate-800 text-sm font-serif-display">Our Mission</p>
                <p className="text-xs text-slate-500 mt-1">Accessible, transparent, community-centric care for every patient.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                <Eye size={18} className="text-[#17B9A6]" />
              </div>
              <div>
                <p className="font-bold text-slate-800 text-sm font-serif-display">Our Vision</p>
                <p className="text-xs text-slate-500 mt-1">To be the region's most trusted name in specialist healthcare.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------- VALUES ---------- */}
      <section className="bg-gradient-to-b from-white via-[#F7F9FB] to-white py-20 px-4 sm:px-8 lg:px-16">
        <Reveal className="text-center mb-14 max-w-2xl mx-auto">
          <p className="text-xs font-bold tracking-[0.3em] text-[#D9B65C] mb-2">WHAT DRIVES US</p>
          <h2 className="text-3xl font-bold text-slate-800 font-serif-display">Our Core Values</h2>
          <span className="draw-line-static w-14 mx-auto mt-3" />
        </Reveal>

        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-6">
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <Reveal key={v.title} delay={i * 100} className="value-card group rounded-2xl bg-white border border-slate-100 shadow-lg p-7 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-[#0B3D66] to-[#17B9A6] flex items-center justify-center mb-4 transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="font-bold text-slate-800 font-serif-display text-base mb-2">{v.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ---------- DOCTORS TEAM ---------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 py-20">
        <Reveal className="text-center mb-14 max-w-2xl mx-auto">
          <p className="text-xs font-bold tracking-[0.3em] text-[#D9B65C] mb-2">MEET OUR EXPERTS</p>
          <h2 className="text-3xl font-bold text-slate-800 font-serif-display">Our Specialist Doctors</h2>
          <span className="draw-line-static w-14 mx-auto mt-3" />
          <p className="text-sm text-slate-500 mt-4">
            Senior, experienced consultants dedicated to your health and wellbeing.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {DOCTORS.map((doc, i) => (
            <Reveal key={doc.name} delay={(i % 4) * 90} className="doctor-card group relative rounded-2xl overflow-hidden shadow-lg bg-white">
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <img
                  src={doc.img}
                  alt={doc.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071B33]/80 via-[#071B33]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                  <a href="#" className="w-8 h-8 rounded-full bg-white/15 backdrop-blur flex items-center justify-center text-white hover:bg-[#17B9A6] transition-colors">
                    <FaLinkedinIn size={14} />
                  </a>
                </div>
              </div>
              <div className="p-4 text-center">
                <h3 className="font-bold text-slate-800 font-serif-display text-sm sm:text-base">{doc.name}</h3>
                <p className="text-xs text-[#17B9A6] font-semibold mt-1">{doc.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- QUOTE / CTA ---------- */}
      <Reveal className="relative mx-4 sm:mx-8 lg:mx-16 mb-20 rounded-2xl overflow-hidden bg-gradient-to-br from-[#071B33] via-[#0B3D66] to-[#17B9A6] text-white px-6 sm:px-14 py-14 text-center">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5 blob" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-[#D9B65C]/10 blob blob-delay" />
        <Quote className="relative mx-auto text-[#D9B65C]/40 mb-4" size={40} strokeWidth={1.5} />
        <h2 className="relative text-xl sm:text-2xl font-semibold font-serif-display max-w-2xl mx-auto mb-7 leading-relaxed">
          "Our commitment has never wavered — every patient who walks through
          our doors deserves the same care we'd want for our own family."
        </h2>
        <button 
                  onClick={() => navigate("/contact")}
         className="btn-shimmer relative px-8 py-3.5 bg-[#D9B65C] hover:brightness-110 transition-all text-xs font-bold tracking-wide text-[#071B33] rounded-lg inline-flex items-center gap-2">
          BOOK AN APPOINTMENT <ChevronRight size={16} />
        </button>
      </Reveal>
    </div>
  );
}

/* ----------------------------- SCOPED PREMIUM STYLES ----------------------------- */

function PageStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500&family=Inter:wght@400;500;600;700;800&display=swap');

      :root {
        --ink: #071B33;
        --royal: #0B3D66;
        --teal: #17B9A6;
        --gold: #D9B65C;
        --porcelain: #F7F9FB;
      }

      .bg-porcelain { background-color: var(--porcelain); }
      .font-serif-display { font-family: 'Fraunces', serif; }
      * { font-family: 'Inter', sans-serif; }
      .font-serif-display, h1, h2, h3 { font-family: 'Fraunces', serif; }

      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
      }

      @keyframes heroFadeUp {
        from { opacity: 0; transform: translateY(22px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .hero-fade { animation: heroFadeUp 800ms cubic-bezier(.22,1,.36,1) both; }
      .hero-fade-d1 { animation-delay: 120ms; }
      .hero-fade-d2 { animation-delay: 240ms; }
      .hero-fade-d3 { animation-delay: 360ms; }

      .reveal {
        opacity: 0;
        transform: translateY(28px);
        transition: opacity 700ms cubic-bezier(.22,1,.36,1), transform 700ms cubic-bezier(.22,1,.36,1);
        will-change: transform, opacity;
      }
      .reveal-visible { opacity: 1; transform: translateY(0); }

      .draw-line-static {
        display: block;
        height: 2px;
        background: linear-gradient(90deg, var(--gold), var(--teal));
      }

      .glass-card {
        background: rgba(255,255,255,0.9);
        backdrop-filter: blur(14px) saturate(160%);
        -webkit-backdrop-filter: blur(14px) saturate(160%);
      }

      .btn-shimmer { position: relative; overflow: hidden; isolation: isolate; }
      .btn-shimmer::after {
        content: "";
        position: absolute; inset: 0;
        background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%);
        transform: translateX(-120%);
        transition: transform 700ms ease;
        z-index: 1;
      }
      .btn-shimmer:hover::after { transform: translateX(120%); }
      .btn-shimmer > * { position: relative; z-index: 2; }

      @keyframes floatBlob {
        0%, 100% { transform: translate(0,0) scale(1); }
        33% { transform: translate(24px,-18px) scale(1.06); }
        66% { transform: translate(-18px,14px) scale(0.96); }
      }
      .blob { animation: floatBlob 14s ease-in-out infinite; filter: blur(60px); }
      .blob-delay { animation-delay: -6s; }

      .lift-img { transition: transform 500ms cubic-bezier(.22,1,.36,1); }
      .lift-img:hover { transform: translateY(-6px); }

      .value-card { transition: transform 400ms cubic-bezier(.22,1,.36,1), box-shadow 400ms cubic-bezier(.22,1,.36,1); }
      .value-card:hover { transform: translateY(-8px); box-shadow: 0 30px 60px -20px rgba(7,27,51,0.25); }

      .doctor-card { transition: transform 400ms cubic-bezier(.22,1,.36,1), box-shadow 400ms cubic-bezier(.22,1,.36,1); }
      .doctor-card:hover { transform: translateY(-6px); box-shadow: 0 25px 50px -20px rgba(7,27,51,0.3); }
    `}</style>
  );
}