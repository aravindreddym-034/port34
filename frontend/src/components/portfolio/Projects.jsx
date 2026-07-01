import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ArrowRight, X, BarChart3, LineChart, PieChart, Info } from "lucide-react";
import { 
  ResponsiveContainer, 
  LineChart as ReLineChart, 
  Line, 
  BarChart as ReBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  AreaChart,
  Area
} from "recharts";
import { PROJECTS } from "../../data/portfolio";

// Project specific mock chart data
const sqlChartData = [
  { month: "Jan", Cohort_A: 100, Cohort_B: 100 },
  { month: "Feb", Cohort_A: 85, Cohort_B: 80 },
  { month: "Mar", Cohort_A: 72, Cohort_B: 68 },
  { month: "Apr", Cohort_A: 65, Cohort_B: 54 },
  { month: "May", Cohort_A: 60, Cohort_B: 48 },
  { month: "Jun", Cohort_A: 58, Cohort_B: 45 },
];

const powerbiChartData = [
  { region: "East", revenue: 42000, targets: 40000 },
  { region: "West", revenue: 51000, targets: 48000 },
  { region: "Central", revenue: 38000, targets: 42000 },
  { region: "South", revenue: 29000, targets: 30000 },
];

const churnChartData = [
  { feature: "Contract Type", importance: 92 },
  { feature: "Tenure Month", importance: 85 },
  { feature: "Tech Support", importance: 74 },
  { feature: "Monthly Charges", importance: 62 },
  { feature: "Payment Method", importance: 41 },
];

const edaChartData = [
  { category: "Technology", sales: 85000, profit: 14500 },
  { category: "Office Supplies", sales: 62000, profit: 8900 },
  { category: "Furniture", sales: 74000, profit: 2100 },
];

const statsChartData = [
  { day: "Day 1", Control: 120, Variant: 130 },
  { day: "Day 2", Control: 125, Variant: 142 },
  { day: "Day 3", Control: 118, Variant: 145 },
  { day: "Day 4", Control: 132, Variant: 158 },
  { day: "Day 5", Control: 128, Variant: 162 },
];

const pipelineChartData = [
  { step: "Raw Ingest", duration: 120 },
  { step: "SQL Transformation", duration: 45 },
  { step: "Python Processing", duration: 75 },
  { step: "BI Model Refresh", duration: 15 },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filters = ["All", "SQL", "Python", "Power BI", "Machine Learning", "Statistics"];

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === "All") return true;
    return p.category.toLowerCase().includes(activeFilter.toLowerCase()) || 
           p.tech.some(t => t.toLowerCase().includes(activeFilter.toLowerCase()));
  });

  // Render project details chart
  const renderProjectChart = (projectTitle) => {
    switch (projectTitle) {
      case "SQL Business Analysis":
        return (
          <div className="h-48 w-full bg-zinc-950/50 p-2.5 rounded-xl border border-white/5 font-mono-code text-[10px]">
            <span className="text-zinc-500 block mb-2 uppercase tracking-widest text-[9px]">Cohort Retention Analysis (%)</span>
            <ResponsiveContainer width="100%" height="90%">
              <ReLineChart data={sqlChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" tick={{ fontSize: 9 }} />
                <YAxis stroke="rgba(255,255,255,0.4)" tick={{ fontSize: 9 }} />
                <Tooltip contentStyle={{ background: "#05050A", border: "1px solid rgba(255,255,255,0.1)", fontSize: 9 }} />
                <Line type="monotone" dataKey="Cohort_A" stroke="#00F0FF" strokeWidth={2} name="Cohort A (Jan)" dot={{ r: 2 }} />
                <Line type="monotone" dataKey="Cohort_B" stroke="#7B2CBF" strokeWidth={2} name="Cohort B (Feb)" dot={{ r: 2 }} />
              </ReLineChart>
            </ResponsiveContainer>
          </div>
        );
      case "Power BI Sales Dashboard":
        return (
          <div className="h-48 w-full bg-zinc-950/50 p-2.5 rounded-xl border border-white/5 font-mono-code text-[10px]">
            <span className="text-zinc-500 block mb-2 uppercase tracking-widest text-[9px]">Sales Performance vs Targets ($)</span>
            <ResponsiveContainer width="100%" height="90%">
              <ReBarChart data={powerbiChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="region" stroke="rgba(255,255,255,0.4)" tick={{ fontSize: 9 }} />
                <YAxis stroke="rgba(255,255,255,0.4)" tick={{ fontSize: 9 }} />
                <Tooltip contentStyle={{ background: "#05050A", border: "1px solid rgba(255,255,255,0.1)", fontSize: 9 }} />
                <Bar dataKey="revenue" fill="#00F0FF" radius={[3, 3, 0, 0]} name="Actual Sales" />
                <Bar dataKey="targets" fill="rgba(255,255,255,0.15)" radius={[3, 3, 0, 0]} name="Target Sales" />
              </ReBarChart>
            </ResponsiveContainer>
          </div>
        );
      case "Customer Churn Prediction":
        return (
          <div className="h-48 w-full bg-zinc-950/50 p-2.5 rounded-xl border border-white/5 font-mono-code text-[10px]">
            <span className="text-zinc-500 block mb-2 uppercase tracking-widest text-[9px]">SHAP Feature Importance (Weights)</span>
            <ResponsiveContainer width="100%" height="90%">
              <ReBarChart data={churnChartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" stroke="rgba(255,255,255,0.4)" tick={{ fontSize: 9 }} />
                <YAxis dataKey="feature" type="category" stroke="rgba(255,255,255,0.4)" tick={{ fontSize: 8 }} width={80} />
                <Tooltip contentStyle={{ background: "#05050A", border: "1px solid rgba(255,255,255,0.1)", fontSize: 9 }} />
                <Bar dataKey="importance" fill="#7B2CBF" radius={[0, 3, 3, 0]} name="Importance" />
              </ReBarChart>
            </ResponsiveContainer>
          </div>
        );
      case "Python EDA — Global Superstore":
        return (
          <div className="h-48 w-full bg-zinc-950/50 p-2.5 rounded-xl border border-white/5 font-mono-code text-[10px]">
            <span className="text-zinc-500 block mb-2 uppercase tracking-widest text-[9px]">Sales & Net Profit by Category ($)</span>
            <ResponsiveContainer width="100%" height="90%">
              <ReBarChart data={edaChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="category" stroke="rgba(255,255,255,0.4)" tick={{ fontSize: 8 }} />
                <YAxis stroke="rgba(255,255,255,0.4)" tick={{ fontSize: 9 }} />
                <Tooltip contentStyle={{ background: "#05050A", border: "1px solid rgba(255,255,255,0.1)", fontSize: 9 }} />
                <Bar dataKey="sales" fill="rgba(0, 122, 255, 0.7)" radius={[3, 3, 0, 0]} name="Sales" />
                <Bar dataKey="profit" fill="#00F0FF" radius={[3, 3, 0, 0]} name="Profit" />
              </ReBarChart>
            </ResponsiveContainer>
          </div>
        );
      case "Statistics Case Study":
        return (
          <div className="h-48 w-full bg-zinc-950/50 p-2.5 rounded-xl border border-white/5 font-mono-code text-[10px]">
            <span className="text-zinc-500 block mb-2 uppercase tracking-widest text-[9px]">A/B Conversion Run Log (p = 0.034)</span>
            <ResponsiveContainer width="100%" height="90%">
              <AreaChart data={statsChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.4)" tick={{ fontSize: 9 }} />
                <YAxis stroke="rgba(255,255,255,0.4)" tick={{ fontSize: 9 }} />
                <Tooltip contentStyle={{ background: "#05050A", border: "1px solid rgba(255,255,255,0.1)", fontSize: 9 }} />
                <Area type="monotone" dataKey="Control" stroke="#71717A" fill="rgba(113,113,122,0.1)" name="Control" />
                <Area type="monotone" dataKey="Variant" stroke="#00F0FF" fill="rgba(0,240,255,0.15)" name="Variant (New Campaign)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        );
      case "End-to-End Analytics Pipeline":
        return (
          <div className="h-48 w-full bg-zinc-950/50 p-2.5 rounded-xl border border-white/5 font-mono-code text-[10px]">
            <span className="text-zinc-500 block mb-2 uppercase tracking-widest text-[9px]">ETL Process Duration (Seconds)</span>
            <ResponsiveContainer width="100%" height="90%">
              <ReBarChart data={pipelineChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="step" stroke="rgba(255,255,255,0.4)" tick={{ fontSize: 8 }} />
                <YAxis stroke="rgba(255,255,255,0.4)" tick={{ fontSize: 9 }} />
                <Tooltip contentStyle={{ background: "#05050A", border: "1px solid rgba(255,255,255,0.1)", fontSize: 9 }} />
                <Bar dataKey="duration" fill="#7B2CBF" radius={[3, 3, 0, 0]} name="Processing Time (s)" />
              </ReBarChart>
            </ResponsiveContainer>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 relative">
      <div className="flex flex-col gap-4">
        <div>
          <span className="font-mono-code text-xs text-cyan-400 uppercase tracking-widest">/ 02 · Featured Case Studies</span>
          <h1 className="font-space font-bold text-3xl sm:text-4xl tracking-tight text-white mt-1">
            Data Analytics Catalog
          </h1>
          <p className="text-sm text-zinc-400 font-manrope mt-1">
            Browse portfolio projects. Click any project to open its interactive analytical breakdown.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center gap-1.5 border-b border-white/5 pb-4">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-space font-medium transition-all ${
                activeFilter === filter 
                  ? "bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.05)]" 
                  : "border border-transparent text-zinc-400 hover:text-white hover:bg-white/[0.02]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((p, idx) => (
          <motion.article
            key={p.title}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            onClick={() => setSelectedProject(p)}
            className="group glass-card rounded-2xl border border-white/5 overflow-hidden flex flex-col cursor-pointer hover:border-cyan-400/35 transition-all shadow-xl hover:-translate-y-1"
          >
            {/* Image Wrap */}
            <div className="relative overflow-hidden h-40">
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B10] via-[#0A0B10]/20 to-transparent" />
              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 font-mono-code text-[9px] text-cyan-300 uppercase tracking-wider">
                {p.category.split(" · ")[0]}
              </div>
            </div>

            {/* Core Info */}
            <div className="p-5 flex flex-col flex-1 gap-3">
              <h3 className="font-space font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
                {p.title}
              </h3>
              <p className="text-xs text-zinc-400 font-manrope leading-relaxed line-clamp-3">
                {p.desc}
              </p>
              
              <div className="flex flex-wrap gap-1 mt-auto">
                {p.tech.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded bg-white/[0.02] border border-white/5 font-mono-code text-[9px] text-zinc-400"
                  >
                    {t}
                  </span>
                ))}
                {p.tech.length > 3 && (
                  <span className="px-1.5 py-0.5 rounded bg-white/[0.02] border border-white/5 font-mono-code text-[9px] text-zinc-500">
                    +{p.tech.length - 3}
                  </span>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Slide-out Case Study Details Drawer */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            {/* Drawer layout */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[480px] md:w-[560px] bg-[#0A0B10] border-l border-white/10 p-6 sm:p-8 z-50 overflow-y-auto flex flex-col gap-6 shadow-2xl selection:bg-cyan-500/20 selection:text-white"
            >
              {/* Drawer header */}
              <div className="flex justify-between items-start border-b border-white/5 pb-4">
                <div>
                  <span className="font-mono-code text-[10px] text-cyan-400 uppercase tracking-widest">
                    {selectedProject.category}
                  </span>
                  <h2 className="font-space font-bold text-2xl text-white mt-1">
                    {selectedProject.title}
                  </h2>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Case study chart viz */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 font-space font-semibold text-xs text-zinc-300">
                  <BarChart3 className="w-4 h-4 text-cyan-400" />
                  <span>Interactive Analytical Output</span>
                </div>
                {renderProjectChart(selectedProject.title)}
              </div>

              {/* Detailed Content */}
              <div className="space-y-4 font-manrope text-sm text-zinc-300">
                <div>
                  <h4 className="font-space font-semibold text-zinc-400 uppercase tracking-wider text-xs mb-1.5">Project Overview</h4>
                  <p className="leading-relaxed text-zinc-300">
                    {selectedProject.desc}
                  </p>
                </div>

                <div>
                  <h4 className="font-space font-semibold text-zinc-400 uppercase tracking-wider text-xs mb-1.5">Analytical Objectives</h4>
                  <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                    <li>Uncover core trend anomalies across distinct business periods.</li>
                    <li>Cleanse and normalize database attributes for query pipeline optimization.</li>
                    <li>Construct descriptive visualizations mapping primary KPI clusters.</li>
                  </ul>
                </div>
              </div>

              {/* Full Tech pills */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                <h4 className="font-space font-semibold text-zinc-400 uppercase tracking-wider text-xs">Technologies Employed</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded bg-[#05050A] border border-white/5 font-mono-code text-xs text-cyan-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Code & Demo CTA buttons */}
              <div className="flex gap-3 pt-4 mt-auto border-t border-white/5">
                <a
                  href={selectedProject.github}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 font-space font-medium text-sm text-zinc-300 hover:text-white hover:border-white/20 transition-all bg-white/[0.01]"
                >
                  <Github className="w-4 h-4" />
                  Source Code
                </a>
                <a
                  href={selectedProject.demo}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white text-black font-space font-semibold text-sm hover:scale-[1.02] transition-transform"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Showcase
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
