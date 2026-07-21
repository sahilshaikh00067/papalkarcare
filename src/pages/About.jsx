import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------
   AboutUs.jsx — Premium "Meet the Doctors" section
   - 3D tilt photo cards (mouse-tracked perspective)
   - Staggered scroll-in entrance
   - Glass name-tag slide-up on hover
   - Floating ambient orbs + gold accent line
   ------------------------------------------------------------------
   Requirements:
     npm install framer-motion
   Fonts (add to index.html <head> or your global CSS):
     <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500;9..144,600&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">
------------------------------------------------------------------- */

import dr1 from "../assets/Images/dr1.jpg";
import dr2 from "../assets/Images/dr2.jpg";
import dr3 from "../assets/Images/dr3.png";
import dr4 from "../assets/Images/dr4.png";
import dr5 from "../assets/Images/dr5.jpg";
import dr6 from "../assets/Images/dr6.png";
import dr7 from "../assets/Images/dr7.png";

const DOCTORS = [
  { img: dr1, name: "Dr. Aanya Rawat", role: "Cardiology", span: "big" },
  { img: dr2, name: "Dr. Vikram Bisht", role: "Orthopedics", span: "small" },
  { img: dr3, name: "Dr. Meera Joshi", role: "Pediatrics", span: "small" },
  { img: dr4, name: "Dr. Kabir Negi", role: "Neurology", span: "tall" },
  { img: dr5, name: "Dr. Ishita Rana", role: "Dermatology", span: "small" },
  { img: dr6, name: "Dr. Arjun Panwar", role: "General Surgery", span: "small" },
  { img: dr7, name: "Dr. Nandini Thapa", role: "Gynecology", span: "small" },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 46, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

/* Individual tilt card — tracks mouse position for real 3D perspective */
function TiltCard({ doctor, className }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});
  const [hover, setHover] = useState(false);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -14;
    const rotateY = ((x / rect.width) - 0.5) * 14;
    setStyle({
      transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`,
    });
  };

  const reset = () => {
    setHover(false);
    setStyle({
      transform:
        "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
    });
  };

  return (
    <motion.div
      variants={cardVariants}
      className={`au-card ${className}`}
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={reset}
      style={{ ...style, transition: "transform 0.35s cubic-bezier(.16,1,.3,1)" }}
    >
      <div className="au-card-inner">
        <img src={doctor.img} alt={doctor.name} className="au-card-img" />
        <div className="au-card-sheen" />
        <div className={`au-card-tag ${hover ? "au-card-tag--up" : ""}`}>
          <span className="au-card-name">{doctor.name}</span>
          <span className="au-card-role">{doctor.role}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutUs() {
  return (
    <section className="au-section">
      {/* ambient background elements */}
      <div className="au-orb au-orb--1" />
      <div className="au-orb au-orb--2" />
      <div className="au-grain" />

      <div className="au-wrapper">
        {/* ---------- left column : copy ---------- */}
        <motion.div
          className="au-copy"
          initial={{ opacity: 0, x: -36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="au-eyebrow">
            <span className="au-eyebrow-dot" />
            About the Practice
          </div>

          <h2 className="au-title">
            Care shaped around
            <br />
            <span className="au-title-accent">Uttarakhand&rsquo;s finest</span> doctors
          </h2>

          <p className="au-desc">
            Behind every recovery is a team that listens first and treats second.
            Our specialists bring decades of combined experience across cardiology,
            neurology and pediatric care &mdash; delivered with the warmth of a
            practice that still remembers your name.
          </p>

          <div className="au-stats">
            <div className="au-stat">
              <span className="au-stat-num">18+</span>
              <span className="au-stat-label">Years of Care</span>
            </div>
            <div className="au-stat-divider" />
            <div className="au-stat">
              <span className="au-stat-num">7</span>
              <span className="au-stat-label">Specialists</span>
            </div>
            <div className="au-stat-divider" />
            <div className="au-stat">
              <span className="au-stat-num">10k+</span>
              <span className="au-stat-label">Patients Treated</span>
            </div>
          </div>

          <motion.button
            className="au-cta"
            whileHover={{ scale: 1.035 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>Meet All Doctors</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        </motion.div>

        {/* ---------- right column : bento tilt collage ---------- */}
        <motion.div
          className="au-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <TiltCard doctor={DOCTORS[0]} className="au-span-big" />
          <TiltCard doctor={DOCTORS[3]} className="au-span-tall" />
          <TiltCard doctor={DOCTORS[1]} className="au-span-small" />
          <TiltCard doctor={DOCTORS[2]} className="au-span-small" />
          <TiltCard doctor={DOCTORS[4]} className="au-span-small" />
          <TiltCard doctor={DOCTORS[5]} className="au-span-small" />
          <TiltCard doctor={DOCTORS[6]} className="au-span-small" />
        </motion.div>
      </div>

      <style>{`
        .au-section {
          position: relative;
          overflow: hidden;
          background: #0F1A16;
          padding: 100px 6vw;
          font-family: 'Manrope', sans-serif;
          isolation: isolate;
        }
        .au-grain {
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 3px 3px;
          pointer-events: none;
          z-index: 0;
        }
        .au-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.35;
          z-index: 0;
        }
        .au-orb--1 {
          width: 420px; height: 420px;
          background: #C6A15B;
          top: -140px; left: -120px;
        }
        .au-orb--2 {
          width: 360px; height: 360px;
          background: #2E6E5A;
          bottom: -160px; right: -80px;
        }

        .au-wrapper {
          position: relative;
          z-index: 1;
          max-width: 1240px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 64px;
          align-items: center;
        }

        /* ---------- copy ---------- */
        .au-eyebrow {
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
        .au-eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #C6A15B;
          box-shadow: 0 0 12px 2px rgba(198,161,91,0.7);
        }
        .au-title {
          font-family: 'Fraunces', serif;
          font-weight: 500;
          font-size: clamp(36px, 4vw, 54px);
          line-height: 1.12;
          color: #F6F2E9;
          margin: 0 0 22px;
          letter-spacing: -0.01em;
        }
        .au-title-accent {
          font-style: italic;
          color: #C6A15B;
        }
        .au-desc {
          font-size: 16.5px;
          line-height: 1.75;
          color: rgba(246,242,233,0.68);
          max-width: 460px;
          margin-bottom: 40px;
        }
        .au-stats {
          display: flex;
          align-items: center;
          gap: 22px;
          margin-bottom: 44px;
        }
        .au-stat { display: flex; flex-direction: column; }
        .au-stat-num {
          font-family: 'Fraunces', serif;
          font-size: 30px;
          color: #F6F2E9;
          font-weight: 600;
        }
        .au-stat-label {
          font-size: 12.5px;
          color: rgba(246,242,233,0.5);
          margin-top: 2px;
        }
        .au-stat-divider {
          width: 1px; height: 34px;
          background: rgba(246,242,233,0.15);
        }
        .au-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #C6A15B, #B5502C);
          color: #14100A;
          font-weight: 700;
          font-size: 15px;
          border: none;
          border-radius: 100px;
          padding: 16px 28px;
          cursor: pointer;
          box-shadow: 0 14px 30px -10px rgba(198,161,91,0.55);
        }

        /* ---------- bento grid ---------- */
        .au-grid {
          position: relative;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 108px;
          gap: 16px;
        }
        .au-span-big { grid-column: span 2; grid-row: span 3; }
        .au-span-tall { grid-column: span 2; grid-row: span 2; }
        .au-span-small { grid-column: span 1; grid-row: span 2; }

        .au-card {
          position: relative;
          border-radius: 20px;
          transform-style: preserve-3d;
          will-change: transform;
        }
        .au-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px -18px rgba(0,0,0,0.55);
          border: 1px solid rgba(246,242,233,0.08);
        }
        .au-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.02);
          transition: transform 0.5s ease;
        }
        .au-card:hover .au-card-img { transform: scale(1.12); }
        .au-card-sheen {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(15,26,22,0) 45%, rgba(15,26,22,0.92) 100%);
        }
        .au-card-tag {
          position: absolute;
          left: 14px; right: 14px; bottom: -30px;
          display: flex; flex-direction: column;
          opacity: 0;
          transition: all 0.4s cubic-bezier(.16,1,.3,1);
        }
        .au-card-tag--up {
          bottom: 14px;
          opacity: 1;
        }
        .au-card-name {
          font-family: 'Fraunces', serif;
          font-size: 15px;
          color: #F6F2E9;
          font-weight: 600;
        }
        .au-card-role {
          font-size: 11.5px;
          color: #C6A15B;
          letter-spacing: 0.04em;
        }

        @media (max-width: 920px) {
          .au-wrapper { grid-template-columns: 1fr; }
          .au-desc { max-width: 100%; }
          .au-grid { grid-auto-rows: 88px; }
        }
      `}</style>
    </section>
  );
}