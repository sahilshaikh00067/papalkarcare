import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  HeartPulse,
  GraduationCap,
  Users,
  ShieldCheck,
  Sparkles,
  Search,
  Quote,
  Star,
  Send,
  Building2,
  Stethoscope,
  ChevronDown,
  ChevronUp,
  Info,
  UploadCloud,
  User,
  Phone,
  Mail,
  Layers,
  CheckCircle2,
} from "lucide-react";

/* ============================================================
   Same design language as Home: Ink navy / Royal / Teal / Gold
   Fraunces display + Inter body + glass + reveal-on-scroll
   ============================================================ */

const STATS = [
  { icon: Building2, value: "40+", label: "Team Members" },
  { icon: Stethoscope, value: "12+", label: "Departments" },
  { icon: Users, value: "3–4", label: "Decades of Legacy" },
  { icon: ShieldCheck, value: "98%", label: "Employee Satisfaction" },
];

const PERKS = [
  { icon: HeartPulse, title: "Health & Wellness", desc: "Comprehensive medical coverage for you and your family, plus regular wellness checkups." },
  { icon: GraduationCap, title: "Learning & Growth", desc: "Sponsored certifications, CMEs, and structured career progression for every role." },
  { icon: Users, title: "Collaborative Culture", desc: "Work alongside senior specialists in a supportive, patient-first environment." },
  { icon: ShieldCheck, title: "Job Security", desc: "A stable, decades-old institution with long-term growth and steady opportunities." },
];

const DEPARTMENTS = ["All", "Cardiology", "Neurology", "Nursing", "Administration", "Diagnostics"];

const JOBS = [
  { title: "Cardiologist Consultant", dept: "Cardiology", location: "Pusad, MH", type: "Full-time" },
  { title: "Staff Nurse (ICU)", dept: "Nursing", location: "Pusad, MH", type: "Full-time" },
  { title: "Neuro Physician", dept: "Neurology", location: "Pusad, MH", type: "Full-time" },
  { title: "Front Desk Executive", dept: "Administration", location: "Pusad, MH", type: "Full-time" },
  { title: "Radiology Technician", dept: "Diagnostics", location: "Pusad, MH", type: "Full-time" },
  { title: "OT Nurse", dept: "Nursing", location: "Pusad, MH", type: "Part-time" },
];

const VACANCIES = [
  {
    title: "Cardiologist Consultant",
    dept: "Cardiology",
    qualification: "MD/DM Cardiology with 5+ years of clinical experience in interventional procedures.",
    jobDetails: "Lead the cardiology department, manage OPD consultations, and oversee catheterization lab procedures.",
    vacancy: 1,
  },
  {
    title: "Staff Nurse (ICU)",
    dept: "Nursing",
    qualification: "B.Sc Nursing / GNM with critical care certification preferred.",
    jobDetails: "Provide round-the-clock patient monitoring and care within the intensive care unit.",
    vacancy: 3,
  },
  {
    title: "Neuro Physician",
    dept: "Neurology",
    qualification: "MD/DM Neurology with strong diagnostic and patient-management skills.",
    jobDetails: "Handle neurology OPD, inpatient rounds, and coordinate with diagnostics for patient care plans.",
    vacancy: 1,
  },
  {
    title: "Front Desk Executive",
    dept: "Administration",
    qualification: "Graduate with excellent communication skills and prior hospital front-office experience.",
    jobDetails: "Manage patient registration, appointment scheduling, and front-desk coordination.",
    vacancy: 2,
  },
  {
    title: "Radiology Technician",
    dept: "Diagnostics",
    qualification: "Diploma/B.Sc in Radiology & Imaging Technology.",
    jobDetails: "Operate imaging equipment, assist radiologists, and maintain diagnostic reports.",
    vacancy: 2,
  },
];

const TESTIMONIALS = [
  { name: "Dr. Aruna Papalkar", role: "Neurologist, 6 yrs", quote: "The support system here lets me focus entirely on patient care — I've grown more in three years than anywhere else." },
  { name: "Sneha Kale", role: "Staff Nurse, 3 yrs", quote: "From day one it felt like family. Management genuinely invests in our training and wellbeing." },
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

/* ----------------------------- VACANCY ACCORDION ITEM ----------------------------- */

function VacancyItem({ job, isOpen, onToggle }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-lg bg-white">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 bg-gradient-to-r from-[#0B3D66] to-[#17B9A6] text-white text-left transition-opacity hover:opacity-95"
      >
        <span className="font-semibold text-sm sm:text-base font-serif-display">{job.title}</span>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      <div
        className={`grid transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 py-5 space-y-4">
            <div className="flex gap-3">
              <GraduationCap size={18} className="text-[#17B9A6] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-slate-800">Qualification:</p>
                <p className="text-sm text-slate-500 leading-relaxed">{job.qualification}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Info size={18} className="text-[#17B9A6] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-slate-800">Job details:</p>
                <p className="text-sm text-slate-500 leading-relaxed">{job.jobDetails}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Users size={18} className="text-[#17B9A6] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-slate-800">No. of vacancy:</p>
                <p className="text-sm text-slate-500 leading-relaxed">{job.vacancy}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- VACANCY LIST + APPLICATION FORM SECTION ----------------------------- */

function VacancySection() {
  const [openIndex, setOpenIndex] = useState(0);
  const [form, setForm] = useState({
    department: "",
    name: "",
    phone: "",
    email: "",
    experience: "",
    fileName: "",
    note: "",
    captcha: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) setForm((f) => ({ ...f, fileName: file.name }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email || !form.department) {
      setError("Please fill in all required fields.");
      setSubmitted(false);
      return;
    }
    if (form.captcha.trim() !== "8") {
      setError("Please answer the verification question correctly.");
      setSubmitted(false);
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 pb-24">
      <Reveal className="text-center mb-14">
        <p className="text-xs font-bold tracking-[0.3em] text-[#D9B65C] mb-2">OPEN POSITIONS</p>
        <h2 className="text-3xl font-bold text-slate-800 font-serif-display">Vacancy List &amp; Application</h2>
        <span className="draw-line-static w-14 mx-auto mt-3" />
      </Reveal>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* -------- Vacancy List -------- */}
        <Reveal className="space-y-5">
          <h3 className="text-xl font-bold text-slate-800 font-serif-display flex items-center gap-2 mb-1">
            <Briefcase size={20} className="text-[#17B9A6]" /> Vacancy List
          </h3>
          <span className="draw-line-static w-10 block mb-4" />
          <div className="space-y-4">
            {VACANCIES.map((job, i) => (
              <VacancyItem
                key={job.title}
                job={job}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </div>
        </Reveal>

        {/* -------- Application Form -------- */}
        <Reveal delay={120} className="glass-card rounded-2xl shadow-2xl p-6 sm:p-8 border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 font-serif-display mb-1">Career</h3>
          <span className="draw-line-static w-10 block mb-4" />
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
            Fill in your details below and our HR team will get in touch with you regarding suitable openings.
          </p>

          {submitted ? (
            <div className="flex flex-col items-center text-center gap-3 py-10">
              <CheckCircle2 size={40} className="text-[#17B9A6]" />
              <p className="font-bold text-slate-800 font-serif-display text-lg">Application Submitted!</p>
              <p className="text-sm text-slate-500 max-w-xs">
                Thank you for applying. Our HR team will review your details and reach out soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Layers size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <select
                  value={form.department}
                  onChange={handleChange("department")}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-600 outline-none focus:ring-2 focus:ring-[#17B9A6] transition-shadow appearance-none bg-white"
                >
                  <option value="">Select Department</option>
                  {DEPARTMENTS.filter((d) => d !== "All").map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={form.name}
                  onChange={handleChange("name")}
                  placeholder="Name"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-[#17B9A6] transition-shadow"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="relative">
                  <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    value={form.phone}
                    onChange={handleChange("phone")}
                    placeholder="Phone Number"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-[#17B9A6] transition-shadow"
                  />
                </div>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    value={form.email}
                    onChange={handleChange("email")}
                    placeholder="Email"
                    type="email"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-[#17B9A6] transition-shadow"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="relative">
                  <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    value={form.experience}
                    onChange={handleChange("experience")}
                    placeholder="Experience"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-[#17B9A6] transition-shadow"
                  />
                </div>
                <label className="relative flex items-center pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-500 cursor-pointer hover:border-[#17B9A6] transition-colors">
                  <UploadCloud size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <span className="truncate underline">{form.fileName || "Upload CV"}</span>
                  <input type="file" onChange={handleFile} className="hidden" />
                </label>
              </div>

              <textarea
                value={form.note}
                onChange={handleChange("note")}
                placeholder="Note"
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-[#17B9A6] transition-shadow resize-none"
              />

              <div className="flex items-center gap-4">
                <label className="text-sm font-bold text-slate-700 whitespace-nowrap">Which is bigger, 2 or 8?</label>
                <input
                  value={form.captcha}
                  onChange={handleChange("captcha")}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-[#17B9A6] transition-shadow"
                />
              </div>

              {error && <p className="text-xs font-semibold text-red-500">{error}</p>}

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="btn-shimmer inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0B3D66] text-white text-sm font-bold shadow-lg hover:shadow-xl transition-shadow"
                >
                  <span>Submit</span>
                  <Send size={15} />
                </button>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------- PAGE ----------------------------- */

export default function Career() {
  const [activeDept, setActiveDept] = useState("All");
  const [query, setQuery] = useState("");

  const filteredJobs = useMemo(() => {
    return JOBS.filter((j) => {
      const matchDept = activeDept === "All" || j.dept === activeDept;
      const matchQuery = j.title.toLowerCase().includes(query.toLowerCase());
      return matchDept && matchQuery;
    });
  }, [activeDept, query]);

  return (
    <div className="min-h-screen bg-porcelain font-sans text-slate-700 overflow-x-hidden">
      <PageStyles />

      {/* ---------- HERO ---------- */}
      <section className="relative bg-gradient-to-br from-[#071B33] via-[#0B3D66] to-[#17B9A6] text-white py-24 sm:py-28 px-4 sm:px-8 lg:px-16 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-white/5 blob" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#D9B65C]/10 blob blob-delay" />

        <div className="relative max-w-3xl mx-auto text-center">
          <p className="hero-fade text-xs font-bold tracking-[0.3em] text-[#D9B65C] mb-4 flex items-center justify-center gap-2">
            <Sparkles size={14} /> JOIN OUR TEAM
          </p>
          <h1 className="hero-fade hero-fade-d1 text-4xl sm:text-6xl font-bold font-serif-display mb-4">
            Build A Career That Cares
          </h1>
          <p className="hero-fade hero-fade-d2 text-teal-50/80 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Join a team of dedicated specialists, nurses, and support staff
            committed to compassionate, world-class patient care.
          </p>

          <div className="hero-fade hero-fade-d3 relative max-w-md mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search open positions..."
              className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white text-slate-700 text-sm placeholder:text-slate-400 outline-none shadow-lg focus:ring-2 focus:ring-[#D9B65C] transition-shadow"
            />
          </div>
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

      {/* ---------- PERKS ---------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 pt-24 pb-16">
        <Reveal className="text-center mb-14">
          <p className="text-xs font-bold tracking-[0.3em] text-[#D9B65C] mb-2">WHY WORK WITH US</p>
          <h2 className="text-3xl font-bold text-slate-800 font-serif-display">Perks &amp; Benefits</h2>
          <span className="draw-line-static w-14 mx-auto mt-3" />
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PERKS.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delay={i * 100} className="perk-card group rounded-2xl bg-white border border-slate-100 shadow-lg p-6 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-[#0B3D66] to-[#17B9A6] flex items-center justify-center mb-4 transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="font-bold text-slate-800 font-serif-display text-base mb-2">{p.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{p.desc}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ---------- VACANCY LIST + APPLICATION FORM ---------- */}
      <VacancySection />

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
      .hero-fade-d3 { animation-delay: 360ms; }

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

      .perk-card { transition: transform 400ms cubic-bezier(.22,1,.36,1), box-shadow 400ms cubic-bezier(.22,1,.36,1); }
      .perk-card:hover { transform: translateY(-8px); box-shadow: 0 30px 60px -20px rgba(7,27,51,0.25); }

      .job-card:hover { transform: translateY(-3px); }
    `}</style>
  );
}