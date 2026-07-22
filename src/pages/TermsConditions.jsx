import React from "react";
import { FileText, Sparkles, ChevronRight, ShieldCheck, Share2, Clock, UserCheck, FlaskConical, MessageSquareText } from "lucide-react";

const SECTIONS = [
  {
    icon: ShieldCheck,
    title: "Authorization For Investigations, Procedure, Treatment And Payments",
    body: [
      "I/We hereby authorize Papalkar Gastrocare to collect and process the information from me that may include but not be restricted to my demographics, contact information, health records, insurance coverage, financial information, and any other relevant information that I may have shared with AHEL prior to the date of this consent form for availing any services.",
      "I understand that AHEL may use the information mentioned above to provide me with services, or use it for other purposes, including: registration to receive services, maintenance of my unified health profile/records, identification, communication, information on new services and offers, taking feedback, help and complaint resolution, and other customer care related activities; creation and maintenance of electronic health records for use by AHEL, Papalkar Gastrocare group companies and affiliates; receiving personalized announcements/offers; customising suggestions for appropriate medical products and services; research for the development and improvement of our products and services including diagnostics and treatment protocols; disclosure as required to government authorities in compliance with applicable law; investigating and resolving any disputes or grievances; and any purpose(s) required by applicable law.",
    ],
  },
  {
    icon: Share2,
    title: "Disclosure And Transfer Of Personal Information",
    body: [
      "For the above-mentioned purposes, and to the extent permitted by applicable law, AHEL may share, disclose and in some cases transfer all or any information referred to above, to such entities as required to provide services to me, or for compliance with applicable laws. I understand that these entities include but are not restricted to Papalkar Gastrocare group companies, affiliate companies, AHEL doctors, Hospital, diagnostic centres, chemists, third-party service providers to AHEL, and law enforcement agencies.",
      "For these purposes, I consent to AHEL transferring my personal information to entities that may be located outside India. I understand that in the event of a merger, reorganization, acquisition, joint venture, assignment, spin-off, transfer, asset sale, or sale or disposition of all or any portion of the AHEL business, including in connection with any bankruptcy or similar proceedings, AHEL may transfer any and all personal information to the relevant third party with the same rights of access and use.",
    ],
  },
  {
    icon: Clock,
    title: "Retention Of Personal Information",
    body: [
      "AHEL will keep any information collected from me for as long as necessary to provide me with services or as may be required under any law. AHEL may retain information related to me if needed to prevent fraud or abuse or for other legitimate purposes. AHEL may store my personal information in de-identified form for these purposes.",
    ],
  },
  {
    icon: UserCheck,
    title: "My Rights",
    body: [
      "I understand that I have the right to access my personal information, and request updation, correction and deletion of such information, but not information processed in de-identified form, or any information which is retained by AHEL to comply with applicable law. I understand that I am free to not share any health, financial or other information that I deem confidential.",
      "I understand that I may withdraw consent for AHEL to use data that I have already provided to it. I understand that if I exercise these rights, AHEL can limit or deny the provision of services for which it considers such information necessary. I understand that I may contact Mr. Harkaran Sahni at grievancePapalkarGastrocare@papalkargastrocare.com for any questions or for the exercise of these rights and for any other grievances related to my personal information.",
      "I hereby give my consent to AHEL to collect, use, store, share, and/or otherwise process my personal information in accordance with this consent form.",
    ],
  },
  {
    icon: FlaskConical,
    title: "Use Of My Samples",
    body: [
      "The investigation samples (blood or tissue) obtained for diagnostic tests from me may be used by research scientists or scientists affiliated with Papalkar Gastrocare's research for the advancement of medical sciences to serve humanity for better preventive or therapeutic purposes. This will happen only if there is any sample left over after its intended medical use.",
      "Similarly, data associated with my treatment can be shared with research scientists without disclosing my identity. This research will not benefit me financially but may help in better understanding of diseases and better treatment for future patients. I have the option to disallow such research use of my sample and data.",
    ],
  },
  {
    icon: MessageSquareText,
    title: "Communication Consent",
    body: [
      "I also agree to receive SMS / WhatsApp alerts and calls in connection with my healthcare. I/We hereby sign the above on my/our own free will after fully understanding the contents and the explanations given to me/us by the Hospital authorities including the doctors.",
    ],
  },
];

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-porcelain font-sans text-slate-700 overflow-x-hidden">
      <PageStyles />

      {/* ---------- HERO ---------- */}
      <section className="relative bg-gradient-to-br from-[#071B33] via-[#0B3D66] to-[#17B9A6] text-white py-20 sm:py-24 px-4 sm:px-8 lg:px-16 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-white/5 blob" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#D9B65C]/10 blob blob-delay" />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="hero-fade text-xs font-bold tracking-[0.3em] text-[#D9B65C] mb-4 flex items-center justify-center gap-2">
            <Sparkles size={14} /> PLEASE READ CAREFULLY
          </p>
          <h1 className="hero-fade hero-fade-d1 text-3xl sm:text-5xl font-bold font-serif-display mb-3">
            Terms &amp; Conditions
          </h1>
          <p className="hero-fade hero-fade-d2 text-teal-50/70 text-xs tracking-wide">
            <a href="/" className="hover:text-white transition-colors">Home</a>{" "}
            <ChevronRight className="inline" size={12} /> Terms &amp; Conditions
          </p>
        </div>
      </section>

      {/* ---------- CONTENT ---------- */}
      <section className="relative z-10 max-w-4xl mx-auto -mt-10 sm:-mt-12 px-4 sm:px-8 pb-20">
        <div className="glass-card rounded-2xl shadow-2xl border-t-4 border-[#D9B65C] p-6 sm:p-10 mb-8 flex items-start gap-3">
          <FileText size={20} className="text-[#17B9A6] shrink-0 mt-0.5" />
          <p className="text-sm text-slate-500 leading-relaxed">
            By availing services at{" "}
            <a
              href="http://localhost:5173/"
              className="font-semibold text-[#0B3D66] hover:text-[#17B9A6] transition-colors"
            >
              Papalkar Gastrocare
            </a>
            , you agree to the terms and consent outlined below regarding
            investigations, procedures, treatment, and use of your personal
            information.
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
                  <h2 className="font-bold text-slate-800 font-serif-display text-base sm:text-lg">{s.title}</h2>
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