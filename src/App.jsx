import React, {
  useState, useEffect, useRef, useCallback, useContext, createContext, useMemo,
} from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useInView } from "react-intersection-observer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";

/* Some CJS-authored packages (react-parallax-tilt, react-countup,
   react-fast-marquee) get their default export wrapped in an extra
   `.default` layer depending on the bundler's CJS/ESM interop —
   this resolves either shape safely instead of crashing with
   "Element type is invalid". */
/* Tilt and Marquee are implemented locally below instead of pulling in
   react-parallax-tilt / react-fast-marquee — both kept crashing under
   this project's Vite CJS/ESM interop with "Element type is invalid".
   Zero extra deps, zero interop risk. */
import {
  Menu, X, Phone, MapPin, Clock, ChevronRight, ChevronLeft, ChevronDown,
  Stethoscope, Activity, Heart, ShieldCheck, Award, Users, Building2,
  Microscope, Syringe, PlayCircle, Star, Quote, Send, MessageCircle,
  CheckCircle2, Calendar, GraduationCap, Sparkles, ArrowUpRight, ArrowRight,
  AlertTriangle, BadgeCheck, ArrowUp, Loader2, BookOpen, Droplet, Salad,
} from "lucide-react";

/* ============================================================
   PAPALKAR GASTROCARE HOSPITAL — Ultra-Premium One-Page Website
   Stack: React + Tailwind + Framer Motion + Swiper + react-hook-form + yup
          (custom local Tilt/Marquee/AnimatedNumber — no CJS/ESM interop risk)
   Signature motif: "Vital Line" — a living ECG waveform that acts
   as the visual heartbeat of the page (hero monitor card, section
   dividers, loader) — tying the premium feel back to a clinical
   instrument rather than a generic gradient blob.

   ⚠️ PHOTOGRAPHY NOTE: every <img> below is sourced live from
   Flickr via loremflickr.com using medical/hospital keywords so
   the layout previews with real, relevant photography out of the
   box. Swap every `src` for the hospital's own photographs before
   deploying to production — do not ship placeholder imagery.
   ============================================================ */

const WHATSAPP_NUMBER = "918799992699";
const PHONE_1 = "8799992699";
const PHONE_2 = "8799992499";

/* ---------------- Image bank (placeholder photography) ---------------- */
const IMG = {
  // Hero
  heroDoctor: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200",
  heroBg: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1600",


  // Doctor
  consultRoom: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1200",
  
  // Hospital
  building: "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg",
  reception: "https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg",
  corridor: "https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg",
  ward: "https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg",

  // Operation
  operationTheatre: "https://images.pexels.com/photos/8376234/pexels-photo-8376234.jpeg",
  equipment: "https://images.pexels.com/photos/7088524/pexels-photo-7088524.jpeg",
  lab: "https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg",

  // Endoscopy
  endoscopy: "https://images.pexels.com/photos/7089017/pexels-photo-7089017.jpeg",

  // ICU
  icu: "https://images.pexels.com/photos/3259629/pexels-photo-3259629.jpeg",

  // Emergency
  emergency: "https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg",

  // Ambulance
  ambulance: "https://images.pexels.com/photos/2634026/pexels-photo-2634026.jpeg",

  // Pharmacy
  pharmacy: "https://images.pexels.com/photos/593451/pexels-photo-593451.jpeg",

  // Diagnostics
  mri: "https://images.pexels.com/photos/4226256/pexels-photo-4226256.jpeg",
  ctscan: "https://images.pexels.com/photos/4226896/pexels-photo-4226896.jpeg",

  // Patient
  patientCare: "https://images.pexels.com/photos/7580258/pexels-photo-7580258.jpeg",

  // Health Tips
  tip1: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg",
  tip2: "https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg",
  tip3: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",

  // Team
  team1: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg",
  team2: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg",
  team3: "https://images.pexels.com/photos/5998469/pexels-photo-5998469.jpeg",

  // Video
  videoPoster: "https://images.pexels.com/photos/1170979/pexels-photo-1170979.jpeg",
};

/* ---------------- Booking context (drives the modal) ---------------- */
const BookingContext = createContext(null);
const useBooking = () => useContext(BookingContext);

/* ---------------- Global style ---------------- */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,500&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap');

    .pg-root{
      --ink:#0A1614;
      --emerald-950:#03100D;
      --emerald-900:#062420;
      --emerald-800:#0C3A32;
      --emerald-700:#124F44;
      --jade:#18C29B;
      --jade-soft:#7FE3C8;
      --amber:#D7A94E;
      --amber-soft:#F0D9A0;
      --ember:#E1573D;
      --ember-dark:#B23F29;
      --porcelain:#F8F4EC;
      --porcelain-2:#EFE7D6;
      --line:#0000000f;
      font-family:'Plus Jakarta Sans', sans-serif;
      background:var(--porcelain);
      color:var(--ink);
      overflow-x:hidden;
      position:relative;
    }
    .pg-root .font-display{ font-family:'Fraunces', serif; }
    .pg-root .font-mono{ font-family:'Space Grotesk', sans-serif; }

    .pg-root::before{
      content:''; position:fixed; inset:0; pointer-events:none; z-index:40; opacity:.035; mix-blend-mode:multiply;
      background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    }

    @keyframes pgFloat{ 0%,100%{ transform:translateY(0) rotate(0deg);} 50%{ transform:translateY(-18px) rotate(2deg);} }
    @keyframes pgFloatSlow{ 0%,100%{ transform:translateY(0) translateX(0);} 50%{ transform:translateY(14px) translateX(-10px);} }
    @keyframes pgShimmer{ 0%{ background-position:-200% 0;} 100%{ background-position:200% 0;} }
    @keyframes pgSpinSlow{ to{ transform:rotate(360deg);} }
    @keyframes pgBlink{ 0%,100%{ opacity:1;} 50%{ opacity:.25;} }
    @keyframes pgGradientMove{ 0%{ background-position:0% 50%;} 50%{ background-position:100% 50%;} 100%{ background-position:0% 50%;} }
    @keyframes pgEcg{ from{ stroke-dashoffset:2400; } to{ stroke-dashoffset:0; } }
    @keyframes pgPing{ 0%{ transform:scale(1); opacity:.6;} 75%,100%{ transform:scale(1.9); opacity:0;} }
    @keyframes pgDotPulse{ 0%,100%{ transform:scale(1); opacity:1;} 50%{ transform:scale(1.5); opacity:.5;} }
    @keyframes pgMarqueeScroll{ from{ transform:translateX(0);} to{ transform:translateX(-50%);} }

    .pg-mesh{
      background:
        radial-gradient(circle at 15% 20%, rgba(24,194,155,.32), transparent 45%),
        radial-gradient(circle at 85% 15%, rgba(225,87,61,.20), transparent 40%),
        radial-gradient(circle at 60% 85%, rgba(215,169,78,.16), transparent 45%),
        linear-gradient(135deg, var(--emerald-950), var(--emerald-900) 55%, #093530);
      background-size:200% 200%;
      animation:pgGradientMove 16s ease infinite;
    }

    .pg-shimmer-text{
      background:linear-gradient(90deg, var(--amber) 0%, var(--amber-soft) 25%, var(--amber) 50%, var(--amber-soft) 75%, var(--amber) 100%);
      background-size:200% auto;
      -webkit-background-clip:text; background-clip:text; color:transparent;
      animation:pgShimmer 5s linear infinite;
    }

    .pg-btn-primary{
      background:linear-gradient(135deg, var(--ember), var(--ember-dark));
      box-shadow:0 10px 30px -8px rgba(225,87,61,.55), inset 0 1px 0 rgba(255,255,255,.25);
      transition:transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s ease, filter .35s ease;
    }
    .pg-btn-primary:hover{ transform:translateY(-3px) scale(1.03); box-shadow:0 16px 40px -8px rgba(225,87,61,.7), inset 0 1px 0 rgba(255,255,255,.3); filter:brightness(1.05); }
    .pg-btn-primary:active{ transform:translateY(0) scale(.98); }

    .pg-btn-outline{ transition:all .35s cubic-bezier(.16,1,.3,1); }
    .pg-btn-outline:hover{ background:rgba(255,255,255,.12); transform:translateY(-3px); }

    .pg-underline{ position:relative; display:inline-block; }
    .pg-underline::after{
      content:''; position:absolute; left:0; right:0; bottom:-6px; height:10px;
      background:linear-gradient(90deg, var(--ember), var(--amber));
      opacity:.28; border-radius:8px; transform:scaleX(0); transform-origin:left;
      transition:transform .6s cubic-bezier(.16,1,.3,1);
    }
    .pg-underline.pg-in::after{ transform:scaleX(1); }

    .pg-glass{ backdrop-filter:blur(18px) saturate(160%); -webkit-backdrop-filter:blur(18px) saturate(160%); }

    .pg-navlink{ position:relative; }
    .pg-navlink::after{ content:''; position:absolute; left:0; bottom:-4px; width:0; height:2px; background:var(--amber); transition:width .35s cubic-bezier(.16,1,.3,1); }
    .pg-navlink:hover::after{ width:100%; }

    .pg-ecg-path{ stroke-dasharray:2400; animation:pgEcg 3.4s linear infinite; }

    .pg-scrollbar::-webkit-scrollbar{ width:6px; height:6px; }
    .pg-scrollbar::-webkit-scrollbar-thumb{ background:var(--jade); border-radius:10px; }

    ::selection{ background:var(--jade); color:#fff; }

    .pg-swiper .swiper-pagination-bullet{ background:var(--emerald-800); opacity:.35; width:8px; height:8px; }
    .pg-swiper .swiper-pagination-bullet-active{ background:var(--ember); opacity:1; width:22px; border-radius:6px; }
    .pg-swiper-dark .swiper-pagination-bullet{ background:#fff; opacity:.3; }
    .pg-swiper-dark .swiper-pagination-bullet-active{ background:var(--amber); opacity:1; width:22px; border-radius:6px; }

    a, button{ -webkit-tap-highlight-color:transparent; }
    :focus-visible{ outline:2px solid var(--jade); outline-offset:3px; border-radius:4px; }

    @media (prefers-reduced-motion: reduce){
      .pg-mesh,.pg-shimmer-text,.pg-ecg-path,[style*="animation"]{ animation:none !important; }
    }
  `}</style>
);

/* ---------------- Hooks ---------------- */
function useReveal() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setInView(true); obs.unobserve(el); } }),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

const revealVariants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const Reveal = ({ children, className = "", delay = 0, as = "div" }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={revealVariants}
      transition={{ delay: delay / 1000, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Comp>
  );
};

/* ---------------- Animated number (replaces react-countup, no interop issues) ---------------- */
const AnimatedNumber = ({ end, duration = 1800, separator = ",", suffix = "" }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf, start;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * end));
      if (p < 1) raf = requestAnimationFrame(step);
      else setVal(end);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {val.toLocaleString("en-IN")}{suffix}
    </span>
  );
};

/* ---------------- Local Tilt (replaces react-parallax-tilt, no deps) ---------------- */
const Tilt = ({
  children, className = "", tiltMaxAngleX = 10, tiltMaxAngleY = 10,
  glareEnable = true, glareMaxOpacity = 0.25, transitionSpeed = 1200,
}) => {
  const ref = useRef(null);
  const [style, setStyle] = useState({ transform: "perspective(1000px) rotateX(0) rotateY(0) scale(1)" });
  const [glareStyle, setGlareStyle] = useState({ opacity: 0 });

  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * tiltMaxAngleY * 2;
    const rotateX = (0.5 - py) * tiltMaxAngleX * 2;
    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
      transition: "transform 80ms ease-out",
    });
    if (glareEnable) {
      setGlareStyle({
        background: `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,${glareMaxOpacity}), transparent 55%)`,
        opacity: 1,
      });
    }
  }, [tiltMaxAngleX, tiltMaxAngleY, glareEnable, glareMaxOpacity]);

  const onLeave = useCallback(() => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
      transition: `transform ${transitionSpeed}ms cubic-bezier(.16,1,.3,1)`,
    });
    setGlareStyle((g) => ({ ...g, opacity: 0 }));
  }, [transitionSpeed]);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative ${className}`}
      style={{ transformStyle: "preserve-3d", willChange: "transform", ...style }}
    >
      {children}
      {glareEnable && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={glareStyle}
        />
      )}
    </div>
  );
};

/* ---------------- Local Marquee (replaces react-fast-marquee, no deps) ---------------- */
const Marquee = ({ children, speed = 40, gradient = true, gradientColor = "#ffffff", gradientWidth = 80, pauseOnHover = false }) => {
  const duration = Math.max(2400 / speed, 8);
  return (
    <div
      className="relative overflow-hidden w-full"
      style={gradient ? {
        WebkitMaskImage: `linear-gradient(to right, transparent, ${gradientColor} ${gradientWidth}px, ${gradientColor} calc(100% - ${gradientWidth}px), transparent)`,
        maskImage: `linear-gradient(to right, transparent, ${gradientColor} ${gradientWidth}px, ${gradientColor} calc(100% - ${gradientWidth}px), transparent)`,
      } : undefined}
    >
      <div
        className={`flex w-max ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
        style={{ animation: `pgMarqueeScroll ${duration}s linear infinite` }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
};

/* ---------------- ECG / Vital Line signature ---------------- */
const ECG_D = "M0,40 L120,40 L145,40 L160,10 L175,70 L190,40 L230,40 L340,40 L365,20 L385,60 L405,40 L520,40 L545,40 L560,8 L578,72 L596,40 L640,40 L760,40 L785,22 L805,58 L825,40 L940,40 L965,40 L980,10 L998,70 L1016,40 L1060,40 L1180,40 L1205,20 L1225,60 L1245,40 L1400,40";

const VitalLine = ({ stroke = "var(--jade)", height = 80, glow = true }) => (
  <svg viewBox="0 0 1400 80" className="w-full" style={{ height }} preserveAspectRatio="none" aria-hidden="true">
    {glow && (
      <path d={ECG_D} fill="none" stroke={stroke} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.25" style={{ filter: "blur(6px)" }} />
    )}
    <path d={ECG_D} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="pg-ecg-path" />
  </svg>
);

/* Monitor card — the hero's signature element: a bedside vital-signs
   monitor showing a live waveform + ticking heart rate + BP reading. */
const VitalMonitorCard = () => {
  const [bpm, setBpm] = useState(72);
  useEffect(() => {
    const t = setInterval(() => setBpm((b) => 70 + Math.round(Math.sin(Date.now() / 900) * 4)), 700);
    return () => clearInterval(t);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl bg-[var(--emerald-950)] border border-white/10 shadow-2xl p-4 sm:p-5 w-full max-w-[280px]"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="flex items-center gap-1.5 text-[10px] font-mono font-semibold tracking-widest text-[var(--jade-soft)] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--jade)]" style={{ animation: "pgDotPulse 1.4s ease-in-out infinite" }} />
          Live Monitor
        </span>
        <Heart size={14} className="text-[var(--ember)]" />
      </div>
      <VitalLine height={54} />
      <div className="flex items-end justify-between mt-2">
        <div>
          <p className="font-mono font-bold text-2xl text-white leading-none">{bpm}<span className="text-xs text-white/40 ml-1">bpm</span></p>
        </div>
        <div className="text-right">
          <p className="font-mono text-[11px] text-white/50">SpO₂ <span className="text-[var(--jade-soft)] font-semibold">98%</span></p>
          <p className="font-mono text-[11px] text-white/50">BP <span className="text-[var(--amber-soft)] font-semibold">120/80</span></p>
        </div>
      </div>
    </motion.div>
  );
};

/* ---------------- Section Eyebrow ---------------- */
const Eyebrow = ({ children, tone = "teal" }) => {
  const colors = tone === "teal"
    ? "bg-[var(--emerald-900)]/5 text-[var(--emerald-800)] border-[var(--emerald-800)]/20"
    : "bg-white/10 text-white border-white/25";
  return (
    <span className={`font-mono inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase ${colors}`}>
      <Sparkles size={13} /> {children}
    </span>
  );
};

/* ================= PRELOADER ================= */
const Preloader = ({ done }) => (
  <AnimatePresence>
    {!done && (
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--emerald-950)]"
        exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
      >
        <div className="flex flex-col items-center gap-4 w-56">
          <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center">
            <Stethoscope className="text-[var(--emerald-800)]" size={28} />
          </div>
          <VitalLine height={40} />
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-white/50">Papalkar Gastrocare</p>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

/* ================= EMERGENCY BAR ================= */
const EmergencyBar = ({ visible, onClose }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-[var(--ember-dark)] text-white overflow-hidden"
      >
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-3 text-xs sm:text-sm font-medium">
          <div className="flex items-center gap-2">
            <AlertTriangle size={15} className="shrink-0" />
            <span>24/7 GI Emergency &amp; ERCP on-call — <a href={`tel:+91${PHONE_1}`} className="underline underline-offset-2 font-bold">{PHONE_1}</a></span>
          </div>
          <button onClick={onClose} aria-label="Dismiss" className="p-1 hover:bg-white/15 rounded-full transition-colors shrink-0">
            <X size={14} />
          </button>
        </div> */}
      </motion.div>
    )}
  </AnimatePresence>
);

/* ================= NAVBAR ================= */
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Doctor", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Insights", href: "#insights" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { openBooking } = useBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? "py-2 pg-glass bg-[var(--emerald-900)]/90 shadow-xl" : "py-4 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform duration-500">
            <Stethoscope className="text-[var(--emerald-800)]" size={24} />
          </div>
          <div className="leading-tight">
            <p className="font-display font-bold text-white text-base sm:text-lg tracking-tight">Papalkar Gastrocare</p>
            <p className="font-mono text-[10px] sm:text-xs text-[var(--jade-soft)]/80 tracking-[0.2em] uppercase">Hospital, Pusad</p>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="pg-navlink text-sm font-semibold text-white/90 hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href={`tel:+91${PHONE_1}`} className="pg-btn-outline flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/30 text-white text-sm font-semibold">
            <Phone size={16} /> {PHONE_1}
          </a>
          <button onClick={() => openBooking()} className="pg-btn-primary text-white text-sm font-bold px-5 py-2.5 rounded-full flex items-center gap-2">
            Book Appointment <ArrowRight size={16} />
          </button>
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden text-white p-2" aria-label="Toggle menu">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden mt-4"
          >
            <div className="mx-4 rounded-2xl bg-[var(--emerald-900)] p-5 flex flex-col gap-4 shadow-2xl">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-white/90 font-semibold text-base border-b border-white/10 pb-3 last:border-0">
                  {l.label}
                </a>
              ))}
              <a href={`tel:+91${PHONE_1}`} className="flex items-center justify-center gap-2 border border-white/30 text-white rounded-full py-3 font-semibold">
                <Phone size={16} /> Call {PHONE_1}
              </a>
              <button onClick={() => { setOpen(false); openBooking(); }} className="pg-btn-primary text-center text-white font-bold rounded-full py-3">
                Book Appointment
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

/* ================= HERO ================= */
const Hero = () => {
  const { openBooking } = useBooking();
  return (
    <section id="home" className="relative min-h-screen pg-mesh flex items-center pt-32 sm:pt-36 pb-20 overflow-hidden">
      <div className="absolute -top-20 -left-20 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[var(--jade)]/20 blur-3xl" style={{ animation: "pgFloatSlow 9s ease-in-out infinite" }} />
      <div className="absolute bottom-0 right-0 w-80 h-80 sm:w-[28rem] sm:h-[28rem] rounded-full bg-[var(--ember)]/20 blur-3xl" style={{ animation: "pgFloatSlow 12s ease-in-out infinite reverse" }} />
      <div className="absolute top-1/3 right-10 w-24 h-24 rounded-full border border-white/10" style={{ animation: "pgSpinSlow 20s linear infinite" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center w-full">
        <div>
          <Reveal><Eyebrow tone="dark">Pusad's First Gastro &amp; Liver Care Specialist</Eyebrow></Reveal>

          <Reveal delay={100}>
            <h1 className="font-display font-black text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.08] mt-6">
              Advanced <span className="pg-shimmer-text">stomach &amp; liver</span> care, closer to home
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-teal-50/85 text-base sm:text-lg mt-6 max-w-xl leading-relaxed">
              पापळकर गॅस्ट्रोकेअर हॉस्पिटल — expert diagnosis and treatment for stomach, liver,
              pancreas and intestinal disorders, led by Dr. Parag Viren Papalkar (MBBS, MD, DNB Gastroenterology).
              Advanced endoscopy, colonoscopy and ERCP, now arriving in Pusad.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 mt-9">
              <button onClick={() => openBooking()} className="pg-btn-primary text-white font-bold px-7 py-4 rounded-full flex items-center justify-center gap-2 text-sm sm:text-base">
                <Calendar size={18} /> Book an Appointment
              </button>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Papalkar Gastrocare Hospital, I would like to know more about your services.")}`}
                target="_blank" rel="noopener noreferrer"
                className="pg-btn-outline flex items-center justify-center gap-2 border border-white/30 text-white font-bold px-7 py-4 rounded-full text-sm sm:text-base"
              >
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-10 pt-8 border-t border-white/15">
              {[
                { icon: <GraduationCap size={18} />, label: "MBBS, MD, DNB Gastroenterology" },
                { icon: <Award size={18} />, label: "Fellowship: Advanced Endoscopy, ERCP & EUS" },
                { icon: <Building2 size={18} />, label: "Ex-SRM Hospital, Chennai" },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-2 text-white/85 text-xs sm:text-sm font-medium">
                  <span className="text-[var(--amber)]">{b.icon}</span> {b.label}
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative">
          <div className="relative mx-auto max-w-md">
            <Tilt glareEnable glareMaxOpacity={0.25} glareColor="#ffffff" glarePosition="all" tiltMaxAngleX={10} tiltMaxAngleY={10} className="rounded-[2rem]" transitionSpeed={1500}>
              <div className="rounded-[2rem] overflow-hidden bg-white/10 pg-glass border border-white/20 p-3 shadow-2xl">
                <img
                  src={IMG.heroDoctor}
                  alt="Dr. Parag Viren Papalkar, Gastroenterologist"
                  className="w-full h-[420px] sm:h-[480px] object-cover rounded-[1.6rem]"
                  loading="eager"
                />
              </div>
            </Tilt>

            <div
              className="absolute -left-6 sm:-left-10 top-8 bg-white rounded-2xl shadow-2xl px-5 py-4 flex items-center gap-3"
              style={{ animation: "pgFloat 6s ease-in-out infinite" }}
            >
              <div className="w-11 h-11 rounded-xl bg-[var(--emerald-800)]/10 flex items-center justify-center text-[var(--emerald-800)]">
                <Users size={20} />
              </div>
              <div>
                <p className="font-display font-bold text-lg leading-none text-[var(--ink)]">
                  <AnimatedNumber end={10000} duration={2400} suffix="+" />
                </p>
                <p className="text-[11px] text-gray-500 font-medium">Patients treated</p>
              </div>
            </div>

            <div className="absolute -right-4 sm:-right-10 bottom-6" style={{ animation: "pgFloat 7s ease-in-out infinite 1s" }}>
              <VitalMonitorCard />
            </div>
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/70 to-transparent" style={{ animation: "pgBlink 2s ease-in-out infinite" }} />
      </div>
    </section>
  );
};

/* ================= TRUST MARQUEE ================= */
const TRUST_ITEMS = [
  "MBBS, MD, DNB Gastroenterology", "Fellowship in Advanced Endoscopy", "ERCP & EUS Certified",
  "Ex-SRM Hospital, Chennai", "Ex-Nair Hospital, Mumbai", "10,000+ Patients Treated", "5,000+ Endoscopies",
];
const TrustMarquee = () => (
  <div className="bg-white border-y border-black/5 py-4">
    <Marquee gradient gradientColor="#ffffff" gradientWidth={80} speed={38} pauseOnHover>
      {TRUST_ITEMS.map((t, i) => (
        <div key={i} className="flex items-center gap-2 mx-8 text-[var(--emerald-800)]">
          <BadgeCheck size={16} className="text-[var(--jade)]" />
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-wide uppercase whitespace-nowrap">{t}</span>
        </div>
      ))}
    </Marquee>
  </div>
);

/* ================= STATS BAR ================= */
const STATS = [
  { icon: <Award size={22} />, value: 12, suffix: "+", label: "Years of clinical experience" },
  { icon: <Users size={22} />, value: 10000, suffix: "+", label: "Patients treated" },
  { icon: <Microscope size={22} />, value: 5000, suffix: "+", label: "Endoscopy procedures" },
  { icon: <Star size={22} />, value: 98, suffix: "%", label: "Patient satisfaction" },
];

const StatsBar = () => {
  const [ref, inView] = useReveal();
  return (
    <section className="relative mt-35 z-10">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -translate-y-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 bg-white rounded-[1.75rem] shadow-2xl p-6 sm:p-8 border border-black/5">
          {STATS.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-2 sm:gap-3 group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[var(--emerald-800)]/8 text-[var(--emerald-800)] flex items-center justify-center group-hover:bg-[var(--emerald-800)] group-hover:text-white transition-colors duration-500 group-hover:-translate-y-1">
                {s.icon}
              </div>
              <p className="font-display font-black text-2xl sm:text-3xl text-[var(--ink)]">
                <AnimatedNumber end={s.value} duration={1800} suffix={s.suffix} />
              </p>
              <p className="text-xs sm:text-sm text-gray-500 font-medium leading-tight">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ================= ABOUT DOCTOR ================= */
const TIMELINE = [
  { year: "SRM Hospital", place: "Chennai", text: "Served as Consultant — Gastroenterology, Hepatology & Advanced Endoscopy at a leading multi-speciality institute." },
  { year: "Endoscopy Training", place: "Kolhapur", text: "Specialised training in advanced endoscopic procedures at a hospital dedicated exclusively to gastroenterology care." },
  { year: "Nair Hospital", place: "Mumbai", text: "Distinguished service at one of Mumbai's most respected government hospitals, treating complex gastro-liver cases." },
];

const About = () => {
  return (
    <section id="about" className="py-24 sm:py-32 bg-[var(--porcelain)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative max-w-md mx-auto">
            <Tilt glareEnable glareMaxOpacity={0.2} tiltMaxAngleX={7} tiltMaxAngleY={7} className="rounded-[2rem]" transitionSpeed={1500}>
              <div className="rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                <img src={IMG.consultRoom} alt="Doctor consultation room" className="w-full h-[420px] sm:h-[500px] object-cover" loading="lazy" />
              </div>
            </Tilt>
            <div className="absolute -bottom-8 -right-4 sm:-right-10 bg-[var(--emerald-800)] text-white rounded-2xl shadow-2xl px-6 py-5 max-w-[220px]" style={{ animation: "pgFloat 6.5s ease-in-out infinite" }}>
              <GraduationCap size={22} className="text-[var(--amber)] mb-2" />
              <p className="font-display font-bold text-sm leading-snug">MBBS, MD (Medicine), DNB Gastroenterology</p>
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal><Eyebrow>Meet Your Specialist</Eyebrow></Reveal>
          <Reveal delay={100}>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[var(--ink)] mt-5 leading-tight">
              <span className="pg-underline pg-in">Dr. Parag Viren Papalkar</span>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-gray-600 text-base sm:text-lg mt-6 leading-relaxed">
              A dedicated gastroenterologist and hepatologist bringing tertiary-hospital expertise to Pusad.
              Trained across India's leading institutions, Dr. Papalkar specialises in diagnosing and treating
              disorders of the stomach, liver, pancreas and intestines using the latest endoscopic technology —
              so patients no longer need to travel to a metro city for advanced gastro care.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="grid sm:grid-cols-2 gap-3 mt-8">
              {[
                "Fellowship in Advanced Endoscopy, ERCP & EUS",
                "Expert in liver disease & pancreatic disorders",
                "GI bleeding & foreign body retrieval specialist",
                "GI cancer screening & early detection",
              ].map((t, i) => (
                <div key={i} className="flex items-start gap-2.5 bg-white rounded-xl p-3.5 shadow-sm border border-black/5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                  <CheckCircle2 size={18} className="text-[var(--jade)] mt-0.5 shrink-0" />
                  <span className="text-sm font-medium text-gray-700">{t}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={250}>
            <div className="mt-10 space-y-5">
              {TIMELINE.map((t, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-[var(--ember)] group-hover:scale-125 transition-transform" />
                    {i < TIMELINE.length - 1 && <div className="w-px flex-1 bg-gray-300 my-1" />}
                  </div>
                  <div className="pb-5">
                    <p className="font-display font-bold text-[var(--ink)] text-sm sm:text-base">{t.year} <span className="text-gray-400 font-normal">— {t.place}</span></p>
                    <p className="text-gray-500 text-sm mt-1 leading-relaxed">{t.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

/* ================= TEAM ================= */
const TEAM = [
  { img: IMG.team2, name: "Dr. Meena Singh", role: "Gastroenterologist & Hepatologist" },
  { img: IMG.team1, name: "Sr. Nursing Staff", role: "Endoscopy & Patient Care" },
  { img: IMG.team3, name: "Lab & Diagnostics Team", role: "Pathology and Imaging" },
];

const Team = () => (
  <section className="py-20 sm:py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto">
        <Reveal><Eyebrow>Care Team</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[var(--ink)] mt-5">The people behind your care</h2>
        </Reveal>
      </div>
      <div className="grid sm:grid-cols-3 gap-6 sm:gap-7 mt-14">
        {TEAM.map((m, i) => (
          <Reveal key={i} delay={i * 100}>
            <Tilt glareEnable glareMaxOpacity={0.15} tiltMaxAngleX={6} tiltMaxAngleY={6} transitionSpeed={1200} className="rounded-3xl h-full">
              <div className="rounded-3xl overflow-hidden bg-[var(--porcelain)] border border-black/5 shadow-sm h-full group">
                <div className="overflow-hidden">
                  <img src={m.img} alt={m.name} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                </div>
                <div className="p-5">
                  <p className="font-display font-bold text-lg text-[var(--ink)]">{m.name}</p>
                  <p className="text-sm text-gray-500 mt-1">{m.role}</p>
                </div>
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ================= SERVICES ================= */
const SERVICES = [
  { icon: <Microscope size={26} />, title: "Endoscopy", desc: "Precise diagnosis of upper GI conditions using advanced video endoscopy." },
  { icon: <Activity size={26} />, title: "Colonoscopy", desc: "Comprehensive colon screening for early detection of intestinal disease." },
  { icon: <Syringe size={26} />, title: "ERCP Procedure", desc: "Minimally invasive removal of bile duct (CBD) stones with expert precision." },
  { icon: <Heart size={26} />, title: "Pancreas Care", desc: "Specialised diagnosis and treatment for pancreatic disorders." },
  { icon: <ShieldCheck size={26} />, title: "Liver Disease", desc: "Diagnosis & treatment for alcohol-related and other liver conditions." },
  { icon: <Stethoscope size={26} />, title: "Acidity Treatment", desc: "Complete evaluation and care for acid-reflux and gastric disorders." },
  { icon: <Activity size={26} />, title: "GI Bleeding Care", desc: "Urgent diagnosis and management of vomiting blood or blood in stool." },
  { icon: <Microscope size={26} />, title: "GI Cancer Screening", desc: "Early detection and treatment for food-pipe, stomach & intestinal cancers." },
  { icon: <Syringe size={26} />, title: "Foreign Body Removal", desc: "Safe, quick endoscopic retrieval of accidentally swallowed objects." },
];

const Services = () => {
  const { openBooking } = useBooking();
  return (
    <section id="services" className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal><Eyebrow>Available Facilities</Eyebrow></Reveal>
          <Reveal delay={100}>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[var(--ink)] mt-5">
              Complete gastro &amp; liver care, <span className="text-[var(--ember)]">under one roof</span>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-gray-500 mt-5 text-base sm:text-lg">
              From routine endoscopy to advanced ERCP procedures — every service is delivered with
              tertiary-hospital precision, right here in Pusad.
            </p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mt-16">
          {SERVICES.map((s, i) => (
            <Reveal key={i} delay={(i % 3) * 100}>
              <Tilt glareEnable glareMaxOpacity={0.12} tiltMaxAngleX={8} tiltMaxAngleY={8} transitionSpeed={1200} className="h-full rounded-3xl">
                <div className="h-full bg-[var(--porcelain)] rounded-3xl p-7 sm:p-8 border border-black/5 hover:border-[var(--jade)]/40 group transition-colors duration-500">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--emerald-800)] text-white flex items-center justify-center mb-6 group-hover:bg-[var(--ember)] group-hover:rotate-6 transition-all duration-500">
                    {s.icon}
                  </div>
                  <h3 className="font-display font-bold text-xl text-[var(--ink)]">{s.title}</h3>
                  <p className="text-gray-500 text-sm mt-3 leading-relaxed">{s.desc}</p>
                  <button onClick={() => openBooking(s.title)} className="inline-flex items-center gap-1.5 text-[var(--emerald-800)] font-semibold text-sm mt-5 group-hover:gap-2.5 transition-all">
                    Enquire now <ArrowUpRight size={16} />
                  </button>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ================= WHY CHOOSE US ================= */
const WHY = [
  { icon: <Award size={24} />, title: "Metro-city expertise", desc: "Training from SRM Chennai, Kolhapur & Nair Hospital Mumbai, brought to Pusad." },
  { icon: <Building2 size={24} />, title: "Modern infrastructure", desc: "A purpose-built facility equipped for advanced diagnostic & endoscopic care." },
  { icon: <ShieldCheck size={24} />, title: "Safety-first protocols", desc: "Strict sterilisation and safety standards for every procedure, every time." },
  { icon: <Clock size={24} />, title: "Timely appointments", desc: "Minimal wait times with a streamlined consultation and reporting process." },
];

const WhyUs = () => {
  const { openBooking } = useBooking();
  return (
    <section className="py-24 sm:py-32 relative pg-mesh overflow-hidden">
      <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.9fr,1.1fr] gap-16 items-center">
          <div>
            <Reveal><Eyebrow tone="dark">Why Choose Us</Eyebrow></Reveal>
            <Reveal delay={100}>
              <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white mt-5 leading-tight">
                Trusted gastro care, <span className="pg-shimmer-text">right in Pusad</span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="text-teal-50/75 mt-6 text-base sm:text-lg leading-relaxed">
                We bring the diagnostic precision and treatment standards of a metro-city gastroenterology
                department to your neighbourhood — no need to travel for advanced digestive care.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <button onClick={() => openBooking()} className="pg-btn-primary inline-flex items-center gap-2 text-white font-bold px-7 py-4 rounded-full mt-8 text-sm sm:text-base">
                Schedule a Visit <ArrowRight size={18} />
              </button>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {WHY.map((w, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="bg-white/10 pg-glass border border-white/15 rounded-2xl p-6 h-full hover:bg-white/15 hover:-translate-y-1.5 transition-all duration-500">
                  <div className="w-12 h-12 rounded-xl bg-[var(--amber)]/20 text-[var(--amber)] flex items-center justify-center mb-4">{w.icon}</div>
                  <h3 className="font-display font-bold text-white text-lg">{w.title}</h3>
                  <p className="text-teal-50/70 text-sm mt-2 leading-relaxed">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ================= GALLERY (Swiper coverflow) ================= */
const GALLERY_IMAGES = [
  { src: IMG.building, label: "Hospital building" },
  { src: IMG.reception, label: "Reception" },
  { src: IMG.ward, label: "Patient ward" },
  { src: IMG.equipment, label: "Endoscopy suite" },
  { src: IMG.corridor, label: "Hospital corridor" },
  { src: IMG.lab, label: "Diagnostic lab" },
  { src: IMG.operationTheatre, label: "Procedure room" },
];

const Gallery = () => (
  <section id="gallery" className="py-24 sm:py-32 bg-[var(--porcelain)] overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto">
        <Reveal><Eyebrow>Inside the Hospital</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[var(--ink)] mt-5">
            A closer look at our facility
          </h2>
        </Reveal>
      </div>
    </div>

    <Reveal delay={150}>
      <div className="mt-16 pg-swiper">
        <Swiper
          modules={[EffectCoverflow, Autoplay, Pagination]}
          effect="coverflow"
          grabCursor
          centeredSlides
          loop
          slidesPerView="auto"
          coverflowEffect={{ rotate: 22, stretch: 0, depth: 160, modifier: 1.4, slideShadows: false }}
          autoplay={{ delay: 2600, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="!pb-14"
        >
          {GALLERY_IMAGES.map((g, i) => (
            <SwiperSlide key={i} style={{ width: "300px", maxWidth: "80vw" }}>
              <div className="group relative rounded-3xl overflow-hidden shadow-xl h-[400px]">
                <img src={g.src} alt={g.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <p className="absolute bottom-5 left-5 text-white font-display font-bold text-lg">{g.label}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Reveal>
  </section>
);

/* ================= VIDEO ================= */
const VideoSection = () => {
  const [playing, setPlaying] = useState(false);
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Reveal><Eyebrow>Watch &amp; Know</Eyebrow></Reveal>
          <Reveal delay={100}>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[var(--ink)] mt-5">Take a video tour of Papalkar Gastrocare</h2>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-video bg-black group">
            {!playing ? (
              <>
                <img src={IMG.videoPoster} alt="Hospital video preview" className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-500" loading="lazy" />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center"
                  aria-label="Play hospital tour video"
                >
                  <span className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/90 flex items-center justify-center shadow-2xl">
                    <PlayCircle size={44} className="text-[var(--ember)]" />
                  </span>
                </motion.button>
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="font-display font-bold text-lg sm:text-xl">Papalkar Gastrocare Hospital — Facility Walkthrough</p>
                  <p className="text-white/70 text-sm">2:14 min</p>
                </div>
              </>
            ) : (
              <video
                className="w-full h-full object-cover"
                controls
                autoPlay
                poster={IMG.videoPoster}
                src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
              >
              </video>
            )}
          </div>
          <p className="text-center text-xs text-gray-400 mt-3">Demo video shown above — replace with the hospital's actual facility-tour footage.</p>
        </Reveal>
      </div>
    </section>
  );
};

/* ================= HEALTH INSIGHTS (new, makes the site bigger/richer) ================= */
const INSIGHTS = [
  { img: IMG.tip1, icon: <Droplet size={16} />, tag: "Acidity & GERD", title: "5 everyday habits that trigger acid reflux", desc: "Late-night meals, excess caffeine and certain postures can quietly worsen reflux — here's what to watch for." },
  { img: IMG.tip2, icon: <ShieldCheck size={16} />, tag: "Liver Health", title: "Early warning signs of liver disease", desc: "Fatigue, appetite loss and skin changes can be early liver signals — early screening changes outcomes." },
  { img: IMG.tip3, icon: <Salad size={16} />, tag: "Nutrition", title: "A gut-friendly diet after your endoscopy", desc: "What to eat and avoid in the days following an endoscopy or colonoscopy for a smooth recovery." },
];

const Insights = () => (
  <section id="insights" className="py-24 sm:py-32 bg-[var(--porcelain-2)]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div className="max-w-xl">
          <Reveal><Eyebrow>Health Insights</Eyebrow></Reveal>
          <Reveal delay={100}>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[var(--ink)] mt-5">Understanding your digestive health</h2>
          </Reveal>
        </div>
        <Reveal delay={150}>
          <p className="text-gray-500 text-sm sm:text-base max-w-sm flex items-center gap-2">
            <BookOpen size={16} className="text-[var(--emerald-800)] shrink-0" />
            Practical, doctor-reviewed guidance shared during consultations.
          </p>
        </Reveal>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mt-14">
        {INSIGHTS.map((a, i) => (
          <Reveal key={i} delay={i * 100}>
            <div className="bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 h-full group">
              <div className="overflow-hidden h-48">
                <img src={a.img} alt={a.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
              </div>
              <div className="p-6">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-widest text-[var(--ember)]">
                  {a.icon} {a.tag}
                </span>
                <h3 className="font-display font-bold text-lg text-[var(--ink)] mt-3 leading-snug">{a.title}</h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{a.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ================= TESTIMONIALS (Swiper) ================= */
const TESTIMONIALS = [
  { name: "Satisfied Patient", role: "Treated for acidity & GERD", quote: "The care and explanation I received here felt like a big-city hospital, but close to home. The endoscopy was quick and painless.", rating: 5 },
  { name: "Satisfied Patient", role: "ERCP procedure", quote: "I was nervous about the ERCP procedure, but Dr. Papalkar and the team explained every step. Recovery was smooth and quick.", rating: 5 },
  { name: "Satisfied Patient", role: "Liver consultation", quote: "Finally a specialist for liver problems in Pusad. No need to travel to another city for proper diagnosis and treatment.", rating: 5 },
  { name: "Satisfied Patient", role: "Colonoscopy screening", quote: "Professional staff, clean facility, and a doctor who genuinely listens. Highly recommend for any stomach related issue.", rating: 5 },
];

const Testimonials = () => (
  <section id="testimonials" className="py-24 sm:py-32 bg-white overflow-hidden">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <Reveal><Eyebrow>Patient Stories</Eyebrow></Reveal>
      <Reveal delay={100}>
        <h2 className="font-display font-black text-3xl sm:text-4xl text-[var(--ink)] mt-5">What our patients say</h2>
      </Reveal>

      <Reveal delay={150}>
        <div className="relative mt-14 pg-swiper">
          <Quote size={54} className="text-[var(--jade)]/20 mx-auto" />
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            className="!pb-12 mt-4"
          >
            {TESTIMONIALS.map((t, i) => (
              <SwiperSlide key={i}>
                <p className="font-display text-lg sm:text-2xl text-[var(--ink)] leading-relaxed min-h-[110px]">"{t.quote}"</p>
                <div className="flex items-center justify-center gap-1 mt-5">
                  {Array.from({ length: t.rating }).map((_, s) => <Star key={s} size={16} className="fill-[var(--amber)] text-[var(--amber)]" />)}
                </div>
                <p className="mt-3 font-semibold text-[var(--ink)]">{t.name}</p>
                <p className="text-sm text-gray-400">{t.role}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ================= JOURNEY / PROCESS ================= */
const JOURNEY = [
  { title: "Book your visit", desc: "Call, WhatsApp, or fill the form below to schedule your consultation." },
  { title: "Meet the doctor", desc: "A detailed consultation to understand your symptoms and history." },
  { title: "Diagnosis & tests", desc: "Advanced endoscopy, colonoscopy or lab tests as required." },
  { title: "Personalised treatment", desc: "A clear treatment plan explained in simple terms, with follow-up care." },
];

const Journey = () => (
  <section className="py-24 sm:py-32 bg-[var(--porcelain-2)]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto">
        <Reveal><Eyebrow>Your Treatment Journey</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[var(--ink)] mt-5">Simple, transparent, patient-first</h2>
        </Reveal>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 relative">
        <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        {JOURNEY.map((j, i) => (
          <Reveal key={i} delay={i * 120}>
            <div className="relative bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-black/5 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 h-full">
              <div className="w-14 h-14 rounded-2xl bg-[var(--emerald-800)] text-white font-display font-black text-lg flex items-center justify-center mb-5">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-display font-bold text-lg text-[var(--ink)]">{j.title}</h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">{j.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ================= FAQ ================= */
const FAQS = [
  { q: "Do I need a prior appointment for a consultation?", a: "Walk-ins are welcome, but we recommend calling or WhatsApping us in advance so we can minimise your waiting time." },
  { q: "Is fasting required before an endoscopy or colonoscopy?", a: "Yes, specific fasting and preparation instructions apply. Our team will share detailed pre-procedure guidelines once your appointment is confirmed." },
  { q: "Do you treat liver disease caused by alcohol use?", a: "Yes, Dr. Papalkar specialises in diagnosing and treating alcohol-related and other forms of liver disease." },
  { q: "Is the ERCP procedure done at your hospital?", a: "Yes, ERCP for bile duct (CBD) stone removal is available with advanced endoscopic equipment and expert care." },
  { q: "How do I get my reports after a procedure?", a: "Reports are shared directly with you and explained in a follow-up consultation with the doctor." },
];

const FAQ = () => {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="py-24 sm:py-32 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Reveal><Eyebrow>Common Questions</Eyebrow></Reveal>
          <Reveal delay={100}>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[var(--ink)] mt-5">Frequently asked questions</h2>
          </Reveal>
        </div>

        <div className="mt-14 space-y-4">
          {FAQS.map((f, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className={`rounded-2xl border transition-all duration-400 overflow-hidden ${open === i ? "border-[var(--jade)]/50 bg-[var(--porcelain)]" : "border-black/10"}`}>
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                >
                  <span className="font-display font-semibold text-[var(--ink)] text-base sm:text-lg">{f.q}</span>
                  <ChevronDown size={20} className={`shrink-0 text-[var(--emerald-800)] transition-transform duration-400 ${open === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 sm:px-6 pb-6 text-gray-500 text-sm sm:text-base leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ================= LOCATION ================= */
const Location = () => (
  <section className="py-24 sm:py-32 bg-[var(--porcelain-2)]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-stretch">
      <Reveal>
        <div className="h-full min-h-[320px] rounded-3xl overflow-hidden shadow-xl border border-black/5">
          <iframe
            title="Papalkar Gastrocare Hospital location map"
            className="w-full h-full min-h-[320px]"
            loading="lazy"
            src="https://www.google.com/maps?q=Pusad+Maharashtra&output=embed"
          />
        </div>
      </Reveal>

      <Reveal delay={100}>
        <div className="h-full flex flex-col justify-center bg-[var(--emerald-800)] rounded-3xl p-8 sm:p-10 text-white">
          <Eyebrow tone="dark">Visit Us</Eyebrow>
          <h2 className="font-display font-black text-3xl mt-5">Find us in Pusad</h2>
          <div className="space-y-5 mt-8">
            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-[var(--amber)] mt-0.5 shrink-0" />
              <p className="text-teal-50/85 text-sm sm:text-base">जुने पापळकर हॉस्पिटल, टीव्ही सेंटर समोर, तलाव लेआउट, पुसद</p>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={20} className="text-[var(--amber)] mt-0.5 shrink-0" />
              <p className="text-teal-50/85 text-sm sm:text-base">{PHONE_1} &nbsp;/&nbsp; {PHONE_2}</p>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={20} className="text-[var(--amber)] mt-0.5 shrink-0" />
              <p className="text-teal-50/85 text-sm sm:text-base">Mon – Sat: 9:00 AM – 8:00 PM &nbsp;|&nbsp; Sun: Emergency only</p>
            </div>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello, I need directions to Papalkar Gastrocare Hospital.")}`}
            target="_blank" rel="noopener noreferrer"
            className="pg-btn-primary inline-flex items-center gap-2 text-white font-bold px-6 py-3.5 rounded-full mt-9 w-fit text-sm"
          >
            <MessageCircle size={17} /> Get Directions on WhatsApp
          </a>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ================= BOOKING FORM (shared by modal + contact section) ================= */
const SERVICE_OPTIONS = [
  "General Consultation", "Endoscopy", "Colonoscopy", "ERCP Procedure",
  "Liver Disease Treatment", "Pancreas Care", "Acidity / GERD Treatment", "Other",
];

const schema = yup.object({
  name: yup.string().trim().required("Please enter your name."),
  phone: yup.string().trim().matches(/^\d{10}$/, "Enter a valid 10-digit phone number.").required("Enter a valid 10-digit phone number."),
  service: yup.string().required(),
  date: yup.string().nullable(),
  message: yup.string().nullable(),
});

const BookingForm = ({ compact = false, presetService, onSent }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: "", phone: "", service: presetService || SERVICE_OPTIONS[0], date: "", message: "" },
  });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (form) => {
    setSubmitting(true);
    const lines = [
      "*New Appointment Request — Papalkar Gastrocare Hospital*",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Service: ${form.service}`,
      form.date ? `Preferred Date: ${form.date}` : null,
      form.message ? `Message: ${form.message}` : null,
    ].filter(Boolean);
    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer");
    toast.success("Opening WhatsApp with your request…", { icon: "✅" });
    reset();
    setSubmitting(false);
    onSent?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={compact ? "" : "bg-white rounded-[2rem] shadow-2xl p-6 sm:p-9"}>
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide font-mono">Full Name</label>
          <input
            {...register("name")}
            type="text" placeholder="Your full name"
            className={`w-full mt-2 rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-[var(--jade)]/40 ${errors.name ? "border-red-400" : "border-gray-200 focus:border-[var(--jade)]"}`}
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide font-mono">Phone Number</label>
          <input
            {...register("phone")}
            type="tel" placeholder="10-digit mobile number"
            className={`w-full mt-2 rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-[var(--jade)]/40 ${errors.phone ? "border-red-400" : "border-gray-200 focus:border-[var(--jade)]"}`}
          />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide font-mono">Preferred Date</label>
          <input
            {...register("date")}
            type="date"
            className="w-full mt-2 rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[var(--jade)] focus:ring-2 focus:ring-[var(--jade)]/40 transition-all duration-300"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide font-mono">Service Needed</label>
          <select
            {...register("service")}
            defaultValue={presetService || SERVICE_OPTIONS[0]}
            className="w-full mt-2 rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[var(--jade)] focus:ring-2 focus:ring-[var(--jade)]/40 transition-all duration-300 bg-white"
          >
            {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide font-mono">Message (optional)</label>
          <textarea
            {...register("message")}
            rows={compact ? 2 : 3} placeholder="Tell us briefly about your symptoms or concern"
            className="w-full mt-2 rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[var(--jade)] focus:ring-2 focus:ring-[var(--jade)]/40 transition-all duration-300 resize-none"
          />
        </div>
      </div>

      <button type="submit" disabled={submitting} className="pg-btn-primary w-full mt-7 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-70">
        {submitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />} Send via WhatsApp
      </button>

      <p className="text-center text-[11px] text-gray-400 mt-3">
        Submitting opens WhatsApp with your details pre-filled, sent to {PHONE_1}.
      </p>
    </form>
  );
};

/* ================= CONTACT SECTION ================= */
const Contact = () => (
  <section id="contact" className="py-24 sm:py-32 relative pg-mesh overflow-hidden">
    <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[var(--ember)]/15 blur-3xl" />
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[0.85fr,1.15fr] gap-14 items-center relative">
      <div>
        <Reveal><Eyebrow tone="dark">Book Your Visit</Eyebrow></Reveal>
        <Reveal delay={100}>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white mt-5 leading-tight">
            Let's take care of your <span className="pg-shimmer-text">stomach &amp; liver health</span>
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="text-teal-50/75 mt-6 text-base leading-relaxed">
            Fill the form and we'll receive your details instantly on WhatsApp — our team will confirm
            your appointment shortly. You can also call us directly.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="flex flex-col gap-4 mt-8">
            <a href={`tel:+91${PHONE_1}`} className="flex items-center gap-3 text-white group">
              <span className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[var(--amber)] group-hover:text-[var(--emerald-800)] transition-colors"><Phone size={18} /></span>
              <span className="font-semibold">{PHONE_1} / {PHONE_2}</span>
            </a>
            <div className="flex items-center gap-3 text-white">
              <span className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center"><MapPin size={18} /></span>
              <span className="font-medium text-sm text-teal-50/85">जुने पापळकर हॉस्पिटल, टीव्ही सेंटर समोर, तलाव लेआउट, पुसद</span>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={150}>
        <BookingForm />
      </Reveal>
    </div>
  </section>
);

/* ================= FOOTER ================= */
const Footer = () => (
  <footer className="bg-[var(--emerald-950)] text-teal-50/80 pt-20 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
      <div>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center">
            <Stethoscope className="text-[var(--emerald-800)]" size={22} />
          </div>
          <p className="font-display font-bold text-white text-lg">Papalkar Gastrocare</p>
        </div>
        <p className="text-sm mt-4 leading-relaxed text-teal-50/60">
          Pusad's specialist hospital for stomach, liver, pancreas and intestinal care — पोट स्वस्थ, आयुष्य मस्त.
        </p>
      </div>

      <div>
        <p className="font-display font-bold text-white mb-4">Quick Links</p>
        <ul className="space-y-2.5 text-sm">
          {NAV_LINKS.map((l) => (
            <li key={l.href}><a href={l.href} className="hover:text-white transition-colors">{l.label}</a></li>
          ))}
        </ul>
      </div>

      <div>
        <p className="font-display font-bold text-white mb-4">Services</p>
        <ul className="space-y-2.5 text-sm">
          {SERVICES.slice(0, 5).map((s) => <li key={s.title}><a href="#services" className="hover:text-white transition-colors">{s.title}</a></li>)}
        </ul>
      </div>

      <div>
        <p className="font-display font-bold text-white mb-4">Contact</p>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0" /> जुने पापळकर हॉस्पिटल, टीव्ही सेंटर समोर, तलाव लेआउट, पुसद</li>
          <li className="flex items-center gap-2"><Phone size={16} /> {PHONE_1} / {PHONE_2}</li>
        </ul>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-teal-50/50">
      <p>© {new Date().getFullYear()} Papalkar Gastrocare Hospital. All rights reserved.</p>
      <p>Designed with care for better digestive health.</p>
    </div>
  </footer>
);

/* ================= FLOATING BUTTONS ================= */
const WhatsAppFloat = () => (
  <a
    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Papalkar Gastrocare Hospital, I would like to book an appointment.")}`}
    target="_blank" rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform duration-300"
    aria-label="Chat on WhatsApp"
  >
    <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60" style={{ animation: "pgPing 2.4s cubic-bezier(0,0,.2,1) infinite" }} />
    <MessageCircle size={28} className="text-white relative" />
  </a>
);

const BackToTop = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-[var(--emerald-800)] text-white flex items-center justify-center shadow-xl hover:-translate-y-1 transition-transform"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

/* ================= BOOKING MODAL ================= */
const BookingModal = () => {
  const { isOpen, closeBooking, presetService } = useBooking();
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-[var(--emerald-950)]/70 pg-glass"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeBooking}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto pg-scrollbar"
          >
            <div className="sticky top-0 bg-white/95 pg-glass flex items-center justify-between px-6 sm:px-8 pt-6 sm:pt-7 pb-4 border-b border-black/5 z-10">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--jade)] font-bold">Book Appointment</p>
                <h3 className="font-display font-black text-xl sm:text-2xl text-[var(--ink)] mt-1">We'll confirm on WhatsApp</h3>
              </div>
              <button onClick={closeBooking} aria-label="Close" className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors shrink-0">
                <X size={18} />
              </button>
            </div>
            <div className="px-6 sm:px-8 pb-8 pt-5">
              <BookingForm compact presetService={presetService} onSent={closeBooking} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ================= APP ================= */
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [emergencyVisible, setEmergencyVisible] = useState(true);
  const [booking, setBooking] = useState({ isOpen: false, presetService: undefined });

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1100);
    return () => clearTimeout(t);
  }, []);

  const openBooking = useCallback((service) => setBooking({ isOpen: true, presetService: service }), []);
  const closeBooking = useCallback(() => setBooking((b) => ({ ...b, isOpen: false })), []);

  const bookingValue = useMemo(
    () => ({ isOpen: booking.isOpen, presetService: booking.presetService, openBooking, closeBooking }),
    [booking, openBooking, closeBooking]
  );

  return (
    <BookingContext.Provider value={bookingValue}>
      <div className="pg-root">
        <GlobalStyle />
        <Preloader done={loaded} />
        <Toaster position="top-center" toastOptions={{ style: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "14px" } }} />
        <EmergencyBar visible={emergencyVisible} onClose={() => setEmergencyVisible(false)} />
        <Navbar />
        <Hero />
        <TrustMarquee />
        <StatsBar />
        <About />
        <Team />
        <Services />
        <WhyUs />
        <Gallery />
        <VideoSection />
        <Insights />
        <Testimonials />
        <Journey />
        <FAQ />
        <Location />
        <Contact />
        <Footer />
        <WhatsAppFloat />
        <BackToTop />
        <BookingModal />
      </div>
    </BookingContext.Provider>
  );
}