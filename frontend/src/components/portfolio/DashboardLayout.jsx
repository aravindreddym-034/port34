import React from "react";
import { 
  LayoutDashboard, 
  BarChart3, 
  Database, 
  Award, 
  Github, 
  Linkedin, 
  FileText
} from "lucide-react";
import { PROFILE } from "../../data/portfolio";

export default function DashboardLayout({ activeTab, setActiveTab, children }) {
  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: BarChart3 },
    { id: "skills", label: "Skills", icon: Database },
    { id: "credentials", label: "Credentials", icon: Award },
  ];

  return (
    <div className="h-screen overflow-hidden bg-[#09090b] text-[#f4f4f5] flex flex-col md:flex-row relative font-sans selection:bg-blue-500/20 selection:text-white">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex md:w-64 lg:w-72 shrink-0 flex-col bg-[#121215] border-r border-[#27272a] p-6 z-30 relative h-full">
        {/* Brand/Profile */}
        <div className="flex items-center gap-3 pb-4 border-b border-[#27272a]">
          <div className="w-10 h-10 rounded-lg bg-[#27272a] flex items-center justify-center font-bold text-[#f4f4f5]">
            AR
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-tight text-white leading-tight">
              Aravind Reddy M.
            </h1>
            <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
              Portfolio v1.0
            </p>
          </div>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 py-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border group ${
                  active 
                    ? "bg-[#27272a] border-[#3f3f46] text-[#f4f4f5]" 
                    : "border-transparent text-zinc-400 hover:text-white hover:bg-white/[0.02]"
                }`}
              >
                <Icon className={`w-4 h-4 transition-colors ${active ? "text-[#f4f4f5]" : "text-zinc-500 group-hover:text-zinc-300"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t border-[#27272a] space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-3">
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
            <button 
              onClick={() => window.alert("Resume will be available soon.")}
              className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 z-10 h-full overflow-hidden pb-20 md:pb-0">
        {/* Top Control Bar */}
        <header className="sticky top-0 bg-[#09090b]/80 backdrop-blur-md border-b border-[#27272a] px-6 py-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              Navigation / <span className="text-white font-semibold">{activeTab}</span>
            </div>
          </div>
        </header>

        {/* Inner Content Component */}
        <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* Bottom Nav Bar for Mobile Screens */}
      <nav className="fixed bottom-4 left-4 right-4 md:hidden z-30 bg-[#121215]/95 backdrop-blur-lg border border-[#27272a] rounded-xl py-2 px-3 flex items-center justify-around shadow-2xl">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 py-1.5 px-2 rounded-lg transition-colors ${
                active ? "text-white" : "text-zinc-500"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
