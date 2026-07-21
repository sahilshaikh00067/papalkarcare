import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Stethoscope,
  FlaskConical,
  Syringe,
  Smile,
  X,
  Download,
  Clock,
  GraduationCap,
  Users,
  ArrowRight,
} from "lucide-react";
import papalkar from "../../public/papalkar.pdf";

/* ============================================================
   Same design language as Career/Home: Ink navy / Royal / Teal / Gold
   Fraunces display + Inter body + glass + reveal-on-scroll
   + premium 3D tilt cards and a cinematic detail modal
   ============================================================ */

const PROGRAMS = [
  {
    id: "dnb-medicine",
    title: "DNB – Medicine",
    subtitle: "Diplomate of National Board",
    icon: Stethoscope,
    accent: "#0B3D66",
    description:
      "An advanced clinical residency for physicians seeking specialist expertise in internal medicine, delivered through hands-on ward rounds, case discussions and consultant-led mentorship.",
    duration: "3 Years",
    eligibility: "MBBS with NEET-PG qualification",
    seats: "6 Seats",
    pdf: "/papalkar.pdf",
  },
  {
    id: "pg-diploma",
    title: "Post Graduate Diploma",
    subtitle: "Pharmacy & Allied Sciences",
    icon: FlaskConical,
    accent: "#17B9A6",
    description:
      "A focused postgraduate diploma building deep expertise in pharmaceutical sciences, compounding and clinical pharmacology for graduates aiming to specialise in allied healthcare fields.",
    duration: "2 Years",
    eligibility: "Bachelor's degree in a relevant discipline",
    seats: "20 Seats",
    pdf: "/papalkar.pdf",
  },
  {
    id: "bsc-nursing",
    title: "B.Sc Nursing",
    subtitle: "Care College of Nursing, Pusad",
    icon: Syringe,
    accent: "#D9B65C",
    description:
      "A comprehensive four-year nursing degree combining rigorous classroom instruction with supervised clinical practice, preparing compassionate, competent nurses for modern healthcare.",
    duration: "4 Years",
    eligibility: "10+2 with Physics, Chemistry, Biology",
    seats: "60 Seats",
    pdf: "/papalkar.pdf",
  },
  {
    id: "dental-sciences",
    title: "Dental Sciences",
    subtitle: "BDS & Allied Dental Care",
    icon: Smile,
    accent: "#071B33",
    description:
      "A five-year professional programme in dental medicine and surgery, blending pre-clinical foundations with real patient care in fully equipped teaching clinics.",
    duration: "5 Years",
    eligibility: "10+2 with NEET qualification",
    seats: "40 Seats",
    pdf: "/papalkar.pdf",
  },
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

/* ----------------------------- 3D TILT PROGRAM CARD ----------------------------- */

function TiltCard({ program, delay, onOpen }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });
  const Icon = program.icon;

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ry = ((x / rect.width) - 0.5) * 16;
    const rx = ((y / rect.height) - 0.5) * -16;
    setTilt({ rx, ry, gx: (x / rect.width) * 100, gy: (y / rect.height) * 100, active: true });
  };

  const handleLeave = () => setTilt((t) => ({ ...t, rx: 0, ry: 0, active: false }));

  return (
    <Reveal delay={delay}>
      <button
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onClick={() => onOpen(program)}
        className="tilt-card group relative w-full text-left rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-[#17B9A6]"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(${tilt.active ? -6 : 0}px) scale(${tilt.active ? 1.02 : 1})`,
        }}
      >
        {/* image / icon plane */}
        <div
          className="relative h-44 flex items-center justify-center overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${program.accent}, #17B9A6)` }}
        >
          <div
            className="tilt-glare"
            style={{
              opacity: tilt.active ? 1 : 0,
              background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.35), transparent 55%)`,
            }}
          />
          <div
            className="badge-pop w-20 h-20 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-xl"
            style={{
              transform: `translateZ(40px) translateY(${tilt.active ? -4 : 0}px) rotate(${tilt.active ? tilt.ry / 2 : 0}deg)`,
            }}
          >
            <Icon size={34} className="text-white drop-shadow" />
          </div>
        </div>

        {/* label plane */}
        <div className="px-5 py-5 bg-white relative z-10">
          <h3 className="font-extrabold text-slate-800 font-serif-display text-base leading-snug">
            {program.title}
          </h3>
          <p className="text-xs text-slate-400 mt-1">{program.subtitle}</p>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#17B9A6] mt-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300">
            View details <ArrowRight size={13} />
          </span>
        </div>
      </button>
    </Reveal>
  );
}

/* ----------------------------- DETAIL MODAL ----------------------------- */

function ProgramModal({ program, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!program) return null;
  const Icon = program.icon;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#071B33]/75 backdrop-blur-md modal-veil" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-pop relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl bg-white"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* header plane */}
        <div
          className="relative h-40 flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${program.accent}, #17B9A6)` }}
        >
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/10 blob" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-white/10 blob blob-delay" />
          <div className="modal-icon-pop w-20 h-20 rounded-2xl bg-white/15 border border-white/30 backdrop-blur-sm flex items-center justify-center shadow-xl relative z-10">
            <Icon size={36} className="text-white" />
          </div>
        </div>

        {/* content */}
        <div className="p-6 sm:p-8">
          <p className="text-xs font-bold tracking-[0.25em] text-[#D9B65C] mb-1">
            {program.subtitle.toUpperCase()}
          </p>
          <h3 className="text-2xl font-bold text-slate-800 font-serif-display mb-3">
            {program.title}
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed mb-6">{program.description}</p>

          <div className="grid grid-cols-3 gap-3 mb-7">
            <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 text-center">
              <Clock size={16} className="text-[#17B9A6] mx-auto mb-1.5" />
              <p className="text-[11px] font-semibold text-slate-500">{program.duration}</p>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 text-center">
              <GraduationCap size={16} className="text-[#17B9A6] mx-auto mb-1.5" />
              <p className="text-[11px] font-semibold text-slate-500">{program.eligibility}</p>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 text-center">
              <Users size={16} className="text-[#17B9A6] mx-auto mb-1.5" />
              <p className="text-[11px] font-semibold text-slate-500">{program.seats}</p>
            </div>
          </div>

<button
  onClick={() => window.open("/papalkar.pdf", "_blank")}
  className="btn-shimmer w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#0B3D66] text-white text-sm font-bold shadow-lg hover:shadow-xl transition-shadow"
>
  <span>Open Brochure</span>
  <Download size={16} />
</button>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- PAGE ----------------------------- */

export default function Academic() {
  const [active, setActive] = useState(null);

  return (
    <div className="min-h-screen bg-porcelain font-sans text-slate-700 overflow-x-hidden">
      <PageStyles />

      {/* ---------- HERO ---------- */}
      <section className="relative bg-gradient-to-br from-[#071B33] via-[#0B3D66] to-[#17B9A6] text-white py-24 sm:py-28 px-4 sm:px-8 lg:px-16 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-white/5 blob" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#D9B65C]/10 blob blob-delay" />

        <div className="relative max-w-3xl mx-auto text-center">
          <p className="hero-fade text-xs font-bold tracking-[0.3em] text-[#D9B65C] mb-4 flex items-center justify-center gap-2">
            <Sparkles size={14} /> ACADEMIC PROGRAMS
          </p>
          <h1 className="hero-fade hero-fade-d1 text-4xl sm:text-6xl font-bold font-serif-display mb-4">
            Shape Your Future In Healthcare
          </h1>
          <p className="hero-fade hero-fade-d2 text-teal-50/80 text-sm sm:text-base max-w-xl mx-auto">
            Explore our medical, nursing, dental and allied health programs —
            built on rigorous training and real clinical experience.
          </p>
        </div>
      </section>

      {/* ---------- PROGRAM GRID ---------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 pt-20 pb-24">
        <Reveal className="text-center mb-14">
          <p className="text-xs font-bold tracking-[0.3em] text-[#D9B65C] mb-2">COURSES OFFERED</p>
          <h2 className="text-3xl font-bold text-slate-800 font-serif-display">Our Academic Programs</h2>
          <span className="draw-line-static w-14 mx-auto mt-3" />
          <p className="text-sm text-slate-500 max-w-lg mx-auto mt-4">
            Tap on a program to see eligibility, duration and download the full brochure.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: "1400px" }}>
          {PROGRAMS.map((p, i) => (
            <TiltCard key={p.id} program={p} delay={i * 100} onOpen={setActive} />
          ))}
        </div>
      </section>

      {active && <ProgramModal program={active} onClose={() => setActive(null)} />}
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

      /* ---------- hero entrance ---------- */
      @keyframes heroFadeUp {
        from { opacity: 0; transform: translateY(22px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .hero-fade { animation: heroFadeUp 800ms cubic-bezier(.22,1,.36,1) both; }
      .hero-fade-d1 { animation-delay: 120ms; }
      .hero-fade-d2 { animation-delay: 240ms; }

      /* ---------- reveal-on-scroll ---------- */
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

      /* ---------- 3D tilt cards ---------- */
      .tilt-card {
        transform-style: preserve-3d;
        transition: transform 260ms cubic-bezier(.22,1,.36,1), box-shadow 260ms ease;
        will-change: transform;
      }
      .tilt-card:hover {
        box-shadow: 0 30px 60px -20px rgba(7,27,51,0.35);
      }
      .tilt-glare {
        position: absolute;
        inset: 0;
        transition: opacity 260ms ease;
        pointer-events: none;
      }
      .badge-pop {
        transition: transform 260ms cubic-bezier(.22,1,.36,1);
        transform-style: preserve-3d;
      }

      /* ---------- modal ---------- */
      @keyframes veilIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .modal-veil { animation: veilIn 260ms ease both; }

      @keyframes modalPopIn {
        from { opacity: 0; transform: perspective(1000px) rotateX(8deg) translateY(24px) scale(0.92); }
        to { opacity: 1; transform: perspective(1000px) rotateX(0deg) translateY(0) scale(1); }
      }
      .modal-pop { animation: modalPopIn 420ms cubic-bezier(.22,1,.36,1) both; }

      @keyframes iconPop {
        0% { opacity: 0; transform: scale(0.4) rotate(-12deg); }
        70% { opacity: 1; transform: scale(1.08) rotate(4deg); }
        100% { opacity: 1; transform: scale(1) rotate(0deg); }
      }
      .modal-icon-pop { animation: iconPop 520ms cubic-bezier(.22,1,.36,1) 120ms both; }
    `}</style>
  );
}