import React, { useEffect, useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Nav from "@/components/portfolio/Nav";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";
import Certifications from "@/components/portfolio/Certifications";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";

function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const enter = (e) => {
      if (e.target.closest("a, button, [role='button'], input, textarea")) setHovering(true);
    };
    const leave = () => setHovering(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", enter);
    window.addEventListener("mouseout", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", enter);
      window.removeEventListener("mouseout", leave);
    };
  }, []);

  return (
    <>
      <div
        className="hidden md:block fixed pointer-events-none z-[100] rounded-full mix-blend-difference transition-transform duration-150"
        style={{
          left: pos.x,
          top: pos.y,
          width: hovering ? 40 : 12,
          height: hovering ? 40 : 12,
          transform: "translate(-50%, -50%)",
          background: "#00F0FF",
        }}
      />
      <div
        className="hidden md:block fixed pointer-events-none z-[99] rounded-full transition-transform"
        style={{
          left: pos.x,
          top: pos.y,
          width: 40,
          height: 40,
          transform: "translate(-50%, -50%)",
          border: "1px solid rgba(0,240,255,0.35)",
        }}
      />
    </>
  );
}

const Portfolio = () => {
  return (
    <div className="relative">
      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
        </Routes>
      </BrowserRouter>
      <Toaster theme="dark" position="bottom-right" richColors />
    </div>
  );
}

export default App;
