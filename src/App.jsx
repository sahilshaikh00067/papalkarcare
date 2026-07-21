import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Appointment from "./pages/Appointment";
import Career from "./pages/Career";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Academic from "./pages/Academic";
import Gallery from "./pages/Gallery";
import AboutUs from "./pages/About";
import PrivacyPolicy from "./pages/Privacy";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/career" element={<Career />} />
        <Route path="/academic" element={<Academic />} />
        <Route path="/gallery" element={<Gallery />} />


      </Routes>
      <Footer />
    </BrowserRouter>
  );
}