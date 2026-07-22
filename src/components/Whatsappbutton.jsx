import React, { useState, useEffect } from "react";

/* ============================================================
   WhatsAppButton.jsx — Floating WhatsApp chat launcher
   Fixed bottom-right, pulse glow, hover tooltip, smooth pop-in.
   Matches the Ink navy / Royal / Teal / Gold design system.
   ------------------------------------------------------------
   Usage: just drop <WhatsAppButton /> once inside App.jsx
   (outside your <Routes>, so it shows on every page).
   ============================================================ */

const WHATSAPP_NUMBER = "918799992699"; // country code + number, no + or spaces
const DEFAULT_MESSAGE = "Hello! I would like to know more about Papalkar Gastrocare Hospital.";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    // small delayed pop-in so it doesn't flash on first paint
    const t = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(t);
  }, []);

  const chatUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    DEFAULT_MESSAGE
  )}`;

  return (
    <>
      <style>{`
        .wa-fab-wrap {
          position: fixed;
          right: 22px;
          bottom: 26px;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 10px;
          transform: translateY(30px) scale(0.7);
          opacity: 0;
          transition: transform 0.5s cubic-bezier(.34,1.56,.64,1), opacity 0.4s ease;
        }
        .wa-fab-wrap--visible {
          transform: translateY(0) scale(1);
          opacity: 1;
        }

        .wa-tooltip {
          background: #071B33;
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          padding: 8px 14px;
          border-radius: 10px;
          white-space: nowrap;
          box-shadow: 0 8px 20px -6px rgba(7,27,51,0.4);
          opacity: 0;
          transform: translateX(8px);
          transition: opacity 0.25s ease, transform 0.25s ease;
          pointer-events: none;
        }
        .wa-tooltip--show {
          opacity: 1;
          transform: translateX(0);
        }
        .wa-tooltip::after {
          content: "";
          position: absolute;
          right: -5px;
          top: 50%;
          transform: translateY(-50%) rotate(45deg);
          width: 8px; height: 8px;
          background: #071B33;
        }

        .wa-fab {
          position: relative;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: linear-gradient(135deg, #22C35E, #128C4A);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 26px -6px rgba(18,140,74,0.55), 0 0 0 4px rgba(255,255,255,0.6);
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .wa-fab:hover {
          transform: scale(1.08) rotate(-4deg);
          box-shadow: 0 14px 32px -6px rgba(18,140,74,0.65), 0 0 0 4px rgba(255,255,255,0.7);
        }
        .wa-fab:active { transform: scale(0.95); }

        .wa-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid #22C35E;
          animation: waPulse 2.2s ease-out infinite;
        }
        .wa-ring--delay { animation-delay: 1.1s; }

        @keyframes waPulse {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.9); opacity: 0; }
        }

        @media (max-width: 640px) {
          .wa-fab-wrap { right: 16px; bottom: 18px; }
          .wa-fab { width: 52px; height: 52px; }
          .wa-tooltip { display: none; }
        }
      `}</style>

      <div className={`wa-fab-wrap ${visible ? "wa-fab-wrap--visible" : ""}`}>
        <span className={`wa-tooltip ${hover ? "wa-tooltip--show" : ""}`}>
          Chat with us
        </span>

        <a
          href={chatUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="wa-fab"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <span className="wa-ring" />
          <span className="wa-ring wa-ring--delay" />
          <WhatsAppIcon />
        </a>
      </div>
    </>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "relative", zIndex: 1 }}
    >
      <path
        d="M16.001 3C9.373 3 4 8.373 4 15c0 2.34.687 4.52 1.872 6.35L4 29l7.84-1.84A11.93 11.93 0 0 0 16.001 27C22.63 27 28 21.627 28 15S22.63 3 16.001 3Z"
        fill="white"
        fillOpacity="0.001"
      />
      <path
        d="M23.47 18.86c-.34-.17-2-.99-2.31-1.1-.31-.11-.54-.17-.76.17-.23.34-.87 1.1-1.07 1.33-.2.23-.4.25-.74.08-.34-.17-1.43-.53-2.72-1.68-1.01-.9-1.68-2.02-1.88-2.36-.2-.34-.02-.52.15-.69.15-.15.34-.4.51-.6.17-.2.23-.34.34-.57.11-.23.06-.43-.03-.6-.09-.17-.76-1.84-1.05-2.52-.28-.66-.56-.57-.76-.58-.2-.01-.43-.01-.66-.01-.23 0-.6.09-.91.43-.31.34-1.2 1.17-1.2 2.85 0 1.68 1.23 3.3 1.4 3.53.17.23 2.42 3.7 5.86 5.19.82.35 1.46.56 1.96.72.82.26 1.57.22 2.16.13.66-.1 2-.82 2.28-1.61.28-.79.28-1.47.2-1.61-.08-.14-.31-.23-.65-.4Z"
        fill="white"
      />
      <path
        d="M16.001 3C9.373 3 4 8.373 4 15c0 2.34.687 4.52 1.872 6.35L4 29l7.84-1.84A11.93 11.93 0 0 0 16.001 27C22.63 27 28 21.627 28 15S22.63 3 16.001 3Zm0 21.9c-1.86 0-3.6-.5-5.1-1.38l-.37-.22-3.76.88.9-3.66-.24-.38A9.86 9.86 0 0 1 6.1 15c0-5.47 4.45-9.9 9.9-9.9S25.9 9.53 25.9 15 21.46 24.9 16 24.9Z"
        fill="white"
      />
    </svg>
  );
}