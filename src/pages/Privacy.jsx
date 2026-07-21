import React, { useState } from "react";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------
   PrivacyPolicy.jsx — Premium Privacy Policy page
   Matches the About Us design system: deep emerald + gold, Fraunces
   serif headline, Manrope body, glass cards, scroll-reveal sections,
   sticky table-of-contents with active-section highlight.
   ------------------------------------------------------------------
   Requirements:
     npm install framer-motion
   Fonts (add once globally, e.g. in index.html <head>):
     <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500;9..144,600&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">
------------------------------------------------------------------- */

const SECTIONS = [
  {
    id: "commitment",
    title: "Our Commitment",
    body: `Medicare Hospital is committed to protecting the personal information you share with us ("Confidential Information"). We take appropriate security measures to guard it against unauthorized access or disclosure, and we restrict access only to people who genuinely need it to provide you with care.`,
  },
  {
    id: "collection",
    title: "Information We Collect",
    body: `We gather information about you from a few sources — directly, through your personal interaction with our staff, and digitally, when you visit our website or Facebook page, use our services, or view our advertisements online.`,
  },
  {
    id: "type",
    title: "Type of Information",
    body: `This typically includes your name, address, age, gender, contact number, email address, and medical reports or history — along with physical, physiological, and mental health details needed to provide the care you're looking for. We never collect bank or credit card information.`,
  },
  {
    id: "purpose",
    title: "Purpose & Use",
    body: `We do not sell, trade, rent, or share your personal information with organisations outside Medicare and its affiliates, unless legally required to. We identify our purpose for collecting information upfront, use it only to deliver our hospital services, and retain it only as long as that purpose requires.`,
  },
  {
    id: "disclosure",
    title: "Disclosure & Sharing",
    body: `Your information may be shared with people who need it to provide the services you've requested, to protect the hospital's legal rights and property, where required by law or government agencies, or with you directly, at your request. We never share your details with third-party marketers without your explicit consent, and never use them for promotional display.`,
  },
  {
    id: "security",
    title: "Security Measures",
    body: `We follow industry-standard practices and technology to protect the integrity and confidentiality of your information. That said, no computer system is completely immune to compromise, and we can't offer an absolute guarantee — only our continued, serious effort.`,
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    body: `We may revise this policy from time to time, with new provisions applying to all information we hold. By sharing information with us, you agree to be bound by this policy and any future revisions — so it's worth checking back here occasionally. Continued use of our website means you accept any changes made.`,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function PrivacyPolicy() {
  const [active, setActive] = useState(SECTIONS[0].id);

  const scrollTo = (id) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="pp-page">
      <div className="pp-orb pp-orb--1" />
      <div className="pp-orb pp-orb--2" />
      <div className="pp-grain" />

      {/* ---------- hero ---------- */}
      <div className="pp-hero">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="pp-eyebrow">
            <span className="pp-eyebrow-dot" />
            Legal &middot; Last updated July 2026
          </div>
          <h1 className="pp-title">
            Privacy <span className="pp-title-accent">&amp; Security</span> Policy
          </h1>
          <p className="pp-subtitle">
            How Medicare Hospital collects, uses, and protects the information
            you trust us with.
          </p>
        </motion.div>
      </div>

      {/* ---------- body ---------- */}
      <div className="pp-wrapper">
        {/* sticky table of contents */}
        <nav className="pp-toc">
          <span className="pp-toc-label">On this page</span>
          {SECTIONS.map((s, i) => (
            <button
              key={s.id}
              className={`pp-toc-item ${active === s.id ? "pp-toc-item--active" : ""}`}
              onClick={() => scrollTo(s.id)}
            >
              <span className="pp-toc-num">{String(i + 1).padStart(2, "0")}</span>
              {s.title}
            </button>
          ))}
        </nav>

        {/* sections */}
        <div className="pp-sections">
          {SECTIONS.map((s, i) => (
            <motion.div
              key={s.id}
              id={s.id}
              className="pp-card"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              onViewportEnter={() => setActive(s.id)}
            >
              <div className="pp-card-head">
                <span className="pp-card-num">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="pp-card-title">{s.title}</h2>
              </div>
              <p className="pp-card-body">{s.body}</p>
            </motion.div>
          ))}

          <motion.div
            className="pp-footer-note"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            Questions about how your information is handled? Reach out to our
            patient care desk any time — we're glad to walk you through it.
          </motion.div>
        </div>
      </div>

      <style>{`
        .pp-page {
          position: relative;
          overflow: hidden;
          background: #0F1A16;
          font-family: 'Manrope', sans-serif;
          padding-bottom: 100px;
          isolation: isolate;
        }
        .pp-grain {
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 3px 3px;
          pointer-events: none;
          z-index: 0;
        }
        .pp-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.32;
          z-index: 0;
        }
        .pp-orb--1 { width: 460px; height: 460px; background: #C6A15B; top: -160px; left: -140px; }
        .pp-orb--2 { width: 380px; height: 380px; background: #2E6E5A; top: 400px; right: -120px; }

        /* hero */
        .pp-hero {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
          padding: 110px 6vw 70px;
          text-align: center;
        }
        .pp-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #C6A15B;
          font-weight: 600;
          margin-bottom: 22px;
        }
        .pp-eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #C6A15B;
          box-shadow: 0 0 12px 2px rgba(198,161,91,0.7);
        }
        .pp-title {
          font-family: 'Fraunces', serif;
          font-weight: 500;
          font-size: clamp(34px, 5vw, 56px);
          line-height: 1.12;
          color: #F6F2E9;
          margin: 0 0 18px;
          letter-spacing: -0.01em;
        }
        .pp-title-accent { font-style: italic; color: #C6A15B; }
        .pp-subtitle {
          font-size: 16.5px;
          line-height: 1.7;
          color: rgba(246,242,233,0.65);
          max-width: 520px;
          margin: 0 auto;
        }

        /* layout */
        .pp-wrapper {
          position: relative;
          z-index: 1;
          max-width: 1140px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 56px;
          padding: 0 6vw;
        }

        /* toc */
        .pp-toc {
          position: sticky;
          top: 40px;
          align-self: start;
          display: flex;
          flex-direction: column;
          gap: 4px;
          border-left: 1px solid rgba(246,242,233,0.1);
          padding-left: 20px;
          height: fit-content;
        }
        .pp-toc-label {
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(246,242,233,0.4);
          margin-bottom: 14px;
        }
        .pp-toc-item {
          display: flex;
          align-items: baseline;
          gap: 10px;
          background: none;
          border: none;
          text-align: left;
          color: rgba(246,242,233,0.55);
          font-size: 14.5px;
          font-family: 'Manrope', sans-serif;
          padding: 8px 0;
          cursor: pointer;
          transition: color 0.25s ease;
        }
        .pp-toc-item:hover { color: #F6F2E9; }
        .pp-toc-item--active { color: #C6A15B; font-weight: 700; }
        .pp-toc-num {
          font-family: 'Fraunces', serif;
          font-size: 12px;
          opacity: 0.7;
        }

        /* section cards */
        .pp-sections {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }
        .pp-card {
          background: rgba(246,242,233,0.035);
          border: 1px solid rgba(246,242,233,0.09);
          border-radius: 20px;
          padding: 34px 36px;
          backdrop-filter: blur(6px);
          scroll-margin-top: 40px;
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        .pp-card:hover {
          border-color: rgba(198,161,91,0.4);
          background: rgba(246,242,233,0.05);
        }
        .pp-card-head {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 14px;
        }
        .pp-card-num {
          font-family: 'Fraunces', serif;
          font-size: 15px;
          color: #C6A15B;
          border: 1px solid rgba(198,161,91,0.4);
          border-radius: 50%;
          width: 34px; height: 34px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .pp-card-title {
          font-family: 'Fraunces', serif;
          font-size: 22px;
          font-weight: 500;
          color: #F6F2E9;
          margin: 0;
        }
        .pp-card-body {
          font-size: 15.5px;
          line-height: 1.8;
          color: rgba(246,242,233,0.68);
          margin: 0;
        }

        .pp-footer-note {
          margin-top: 12px;
          padding: 26px 32px;
          border-radius: 18px;
          background: linear-gradient(135deg, rgba(198,161,91,0.14), rgba(46,110,90,0.14));
          border: 1px solid rgba(198,161,91,0.3);
          color: #F6F2E9;
          font-size: 15px;
          line-height: 1.7;
          text-align: center;
        }

        @media (max-width: 860px) {
          .pp-wrapper { grid-template-columns: 1fr; }
          .pp-toc {
            position: static;
            flex-direction: row;
            flex-wrap: wrap;
            border-left: none;
            border-bottom: 1px solid rgba(246,242,233,0.1);
            padding-left: 0;
            padding-bottom: 16px;
            gap: 10px 18px;
          }
          .pp-toc-label { width: 100%; }
          .pp-card { padding: 26px 22px; }
        }
      `}</style>
    </section>
  );
}