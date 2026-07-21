import React, { useState, useEffect, useCallback, useRef } from "react";

import gall1 from "../assets/Images/gall1.jpg";
import gall2 from "../assets/Images/gall2.jpg";
import gall3 from "../assets/Images/gall3.jpg";
import gall4 from "../assets/Images/gall4.jpg";
import gall5 from "../assets/Images/gall5.jpg";
import gall6 from "../assets/Images/gall6.jpg";
import gall7 from "../assets/Images/gall7.png";
import gall8 from "../assets/Images/gall8.png";
import gall9 from "../assets/Images/gall9.jpg";
import gall10 from "../assets/Images/gall10.jpg";
import gall11 from "../assets/Images/gall11.jpg";
import gall12 from "../assets/Images/gall12.jpg";
import gall13 from "../assets/Images/gall13.jpg";
import gall14 from "../assets/Images/gall14.jpeg";
import gall15 from "../assets/Images/gall15.jpg";
import gall16 from "../assets/Images/gall16.jpg";
import gall17 from "../assets/Images/gall17.jpg";
import gall18 from "../assets/Images/gall18.jpg";

/* Edit title / description for each image here */
const images = [
  { src: gall1, title: "Surgical Suite", desc: "State-of-the-art operation theatre built for precision." },
  { src: gall2, title: "Diagnostic Imaging", desc: "Advanced imaging for fast, accurate diagnosis." },
  { src: gall3, title: "Patient Care", desc: "Compassionate care delivered around the clock." },
  { src: gall4, title: "Orthopedic Unit", desc: "Specialized treatment for bone & joint care." },
  { src: gall5, title: "Critical Care", desc: "24x7 monitoring in our intensive care unit." },
  { src: gall6, title: "Modern Equipment", desc: "Cutting-edge machines for reliable results." },
  { src: gall7, title: "Radiology Dept.", desc: "High-resolution scans for early detection." },
  { src: gall8, title: "Cardiac Monitoring", desc: "Real-time heart diagnostics and analysis." },
  { src: gall9, title: "Emergency Ward", desc: "Rapid response for critical situations." },
  { src: gall10, title: "Pediatric Care", desc: "Gentle, dedicated care for our youngest patients." },
  { src: gall11, title: "Laboratory", desc: "Precision testing backed by expert pathologists." },
  { src: gall12, title: "Consultation Room", desc: "One-on-one time with specialist physicians." },
  { src: gall13, title: "Recovery Ward", desc: "Comfortable spaces designed for healing." },
  { src: gall14, title: "Ultrasound Suite", desc: "Non-invasive imaging for expecting mothers." },
  { src: gall15, title: "Operation Theatre", desc: "A sterile, controlled environment for surgery." },
  { src: gall16, title: "Nursing Station", desc: "Attentive staff, always within reach." },
  { src: gall17, title: "Medical Technology", desc: "Innovation at the heart of every treatment." },
  { src: gall18, title: "Hospital Campus", desc: "A welcoming space built around wellbeing." },
];

/* ---------- Premium Tilt Card ---------- */
const TiltCard = ({ item, index, onClick }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -7;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 7;

    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04,1.04,1.04)`;
    if (glowRef.current) {
      glowRef.current.style.opacity = "1";
      glowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.28), transparent 55%)`;
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    if (glowRef.current) glowRef.current.style.opacity = "0";
  };

  return (
    <div
      className="opacity-0 animate-[fadeUp_0.8s_cubic-bezier(0.22,1,0.36,1)_forwards]"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* animated gradient border wrapper */}
      <div className="relative rounded-[22px] p-[1.5px] bg-gradient-to-br from-teal-400/40 via-white/10 to-cyan-400/40 group/wrap hover:from-teal-300 hover:via-cyan-200 hover:to-teal-400 transition-all duration-500">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={onClick}
          className="relative group [transform-style:preserve-3d] will-change-transform transition-transform duration-300 ease-out cursor-pointer rounded-[20px] overflow-hidden bg-neutral-950 shadow-[0_15px_40px_-12px_rgba(0,0,0,0.7)] hover:shadow-[0_30px_70px_-15px_rgba(20,184,166,0.5)]"
        >
          <img
            src={item.src}
            alt={item.title}
            loading="lazy"
            className="w-full h-[300px] md:h-[400px] object-cover transition duration-700 ease-out group-hover:scale-110 group-hover:brightness-[0.4]"
          />

          <div
            ref={glowRef}
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
          />

          {/* always-on bottom gradient */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

          {/* index badge */}
          <span className="absolute top-4 right-4 text-[11px] tracking-[0.2em] font-semibold text-white/70 bg-white/10 border border-white/15 backdrop-blur-md px-2.5 py-1 rounded-full">
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* + icon on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out">
            <span className="w-14 h-14 rounded-full border border-white/60 backdrop-blur-md bg-white/10 text-white text-2xl flex items-center justify-center shadow-[0_0_30px_rgba(45,212,191,0.65)]">
              +
            </span>
          </div>

          {/* title + description */}
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-10">
            <h3 className="text-white text-lg font-semibold tracking-wide drop-shadow-sm translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              {item.title}
            </h3>
            <p className="text-white/70 text-xs mt-1 leading-relaxed max-h-0 opacity-0 group-hover:max-h-16 group-hover:opacity-100 transition-all duration-500 ease-out overflow-hidden">
              {item.desc}
            </p>
            <div className="mt-2 h-[2px] w-8 bg-gradient-to-r from-teal-400 to-cyan-300 group-hover:w-16 transition-all duration-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- Gallery ---------- */
const Gallery = () => {
  const [current, setCurrent] = useState(null);
  const [entered, setEntered] = useState(false);

  const openLightbox = (index) => {
    setCurrent(index);
    requestAnimationFrame(() => setEntered(true));
  };

  const closeLightbox = () => {
    setEntered(false);
    setTimeout(() => setCurrent(null), 250);
  };

  const jumpTo = (index) => {
    setEntered(false);
    setTimeout(() => {
      setCurrent(index);
      requestAnimationFrame(() => setEntered(true));
    }, 150);
  };

  const showPrev = useCallback((e) => {
    e && e.stopPropagation();
    setCurrent((prevIdx) => {
      const next = prevIdx === 0 ? images.length - 1 : prevIdx - 1;
      setEntered(false);
      setTimeout(() => setEntered(true), 150);
      return next;
    });
  }, []);

  const showNext = useCallback((e) => {
    e && e.stopPropagation();
    setCurrent((prevIdx) => {
      const next = prevIdx === images.length - 1 ? 0 : prevIdx + 1;
      setEntered(false);
      setTimeout(() => setEntered(true), 150);
      return next;
    });
  }, []);

  useEffect(() => {
    if (current === null) return;
    const handleKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current, showPrev, showNext]);

  return (
    <div className="w-full bg-[radial-gradient(ellipse_at_top,_#111827_0%,_#030712_60%)] pb-20">
      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(30px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      {/* Heading */}
      <div className="relative text-center py-20 px-6 overflow-hidden">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-teal-500/20 blur-[100px] rounded-full -z-0" />
        <p className="text-white/40 text-xs tracking-[0.4em] uppercase mb-4">Explore</p>
        <h2 className="text-white text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Our{" "}
          <span
            className="bg-gradient-to-r from-teal-300 via-cyan-300 to-teal-400 bg-[length:200%_100%] bg-clip-text text-transparent"
            style={{ animation: "shimmer 4s linear infinite" }}
          >
            Image Gallery
          </span>
        </h2>
        <p className="text-white/50 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          A closer look at our facilities, technology and the care that defines us —
          hover a frame to discover its story.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6 md:px-10">
        {images.map((item, index) => (
          <TiltCard key={index} item={item} index={index} onClick={() => openLightbox(index)} />
        ))}
      </div>

      {/* Lightbox */}
      {current !== null && (
        <div
          onClick={closeLightbox}
          className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-2xl transition-opacity duration-300 ${
            entered ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 md:px-10 py-6 text-white">
            <span className="text-sm tracking-[0.3em] font-medium text-white/60">
              {String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>
            <button
              onClick={closeLightbox}
              className="w-11 h-11 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 hover:rotate-90 transition-all duration-300 text-2xl leading-none flex items-center justify-center"
            >
              &times;
            </button>
          </div>

          {/* Prev */}
          <button
            onClick={showPrev}
            className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/5 border border-white/10 hover:bg-teal-400/20 hover:border-teal-300/50 hover:scale-110 active:scale-95 text-white text-2xl flex items-center justify-center transition-all duration-300 backdrop-blur-md"
          >
            &#8592;
          </button>

          {/* Image + caption */}
          <div
            onClick={(e) => e.stopPropagation()}
            className={`max-w-[90%] md:max-w-[70%] max-h-[85vh] transition-all duration-300 ease-out ${
              entered ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <img
              src={images[current].src}
              alt={images[current].title}
              className="max-w-full max-h-[68vh] object-contain mx-auto block rounded-xl shadow-[0_30px_100px_-20px_rgba(45,212,191,0.4)] ring-1 ring-white/10"
            />
            <div className="text-center mt-6">
              <h3 className="text-white text-2xl font-semibold tracking-wide">
                {images[current].title}
              </h3>
              <p className="text-white/60 text-sm mt-2 max-w-md mx-auto leading-relaxed">
                {images[current].desc}
              </p>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={showNext}
            className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/5 border border-white/10 hover:bg-teal-400/20 hover:border-teal-300/50 hover:scale-110 active:scale-95 text-white text-2xl flex items-center justify-center transition-all duration-300 backdrop-blur-md"
          >
            &#8594;
          </button>

          {/* Thumbnail strip */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            {images.map((item, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  jumpTo(i);
                }}
                className={`w-12 h-12 rounded-lg overflow-hidden shrink-0 transition-all duration-300 ${
                  i === current
                    ? "ring-2 ring-teal-400 scale-105 opacity-100"
                    : "opacity-40 hover:opacity-80"
                }`}
              >
                <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;