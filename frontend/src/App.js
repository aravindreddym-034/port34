import React, { useEffect, useState } from "react";
import "@/App.css";
import { Toaster } from "@/components/ui/sonner";
import DashboardLayout from "@/components/portfolio/DashboardLayout";
import Overview from "@/components/portfolio/Overview";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";

import Certifications from "@/components/portfolio/Certifications";

function App() {
  const [activeTab, setActiveTab] = useState(() => {
    const hash = window.location.hash.replace("#", "");
    const tabs = ["overview", "projects", "skills", "credentials"];
    return tabs.includes(hash) ? hash : "overview";
  });

  useEffect(() => {
    window.location.hash = activeTab;
  }, [activeTab]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      const tabs = ["overview", "projects", "skills", "credentials"];
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
      default:
        return <Overview />;
    }
  };

  return (
    <div className="App selection:bg-cyan-500/20 selection:text-white">
      <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
        {renderContent()}
      </DashboardLayout>
      <Toaster theme="dark" position="bottom-right" richColors />
    </div>
  );
}

export default App;
