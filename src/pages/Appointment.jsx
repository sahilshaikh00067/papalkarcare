import React, { useState, useMemo } from "react";
import {
  User,
  Phone,
  Mail,
  Calendar,
  Clock,
  Stethoscope,
  Heart,
  Brain,
  Bone,
  Baby,
  Eye,
  Send,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ChevronRight,
} from "lucide-react";

/* ============================================================
   Same design language as Home: Ink navy / Royal / Teal / Gold
   Fraunces display font + Inter body + glass cards + gold hairline
   ============================================================ */

/* ----------------------------- WHATSAPP CONFIG ----------------------------- */

/** All appointment requests are sent to this WhatsApp number */
const WHATSAPP_NUMBER = "918381845350";

/** Builds a formatted WhatsApp message from an appointment form and opens WhatsApp with it pre-filled */
function sendAppointmentToWhatsApp(form, departmentName) {
  const lines = [
    "*New Appointment Request*",
    "",
    `*Name:* ${form.name || "-"}`,
    `*Phone:* ${form.phone || "-"}`,
    `*Email:* ${form.email || "-"}`,
    `*Department:* ${departmentName || "-"}`,
    `*Doctor:* ${form.doctor || "Any available doctor"}`,
    `*Preferred Date:* ${form.date || "-"}`,
    `*Preferred Time:* ${form.slot || "-"}`,
  ];
  if (form.message) lines.push(`*Message:* ${form.message}`);

  const text = encodeURIComponent(lines.join("\n"));
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

const DEPARTMENTS = [
  {
    id: "cardiology",
    name: "Cardiology",
    icon: Heart,
    doctors: ["Dr. Viren Papalkar", "Dr. Sanjay Agrawal", "Dr. Rahul Jadhav"],
  },
  {
    id: "neurology",
    name: "Neurology",
    icon: Brain,
    doctors: ["Dr. Satish Chiddarwar", "Dr. Aruna Papalkar", "Dr. Ankur Jain"],
  },
  {
    id: "orthopedic",
    name: "Orthopedic",
    icon: Bone,
    doctors: ["Dr. Sheshrao Pawar", "Dr. Sujeet Chilkar", "Dr. Lalit Jadhav"],
  },
  {
    id: "gynecology",
    name: "Gynecology",
    icon: Baby,
    doctors: ["Dr. Lata Agrawal", "Dr. Ankita Jain", "Dr. Veena Jadhav"],
  },
  {
    id: "eye-care",
    name: "Eye Care",
    icon: Eye,
    doctors: ["Dr. Anand Komawar", "Dr. Sachin Thorkar"],
  },
  {
    id: "general",
    name: "General Physician",
    icon: Stethoscope,
    doctors: ["Dr. Rahul Jadhav", "Dr. Sachin Thorkar", "Dr. Sanjay Agrawal"],
  },
];

const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "02:00 PM", "03:00 PM",
  "04:00 PM", "05:00 PM",
];

export default function Appointment() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    department: DEPARTMENTS[0].id,
    doctor: "",
    date: "",
    slot: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const activeDept = useMemo(
    () => DEPARTMENTS.find((d) => d.id === form.department) || DEPARTMENTS[0],
    [form.department]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: value,
      ...(name === "department" ? { doctor: "" } : {}),
    }));
    setErrors((er) => ({ ...er, [name]: "" }));
  };

  const selectSlot = (slot) => {
    setForm((f) => ({ ...f, slot }));
    setErrors((er) => ({ ...er, slot: "" }));
  };

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = "Required";
    if (!/^\d{10}$/.test(form.phone.trim())) er.phone = "Enter 10-digit number";
    if (!form.doctor) er.doctor = "Select a doctor";
    if (!form.date) er.date = "Pick a date";
    if (!form.slot) er.slot = "Pick a time slot";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Send the filled details straight to WhatsApp
    sendAppointmentToWhatsApp(form, activeDept.name);

    setSubmitted(true);
  };

  const resetForm = () => {
    setForm({
      name: "",
      phone: "",
      email: "",
      department: DEPARTMENTS[0].id,
      doctor: "",
      date: "",
      slot: "",
      message: "",
    });
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-porcelain font-sans text-slate-700 overflow-x-hidden">
      <PageStyles />

      {/* ---------- HERO / BREADCRUMB ---------- */}
      <section className="relative bg-gradient-to-br from-[#071B33] via-[#0B3D66] to-[#17B9A6] text-white py-16 sm:py-20 px-4 sm:px-8 lg:px-16 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/5 blob" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#D9B65C]/10 blob blob-delay" />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold tracking-[0.3em] text-[#D9B65C] mb-3 flex items-center justify-center gap-2">
            <Sparkles size={14} /> BOOK YOUR VISIT
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif-display mb-3">Make An Appointment</h1>
          <p className="text-teal-50/80 text-sm sm:text-base">
            Home <ChevronRight className="inline" size={14} /> Make An Appointment
          </p>
        </div>
      </section>

      {/* ---------- MAIN CONTENT ---------- */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 -mt-10 sm:-mt-14 pb-20 grid lg:grid-cols-[1fr_360px] gap-6">
        {/* FORM CARD */}
        <div className="glass-card rounded-2xl shadow-2xl border-t-4 border-[#D9B65C] p-6 sm:p-10">
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-16">
              <div className="w-20 h-20 rounded-full bg-teal-50 text-[#17B9A6] flex items-center justify-center mb-5 glow-pulse">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl font-bold text-[#0B3D66] font-serif-display mb-2">
                Appointment Requested!
              </h3>
              <p className="text-sm text-slate-500 max-w-sm mb-1">
                Thank you, <span className="font-semibold text-slate-700">{form.name}</span>. Your
                request with <span className="font-semibold text-slate-700">{form.doctor}</span> on{" "}
                <span className="font-semibold text-slate-700">{form.date}</span> at{" "}
                <span className="font-semibold text-slate-700">{form.slot}</span> has been sent to us
                on WhatsApp.
              </p>
              <p className="text-sm text-slate-500 max-w-sm mb-6">
                Didn't see the WhatsApp tab open?{" "}
                <button
                  type="button"
                  onClick={() => sendAppointmentToWhatsApp(form, activeDept.name)}
                  className="text-[#17B9A6] font-semibold underline underline-offset-2"
                >
                  Click here to send it again
                </button>
                .
              </p>
              <button
                onClick={resetForm}
                className="btn-shimmer px-7 py-3 bg-gradient-to-r from-[#0B3D66] to-[#17B9A6] text-white text-xs font-bold tracking-wide rounded-lg hover:brightness-110 transition-all"
              >
                BOOK ANOTHER APPOINTMENT
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <p className="text-xs font-semibold text-[#17B9A6] tracking-widest mb-1">STEP 1 OF 1</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 font-serif-display mb-1">
                Patient &amp; Visit Details
              </h2>
              <span className="draw-line-static w-16 mb-8" />

              {/* Department picker */}
              <p className="text-sm font-semibold text-slate-700 mb-3">Choose Department</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                {DEPARTMENTS.map((d) => {
                  const Icon = d.icon;
                  const active = form.department === d.id;
                  return (
                    <button
                      type="button"
                      key={d.id}
                      onClick={() =>
                        setForm((f) => ({ ...f, department: d.id, doctor: "" }))
                      }
                      className={`dept-card group flex flex-col items-center gap-2 rounded-xl py-4 px-2 border text-center transition-all duration-300 ${
                        active
                          ? "bg-gradient-to-br from-[#0B3D66] to-[#17B9A6] text-white border-transparent shadow-lg scale-[1.02]"
                          : "bg-white text-slate-600 border-slate-200 hover:border-[#17B9A6]/50 hover:-translate-y-0.5"
                      }`}
                    >
                      <Icon size={22} className={active ? "text-white" : "text-[#17B9A6]"} />
                      <span className="text-xs font-semibold leading-tight">{d.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Contact fields */}
              <div className="grid sm:grid-cols-2 gap-5 mb-2">
                <Field label="Patient Name" icon={User} error={errors.name}>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="peer w-full bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400"
                  />
                </Field>

                <Field label="Phone Number" icon={Phone} error={errors.phone}>
                  <input
                    name="phone"
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

                <label className="block">
                  <span className="text-xs font-semibold text-slate-500 tracking-wide mb-1.5 block">
                    Select Doctor
                  </span>
                  <div
                    className={`flex items-center gap-2.5 border rounded-lg px-3.5 py-3 transition-shadow ${
                      errors.doctor
                        ? "border-red-300 focus-within:ring-2 focus-within:ring-red-300"
                        : "border-slate-200 focus-within:ring-2 focus-within:ring-teal-400"
                    }`}
                  >
                    <Stethoscope size={16} className="text-teal-500 shrink-0" />
                    <select
                      name="doctor"
                      value={form.doctor}
                      onChange={handleChange}
                      className="w-full bg-transparent outline-none text-sm text-slate-800"
                    >
                      <option value="">Choose from {activeDept.name}</option>
                      {activeDept.doctors.map((doc) => (
                        <option key={doc}>{doc}</option>
                      ))}
                    </select>
                  </div>
                  {errors.doctor && <p className="text-[11px] text-red-500 mt-1">{errors.doctor}</p>}
                </label>

                <Field label="Preferred Date" icon={Calendar} error={errors.date}>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="peer w-full bg-transparent outline-none text-sm text-slate-800"
                  />
                </Field>

                <label className="block sm:col-span-2">
                  <span className="text-xs font-semibold text-slate-500 tracking-wide mb-1.5 block">
                    Message (optional)
                  </span>
                  <textarea
                    name="message"
                    rows={2}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us briefly about your concern..."
                    className="w-full border border-slate-200 rounded-lg px-3.5 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-teal-400 transition-shadow resize-none"
                  />
                </label>
              </div>

              {/* Time slots */}
              <p className="text-sm font-semibold text-slate-700 mt-6 mb-3">Preferred Time Slot</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => selectSlot(slot)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 ${
                      form.slot === slot
                        ? "bg-[#0B3D66] text-white border-[#0B3D66] shadow-md"
                        : "bg-white text-slate-600 border-slate-200 hover:border-[#17B9A6] hover:text-[#17B9A6]"
                    }`}
                  >
                    <Clock size={12} className="inline -mt-0.5 mr-1" /> {slot}
                  </button>
                ))}
              </div>
              {errors.slot && <p className="text-[11px] text-red-500 mb-4">{errors.slot}</p>}

              <button
                type="submit"
                className="btn-shimmer mt-6 w-full sm:w-auto px-10 py-3.5 bg-gradient-to-r from-[#0B3D66] to-[#17B9A6] text-white text-sm font-bold tracking-wide rounded-lg shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 hover:brightness-105 active:scale-[0.99] transition-all inline-flex items-center justify-center gap-2"
              >
                <Send size={16} /> CONFIRM APPOINTMENT
              </button>
            </form>
          )}
        </div>

        {/* SIDEBAR */}
        <aside className="flex flex-col gap-6">
          <div className="glass-card rounded-2xl shadow-xl border-t-4 border-[#17B9A6] p-6">
            <p className="text-xs font-semibold text-[#17B9A6] tracking-widest mb-1">WE ARE FOR YOU</p>
            <h3 className="text-xl font-bold text-slate-800 font-serif-display mb-4">OPD Hours</h3>
            <div className="divide-y divide-dashed divide-slate-200">
              {[
                ["Mon", "08:00 am – 12:00 pm"],
                ["Tue", "01:00 pm – 05:00 pm"],
                ["Wed", "01:00 pm – 05:00 pm"],
                ["Thu – Sat", "08:00 am – 12:00 pm"],
                ["Sun", "Free day"],
              ].map(([day, time]) => (
                <div key={day} className="flex justify-between py-2.5 text-sm">
                  <span className="font-semibold text-slate-700">{day}</span>
                  <span className="text-slate-500">{time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl shadow-xl overflow-hidden bg-gradient-to-br from-[#071B33] to-[#0B3D66] text-white p-6 relative">
            <div className="absolute -bottom-8 -right-8 w-36 h-36 rounded-full bg-[#D9B65C]/10 blob" />
            <div className="relative flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <ShieldCheck size={20} className="text-[#D9B65C]" />
              </div>
              <p className="font-bold font-serif-display text-lg">24×7 Emergency</p>
            </div>
            <p className="relative text-sm text-teal-50/80 mb-4">
              For urgent cases, please call our emergency line directly instead of booking online.
            </p>
            <p className="relative flex items-center gap-2 text-lg font-bold tracking-wide">
              <Phone size={18} className="text-[#D9B65C]" /> 78880 04343
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}

function Field({ label, icon: Icon, children, error }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-slate-500 tracking-wide mb-1.5 block">{label}</span>
      <div
        className={`flex items-center gap-2.5 border rounded-lg px-3.5 py-3 transition-shadow ${
          error
            ? "border-red-300 focus-within:ring-2 focus-within:ring-red-300"
            : "border-slate-200 focus-within:ring-2 focus-within:ring-teal-400"
        }`}
      >
        <Icon size={16} className="text-teal-500 shrink-0" />
        {children}
      </div>
      {error && <p className="text-[11px] text-red-500 mt-1">{error}</p>}
    </label>
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

      .glass-card {
        background: rgba(255,255,255,0.9);
        backdrop-filter: blur(14px) saturate(160%);
        -webkit-backdrop-filter: blur(14px) saturate(160%);
      }

      .draw-line-static {
        display: block;
        height: 2px;
        background: linear-gradient(90deg, var(--gold), var(--teal));
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

      @keyframes glowPulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(23,185,166,0.35); }
        50% { box-shadow: 0 0 0 10px rgba(23,185,166,0); }
      }
      .glow-pulse { animation: glowPulse 2.6s ease-in-out infinite; }

      .dept-card { will-change: transform; }
    `}</style>
  );
}