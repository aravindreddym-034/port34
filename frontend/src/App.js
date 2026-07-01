import React, { useEffect, useState } from "react";
import "@/App.css";
import { Toaster } from "@/components/ui/sonner";
import DashboardLayout from "@/components/portfolio/DashboardLayout";
import Overview from "@/components/portfolio/Overview";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";

import Certifications from "@/components/portfolio/Certifications";
import Contact from "@/components/portfolio/Contact";

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
        className="hidden md:block fixed pointer-events-none z-[100] rounded-full mix-blend-difference transition-all duration-150 ease-out"
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
        className="hidden md:block fixed pointer-events-none z-[99] rounded-full transition-all duration-100 ease-out"
        style={{
          left: pos.x,
          top: pos.y,
          width: hovering ? 52 : 40,
          height: hovering ? 52 : 40,
          transform: "translate(-50%, -50%)",
          border: "1px solid rgba(0,240,255,0.35)",
        }}
      />
    </>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState(() => {
    const hash = window.location.hash.replace("#", "");
    const tabs = ["overview", "projects", "skills", "credentials", "contact"];
    return tabs.includes(hash) ? hash : "overview";
  });

  useEffect(() => {
    window.location.hash = activeTab;
  }, [activeTab]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      const tabs = ["overview", "projects", "skills", "credentials", "contact"];
      if (tabs.includes(hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview />;
      case "projects":
        return <Projects />;
      case "skills":
        return <Skills />;

      case "credentials":
        return <Certifications />;
      case "contact":
        return <Contact />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="App selection:bg-cyan-500/20 selection:text-white">
      <CustomCursor />
      <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
        {renderContent()}
      </DashboardLayout>
      <Toaster theme="dark" position="bottom-right" richColors />
    </div>
  );
}

export default App;
