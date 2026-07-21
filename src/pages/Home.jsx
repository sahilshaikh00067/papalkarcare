import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Phone,
  CreditCard,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Mail,
  Building2,
  Stethoscope,
  Clock,
  Menu,
  X,
  User,
  Calendar,
  Send,
  Quote,
  Star,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import hospital1 from "../assets/Images/hospital1.jpg";
import bgservice from "../assets/Images/bgservice.png";
import mri from "../assets/Images/mri.png";
import eeg from "../assets/Images/eeg.jpg";
import emg from "../assets/Images/emg.png";
import dexascan from "../assets/Images/dexascan.jpg";
import bera from "../assets/Images/bera.jpg";
import bloodbank from "../assets/Images/bloodbank.png";
import ambulance from "../assets/Images/ambulance.png";
import ctscan from "../assets/Images/ctscan.jpg";
import pathology from "../assets/Images/pathology.jpg";
import icu from "../assets/Images/icu.png";
import physiotherapy from "../assets/Images/physiotherapy.png";
import ref from "../assets/Images/ref.jpg";
import logop from "../assets/Images/logop.jpg";


/* ============================================================
   DESIGN TOKENS
   Palette   : Ink navy #071B33, Royal #0B3D66, Signal teal #17B9A6,
               Champagne gold #D9B65C, Porcelain #F7F9FB
   Display   : "Fraunces" (serif, premium editorial) — headings
   Body      : "Inter" — copy
   Signature : glass "tilt" cards that lift toward the cursor +
               a gold hairline that "draws itself" on scroll
   ============================================================ */

/* ----------------------------- DATA ----------------------------- */

const NAV_LINKS = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT US", href: "/about", dropdown: true },
  { label: "HOSPITAL", href: "#hospital", dropdown: true },
  { label: "GALLERY", href: "#gallery" },
  { label: "BOOK APPOINMENT", href: "#appointment" },
  { label: "ACADEMIC", href: "#academic" },
  { label: "CAREER", href: "#career" },
  { label: "CONTACT", href: "/contact" },
];

const HERO_SLIDES = [
  {
    title: "Heart Institute",
    text: "Some clinical cardiologists specialize in adult cardiology, which means they diagnose and treat heart problems in Adults.",
    img: hospital1,
  },
  {
    title: "Neuro Sciences",
    text: "Our neuro department offers advanced diagnostics and surgical care for disorders of the brain, spine and nervous system.",
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1900&auto=format&fit=crop",
  },
  {
    title: "Critical & Emergency Care",
    text: "24x7 fully equipped emergency and critical care unit staffed with experienced doctors and nurses.",
    img: "https://images.unsplash.com/photo-1587351021355-a479a299d2f9?q=80&w=1900&auto=format&fit=crop",
  },
];

const OPD_HOURS = [
  { day: "Mon", time: "08:00 am - 12:00 pm" },
  { day: "Tue", time: "01:00 am - 05:00 pm" },
  { day: "Wed", time: "01:00 am - 05:00 pm" },
  { day: "Thu-Sat", time: "08:00 am - 12:00 pm" },
  { day: "Sun", time: "Free day" },
];

const DOCTORS = [
  "Dr. Viren Papalkar",
  "Dr. Sanjay Agrawal",
  "Dr. Satish Chiddarwar",
  "Dr. Aruna Papalkar",
  "Dr. Lata Agrawal",
  "Dr. Rahul Jadhav",
  "Dr. Sachin Thorkar",
  "Dr. Ankur Jain",
  "Dr. Ankita Jain",
  "Dr. Sheshrao Pawar",
  "Dr. Sujeet Chilkar",
  "Dr. Anand Komawar",
  "Dr. Lalit Jadhav",
  "Dr. Veena Jadhav",
];

const NOTICES = [
  { date: "16", month: "MAY,23", text: "Mahatma Jyotirao Phule Jan Arogya Yojana available" },
  { date: "24", month: "JAN,22", text: "Now daily Angiography and Angioplasty Emergency available 24 hours a day", sub: "MORNING 10 am TO 06pm" },
  { date: "01", month: "JAN,70", text: "Dr. Aditya Atal Neurosurgeon Akola visits on the third Sunday of every month" },
  { date: "16", month: "MAY,23", text: "Mahatma Jyotirao Phule Jan Arogya Yojana available" },
];

const SERVICES = [
  { title: "MRI", icon: mri, desc: "The MRI at Medicare Multispeciality Hospital is the pusad 3T Wide-Bore system from Philips, one of the most advance MRI machines available." },
  { title: "EEG", icon: eeg, desc: "An electroencephalogram (EEG) is a test used to find problems related to electrical activity of the brain." },
  { title: "EMG", icon: emg, desc: "Electromyography (EMG) is a diagnostic procedure to assess the health of muscles and the nerve cells that control them (motor neurons)." },
  { title: "DEXA SCAN", icon: dexascan, desc: "Testing your bone density -- how strong your bones are -- is the only way to know for sure if you have osteoporosis." },
  { title: "BERA", icon: bera, desc: "The brainstem evoked response audiometry (BERA) is an objective neurophysiological method for the evaluation of the hearing threshold and diagnosing." },
  { title: "Component Blood Bank", icon: bloodbank, desc: "The whole blood which is a mixture of cells, colloids and crystalloids can be separated into different blood components namely RBC, platelets and plasma." },
  { title: "Advance Cardiac Ambulance", icon: ambulance, desc: "Advanced Cardiac Life Support Ambulance (ACLS) are the enhanced version of regular ambulances offering extensive emergency services." },
  { title: "CT Scan", icon: ctscan, desc: "Computed Tomography (CT) scan combines multiple X-ray images to create cross-sectional views of bones, blood vessels and soft tissues." },
  { title: "Pathology Lab", icon: pathology, desc: "Our fully automated pathology lab offers accurate and fast diagnostic testing for blood, urine and other clinical samples." },
  { title: "ICU & Critical Care", icon: icu, desc: "24x7 fully equipped Intensive Care Unit with ventilator support, continuous monitoring and a dedicated critical care team." },
  { title: "Physiotherapy", icon: physiotherapy, desc: "Comprehensive physiotherapy and rehabilitation services to help patients recover mobility and strength after injury or surgery." },
  { title: "Dialysis Center", icon: ctscan, desc: "State-of-the-art dialysis unit providing safe and comfortable renal replacement therapy for patients with kidney disease." },
  { title: "Modular Operation Theatre", icon: bera, desc: "Advanced modular OT with laminar air flow and modern surgical equipment ensuring maximum safety during procedures." },
  { title: "24x7 Pharmacy", icon: eeg, desc: "In-house pharmacy stocked with a wide range of medicines and health products, available round the clock for patients." },
];

const STATS = [
  { icon: Building2, value: "24×7", label: "Emergency Department" },
  { icon: Stethoscope, value: "40+", label: "Qualified Doctors" },
  { icon: Clock, value: "365", label: "Days Round-the-clock Care" },
  { icon: ShieldCheck, value: "3–4", label: "Decades of Trusted Service" },
];

/* Premium testimonials — no photos, initials + rating + department tag */
const TESTIMONIALS = [
  {
    name: "Ashwini Deshmukh",
    dept: "Cardiac Care",
    rating: 5,
    quote:
      "From admission to discharge, everything felt calm and controlled. The cardiac team explained every step to my father and the ICU staff checked on us constantly. It's the kind of care you hope for and rarely find.",
    tag: "Angioplasty Patient",
  },
  {
    name: "Sunil Rathi",
    dept: "Neuro Sciences",
    rating: 5,
    quote:
      "The neurology consult was thorough — no rushed five-minute appointments here. Dr. Papalkar reviewed my MRI in detail and mapped out a plan I actually understood before we left the room.",
    tag: "Neurology Consultation",
  },
  {
    name: "Kavita Joshi",
    dept: "Maternity & Gynaecology",
    rating: 5,
    quote:
      "Delivered both my children at Medicare. The nursing staff on the maternity floor treat you like family, and the NICU team's attentiveness gave us real peace of mind during a stressful week.",
    tag: "Maternity Ward",
  },
  {
    name: "Prakash Ingle",
    dept: "Emergency & Trauma",
    rating: 5,
    quote:
      "Brought in after an accident at 2am and the trauma team was ready before we even arrived. Fast, precise, and never once did it feel like we were a number on a chart.",
    tag: "Emergency Admission",
  },
];

/* ----------------------------- HOOKS ----------------------------- */

/** Detects a fine pointer (mouse) so tilt/hover-heavy effects stay off touch devices */
function useHasHoverPointer() {
  const [hasHover, setHasHover] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setHasHover(mq.matches);
    const listener = (e) => setHasHover(e.matches);
    mq.addEventListener?.("change", listener);
    return () => mq.removeEventListener?.("change", listener);
  }, []);
  return hasHover;
}

/** 3D tilt-toward-cursor effect, returns ref + style + handlers */
function useTilt({ max = 10, scale = 1.03, glare = true } = {}) {
  const ref = useRef(null);
  const hasHover = useHasHoverPointer();
  const [style, setStyle] = useState({});
  const [glareStyle, setGlareStyle] = useState({});

  const onMouseMove = useCallback(
    (e) => {
      if (!hasHover || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * max * 2;
      const rotateX = (0.5 - py) * max * 2;
      setStyle({
        transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`,
        transition: "transform 60ms linear",
      });
      if (glare) {
        setGlareStyle({
          opacity: 1,
          background: `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.35), transparent 55%)`,
        });
      }
    },
    [hasHover, max, scale, glare]
  );

  const onMouseLeave = useCallback(() => {
    setStyle({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
      transition: "transform 450ms cubic-bezier(.22,1,.36,1)",
    });
    setGlareStyle({ opacity: 0 });
  }, []);

  return { ref, style, glareStyle, onMouseMove, onMouseLeave };
}

/** Reveals children with a rise + fade once they enter the viewport */
function useReveal(threshold = 0.18) {
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

/* ----------------------------- APP ----------------------------- */

export default function Home() {
      const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-porcelain font-sans text-slate-700 overflow-x-hidden">
      <GlobalStyles />
      <Hero onBook={() => setModalOpen(true)} />
      <AppointmentSection />
      <WelcomeSection />
      <ServicesCarousel />
      <ChooseBestBanner onBook={() => setModalOpen(true)} />
      <Testimonials />
      <StatsBar />

      <AppointmentModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

/* ----------------------------- GLOBAL / PREMIUM STYLES ----------------------------- */

function GlobalStyles() {
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

      /* ---------- reveal-on-scroll ---------- */
      .reveal {
        opacity: 0;
        transform: translateY(28px);
        transition: opacity 700ms cubic-bezier(.22,1,.36,1), transform 700ms cubic-bezier(.22,1,.36,1);
        will-change: transform, opacity;
      }
      .reveal-visible { opacity: 1; transform: translateY(0); }

      /* ---------- hairline that draws itself ---------- */
      .draw-line {
        position: relative;
        display: block;
        height: 2px;
        background: linear-gradient(90deg, var(--gold), var(--teal));
        transform-origin: left center;
        transform: scaleX(0);
        transition: transform 900ms cubic-bezier(.22,1,.36,1);
      }
      .reveal-visible .draw-line { transform: scaleX(1); }

      /* ---------- premium buttons ---------- */
      .btn-shimmer {
        position: relative;
        overflow: hidden;
        isolation: isolate;
      }
      .btn-shimmer::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%);
        transform: translateX(-120%);
        transition: transform 700ms ease;
        z-index: 1;
      }
      .btn-shimmer:hover::after { transform: translateX(120%); }
      .btn-shimmer > * { position: relative; z-index: 2; }

      /* ---------- glass surfaces ---------- */
      .glass {
        background: rgba(255,255,255,0.72);
        backdrop-filter: blur(14px) saturate(160%);
        -webkit-backdrop-filter: blur(14px) saturate(160%);
        border: 1px solid rgba(255,255,255,0.5);
      }
      .glass-dark {
        background: rgba(7, 27, 51, 0.55);
        backdrop-filter: blur(16px) saturate(160%);
        -webkit-backdrop-filter: blur(16px) saturate(160%);
        border: 1px solid rgba(255,255,255,0.12);
      }

      /* ---------- ambient blobs ---------- */
      @keyframes floatBlob {
        0%, 100% { transform: translate(0,0) scale(1); }
        33% { transform: translate(24px,-18px) scale(1.06); }
        66% { transform: translate(-18px,14px) scale(0.96); }
      }
      .blob { animation: floatBlob 14s ease-in-out infinite; filter: blur(60px); }
      .blob-delay { animation-delay: -6s; }

      /* ---------- soft glow pulse for accents ---------- */
      @keyframes glowPulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(23,185,166,0.35); }
        50% { box-shadow: 0 0 0 10px rgba(23,185,166,0); }
      }
      .glow-pulse { animation: glowPulse 2.6s ease-in-out infinite; }

      /* ---------- marquee for notices / trust strip ---------- */
      @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      .marquee-track { animation: marquee 26s linear infinite; }

      /* ---------- card lift ---------- */
      .lift-card { transition: transform 420ms cubic-bezier(.22,1,.36,1), box-shadow 420ms cubic-bezier(.22,1,.36,1); }
      .lift-card:hover { transform: translateY(-8px); box-shadow: 0 30px 60px -20px rgba(7,27,51,0.35); }

      /* ---------- gold underline sweep on links ---------- */
      .nav-link { position: relative; }
      .nav-link::after {
        content: "";
        position: absolute;
        left: 0; bottom: -4px;
        height: 2px; width: 0%;
        background: var(--gold);
        transition: width 320ms cubic-bezier(.22,1,.36,1);
      }
      .nav-link:hover::after { width: 100%; }

      /* ---------- hero kenburns ---------- */
      @keyframes kenburns {
        0% { transform: scale(1.08) translate3d(0,0,0); }
        100% { transform: scale(1.18) translate3d(-1%, -1%, 0); }
      }
      .kenburns { animation: kenburns 9s ease-in-out infinite alternate; }

      /* scrollbar polish */
      ::-webkit-scrollbar { width: 10px; }
      ::-webkit-scrollbar-track { background: var(--porcelain); }
      ::-webkit-scrollbar-thumb { background: linear-gradient(var(--teal), var(--royal)); border-radius: 10px; }

      /* modal keyframes (kept from original + refined) */
      @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
      @keyframes scaleIn { from { opacity: 0; transform: scale(.9) translateY(16px) } to { opacity: 1; transform: scale(1) translateY(0) } }
    `}</style>
  );
}

/* ----------------------------- PREMIUM MODAL ----------------------------- */

function AppointmentModal({ open, onClose }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    department: "Dermatologist",
    doctor: "",
    date: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      const t = setTimeout(() => setSubmitted(false), 300);
      return () => clearTimeout(t);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setForm({
        name: "",
        phone: "",
        email: "",
        department: "Dermatologist",
        doctor: "",
        date: "",
        message: "",
      });
    }, 1600);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ animation: "fadeIn 220ms ease-out" }}
      role="dialog"
      aria-modal="true"
    >
      <div onClick={onClose} className="absolute inset-0 bg-[#071B33]/70 backdrop-blur-md" />

      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-[0_40px_90px_-20px_rgba(7,27,51,0.5)] overflow-hidden"
        style={{ animation: "scaleIn 320ms cubic-bezier(.22,1,.36,1)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-gradient-to-r from-[#0B3D66] via-[#0B3D66] to-[#17B9A6] px-6 sm:px-10 py-8 overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/10 blob" />
          <div className="absolute right-16 bottom-0 w-24 h-24 rounded-full bg-[#D9B65C]/20 blob blob-delay" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all hover:rotate-90 duration-300"
            aria-label="Close"
          >
            <X size={18} />
          </button>
          <p className="text-[#D9B65C] text-xs font-semibold tracking-[0.25em] mb-1">GET IN TOUCH</p>
          <h3 className="text-white text-2xl sm:text-3xl font-bold font-serif-display">Book Your Appointment</h3>
          <p className="text-teal-50/80 text-sm mt-1">
            Fill the form below, our team will call you back to confirm.
          </p>
        </div>

        <div className="p-6 sm:p-10 max-h-[70vh] overflow-y-auto">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mb-4 glow-pulse">
                <Send size={26} />
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-1 font-serif-display">Request Sent!</h4>
              <p className="text-sm text-slate-500">
                We'll contact you shortly to confirm your appointment.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-5">
              <Field label="Patient Name" icon={User}>
                <input
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="peer w-full bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400"
                />
              </Field>

              <Field label="Phone Number" icon={Phone}>
                <input
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  className="peer w-full bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400"
                />
              </Field>

              <Field label="Email Address" icon={Mail}>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="peer w-full bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400"
                />
              </Field>

              <Field label="Preferred Date" icon={Calendar}>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="peer w-full bg-transparent outline-none text-sm text-slate-800"
                />
              </Field>

              <label className="block">
                <span className="text-xs font-semibold text-slate-500 tracking-wide mb-1.5 block">
                  Department
                </span>
                <select
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-lg px-3.5 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-shadow"
                >
                  <option>Dermatologist</option>
                  <option>Cardiologist</option>
                  <option>Neurologist</option>
                  <option>Orthopedic</option>
                  <option>Gynecologist</option>
                </select>
              </label>

              <label className="block">
                <span className="text-xs font-semibold text-slate-500 tracking-wide mb-1.5 block">
                  Select Doctor
                </span>
                <select
                  name="doctor"
                  value={form.doctor}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-lg px-3.5 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-shadow"
                >
                  <option value="">Any available doctor</option>
                  {DOCTORS.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </label>

              <label className="block sm:col-span-2">
                <span className="text-xs font-semibold text-slate-500 tracking-wide mb-1.5 block">
                  Message (optional)
                </span>
                <textarea
                  name="message"
                  rows={3}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us briefly about your concern..."
                  className="w-full border border-slate-200 rounded-lg px-3.5 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-shadow resize-none"
                />
              </label>

              <div className="sm:col-span-2 flex items-center gap-4 pt-2">
                <button
                  type="submit"
                  className="btn-shimmer flex-1 flex items-center justify-center gap-2 py-3.5 rounded-lg bg-gradient-to-r from-[#0B3D66] to-[#17B9A6] text-white text-sm font-bold tracking-wide shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 hover:brightness-105 active:scale-[0.99] transition-all"
                >
                  <Send size={16} /> CONFIRM APPOINTMENT
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-500 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, icon: Icon, children }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-slate-500 tracking-wide mb-1.5 block">{label}</span>
      <div className="flex items-center gap-2.5 border border-slate-200 rounded-lg px-3.5 py-3 focus-within:ring-2 focus-within:ring-teal-400 focus-within:border-transparent transition-shadow">
        <Icon size={16} className="text-teal-500 shrink-0" />
        {children}
      </div>
    </label>
  );
}

/* ----------------------------- HERO SLIDER ----------------------------- */

function Hero({ onBook }) {
  const [index, setIndex] = useState(0);
  const timer = useRef(null);
  const hasHover = useHasHoverPointer();
  const heroRef = useRef(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer.current);
  }, []);

  const go = (dir) => {
    clearInterval(timer.current);
    setIndex((i) => (i + dir + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const onMove = (e) => {
    if (!hasHover || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({ x: px * 16, y: py * 16 });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseMove={onMove}
      className="relative h-[460px] sm:h-[560px] lg:h-[680px] overflow-hidden"
    >
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
            i === index ? "opacity-100 z-[1]" : "opacity-0 z-0"
          }`}
        >
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={slide.img}
              alt={slide.title}
              className={`w-full h-full object-cover ${i === index ? "kenburns" : ""}`}
              style={
                hasHover
                  ? { transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0) scale(1.05)` }
                  : undefined
              }
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#071B33]/70 via-[#071B33]/10 to-transparent" />
          <div className="absolute inset-0 bg-[#0B3D66]/10" />

          <div
            className={`absolute left-4 sm:left-10 lg:left-16 bottom-16 sm:bottom-24 max-w-md transition-all duration-700 ${
              i === index ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <div className="glass rounded-lg border-t-4 border-[#D9B65C] p-5 sm:p-7 shadow-2xl">
              <p className="text-[11px] font-bold tracking-[0.3em] text-[#17B9A6] mb-2 flex items-center gap-2">
                <Sparkles size={12} /> SPECIALITY CARE
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B3D66] mb-2 font-serif-display">{slide.title}</h2>
              <p className="text-sm text-slate-600">{slide.text}</p>
              <button
                onClick={onBook}
                className="btn-shimmer mt-4 px-5 py-2.5 bg-gradient-to-r from-[#0B3D66] to-[#17B9A6] text-white text-xs font-bold tracking-wide rounded hover:brightness-110 transition-all inline-flex items-center gap-2"
              >
                BOOK APPOINTMENT <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={() => go(-1)}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full glass flex items-center justify-center text-white hover:text-[#0B3D66] hover:scale-110 transition-all z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={() => go(1)}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full glass flex items-center justify-center text-white hover:text-[#0B3D66] hover:scale-110 transition-all z-10"
        aria-label="Next slide"
      >
        <ChevronRight size={22} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2.5 rounded-full transition-all duration-500 ${
              i === index ? "w-8 bg-[#D9B65C]" : "w-2.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

/* ----------------------------- APPOINTMENT + OPD (inline section) ----------------------------- */

function AppointmentSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    department: "Dermatologist",
    doctor: "",
    date: "",
    captcha: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.captcha.trim() !== "8") {
      alert("Please answer the security question correctly.");
      return;
    }
    alert("Appointment request submitted!");
  };

  return (
    <section id="appointment" className="relative z-20 sm:-mt-10 px-4 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[2fr_1fr] gap-6">
        <Reveal className="bg-white shadow-2xl rounded-lg border-t-4 border-[#D9B65C] p-6 sm:p-8 lift-card">
          <p className="text-xs font-semibold text-[#17B9A6] tracking-widest">BOOK YOURS</p>
          <h3 className="text-2xl font-bold text-slate-800 mb-1 font-serif-display">Online Appoinment</h3>
          <span className="draw-line w-16 mb-5" />

          <form onSubmit={handleSubmit} className="grid sm:grid-cols-3 gap-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Patient Name"
              className="border border-slate-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#17B9A6] transition-all focus:-translate-y-0.5"
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="border border-slate-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#17B9A6] transition-all focus:-translate-y-0.5"
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="border border-slate-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#17B9A6] transition-all focus:-translate-y-0.5"
            />

            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              className="border border-slate-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#17B9A6] transition-all"
            >
              <option>Dermatologist</option>
              <option>Cardiologist</option>
              <option>Neurologist</option>
              <option>Orthopedic</option>
              <option>Gynecologist</option>
            </select>

            <select
              name="doctor"
              value={form.doctor}
              onChange={handleChange}
              className="border border-slate-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#17B9A6] transition-all"
            >
              <option value="">Select Doctor</option>
              {DOCTORS.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="border border-slate-300 rounded px-3 py-2.5 text-sm text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#17B9A6] transition-all"
            />

            <div className="sm:col-span-1">
              <label className="text-sm font-semibold text-slate-600 block mb-1.5">
                Which is bigger, 2 or 8?
              </label>
              <input
                name="captcha"
                value={form.captcha}
                onChange={handleChange}
                className="border border-slate-300 rounded px-3 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#17B9A6] transition-all"
              />
            </div>

            <div className="sm:col-span-2 flex items-end">
              <button
                type="submit"
                className="btn-shimmer w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[#0B3D66] to-[#17B9A6] text-white text-sm font-bold tracking-wide rounded hover:brightness-110 transition-all"
              >
                MAKE APPOINMENT
              </button>
            </div>
          </form>
        </Reveal>

        <Reveal delay={120} className="bg-white shadow-2xl rounded-lg border-t-4 border-[#17B9A6] p-6 sm:p-8 lift-card">
          <p className="text-xs font-semibold text-[#17B9A6] tracking-widest">WE ARE FOR YOU</p>
          <h3 className="text-2xl font-bold text-slate-800 mb-1 font-serif-display">OPD Hours</h3>
          <span className="draw-line w-16 mb-5" />
          <div className="divide-y divide-dashed divide-slate-200">
            {OPD_HOURS.map((h) => (
              <div key={h.day} className="flex justify-between py-3 text-sm group">
                <span className="font-semibold text-slate-700 group-hover:text-[#0B3D66] transition-colors">{h.day}:</span>
                <span className="text-slate-500">{h.time}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------- WELCOME + NOTICE ----------------------------- */

function WelcomeSection() {
  return (
    <section id="about" className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-24 sm:pt-32 pb-16 grid lg:grid-cols-[auto_1fr_320px] gap-10 items-start">
      <div className="absolute -left-40 top-10 w-80 h-80 rounded-full bg-[#17B9A6]/10 blob pointer-events-none hidden lg:block" />

      <Reveal className="relative hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=600&auto=format&fit=crop"
          alt="Director"
          className="w-64 h-auto rounded-md object-cover shadow-xl lift-card"
        />
        <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br from-[#D9B65C] to-[#17B9A6] flex items-center justify-center text-white shadow-lg glow-pulse">
          <ShieldCheck size={28} />
        </div>
      </Reveal>

      <Reveal delay={80}>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#17B9A6] leading-tight font-serif-display">
          Welcome To Medicare <br className="hidden sm:block" /> Multispeciality Hospital
        </h2>
        <span className="draw-line w-16 my-4" />
        <p className="text-xs font-bold tracking-wider text-slate-700 mb-3">FROM DIRECTORS DESK</p>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          A vision to strengthen health care in the community with an aim to
          establish a state of art healthcare infrastructure with
          comprehensive healthcare services under one roof, creation a
          platform for transparent community centric patient care. Senior and
          experienced doctors serving the society for last 3-4 decades
          dedicating to work in unison to ensure holistic well-being of the
          patients.
        </p>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          We are the only health care center in Pusad &amp; periphery with
          full time Qualified post Graduate consultants who ensure
          availability &amp; access to the best medical talent round the
          clock.
        </p>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          The team MEDICARE is supported by standardized protocols and use of
          latest's technologies and techniques which help to deliver
          uncompromising patient care.
        </p>
        <p className="text-sm italic font-semibold text-slate-600 mb-4">Director Team</p>
        <button className="btn-shimmer px-7 py-3 bg-gradient-to-r from-[#0B3D66] to-[#0a2f4f] text-white text-xs font-bold tracking-wider hover:brightness-110 transition-all inline-flex items-center gap-2">
          READ MORE <ArrowRight size={14} />
        </button>
      </Reveal>

      <Reveal delay={160} className="w-full border border-slate-100 shadow-xl mt-4 lg:mt-0 rounded-lg overflow-hidden lift-card">
        <div className="bg-gradient-to-r from-[#0B3D66] to-[#17B9A6] text-white text-center py-3 font-bold tracking-wide text-sm">
          NOTICE
        </div>
        <div className="divide-y divide-dashed divide-slate-200">
          {NOTICES.map((n, i) => (
            <div key={i} className="flex gap-3 p-4 hover:bg-slate-50 transition-colors group">
              <div className="shrink-0 w-14 text-center bg-gradient-to-b from-[#D9B65C] to-[#c49f45] text-white rounded-sm overflow-hidden group-hover:scale-105 transition-transform">
                <div className="text-lg font-bold leading-none py-1">{n.date}</div>
                <div className="text-[10px] bg-[#071B33] py-1">{n.month}</div>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0B3D66] leading-snug">{n.text}</p>
                {n.sub && (
                  <p className="text-xs text-[#17B9A6] flex items-center gap-1 mt-1">
                    <Clock size={12} /> {n.sub}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ----------------------------- SERVICES CAROUSEL (3D TILT) ----------------------------- */

function ServiceTiltCard({ s, highlighted }) {
  const { ref, style, glareStyle, onMouseMove, onMouseLeave } = useTilt({ max: 8, scale: 1.04 });

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={style}
      className={`relative p-8 text-center rounded-xl transition-colors duration-300 will-change-transform ${
        highlighted ? "bg-white text-slate-600 shadow-xl" : "bg-gradient-to-br from-[#17B9A6] to-[#0B3D66] text-white shadow-xl"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300"
        style={glareStyle}
      />
      <div
        className={`relative w-[88px] h-[88px] mx-auto rounded-full flex items-center justify-center mb-6 border-2 overflow-hidden transition-transform duration-500 hover:rotate-[8deg] ${
          highlighted ? "border-[#17B9A6]/40 bg-white" : "border-white bg-white"
        }`}
      >
        <img src={s.icon} alt={s.title} className="w-11 h-11 object-contain" />
      </div>
      <h3 className={`relative font-bold text-[22px] mb-3 font-serif-display ${highlighted ? "text-[#0B3D66]" : "text-white"}`}>
        {s.title}
      </h3>
      <p className={`relative text-[14px] font-medium leading-relaxed ${highlighted ? "text-slate-500" : "text-teal-50/90"}`}>
        {s.desc}
      </p>
    </div>
  );
}

function ServicesCarousel() {
  const [start, setStart] = useState(0);
  const visible = 3;

  const next = () => setStart((s) => (s + 1) % SERVICES.length);
  const prev = () => setStart((s) => (s - 1 + SERVICES.length) % SERVICES.length);

  const cards = Array.from({ length: visible }, (_, i) => SERVICES[(start + i) % SERVICES.length]);

  return (
    <section id="hospital" className="relative py-20 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <img
        src={bgservice}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#17B9A6]/10 via-white/30 to-white" />

      <Reveal className="relative max-w-7xl mx-auto text-center mb-14">
        <p className="text-xs font-bold tracking-[0.3em] text-[#D9B65C] mb-2">WHAT WE OFFER</p>
        <h2 className="text-3xl font-bold text-slate-700 font-serif-display">Medical Service</h2>
        <span className="draw-line w-14 mx-auto mt-3" />
      </Reveal>

      <div className="relative max-w-6xl mx-auto" style={{ perspective: "1400px" }}>
        <button
          onClick={prev}
          className="absolute -left-2 sm:-left-8 lg:-left-14 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center text-slate-700 hover:text-[#17B9A6] hover:scale-110 transition-all z-10"
          aria-label="Previous"
        >
          <ChevronLeft size={26} strokeWidth={2.9} />
        </button>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((s, i) => (
            <Reveal key={s.title + start} delay={i * 90}>
              <ServiceTiltCard s={s} highlighted={i === 1} />
            </Reveal>
          ))}
        </div>

        <button
          onClick={next}
          className="absolute -right-2 sm:-right-8 lg:-right-14 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center text-slate-700 hover:text-[#17B9A6] hover:scale-110 transition-all z-10"
          aria-label="Next"
        >
          <ChevronRight size={26} strokeWidth={2.9} />
        </button>

        <div className="flex justify-center gap-2 mt-10">
          {SERVICES.map((_, i) => (
            <button
              key={i}
              onClick={() => setStart(i)}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === start ? "w-6 bg-[#0B3D66]" : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to service ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- CHOOSE BEST BANNER ----------------------------- */

function ChooseBestBanner({ onBook }) {
  const points = [
    "Primary health care",
    "24x7 emergency services",
    "Advanced diagnostic center",
    "Experienced specialist doctors",
  ];
  return (
    <section className="grid lg:grid-cols-2">
      <Reveal className="relative bg-gradient-to-br from-[#071B33] via-[#0B3D66] to-[#17B9A6] text-white px-6 sm:px-12 lg:px-16 py-16 flex flex-col justify-center overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/5 blob" />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-[#D9B65C]/10 blob blob-delay" />
        <p className="relative text-xs font-bold tracking-[0.3em] text-[#D9B65C] mb-2">WHY MEDICARE</p>
        <h2 className="relative text-2xl sm:text-3xl font-bold mb-2 font-serif-display">Choose The Best For Your Health</h2>
        <span className="draw-line w-14 mb-6" />
        <ul className="relative space-y-3 mb-6">
          {points.map((p, i) => (
            <li
              key={p}
              className="flex items-center gap-3 text-sm sm:text-base transition-transform duration-300 hover:translate-x-2"
            >
              <span className="w-6 h-6 bg-white/15 rounded-full flex items-center justify-center text-xs text-[#17B9A6] shrink-0 border border-white/20">
                ✓
              </span>
              {p}
            </li>
          ))}
        </ul>
        <button
          onClick={onBook}
          className="btn-shimmer relative self-start px-6 py-3 bg-[#D9B65C] hover:brightness-110 transition-all text-xs font-bold tracking-wide text-[#071B33] rounded"
        >
          DOWNLOAD BROCHURE
        </button>
      </Reveal>

      <Reveal delay={120} className="relative overflow-hidden group">
        <img
          src={ref}
          alt="Hospital building"
          className="w-full h-64 lg:h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071B33]/40 to-transparent" />
      </Reveal>
    </section>
  );
}

/* ----------------------------- PREMIUM TESTIMONIALS ----------------------------- */

function TestimonialCard({ t }) {
  const { ref, style, glareStyle, onMouseMove, onMouseLeave } = useTilt({ max: 6, scale: 1.02 });
  const initials = t.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={style}
      className="relative rounded-2xl bg-gradient-to-b from-white to-[#F7F9FB] border border-slate-100 shadow-xl p-8 will-change-transform overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300" style={glareStyle} />

      <div className="absolute -top-3 -left-3 w-16 h-16 rounded-full bg-gradient-to-br from-[#D9B65C]/20 to-[#17B9A6]/10 blur-2xl" />

      <Quote className="relative text-[#17B9A6]/25 mb-4" size={40} strokeWidth={1.5} />

      <p className="relative text-slate-600 text-[15px] leading-relaxed mb-6 italic">
        "{t.quote}"
      </p>

      <div className="relative flex items-center gap-1 mb-4">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} size={15} className="fill-[#D9B65C] text-[#D9B65C]" />
        ))}
      </div>

      <div className="relative flex items-center gap-3 pt-4 border-t border-dashed border-slate-200">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0B3D66] to-[#17B9A6] text-white flex items-center justify-center font-bold text-sm shadow-md shrink-0">
          {initials}
        </div>
        <div>
          <p className="font-bold text-[#0B3D66] text-sm font-serif-display">{t.name}</p>
          <p className="text-xs text-slate-400">{t.tag} &middot; {t.dept}</p>
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  return (
    <section className="relative py-20 px-4 sm:px-8 lg:px-16 bg-gradient-to-b from-white via-[#F7F9FB] to-white overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#17B9A6]/5 blob pointer-events-none" />

      <Reveal className="relative max-w-7xl mx-auto text-center mb-14">
        <p className="text-xs font-bold tracking-[0.3em] text-[#D9B65C] mb-2">PATIENT VOICES</p>
        <h2 className="text-3xl font-bold text-[#17B9A6] font-serif-display">What Our Patients Say</h2>
        <span className="draw-line w-14 mx-auto mt-3" />
        <p className="text-sm text-slate-500 max-w-lg mx-auto mt-4">
          Real experiences from families who trusted Medicare with the care of the people they love most.
        </p>
      </Reveal>

      <div className="relative max-w-6xl mx-auto grid sm:grid-cols-2 gap-8" style={{ perspective: "1400px" }}>
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={i * 100}>
            <TestimonialCard t={t} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------- STATS BAR ----------------------------- */

function AnimatedStat({ icon: Icon, value, label }) {
  const { ref, visible } = useReveal(0.4);
  return (
    <div
      ref={ref}
      className={`flex flex-col items-center text-center gap-2 px-8 sm:px-12 py-8 text-slate-700 group transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mb-1 group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-300 border border-slate-100">
        <Icon className="text-[#17B9A6]" size={28} />
      </div>
      <p className="text-2xl font-extrabold text-[#0B3D66] font-serif-display">{value}</p>
      <p className="text-[13px] font-semibold text-slate-500 tracking-wide">{label}</p>
    </div>
  );
}

function StatsBar() {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white border-t border-b border-slate-100">
      <div className="max-w-6xl mx-auto flex flex-wrap items-stretch justify-center divide-x divide-slate-200">
        {STATS.map((s) => (
          <AnimatedStat key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}