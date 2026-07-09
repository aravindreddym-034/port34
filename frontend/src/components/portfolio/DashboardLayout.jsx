import React, { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  BarChart3, 
  Database, 
  Award, 
  Mail, 
  Github, 
  Linkedin, 
  Terminal, 
  Cpu, 
  Wifi, 
  FileText
} from "lucide-react";
import { PROFILE } from "../../data/portfolio";
import VisitorCount from "./VisitorCount";

export default function DashboardLayout({ activeTab, setActiveTab, children }) {
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Load initial system logs
    const initialLogs = [
      `[SYS_INIT] Booting portfolio dashboard OS v4.0.2...`,
      `[SYS_INIT] Establishing database connections...`,
      `[DATABASE] LocalStorage client connected (STATUS: OK)`,
      `[SYSTEM] R3F Canvas and WebGL modules loaded.`,
      `[INFO] Welcome to Aravind Reddy M's data console.`
    ];
    setLogs(initialLogs);

    // Listen for custom submit events from the Contact component to log in real-time
    const handleNewMessage = (e) => {
      const msg = e.detail;
      setLogs((prev) => [
        ...prev,
        `[MSG_RCVD] [${new Date().toLocaleTimeString()}] From: ${msg.email} - Subject: ${msg.subject || 'N/A'}`
      ]);
    };

    window.addEventListener("new-portfolio-message", handleNewMessage);
    return () => window.removeEventListener("new-portfolio-message", handleNewMessage);
  }, []);

  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: BarChart3 },
    { id: "skills", label: "Skills & SQL", icon: Database },
    { id: "credentials", label: "Credentials", icon: Award },
    { id: "contact", label: "Contact & Logs", icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-[#05050A] text-white flex flex-col md:flex-row relative font-manrope selection:bg-cyan-500/20 selection:text-white">
      {/* 3D and Aurora Background Glows */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute w-[600px] h-[600px] bg-cyan-500/10 -top-40 -left-40 blur-[130px] rounded-full" />
        <div className="absolute w-[600px] h-[600px] bg-purple-600/10 bottom-20 right-0 blur-[130px] rounded-full" />
      </div>

      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex md:w-64 lg:w-72 shrink-0 flex-col bg-[#0A0B10]/80 backdrop-blur-md border-r border-white/5 p-6 z-30 relative">
        {/* Brand/Profile */}
        <div className="flex items-center gap-3 pb-6 border-b border-white/5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-purple-500 p-[1px] glow-cyan">
            <div className="w-full h-full bg-[#0A0B10] rounded-[11px] flex items-center justify-center font-space font-bold text-cyan-300">
              AR
            </div>
          </div>
          <div>
            <h1 className="font-space font-bold text-sm tracking-tight text-white leading-tight">
              Aravind Reddy M.
            </h1>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono-code text-[10px] text-zinc-500 uppercase tracking-widest">
                LOCAL_STORAGE_OK
              </span>
            </div>
          </div>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 py-8 space-y-1.5">
          <div className="font-mono-code text-[10px] uppercase text-zinc-600 tracking-widest pl-3 mb-4">
            Navigation Console
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-space text-sm font-medium transition-all duration-200 border group ${
                  active 
                    ? "bg-white/[0.04] border-cyan-400/30 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.05)]" 
                    : "border-transparent text-zinc-400 hover:text-white hover:bg-white/[0.02]"
                }`}
              >
                <Icon className={`w-4.5 h-4.5 transition-colors ${active ? "text-cyan-300" : "text-zinc-500 group-hover:text-zinc-300"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-white/5 space-y-4">
          <button 
            onClick={() => setConsoleOpen(!consoleOpen)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-zinc-950 border border-white/5 font-mono-code text-[11px] text-zinc-400 hover:text-cyan-300 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>System Log Tray</span>
            </div>
            <span className={`w-1.5 h-1.5 rounded-full ${consoleOpen ? 'bg-cyan-400 animate-pulse' : 'bg-zinc-600'}`} />
          </button>

          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-3">
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                <Github className="w-4.5 h-4.5" />
              </a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                <Linkedin className="w-4.5 h-4.5" />
              </a>
            </div>
            <button 
              onClick={() => window.alert("Resume will be available soon.")}
              className="flex items-center gap-1.5 text-[11px] font-space font-medium text-zinc-400 hover:text-cyan-300 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
          </div>

          {/* Visitor Counter */}
          <VisitorCount />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 z-10 pb-20 md:pb-0">
        {/* Top Control Bar */}
        <header className="sticky top-0 bg-[#05050A]/70 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400 hidden sm:block" />
            <div className="font-mono-code text-[11px] uppercase tracking-widest text-zinc-500">
              SYSTEM_MONITOR / <span className="text-cyan-300 font-semibold">{activeTab.toUpperCase()}</span>
            </div>
          </div>

          {/* Quick Metrics display */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden lg:flex items-center gap-6 border-r border-white/5 pr-6 font-mono-code">
              <div>
                <span className="text-[10px] text-zinc-500 block uppercase tracking-wider">Queries Written</span>
                <span className="text-xs font-bold text-white">500+ rows</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 block uppercase tracking-wider">Datasets Examined</span>
                <span className="text-xs font-bold text-cyan-300">40+ files</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 block uppercase tracking-wider">Dashboards Built</span>
                <span className="text-xs font-bold text-purple-300">12 views</span>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono-code text-xs px-3 py-1 rounded-full bg-white/[0.02] border border-white/5">
              <Wifi className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-zinc-400 text-[10px] sm:text-xs">OFFLINE_SPA</span>
            </div>
          </div>
        </header>

        {/* Global Console Log Tray (Sliding Panel) */}
        {consoleOpen && (
          <div className="bg-black border-b border-cyan-500/20 font-mono-code text-[11px] p-4 text-emerald-400 overflow-hidden relative z-20 max-h-48 flex flex-col">
            <div className="flex justify-between items-center text-zinc-500 border-b border-zinc-900 pb-2 mb-2 font-mono-code">
              <span>Terminal Log Monitor</span>
              <button 
                onClick={() => setConsoleOpen(false)}
                className="hover:text-white transition-colors"
              >
                [Minimize]
              </button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-2 custom-scrollbar">
              {logs.map((log, idx) => (
                <div key={idx} className="leading-relaxed whitespace-pre-wrap select-text">
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Inner Content Component (Framer motion wrapped inside respective files) */}
        <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* Bottom Nav Bar for Mobile Screens */}
      <nav className="fixed bottom-4 left-4 right-4 md:hidden z-30 bg-[#0A0B10]/90 backdrop-blur-lg border border-white/10 rounded-2xl py-2 px-3 flex items-center justify-around shadow-2xl">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 py-1.5 px-2 rounded-xl transition-all ${
                active ? "text-cyan-300 scale-105" : "text-zinc-500"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[9px] font-space tracking-tighter">{item.label.split(" ")[0]}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
