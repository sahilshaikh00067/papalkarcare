import React from "react";
import { ShieldCheck, Sparkles, ChevronRight, Lock, Database, Share2, RefreshCw } from "lucide-react";

const SECTIONS = [
  {
    icon: Database,
    title: "Information Collected By Us",
    body: [
      "We collect information about you from a variety of sources, including directly from you by your personal interaction with our staff, and from you when you visit our website or Facebook page or tabs, use our services, or view our advertisements online.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Type Of Information",
    body: [
      "The type of information which we generally collect is your name, address, age, gender, contact number, email-id, or medical report(s) / history, physical, physiological and mental health conditions or any other information as required to provide you desired services. We never collect bank or credit card information of the Information Provider.",
    ],
  },
  {
    icon: Lock,
    title: "Purpose And Use Of Information",
    body: [
      "Papalkar Gastrocare does not sell, trade, rent or share your personal information to organizations outside Papalkar Gastrocare and its affiliate companies unless required to do so by legal, judicial or governmental proceedings.",
      "Before or at the time of collecting personal information, we will identify the purposes for which information is being collected. We may use the information shared by you for the purpose of providing various services offered by the Hospital. We will only retain personal information as long as necessary for the fulfilment of those purposes.",
    ],
  },
  {
    icon: Share2,
    title: "Disclosure / Sharing Of Information",
    body: [
      "The information may be disclosed or shared: with concerned persons who need to use the same for authorised purposes / providing desired services; to protect and defend the right and property of the Hospital; wherever required by law / government agencies; and with you if you may desire so subsequently.",
      "Your personal information will not be shared with any third-party marketers unless we have obtained your explicit consent. The information shared by you shall not be displayed by us for any promotional activity.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Security Measures",
    body: [
      "Papalkar Gastrocare has taken reasonable steps and has employed industry-standard practices and technology to ensure the integrity and confidentiality of personally identifiable information; but because even the most secure computer system can be violated, Papalkar Gastrocare cannot guarantee security.",
    ],
  },
  {
    icon: RefreshCw,
    title: "Changes In The Privacy And Security Policy",
    body: [
      "We reserve the right to amend our Privacy and Security Policy and make the new provisions effective for all information we maintain from time to time. Whosoever shares any information with the Hospital is bound by this Privacy and Security Policy or any revisions thereto and should therefore periodically visit the website to review the most current privacy statement. Your use of or visit to our website shall mean and comprise acceptance of any changes to this Privacy and Security Policy.",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-porcelain font-sans text-slate-700 overflow-x-hidden">
      <PageStyles />

      {/* ---------- HERO ---------- */}
      <section className="relative bg-gradient-to-br from-[#071B33] via-[#0B3D66] to-[#17B9A6] text-white py-20 sm:py-24 px-4 sm:px-8 lg:px-16 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-white/5 blob" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#D9B65C]/10 blob blob-delay" />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="hero-fade text-xs font-bold tracking-[0.3em] text-[#D9B65C] mb-4 flex items-center justify-center gap-2">
            <Sparkles size={14} /> YOUR TRUST MATTERS
          </p>
          <h1 className="hero-fade hero-fade-d1 text-3xl sm:text-5xl font-bold font-serif-display mb-3">
            Privacy Policy
          </h1>
          <p className="hero-fade hero-fade-d2 text-teal-50/70 text-xs tracking-wide">
            <a href="/" className="hover:text-white transition-colors">Home</a>{" "}
            <ChevronRight className="inline" size={12} /> Privacy Policy
          </p>
        </div>
      </section>

      {/* ---------- CONTENT ---------- */}
      <section className="relative z-10 max-w-4xl mx-auto -mt-10 sm:-mt-12 px-4 sm:px-8 pb-20">
        <div className="glass-card rounded-2xl shadow-2xl border-t-4 border-[#D9B65C] p-6 sm:p-10 mb-8">
          <p className="text-sm text-slate-500 leading-relaxed">
            <a
              href="http://localhost:5173/"
              className="font-semibold text-[#0B3D66] hover:text-[#17B9A6] transition-colors"
            >
              Papalkar Gastrocare
            </a>{" "}
            is committed to the protection of the personal information that you
            may provide to us ("Confidential Information"). We take appropriate
            security measures to protect such information against unauthorized
            access or disclosure. We restrict access to your information only
            to such persons who need to know that information in order to
            provide services to you. This Privacy and Security Policy outlines
            how we may use, maintain and protect any information that you may
            give us or we may collect from you through various sources.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {SECTIONS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="policy-card bg-white rounded-2xl border border-slate-100 shadow-md hover:shadow-xl p-6 sm:p-8 transition-all duration-400"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B3D66] to-[#17B9A6] flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-white" />
                  </div>
                  <h2 className="font-bold text-slate-800 font-serif-display text-lg">{s.title}</h2>
                </div>
                {s.body.map((p, j) => (
                  <p key={j} className="text-sm text-slate-500 leading-relaxed mt-2">
                    {p}
                  </p>
                ))}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function PageStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500&family=Inter:wght@400;500;600;700;800&display=swap');
      :root { --ink:#071B33; --royal:#0B3D66; --teal:#17B9A6; --gold:#D9B65C; --porcelain:#F7F9FB; }
      .bg-porcelain { background-color: var(--porcelain); }
      .font-serif-display { font-family: 'Fraunces', serif; }
      * { font-family: 'Inter', sans-serif; }
      .font-serif-display, h1, h2, h3 { font-family: 'Fraunces', serif; }

      @keyframes heroFadeUp { from { opacity:0; transform:translateY(22px);} to { opacity:1; transform:translateY(0);} }
      .hero-fade { animation: heroFadeUp 800ms cubic-bezier(.22,1,.36,1) both; }
      .hero-fade-d1 { animation-delay: 120ms; }
      .hero-fade-d2 { animation-delay: 240ms; }

      @keyframes cardIn { from { opacity:0; transform:translateY(18px);} to { opacity:1; transform:translateY(0);} }
      .policy-card { animation: cardIn 600ms cubic-bezier(.22,1,.36,1) both; }
      .policy-card:hover { transform: translateY(-3px); }

      .glass-card { background: rgba(255,255,255,0.92); backdrop-filter: blur(14px) saturate(160%); -webkit-backdrop-filter: blur(14px) saturate(160%); }

      @keyframes floatBlob {
        0%, 100% { transform: translate(0,0) scale(1); }
        33% { transform: translate(24px,-18px) scale(1.06); }
        66% { transform: translate(-18px,14px) scale(0.96); }
      }
      .blob { animation: floatBlob 14s ease-in-out infinite; filter: blur(60px); }
      .blob-delay { animation-delay: -6s; }
    `}</style>
  );
}