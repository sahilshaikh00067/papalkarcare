import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/* ============================================================
   ScrollToTop.jsx
   Scrolls the window to the very top every time the route
   (pathname) changes — fixes pages opening mid-scroll after
   clicking a header link, button, or <Link>.
   ============================================================ */

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}